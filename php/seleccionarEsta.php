<?php
session_start();
 
$_SESSION['establecimiento']=$_POST['selectEsta'];
echo json_encode("okey");



?>