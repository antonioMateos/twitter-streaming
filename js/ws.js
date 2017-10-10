var socket = io();

socket.on("connect", function(msg){

  console.log("socket ON",msg);

});

socket.on("tweet", function(newTw){

  //console.log(newTw);
  var tw = newTw;
  /* TW TEMPLATE */
  var tweet = '<li>'+
  	'<div class="user-img">'+
  		'<img src='+tw.user.profile_image_url_https+' />'+
  	'</div>'+
  	'<div class="user-info">'+
	  	'<h4><span class="user-name">'+tw.user.screen_name+'</span> <span class="user-handle">@'+tw.user.screen_name+'</span> <span class="tw-time">'+tw.user.created_at+'</span></h4>'+
	  	'<p class="tw-content">'+tw.text+'</p>'+
	'</div>'+
	'<div class="clearfix"></div>'+
  '</li>';

  $('#tweetList').prepend(tweet);

});

// TO DO --> Add key press font intro on search!!!

$('#start-btn').click(function(){

	var hashtag = $('#track-term').val(); // <-- Get input value
	// TO DO --> Fix text for correct search

	if(hashtag!=""){
		cleanTwList(); // <-- Clean tweetList
		$('main').addClass('streaming'); // CHANGE STYLE TO STOP STREAMING
		$('#hashtag').text("#"+hashtag); // <-- Write tracked hashtag in title
		socket.emit('start',hashtag); // <-- Socket emit hashtag to server
		//console.log('HS = ',hashtag);
	} else {
		//TO DO --> "Please, write a hashtag to begin with"
	}

});

$('#stop-btn').click(function(){
	$('#track-term').val("");
	socket.emit('stop');
	$('main').removeClass('streaming'); // CHANGE STYLE TO START STREAMING
});

function cleanTwList() {

	//Refresh ul tweetList
	$('#tweetList').html("");

}