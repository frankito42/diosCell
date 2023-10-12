<?php
session_start();
require "../../conn/conn.php";
$productos=json_decode($_POST['productos']);
$fecha=date("Y-m-d H:i:s");
foreach ($productos as $key) {
    $sqlTraerArticulo="UPDATE `articulos` SET `cantidad`=cantidad-:canti WHERE `articulo`=:id";
    $producto=$conn->prepare($sqlTraerArticulo);
    $cantidad=$key[2];
    $producto->bindParam(":canti",$cantidad);
    $producto->bindParam(":id",$key[0]);
    $producto->execute();

    $sqlInsertLibreta="INSERT INTO `libreta`(`nombreArticulo`, `idArticulo`, `idIntegrante`, `cantidad`, `precio`, `fecha`,idFamilia) 
    VALUES (:nombre,:id,:idInte,:cantidad,:precio,:fecha,:idFamilia)";
    $insertEnLibreta=$conn->prepare($sqlInsertLibreta);
    $insertEnLibreta->bindParam(":nombre",$key[1]);
    $insertEnLibreta->bindParam(":id",$key[0]);
    $insertEnLibreta->bindParam(":idInte",$key[4]);
    $insertEnLibreta->bindParam(":cantidad",$cantidad);
    $insertEnLibreta->bindParam(":precio",$key[3]);
    $insertEnLibreta->bindParam(":fecha",$fecha);
    $insertEnLibreta->bindParam(":idFamilia",$_POST['familia']);
    $insertEnLibreta->execute();
}


echo json_encode("perfecto");
?>