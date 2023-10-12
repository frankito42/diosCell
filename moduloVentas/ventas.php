<?php 
session_start();
$local="";
require "../conn/conn.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../mdb/css/bootstrap.min.css">
    <link rel="stylesheet" href="../mdb/css/mdb.min.css">
    <link rel="stylesheet" href="../mdb/css/all.min.css">
    <link rel="stylesheet" href="lib/toastr.min.css">
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
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="../index.php">inicio
                <span class="sr-only">(current)</span>
                </a>
            </li>
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Productos
                  </a>
                  <div class="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-5">
                  <a class="dropdown-item waves-effect waves-light" href="../moduloStock/stock.php">Stock</a>
                  <a class="dropdown-item waves-effect waves-light" href="../moduloCategorias/categorias.php">Categorias</a>
                  <!-- <a class="dropdown-item waves-effect waves-light" href="#">Something else here</a> -->
                  </div>
              </li>
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="../moduloCompras/compras.php">Compras</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link waves-effect waves-light" href="ventas.php">Ventas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="../moduloLibreta/libreta.php">Libreta</a>
              </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Admin
                </a>
                <div class="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-3">
                  <a class="dropdown-item waves-effect waves-light" href="../moduloProvedor/provedor.php">Proveedores</a>
                  <a class="dropdown-item waves-effect waves-light" href="../moduloClientes/clientes.php">Clientes</a>
<!--                 <a class="dropdown-item waves-effect waves-light" href="../moduloLaboratorios/laboratorios.php">Laboratorios</a>
 -->                <a class="dropdown-item waves-effect waves-light" href="../moduloVentasDetalle/todasLasVentas.php">Caja</a>
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
                <i class="fas fa-user"></i> <span id="userNameID"></span> </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                <a class="dropdown-item waves-effect waves-light" href="#">My account</a>
                <a class="dropdown-item waves-effect waves-light" id="cerrarSession">Cerrar sesion</a>
                </div>
            </li>
            </ul>
        </div>
        </nav>
    </section>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-sm-3">
                    <button class="btn btn-blue" id="abrirModalBuscarProductoBtn">Buscar por nombre</button>
                </div>
                <div class="col-sm-3">
                    <button class="btn btn-cyan" id="montoExtra">Monto extra</button>
                </div>
                <div style="background: #00ff89;border-radius: 5px;padding: 0.5%;box-shadow: 0px 0px 20px 3px #00000014;" class="col-sm-6 text-center">
                    <h2 style="color:white;text-shadow: 1px 1px 1px darkslategrey;">$<span id="segundoTotal" style="color: white;text-shadow: 1px 1px 1px darkslategrey;">0</span></h2>
                </div>
            </div>
            
            <br>
            <div class="row">
                    <div class="col-8">
                        <div class="md-form md-outline input-with-pre-icon">
                        <!-- <i class="fas fa-envelope  input-prefix"></i> -->
                        <i class="fas fa-barcode input-prefix"></i>
                        <input autofocus style="font-size: 125%;" type="number" id="codigoDeBarra" class="form-control">
                        <label for="codigoDeBarra">Codigo de barra</label>
                        </div> 
                    </div>
                    <div class="col">
                        <button id="btnEscanear" class="btn btn-blue btn-sm"><i class="fas fa-camera fa-3x"></i></button>  
                    </div>
            </div>
            
            <div class="table-responsive">
                <table class="table table-sm table-hover">
                    <thead>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>subTotal</th>
                        <th></th>
                    </thead>
                    <tbody id="ProductosVender"> 
                        
                    </tbody>
                    <tfoot>
                        <td colspan="3">TOTAL $$$$$$</td>
                        <td id="total">0</td>
                        <td></td>
                    </tfoot>
                </table>
            </div> 
            <button id="btnGuardarVenta" class="btn btn-blue">Cobrar</button>
          
        </div>
    </section>
    
    <section>
    <!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
 <!-- Central Modal Medium Success -->
 <div class="modal fade" id="pregunta" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
   aria-hidden="true">
   <div class="modal-dialog modal-notify modal-success" role="document">
     <!--Content-->
     <div class="modal-content">
       <!--Header-->
       <div class="modal-header">
         <p class="heading lead">Desea terminar la operacion?</p>

         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" class="white-text">&times;</span>
         </button>
       </div>
       <!--Body-->
       <div class="modal-body text-center">
        <div class="row">
          <div class="col">
            <h2>Total $<span id="totalDescont"></span></h2>
            <div class="md-form form-group">
                      <input style="text-align: center;font-size: 200%;" type="text" id="cobro" class="form-control validate">
                      <label style="font-size: 200%;" for="cobro" class="">Monto</label>
              </div>
            <h2 id="vuelto"></h2>
          </div>
        </div>
         
         <!-- <div class="text-center">
           <i class="fas fa-check fa-4x mb-3 animated rotateIn"></i>
      
         </div> -->
       </div>

       <!--Footer-->
       <div class="modal-footer">
         <a type="button" class="btn btn-success waves-effect" data-dismiss="modal">Cerrar</a>
         <button class="btn btn-success waves-effect" id="imprimeTicket">Cobrar</button>
       </div>
     </div>
     <!--/.Content-->
   </div>
 </div>
 <!-- Central Modal Medium Success-->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->


<div class="modal fade" id="mostarProductElegir" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div style="background: #2db6e8;color: white;" class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Productos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id="eligeProductoNombre" class="modal-body">
                 <div style="margin: -2%;" class="md-form form-group">
                    <i class="fa fa-search prefix"></i>
                    <input type="text" id="filtroProductos" class="form-control validate">
                    <label for="filtroProductos" >Nombre del producto</label>
                </div>
                <table id="mytable" class="table table-sm">
                    <thead>
                        <tr> 
                        <th scope="col">Nombre</th>
<!--                         <th scope="col">Precio en pesos</th> -->
                        <th scope="col">Precio de venta</th>
                        </tr>
                    </thead>
                    <tbody id="aquiMostrarTodo">
                        
                    </tbody>
                    </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<div class="modal fade" id="metodoDePago" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
   aria-hidden="true">
   <div class="modal-dialog modal-notify modal-info" role="document">
     <!--Content-->
     <div class="modal-content">
       <!--Header-->
       <div class="modal-header">
         <p class="heading lead">Seleccionar el metodo de pago</p>

         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" class="white-text">&times;</span>
         </button>
       </div>
       <!--Body-->
       <div class="modal-body">
        
              <div  class="row text-center">
                <div onclick="numeroClick('1')" style="display:relative;" class="col-6">
                  <h4 class="waves-effect waves-ligh" style="background-image: linear-gradient(to left bottom, #0ebe08, #10c110, #03ab07, #33c339, #12eb21);color: white;border-radius: 5px;padding: 10%;box-shadow: 0px 0px 20px 0px #00000078;">Efectivo</h4>
                  <div class="waves-effect waves-ligh" style="background-image: linear-gradient(to left bottom, #0ebe08, #10c110, #03ab07, #33c339, #12eb21);box-shadow: 0px 0px 3px 0px #00000078;border-radius: 5px;color: white;">Nro 1</div>
                </div>
                <div onclick="numeroClick('2')" style="display:relative;" class="col-6 mb-4">
                  <h4 class="waves-effect waves-ligh aqua-gradient" style="color: white;border-radius: 5px;padding: 10%;box-shadow: 0px 0px 20px 0px #00000078;">Libreta</h4>
                  <div class="waves-effect waves-ligh aqua-gradient" style="box-shadow: 0px 0px 3px 0px #00000078;border-radius: 5px;color: white;">Nro 2</div>
                </div>
                <div onclick="numeroClick('3')" style="display:relative;" class="col-6">
                  <h4 class="waves-effect waves-ligh blue-gradient" style="background: #33cce5;color: white;border-radius: 5px;padding: 10%;box-shadow: 0px 0px 20px 0px #00000078;">MP/Tarjeta etc.</h4>
                  <div class="waves-effect waves-ligh blue-gradient" style="background: #33cce5;box-shadow: 0px 0px 3px 0px #00000078;border-radius: 5px;color: white;">Nro 3</div>
                </div>
              </div>
        
       </div>

       <!--Footer-->
       <div class="modal-footer">
<!--          <a type="button" class="btn btn-success waves-effect" data-dismiss="modal">Cerrar</a>
         <button class="btn btn-success waves-effect" >Cobrar</button> -->
       </div>
     </div>
     <!--/.Content-->
   </div>
 </div>
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->









<div class="modal fade" id="libreta" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
   aria-hidden="true">
   <div class="modal-dialog modal-notify modal-success" role="document">
     <!--Content-->
     <div class="modal-content">
       <!--Header-->
       <form id="addLibretaIntegranteProducto">
       <div class="modal-header">
         <p class="heading lead">Seleccionar el cliente</p>

         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" class="white-text">&times;</span>
         </button>
       </div>
       <!--Body-->
       <div class="modal-body">
        
            <div class="row">
              <div class="col text-center">
                <h3>Total $<span id="totalLibreta">Cargando...</span></h3>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <select required id="listarIntegrantes" name="idDeInteGra" class="browser-default custom-select">
                </select>
              </div>
            </div>
        
       </div>

       <!--Footer-->
       <div class="modal-footer">
         <a type="button" class="btn btn-success waves-effect" data-dismiss="modal">Cerrar</a>
         <button id="addLibretaBtnInte" class="btn btn-success waves-effect" >Agregar a su libreta</button>
         </form>
       </div>
     </div>
     <!--/.Content-->
   </div>
 </div>
















<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
    </section>
    
    
</body>
<script src="../mdb/js/jquery.min.js"></script>
<script src="../mdb/js/bootstrap.min.js"></script>
<script src="../mdb/js/mdb.min.js"></script>
<script src="../mdb/js/all.min.js"></script>
<script src="lib/toastr.min.js"></script>
<script src="../localstorage/localstorage.js?pancholo=pancholo"></script>
<script src="js/ventas.js?pancholo=pancholo"></script>
<script src="script.js?pancholo=pancholo"></script>
</html>