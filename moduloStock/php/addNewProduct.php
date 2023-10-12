<?php
require "../../conn/conn.php";
$articulo = $_POST;

    $sqlAddNewProduct="INSERT INTO `articulos`(`nombre`, `costo`,
    `descripcion`, `categoria`, `codBarra`,
    `idEsta`, `mayoritario`) VALUES 
    (:nombre,:costo,
    :desc,:cat,:cod,:idEsta,:mayo)";
    $addNewProduct=$conn->prepare($sqlAddNewProduct);
    $addNewProduct->bindParam(":nombre",$articulo['newNombreA']);
    $caracteres = Array(".",",");
    $resultado1 = str_replace($caracteres,"",$articulo['costoArticulo']);
    $resultado2 = str_replace($caracteres,"",$articulo['precioArticulo']);
    $resultado3 = str_replace($caracteres,"",$articulo['precioArticulo2']);
    $addNewProduct->bindParam(":costo",$resultado1);
    $addNewProduct->bindParam(":desc",$articulo['descripcionNewA']);
    $addNewProduct->bindParam(":cat",$articulo['categoriaNew']);
    $addNewProduct->bindParam(":cod",$articulo['codBarraNew']);
    $addNewProduct->bindParam(":idEsta",$articulo['newArticuloEnEstablecimiento']);
    $addNewProduct->bindParam(":mayo",$resultado3);
    if($addNewProduct->execute()){
    echo json_encode("perfecto");
}



?>