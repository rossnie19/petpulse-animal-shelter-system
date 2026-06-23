<?php
$servername = "localhost";
$username = "root";       // Default XAMPP username
$password = "";           // Default XAMPP password is empty
$database = "db_petpulse";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
// Connected successfully!
?>