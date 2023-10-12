document.addEventListener("DOMContentLoaded", function(event) {
    //código a ejecutar cuando el DOM está listo para recibir acciones
    iniciarSesion()
});
function iniciarSesion(){
    console.log(JSON.parse(localStorage.getItem("user")))
    if (localStorage.getItem("user")===null || JSON.parse(localStorage.getItem("user")).establecimiento==undefined) {
        location.href="../Login/index.php"
    }else{
        document.getElementById("userNameID").innerHTML=JSON.parse(localStorage.getItem("user")).user
    }
}
function cerrarSession(){
    localStorage.clear()
    iniciarSesion()
}
document.getElementById("cerrarSession").addEventListener("click",()=>{
    cerrarSession()
})