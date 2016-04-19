// uses //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js

/* api call is to a simple php jsonp response calling from a random pool of 15 quotes
* hence the repeated quotes * saved me signing up for a real api *
*/

$(function() {

  genQuote();

  /* grab a quote from api, set quote, attributation and share button target */
  function genQuote(){
    $.getJSON('http://rainbowsheet.orgfree.com/freecodecamp/quotegen/quote.php?callback=?',function(response){
      $('.quote').text(response.quote);
      $('.attr').text(response.attr);
      $('.tweet').attr("href", setTwit());
      $('.quote, .attr').animate({opacity:1},500);
    });
    return false;
  }

  /* on click listeners - replace with delegation func */
  /*new Q button*/
  $('.genButt').click(function(e){
    var alter = $('.quote, .attr');
    alter.animate({opacity:0},500);
    alter.promise().done(function(){
      genQuote();
      });


  });

  /*
  * returns twitter share url for button since codepen fullscreen
  * disables window.open() for some reason.
  */
  function setTwit(){
    var toTweet = $('.quote').text() + ' - ' + $('.attr').text();
    if (toTweet.length > 140) {
      toTweet = toTweet.substring(0, 137) + '...';
    }
    $twitLink = 'http://twitter.com/home?status=' + encodeURIComponent(toTweet);
    return $twitLink;
  }

});
