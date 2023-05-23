//DOM
document.getElementById("presupuestoForm").addEventListener("submit", ingresarPresupuesto);
document.getElementById("gastoForm").addEventListener("submit", ingresarGastos);

//Funcion Constructora: Gastos
function Gasto(id, nombre, monto) {
  this.id = id;
  this.nombre = nombre;
  this.monto = monto;
}

//Array: Gastos (array vacío para actualización)
let listaGastos = [];

//Funcion: Agregar Gasto (nuevo gasto/push)
function agregarGasto(nombre, monto) {
  let id = listaGastos.length + 1;
  let gasto = new Gasto(id, nombre, monto);
  listaGastos.push(gasto);
  actualizarTotal();
  actualizarTabla();
}

//Funcion: Actualzizar Total (reduce) (*valorActual sería listaGastos)
function actualizarTotal() {
  let resultado = listaGastos.reduce((acumulador, valorActual) => acumulador + parseInt(valorActual.monto), 0);
  let restanteTotal = parseInt(document.getElementById("presupuestoInput").value) - resultado;
  document.getElementById("totalGastos").innerHTML = resultado;
  document.getElementById("restanteTotal").innerHTML = restanteTotal;
  document.getElementById("restanteTotal").style.color = restanteTotal < 0 ? "#dc3545" : "black";
  if (restanteTotal < 0) {
    alert("Has superado el máximo de tu presupuesto.");
  }
}

//Funcion: Eliminar Gasto (splice)
function eliminarGasto(index) {
  listaGastos = listaGastos.filter(item => item.id !== index);
  actualizarTotal();
  actualizarTabla();
}

//Funcion: Actualizar Tabla
function actualizarTabla() {
  let html = "";
  listaGastos.forEach((gasto, index) => {
    html += `
        <tr>
          <th scope="row">${index + 1}</th>  
          <td><p class="textoTabla">${gasto.nombre}</p></td>
          <td><p class="textoTabla">CLP$ ${gasto.monto}</p></td>
          <td>
            <button class="btn botonGasto" onclick="eliminarGasto(${gasto.id})">
            <i class="fa-sharp fa-solid fa-xmark"></button></i></td></button>
        </tr>
        `
  });
  document.querySelector("#valoresGastos").innerHTML = html;
}

// Función: Ingresar Presupuesto
function ingresarPresupuesto(e) {
  e.preventDefault();
  let presupuestoInput = document.getElementById("presupuestoInput").value;
  document.getElementById("totalPresupuesto").innerHTML = `CLP$ ${presupuestoInput}`; 
  actualizarPresupuesto();
}

// Función: Ingresar Gastos
function ingresarGastos(e) {
  e.preventDefault()
  let gastoNombreInput = document.getElementById("gastoNombreInput").value;
  let gastoValorInput = document.getElementById("gastoValorInput").value;
  agregarGasto(gastoNombreInput, gastoValorInput);
}