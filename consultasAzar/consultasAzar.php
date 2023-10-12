<?php
session_start();
require "../conn/conn.php";

$sqlSumaVentasDelDia="SELECT SUM(`totalV`) as totalDia FROM ventas WHERE idEstablecimiento=1 and `fechaV`=CURDATE()";
$totalDia=$conn->prepare($sqlSumaVentasDelDia);
$totalDia->execute();
$totalDia=$totalDia->fetch(PDO::FETCH_ASSOC);

echo json_encode($totalDia);



?>