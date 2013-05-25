
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
, fs = require('fs')
  , path = require('path')
, Step = require('step')
, mysql = require('mysql')

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database: 'study'
});

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'ejs');
  app.set('views', './views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, './www')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.put('/card/:id', function(req, res) {
    console.log(req.body)
    Step(
        function openConn() {
            pool.getConnection(this);
        },
        function withConn(err, connection) {
            if (err) {
                console.log(err)
                throw new Error
            }
            connection.query('update tcard SET ? where cid = ?', [req.body, req.params.id], this)
        },
        function done(err) {
            if (err) {
                console.log(err)
                throw new Error
            }
            res.send({status: 'ok'})
        }
    )
})

app.get('/sheets/all', function(req, res) {
    Step(
        function openConn() {
            pool.getConnection(this);
        },
        function withConn(err, connection) {
            if (err) {
                console.log(err)
                throw new Error
            }
            connection.query('select * from tsheet', function(err, rows) {
                res.render('sheetList', {json: JSON.stringify(rows)})
            })
        }
    )
})         


app.get('/sheets/:id', function(req, res) {
    Step(
        function openConn() {
            pool.getConnection(this);
        },
        function withConn(err, connection) {
            if (err) {
                console.log(err)
                return
            }
            connection.query('select * from tcard where csheet = ?', req.params.id, this);
        },
        function rows(err, rows) {
            if (err) {
                console.log(err)
                return
            }
            res.render('sheetItem', {json: JSON.stringify(rows)})
        }
    )
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


