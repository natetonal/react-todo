// function add(a,b){
//     return a + b;
// }
//
// console.log(add(3,1));
//
// var toAdd = [9, 5];
// //add(toAdd[0], toAdd[1]);
//
// console.log(add(...toAdd));

// var groupA = ['Nick', 'Paul'];
// var groupB = ['Vince'];
// // using the spread operator, the elements of groupA become elements of final, rather than just passing in the array.
// var final = [...groupB, 3, ...groupA];
//
// console.log(final);

var person = ['Andrew', 25];
var personTwo = ['Jen', 29];
// Hi Andrew! You are 25.

function greet(name, age){
    return `Hi ${name}! You are ${age} years old.`;
}

console.log(greet(...person));
console.log(greet(...personTwo));

var names = ['Mike', 'Ben'];
var final = [...names, 'Nate'];
// Hi Nate!

final.forEach((name) => {
    console.log(`Greetings, ${name}!`)
});
