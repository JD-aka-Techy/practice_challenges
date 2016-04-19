// uses cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js

$(function(){

var clock; // running timer.
var running = false;
var upTime = 25 * 60; // default work time.
var downTime = 5 * 60; // defualt rest time.
var working;
var time;
var buzzer;

init();


  // click listener
$('.content-wrap').click(function(e){
  var target = e.target.id;
  // one terrible switch because I've never used one :P
  switch(target) {
    case 'clock':
      running ? stopClock() : startClock();
      break;
    case 'seconds':
      running ? stopClock() : startClock();
      break;
    case 'dedWork':
      upTime -= 60;
      init();
      break;
    case 'addWork':
      upTime += 60;
      init();
      break;
    case 'dedPlay':
      downTime -= 60;
      init();
      break;
    case 'addPlay':
      downTime += 60;
      init();
      break;
    case 'reset':
      init();
      stopClock()
      break;
    }
});

function init(){
  buzzer = new Audio('https://dl-web.dropbox.com/get/Public/Store_Door_Chime-Mike_Koenig-570742973.mp3?_subject_uid=34065618&w=AAB8PHEe9oRgU10yXPxdPmsqXcLOLbnns9saJaRfVm1o5g');
  working = true;
  time = upTime;
  $('.seconds').text(formatT(time));
  $('.uptime').text(formatT(upTime));
  $('.downtime').text(formatT(downTime));
}

function startClock(){
  clock = setInterval(tick, 1000);
  running = true;
}

function stopClock(){
  clearInterval(clock);
  running = false;
}

function tick(){
  if(time <= 0){
    //play tone
    buzzer.play();
    time = upOrDown()
  }
  // deduct a second and update on screen.
  time --;
  $('.seconds').text(formatT(time));

  /* work or down time switch */
  function upOrDown() {
    if (working) {
      working = false;
      return downTime;
    }
    else {
      working = true;
      return upTime;
    }
  }
}

function formatT(s) {
  var hours   = Math.floor(s / 3600);
  var minutes = Math.floor((s / 60) - (hours * 60));
  var seconds = s % 60;
  if (hours   < 10) {   hours = '0' + hours; }
  if (minutes < 10) { minutes = '0' + minutes; }
  if (seconds < 10) { seconds = '0' + seconds; }

  return hours + ':' + minutes + ':' + seconds;
}

});
