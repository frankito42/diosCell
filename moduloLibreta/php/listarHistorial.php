<?php
require "../../conn/conn.php";
$sqlHistorial="SELECT fa.id, fa.nombreFamilia, enLi.`idLibreta`, enLi.`monto`, enLi.`fecha` FROM `entregalibreta` as enLi JOIN familia as fa on fa.id=enLi.idLibreta WHERE fa.id=$_GET[id] order BY enLi.id DESC;";
$historial=$conn->prepare($sqlHistorial);
$historial->execute();
$historial=$historial->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($historial);
?>