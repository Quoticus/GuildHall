<?php

namespace Guildhall\Adventurer;

use Guildhall\Job
use Guildhall\Race

class Adventurer {
  private $sex;
  private $name;
  private $race;
  private $age;
  private $job;
  private $level;
  private $experience;
  private $stats = [
    "health" => 50,
    "strength" => 5,
    "agility" => 5,
    "stamina" => 5,
    "intelligence" => 5,
    "charisma" => 4,
    "luck" => 3
  ];

  function _construct(string $sex, string $name, Race $race, int $age, Job $job) {
    $this->name = $name;
    $this->sex = $sex;
    $this->race = $race;
    $this->job = $job;
    $this->level = 1;
    $this->experience = 0;
  }

}
