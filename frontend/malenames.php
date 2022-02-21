<?php

$names = fopen('./js/maleNames.txt', 'r');
//$filename = "male_insert_names";

if ($names) {
  //if (!file_exists("./".$filename.".txt")) {
  //  $insert_file = fopen();
  //}
  //$insert_file = fopen("./js/".$filename.".txt", "x");

  while (!feof($names)) {
    $buffer = fgets($names);

    if ($buffer) {
      $output = 'INSERT INTO names VALUE ("' . $buffer . '", "male");' . PHP_EOL;
      echo $output;
      //if ($insert_file) {
      //  fwrite($insert_file, $output);
      //}
    }
  }
  /*
  if ($insert_file) {
    fclose($insert_file);
    echo "INSERT File was written.";
  }
  */
  fclose($names);
}
