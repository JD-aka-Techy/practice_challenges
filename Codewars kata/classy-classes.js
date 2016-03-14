/*
  Your task is to complete this Class, the Person class has been created. 
  You must fill in the Constructor method to accept a name as string and an age as number,
  complete the get Info property and getInfo method which should return
*/

class Person {

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  get info() {
    return `${this.name}s age is ${this.age}`;
  }
  
}

/*
  var john = new Person('john', 34)
  Test.assertEquals(john.info, 'johns age is 34')
*/