/*
  Write a function that takes an array and counts the number of each unique element present.
*/

function count(array){
  var count = {}
  
  array.forEach(function(val){
    count.hasOwnProperty(val) ? count[val] ++ : count[val] = 1;
  });
  
  return count;
}


/*
  Test.assertSimilar(count(['a', 'a', 'b', 'b', 'b']), { 'a': 2, 'b': 3 })
*/