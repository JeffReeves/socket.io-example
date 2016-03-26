//== INCLUDES =================================================================

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//== MAIN =====================================================================

// server configuration
app.set('port', process.env.PORT || 5000);

// view engine
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// favicon
//app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// define base directory of app
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
});

// set the port to run on (defined in pm2.json file)
http.listen(app.set('port'), function(){
  console.log('Example app listening on port ' + app.set('port'));
});

// when socket.io connects
io.on('connection', function(socket){
  console.log('a user connected');

  // chat message
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  // disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});