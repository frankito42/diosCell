<?php
session_start();
$local="";
$suma=0;
require "../conn/conn.php";
date_default_timezone_set('America/Argentina/Buenos_Aires');
?>

<style>
	
* {
    font-size: 100%;
    font-family: 'Times New Roman';
}

td,
th,
tr,
table {
    border-top: 1px solid black;
    border-collapse: collapse;
        margin: 0 auto;

}

td.producto,
th.producto {
    width: 75px;
    max-width: 75px;
}

td.cantidad,
th.cantidad {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

td.precio,
th.precio {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

.centrado {
    text-align: center;
    align-content: center;
}

.ticket {
    width: 100%;
    max-width: 100%;
}

img {
    max-width: inherit;
    width: inherit;
}
</style>

<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <div class="ticket">
            <!-- <img
                src="../moduloTicket/photo.jpg"
                alt="Logotipo"> -->
                <p class="centrado">--------------------user: <span id="hola"></span></p>
            <p class="centrado">DIOS CELL
                <br>Todos los productos
                <br><?php echo date("d/m/Y H:i")?></p>
              <table>
                <thead>
                    <tr>
                        <th>C</th>
                        <th>PRODUCTO</th>
                        <th>$$</th>
                    </tr>
                </thead>
                <tbody>
					<?php foreach ($_SESSION['imprimir'] as $key): $suma+=$key[2]*$key[3]?>
                    <tr>
                        <td><?php echo $key[2]?></td>
                        <td><?php echo $key[1]?></td>
                        <td><?php echo "$".(number_format($key[2]*$key[3]))?></td>
                    </tr>
					<?php
						endforeach
					?>

                    <tr>
                        <td></td>
                        <td>TOTAL</td>
                        <td>$<?php echo number_format($suma)?></td>
                    </tr>
                </tbody>
            </table>
            <p class="centrado">¡GRACIAS POR SU COMPRA!
                <br>DIOS CELL</p>
            <p class="centrado">------------------------------</p>
            <p class="centrado">------------------------------</p>
            <p class="centrado">------------------------------</p>
            
        </div>
    </body>
    <script>
        let logo=JSON.parse(localStorage.getItem("user")).user
        document.getElementById("hola").innerHTML=logo
    </script>
</html>
 