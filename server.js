//'use strict';
var express = require('express'),
	app     = express(),
	path    = require('path'),
	http	= require('http').Server(app),
	Twitter = require('twitter'),
  io = require("socket.io")(http), // app or http
	config = require('./config') // <-- TW Config file
	bodyParser = require('body-parser');

console.log('- - - - Iniciando entorno');
// CORS --> Cabeceras correctas
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Parsers --> Poder mandar y recibir JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('- - - - Middlewares cargados...');

console.log('- - - - FRONT ROUTES');

app.use(express.static(__dirname + '/'));

app.get('/', function (request, response, next) {
	response.sendFile(path.join(__dirname+'/index.html'));
});

console.log('- - - - END FRONT ROUTES');

//TWITTER CONFIG
var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});
/*
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
*/
// <-- TO DO > Environment variables

//SOCKET IO
console.log('- - - - SOCKET IO');

io.on('connection', function(socket){

  //START CONNECTION
  var msg = 'Server ON';
  socket.emit('connect',msg);

  var hashtag;
  var clientStream; // TO DESTROY CONNECTION

  //Hashtag from front
  socket.on('start',function(data){

    hashtag = "#"+data;
    //console.log("#"+hashtag);

    //TWITTER STREAM API
    var stream = client.stream('statuses/filter', {track: hashtag});

    stream.on('data', function(event) {
      //console.log(event && event.text);
      socket.emit('tweet',event);
    });

    clientStream = stream;

    stream.on('error', function(error) {
      throw error;
    });
    //END TWITTER STREAM API

  });

  //STOP STREAMING
  socket.on('stop',function(){
    // DESTROY TW STREAM CONNECTION
    clientStream.destroy();
    console.log("- - - - STOP Streaming - - - -");
  });
  
  // STANDARD SOCKETS
  /*
  socket.on('new-message', function(data) {
    //messages.push(data);
    console.log(data.text);
    io.sockets.emit('messages', messages);
  });
  */

});
//END SOCKET IO

// STARTING SERVER
http.listen(process.env.PORT || 3000, function () {
  console.log('- START SERVER - - - - - -\n');
  console.log('Server Listening on http://localhost:' + (process.env.PORT || 3000))
});