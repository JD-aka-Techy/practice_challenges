/*
  Why the function fixMe() is not working?

  function fixMe() {
    var numbers = [];
    var i = 0;
  
    for (; i < 10; i++) {
  	
      numbers[i] = function () {
        return i;
      };

    }

    return numbers;
  }

*/

function fixMe() {
  var numbers = [];
  var i = 0;
  
  function closureFunc(i) {
      return function(){
        return i;
      };
    };
  
  for (; i < 10; i++) {    
    numbers[i] = closureFunc(i);
  }

  return numbers;
}

/*
  var numbers = fixMe();
  var i = 0;

  Test.assertEquals(numbers.length, 10);

  for (; i < 10; i++) {
    Test.assertEquals(numbers[i](), i);
  }

  for (i = 0; i < 10; i++) {
    Test.assertEquals(numbers[i].toString().replace(/[ \t\n;]/g, ''), 'function(){returni}');
  }
*/