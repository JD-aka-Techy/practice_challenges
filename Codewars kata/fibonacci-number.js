/*
  write a function fib, that takes one parameter steps, and returns a number from the Fibonacci sequence,
  based on the parameter steps, which determines the position in Fibonacci number.

  For example fib(0) returns 0, fib(4) returns 3, fib(15) returns 610.
*/

var fib = function (steps) {
  var fibNum = [0, 1];
  for(var x = 0; x <= (steps - 2); x++){
    var len = fibNum.length;
    fibNum.push((fibNum[len-1] + fibNum[len-2]));
  }
  return fibNum[steps];
}