// var str = "This is the string to count spaces";
// var button = document.getElementById("links");
// var links = ["https://www.fourside.com", "https://www.reddit.com", "https://www.google.com"]
// button.addEventListener("click", function(){
//   for(var i = 0; i < links.length; i++){
//     window.open(links[i], i);
//   }
// });

// function regExTest(){
//   var wordsAndNum = "These are 34 words 2 and 20.00 numbers"
//   var numbers = wordsAndNum.match(/\d+/);
//   console.log(numbers);
// }
//
// function splitTest(){
//   var str = "Button-5"
//   console.log(parseInt(str.split("-")[1]));
// }


// var requestURL = 'js/maleNames.json';
// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
// request.onload = function(){
//   var names = request.response;
//   console.log(names);
// }

// var data = require(maleNames.json);
// var names = data[0];

var adventurers = new Array();
var CLASSES = ["Paladin", "Wizard", "Thief", "Druid", "Priest"];
function Race(name, minAge, maxAge){
  this.name = name;
  this.minAge = minAge;
  this.maxAge = maxAge;
}
var RACIALATTRIBUTES = {Human: new Race("Human", 16, 80), Dwarf: new Race("Dwarf", 40, 400), Elf: new Race("Elf", 100, 800)};
var RACES = ["Human", "Dwarf", "Elf"]
var SEXES = ["Male", "Female"];

function Adventurer(){
  this.name = "Default";
  this.sex = SEXES[Math.round(Math.random())];
  this.race = RACES[Math.floor(Math.random() * RACES.length)];
  this.age = Math.floor(Math.random() * RACIALATTRIBUTES[this.race].maxAge)+RACIALATTRIBUTES[this.race].minAge;
  this.class = CLASSES[Math.floor(Math.random() * CLASSES.length)];
  this.level = 1;
}


console.log(new Adventurer());
console.log(new Adventurer());
console.log(new Adventurer());
console.log(new Adventurer());
console.log(new Adventurer());
// console.log(names);
