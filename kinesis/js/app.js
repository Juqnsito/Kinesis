
const ENTRADAS_POR_PANTALLA = {
    "connect": {
        UP: () => irAPantalla('screen-camara')
    },
    "screen-camara": {
        UP: () => irAPantalla('screen-cta')
    },
    "screen-cta": {
        UP: () => arribaSinRepetir(avanzarDesdeCta)
    },
    "screen-elegir": {
        LEFT:  () => entradaElegir('LEFT'),
        RIGHT: () => entradaElegir('RIGHT'),
        UP:    () => arribaSinRepetir(() => entradaElegir('UP'))
    },
    "screen-detector": {
        UP:    () => pulsacionPlaca('UP'),
        DOWN:  () => pulsacionPlaca('DOWN'),
        LEFT:  () => pulsacionPlaca('LEFT'),
        RIGHT: () => pulsacionPlaca('RIGHT')
    },
    "screen-game": {
        UP:    () => recibirDireccion('UP'),
        DOWN:  () => recibirDireccion('DOWN'),
        LEFT:  () => recibirDireccion('LEFT'),
        RIGHT: () => recibirDireccion('RIGHT')
    },
    "pantalla-score": {
        UP: () => arribaSinRepetir(volverAlInicio)
    }
};

function manejadorDeEntrada(dir) {
    const tabla = ENTRADAS_POR_PANTALLA[state.pantallaActual];
    const fn = tabla && tabla[dir];
    if (typeof fn === 'function') fn();
}

function pararPartidaEnMarcha() {
    state.gameStarted = false;
    if (state.audioUnificadoGlobal) {
        state.audioUnificadoGlobal.pause();
    }
    state.notes.forEach(nota => nota.element && nota.element.remove());
    state.notes = [];
    const overlay = document.getElementById('game-sequence-overlay');
    if (overlay) overlay.style.display = 'none';
}

const ENTRAR_DE_PANTALLA = {
    "screen-camara": () => {
        elegirCamara();
    },
    "screen-cta": () => {
        precargarModelo();
        precargarVideos();

        arrancarMensajesInicio();

        sfxDTMF.currentTime = 0;
        sfxDTMF.play().catch(() => {});
    },

    "screen-elegir": () => {
        crearSelectorBaile();
    },

    "screen-detector": () => {
        state.video  = document.getElementById("webcam");
        state.canvas = document.getElementById("output_canvas");
        state.ctx    = state.canvas.getContext("2d");
        state.canvas.width  = 640;
        state.canvas.height = 480;

        const baileDetector = danceOptionsDetector[state.selectedDanceIdx] || {};
        const nivelDetector = baileDetector.niveles && baileDetector.niveles[nivelEnCurso()];
        const demoInicial = ((nivelDetector && nivelDetector.ejemplos)
            || SECUENCIA_POR_DEFECTO)[0];
        if (demoInicial) {
            const videoDemo = document.getElementById("ejercicio-video");
            videoDemo.src = demoInicial;
            videoDemo.play().catch(() => {});
        }

        reiniciarDetector();
        encenderDetector();
    },

    "screen-game": () => {
        state.grid       = document.getElementById("grid");
        state.scoreText  = document.getElementById("score-display");
        state.statusText = document.getElementById("status");
        empezarJuego();
    },

    "pantalla-score": () => {
        aplausos.play().catch(() => {});
        montarBotonVolver();
        pintarTarjetaScore();
    },

    "connect": () => {}
};

const SALIR_DE_PANTALLA = {
    "screen-cta": () => {
        pararMensajesInicio();
    },

    "screen-elegir": () => {
    },

    "screen-detector": () => {
        apagarDetector();
    },

    "screen-game": () => {
        pararPartidaEnMarcha();
        document.body.classList.remove('modo-hard');
    },

    "pantalla-score": () => {
        aplausos.pause();
        window.tecladoOcupadoPorLaPagina = false;
    },

    "connect": () => {}
};

function arrancarApp() {
    cargarSesion();
    conectarTeclado();

    reabrirPlacaSiHay();

    asegurarMuteFondo();
    permitirAutoplay();
    reproducirFondoGlobal(true);
    abrirCerrarPanelSilencioso();
    iniciarPrecarga();

    document.getElementById('connect').addEventListener('click', solicitarArduino);

    state.pantallaActual = PANTALLA_INICIAL;
    document.body.dataset.pantalla = PANTALLA_INICIAL;
    irA(PANTALLA_INICIAL);
}
