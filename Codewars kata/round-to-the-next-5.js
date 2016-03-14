
/*
  Given an integer as input, can you round it to the next 5?
*/


function roundToNext5(n){  
  var nMod = n % 5;  
  return nMod === 0 ? n : n + ( 5 - nMod );  
}

/* Probably better */

function roundToNext5(n){
  return Math.ceil(n/5)*5;
}