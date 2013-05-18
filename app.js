
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
, fs = require('fs')
  , path = require('path');

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

app.get('/sheet/:id', function(req, res) {
    fs.readFile('./sheets/json/'+req.params.id+'.json', 'utf-8', function(err, json) {
        console.log(json)
        res.render('root', {json: json})
    })
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


