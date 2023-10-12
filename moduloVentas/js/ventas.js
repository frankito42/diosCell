let elInput = document.getElementById('codigoDeBarra');
elInput.addEventListener('keypress', async (e) => {
    console.log(e.key)
    if(e.key=="Enter"){
        await cargarProductoTablaVenta()
        elInput.value=""
    }
});


async function cargarProductoTablaVenta(codi,idPro,mayoriOminori) {
    let codigo
    if(codi){
        codigo=codi
    }else{
        codigo=document.getElementById('codigoDeBarra').value
    }

    let pro=JSON.parse(localStorage.getItem("productosModuloVentas"))

    pro= pro.find((m) => parseInt(m.articulo) === parseInt(idPro) || m.codBarra === codigo);
    console.log("Es: " + pro);
    
    
    if(codigo){
      
            /* console.log(data) */

            if(pro===undefined){
                alert("El producto no existe.")
            }else{
                fila = document.createElement("tr");
                celda1 = document.createElement("td");
                celda2 = document.createElement("td");
                celda3 = document.createElement("td");
                celda4 = document.createElement("td");
                celda5 = document.createElement("td");
                input1 = document.createElement("input")
                input2 = document.createElement("input")
                input1.value=1
                input1.type="number"
                input1.style.width="71px"
                
                input1.addEventListener("change", async()=>{
                   await sumarTodo()
                })
                input1.addEventListener("keyup",async ()=>{
                   await sumarTodo()
                })
                let maOmi
               
                    maOmi=pro.mayoritario
                  
    
                input2.value=separator(maOmi)
                input2.type="text"
                input2.style.width="87px"
                input2.addEventListener("change",async ()=>{
                    this.value=separator(maOmi)
                   await sumarTodo()
                })
                input2.addEventListener("keyup",async ()=>{
                    this.value=separator(maOmi)
                   await sumarTodo()
                })
                input3=document.createElement("input")
                input3.type="number"
                input3.value=pro.articulo
                input3.style.display="none"
                textoCelda1 = document.createTextNode(`${pro.nombre}`);
                /* console.log(mayoriOminori) */

                
                
                celda1.appendChild(textoCelda1);
                celda2.appendChild(input1);
                celda2.appendChild(input3); 
                celda3.appendChild(input2);
                
                celda5.innerHTML=`<button onclick="deleteTdTable(this)" class="btn btn-danger btn-sm">x</button><input style="display:none;" type="text" />`
                
                fila.appendChild(celda1);
                fila.appendChild(celda2);
                fila.appendChild(celda3);
                fila.appendChild(celda4);
                fila.appendChild(celda5);
               /*  let tr=`
                <tr>
                    <td>${data[0].nombre}</td>
                    <td><input onkeyup="sumarTodo()" style="width: 71px;" onchange="sumarTodo()" type="number" value="1"><input style="display:none;" type="number" value="${data[0].articulo}"></td>
                    <td><input onkeyup="sumarTodo()" style="width: 83px;" onchange="sumarTodo()" type="number"  value="${data[0].precioVenta}"></td>
                    <td></td>
                    <td><button onclick="deleteTdTable(this)" class="btn btn-danger btn-sm">x</button></td>
                </tr>
                ` */
                document.getElementById("ProductosVender").appendChild(fila)
                /* document.getElementById("ProductosVender").innerHTML+=tr */
    
                sumarTodo()

            }

     
        /* escondo el modal al hacer click en un boton */
        $("#mostarProductElegir").modal("hide")
    }else{
        abreModalPregunta()
    }
}

async function deleteTdTable(e) {
    e.parentNode.parentNode.remove()
    await sumarTodo()
    
}

async function sumarTodo() {
    let acumulador=0
    let no=true
    document.getElementById("ProductosVender").children.forEach(element => {
        console.log(parseFloat(element.children[1].children[0].value.replace(/,/g, "")))
        console.log(parseFloat((element.children[2].children[0].value.replace(/,/g, ""))))
        let suma=parseFloat(element.children[1].children[0].value.replace(/,/g, ""))*parseFloat((element.children[2].children[0].value.replace(/,/g, "")))

        acumulador=acumulador+parseFloat(suma.toFixed(2))
        console.log(acumulador)
        element.children[3].innerHTML=separator(suma.toFixed(2))
        document.getElementById("total").innerHTML=separator(acumulador.toFixed(2))
        document.getElementById("segundoTotal").innerHTML=separator(acumulador.toFixed(2))
        no=false
    });

    if(no){
        document.getElementById("total").innerHTML=0
    }
}

async function guardarVenta(tipoPago) {
    $("#pregunta").modal("hide")
    if (document.getElementById("ProductosVender").children.length>0) {
        let venta=[]
        let ventas=[]
        document.getElementById("ProductosVender").children.forEach((element)=>{
            /* primero el id */
            /* console.log(element.children[0]) */
            venta.push(element.children[1].children[1].value.replace(/,/g, ""))
            venta.push(element.children[0].innerHTML.replace(/,/g, ""))
            venta.push(element.children[1].children[0].value.replace(/,/g, ""))
            venta.push(element.children[2].children[0].value.replace(/,/g, ""))
            /* venta[array()].push(element.children[2].children[0].value) */
            ventas.push(venta)
            venta=[]
        })
        console.log(ventas)
        let userEsta=localStorage.getItem("user")
        let productosVender = new FormData();
        productosVender.append("productos", JSON.stringify(ventas));
        productosVender.append("userEsta", userEsta);
        console.log(tipoPago)
        if (tipoPago==undefined) {
            console.log("undi")
            tipoPago="efectivo"
            productosVender.append("tipoPago", JSON.stringify(tipoPago));
        }else{
            productosVender.append("tipoPago", JSON.stringify(tipoPago));
        }
      
        await fetch("php/venderProducto.php", {
          method: 'POST',
          body: productosVender,
          }).then(respuesta => respuesta.json())
              .then(decodificado => {
                console.log(decodificado)
                  if (decodificado=="perfecto") {
                    document.getElementById("ProductosVender").innerHTML=""
                    sumarTodo()
                    imprimirElemento()
                    /* alert("Venta finalizada.") */
                    toastr.success('venta', 'Venta exitosa.')
                    
                    
                    /* $("#exito").modal("show") */
                    document.getElementById('codigoDeBarra').focus()
                  }
              });


    }else{
        console.log("error")
    }
}


document.getElementById("btnGuardarVenta").addEventListener("click",abreModalPregunta)
document.getElementById("imprimeTicket").addEventListener("click",async ()=>{
    await guardarVenta("efectivo")
})
document.getElementById("cobro").addEventListener("keyup",()=>{
    let totalDescont=parseFloat((document.getElementById("totalDescont").innerHTML).replace(/,/g, ""))
    let cobro=parseFloat(document.getElementById("cobro").value)
    console.log(totalDescont)
    console.log(cobro)
    let vuelto=cobro-totalDescont
    document.getElementById("vuelto").innerHTML="Vuelto $"+vuelto
})



function abreModalPregunta() {
    console.log(document.getElementById("ProductosVender").children.length)
    if (document.getElementById("ProductosVender").children.length>0){
       /*  $("#pregunta").modal("show") */
        metodoPago()
        document.getElementById("totalDescont").innerHTML=document.getElementById("total").innerHTML
    }else{
        alert("Cargue productos antes de continuar")
        document.getElementById('codigoDeBarra').focus()
    }
}

async function listarTodosLosProductos() {
    let esta=JSON.parse(localStorage.getItem("user")).establecimiento
    console.log(esta)
    await fetch("php/listarProductos.php?idEsta="+esta)
    .then(respuesta => respuesta.json())
    .then(data => {
        localStorage.setItem("productosModuloVentas",JSON.stringify(data))
              console.log(data)
              let elementos=``
              data.forEach(element => {
                  elementos+=`
                  <tr>
                    <td>${element.nombre}</td>
                    <td style="display:none;">$${separator(element.precioVenta)} <button class="btn btn-blue btn-sm" onclick="cargarProductoTablaVenta('${(element.codBarra)?element.codBarra:'no'}',${element.articulo})"><i class="fas fa-plus fa-1x"></i></button></td>
                    <td>$${separator(element.mayoritario)} <button class="btn btn-blue btn-sm" onclick="cargarProductoTablaVenta('${(element.codBarra)?element.codBarra:'no'}',${element.articulo},'mayo')"><i class="fas fa-plus fa-1x"></i></button></td>
                  </tr>
                  `
              });
              document.getElementById("aquiMostrarTodo").innerHTML=elementos
    });
}

let integrantes

$(document).ready(async function(){
    await listarTodosLosProductos()
    await traerClientes()
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
   });
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

document.addEventListener("keyup", function(event) {
    /*  console.log(event.key)
     console.log(event.target.id) */
     if (event.key === "Enter" && event.target.id!="codigoDeBarra" && event.target.id!="cobro" && event.target.id!="imprimeTicket" && event.target.id!="pregunta" && event.target.id!="libreta") {
         console.log("entro aqui")
         
         $("#mostarProductElegir").modal("hide")
         abreModalPregunta()
     }
 });
 document.getElementById("pregunta").addEventListener("keyup", async function(event) {
    if (event.key === "Enter") {
        console.log("cobrado")
        await guardarVenta()
    }
});



 document.getElementById("abrirModalBuscarProductoBtn").addEventListener("click", function(event) {
     $("#mostarProductElegir").modal("show")
});

async function metodoPago() {
    $("#metodoDePago").modal("show")
}
document.getElementById("metodoDePago").addEventListener("keyup", function(event) {
    console.log(event.key)
    if (event.key === "1") {
        $("#metodoDePago").modal("hide")
        $("#pregunta").modal("show")
    }else if(event.key === "2"){
        document.getElementById("totalLibreta").innerHTML=document.getElementById("total").innerHTML
        $("#metodoDePago").modal("hide")
        $("#libreta").modal("show")
        
    }else if(event.key === "3"){
        guardarVenta("MP/Tarjeta etc") 
        /* toastr.success('MP/Ttarjeta etc.', 'Venta exitosa') */
       /*  document.getElementById("totalLibreta").innerHTML=document.getElementById("total").innerHTML */
        $("#metodoDePago").modal("hide")
       /*  $("#libreta").modal("show") */
        
    }
});
async function traerClientes() {
    await fetch('php/listarIntegrantes.php')
  .then((response) => response.json())
  .then(async (data) => {
    console.log(data)
    await dibujarIntegrantes(data)
    integrantes=data
});
}
async function dibujarIntegrantes(params) {
    option=`<option selected value="" disabled>Selecciona un cliente</option>`
    params.forEach(element => {
        option+=`<option value="${element.idIntegrante}">${element.nombre}</option>`
    });
    document.getElementById("listarIntegrantes").innerHTML=option
}






document.getElementById("addLibretaIntegranteProducto").addEventListener("submit", async function(event) {
    event.preventDefault()
    await guardarVentaEnLibreta()
});



async function guardarVentaEnLibreta() {
    $("#libreta").modal("hide")
    if (document.getElementById("ProductosVender").children.length>0) {
        let venta=[]
        let ventas=[]
        document.getElementById("ProductosVender").children.forEach((element)=>{
            /* primero el id */
            /* console.log(element.children[0]) */
            venta.push(element.children[1].children[1].value.replace(/,/g, ""))
            venta.push(element.children[0].innerHTML.replace(/,/g, ""))
            venta.push(element.children[1].children[0].value.replace(/,/g, ""))
            venta.push(element.children[2].children[0].value.replace(/,/g, ""))
            venta.push(document.getElementById("listarIntegrantes").value)
            /* venta[array()].push(element.children[2].children[0].value) */
            ventas.push(venta)
            venta=[]
        })
       /*  console.log(ventas) */
       let filtroArray= integrantes.find((m) => parseInt(m.idIntegrante) === parseInt(document.getElementById("listarIntegrantes").value));
       console.log(filtroArray);

       let productosVender = new FormData();
       productosVender.append("productos", JSON.stringify(ventas));
       productosVender.append("familia", filtroArray.idFamilia);
      
        await fetch("php/venderEnLibreta.php", {
          method: 'POST',
          body: productosVender,
          }).then(respuesta => respuesta.json())
              .then(decodificado => {
                console.log(decodificado)
                  if (decodificado=="perfecto") {
                    document.getElementById("ProductosVender").innerHTML=""
                    sumarTodo()
                    imprimirElemento()
                    /* alert("Venta finalizada.") */
                    toastr.success('Libreta', 'se agrego a la libreta del cliente.')
                    
                    /* $("#exito").modal("show") */
                    document.getElementById('codigoDeBarra').focus()
                  }
              });


    }else{
        console.log("error")
    }
}


$('#libreta').on('shown.bs.modal', function (e) {
    document.getElementById("listarIntegrantes").focus()
  })

  /* document.getElementById("listarIntegrantes").addEventListener("change", async function(event) {
     
        console.log("cobrado")
        await guardarVentaEnLibreta()
    
}); */

function imprimirElemento(){
   /*  var ficha = ticketVenta;
    var ventimp = window.open(' ', 'popimpr');
    ventimp.document.write( ficha.innerHTML );
    ventimp.document.close();
    ventimp.print( );
    ventimp.close(); */
    let div=document.createElement("div")
    $(div).load('../moduloTicket/index.php',function(){
        var printContent = div
        var WinPrint = window.open('', '', 'width=900,height=650');
        WinPrint.document.write(printContent.innerHTML);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    });

  }
  document.getElementById("montoExtra").addEventListener("click",()=>{
   
      
        
                    fila = document.createElement("tr");
                    celda1 = document.createElement("td");
                    celda2 = document.createElement("td");
                    celda3 = document.createElement("td");
                    celda4 = document.createElement("td");
                    celda5 = document.createElement("td");
                    input1 = document.createElement("input")
                    input2 = document.createElement("input")
                    input1.value=1
                    input1.type="number"
                    input1.style.width="71px"
                    
                    input1.addEventListener("change", async()=>{
                       await sumarTodo()
                    })
                    input1.addEventListener("keyup",async ()=>{
                       await sumarTodo()
                    })
                    let maOmi=0
                   
                        
                      
        
                    input2.value=separator(maOmi)
                    input2.type="number"
                    input2.style.width="87px"
                    input2.addEventListener("change",async ()=>{
                        this.value=separator(maOmi)
                       await sumarTodo()
                    })
                    input2.addEventListener("keyup",async ()=>{
                        this.value=separator(maOmi)
                       await sumarTodo()
                    })
                    input3=document.createElement("input")
                    input3.type="number"
                    input3.value=0
                    input3.style.display="none"
                    textoCelda1 = document.createTextNode(`Monto Extra`);
                    /* console.log(mayoriOminori) */
    
                    
                    
                    celda1.appendChild(textoCelda1);
                    celda2.appendChild(input1);
                    celda2.appendChild(input3); 
                    celda3.appendChild(input2);
                    
                    celda5.innerHTML=`<button onclick="deleteTdTable(this)" class="btn btn-danger btn-sm">x</button>`
                    
                    fila.appendChild(celda1);
                    fila.appendChild(celda2);
                    fila.appendChild(celda3);
                    fila.appendChild(celda4);
                    fila.appendChild(celda5);
                   /*  let tr=`
                    <tr>
                        <td>${data[0].nombre}</td>
                        <td><input onkeyup="sumarTodo()" style="width: 71px;" onchange="sumarTodo()" type="number" value="1"><input style="display:none;" type="number" value="${data[0].articulo}"></td>
                        <td><input onkeyup="sumarTodo()" style="width: 83px;" onchange="sumarTodo()" type="number"  value="${data[0].precioVenta}"></td>
                        <td></td>
                        <td><button onclick="deleteTdTable(this)" class="btn btn-danger btn-sm">x</button></td>
                    </tr>
                    ` */
                    document.getElementById("ProductosVender").appendChild(fila)
                    /* document.getElementById("ProductosVender").innerHTML+=tr */
        
                    sumarTodo()
                    input2.focus()
    
            
    
       

    
})
        
    function numeroClick(a) {
    console.log(a)
    if (a === "1") {
        $("#metodoDePago").modal("hide")
        $("#pregunta").modal("show")
    }else if(a === "2"){
        document.getElementById("totalLibreta").innerHTML=document.getElementById("total").innerHTML
        $("#metodoDePago").modal("hide")
        $("#libreta").modal("show")
        
    }else if(a === "3"){
        guardarVenta("MP/Tarjeta etc") 
        /* toastr.success('MP/Ttarjeta etc.', 'Venta exitosa') */
       /*  document.getElementById("totalLibreta").innerHTML=document.getElementById("total").innerHTML */
        $("#metodoDePago").modal("hide")
       /*  $("#libreta").modal("show") */
        
    }
};