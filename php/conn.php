<?php

$server = 'localhost';
$username = 'comprasv_fran';
$password = '020500Fran';
$database = 'comprasv_stocksistem';

try {
    $conn = new PDO("mysql:host=$server;dbname=$database;", $username, $password);
    /* echo "conexion exitosa"; */
} catch (PDOException $e) {
    die('Conexion fallida: lo sentimos mucho.'.$e->getMessage());
}
date_default_timezone_set('America/Argentina/Buenos_Aires');


?>