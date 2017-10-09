var socket = io();

socket.on("connect", function(msg){

  console.log("socket ON",msg);

});

socket.on("tweet", function(newTw){

  console.log(newTw);
  var tw = "<li>"+newTw+"</li>"; // TO DO --> create template for correct display of tweets
  $('#tweetList').prepend(tw);

});

$('#track-btn').click(function(){

	cleanTwList(); // <-- Clean tweetList

	var hashtag = $('#track-term').val(); // <-- Get input value
	// TO DO --> Fix text for correct search

	if(hashtag!=""){
		$('#hashtag').text("#"+hashtag); // <-- Write tracked hashtag in title
		socket.emit('start',hashtag); // <-- Socket emit hashtag to server
		//console.log('HS = ',hashtag);
	} else {
		//TO DO --> "Please, write a hashtag to begin with"
	}

	// TO DO --> Change text and style in button to "STOP Streaming"

});

function cleanTwList() {

	//Refresh ul tweetList
	$('#tweetList').html("");

}