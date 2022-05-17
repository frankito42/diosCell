document.addEventListener('DOMContentLoaded',async function(){ 
    // your code goes here

    await traerDatos(1,"celus").then(async()=>{
        await traerDatos(2,"computadoras").then(async()=>{
            await traerDatos(3,"tablets")
        })
    })
    


})


async function traerDatos(cat,idEle) {
    await fetch('php/celus.php?id='+cat)
  .then(response => response.json())
  .then(async(data) => {
      console.log(data)
      await dibujar(data,idEle)
    
    }); 
}



async function dibujar(data,elemento) {
    let card=``
    data.forEach(element => {
        card+=`
        <!-- Grid column -->
        <div class="col-lg-4 col-md-12 mb-4 d-flex align-items-stretch">

          <!-- Card -->
          <div class="card card-ecommerce">

            <div class="view overlay">
              <img src="ventasV/moduloStock/${element.imagen}" class="img-fluid" alt="sample image">
              <a>
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>

            <div class="card-body">

              <h5 class="card-title mb-1"><strong><a class="dark-grey-text">${element.nombre}</a></strong></h5>
              <p>${element.descripcion}</p>

              <div class="card-footer pb-0">
                <div class="row mb-0">
                    <div class="col">
                      <span class="float-left">
                        <strong>${element.precioVenta}$</strong>
                      </span>
                      <span class="float-right">
                <a class="btn btn-success btn-sm" target="_blank" href="https://api.whatsapp.com/send?phone=3718504950&text=Hola, Nececito mas informacion! sigue disponible? ${element.nombre}">Whatsapp</a>
                      </span>
                      
                    </div>

                </div>
                
              </div>

            </div>

          </div>
          <!-- Card -->

        </div>
        <!-- Grid column -->
        
        
        `
    });

    document.getElementById(elemento).innerHTML=card
}