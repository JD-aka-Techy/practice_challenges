// uses cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js

var GAMEBOARD = ["", "", "", "", "", "", "", "", ""],
  WINCOMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  AIMOVE,
  PLAYERCLASS = 'cross',
  COMPUTERCLASS = 'nought',
  RUNNING = false,
  // cached items
  settings = $(".settings"),
  menu = $(".menu");

(function(){
  newGame();

  /* start new game button */
  $(".new-game-button").click(function() {
    menu.css('visibility', 'hidden');
    newGame();
  });

  /* settings panel opening click handler */
  $(".change-player").click(function() { settings.toggleClass("unhide") });

  /* choose players */
  $(".choice").click(function() {
    if($(this).hasClass("cross")){
      PLAYERCLASS = 'cross';
      COMPUTERCLASS = 'nought';
    } else {
      PLAYERCLASS = 'nought';
      COMPUTERCLASS = 'cross';
    }
    settings.toggleClass("unhide");
  });

  /* Process a square being clicked (Handles game) */
  $(".cell").click(function() {
    if (RUNNING) {
      var pos = Number($(this).attr("id")); // get id of cell
      // If the square is empty, process the click
      if (GAMEBOARD[pos] == "") {
        // update board and GAMEBOARD array
        $(this).addClass(PLAYERCLASS + ' player-color');
        GAMEBOARD[pos] = "X";

        if (isFull(GAMEBOARD)) {
          // full board game over
          RUNNING = false;
          $(".result").text("It's a tie!");
          menu.css('visibility', 'visible');
        } else if (wins(GAMEBOARD, "X")) {
          // Player win
          RUNNING = false;
          $(".result").text("You win!");
          menu.css('visibility', 'visible');
        } else {
          // get best AI move & make move
          minimax(GAMEBOARD, "O", 0);
          GAMEBOARD[AIMOVE] = "O";
          $(".cell[id=" + AIMOVE + "]").addClass(COMPUTERCLASS + ' computer-color');
          // check if AI has won
          if (wins(GAMEBOARD, "O")) {
            RUNNING = false;
            $(".result").text("You lost!");
            menu.css('visibility', 'visible');
          }
        }
      }
    }
  });
})();

function newGame() {
  // Clear the table
  $(".cell").each(function() { $(this).attr("class", "cell"); });
  // Clear Gameboard
  GAMEBOARD = GAMEBOARD.map(function() { return "" });
  $('.result').text("");
  RUNNING = true;
}

/* For a given state of the board, return all the available moves */
function getMoves(state) {
  // create array of range 0-8 acts as index's keep those that match empty spaces in state.
  return Array.apply(null, { length: 9 })
              .map(eval.call, Number)
              .filter(function(x) { return state[x] == ""; });
}

function isFull(state) {
  return state.indexOf("") === -1;
}

/* Given a state of the board, returns true if the specified player has won */
function wins(state, player) {
  var win = false;
  WINCOMBOS.forEach(function(curr, index, array){
    if (state[curr[0]] === player &&
        state[curr[1]] === player &&
        state[curr[2]] === player) {
      win = true;
    }
  });
  return win;
}

/* Given a state of the board, returns true if the board is full or a player has won */
function isGameOver(state) {
  return isFull(state) || wins(state, "X") || wins(state, "O");
}

/* scores a board */
function score(state) {
  var score;
  if (wins(state, "X")) {
    score = 10;
  } else if (wins(state, "O")) {
    score = -10;
  } else {
    score = 0;
  }
  return score;
}

/* Find best move for comp*/
function minimax(state, player, depth) {
  // depth controls how effective ai is.
  if (depth >= 6 || isGameOver(state)) {
    return score(state);
  }

  var scores = [],
      moves = [],
      maxScore,
      minScore,
      opponent = player == "X" ? "O" : "X",
      posMoves = getMoves(state);

  // score all possible boards
  posMoves.forEach(function(move) {
    var posState = state.slice(0);
    posState[move] = player;
    scores.push(minimax(posState, opponent, depth + 1));
    moves.push(move);
  });

  AIMOVE = moves[0]; // set first move
  // find best move maxPlayer
  if (player === "X") {
    maxScore = scores[0];
    for (var s in scores) {
      if (scores[s] > maxScore) {
        maxScore = scores[s];
        AIMOVE = moves[s];
      }
    }
    return maxScore;
  } else { // find best move min player
    minScore = scores[0];
    for (var s in scores) {
      if (scores[s] < minScore) {
        minScore = scores[s];
        AIMOVE = moves[s];
      }
    }
    return minScore;
  }
}
