var timers = [];
var maleNames = (maleNamesList.split("\n")).filter(entity => String(entity).trim());
var femaleNames = (femaleNamesList.split("\n")).filter(entity => String(entity).trim());
var adventurers = new Array();
function Mission(){
  this.title = "Default Mission Name";
  this.adventurerSlots = 2; //Available Adventurer Slots
  this.difficulty = Math.floor(Math.random() * 10) + 1; //Difficulty level from 1 to 10
  this.rewards = {Experience: ((this.difficulty * 20)*this.adventurerSlots), Item1: "item1RefID", Item2: "item2RefID"};
}
var mission = new Mission();
function Job(name, list){
  this.name = name;
  this.bonusStats = {};
  for(var x in list){
    this.bonusStats[x] = list[x];
  }
}
var CLASSES = ["Paladin", "Wizard", "Thief", "Druid", "Priest"];
var CLASS_ATTRIBUTES = {
  Paladin: new Job("Paladin", {Stamina: 1}),
  Wizard: new Job("Wizard", {Intelligence: 1}),
  Thief: new Job("Thief", {Agility: 1}),
  Druid: new Job("Druid", {Strength: 1}),
  Priest: new Job("Priest", {Intelligence: 1})
};
function Race(name, minAge, maxAge){
  this.name = name;
  this.minAge = minAge;
  this.maxAge = maxAge;
}
var RACES = ["Human", "Dwarf", "Elf"];
var RACIAL_ATTRIBUTES = {
  Human: new Race("Human", 16, 80),
  Dwarf: new Race("Dwarf", 40, 400),
  Elf: new Race("Elf", 100, 800)
};
var SEXES = ["Male", "Female"];

function Adventurer(retrievedAdventurer){
  if(retrievedAdventurer != null){
    this.sex = retrievedAdventurer.sex;
    this.name = retrievedAdventurer.name;
    this.race = retrievedAdventurer.race;
    this.age = retrievedAdventurer.age;
    this.class = retrievedAdventurer.class;
    this.level = retrievedAdventurer.level;
    this.experience = retrievedAdventurer.experience;
    this.experienceToLevelModifier = retrievedAdventurer.experienceToLevelModifier;
    this.stats = {
      Health: retrievedAdventurer.stats.Health,
      Strength: retrievedAdventurer.stats.Strength,
      Agility: retrievedAdventurer.stats.Agility,
      Stamina: retrievedAdventurer.stats.Stamina,
      Intelligence: retrievedAdventurer.stats.Intelligence,
      Charisma: retrievedAdventurer.stats.Charisma,
      Luck: retrievedAdventurer.stats.Luck
    }
  }else{
    this.sex = SEXES[Math.round(Math.random())];
    this.name = this.sex.match(SEXES[0])?maleNames[Math.floor(Math.random() * maleNames.length)]:femaleNames[Math.floor(Math.random() * femaleNames.length)];
    this.race = RACES[Math.floor(Math.random() * RACES.length)];
    this.age = Math.floor(Math.random() * RACIAL_ATTRIBUTES[this.race].maxAge)+RACIAL_ATTRIBUTES[this.race].minAge;
    this.class = CLASSES[Math.floor(Math.random() * CLASSES.length)];
    this.level = 1;
    this.experience = 0;
    this.experienceToLevelModifier = 10;
    this.stats = {
      Health: 50,
      Strength: 5,
      Agility: 5,
      Stamina: 5,
      Intelligence: 5,
      Charisma: 4,
      Luck: 3
    }
  }

  this.expForNextlevel = function(){
    return ((this.level * this.experienceToLevelModifier) * (this.level * this.experienceToLevelModifier)) - this.experience;
  }
  this.checkForLevel = function(adven){
    adven.experience += adven.level * 25;
    if(adven.expForNextlevel() <= 0){
      adven.level++;
      adven.expForNextlevel();
      adven.levelUpStats();
    }
    updateAdventurerTile(adven);
  }
  this.autoUpdate = function(){
    var adventurer = this;
    timers.push(setInterval(this.checkForLevel, 500, adventurer));
  }
  this.baseStatIncrement = 1;
  this.maxStatIncrement = 3;
  this.stamBonus = 0;
  this.levelUpStats = function(){
    this.stats.Health -= this.stamBonus;
    for(var stat in this.stats){
        CLASS_ATTRIBUTES[this.class].bonusStats[stat]?this.stats[stat] += ((CLASS_ATTRIBUTES[this.class].bonusStats[stat])+Math.floor(Math.random() * this.maxStatIncrement)+this.baseStatIncrement):this.stats[stat] += Math.floor(Math.random() * this.maxStatIncrement)+this.baseStatIncrement;
    }
    this.stamBonus = Math.floor(this.stats.Stamina*1.5);
    this.stats.Health += this.stamBonus;
  }
  if(retrievedAdventurer == null){
      this.levelUpStats();
  }
}

function initializeAdventurers(){
  var retrievedAdventurers = retrieveData();
  for(var i = 0; i < 6; i++){
    if(retrievedAdventurers != null){
      adventurers.push(new Adventurer(retrievedAdventurers.shift()));
    }else{
      adventurers.push(new Adventurer());
    }
  }
}

initializeAdventurers();

function drawAdventurerTable(adventurer){
  var body = document.body;
  var table = document.createElement("table");
  table.setAttribute("id", adventurer.name);
  table.style.border = '1px solid black';
  for(var rows = 0; rows < 6; rows++){
    var tr = table.insertRow();
    var td = tr.insertCell();

    switch(rows){
      case 0:
        td.innerHTML = adventurer.name;
        td.style.background = 'lightgreen';
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
        td.innerHTML = "Experience to Next Level: " + adventurer.expForNextlevel();
        break;
      case 5:
        var statsString = "";
        for(var stat in adventurer.stats){
          statsString += "<br/> "+stat+": "+adventurer.stats[stat];
        }
        td.innerHTML = "STATS"+statsString;
    }
    td.style.border = '1px solid black';
    td.style.padding = '2px';
    td.style.paddingLeft = '4px';
    td.style.paddingRight = '4px';
  }
  table.style.borderCollapse = "collapse";

  return table;
}

function fillAdventurersTable(adventurers){
  var adventurersList = [];
  for(var adven in adventurers){
    adventurersList.push(adventurers[adven]);
  }
  var adventurersTable = document.getElementById("adventurersTable");
  var tableRows = adventurersTable.rows;
  for(var y = 0; y < tableRows.length; y++){
    var rowCells = adventurersTable.rows[y].cells;
    for(var x = 0; x < rowCells.length; x++){
      rowCells[x].appendChild(drawAdventurerTable(adventurersList.shift()));
      rowCells[x].style.border = '2px solid black';
      rowCells[x].style.padding = '5px';
    }
  }
  adventurersTable.style.borderCollapse = "collapse";
}

function updateAdventurerTile(adventurer){
  var adventurerTable = document.getElementById(adventurer.name);
  var adventurerTableContainer = adventurerTable.parentElement;

  adventurerTable.remove();
  adventurerTableContainer.appendChild(drawAdventurerTable(adventurer));
}

function drawMissionTable(mission){
  //console.log(mission);
  var table = document.createElement("TABLE");
  table.insertRow().insertCell.innerHTML = "MISSION";
  for(var info in mission){
      var cell = table.insertRow().insertCell();
      if(mission[info] instanceof Object){
        cell.innerHTML += "REWARDS" + "<br>";
        for(var item in mission[info]){
          cell.innerHTML += item + ": " + mission.rewards[item]+ "<br>";
        }
      }else{
        cell.innerHTML = mission[info];
      }
      cell.style.border = '1px solid black';
  }
  document.body.appendChild(table);
}

fillAdventurersTable(adventurers);

document.getElementById("startLevelup").addEventListener("click", function(){
  for(var adven in adventurers){
    adventurers[adven].autoUpdate();
  }
  this.disabled = true;
  document.getElementById("stopLevelup").disabled = false;
});
document.getElementById("stopLevelup").addEventListener("click", function(){
  for(var timer in timers){
    clearInterval(timers[timer]);
  }
  timers = [];
  this.disabled = true;
  document.getElementById("startLevelup").disabled = false;
  saveData();
});
document.getElementById('deleteAdventurers').addEventListener("click", function(){
  localStorage.removeItem('adventurers');
  location.reload();
});

function saveData(){
  console.log("Data has been saved");
  localStorage.setItem('adventurers', JSON.stringify(adventurers));
}

function retrieveData(){
  var retrievedAdventurers = JSON.parse(localStorage.getItem('adventurers'));
  if(retrievedAdventurers == null){
    console.log("Data has not been retrieved");
  }else{
    console.log("Data has been retrieved");
  }
  return retrievedAdventurers;
}
