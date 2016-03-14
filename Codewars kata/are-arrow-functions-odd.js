/*
  Time to test your basic knowledge in arrow functions! Return the odds from an array:
*/

function odds(values){
  // arrow it
  return values.filter( x => x % 2 != 0 );
}

/*
  Test.assertSimilar(odds([]), [], "Should handle empty array");
  Test.assertSimilar(odds([2, 4, 6]), [], "Should handle array with even numbers only");
  Test.assertSimilar(odds([1, 3, 5]), [1, 3, 5], "Should handle array with odd numbers only");
  Test.assertSimilar(odds([1, 2, 3, 4, 5, 6]), [1, 3, 5], "Should handle mixed array");
*/