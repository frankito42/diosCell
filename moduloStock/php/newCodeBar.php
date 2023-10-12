<?php
require "../../conn/conn.php";

    $sqlCode="SELECT MAX(codBarra) as code FROM `articulos` WHERE `codBarra`<10000 and `codBarra`>1000";
    $code=$conn->prepare($sqlCode);
    $code->execute();
    $code=$code->fetch(PDO::FETCH_ASSOC);
  /*   print_r($code); */
   if($code['code']==null){
        echo 1001;

    }else{
        echo $code['code']+1;
    }



?>