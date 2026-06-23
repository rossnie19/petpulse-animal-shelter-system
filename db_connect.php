<?php
$servername = "sql123.infinityfree.com"; // Put your InfinityFree MySQL Hostname here
$username = "if0_34567890";             // Put your InfinityFree Username here
$password = "YourHostingPassword";       // Put your InfinityFree Password here
$database = "if0_34567890_db_petpulse";  // Put your InfinityFree Database Name here

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
?>