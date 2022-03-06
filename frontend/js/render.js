"use strict";

/**
 * Truthfully, this document in it's current form is probably closer
 * to being garbage than actually usable. Considering the jump to
 * Node will require investigating how to build dynamic page objects
 * in a way that doesn't reference the document object.
 *
 * Or maybe even doing something different.
 */

function buildAdventurerCard(adventurer){
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
        td.innerHTML = adventurer.sex + " " + adventurer.race.name;
        break;
      case 2:
        td.innerHTML = "Level " + adventurer.level + " " + adventurer.job.name;
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
    td.style.padding = '2px 4px';
  }
  table.style.borderCollapse = "collapse";

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
    //saveData();
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

module.exports.render = buildAdventurerCard;
module.exports.render = fillAdventurersTable;
module.exports.render = createButton;
module.exports.render = createDebugButtons;
module.exports.render = updateAdventurerTile;
module.exports.render = drawMissionTable;
