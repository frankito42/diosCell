<?php
session_start();
require "../../conn/conn.php";
$vandera="true";
$caracteres = Array(",");
$resultado1 = str_replace($caracteres,"",$_POST['pagoCon']);
$pagoCon=floatval($resultado1);
$idFamilia=$_POST['idFamilia'];
/* TRAIGO EL CREDITO DEL CLIENTE */
$sqlCredito="SELECT * FROM `familia` WHERE `id`=$_POST[idFamilia]";
$credito=$conn->prepare($sqlCredito);
$credito->execute();
$credito=$credito->fetch(PDO::FETCH_ASSOC);
/* SUMO EL CREDITO DEL CLIENTE */
$fecha2=date("Y-m-d H:i:s");
$addHistorial="INSERT INTO `entregalibreta`(`idLibreta`, `monto`, `fecha`) VALUES(:id,:m,:f)";
$historial=$conn->prepare($addHistorial);
$historial->bindParam(":id",$_POST['idFamilia']);
$historial->bindParam(":m",$pagoCon);
$historial->bindParam(":f",$fecha2);
$historial->execute();
$pagoCon+=floatval($credito['credito']);








/* SELECIONO LOS PRODUCTOS DE PENDIENTES DE PAGO EN LA LIBRETA */
/* SELECIONO LOS PRODUCTOS DE PENDIENTES DE PAGO EN LA LIBRETA */
$sqlProductosLibretaFamilia="SELECT `idLibreta`, `nombreArticulo`, `idArticulo`, `idIntegrante`, `cantidad`, `precio`, `fecha`, `idFamilia` FROM `libreta` WHERE `idFamilia`=:idFamilia and estado='pendiente' ORDER BY `libreta`.`precio` ASC";
$productosLibretaFamilia=$conn->prepare($sqlProductosLibretaFamilia);
$productosLibretaFamilia->bindParam(":idFamilia",$idFamilia);
$productosLibretaFamilia->execute();
$productosLibretaFamilia=$productosLibretaFamilia->fetchAll(PDO::FETCH_ASSOC);
$totalProducto=0;
$totalPagado=0;

/* INSERTO EN LA TABLA VENTAS */
$fecha=date("Y-m-d");
$addNewVenta="INSERT INTO `ventas`(`fechaV`, `idUser`,idEstablecimiento,tipoPago) VALUES (:fecha,:idUser,:idEsta,'efectivo')";
$addVenta=$conn->prepare($addNewVenta);
$addVenta->bindParam(":fecha",$fecha);
$addVenta->bindParam(":idUser",$_POST['idUsuario']);
$addVenta->bindParam(":idEsta",$_POST['establecimiento']);
$addVenta->execute();


$idVenta=$conn->lastInsertId();






/* RECORRO LOS PRODUCTOS PENDIENTES DEL CLIENTE */
foreach ($productosLibretaFamilia as $key) {
    $totalProducto=floatval($key['cantidad'])*floatval($key['precio']);
   /*  echo json_encode($pagoCon); */
    if ($pagoCon>=$totalProducto) {
        $vandera="false";
        $totalPagado+=$totalProducto;
        $sqlPagarArticulo="UPDATE `libreta` SET `estado`='pagado' WHERE `idLibreta`=$key[idLibreta]";
        $pagar=$conn->prepare($sqlPagarArticulo);
        $pagar->execute();


        $sqlInsetDetailVenta="INSERT INTO `detalleventa`(`idV`, `nombreProducto`, `cantidadV`, `precio`, `fecha`,idArticulo)
        VALUES (:idVenta,:nombre,:cantidadV,:precio,:fecha,:idArticulo)";
        $insertDetailVenta=$conn->prepare($sqlInsetDetailVenta);
        $insertDetailVenta->bindParam(":idVenta",$idVenta);
        $insertDetailVenta->bindParam(":nombre",$key['nombreArticulo']);
        $insertDetailVenta->bindParam(":cantidadV",$key['cantidad']);
        $insertDetailVenta->bindParam(":precio",$key['precio']);
        $insertDetailVenta->bindParam(":fecha",$fecha);
        $insertDetailVenta->bindParam(":idArticulo",$key['idArticulo']);
        $insertDetailVenta->execute();










        $pagoCon-=$totalProducto;
        /* echo json_encode($pagoCon); */
    }
}
if ($vandera=="true") {
    $deleteSql="DELETE FROM `ventas` WHERE `idVenta`=:id";
    $deleteVenta=$conn->prepare($deleteSql);
    $deleteVenta->bindParam(":id",$idVenta);
    $deleteVenta->execute();
}else{
    $updateVenta="UPDATE `ventas` SET `totalV`=:total WHERE `idVenta`=:id";
    $update=$conn->prepare($updateVenta);
    $update->bindParam(":total",$totalPagado);
    $update->bindParam(":id",$idVenta);
    $update->execute();
}



$sqlUpdateCredito="UPDATE `familia` SET `credito`='$pagoCon' WHERE `id`=$_POST[idFamilia]";
$editCredito=$conn->prepare($sqlUpdateCredito);
$editCredito->execute();

echo json_encode("perfecto");
?>