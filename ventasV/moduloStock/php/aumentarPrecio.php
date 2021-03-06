<?php
require "../../conn/conn.php";

$porcentaje=$_GET['porcentaje'];

if(isset($_GET['idPro'])){
    $sqlTodosLosArticulos="SELECT * FROM `articulos` where idProveedor=:id";
    $articulos=$conn->prepare($sqlTodosLosArticulos);
    $articulos->bindParam(":id",$_GET['idPro']);
    $articulos->execute();
    $articulos=$articulos->fetchAll(PDO::FETCH_ASSOC);
}else{
    $sqlTodosLosArticulos="SELECT * FROM `articulos`";
    $articulos=$conn->prepare($sqlTodosLosArticulos);
    $articulos->execute();
    $articulos=$articulos->fetchAll(PDO::FETCH_ASSOC);
}


foreach ($articulos as $key) {
    $aumento=($key['precioVenta']*$porcentaje/100)+$key['precioVenta'];
    $aumento2=($key['mayoritario']*$porcentaje/100)+$key['mayoritario'];
    $sqlUpdateArticulo="UPDATE `articulos` SET `precioVenta`=:precio, `mayoritario`=:ma
                                                 WHERE `articulo`=:articulo";
    $editProducto=$conn->prepare($sqlUpdateArticulo);
    $editProducto->bindParam(":precio",$aumento);
    $editProducto->bindParam(":ma",$aumento2);
    $editProducto->bindParam(":articulo",$key['articulo']);
    
    $editProducto->execute();

}




?>