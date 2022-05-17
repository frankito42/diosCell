<?php
require "../conn/conn.php";

$sqlSumaVentasMes="SELECT SUM(`totalV`) as totalMes FROM ventas WHERE YEAR(fechaV)=YEAR(NOW()) AND MONTH(`fechaV`) = MONTH(NOW())";
$sumaMes=$conn->prepare($sqlSumaVentasMes);
$sumaMes->execute();
$sumaMes=$sumaMes->fetch(PDO::FETCH_ASSOC);

echo json_encode($sumaMes);



?>