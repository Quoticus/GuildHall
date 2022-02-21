<?php

namespace Guildhall\Race;

class Race {
  protected $name;
  protected $minAge;
  protected $maxAge;

  public function _construct(string $name, int $minAge, int $maxAge) {
    $this->name = $name;
    $this->minAge = $minAge;
    $this->maxAge = $maxAge;
  }
}
