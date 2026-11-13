const flowOrder = ['connect', 'screen-camara', 'screen-cta', 'screen-elegir', 'screen-detector', 'screen-game', 'pantalla-score'];
const RESTART_SCREEN = 'screen-cta';
const ESPERA_ENTRE_PANTALLAS = 500;

const PANTALLA_INICIAL = 'connect';

const PAGINAS_LEGEND = {
    'connect':         'Connect',
    'screen-camara':   'Camara',
    'screen-cta':      'CTA',
    'screen-elegir':   'Elegir',
    'screen-detector': 'Detector',
    'screen-game':     'Juego',
    'pantalla-score':  'Score'
};

function paginaActual() {
    const abierta = document.querySelector('.screen.active');
    return abierta ? abierta.id : PANTALLA_INICIAL;
}

function indiceDePantalla(screenId) {
    return flowOrder.indexOf(screenId);
}

function pantallaSiguiente() {
    return flowOrder[indiceDePantalla(paginaActual()) + 1];
}

function reproducirFondoGlobal(play) {
    const v = document.getElementById('fondo-global');
    if (!v) return;
    if (play) v.play().catch(() => {});
    else v.pause();
}

function irA(screenId) {
    const destino = document.getElementById(screenId);
    if (!destino) {
        console.warn('No hay seccion para la pantalla', screenId);
        return;
    }

    const actual = document.querySelector('.screen.active');
    if (actual && actual.id === screenId && screenId !== PANTALLA_INICIAL) return;

    if (typeof pararAudioDeLaPagina === 'function') {
        pararAudioDeLaPagina();
    }

    if (actual) {
        const salir = SALIR_DE_PANTALLA[actual.id];
        if (typeof salir === 'function') salir();
        actual.classList.remove('active');
    }

    document.body.dataset.pantalla = screenId;
    state.pantallaActual = screenId;
    destino.classList.add('active');

    const entrar = ENTRAR_DE_PANTALLA[screenId];
    if (typeof entrar === 'function') entrar();
}

function irAPantalla(screenId, force = false) {
    const ahora = Date.now();
    if (!force && ahora - state.ultimoCambioPantallaTime < ESPERA_ENTRE_PANTALLAS) return;
    state.ultimoCambioPantallaTime = ahora;

    if (indiceDePantalla(screenId) < 0) return;

    guardarSesion();

    irA(screenId);
}
