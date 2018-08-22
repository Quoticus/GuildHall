var maleNames = (maleNamesList.split("\n")).filter(entity => String(entity).trim());
var femaleNames = (femaleNamesList.split("\n")).filter(entity => String(entity).trim());
var adventurers = new Array();
function Job(name, list){
  this.name = name;
  this.bonusStats = {};
  for(var x in list){
    this.bonusStats[x] = list[x];
  }
}
var CLASSES = ["Paladin", "Wizard", "Thief", "Druid", "Priest"];
var CLASSATTRIBUTES = {
  Paladin: new Job("Paladin", {Stamina: 4}),
  Wizard: new Job("Wizard", {Intelligence: 4}),
  Thief: new Job("Thief", {Agility: 4}),
  Druid: new Job("Druid", {Strength: 4}),
  Priest: new Job("Priest", {Intelligence: 4})
};
function Race(name, minAge, maxAge){
  this.name = name;
  this.minAge = minAge;
  this.maxAge = maxAge;
}
var RACES = ["Human", "Dwarf", "Elf"]
var RACIALATTRIBUTES = {
  Human: new Race("Human", 16, 80),
  Dwarf: new Race("Dwarf", 40, 400),
  Elf: new Race("Elf", 100, 800)
};
var SEXES = ["Male", "Female"];

function Adventurer(){
  this.sex = SEXES[Math.round(Math.random())];
  this.name = this.sex.match(SEXES[0])?maleNames[Math.floor(Math.random() * maleNames.length)]:femaleNames[Math.floor(Math.random() * femaleNames.length)];
  this.race = RACES[Math.floor(Math.random() * RACES.length)];
  this.age = Math.floor(Math.random() * RACIALATTRIBUTES[this.race].maxAge)+RACIALATTRIBUTES[this.race].minAge;
  this.class = CLASSES[Math.floor(Math.random() * CLASSES.length)];
  this.level = 1;
  this.experience = 0;
  this.stats = {
    Health: 50,
    Strength: 5,
    Agility: 5,
    Stamina: 5,
    Intelligence: 5,
    Charisma: 4,
    Luck: 3
  }
  for(var stat in this.stats){
      CLASSATTRIBUTES[this.class].bonusStats[stat]?this.stats[stat] += ((CLASSATTRIBUTES[this.class].bonusStats[stat])+Math.floor(Math.random() * 3)+2):this.stats[stat] += Math.floor(Math.random() * 3)+1;
  }
}

for(var i = 0; i < 6; i++){
  adventurers.push(new Adventurer());
}

for(var adven in adventurers){
  //console.log(adventurers[adven])
  drawAdventurerTable(adventurers[adven], adventurers);
}

function drawAdventurerTable(adventurer, adventurersList){
  //console.log(adventurer.name);
  var body = document.body;
  var table = document.createElement("table");
  table.style.width = '200px';
  table.style.border = '1px solid black';
  for(var rows = 0; rows < 5; rows++){
    var tr = table.insertRow();
    var td = tr.insertCell();
    switch(rows){
      case 0:
        td.innerHTML = adventurer.name;
        break;
      case 1:
        td.innerHTML = adventurer.sex + " " + adventurer.race;
        break;
      case 2:
        td.innerHTML = "Level " + adventurer.level + " " + adventurer.class;
        break;
      case 3:
        td.innerHTML = "Experience Points: " + adventurer.experience;
        break;
      case 4:
        var statsString = "";
        for(var stat in adventurer.stats){
          statsString += "<br/> "+stat+": "+adventurer.stats[stat];
        }
        td.innerHTML = "STATS"+statsString;
    }
    td.style.border = '1px solid black';
  }
  table.style.borderCollapse = "collapse";
  body.appendChild(table);
  body.appendChild(document.createElement("br"));
}
