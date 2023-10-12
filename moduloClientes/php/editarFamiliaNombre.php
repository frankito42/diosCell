<?php
require "../../conn/conn.php";
    $sqlUpdateNombreFamilia="UPDATE `familia` SET `nombreFamilia`='$_POST[editName]' WHERE `id`=$_POST[editNameFamiId]";
    $editNombre=$conn->prepare($sqlUpdateNombreFamilia);
    if($editNombre->execute()){
    echo json_encode("perfecto");
}



?>