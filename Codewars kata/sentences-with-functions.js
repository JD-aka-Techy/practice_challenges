/*
  Implement all required functions in order to create the following sentences by calling those functions:

  Adam(has(a(dog()))); // must return "Adam has a dog."
  The(name(of(the(dog(is(also(Adam()))))))); // must return "The name of the dog is also Adam."
*/

function endCheck(f){
  return f == undefined ? '.' : ' ' + f;
}
function Adam(f) {return 'Adam' + endCheck(f)}
function has(f) {return 'has' + endCheck(f)}
function a(f) { return 'a' + endCheck(f)}
function dog(f) {return 'dog' + endCheck(f)}
function The(f) {return 'The' + endCheck(f)}
function name(f) {return 'name' + endCheck(f)}
function of(f) {return 'of' + endCheck(f)}
function the(f) {return 'the' + endCheck(f)}
function is(f) {return 'is' + endCheck(f)}
function also(f) {return 'also' + endCheck(f)}