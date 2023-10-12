<?php
session_start();
require "../../conn/conn.php";
$sqlIntegrantes="SELECT * FROM `integrantes`";
$integrantes=$conn->prepare($sqlIntegrantes);
$integrantes->execute();
$integrantes=$integrantes->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($integrantes)
?>