<?php
$server = 'localhost';
$username = 'root';
$password = '';
$database = 'dioscell';

try {
    $conn = new PDO("mysql:host=$server;dbname=$database;", $username, $password);
    /* echo "conexion exitosa"; */
} catch (PDOException $e) {
    die('Conexion fallida: lo sentimos mucho.'.$e->getMessage());
}



?>