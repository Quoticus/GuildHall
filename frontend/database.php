<?php
$servername = "backend";
$username = "root";
$password = "root";
$database = "guildhall";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

$result = $conn->query("SELECT name, gender FROM names");

if ($result->num_rows > 0) {
  // output data of each row
  while ($row = $result->fech_assoc()) {
    echo "Name: " . $row['name'] . " - Gender: " . $row['gender'] . "</br>";
  }
} else {
  echo "0 Results";
}
$conn->close();
?>
