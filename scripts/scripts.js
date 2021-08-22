/*
- TODO: mensaje personalizdo
- TODO: funcionalidad de borrar cita
*/


class Funcionalidades {
  capitalize (nombre) {  //!--------------FINISHED-----------------
    return nombre
      .split(' ')
      .map(e => e[0].toUpperCase() + e.slice(1,).toLowerCase())
      .join(' ')
  }
}

class Cita extends Funcionalidades {
  constructor () { // !--------------FINISHED-----------------
    super(); // En este caso, es usado como requerimiento para poder usar métodos de una clase
    this.nombre = this.capitalize(document.getElementById('nombre').value.trim());
    this.fecha = document.getElementById('fecha').value;
    this.hora = document.getElementById('hora').value;
    this.sintomas = document.getElementById('sintomas').value || '--';
  }
}

class UI extends Funcionalidades {
  agregarCita (cita) { // !--------------FINISHED-----------------
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

  agregarCitaBusqueda (state = true, cita) { // !--------------FINISHED-----------------
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
      <input type='button' value='Borrar' id='borrar-cita' onclick='setObjToDelete(${cita})' />
      ` :
      `<p> El nombre '${cita}' no exise`
    );

    // if(state) div.getElementById('borrar-cita').dataset.instancia = 'aaa';
    div.classList.add('cita-div');
    div.innerHTML = content;
    citasBuscar.appendChild(div);
  }

  eliminarInfoBusqueda () { // !--------------FINISHED-----------------
    /*
     * Limpia el campo de busqueda y resultados mostrados.
    */

    document.getElementById('inputBuscar').value = '';
    document.getElementById('citas-buscar').innerHTML = '';
  }

  eliminarCita (button) { // TODO: make fucntion
    /*
     * Elimina cita de localStorage y campo de busqueda:
     * funcionamiento: luego de borrar la cita de localStorage, recarga la pagina y obliga una<<<<<<<<<<<<<<<<<<<<<<<<<<<<
     *                  busqueda con el valor que el usuario habia puesto.
     */

    /*

    TODO: TODO: TODO: TODO: TODO: TODO:  TODO: TODO:
      - COMO GUARDAR OBJETO EN DATASET ? SI NO SE PUEDE, HACERLO CON IDS (poner id unico mientras se crea, debe ser igual al del boton de la eliminar (mismo id para identifcar cita). Cuando se quiera eliminar, se elimina dede el buscador con paretElement, del localStorage ?????? y de citas por id)
      - como eliminar por local storage? (ponerle el id a los objetos ????)

    - Guardar instancia en data set de boton
    - acceder a la instancia guardada en el objeto
    - eliminar ese objeto de LocalStorage
    TODO: TODO: TODO: TODO: TODO: TODO:  TODO: TODO:
    */

    /* Eliminar valor de localStorage */

    // let citas = JSON.parse(localStorage.getItem('citas'));


    // console.log(button.dataset.instancia.nombre);

    // alert('Elemento encontrado en : ' + citas.indexOf(button.dataset.instancia));
    // alert('instancia: ' + button.dataset.instancia);
  
    // citas.splice(citas.indexOf(button['data-instancia']), 1);
    // localStorage.setItem('citas', JSON.stringify(citas));

    /*RECARGAR Y OBLIGAR BUSQUEDA ? */
    // delete  button.parentElement;

    /* Deshabilitar boton de eliminar */
    // button.setAttribute('disabled');
  }

  buscarPorNombre () { // !--------------FINISHED-----------------
    /*
     * Validar la entrada de busqueda y con expresiones regulares filtrar coincidencias
     * Regex funcionamiento: Cualquier cita.nombre que contenga por lo menos uno de los nombres
     *                       buscados
     */

    const nombreABuscar = document.getElementById('inputBuscar').value.trim();
    this.eliminarInfoBusqueda();

    if (!this.validarNombre(nombreABuscar)) {
      this.mensajeImprimir('Por favor, ingrese un nombre para buscar', 1);
    }else {
      const citas = JSON.parse(localStorage.getItem('citas'));
      const regEx = new RegExp(nombreABuscar.split(' ').map(e => this.capitalize(e)).join('|'));
      // Option --> new RegExp(this.capitalize(nombreABuscar).split(' ').join('|'));
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

  mensajeImprimir (mensaje, state) { // TODO: make fucntion
    /*
      @param mensaje:
        ? mensaje a imprimir

      @param state:
        ? error
        ? correcto
        ? neutral
    */

    /*
    Por ahora es una alerta, proximanete un mensaje que aparece en la barra superior y durura 4 segundos
    */

    alert(`Estado: ${state} \n` + `Estado: ${mensaje} \n`);
  }

  validarNombre (nombre) { // !--------------FINISHED-----------------
    /*
     * Validar nombres
    */

    let flagPassed = 0;
    const nombres = nombre.split(' ');

    flagPassed += (nombre.length <= 50 && nombre.length >= 2); // flag 1
    flagPassed += (nombres.length <= 4 && nombres.length >= 1); // flag 2
    flagPassed += !(nombres.filter(name => name.length >= 2 && !/[^a-zA-Z]/.test(name)).length - nombres.length); // flag 3

    return flagPassed === 3;
  }

  resetForm () { // !--------------FINISHED-----------------
    document.getElementById('formulario').reset();
  }

  cargarLocalStorage () { // !--------------FINISHED-----------------
    /*
     * Carga las citas guardadas en el localStorage, si no hay crea un nuevo arreglo vacio
    */

    const local = JSON.parse(localStorage.getItem('citas'));
    if (local == null) localStorage.setItem('citas', JSON.stringify([]));
    else local.forEach(cita => { this.agregarCita(cita) });
  }

  agregarLocalStorage (cita) { // !--------------FINISHED-----------------
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
  userInterface.eliminarInfoBusqueda();  //elimince los resultados de la busqueda si habían

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

  /* TODO: solo llamar si la ubusueda es correcta */
  document.getElementById('citas-buscar').addEventListener('click', e => {
    if (e.target.id === 'borrar-cita') {
      const userInterface = new UI();
      userInterface.eliminarCita(e.target);

      /* Mensajes */
      //! eliminado satisfactoria mente, por favor recargue la pagina
    }
  });
});
