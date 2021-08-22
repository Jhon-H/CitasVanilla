/*
  Version 1
  Autor: amonzos@protonmail.com

  Notas:

  1. Para determina que cita eliminar, use un identificador unico (UID),
     generador por la libraria https://www.npmjs.com/package/uuid

  2. La funcion de busqueda hace math con cualquier cita que tenga por lo menos uno de los nombres

*/

class Funcionalidades {
  capitalize (nombre) {
    return nombre
      .split(' ')
      .map(e => e[0].toUpperCase() + e.slice(1,).toLowerCase())
      .join(' ')
  }
}

class Cita extends Funcionalidades {
  constructor () {
    super(); // En este caso, es usado como requerimiento para poder usar métodos de una clase
    this.nombre = this.capitalize(document.getElementById('nombre').value.trim());
    this.fecha = document.getElementById('fecha').value;
    this.hora = document.getElementById('hora').value;
    this.sintomas = document.getElementById('sintomas').value || '--';
    this.uid = uuidv4();
  }
}

class UI extends Funcionalidades {
  agregarCita (cita) {
    const listar = document.getElementById('citas');
    const tableTr = document.createElement('tr');

    tableTr.innerHTML = `
    <td> ${cita.nombre} </td>
    <td> ${cita.fecha} </td>
    <td> ${cita.hora} </td>
    <td> ${cita.sintomas} </td>
    `
    listar.appendChild(tableTr);
    this.resetForm();
  }

  agregarCitaBusqueda (state = true, cita) {
    /*
      @param state:
        ? 1, el objeto existe y es pasado en @param cita
        ? 0, el objeto no existe y no es pasado en @param cita
      @param cita:
        ? instancia de clase *Cita*
        ? nombre a buscar
    */

    const citasBuscar = document.getElementById('citas-buscar');
    const div = document.createElement('div');
    const content = (state ?
      `
      <p> Nombre: ${cita.nombre} </p>
      <p> Fecha: ${cita.fecha} </p>
      <p> Hora: ${cita.hora} </p>
      <p> Sintomas: ${cita.sintomas} </p>
      <input type='button' value='Borrar' id='borrar-cita' data-uid='${cita.uid}' />
      ` :
      `<p> El nombre '${cita}' no exise`
    );

    div.classList.add('cita-div');
    div.innerHTML = content;
    citasBuscar.appendChild(div);
  }

  eliminarInfoBusqueda () {
    /*
     * Limpia el campo de busqueda y resultados mostrados.
    */

    document.getElementById('inputBuscar').value = '';
    document.getElementById('citas-buscar').innerHTML = '';
  }

  eliminarCita (button) {
    /*
     * Elimina cita de localStorage y campo de busqueda
     */

    // Eliminado de localStorage
    let citas = JSON.parse(localStorage.getItem('citas'));
    citas = citas.filter(cita => cita.uid != button.dataset.uid);
    localStorage.setItem('citas', JSON.stringify(citas));

    // Eliminando de busqueda
    button.parentElement.remove();

    // aviso
    this.mensajeImprimir('Cita eliminada satisfactoriamente', 1);

    // Eliminando de espacio de citas (recargar pagina)
    setInterval(() => { window.location.reload()} , 4000);
  }

  buscarPorNombre () {
    /*
     * Validar la entrada de busqueda y con expresiones regulares filtrar coincidencias
     * Regex funcionamiento: Cualquier cita.nombre que contenga por lo menos uno de los nombres
     *                       buscados
     */

    const nombreABuscar = document.getElementById('inputBuscar').value.trim();
    this.eliminarInfoBusqueda();

    if (!this.validarNombre(nombreABuscar)) {
      this.mensajeImprimir('Por favor, ingrese un nombre para buscar', 1);
    } else {
      const citas = JSON.parse(localStorage.getItem('citas'));
      const regEx = new RegExp(nombreABuscar.split(' ').map(e => this.capitalize(e)).join('|'));
      let nombreEncontrado = false;

      citas.forEach(cita => {
        if (regEx.test(cita.nombre)) {
          this.agregarCitaBusqueda(true, cita);
          nombreEncontrado = true;
        }
      });

      if (!nombreEncontrado) {
        this.agregarCitaBusqueda(false, this.capitalize(nombreABuscar));
      }
    }
  }

  mensajeImprimir (mensaje, state) {
    /*
      TODO: convertir a mensaje que aparece en parte superior y despues de 4 segundos se elimina

      @param mensaje:
        ? mensaje a imprimir

      @param state:
        ? error
        ? correcto
        ? neutral
    */

    Swal.fire(`Estado: ${state} \n` + `Estado: ${mensaje} \n`);
  }

  validarNombre (nombre) {
    let flagPassed = 0;
    const nombres = nombre.split(' ');

    flagPassed += (nombre.length <= 50 && nombre.length >= 2); // flag 1
    flagPassed += (nombres.length <= 4 && nombres.length >= 1); // flag 2
    flagPassed += !(nombres.filter(name => name.length >= 2 && !/[^a-zA-Z]/.test(name)).length - nombres.length); // flag 3

    return flagPassed === 3;
  }

  resetForm () {
    document.getElementById('formulario').reset();
  }

  cargarLocalStorage () {
    /*
     * Carga las citas guardadas en el localStorage, si no hay crea un nuevo arreglo vacio
    */

    const local = JSON.parse(localStorage.getItem('citas'));
    if (local == null) localStorage.setItem('citas', JSON.stringify([]));
    else local.forEach(cita => { this.agregarCita(cita) });
  }

  agregarLocalStorage (cita) { 
    const local = JSON.parse(localStorage.getItem('citas'));
    local.push(cita);
    localStorage.setItem('citas', JSON.stringify(local));
  }
}


//! ----------------------------------------- EVENTOS -----------------------------------------

window.addEventListener('DOMContentLoaded', e => {
  /*
   * Agregar citas existen guardadas en localStorage
  */
  const userInterface = new UI();
  userInterface.cargarLocalStorage();
});

document.getElementById('formulario').addEventListener('submit', e => {
  /*
   * Validar entradas y agregar citas a localStorage e interfaz
  */

  e.preventDefault();
  const userInterface = new UI();
  const inputName = document.getElementById('nombre').value;
  userInterface.eliminarInfoBusqueda(); // elimince los resultados de la busqueda si habían

  if (userInterface.validarNombre(inputName)) {
    const objCita = new Cita();
    userInterface.agregarLocalStorage(objCita);
    userInterface.agregarCita(objCita);
  } else {
    userInterface.mensajeImprimir('Por favor, ingrese un nombre correcto', 1);
  }

});

document.getElementById('btnBuscar').addEventListener('click', e => {
  const userInterface = new UI();
  userInterface.buscarPorNombre();

  document.getElementById('citas-buscar').addEventListener('click', e => {
    if (e.target.id === 'borrar-cita') {
      const userInterface = new UI();
      userInterface.eliminarCita(e.target);
    }
  });
});
