<?php
require "../conn/conn.php";

$sqlCostosTotales="SELECT SUM(cantidad*`costo`) costo FROM `facturaentrada` WHERE YEAR(`fecha`)=YEAR(NOW())";
$costosMensuales=$conn->prepare($sqlCostosTotales);
$costosMensuales->execute();
$costosMensuales=$costosMensuales->fetch(PDO::FETCH_ASSOC);

echo json_encode($costosMensuales);

?>