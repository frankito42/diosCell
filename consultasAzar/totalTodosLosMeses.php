<?php
require "../conn/conn.php";

$sqlSumaTodosLosMeses="SELECT MONTHNAME(`fechaV`) as mes ,SUM(`totalV`) as totalMes FROM ventas WHERE YEAR(fechaV)=YEAR(NOW()) GROUP BY MONTH(`fechaV`)";
$sumaMeses=$conn->prepare($sqlSumaTodosLosMeses);
$sumaMeses->execute();
$sumaMeses=$sumaMeses->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($sumaMeses);

?>