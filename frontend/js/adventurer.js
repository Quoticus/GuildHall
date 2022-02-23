"use strict";

let randomInterval = require("./randomInterval");

/**
 * Should have default values.
 *
 * sex - set passed value, or pick random from table.
 * name - set passed value, or pick random from table.
 * race - set passed value, or pick random from table.
 * age - set passed value, or pick random beween min/max from table.
 * job - set passed value, or pick random from table.
 * level - set passed value, or set to 1.
 * experience - set passed value, or set to 0.
 * stats - set passed value, create a default.
 *       - If setting default, calculate new stats based on race and job.
 */
class Adventurer {
  const experienceMod = 1500;

  constructor(sex, name, race, age, job, level, experience, stats) {
    this.sex = sex;
    this.name = name;
    this.race = race;
    this.age = age;
    this.job = job;
    this.level = level;
    this.experience = experience;
    this.stats = stats;
  }

  public function xpForLevel() {
    return this.level * this.experienceMod;
  }

  public function xpUntilNextLevel() {
    return this.xpForLevel() - this.experience;
  }

  public function checkForLevel() {
    if (this.xpUntilNextLevel() <= 0) {
      this.level++;
      this.levelUpStats();
    }
  }

  private function levelUpStats() {
    this.stats.forEach(function() {
      // Add 1-3 points to each stat.
      this += randomInterval(1, 3);
    });

    // Add to bonus stat.
    this.stats[this.job.primaryStat] += randomInterval(1, 3);
  }
}

module.exports.Adventurer = Adventurer;
