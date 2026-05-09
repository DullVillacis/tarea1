/* ==========================================
   SCRIPT.JS - Interactividad de la página
   1. Mostrar/ocultar la historia de Luna
   2. Validar el formulario al enviarlo
   3. Abrir/cerrar el panel del Design System
   ========================================== */


/* ----- 1. MOSTRAR / OCULTAR LA HISTORIA ----- */

const boton = document.getElementById('btnHistoria');
const historia = document.getElementById('historiaOculta');

boton.addEventListener('click', function () {
    historia.classList.toggle('visible');

    if (historia.classList.contains('visible')) {
        boton.textContent = 'Ocultar historia';
    } else {
        boton.textContent = 'Conocer una historia 💛';
    }
});


/* ----- 2. VALIDAR EL FORMULARIO ----- */

const formulario = document.getElementById('formularioAdopcion');
const mensaje = document.getElementById('mensajeFormulario');

// Función auxiliar: muestra el error debajo del campo y lo marca en rojo
function mostrarError(idCampo, texto) {
    const span = document.getElementById('error-' + idCampo);
    if (span) span.textContent = texto;

    const input = document.getElementById(idCampo);
    if (input) input.classList.add('invalido');
}

// Función auxiliar: limpia todos los errores anteriores
function limpiarErrores() {
    formulario.querySelectorAll('.error-campo').forEach(s => s.textContent = '');
    formulario.querySelectorAll('input.invalido').forEach(i => i.classList.remove('invalido'));
    mensaje.className = 'mensaje-formulario';
    mensaje.innerHTML = '';
}


formulario.addEventListener('submit', function (evento) {

    // Evitamos el envío automático para validar primero
    evento.preventDefault();

    // Limpiamos errores anteriores
    limpiarErrores();

    // Obtenemos los valores actuales
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    const edad = document.getElementById('edad').value;
    const fecha = document.getElementById('fecha').value;
    const mascota = document.querySelector('input[name="mascota"]:checked');
    const caracteristicas = document.querySelectorAll('input[name="caracteristicas"]:checked');
    const aceptaTerminos = document.getElementById('terminos').checked;

    // Variable para saber si hay algún error
    let hayErrores = false;


    // ===== VALIDACIÓN 1: NOMBRE =====
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


    // ===== VALIDACIÓN 2: CORREO =====
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo === '') {
        mostrarError('correo', 'Por favor ingresa tu correo electrónico.');
        hayErrores = true;
    } else if (!formatoCorreo.test(correo)) {
        mostrarError('correo', 'El correo no es válido. Ejemplo: nombre@correo.com');
        hayErrores = true;
    }


    // ===== VALIDACIÓN 3: CONTRASEÑA =====
    if (contrasena === '') {
        mostrarError('contrasena', 'Por favor crea una contraseña.');
        hayErrores = true;
    } else if (contrasena.length < 6) {
        mostrarError('contrasena', 'La contraseña debe tener al menos 6 caracteres.');
        hayErrores = true;
    }


    // ===== VALIDACIÓN 4: EDAD =====
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


    // ===== VALIDACIÓN 5: FECHA =====
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


    // ===== VALIDACIÓN 6: MASCOTA (radio) =====
    if (!mascota) {
        document.getElementById('error-mascota').textContent =
            'Selecciona qué mascota prefieres.';
        hayErrores = true;
    }


    // ===== VALIDACIÓN 7: CARACTERÍSTICAS (checkboxes) =====
    if (caracteristicas.length === 0) {
        document.getElementById('error-caracteristicas').textContent =
            'Marca al menos una característica que te guste.';
        hayErrores = true;
    }


    // ===== VALIDACIÓN 8: TÉRMINOS =====
    if (!aceptaTerminos) {
        document.getElementById('error-terminos').textContent =
            'Debes aceptar el compromiso de adopción responsable.';
        hayErrores = true;
    }


    // ===== MOSTRAR RESULTADO =====

    if (hayErrores) {
        // Hacemos scroll hacia el primer campo con error
        const primerError = formulario.querySelector('.invalido, .error-campo:not(:empty)');
        if (primerError) {
            primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        // Todo correcto: mensaje verde de éxito
        mensaje.className = 'mensaje-formulario exito';
        mensaje.innerHTML = '🐾 ¡Gracias, <strong>' + nombre + '</strong>! ' +
                            'Recibimos tu solicitud y te contactaremos a ' +
                            '<strong>' + correo + '</strong> pronto.';

        mensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Limpiamos el formulario tras 4 segundos
        setTimeout(function () {
            formulario.reset();
            mensaje.className = 'mensaje-formulario';
            mensaje.innerHTML = '';
        }, 4000);
    }
});


// Quitar el error del campo cuando el usuario empieza a corregir
formulario.querySelectorAll('input').forEach(function (input) {

    function limpiarErrorDelCampo() {
        input.classList.remove('invalido');
        const span = document.getElementById('error-' + input.id);
        if (span) span.textContent = '';
    }

    input.addEventListener('input', limpiarErrorDelCampo);
    input.addEventListener('change', limpiarErrorDelCampo);
});

// Para los grupos (radio y checkbox), limpiar al elegir cualquier opción
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


/* ----- 3. ABRIR / CERRAR EL PANEL DEL DESIGN SYSTEM ----- */

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
