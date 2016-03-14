/*
  Create a function wrapper that will allow to cache the result of 
  heavy computations and return it any time later.
*/

function memoize(func){
  var cache = {};
  
  return function(arg) {
    var result;
    if(arg in cache) {
      result = cache[arg];
    } else {
      result = func(arg);
      cache[arg] = result;      
    }
    return result;
  }
  
}