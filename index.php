<?php 
$local="";
require "conn/conn.php";
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="mdb/css/bootstrap.min.css">
    <link rel="stylesheet" href="mdb/css/mdb.min.css">
    <link rel="stylesheet" href="mdb/css/all.min.css">
    <title>Inicio</title>
</head>
<body>
    <section>
        <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color">
        <a class="navbar-brand" href="#"><?php echo $local["nombre"]?></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link waves-effect waves-light" href="index.php">inicio
                <span class="sr-only">(current)</span>
                </a>
            </li>
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Productos
                  </a>
                  <div class="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-3">
                  <a class="dropdown-item waves-effect waves-light" href="moduloStock/stock.php">Stock</a>
                  <a class="dropdown-item waves-effect waves-light" href="moduloCategorias/categorias.php">Categorias</a>
                  <!-- <a class="dropdown-item waves-effect waves-light" href="#">Something else here</a> -->
                  </div>
              </li>
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="moduloCompras/compras.php">Compras</a>
            </li>
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="moduloVentas/ventas.php">Ventas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="moduloLibreta/libreta.php">Libreta</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Admin
                </a>
                <div class="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-3">
                <a class="dropdown-item waves-effect waves-light" href="moduloProvedor/provedor.php">Provedores</a>
                                <a class="dropdown-item waves-effect waves-light" href="moduloClientes/clientes.php">Clientes</a>
<!--                 <a class="dropdown-item waves-effect waves-light" href="../moduloLaboratorios/laboratorios.php">Laboratorios</a>
 -->                <a class="dropdown-item waves-effect waves-light" href="moduloVentasDetalle/todasLasVentas.php">Caja</a>
                </div>
            </li>
            </ul>
            <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="#">
                <i class="fas fa-envelope"></i> Contacto
                <span class="sr-only">(current)</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="#">
                <i class="fas fa-gear"></i> Configuraciones</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-user"></i> <span id="userNameID"></span></a>
                <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                <a class="dropdown-item waves-effect waves-light" href="#">Mi cuenta</a>
                <a class="dropdown-item waves-effect waves-light" id="cerrarSession">Cerrar sesion</a>
                </div>
            </li>
            </ul>
        </div>
        </nav>
    </section>
    <section>
    <div class="container-fluid my-4 py-4">

<!-- Section: Block Content -->
<section>
  
  <style>
    .footer-hover {
      background-color: rgba(0, 0, 0, 0.1);
      -webkit-transition: all .3s ease-in-out;
      transition: all .3s ease-in-out
    }

    .footer-hover:hover {
      background-color: rgba(0, 0, 0, 0.2)
    }

    .text-black-40 {
      color: rgba(0, 0, 0, 0.4)
    }
  </style>

  <!-- Grid row -->
  <div class="row">

     

    <!-- Grid column -->
    <div class="col-lg-12 mb-6">

      <!-- Card -->
      <div class="card warning-color white-text">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <p id="EstablecimientoMostrar" class="h2-responsive font-weight-bold mt-n2 mb-0">Cargando...</p>
          </div>
          <div>
            <i class="fas fa-chart-bar fa-4x text-black-40"></i>
          </div>
        </div>
        <a class="card-footer footer-hover small text-center white-text border-0 p-2">Mas informacion<i class="fas fa-arrow-circle-right pl-2"></i></a>
      </div>
      <!-- Card -->

    </div>
    <!-- Grid column -->
 

  </div>
  <!-- Grid row -->

</section>
<!-- Section: Block Content -->

</div>
    </section>
    <section>
    <div class="container my-5 pt-5 pb-2 px-4 z-depth-1">


    <!--Section: Block Content-->
    <section>

      <!--Grid row-->
      <div class="row">

        <!--Grid column-->
        <div class="col-md-6 mb-4">

          <h5 class="text-center font-weight-bold mb-4">Hoy</h5>

          <div class="d-flex justify-content-between">
            <small class="text-muted">Nuevos productos</small>
            <small><span><strong>160</strong></span>/<span></span>200</small>
          </div>
          <div class="progress md-progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25"
              aria-valuemin="0" aria-valuemax="100"></div>
          </div>

          <div class="d-flex justify-content-between">
            <small class="text-muted">Compras completadas</small>
            <small><span><strong>310</strong></span>/<span></span>400</small>
          </div>
          <div class="progress md-progress">
            <div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0"
              aria-valuemax="100"></div>
          </div>

          <div class="d-flex justify-content-between">
            <small class="text-muted">Sis premium</small>
            <small><span><strong>480</strong></span>/<span></span>800</small>
          </div>
          <div class="progress md-progress">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75"
              aria-valuemin="0" aria-valuemax="100"></div>
          </div>

          <div class="d-flex justify-content-between">
            <small class="text-muted">Consultas</small>
            <small><span><strong>250</strong></span>/<span></span>500</small>
          </div>
          <div class="progress md-progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100"
              aria-valuemin="0" aria-valuemax="100"></div>
          </div>

        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-md-6 mb-4">

          <h5 class="text-center font-weight-bold mb-4">Ayer</h5>

          <div class="d-flex justify-content-between">
            <small class="text-muted">Nuevos productos</small>
            <small><span><strong>160</strong></span>/<span></span>200</small>
          </div>
          <div class="progress md-progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 55%" aria-valuenow="55"
              aria-valuemin="0" aria-valuemax="100"></div>
          </div>

          <div class="d-flex justify-content-between">
            <small class="text-muted">Compras completadas</small>
            <small><span><strong>310</strong></span>/<span></span>400</small>
          </div>
          <div class="progress md-progress">
            <div class="progress-bar bg-info" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0"
              aria-valuemax="100"></div>
          </div>

          <div class="d-flex justify-content-between">
            <small class="text-muted">Sis premium</small>
            <small><span><strong>480</strong></span>/<span></span>800</small>
          </div>
          <div class="progress md-progress">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 45%" aria-valuenow="45"
              aria-valuemin="0" aria-valuemax="100"></div>
          </div>

          <div class="d-flex justify-content-between">
            <small class="text-muted">Consultas</small>
            <small><span><strong>250</strong></span>/<span></span>500</small>
          </div>
          <div class="progress md-progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100"
              aria-valuemin="0" aria-valuemax="100"></div>
          </div>

        </div>
        <!--Grid column-->

      </div>
      <!--Grid row-->

    </section>
    <!--Section: Block Content-->


  </div>
    </section>
    
</body>
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- Modal -->
<div class="modal fade" id="estaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Seleccionar el establecimiento donde se realizaran las ventas.</h5>
         
      </div>
      <div class="modal-body">
        <form id="seleccionEstaForm">
      <select required name="selectEsta" id="selectEsta" class="browser-default custom-select">
        <option selected>Cargando...</option>
      </select>
      <div class="container">
        <br>
      <div class="row">
        <div class="col"><p>Para cambiar de establecimiento cerrar la sesion y volver a iniciar.</p></div>
      </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">Empezar</button>
        </form>
      </div>
    </div>
  </div>
</div>
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////////////////// -->
<style>
.grey-bg {  
    background-color: #F5F7FA;
}
</style>
<script src="mdb/js/jquery.min.js"></script>
<script src="mdb/js/bootstrap.min.js"></script>
<script src="mdb/js/mdb.min.js"></script>
<script src="mdb/js/all.min.js"></script>
<script src="js/js.js?pancholo=pancholo"></script>
<script src="localstorage/localstorage2.js?pancholo=pancholo"></script>
</html>