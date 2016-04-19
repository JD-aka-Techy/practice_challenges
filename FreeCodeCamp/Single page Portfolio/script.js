// uses //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js

$(document).ready(function(){

  /* settings */
  var quotefreq =  10; //quote change frequency in seconds

  /* Quotes stuff */

  var reviews = [
      ["He's systematic, hydromatic, automatic Why, it's greased lightning!", "Ryder"],
      ["he'll do press ups, and chinups, and the snatch, clean and jerk. He thinks dynamic tension Must be hard work.", "Frank.N.furter"],
      ["quote3", "attrib3"],
      ["quote4", "attrib4"],
      ["quote5", "attrib5"],
      ["quote6", "attrib6"]
    ];

  var nextQ;
  var leftQ = $('.fold-left');
  var rightQ = $('.fold-right');
  var currQ = 2;
  var lenCheck = (reviews.length -1);
  setInterval(setQuotes, (quotefreq * 1000));

  function setQuotes(){

   function changeItem(item){

     item.animate({opacity:0},500, function(){
       nextQ = reviews[currQ];
       item.html("<blockquote>" + nextQ[0] + " <cite>" + nextQ[1] + "</cite> </blockquote>");
       item.animate({opacity:1},500);

       if (currQ == lenCheck){ currQ = 0; }
       else { currQ++; }
      });
    }

    changeItem(leftQ);
    changeItem(rightQ);
  }



});
