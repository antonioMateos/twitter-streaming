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

  //STATS
  stats();

});

// START <> STOP Streaming
// TO DO --> Add key press font intro on search!!!
$('#start-btn').click(function(){

	var hashtag = $('#track-term').val(); // <-- Get input value
	// TO DO --> Fix text for correct search

	if(hashtag!=""){

		$('.stats').hide(); // STATS to initial state
		cleanTwList(); // <-- Clean tweetList
		$('main').addClass('streaming'); // CHANGE STYLE TO STOP STREAMING
		$('#hashtag').show();
		$('#hashtag').text("#"+hashtag); // <-- Write tracked hashtag in title
		socket.emit('start',hashtag); // <-- Socket emit hashtag to server
		responseMsg("start");

	} else {

		responseMsg("empty");

	}

});

$('#stop-btn').click(function(){
	$('#track-term').val("");
	socket.emit('stop');
	$('main').removeClass('streaming'); // CHANGE STYLE TO START STREAMING
	responseMsg("stop");
});

// STATS Fn
var nt = 0; // Number of tweets received
function stats() {
	$('.stats').show(); // show STATS
	nt += 1;
	$('.stats p span').text(nt);
}

// RESPONSE MSGs
function responseMsg(response) {

	// Toast Config
	var resp;
	var className = "response-msg";

	var msg = {
		empty: "Please, write a term!!!",
		stop: "Twitter stream stopped!",
		start: "Twitter stream started!"
	};

	if(response=="empty") {
		resp = msg.empty;
		className += " error";
	}

	if(response=="stop") {
		resp = msg.stop;
		className += " stop";
	}

	if(response=="start") {
		resp = msg.start;
		className += " success";
	}

	// Materialize.toast(message, displayLength, className, completeCallback);
	var toastContent = "<span>"+resp+"</span>";
	var time = 4000;
	Materialize.toast(toastContent, time, className); // 4000 is the duration of the toast

}

// REFRESH Tw List
function cleanTwList() {
	//Refresh ul tweetList
	$('#tweetList').html("");
};