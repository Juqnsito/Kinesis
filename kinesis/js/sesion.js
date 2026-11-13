
const CLAVE_SESION = 'kinesis_sesion';

const CAMPOS_SESION = [
    'selectedDanceIdx',
    'dificultad',
    'score',
    'aciertosPerfectos',
    'mejorCombo',
    'yaTerminoElJuego',
    'currentCtaIndex',
    'scoreIniciales',
    'partidaGuardada'
];

function cargarSesion() {
    let datos = {};
    try {
        datos = JSON.parse(sessionStorage.getItem(CLAVE_SESION)) || {};
    } catch (e) {
        datos = {};
    }

    CAMPOS_SESION.forEach(campo => {
        if (datos[campo] !== undefined && datos[campo] !== null) {
            state[campo] = datos[campo];
        }
    });
}

function guardarSesion() {
    const datos = {};
    CAMPOS_SESION.forEach(campo => {
        if (state[campo] !== undefined) datos[campo] = state[campo];
    });
    try {
        sessionStorage.setItem(CLAVE_SESION, JSON.stringify(datos));
    } catch (e) {
    }
}

function borrarSesion() {
    try { sessionStorage.removeItem(CLAVE_SESION); } catch (e) {}
}

window.addEventListener('pagehide', guardarSesion);
window.addEventListener('beforeunload', guardarSesion);