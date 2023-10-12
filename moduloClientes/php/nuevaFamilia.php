<?php
require "../../conn/conn.php";
    $sqlNewFamily="INSERT INTO `familia`(`nombreFamilia`) VALUES (:n)";
    $familia=$conn->prepare($sqlNewFamily);
    $familia->bindParam(":n",$_POST['nombreFamilia']);
    if($familia->execute()){
    echo json_encode("perfecto");
}



?>