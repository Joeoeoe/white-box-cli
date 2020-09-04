var family = {};
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
family.mother = new Person("Jane", "Smith");
family.father = new Person("John", "Smith");
family.daughter = new Person("Emily", "Smith");

console.table(family);