// uses //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js

(function() {
  var round; // length of sequence
  var sequence;
  var place; // where in the sequence user currently is
  var tempo;
  var maxSeq = 20;
  var strictMode = false;
  var win = new Audio('https://www.dropbox.com/s/qy78qlqnrb5rfzs/win.mp3?dl=1');
  var wrong = new Audio('https://www.dropbox.com/s/oefi4rl677a10qf/wrong.mp3?dl=1');
  var soundBaseUrl = 'https://s3.amazonaws.com/freecodecamp/simonSound';
  var sounds = {
      'red': new Audio(soundBaseUrl + '1.mp3'),
      'green': new Audio(soundBaseUrl + '2.mp3'),
      'yellow': new Audio(soundBaseUrl + '3.mp3'),
      'blue': new Audio(soundBaseUrl + '4.mp3'),
  };

  // toggle strict mode
  $('.strict-butt').click(function() {
    $(this).toggleClass("strict-on");
    strictMode = strictMode === true ? false : true;
    init();
  });

  $('.reset').click(function() {
    init();
  });

  // Button push listener
  $('.button').on('click', function(event) {

    pressed = event.target.id;
    shine(pressed);

    if (sequence[place] === pressed) {

      if (place === (sequence.length - 1)) { // end of sequence

        if (round === maxSeq) { // last round
          win.play();
          alert('you win');
          init(); // restart game
        } else { //continue to next round
          place = 0;
          round++;
          // Tempo alterations
          switch (round) {
            case 5:
              tempo = 800;
              break;
            case 9:
              tempo = 600;
              break;
            case 13:
              tempo = 400;
              break;
          }

          sequence.push(newColor());
          $('#round').html(String(round));
          displaySequence(sequence);
        }
      } else {
        place++; // next in sequence
      }
    } else if (!strictMode) { // try again if strict mode disabled
      wrong.play()
      setTimeout(function(){
        place = 0;
        displaySequence(sequence);
      },800);
    } else {
      wrong.play();
      alert('you lose sucker');
      init(); // restart game
    }
  })



  /* makes buttons unclickable */
  var lockButtons = function() {
    $('.button').toggleClass('locked')
  }

  /* displays color sequence to user in order */
  var displaySequence = function(seq) {
    lockButtons(); // lock
    setTimeout(function() { // adds wait before display
      seq.map(function(color, index) { // stages shines at times intervals
        setTimeout(function() {
          shine(color)
          if(index === seq.length -1){
            lockButtons(); // unlock buttons
          }
        }, (tempo * index));
      })
     }, 1000);
  }

  /* lights up button of given color*/
  var shine = function(color) {
    $('.' + color).toggleClass(color + '-shine'); //toggle on
    sounds[color].play();
    setTimeout(function() {
      $('.' + color).toggleClass(color + '-shine'); //toggle off
    }, 500)
  }

  /* returns random color */
  var newColor = function() {
    var colors = ['green', 'red', 'blue', 'yellow'];
    return colors[Math.floor(Math.random() * 4)];
  }

  // initialisation function
  var init = function() {
    round = 1;
    tempo = 1100;
    $('#round').html('1');
    place = 0;
    sequence = [newColor()];
    displaySequence(sequence);
  }

  init(); // run game at load

})();
