<?php
require "conn.php";
$id=$_GET['id'];
$sqlCelulares="SELECT * FROM `articulos` WHERE `categoria`=$id";
$celus=$conn->prepare($sqlCelulares);
$celus->execute();
$celus=$celus->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($celus);

?>