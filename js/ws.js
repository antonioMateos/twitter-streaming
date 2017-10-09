var socket = io();

socket.on("connect", function(msg){

  console.log("socket ON",msg);

});

socket.on("tweet", function(newTw){

  //console.log(newTw);
  var tw = "<li>"+newTw+"</li>";
  $('#tweetList').prepend(tw);

});

$('#track-btn').click(function(){

	cleanTwList();

	var hashtag = $('#track-term').val();
	//TO DO --> write tracked term
	//TO DO --> socket emit term to server
	console.log('HS = ',hashtag);

});

function cleanTwList() {

	//TO DO --> refresh ul tweetList
	$('#tweetList').html();

}