/*
  write me a function stringy that takes a size and returns a string of alternating '1s' and '0s'.

  the string should start with a 1.

  a string with size 6 should return :'101010'.

  with size 4 should return : '1010'.

  with size 12 should return : '101010101010'.

  The size will always be positive and will only use whole numbers.
*/

function stringy(size) {
  // ES6 => return "10".repeat(Math.round(size/2)).slice(0,size);
  var str = '';
  for (var x = 0; x < size; x++) {
    str += (x % 2 == 0) ? '1' : '0';
  }
  return str;
}

/*
  Test.describe("the stringy function", function() {

  Test.it('Should return a string', function() {
    Test.assertEquals(typeof stringy(3), 'string',
    'Make sure it\'s a string not a number (the function is called stringy after all!)');
  });

  Test.it('Should start with a 1', function() {
    Test.assertEquals(stringy(3)[0], '1',
    'Whoops your string doesnt start with a 1?');
  });  

  Test.it('Should have the correct length', function() {  
    for(let i = 0; i < 10; ++i){
      let parameter = (Math.random() * 50 + 1) | 0;
      Test.assertEquals(stringy(parameter).length, parameter, 'Wrong length on ' + parameter);
    }
  });
});
*/