<?php
$servername = "sql208.infinityfree.com"; // Put your InfinityFree MySQL Hostname here
$username = "if0_42250354";             // Put your InfinityFree Username here
$password = "petpulserfkp67";       // Put your InfinityFree Password here
$database = "if0_42250354_db_petpulse";  // Put your InfinityFree Database Name here

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
?>