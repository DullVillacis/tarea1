const boton = document.getElementById('btnHistoria');
const historia = document.getElementById('historiaOculta');

boton.addEventListener('click', function () {
    historia.classList.toggle('visible');

    if (historia.classList.contains('visible')) {
        boton.textContent = 'Ocultar historia';
    } else {
        boton.textContent = 'Conocer una historia';
    }
});


const formulario = document.getElementById('formularioAdopcion');
const mensaje = document.getElementById('mensajeFormulario');

function mostrarError(idCampo, texto) {
    const span = document.getElementById('error-' + idCampo);
    if (span) span.textContent = texto;

    const input = document.getElementById(idCampo);
    if (input) input.classList.add('invalido');
}

function limpiarErrores() {
    formulario.querySelectorAll('.error-campo').forEach(s => s.textContent = '');
    formulario.querySelectorAll('input.invalido').forEach(i => i.classList.remove('invalido'));
    mensaje.className = 'mensaje-formulario';
    mensaje.innerHTML = '';
}


formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limpiarErrores();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    const edad = document.getElementById('edad').value;
    const fecha = document.getElementById('fecha').value;
    const mascota = document.querySelector('input[name="mascota"]:checked');
    const caracteristicas = document.querySelectorAll('input[name="caracteristicas"]:checked');
    const aceptaTerminos = document.getElementById('terminos').checked;

    let hayErrores = false;

    if (nombre === '') {
        mostrarError('nombre', 'Por favor ingresa tu nombre.');
        hayErrores = true;
    } else if (nombre.length < 3) {
        mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres.');
        hayErrores = true;
    } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
        mostrarError('nombre', 'El nombre solo puede contener letras y espacios.');
        hayErrores = true;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo === '') {
        mostrarError('correo', 'Por favor ingresa tu correo electrónico.');
        hayErrores = true;
    } else if (!formatoCorreo.test(correo)) {
        mostrarError('correo', 'El correo no es válido. Ejemplo: nombre@correo.com');
        hayErrores = true;
    }

    if (contrasena === '') {
        mostrarError('contrasena', 'Por favor crea una contraseña.');
        hayErrores = true;
    } else if (contrasena.length < 6) {
        mostrarError('contrasena', 'La contraseña debe tener al menos 6 caracteres.');
        hayErrores = true;
    }

    if (edad === '') {
        mostrarError('edad', 'Por favor ingresa tu edad.');
        hayErrores = true;
    } else if (parseInt(edad) < 18) {
        mostrarError('edad', 'Debes ser mayor de 18 años para adoptar.');
        hayErrores = true;
    } else if (parseInt(edad) > 99) {
        mostrarError('edad', 'Por favor ingresa una edad real (máximo 99).');
        hayErrores = true;
    }

    if (fecha === '') {
        mostrarError('fecha', 'Selecciona una fecha para tu visita.');
        hayErrores = true;
    } else {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaElegida = new Date(fecha);

        if (fechaElegida < hoy) {
            mostrarError('fecha', 'La fecha no puede ser anterior a hoy.');
            hayErrores = true;
        }
    }

    if (!mascota) {
        document.getElementById('error-mascota').textContent =
            'Selecciona qué mascota prefieres.';
        hayErrores = true;
    }

    if (caracteristicas.length === 0) {
        document.getElementById('error-caracteristicas').textContent =
            'Marca al menos una característica que te guste.';
        hayErrores = true;
    }

    if (!aceptaTerminos) {
        document.getElementById('error-terminos').textContent =
            'Debes aceptar el compromiso de adopción responsable.';
        hayErrores = true;
    }

    if (hayErrores) {
        const primerError = formulario.querySelector('.invalido, .error-campo:not(:empty)');
        if (primerError) {
            primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        mensaje.className = 'mensaje-formulario exito';
        mensaje.innerHTML = '¡Gracias, <strong>' + nombre + '</strong>! ' +
                            'Recibimos tu solicitud y te contactaremos a ' +
                            '<strong>' + correo + '</strong> pronto.';

        mensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(function () {
            formulario.reset();
            mensaje.className = 'mensaje-formulario';
            mensaje.innerHTML = '';
        }, 4000);
    }
});


formulario.querySelectorAll('input').forEach(function (input) {
    function limpiarErrorDelCampo() {
        input.classList.remove('invalido');
        const span = document.getElementById('error-' + input.id);
        if (span) span.textContent = '';
    }

    input.addEventListener('input', limpiarErrorDelCampo);
    input.addEventListener('change', limpiarErrorDelCampo);
});

formulario.querySelectorAll('input[name="mascota"]').forEach(r => {
    r.addEventListener('change', () => {
        document.getElementById('error-mascota').textContent = '';
    });
});

formulario.querySelectorAll('input[name="caracteristicas"]').forEach(c => {
    c.addEventListener('change', () => {
        document.getElementById('error-caracteristicas').textContent = '';
    });
});


const botonDS = document.getElementById('btnDS');
const panelDS = document.getElementById('panelDS');
const overlayDS = document.getElementById('overlayDS');
const cerrarDS = document.getElementById('btnCerrarDS');

function abrirPanel() {
    panelDS.classList.add('visible');
    overlayDS.classList.add('visible');
}

function cerrarPanel() {
    panelDS.classList.remove('visible');
    overlayDS.classList.remove('visible');
}

botonDS.addEventListener('click', abrirPanel);
cerrarDS.addEventListener('click', cerrarPanel);
overlayDS.addEventListener('click', cerrarPanel);
