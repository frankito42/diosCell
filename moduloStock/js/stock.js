let todosLosArticulosCategorias
async function listarArticulos() {
  let us=JSON.parse(localStorage.getItem("user")).establecimiento
  await fetch('php/listarArticulos.php?establecimiento='+us)
  .then(response => response.json())
  .then(async (data)=>{
    console.log(data)
      
    return todosLosArticulosCategorias=data
  });
    
}
async function listarProveedores() {
  await fetch('php/listarProveedores.php')
  .then(response => response.json())
  .then(async (data)=>{
    console.log(data)
    let option=`<option value="" selected disabled>Seleccionar proveedor</option>`
    data.forEach(element => {
      option+=`<option value="${element.idProveedor}">${element.nombreP}</option>`
    });
    document.getElementById("selectProvedorAumentar").innerHTML=option
  });
    
}
async function listarLaboratorios() {
  await fetch('php/listarLaboratorios.php')
  .then(response => response.json())
  .then(async (data)=>{
    console.log(data)
    let option=`<option value="" selected disabled>Seleccionar Laboratorio</option>`
    data.forEach(element => {
      option+=`<option value="${element.idLaboratorio}">${element.nombreLaboratorio}</option>`
    });
    /* document.getElementById("selectLaboratorioAumentar").innerHTML=option */
    document.getElementById("laboratoriosSearch").innerHTML=option
  });
    
}
async function listarCategorias() {
  await fetch('php/listarCategorias.php')
  .then(response => response.json())
  .then(async (data)=>{
    console.log(data)
    let option=`<option value="" selected disabled>Seleccionar Categoria</option>`
    data.forEach(element => {
      option+=`<option value="${element.idCategoria}">${element.nombreCategoria}</option>`
    });
    /* document.getElementById("selectLaboratorioAumentar").innerHTML=option */
    document.getElementById("selectLaboratorioAumentar").innerHTML=option
  });
    
}

function subirPorcentajeEnPreciosProveedor() {
  let porcentaje=document.getElementById("porcentajeFiltro").value
  let proveedor=document.getElementById("selectProvedorAumentar").value
  if(proveedor&&porcentaje){
    fetch("php/aumentarPrecio.php?porcentaje="+porcentaje+"&idPro="+proveedor)
          .then(respuesta => {
                $("#modalPorcentaje").modal("hide")
                listarArticulos().then(async()=>{
                  await traerPoductoGalpon(document.getElementById("establecimientos").value)
                })
             }
          );
  }else{
    if(!porcentaje){
      document.getElementById("porcentajeFiltro").style.borderColor="red"
    }
    if(!proveedor){
      document.getElementById("selectProvedorAumentar").style.borderColor="red"
    }
  }
  
}
document.getElementById("porcentajeFiltro").addEventListener("click",()=>{
  document.getElementById("porcentajeFiltro").style.borderColor=""
})
document.getElementById("selectProvedorAumentar").addEventListener("click",()=>{
  document.getElementById("selectProvedorAumentar").style.borderColor=""
})




/* console.log(todosLosArticulosCategorias) */


$(document).ready(async function(){
  $("#filtroProductos").keyup(function(){
  _this = this;
  // Show only matching TR, hide rest of them
  $.each($("#mytable tbody tr"), function() {
  if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
  $(this).hide();
  else
  $(this).show();
  });
  });


  
 /*  console.log(document.getElementsByClassName("dropdown-content select-dropdown")) */

  await listarArticulos().then(async()=>{
    await dibujarTabla(todosLosArticulosCategorias[1])
    await dibujarCategorias(todosLosArticulosCategorias[0])
    await dibujarSelect(todosLosArticulosCategorias[2])
    await listarProveedores()
    await listarLaboratorios()
    await listarCategorias()
    
    
    $('.mdb-select').materialSelect();
  })
  document.getElementsByClassName("dropdown-content select-dropdown").forEach((element)=>{
    console.log(element.parentElement.childNodes[1])
    element.parentElement.childNodes[1].addEventListener("click",()=>{
      element.children[0].children[0].children[0].focus()
      console.log("hola")
    })

  })
  
  

  
});


 async function abrirModalEdit(id) {
  let filtroArray= todosLosArticulosCategorias[1].find((m) => parseInt(m.articulo) === parseInt(id));
  console.log("Es: " + filtroArray.nombre );
  
  /* creo el select de categorias en el modal editar */

    if(document.getElementById(`articulo${id}`)){
      /* borro el modal y vulevo a llamar a la funcion para crear uno nuevo */
      document.getElementById(`articulo${id}`).remove()
      abrirModalEdit(id)
    }else{
      let optionsCategoria=``
      todosLosArticulosCategorias[0].forEach(element => {
        optionsCategoria+=`
        <option ${(element.idCategoria==filtroArray.categoria)?"selected":""} value="${element.idCategoria}">${element.nombreCategoria}</option>
        `
      });

     /*  let optionsLabor=``
      todosLosArticulosCategorias[3].forEach(element => {
        optionsLabor+=`
        <option ${(element.idLaboratorio==filtroArray.keyTwoLabor)?"selected":""} value="${element.idLaboratorio}">${element.nombreLaboratorio}</option>
        `
      }); */
       
      let modalEdit=`
                <div class="modal fade" id="articulo${id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div style="background:#33b5e5;" class="modal-header text-white">
                          <h4 class="modal-title heading lead" id="myModalLabel">Editar un producto</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span style="color: white;" aria-hidden="true">&times;</span>
                      </button>
                            
                        </div>
                        <div class="modal-body">
                  <div class="container-fluid">
                  <form enctype="multipart/form-data">
                    <div class="row">
                    <div class="col">
                    <div id="divBarra${id}"></div>
                    <a onclick="imprSelec('divBarra${id}')" class="btn btn-sm btn-blue">imprimir</a>
                    </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="md-form">
                            <input required type="text" id="nombreEdit${id}" value="${filtroArray.nombre}" name="nombreEdit" class="form-control">
                            <label for="nombreEdit${id}" class="active">Nombre del articulo</label>
                        </div>
                      </div>
                        <div class="col">
                          <div class="md-form">
                              <input type="text" id="codBarraEdit${id}" name="codBarraEdit" onkeyup="codeBarOnChange(${id})" value="${filtroArray.codBarra}" class="form-control">
                              <label for="codBarraEdit${id}" class="active">Codigo de barra</label>
                          </div>
                        </div>
                    </div>
                    

                      <div class="row">
                        <div style="display:none;" class="col">
                          <div class="md-form">
                            <input required type="number" id="stockminEdit${id}" value="${filtroArray.stockmin}" name="stockminEdit" class="form-control">
                            <label for="stockminEdit${id}" class="active">Stock minino</label>
                          </div>
                        </div>
                        <div class="col">
                          <div class="md-form">
                            <input type="number" id="cantidadEdit${id}" value="${filtroArray.cantidad}" name="cantidad" class="form-control">
                            <label for="cantidadEdit${id}" class="active">Cantidad</label>
                          </div>
                        </div>
                      </div>
                      


                      <div class="md-form">
                          <textarea id="descripcionEdit${id}" name="descripcionEdit" class="md-textarea form-control" rows="2">${filtroArray.descripcion}</textarea>
                          <label for="descripcionEdi${id}t" class="active">Descripcion</label>
                      </div>


                    <div class="form-group">
                        <div class="row">
                          <div class="col">
                            <div class="md-form">
                              <input required type="text" id="costoArticuloEdit${id}" onkeyup="separatorthis(this)" value="${separator(filtroArray.costo)}" name="costoArticulo" class="form-control">
                              <label for="costoArticuloEdit${id}" class="active">Costo</label>
                            </div>
                          </div>
                          <div style="display:none;" class="col">
                            <div class="md-form">
                              <input type="text" id="precioArticuloEdit${id}" onkeyup="separatorthis(this)" value="${separator(filtroArray.precioVenta)}" name="precioArticulo" class="form-control">
                              <label for="precioArticuloEdit${id}" class="active">Peso</label>
                            </div>
                          </div>
                          <div class="col">
                            <div class="md-form">
                              <input type="text" id="precioMayo${id}" onkeyup="separatorthis(this)" value="${separator(filtroArray.mayoritario)}" name="precioArticulo" class="form-control">
                              <label for="precioMayo${id}" class="active">Guarani</label>
                            </div>
                          </div>
                        </div>
                    </div>
                    
                    <div class="row">
                  
                    <div class="col">
                        <select id="selectCategoriaEdit${id}" required class="form-control">
                        <option value="">Categoria</option>
                        ${optionsCategoria}
                        
                        </select>
                    </div>
                    
                  
                    
                    </div>
                        </div> 
                  </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-close"></span> Cancelar</button>
                            <button onclick="guardarEditArticulo(${id})" name="add" class="btn btn-primary"><span class="fa fa-save"></span> Guardar</a>
                  </form>
                        </div>

                    </div>
                </div>
              </div>`
        /* 
        
        
        <div class="col">
                        <select id="selectLaborEdit${id}" required class="form-control">
                        <option value="">Laboratorios</option>
                        ${optionsLabor}
                        
                        </select>
                    </div>
        
        
        */
              $(modalEdit).modal("show")
              await brcodeDiv(filtroArray.codBarra,id)
    }
   
 }



 async function dibujarTabla(articulosStock) {
  let tablaArticulos=``
  let imagen=``
  console.log(articulosStock)
  articulosStock.forEach(element => {
    imagen=`<img style="width: 100%;" src="${element['imagen']}">`
    /* <td>${element['costo']}</td>
    <td>${element['descripcion']}</td>
    <td>${element['diasPaVencer']} Dias</td>
    <td>${element['nombreEsta']}</td>
    */
    /* if(element['diasPaVencer']<60){
      tablaArticulos+=`
      <tr style="background: #ff000030;">
      <td>${element['nombre']}</td>
      <td>${element['costo']}</td>
      <td>${element['precioVenta']}</td>
      <td>${element['mayoritario']}</td>
      <td>${element['cantidad']}</td>
      <td>${element['nombreCategoria']}</td>
      <td>${imagen}</td>
      
      
      
      <td style="display: inherit;">
      <button onclick="abrirModalEdit(${element['articulo']})" class="btn btn-blue"><i class="fas fa-pencil-alt fa-2x"></i></button>
      <button onclick="deleteProduct(${element['articulo']},this)" class="btn btn-danger"><i class="fas fa-trash-alt fa-2x"></i></button>
      </td>
      </tr>
      `
    }else{ */
    let act=``
        let ac=JSON.parse(localStorage.getItem("user")).acceso
        console.log(ac)
    if(ac=="1"){
        act=`<button onclick="abrirModalEdit(${element['articulo']})" class="btn btn-blue"><i class="fas fa-pencil-alt fa-2x"></i></button>`
    }
      tablaArticulos+=`
      <tr>
      <td>${element['nombre']}</td>
      <td>${separator(element['costo'])}</td>
      <td>${separator(element['mayoritario'])}</td>
      <td style="display:none;">${separator(element['precioVenta'])}</td>
      <td>${element['cantidad']}</td>
      <td>${element['nombreCategoria']}</td>
      <td style="display:none;">
  
  <input style="display: block;" type="number" placeholder="Cambio" onkeyup="pesosGuarani(this)">
    
  <input style="display: block;" value="${separator(element['precioVenta'])}" type="text" placeholder="Peso" onkeyup="pesosGuarani(this),separatorthis(this)">
  

  <input style="display: block;" type="text" placeholder="Guarani" onkeyup="pesosGuarani(this)">

      </td>
      
      <td style="display: inherit;">
      ${act}
      <button onclick="deleteProduct(${element['articulo']},this)" class="btn btn-danger"><i class="fas fa-trash-alt fa-2x"></i></button>
      <button onclick="imprimirPrecio('${element['nombre']}','${separator(element['precioVenta'])}')" class="btn btn-danger">Precio nombre</button>
      </td>
      </tr>
      `
   /*  } */
   
  });
  document.getElementById("articulosTabla").innerHTML=tablaArticulos
 }

 async function dibujarSelect(options) {
  let dibujarOptions=`<option disabled value="" selected>Establecimiento</option>
                      <option value="">Todos los articulos</option>`
  options.forEach(element => {
    
  
    dibujarOptions+=`
    <option value="${element.idEsta}">${element.nombreEsta}</option>
    `
  });
  /* SELECT DE TODOS LOS ESTABLECIMIENTOS */
  document.getElementById("establecimientos").innerHTML=dibujarOptions

  /* SELECT DEL MODAL AÃ‘ADIR NUEVO PRODUCTO *//* SELECT DEL MODAL AÃ‘ADIR NUEVO PRODUCTO */
  document.getElementById("newArticuloEnEstablecimiento").innerHTML=dibujarOptions
  /* REMUEVO LA OPCION TODOS LOS ARTICULOS */
  document.getElementById("newArticuloEnEstablecimiento").children[1].remove()

  

  document.getElementById("establecimientos").addEventListener("change",()=>{
    traerPoductoGalpon(document.getElementById("establecimientos").value)
  })
 }
 async function dibujarCategorias(categorias) {
  let dibujarCategorias=`<option value="" disabled selected>Categorias</option>`
  categorias.forEach(element => {
    
  
    dibujarCategorias+=`
    <option value="${element.idCategoria}">${element.nombreCategoria}</option>
    `
  });
  document.getElementById("categoriaNew").innerHTML=dibujarCategorias
 }

 async function traerPoductoGalpon(id) {
  await fetch('php/listarArticulos.php?id='+id)
  .then(response => response.json())
  .then(async (data)=>{
    console.log(data)
    await dibujarTabla(data[1])

    return todosLosArticulosCategorias=data
  });
   
 }

 /* //////////////////////////////////////////////////////////////////////////////////// */
 /* //////////////////////////////////////////////////////////////////////////////////// */
 document.getElementById("guardarEstablecimiento").addEventListener("click",()=>{
   let nombreEsta=document.getElementById("nombreEstablecimiento").value
   if(nombreEsta==""){
     console.log(nombreEsta)
     document.getElementById("nombreEstablecimiento").style.borderColor="red";
     document.getElementById("labelIdEstablecimineto").style.color="red";
     document.getElementById("errorEstablecimiento").classList.add("zoomIn")
     document.getElementById("errorEstablecimiento").style.display="block"
     $('#errorEstablecimiento').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{
       document.getElementById("errorEstablecimiento").classList.remove("zoomIn")
    });
   }else{
     fetch('php/addEstablecimiento.php?nEstablecimineto='+nombreEsta)
      .then(response => response.json())
      .then(async (data)=>{
        if(data=="perfecto"){
          listarArticulos().then(async()=>{
            await dibujarSelect(todosLosArticulosCategorias[2])
            vaciarEstablecimiento()
            $("#modalNewEstablecimiento").modal("hide")
          })
        }
      });
   }
 })
 document.getElementById("nombreEstablecimiento").addEventListener("click",()=>{
   if(document.getElementById("nombreEstablecimiento").style.borderColor=="red"){
      document.getElementById("nombreEstablecimiento").style.borderColor="";
      document.getElementById("labelIdEstablecimineto").style.color="";
      document.getElementById("errorEstablecimiento").classList.add("zoomOut")
      $('#errorEstablecimiento').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{
        document.getElementById("errorEstablecimiento").classList.remove("zoomOut")
        document.getElementById("errorEstablecimiento").style.display="none"
    });
  }
 })
  /* //////////////////////////////////////////////////////////////////////////////////// */
 /* //////////////////////////////////////////////////////////////////////////////////// */
 document.getElementById("form").addEventListener("submit",(e)=>{
      e.preventDefault()

        let formData = new FormData(document.getElementById("form"));
            fetch("php/addNewProduct.php", {
                method: 'POST',
                body: formData,
            }).then(respuesta => respuesta.json())
                .then(decodificado => {
                  console.log(decodificado)
                    if (decodificado=="perfecto") {
                      document.getElementById("bcTarget").innerHTML=""
                      $("#addnew").modal("hide")
                      vaciarFormularioNew()
                      listarArticulos().then(async()=>{
                        await dibujarTabla(todosLosArticulosCategorias[1])
                      })
                    }
                });
  
 })

 function guardarEditArticulo(id) {
   console.log(id)
   let articuloEditado = {
    articulo:id,
    nombreEdit:document.getElementById("nombreEdit"+id).value,
    costoEdit:document.getElementById("costoArticuloEdit"+id).value.replace(/,/g, ""),
    precioEdit:document.getElementById("precioArticuloEdit"+id).value.replace(/,/g, ""),
    stockMinEdit:document.getElementById("stockminEdit"+id).value,
    cantidadEdit:document.getElementById("cantidadEdit"+id).value,
    descripcionEdit:document.getElementById("descripcionEdit"+id).value,
    categoriaEdit:document.getElementById("selectCategoriaEdit"+id).value,
    labor:0,
    codBarraEdit:document.getElementById("codBarraEdit"+id).value,
    precioMayo:document.getElementById("precioMayo"+id).value.replace(/,/g, "")
  };

  let datosEnviar = new FormData();
  datosEnviar.append("articulo", JSON.stringify(articuloEditado));

  fetch("php/editarArticulo.php?id=", {
    method: 'POST',
    body: datosEnviar,
    }).then(respuesta => respuesta.json())
        .then(decodificado => {
          console.log(decodificado)
            if (decodificado=="perfecto") {
              $("#articulo"+id).modal("hide")
              listarArticulos().then(async()=>{
                await traerPoductoGalpon(JSON.parse(localStorage.getItem("user")).establecimiento)
              })
            }
        });

  console.log(articuloEditado)
 }

 function subirPorcentajeEnPrecios() {
   let porcentaje=document.getElementById("porcentaje").value
   if(porcentaje){
    fetch("php/aumentarPrecio.php?porcentaje="+porcentaje)
          .then(respuesta => {
                $("#modalPorcentaje").modal("hide")
                listarArticulos().then(async()=>{
                  await traerPoductoGalpon(document.getElementById("establecimientos").value)
                })
            }
          );
    }else{
      document.getElementById("porcentaje").style.borderColor="red"
    }
 }
 document.getElementById("porcentaje").addEventListener("click",()=>{
  document.getElementById("porcentaje").style.borderColor=""
 })
/* MODAL DONDE CAMBIO EL TIPO DE FILTRO PARA PONER UN PORCENTAJE GENERAL O ESPECIFICO */
 document.getElementById("botonAvanzadoPorcentaje").addEventListener("click",()=>{
  document.getElementById("modalBody").classList.add("fadeOutRight")
  document.getElementById("exampleModalPreviewLabel").innerHTML="Aumentar precio por proveedor"
  /* oculto un boton y muestro el otro en el modal  */
  document.getElementById("porcentajeNormal").style.display="none"
  document.getElementById("porcentajePorProveedor").style.display="block"
  /* oculto un boton y muestro el otro en el modal  */
  $('#modalBody').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{
    document.getElementById("modalBody").classList.remove("fadeOutRight")
    document.getElementById("modalBody").style.display="none"
    document.getElementById("modalBody2").classList.add("fadeInRight")
    document.getElementById("modalBody2").style.display="block"
    
  });
 })
 /* MODAL DONDE CAMBIO EL TIPO DE FILTRO PARA PONER UN PORCENTAJE GENERAL O ESPECIFICO */
 document.getElementById("botonAvanzadoPorcentaje2").addEventListener("click",()=>{
  document.getElementById("exampleModalPreviewLabel").innerHTML="Aumentar precio general"
   document.getElementById("porcentajePorProveedor").style.display="none"
    document.getElementById("porcentajeNormal").style.display="block"
   document.getElementById("modalBody2").style.display="none"
   document.getElementById("modalBody").classList.add("fadeInRight")
   document.getElementById("modalBody").style.display="block"
   $('#modalBody').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{
    document.getElementById("modalBody").classList.remove("fadeOutRight")
    
  });
 })

 function vaciarFormularioNew() {
  document.getElementById("form").reset()
 }

 function vaciarEstablecimiento() {
  document.getElementById("nombreEstablecimiento").value=""
  console.log("vacioEsta")
 }

 async function subirPorcentajeEnPreciosLaboratorio() {
  let porcentaje=document.getElementById("porcentajeFiltroLaboratorio").value
  let laboratorio=document.getElementById("selectLaboratorioAumentar").value
  if(laboratorio&&porcentaje){
    await fetch("php/aumentarPrecioLaboratorio.php?porcentaje="+porcentaje+"&idLab="+laboratorio)
          .then(respuesta => {
                console.log(respuesta)
                $("#modalPorcentajeLaboratorio").modal("hide")
                listarArticulos().then(async()=>{
                  await traerPoductoGalpon(document.getElementById("establecimientos").value)
                })
             }
          );
  }else{
    if(!porcentaje){
      document.getElementById("porcentajeFiltroLaboratorio").style.borderColor="red"
    }
    if(!laboratorio){
      document.getElementById("selectLaboratorioAumentar").style.borderColor="red"
    }
  }
  
}
async function deleteProduct(id,e) {
  let a=confirm("Desea eleminar el producto?")
  console.log(a)
  if(a){
    await fetch('php/deleteProducto.php?id='+id)
      .then(response => response.json())
      .then((data)=>{ 
        if(data=="exito"){
          console.log(data)
          e.parentElement.parentElement.remove()
        }
      })
  }
    
}
function separator(numb) {
    console.log(numb)
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
function separatorthis(numb) {
    console.log(numb.value)
    let numeroSinComas=numb.value.replace(/,/g, "");
    console.log(numeroSinComas)
    var str = numeroSinComas.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    numb.value=str.join(".");
}


function pesosGuarani(e){
    console.log(e.parentElement.children)
    let cambio=e.parentElement.children[0].value.replace(/,/g, "")
    let peso=e.parentElement.children[1].value.replace(/,/g, "")
    let conversion=peso*cambio
    console.log("total: "+conversion)
    e.parentElement.children[2].value=separator(conversion)
}





async function brcode(codebar,mostrar) {
  if (document.getElementById(codebar).value=="") {
    await fetch('php/newCodeBar.php')
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    document.getElementById(codebar).focus()
    document.getElementById(codebar).value=data
    $("#"+mostrar).barcode(document.getElementById(codebar).value, "code39",{barWidth:2, barHeight:40});
  });
  }else{
    $("#"+mostrar).barcode(document.getElementById(codebar).value, "code39",{barWidth:2, barHeight:40});
  }
  
}
async function brcodeDiv(codebar,id) {
  console.log(codebar)
  console.log(id)
  if (codebar=="") {
    await fetch('php/newCodeBar.php')
  .then((response) => response.json())
  .then((data) => {
    setTimeout(() => {
      console.log(data)
    /* document.getElementById(codebar).focus() */
    document.getElementById("codBarraEdit"+id).value=data
    $("#divBarra"+id).barcode(document.getElementById("codBarraEdit"+id).value, "code39",{barWidth:2, barHeight:40});
    }, 2000);
  });
}else{
  setTimeout(() => {
    console.log(document.getElementById("codBarraEdit"+id))
    $("#divBarra"+id).barcode(document.getElementById("codBarraEdit"+id).value, "code39",{barWidth:2, barHeight:40});
  }, 2000);
  }
  
}
function imprSelec(nombre) {
    console.log(nombre)
  var ficha = document.getElementById(nombre);
  var ventimp = window.open(' ', 'popimpr');
  ventimp.document.write( ficha.innerHTML );
  ventimp.document.close();
  ventimp.print( );
  ventimp.close();
}
function imprimirPrecio(nombre,precio) {
  var ventimp = window.open(' ', 'popimpr');
  let div=`
  <div style="text-align:center;">
    <h4>${nombre}</h4>
    <h4>${precio}</h4>
  </div>
  `
  ventimp.document.write(div);
  ventimp.document.close();
  ventimp.print( );
  ventimp.close();
}

function codeBarOnChange(id) {
  $("#divBarra"+id).barcode(document.getElementById("codBarraEdit"+id).value, "code39",{barWidth:2, barHeight:40});
}