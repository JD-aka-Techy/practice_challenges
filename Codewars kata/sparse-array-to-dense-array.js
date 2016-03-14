/*
  Create a toDense() function that given a sparse array it returns the respective dense array.
*/

function toDense(sparse){
  return sparse.filter(function(item) { 
  	return item != undefined; 
  });
}

/*
  var sparse = [1, 2, , 3, , , 4, 5, , , ];
  Test.assertSimilar( toDense(sparse), [1, 2, 3, 4, 5]);

  var sparse = [undefined, 2, null, , , 0, 6, null];
  Test.assertSimilar( toDense(sparse), [2, 0, 6]);

  var sparse = [undefined, 2, null, , , 4, 6, null];
  Test.assertSimilar( toDense(sparse), [2, 4, 6]);

  var sparse = [,,,null,,,undefined,,,];
  Test.assertNotSimilar( toDense(sparse), [2, 4, 6]);
*/