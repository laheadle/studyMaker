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
        , mysql = require('mysql')
	, stepCon = require('stepCon')
	, Q = require("q")

        return function(config) {
	    var pool = mysql.createPool(config.db)
	    var serverConfig = config.server
            var app = express();

            app.configure(function(){
                app.set('port', serverConfig.port);
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
                        // Forget which side of the card is showing, as that can get out of sync.
                        delete req.body.cshow
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
                        res.render('sheets', {json: JSON.stringify(rows)})
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
                        res.render('testSuite', {json: JSON.stringify(rows)})
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
                        res.render('cards', {json: JSON.stringify(rows)})
                    }
                )
            })

            var server = http.createServer(app)
	    return Q.ninvoke(server, 'listen', app.get('port')).then(
		function() {
		    console.log("Express server listening on port " + app.get('port'))
		})
        }
    }
)
