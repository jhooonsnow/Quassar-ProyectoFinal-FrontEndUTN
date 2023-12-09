const formulario = document.getElementById('registroForm');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre-contacto').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('phone').value;
    const contraseña = document.getElementById('password').value;

    const usuario = {
        nombre,
        email,
        telefono,
        contraseña
    };

    // Guarda el objeto usuario en el localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    console.log('Usuario registrado:', usuario);
    window.location.href = 'iniciar-sesion.html';
});

// cargar los datos almacenados en localStorage
function cargarDatos() {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        document.getElementById('nombre-contacto').value = usuario.nombre;
        document.getElementById('email').value = usuario.email;
        document.getElementById('phone').value = usuario.telefono;
        document.getElementById('password').value = usuario.contraseña;
    }
}

cargarDatos();

// Función para iniciar sesión
function iniciarSesion() {
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;

    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        if (email === usuario.email && contraseña === usuario.contraseña) {
            alert('Inicio de sesión exitoso');

            window.location.href = '/index.html';
        } else {
            alert('Usuario o Contraseña Incorrectos.');
        }
    } else {
        alert('Por favor crear una cuenta.');
    }
}