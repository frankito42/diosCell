let familias
document.addEventListener("DOMContentLoaded",async  function(event) {
  await traerFamilias()
  /* await traerLibreta() */
    /*  FILTRO DE LA TABLA FAMILIAS */
    $("#tableSearch").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    /*  FILTRO DE LA TABLA FAMILIAS */
});
async function traerLibreta(id) {
  $("#modalMostrarLaLibreta").modal("show")
  await fetch('php/listarLibretas.php?id='+id)
  .then((response) => response.json())
  .then(async (data) => {
    console.log(data) 
    await dibujarCards(data)
  }); 
}
async function traerFamilias() {
  await fetch('php/listarFamilias.php')
  .then((response) => response.json())
  .then(async (data) => {
    console.log(data)
    familias=data
    dibujarFamilias(data)
  });
}

async function dibujarFamilias(params) {
  let tr=``
  params.forEach(element => {
    tr+=`
      <tr>
        <td>${element.nombreFamilia}</td>
        <td><button class="btn btn-blue" onclick="traerLibreta(${element.id})">Ver libreta</button><button class="btn btn-blue" onclick="verHistorial(${element.id})">Ver historial</button></td>
      </tr>
    `
  });
  document.getElementById("listarFamiliasAllTabla").innerHTML=tr
}


async function dibujarCards(params) {
  let card=``
  let total=0
  let lista=``


if (params.length>=1) {
  params.forEach(element => {
    total+=element.cantidad*element.precio
    lista+=`
    <h5 class="bold">${element.nombreArticulo}<span> x${element.cantidad}</span> <span style="color:#4caf50;">$${separator(element.precio)}</span></h5>
    <p style="color: #b3b3b3;"><span>${element.nombre}</span> ${element.fecha}</p>
    `
});
card=`
  <div class="col-12 mb-4 mt-2">

<!-- Card -->
<div class="card card-cascade wider">

<!-- Card image -->
<div class="view view-cascade gradient-card-header peach-gradient">

    <!-- Title -->
    <h2 class="card-header-title mb-3">Familia: ${params[0].nombreFamilia}</h2>
    <!-- Text -->

</div>

<!-- Card content -->
<div class="card-body card-body-cascade text-center">
<!-- Text -->
    
    ${lista}
    <hr>
    <div class="row">
      <div class="col">
        <h4 class="bold">CREDITO <span style="color:#4caf50;">$${separator(params[0].credito)}</span></h4>
      </div>
      <div class="col">
      <h4 class="bold">TOTAL <span style="color:#4caf50;">$${separator(total)}</span></h4>
      </div>
    </div>
    
    <!-- Link -->
    <div class="row">
      <div class="col">
        <a data-dismiss="modal" class="red-text d-flex flex-row p-2">
          <h5 class="waves-effect waves-light"><i class="fas fa-angle-double-left ml-2"></i>Cerrar</h5>
        </a>
      </div>
      <div class="col">
        <a onclick="abrirModalPagar('${params[0].nombreFamilia}',${params[0].idFamilia},${total})" class="green-text d-flex flex-row-reverse p-2">
          <h5 class="waves-effect waves-light">Pagar<i class="fas fa-angle-double-right ml-2"></i></h5>
        </a>
      </div>
    </div>
    
    

</div>
<!-- Card content -->

</div>
<!-- Card -->

</div>
  `
}else{
  card=`
  <div class="col-12 text-center">
      <h4 style="background: #3183ba;color: white;border-radius: 5px;padding: 3%;box-shadow: 0px 0px 20px 0px #0000007a;">Todo esta al dia.</h4>
        <a data-dismiss="modal" class="red-text d-flex flex-row-reverse p-2">
          <h5 class="waves-effect waves-light">Cerrar<i class="fas fa-angle-double-right ml-2"></i></h5>
        </a>
  </div>
  `
}








  document.getElementById("libreta").innerHTML=card

}


function abrirModalPagar(nombreFamilia,idFamilia,totalApagar) {
  console.log(idFamilia)
  document.getElementById("titulo").innerHTML=nombreFamilia
  document.getElementById("idFamiliaLibreta").value=idFamilia
  document.getElementById("total").innerHTML=separator(totalApagar)
  $("#pagarLibreta").modal("show")
}
document.getElementById("formPagarLibreta").addEventListener("submit",async (e)=>{
  e.preventDefault()
  let form=new FormData(document.getElementById("formPagarLibreta"))
  let usu=JSON.parse(localStorage.getItem("user"))
  form.append("establecimiento",usu.establecimiento)
  form.append("idUsuario",usu.id)
  await fetch('php/pagarLibreta.php',{
    method:"POST",
    body:form,
  })
  .then((response) => response.json())
  .then(async (data) => {
    console.log(data)
    if (data=="perfecto") {
      $("#pagarLibreta").modal("hide")
      await traerLibreta(document.getElementById("idFamiliaLibreta").value)
      document.getElementById("formPagarLibreta").reset()
      toastr.success('Libreta', 'Pago exitoso.')
    }
  });
})


async function verHistorial(id) {
  $("#historialModal").modal("show")
  await fetch('php/listarHistorial.php?id='+id)
  .then((response) => response.json())
  .then(async (data) => {
    console.log(data)
    await dibujarHistorial(data)
  });
}
async function dibujarHistorial(params) {
  let h4=``
  if (params.length<=0) {
    h4=`<h4>Sin historial</h4>`
  }else{
    params.forEach(element => {
      h4+=`<h5>${element.fecha} Monto $${separator(element.monto)}</h5><hr>`
    });
  }
  document.getElementById("listarHistorial").innerHTML=h4
}
function separator(numb) {
  console.log(numb)
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

document.getElementById("pagoCon").addEventListener("keyup",(e)=>{
  document.getElementById("pagoCon").value=separator(e.target.value.replace(/,/g, ""))
})