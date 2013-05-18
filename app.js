
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
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

/*
app.get('/sheet/*', function(req, res) {
    fs.readFile('./template.html', function(err, data) { 
        if (err) {
            console.log(req.params + ' err:'  + err);
            return
        }
        fs.readFile('./sheets/' + req.params, function(err, data) { 
            if (err) console.log(req.params + ' err:'  + err);
            
            res.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Content-Length': data.length,
                'Last-Modified': new Date(),
                'Date': (new Date).toUTCString(),
                'Cache-Control': 'public max-age=' + 31536000,
                'Expires': (new Date(new Date().getTime()+63113852000)).toUTCString()
            });
            res.end(data);
        });
    });

*/

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


