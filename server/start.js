define(
    function 
    (require) {

        /**
         * Module dependencies.
         */

        var express = require('express')
        , http = require('http')
        , fs = require('fs')
        , path = require('path')
        , Step = require('step')
        , mysql = require('mysql')
        , stepCon = require('stepCon')

        return function(pool, config, callb) {

            var app = express();

            app.configure(function(){
                app.set('port', config.port);
                app.set('view engine', 'ejs');
                app.set('views', './views');
                app.use(express.favicon());
                app.use(express.logger('dev'));
                app.use(express.bodyParser());
                app.use(express.methodOverride());
                app.use(app.router);
                app.use(express.static('./www'));
            });

            app.configure('development', function(){
                app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
            });

            app.configure('production', function(){
                app.use(express.errorHandler()); 
            });

            app.put('/card/:id', function(req, res) {
                stepCon(
                    pool,
                    function query(connection) {
                        connection.query('update tcard SET ? where cid = ?', [req.body, req.params.id], this)
                    },
                    function done() {
                        res.send({status: 'ok'})
                    }
                )
            })

            app.get('/sheets/all', function(req, res) {
                stepCon(
                    pool,
                    function query(connection) {
                        connection.query('select * from tsheet', this)
                    },
                    function done(rows) {
                        res.render('sheetList', {json: JSON.stringify(rows)})
                    }
                )
            })

            app.get('/runTests', function(req, res) {
                stepCon(
                    pool,
                    function query(connection) {
                        connection.query('select * from tcard where csheet = ?', 1, this);
                    },
                    function result(rows) {
                        res.render('testDeck', {json: JSON.stringify(rows)})
                    }
                )
            })

            app.get('/sheets/:id', function(req, res) {
                stepCon(
                    pool,
                    function query(connection) {
                        connection.query('select * from tcard where csheet = ?', req.params.id, this);
                    },
                    function result(rows) {
                        res.render('sheetItem', {json: JSON.stringify(rows)})
                    }
                )
            })

            http.createServer(app).listen(app.get('port'), function() {
                console.log("Express server listening on port " + app.get('port'))
                callb()
            })
        }
    }
)
