/*
  
fucionalidad de borrar {
  - agregar ids unicos a cada cita
  - poder eliminar una cita
  - Si se elimina una cita que se actualice solo, 
  se deje la busqueda anterior y se elimine de LA BUSQUEDA, lo qu se acaba de eliminar
}

* 2. BORRAR
* 3. VALIDAR ENTRADAS
* MENSAJE PERSONALIZADO: ELIMINADO, CREADO, ERRORES
* 4. MIRAR REQUERIMIENOS ---------> TODO: LOGIN PRINCIPAL TODO: 
* Arreglar el paddin en sintomas
* SI YA BUSCo Y REALIZA OTRA ACCION (QUE SE BORRE LA INFORMACION)
*/

class funcionalidades{

  capitalize(nombre){//!--------------FINISHED-----------------
    return nombre
          .split(" ")
          .map(e =>  e[0].toUpperCase() + e.slice(1,).toLowerCase())
          .join(" ");
  }
}



class Cita extends funcionalidades{

  constructor() { //!--------------FINISHED-----------------
    super(); //En este caso, es usado como requerimiento para poder usar métodos de una clase
    this.nombre  = this.capitalize(document.getElementById("nombre").value);
    this.fecha = document.getElementById("fecha").value;
    this.hora = document.getElementById("hora").value;
    this.sintomas = document.getElementById("sintomas").value || "--";
  }
}



class UI extends funcionalidades{

  agregarCita(cita){ //!--------------FINISHED-----------------
 
    const listar = document.getElementById("citas");
    const table_tr = document.createElement("tr");

    table_tr.innerHTML = `
    <td> ${cita.nombre} </td>
    <td> ${cita.fecha} </td>
    <td> ${cita.hora} </td>
    <td> ${cita.sintomas} </td>
    `
    listar.appendChild(table_tr);
    this.resetForm();
  }


  agregarCitaBusqueda(state = true, cita){ //!--------------FINISHED-----------------
    /*
      @param state:
        ? 1, el objeto existe y es pasado en @param cita
        ? 0, el objeto no existe y no es pasado en @param cita
      @param cita:
        ? instancia de clase *Cita*
        ? nombre a buscar
    */

    const citas_buscar = document.getElementById("citas-buscar");
    const div = document.createElement("div");
    const content = (state ? `
     <p> Nombre: ${cita.nombre} </p>
     <p> Fecha: ${cita.fecha} </p>
     <p> Hora: ${cita.hora} </p>
     <p> Sintomas: ${cita.sintomas} </p>
     <input type="button" value="Borrar" id="borrar-cita" data-instancia=${cita} />
    ` :
    `<p> El nombre "${cita}" no exise`
    );

    // if(state) div.getElementById("borrar-cita").dataset.instancia = "aaa";
    div.classList.add("cita-div");
    div.innerHTML = content;
    citas_buscar.appendChild(div);
  }


  buscarPorNombre(){ //!--------------FINISHED-----------------
    /*
     * Validar la entrada de busqueda y con expresiones regulares filtrar coincidencias
     * Regex funcionamiento: Cualquier cita.nombre que contenga por lo menos uno de los nombres
     *                       buscados
     */

    const nombreABuscar = document.getElementById("inputBuscar").value;   
    this.eliminarInfoBusqueda(); 

    if(! this.validarBuscarPorNombre(nombreABuscar)){
      this.mensajeImprimir("Por favor, ingrese un nombre para buscar");
    }
    else{
      const citas = JSON.parse(localStorage.getItem("citas"));
      const regEx = new RegExp(nombreABuscar.split(" ").map(e => this.capitalize(e)).join("|"));
      // Option --> new RegExp(this.capitalize(nombreABuscar).split(" ").join("|"));
      let nombreEncontrado = false;

      citas.forEach( cita => {
        if(regEx.test(cita.nombre)){
          this.agregarCitaBusqueda(true, cita);
          nombreEncontrado = true;
        }
      });

      if(!nombreEncontrado){
        this.agregarCitaBusqueda(false, this.capitalize(nombreABuscar));
      }
    }
  }


  eliminarInfoBusqueda(){ //!--------------FINISHED-----------------
    /*
     * Limpia el campo de busqueda y resultados mostrados.
    */

    document.getElementById("inputBuscar").value = "";
    document.getElementById("citas-buscar").innerHTML = "";
  }


  mensajeImprimir(mensaje, state){ //TODO: make fucntion
    /*
      @param mensaje:
        ? mensaje a imprimir

      @param state:
        ? error
        ? correcto
        ? neutral
    */

    /*test */
    alert(`Estado: ${state} \n` + `Estado: ${mensaje} \n`);
  }


  eliminarCita(button){ //TODO: make fucntion
    /*
     * Elimina cita de localStorage y campo de busqueda:
     * funcionamiento: luego de borrar la cita de localStorage, recarga la pagina y obliga una     
     *                  busqueda con el valor que el usuario habia puesto.
     */
  
    /*
    TODO: TODO: TODO: TODO: TODO: TODO:  TODO: TODO:

    - Guardar instancia en data set de boton
    - hacer que se cojan todos los botones 
    - acceder a la instancia guardada en el objeto
    - eliminar ese objeto de LocalStorage
    TODO: TODO: TODO: TODO: TODO: TODO:  TODO: TODO:
    */

    /*Eliminar valor de localStorage*/

    let citas = JSON.parse(localStorage.getItem("citas"));
    
    alert("Elemento encontrado en : " + citas.indexOf(button.dataset.instancia));
    alert("instancia: " + button.dataset.instancia);
  
    // citas.splice(citas.indexOf(button["data-instancia"]), 1);
    // localStorage.setItem("citas", JSON.stringify(citas));

    /*RECARGAR Y OBLIGAR BUSQUEDA ? */
    // delete  button.parentElement;

    /* Deshabilitar boton de eliminar */
    // button.setAttribute("disabled");
  }

  validar(cita){ //TODO: make fucntion
    return true;

    /*
     * Valida entradas del formulario de citas
     * Nota: El form tiene validaciones HTML 5, pero como es posible modificarlo desde las opciones * de desarrollador se valida tambien acá.
    */
    
    /*Validando nombre*/
    const nombres = cita.nombre.split(" ");
    const flag_passed = 0;
    const regEx = "[a-zA-Z]{2, }"; 

    flag_passed += (nombres.length >= 1);
    nombres.forEach(nombre => {
      flag_passed += regEx.match(nombre);
    });

  
    /*
      Nombre = Si es espacio o hay numeros paila
      Fecha = Año mayor o igual a 2021
      Hora = Validar el formatos
      Sintamas
    */

  
  }


  validarBuscarPorNombre(nombre){ //TODO: make fucntion
    /*
     * Valida entrada del <input> de busqueda por nombre
    */
    return true;
  }


  resetForm(){ //!--------------FINISHED-----------------
    document.getElementById("formulario").reset();
  }


  cargarLocalStorage(){ //!--------------FINISHED-----------------
    /*
     * Carga las citas guardadas en el localStorage, si no hay crea un nuevo arreglo vacio
    */

    const local = JSON.parse(localStorage.getItem("citas"));
    if(local == null) localStorage.setItem("citas", JSON.stringify([]));
    else local.forEach( cita => { this.agregarCita(cita); });
  }


  agregarLocalStorage(cita){ //!--------------FINISHED-----------------
  
    const local = JSON.parse(localStorage.getItem("citas"));
    local.push(cita);
    localStorage.setItem("citas", JSON.stringify(local));
  }
}




//! ----------------------------------------- EVENTOS -----------------------------------------

window.addEventListener("DOMContentLoaded", e => {
  /*
   * Agregar citas existen guardadas en localStorage
  */
  const userInterface = new UI();
  userInterface.cargarLocalStorage();
});


document.getElementById("formulario").addEventListener('submit', e =>{
  /*
   * Validar entradas y agregar citas a localStorage e interfaz
  */

  e.preventDefault();

  const userInterface = new UI();
  const obj_cita = new Cita();

  // userInterface.validar(obj_cita);

  userInterface.agregarLocalStorage(obj_cita);
  userInterface.agregarCita(obj_cita);
});


document.getElementById("btnBuscar").addEventListener('click', e => {
  const userInterface = new UI();
  userInterface.buscarPorNombre();


  /*TODO: solo llamar si la ubusueda es correcta*/
  
  document.getElementById("citas-buscar").addEventListener('click', e =>{
    
  
    if(e.target.id == "borrar-cita"){
      const userInterface = new UI();
      userInterface.eliminarCita(e.target);
    
      /*Mensajes*/
      //!eliminado satisfactoria mente, por favor recargue la pagina
    }
  });

});
