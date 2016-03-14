/*
  Write a generic function chainer that takes a starting value
  and an array of functions to execute on it (array of symbols for ruby).

  The input for each function is the output of the previous function
  (except the first function, which takes the starting value as it's input).
  Return the final value after execution is complete.
*/

function chain(input, fs) {
  return fs.reduce(function(acc, func){
    return func(acc);
  },input);
}