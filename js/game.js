var timers = [];
var maleNames = (maleNamesList.split("\n")).filter(entity => String(entity).trim());
var femaleNames = (femaleNamesList.split("\n")).filter(entity => String(entity).trim());
var tempAdventurers = new Array();
tempAdventurers.name = "tempAdventurers";
var permanentAdventurers = new Array();
permanentAdventurers.name = "permanentAdventurers";
function Mission(){
  this.title = "Default Mission Name";
  this.adventurerSlots = 2; //Available Adventurer Slots
  this.difficulty = Math.floor(Math.random() * 10) + 1; //Difficulty level from 1 to 10
  this.rewards = {Experience: ((this.difficulty * 255)/this.adventurerSlots), Item1: "item1RefID", Item2: "item2RefID"};
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
  if(retrievedAdventurers != null){
    var counter = retrievedAdventurers.length;
    for(var i = 0; i < counter; i++){
      permanentAdventurers.push(new Adventurer(retrievedAdventurers.shift()));
    }
  }else{
    console.log("No Existing Adventurer Data");
  }
}

function initializeTempAdventurers(amountToTemp){
  var tempAdventurersName = tempAdventurers.name;
  tempAdventurers = [];
  for(var i = 0; i < amountToTemp; i++){
    tempAdventurers.push(new Adventurer());
  }
  tempAdventurers.name = tempAdventurersName;
}

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
  table.setAttribute("draggable", "true");
  table.setAttribute("ondragstart", "drag(event)");

  return table;
}

/*
  This function would benefit from creating the Elements dynamically.
  Using a formuila of !(adventures.length % colAmount) would help to separate
  the adventurers into columns numbering 3, 4, or 5. This'll be an implementation
  for when I want to build a menu that displays all available adventurers for
  recruitment or that are already owned.
*/
function fillAdventurersTable(adventurers){
  console.log(adventurers.name);
  if(adventurers != null && adventurers.length){
    var adventurersList = [];
    for(var adven in adventurers){
      adventurersList.push(adventurers[adven]);
    }
    var adventurersTable = document.createElement("TABLE");
    adventurersTable.setAttribute("id", adventurers.name);
    var colCount = 3;
    for(var count = 0; count < adventurers.length/colCount; count++){
      var currentRow = adventurersTable.insertRow();
      for(var x = 0; x < colCount; x++){
        var currentCell = currentRow.insertCell();
        if(adventurersList.length){
          currentCell.appendChild(drawAdventurerTable(adventurersList.shift()));
        }
        currentCell.style.border = '2px solid black';
        currentCell.style.padding = '5px';
      }
    }
    adventurersTable.style.borderCollapse = "collapse";
    document.body.appendChild(adventurersTable);
    if(adventurers.name == permanentAdventurers.name){
      createDebugButtons(adventurers.name);
    }
  }else{
    console.log("Passed Adventurers List Empty");
  }
}

function createButton(id, text){
  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("id", id);
  button.innerHTML = text;

  return button;
}

function createDebugButtons(){
  document.body.appendChild(createButton("startLevelUp", "Start Level-up Process"));
  document.body.appendChild(createButton("stopLevelUp", "Stop Level-up Process"));
  document.body.appendChild(createButton("deleteAdventurers", "Delete Adventurers"));

  //This is a debug button.
  document.getElementById("startLevelUp").addEventListener("click", function(){
    for(var adven in permanentAdventurers){
      if(permanentAdventurers[adven] instanceof Adventurer)
      permanentAdventurers[adven].autoUpdate();
    }
    this.disabled = true;
    document.getElementById("stopLevelUp").disabled = false;
  });
  //This is a debug button.
  document.getElementById("stopLevelUp").addEventListener("click", function(){
    for(var timer in timers){
      clearInterval(timers[timer]);
    }
    timers = [];
    this.disabled = true;
    document.getElementById("startLevelUp").disabled = false;
    saveData();
  });
  //This is a debug button.
  //This process will be much more streamlined and will occur without a reload.
  document.getElementById('deleteAdventurers').addEventListener("click", function(){
    localStorage.removeItem('adventurers');
    location.reload();
  });
}


function updateAdventurerTile(adventurer){
  var adventurerTable = document.getElementById(adventurer.name);
  var adventurerTableContainer = adventurerTable.parentElement;

  adventurerTable.remove();
  adventurerTableContainer.appendChild(drawAdventurerTable(adventurer));
}

function drawMissionTable(mission){
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
        switch(info){
          case 'difficulty':
            cell.innerHTML += "Difficulty: ";
            break;
          case 'adventurerSlots':
            cell.innerHTML += "Adventurer Slots: ";
            break;
          case 'title':
            cell.style.background = 'orange';
            break;
          default:
            cell.innerHTML += info+": ";
        }
        cell.innerHTML += mission[info];
      }
      cell.style.border = '1px solid black';
      cell.style.padding = '2px';
  }
  table.style.borderCollapse = "collapse";
  document.body.appendChild(table);
}

function saveData(){
  console.log("Data has been saved");
  localStorage.setItem('adventurers', JSON.stringify(permanentAdventurers));
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

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

//Actual Execution Sequence Stage
initializeAdventurers();
fillAdventurersTable(permanentAdventurers);
initializeTempAdventurers(6);
fillAdventurersTable(tempAdventurers);
