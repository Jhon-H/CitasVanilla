
class Login {
  validarUsuario (usuario, password) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    return usuarios.some(user => user[0] == usuario && user[1] == password);
  }

  entrar (usuario, password) {
    if (!this.validarUsuario(usuario, password)) {
      Swal.fire('Usuario o contraseña incorrecta');
    } else {
      window.open('citas.html', '_self');
    }
  }
}

class Register {
  crearUsuario (usuario, password) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    usuarios.push([usuario, password]);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    Swal.fire('Usuario creado exitosamente');
  }
}

class UI {
  resetForm () {
    document.getElementById('login-form').reset();
  }

  validar (usuario) {
    let flagPassed = 0;
    flagPassed += (usuario.length >= 5);
    flagPassed += (usuario.split(' ').length == 1);
    flagPassed += (!/[^a-zA-Z0-9]/.test(usuario));

    return flagPassed === 3;
  }

  cambiarEstado () {
    const estadoActual = localStorage.getItem('state');
    if (estadoActual == 'login') localStorage.setItem('state', 'register');
    else localStorage.setItem('state', 'login');
  }

  mensaje() {
    // alert('acá se esta poniendo el mensaje de login');
    const estado = localStorage.getItem('state');
    const divMensaje = document.getElementById('state');
    divMensaje.textContent = '';

    if (estado == 'login') {
      const enlace = document.createElement('a');
      const parrafo = document.createElement('p');

      enlace.textContent = 'Crear cuenta';
      enlace.id = 'enlace';
      parrafo.textContent = 'Aún no tienes una cuenta? ';
      parrafo.classList.add('login-state');

      parrafo.appendChild(enlace);
      divMensaje.appendChild(parrafo);

      /*
      Alternativa a:
      divMensaje.innerHTML = ' <p class<='login-state'> Aun no tienes cuenta?  <a id='enlace'> Crear cuenta </a></p>';
      */
    } else {
      const enlace = document.createElement('a');
      const parrafo = document.createElement('p');

      enlace.textContent = 'Ingresar';
      enlace.id = 'enlace';
      parrafo.textContent = 'Ya tienes cuenta? ';
      parrafo.classList.add('login-state');
      parrafo.appendChild(enlace);
      divMensaje.appendChild(parrafo);

      /*
      Alternativa a:
      divMensaje.innerHTML = ' <p class='login-state'> Ya tienes cuenta ?   <a id='enlace'> Ingresar </a></p>';
      */
    }
  }
}

/* ! ------------------- EVENTOS -------------------------- */

window.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('state', 'login');
  const userInteface = new UI();
  userInteface.mensaje();

  if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify([]));
  }
});

document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('password').value;
  const estado = localStorage.getItem('state');
  const userInteface = new UI();

  if (!userInteface.validar(usuario)) {
    Swal.fire('Por favor, ingresa un nombre de usuario correcto');
  } else {
    userInteface.resetForm();

    if (estado == 'login') {
      const login = new Login();
      login.entrar(usuario, password);
    } else {
      const register = new Register();
      register.crearUsuario(usuario, password);
    }
  }

  userInteface.resetForm();
});

document.getElementById('state').addEventListener('click', e => {
  if (e.target.id == 'enlace') {
    /* cambiar estado */
    const userInterface = new UI();
    userInterface.resetForm();
    userInterface.cambiarEstado();
    userInterface.mensaje();
  }
});