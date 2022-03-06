var Adventurer = require('./Adventurer');
var Job = require('./Job');
var Race = require('./Race');
var render = require('./render');

job1 = new Job('Paladin', 'Stamina');
race1 = new Race();
stats1 = [
  'Health' => 50,
  'Strength' => 5,
  'Agility' => 5,
  'Stamina' => 5,
  'Intelligence' => 5,
  'Charisma' => 4,
  'Luck' => 3
];
adven1 = new Adventurer('TestName', 'Male', race1, '40', job1, 1, 0, stats1);

render.buildAdventurerCard(adven1);
