<?php
/*
Don't uncomment the following code block unless you've already deleted the
`names` table of the database and are looking to rebuild it. As this will
permanently ruin the existing data.
*/

/*
$male_names = fopen('./js/maleNames.txt', 'r');
$female_names = fopen('./js/femaleNames.txt', 'r');

$host = "backend";
$user = "root";
$pass = "root";
$database = "guildhall";

$conn = new mysqli($host, $user, $pass, $database);

if ($conn->connect_error) {
  die("Connection Failed: " . $conn->connect_error);
}
echo "Connection Successful";

$male_names_array = namesToArray($male_names);
$female_names_array = namesToArray($female_names);
//$intersect = array_intersect($male_names_array, $female_names_array);
//var_dump($intersect);

databaseInsert($conn, $male_names_array, 'male');
databaseInsert($conn, $female_names_array, 'female');
$conn->close();
*/
echo "Database table is already written";

function databaseInsert($conn, $names, $gender) {
  foreach($names as $name) {
    $query = 'INSERT INTO names (name, gender) VALUES ("'.$name.'", "'.$gender.'") ON DUPLICATE KEY UPDATE gender="both"';
    $conn->query($query);
  }
}

function namesToArray($names) {
  $names_array = [];
  if ($names) {
    while (!feof($names)) {
      $name = fgets($names);

      if ($name) {
        $names_array[] = str_replace(array("\r", "\n"), "", $name);
      }
    }
  }
  fclose($names);
  return $names_array;
}
