<?php
session_start();
require "../../conn/conn.php";

$sqlFamilias="SELECT * FROM `familia`";
$familias=$conn->prepare($sqlFamilias);
$familias->execute();
$familias=$familias->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($familias);



?>