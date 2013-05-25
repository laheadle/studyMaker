
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


// Abstracts the connection pooling and error handling which all the
// requests are doing.  'query' is called once the connection is
// received. 'onResult' is called when the query has returned
// additional arguments are run afterwards via Step
function stepCon(query, onResult) {
    var funs = [
        function openConn() {
            pool.getConnection(this);
        },
        function withConn(err, connection) {
            if (err) {
                console.log(err)
                throw new Error
            }
            query.call(this, connection)
        },
        function queryDone(err, result) {
            if (err) {
                console.log(err)
                throw new Error
            }
            onResult.call(this, result)
        }
    ]
    Step.apply(null, funs.concat(Array.prototype.slice.call(arguments, 2)))
}

app.put('/card/:id', function(req, res) {
    stepCon(
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
        function query(connection) {
            connection.query('select * from tsheet', this)
        },
        function done(rows) {
            res.render('sheetList', {json: JSON.stringify(rows)})
        }
    )
})

app.get('/sheets/:id', function(req, res) {
    stepCon(
        function query(connection) {
            connection.query('select * from tcard where csheet = ?', req.params.id, this);
        },
        function result(rows) {
            res.render('sheetItem', {json: JSON.stringify(rows)})
        }
    )
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


