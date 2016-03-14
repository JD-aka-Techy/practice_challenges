/*
  Print the volume fraction in percent of orange juice in Vasya's cocktail.

  !You should round your answer to the 4 digits after decimal point.
*/

function orangeFraction(fractions){
  var fracs = fractions.split(' ');
  var numOfFracs = fracs.length;
  
  var total = (fracs.reduce(function( a, b ) { 
    return Number(a) + Number(b);
    }) / numOfFracs).toFixed(4); // to 4th Decimal
  
  return Number(total);
}

/*
  Test.assertEquals(orangeFraction("0 25 50 75"), 37.5000);
  Test.assertEquals(orangeFraction("50 50 100"), 66.6667)
*/