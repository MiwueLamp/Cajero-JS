//--------------------------------------------DIRECCIONAMIENTO Y ACCESO
const user =JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href = 'login.html'
}

const logout = document.querySelector('#logout')
logout.addEventListener('click', ()=>{
    alert('Tu sesion finalizo de manera correcta')
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
})
//--------------------------------------------MOSTRAR PANTALLAS DE OPERACIONES
function operacionSuma() {
    var nuevoDiv = document.getElementById('suma');
    nuevoDiv.style.display = 'block';
  }
function operacionResta() {
    var nuevoDiv2 = document.getElementById('resta');
    nuevoDiv2.style.display = 'block';
  }
function operacionConsulta() {
    var nuevoDiv3 = document.getElementById('consulta');
    nuevoDiv3.style.display = 'block';
  }
//---------------------------------------------ASIGNACION DE OPERACIONES
localStorage