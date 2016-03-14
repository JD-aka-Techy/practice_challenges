/*
  Kids drink toddy.
  Teens drink coke.
  Young adults drink beer.
  Adults drink whisky.
  Make a function that receive age, and return what they drink.

  Rules:

  Children under 14 old.
  Teens under 18 old.
  Young under 21 old.
  Adults have 21 or more.
*/

var peopleWithAgeDrink = function(old) {
  var resp = '';
  
  if (old < 14){resp = "drink toddy";}
  else if (old < 18){resp = "drink coke";}
  else if (old < 21){resp = "drink beer";}
  else {resp = "drink whisky";}
  
  return resp;
};

/* ES6 */

const peopleWithAgeDrink = (age) =>
  age < 14 ? "drink toddy" :
  age < 18 ? "drink coke" :
  age < 21 ? "drink beer" : "drink whisky"