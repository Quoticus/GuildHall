<?php

namespace Guildhall\Job;

class Job {
  protected $name;
  protected $baseStat;

  public function _construct(string $name, string $baseStat) {
    $this->name = $name;
    $this->baseStat = $baseStat;
  }
}
