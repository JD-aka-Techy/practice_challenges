/*
  Try to rewrite the code of the function factorial in way to use recursion.
  function factorial(num){
    var result=num;
    for(var i=num-1; i!=0; i--){
      result *=i; 
    }
    return result;
  }
*/

/*
  returns factorial of number
*/
function factorial(num) {
  return num <= 1 ? 1 : num * factorial(num - 1);
}