//--------------------------------------------DIRECCIONAMIENTO Y ACCESO
const user = JSON.parse(localStorage.getItem("login_success")) || false;

if (!user) {
  window.location.href = "login.html";
}
//------------------------------------------- saludo usuario
function mostrarNombreUsuario() {
  const usuario = localStorage.getItem("login_success");
  const nombreObjeto = JSON.parse(usuario);
  const nombreUsuario = nombreObjeto.name;

  const parrafoUsuario = document.getElementById("saludoUsuario");
  parrafoUsuario.textContent = `¡Hola, ${nombreUsuario}! Bienvenido al Banco JS`;
}
mostrarNombreUsuario();
//------------------------------------------- mostrar saldo
function mostrarSaldo() {
  const saldo = localStorage.getItem("login_success");
  const saldoObjeto = JSON.parse(saldo);
  const saldoUsuario = saldoObjeto.monto;

  const cajaSaldo = document.getElementById("saldo");
  cajaSaldo.textContent = saldoUsuario;
}
mostrarSaldo();
//--------------------------------------------MOSTRAR PANTALLAS DE OPERACIONES
function operacionSuma() {
  var nuevoDiv = document.getElementById("suma");
  nuevoDiv.style.display = "block";
}
function operacionResta() {
  var nuevoDiv2 = document.getElementById("resta");
  nuevoDiv2.style.display = "block";
}
function operacionConsulta() {
  var nuevoDiv3 = document.getElementById("consulta");
  nuevoDiv3.style.display = "block";
}
//---------------------------------------------ASIGNACION DE BOTONES----------- CANCELAR

function salir1() {
  // depositar
  var inputNumber = document.getElementById("numInput");
  var divDepositar = document.getElementById("suma");

  inputNumber.value = "";

  divDepositar.style.display = "none";
}
function salir() {
  // retirar
  var inputNumber = document.getElementById("numInput2");
  var divRetirar = document.getElementById("resta");

  inputNumber.value = "";

  divRetirar.style.display = "none";
}
function salirConsulta() {
  // consultar
  var divConsulta = document.getElementById("consulta");

  divConsulta.style.display = "none";
}
//------------------------------------------------ASIGNACION DE OPERACIONES-------------

function realizarSuma() {
  let usuarios = JSON.parse(localStorage.getItem("users"));
  var numInput = document.getElementById("numInput");
  var montoDeposito = parseInt(numInput.value);
  var inputValor = document.getElementById("numInput").value;

  // ------------Validacion de input vacios
  if (inputValor === "") {
    alert("este numero no es valido");
    inputValor.value = 0;
    salir1();
    return;
  }
  //-------------------------------------------------------------------------Operacion de suma
  var saldo = document.getElementById("saldo").innerText;
  var saldoParcial = parseInt(saldo);
  var saldoFinal = montoDeposito + saldoParcial;

  // -------------------------------------------------------Guardado  de monto
  let saldoGuardado = JSON.parse(localStorage.getItem("saldoFinal")) || [];
  saldoGuardado.push("DEPOSITO", saldoFinal);
  localStorage.setItem("saldoFinal", JSON.stringify(saldoGuardado));
  sessionStorage.setItem("monto", saldoFinal);
  usuarios.forEach((usuario) => {
    if (usuario.email === sessionStorage.getItem("email")) {
      usuario.monto = sessionStorage.getItem("monto");
    }
  });

  localStorage.setItem("users", JSON.stringify(usuarios));
  const datoAlmacenado = JSON.parse(localStorage.getItem("saldoFinal"));
  const ultimoDato = datoAlmacenado[datoAlmacenado.length - 1];

  // ----------------------------------------------------------------------------------------cambio de dato
  function actualizarSaldo() {
    const saldo = localStorage.getItem("login_success");
    const saldoObjeto = JSON.parse(saldo);
    const saldoFinal = localStorage.getItem("saldoFinal");
    let saldoFinalObjeto = JSON.parse(saldoFinal);
    saldoFinalObjeto = saldoFinalObjeto[saldoFinalObjeto.length - 1];
    saldoObjeto.monto = saldoFinalObjeto;
    let saldoUsuario = saldo.monto;
    saldoUsuario = saldoFinalObjeto;

    //------------------------------------------------------------------------------------------historial
    const usuario = localStorage.getItem("login_success");
    const emailObjeto = JSON.parse(usuario);
    const emailUsuario = emailObjeto.email; //------------valor unico de comparacion

    const sesionData = sessionStorage.getItem(`historial_${emailUsuario}`); //-----agregar historial
    const cadena = sesionData ? JSON.parse(sesionData) : [];
    cadena.push("DEPOSITO", inputValor, "MONTO", saldoFinalObjeto);
    sessionStorage.setItem(`historial_${emailUsuario}`, JSON.stringify(cadena));

    //----------------------------- ------------------------------------------------ mensaje de finalizacion
    function mensaje() {
      document.getElementById("resultado").style.display = "block";
      const mensaje = document.getElementById("resultado");
      mensaje.textContent = "DEPOSITO EXITOSO";
      setTimeout(() => {
        document.getElementById("resultado").style.display = "none";
        document.getElementById("suma").style.display = "none";
      }, 1000);
    }
    mensaje();
    // ----------------------------------------------------------------------------------mostrar en saldo

    const cajaSaldo = document.getElementById("saldo");
    cajaSaldo.textContent = saldoFinalObjeto;
    numInput.value = "";
  }
  actualizarSaldo();
}

//--------------------------                            RESTA           ---------------------------------
function realizarResta() {
  let usuarios = JSON.parse(localStorage.getItem("users"));
  var numInput2 = document.getElementById("numInput2");
  var montoDeposito = parseInt(numInput2.value);
  var inputValor2 = document.getElementById("numInput2").value;
  // ------------Validacion de input vacios
  if (inputValor2 === "") {
    alert("este numero no es valido");
    inputValor2.value = 0;
    salir();
    return;
  }
  //----------------Operacion restar numeros
  var saldo = document.getElementById("saldo").innerText;
  var saldoParcial = parseInt(saldo);
  var saldoFinal = (montoDeposito - saldoParcial) * -1;

  if (saldoFinal < 0) {
    alert("No tienes los fondos suficientes");
    inputValor2.value = 0;
    salir();
    return;
  } else if (saldoFinal < 10000) {
    alert(
      "Es imposible realizar esta transaccion la cuenta simpre debe tener un minimo de $10.000"
    );
    inputValor2.value = 0;
    salir();
    return;
  }
  //---------------Guardar Numeros

  let saldoGuardado = JSON.parse(localStorage.getItem("saldoFinal")) || [];
  saldoGuardado.push("RETIRO", saldoFinal);
  localStorage.setItem("saldoFinal", JSON.stringify(saldoGuardado));
  sessionStorage.setItem("monto", saldoFinal);

  usuarios.forEach((usuario) => {
    if (usuario.email === sessionStorage.getItem("email")) {
      usuario.monto = sessionStorage.getItem("monto");
    }
  });

  localStorage.setItem("users", JSON.stringify(usuarios));

  const datoAlmacenado = JSON.parse(localStorage.getItem("saldoFinal"));
  const ultimoDato = datoAlmacenado[datoAlmacenado.length - 1];
  // ----------------------------------------------------------------------------------------cambio de dato

  function actualizarSaldo() {
    const saldo = localStorage.getItem("login_success");
    const saldoObjeto = JSON.parse(saldo);

    const saldoFinal = localStorage.getItem("saldoFinal");
    let saldoFinalObjeto = JSON.parse(saldoFinal);
    saldoFinalObjeto = saldoFinalObjeto[saldoFinalObjeto.length - 1];
    saldoObjeto.monto = saldoFinalObjeto;
    sessionStorage.setItem("login_success", saldoObjeto);
    let saldoUsuario = saldo.monto;
    saldoUsuario = saldoFinalObjeto;
    // ----------------------------------------------------------------------------------mostrar en saldo
    const cajaSaldo = document.getElementById("saldo");
    cajaSaldo.textContent = saldoFinalObjeto;

    //------------------------------------------------------------------------------------------historial

    const usuario = localStorage.getItem("login_success");
    const emailObjeto = JSON.parse(usuario);
    const emailUsuario = emailObjeto.email; //------------valor unico de comparacion

    const sesionData = sessionStorage.getItem(`historial_${emailUsuario}`); //-----agregar historial
    const cadena = sesionData ? JSON.parse(sesionData) : [];
    cadena.push("RETIRO", inputValor2, "MONTO", saldoFinalObjeto);
    sessionStorage.setItem(`historial_${emailUsuario}`, JSON.stringify(cadena));

    //------------------------------------------------------------------------------mensaje de finalizacion
    function mensaje2() {
      document.getElementById("resultado").style.display = "block";

      const mensaje = document.getElementById("resultado");

      mensaje.textContent = "RETIRO EXITOSO";
      setTimeout(() => {
        document.getElementById("resultado").style.display = "none";
        document.getElementById("resta").style.display = "none";
      }, 1000);
    }
    mensaje2();
    //------------------------------------------------------------------------------------salida y reseteo
    numInput2.value = "";
  }
  actualizarSaldo();
}
//---------------------------------   CONSULTAR -----------------------------------
function mostrarHistorial(emailUsuario) {
  //-----------------------------------------------------------------llamar historial del usuario
  const sesionData = sessionStorage.getItem(`historial_${emailUsuario}`);
  const historial = sesionData ? JSON.parse(sesionData) : [];

  //----------------------------------------------------------- traer div y crear li
  const historialDiv = document.getElementById("movimientos");
  const listaHistorial = document.createElement("ul");
  //-------------------------------------------------------------poner a cada li un movimiento


  historial.forEach(transaccion => {
    const itemTransaccion = document.createElement("li");
    itemTransaccion.textContent = transaccion;
    listaHistorial.appendChild(itemTransaccion);
  });

  //listaHistorial.classList.add("two-columns");
  //----------------------------------------------------------reseteo del DIV
  historialDiv.innerHTML = "";

  //----------------------------------------------------------llevar li al DIV
  historialDiv.appendChild(listaHistorial);
  
}

//------------------------------------------------------------ Traer email
const usuario = localStorage.getItem("login_success");
const emailObjeto = JSON.parse(usuario);
const emailUsuario = emailObjeto.email;
mostrarHistorial(emailUsuario);
//---------------------------------------------salir de la pagina
const logout = document.querySelector("#logout");
logout.addEventListener("click", () => {
  alert("Tu sesion finalizo de manera correcta");
  localStorage.removeItem("login_success");
  window.location.href = "login.html";
});
