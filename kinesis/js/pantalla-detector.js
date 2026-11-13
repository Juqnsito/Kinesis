const FRAMES_PARA_CALIBRAR = 60;

const listaEjercicios = [
    { nombre: "Pie Izquierdo a la Izquierda", imagen: "../img/dances/deteccion-bailes/Salsa/izquierda.mp4",          repsObjetivo: 3, tipoMovimiento: "pie_izquierdo_izquierda" },
    { nombre: "Pie Derecho a la Derecha",     imagen: "../img/dances/deteccion-bailes/Salsa/derecha.mp4",            repsObjetivo: 3, tipoMovimiento: "pie_derecho_derecha"     },
    { nombre: "Pie Izquierdo Adelante",       imagen: "../img/dances/deteccion-bailes/Salsa/adelante-izquierda.mp4", repsObjetivo: 2, tipoMovimiento: "pie_izquierdo_adelante"  },
    { nombre: "Pie Derecho Adelante",         imagen: "../img/dances/deteccion-bailes/Salsa/adelante-derecha.mp4",   repsObjetivo: 2, tipoMovimiento: "pie_derecho_adelante"    },
    { nombre: "Pie Izquierdo Atras",          imagen: "../img/dances/deteccion-bailes/Salsa/izquierda-atras.mp4",    repsObjetivo: 2, tipoMovimiento: "pie_izquierdo_atras"     },
    { nombre: "Pie Derecho Atras",            imagen: "../img/dances/deteccion-bailes/Salsa/derecha-atras.mp4",      repsObjetivo: 2, tipoMovimiento: "pie_derecho_atras"       }
];

const SECUENCIA_POR_DEFECTO = [
    "../img/dances/deteccion-bailes/Salsa/izquierda.mp4",
    "../img/dances/deteccion-bailes/Salsa/derecha.mp4",
    "../img/dances/deteccion-bailes/Salsa/adelante-izquierda.mp4"
];


const POSE_MANDA = false;
const SOLO_POSE = false;


const PLACA_POR_TIPO = {
    pie_izquierdo_izquierda: 'LEFT',
    pie_derecho_derecha:     'RIGHT',
    pie_izquierdo_adelante:  'UP',
    pie_derecho_adelante:    'UP',
    pie_izquierdo_atras:     'DOWN',
    pie_derecho_atras:       'DOWN'
};


const GLIFO_PLACA = { UP: '↑', DOWN: '↓', LEFT: '←', RIGHT: '→' };
const SVG_PLACA = {
    UP: '../img/arrow-up.svg',
    DOWN: '../img/arrow-down.svg',
    LEFT: '../img/arrow-left.svg',
    RIGHT: '../img/arrow-right.svg'
};


function paso(carpeta, nivel, archivo, nombre, reps, tipo) {
    return {
        nombre,
        repsObjetivo: reps,
        tipoMovimiento: tipo,
        imagen: `../img/dances/deteccion-bailes/${carpeta}/${nivel}/${archivo}`
    };
}

function demo(carpeta, nivel, archivos) {
    return archivos.map(a => `../img/dances/deteccion-bailes/${carpeta}/${nivel}/${a}`);
}

const danceOptionsDetector = [
    { name: "Salsa", niveles: {
        hard: {
            ejemplos:   demo("Salsa", "hard", ["izquierda.mp4", "derecha.mp4", "adelante-izquierda.mp4", "adelante-derecha.mp4"]),
            ejercicios: [
                paso("Salsa", "hard", "izquierda.mp4",           "Pie Izquierdo a la Izquierda", 4, "pie_izquierdo_izquierda"),
                paso("Salsa", "hard", "derecha.mp4",             "Pie Derecho a la Derecha",     4, "pie_derecho_derecha"),
                paso("Salsa", "hard", "adelante-izquierda.mp4",  "Pie Izquierdo Adelante",       3, "pie_izquierdo_adelante"),
                paso("Salsa", "hard", "adelante-derecha.mp4",    "Pie Derecho Adelante",         3, "pie_derecho_adelante"),
                paso("Salsa", "hard", "izquierda-atras.mp4",     "Pie Izquierdo Atras",          3, "pie_izquierdo_atras"),
                paso("Salsa", "hard", "derecha-atras.mp4",       "Pie Derecho Atras",            3, "pie_derecho_atras")
            ]
        }
    }},
    { name: "Merengue",
      secuenciaVuelta: ['UP', 'UP', 'LEFT', 'LEFT', 'DOWN', 'DOWN', 'RIGHT', 'RIGHT'],
      niveles: {
        hard: {
            ejemplos:   demo("Merengue", "hard", ["derecha.mp4", "adelante.mp4", "adelante-atras.mp4", "vuelta.mp4"]),
            ejercicios: [
                paso("Merengue", "hard", "derecha.mp4",        "Paso a la Derecha",     3, "pie_derecho_derecha"),
                paso("Merengue", "hard", "adelante.mp4",       "Adelante",              4, "pie_izquierdo_adelante"),
                paso("Merengue", "hard", "adelante-atras.mp4", "Adelante y Atras",      3, "pie_derecho_atras"),
                paso("Merengue", "hard", "vuelta.mp4",         "La Vuelta",             2, "vuelta")
            ]
        }
      }},
    { name: "Samba", niveles: {
        hard: {
            ejemplos:   demo("Samba", "hard", ["pasitos-derecha.mp4", "adelante-atras.mp4", "atras-rapido.mp4"]),
            ejercicios: [
                paso("Samba", "hard", "pasitos-derecha.mp4", "Pasitos a la Derecha",          3, "pie_derecho_derecha"),
                paso("Samba", "hard", "adelante-atras.mp4",  "Adelante y Atras (Secuencia)",  3, "adelante_atras_samba"),
                paso("Samba", "hard", "atras-rapido.mp4",    "Atras Modo Samba (Brinco)",     3, "atras_samba")
            ]
        }
    }},
    { name: "Flamenco", oculto: true, niveles: {
        hard: {
            ejemplos:   demo("Flamenco", "hard", ["izquierda-alante.webm", "derecha-alante.webm", "izquierda.webm", "derecha.webm"]),
            ejercicios: [
                paso("Flamenco", "hard", "izquierda-alante.webm", "Pie Izquierdo Alante",         3, "pie_izquierdo_adelante"),
                paso("Flamenco", "hard", "derecha-alante.webm",   "Pie Derecho Alante",           3, "pie_derecho_adelante"),
                paso("Flamenco", "hard", "izquierda.webm",        "Pie Izquierdo a la Izquierda", 3, "pie_izquierdo_izquierda"),
                paso("Flamenco", "hard", "derecha.webm",          "Pie Derecho a la Derecha",     3, "pie_derecho_derecha")
            ]
        }
    }},
    { name: "El Areíto",
      secuenciaVuelta: ['UP', 'LEFT', 'DOWN', 'RIGHT', 'UP'],
      niveles: {
        hard: {
            ejemplos:   demo("areito", "hard", ["adelante.mp4", "derecha.mp4", "izquierda.mp4"]),
            ejercicios: [
                paso("areito", "hard", "doble-adelante.mp4", "Doble Adelante", 3, "pie_derecho_adelante"),
                paso("areito", "hard", "adelante.mp4",       "Adelante",       3, "pie_izquierdo_adelante"),
                paso("areito", "hard", "derecha.mp4",        "Lado Derecho",   3, "pie_derecho_derecha"),
                paso("areito", "hard", "izquierda.mp4",      "Lado Izquierdo", 3, "pie_izquierdo_izquierda"),
                paso("areito", "hard", "vuelta.mp4",         "La Vuelta",      2, "vuelta")
            ]
        }
      }}
];

function nivelEnCurso() {
    return 'hard';
}

function listaEjerciciosEnCurso() {
    const baile = danceOptionsDetector[state.selectedDanceIdx];
    if (!baile) return listaEjercicios;
    const nivel = baile.niveles && baile.niveles[nivelEnCurso()];
    return (nivel && nivel.ejercicios) || listaEjercicios;
}

function ejercicioActual() {
    return listaEjerciciosEnCurso()[state.ejercicioActualIdx];
}

function placaDelEjercicio(ejercicio) {
    return ejercicio && PLACA_POR_TIPO[ejercicio.tipoMovimiento];
}

const SCORE_MINIMO = 0.4;

const UMBRAL_ACIERTO = 0.8;
const RESET_MOVIMIENTO = 0.4;
const RESET_MOVIMIENTO_AF = 0.52;
const MS_SOSTENIDO = 1300;
const SCORE_MINIMO_BASE = 0.25;

let PROFUNDIDAD_OBJETIVO = 0.2;

let PROFUNDIDAD_OBJETIVO_ATRAS = 0.12;

window.profundidadObjetivo = (adelante, atras) => {
    if (adelante != null) PROFUNDIDAD_OBJETIVO = adelante;
    if (atras != null) PROFUNDIDAD_OBJETIVO_ATRAS = atras;
    return { adelante: PROFUNDIDAD_OBJETIVO, atras: PROFUNDIDAD_OBJETIVO_ATRAS };
};



function precargarVideos() {
    const todos = new Set();
    listaEjercicios.forEach(ejercicio => todos.add(ejercicio.imagen));
    SECUENCIA_POR_DEFECTO.forEach(v => todos.add(v));
    danceOptionsDetector.forEach(b => {
        if (!b.niveles) return;
        Object.values(b.niveles).forEach(nivel => {
            (nivel.ejemplos || []).forEach(v => todos.add(v));
            (nivel.ejercicios || []).forEach(ejercicio => ejercicio.imagen && todos.add(ejercicio.imagen));
        });
    });

    todos.forEach(src => {
        const v = document.createElement('video');
        v.src = src;
        v.preload = 'auto';
    });
}

function precargarModelo() {
    if (!state.detectorPromise) state.detectorPromise = crearDetector();
}

async function crearDetector() {
    if (typeof Pose === 'undefined') {
        throw new Error('MediaPipe Pose no se cargo (falta ../mediapipe_pose/pose.js)');
    }
    const pose = new Pose({
        locateFile: (file) => `../mediapipe_pose/${file}`
    });
    pose.setOptions({
        modelComplexity: 2,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    pose.onResults(resultadosMediaPipe);
    await pose.initialize();
    return pose;
}

let resolverLandmarks = null;

function resultadosMediaPipe(results) {
    if (resolverLandmarks) {
        const r = resolverLandmarks;
        resolverLandmarks = null;
        r(results);
    }
}

async function estimarLandmarks(video) {
    const promesa = new Promise((resolve) => { resolverLandmarks = resolve; });
    await state.detector.send({ image: video });
    return await promesa;
}

const INDICE_MEDIAPIPE = {
    left_shoulder:  11, right_shoulder: 12,
    left_hip:       23, right_hip:      24,
    left_knee:      25, right_knee:     26,
    left_ankle:     27, right_ankle:    28
};

function traducirLandmarks(results) {
    const lm = results && results.poseLandmarks;
    if (!lm || !lm.length) return null;
    const out = [];
    for (const nombre in INDICE_MEDIAPIPE) {
        const p = lm[INDICE_MEDIAPIPE[nombre]];
        if (!p) continue;
        out.push({
            name: nombre,
            x: p.x * state.canvas.width,
            y: p.y * state.canvas.height,
            z: p.z,
            score: (p.visibility != null) ? p.visibility : 1
        });
    }
    return out;
}

async function pedirCamara() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Este navegador no permite usar la cámara');
    }
    const guardada = state.camaraId || camaraRecordada();
    const base = { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' };
    if (!guardada) {
        return await navigator.mediaDevices.getUserMedia({ video: base, audio: false });
    }
    try {
        return await navigator.mediaDevices.getUserMedia({
            video: { ...base, deviceId: { exact: guardada } },
            audio: false
        });
    } catch (err) {
        return await navigator.mediaDevices.getUserMedia({ video: base, audio: false });
    }
}

async function encenderDetector() {
    if (state.detectionEngineReady) return;

    const panel = document.getElementById("exercise-instruction-panel");

    try {

        if (!state.detectorPromise) precargarModelo();




        panel.innerText = "Pidiendo cámara...";
        if (!state.cameraStream) state.cameraStream = await pedirCamara();

        panel.innerText = "Cargando modelo...";
        state.detector = await state.detectorPromise;

        state.canvas.width = 640;
        state.canvas.height = 480;
        state.video.srcObject = state.cameraStream;


        await esperarPrimerFotograma();

        state.detectionEngineReady = true;
        panel.innerText = " Calibrando...";
        renderPoses();
    } catch (e) {
        console.error("No se pudo iniciar la detección:", e);
        state.detectionEngineReady = false;
        state.placaSolo = true;
        cargarEjercicio();
        anunciar(e && e.name === 'NotAllowedError'
            ? "Sin cámara (permiso denegado) · confirma pisando la placa"
            : "Sin cámara · confirma cada paso pisando la placa", 3200);
    }
}

function esperarPrimerFotograma() {
    return new Promise((resolve, reject) => {
        if (state.video.readyState >= 2 && state.video.videoWidth > 0) {
            return resolve();
        }
        const t = setTimeout(() => reject(new Error('La cámara no entregó imagen')), 12000);
        state.video.addEventListener('loadeddata', () => {
            clearTimeout(t);
            resolve();
        }, { once: true });
    });
}

function apagarDetector() {
    state.detectionEngineReady = false;

    state.pausaEntrePasos = false;
    const parada = document.getElementById('parada-paso');
    if (parada) parada.classList.remove('visible');

    if (state.cameraStream) {
        state.cameraStream.getTracks().forEach(t => t.stop());
        state.cameraStream = null;
    }
    if (state.video && state.video.srcObject) {
        state.video.srcObject.getTracks().forEach(t => t.stop());
        state.video.srcObject = null;
    }
    state.bucleOcupado = false;
}

window.addEventListener('pagehide', apagarDetector);

function reiniciarDetector() {
    state.ejercicioActualIdx = 0;
    state.repeticionesRealizadas = 0;
    state.framesCalibrados = 0;
    state.baseKeypoints = null;
    state.baseScale = null;
    state.baseDzPie = { left: null, right: null };
    state.baseZTobillo = { left: null, right: null };
    state.positionHeld = false;
    state.enCooldown = false;
    state.vueltaPaso = 0;
    state.vueltaInicio = 0;
    state.secuenciaPaso = 0;
    state.placaSolo = false;
}

async function renderPoses() {
    if (!state.detectionEngineReady) return;

    if (state.bucleOcupado) return;
    state.bucleOcupado = true;

    try {
        await dibujarFrame();
    } finally {
        state.bucleOcupado = false;
    }

    if (state.detectionEngineReady) requestAnimationFrame(renderPoses);
}

async function dibujarFrame() {

    const landmarks = await estimarLandmarks(state.video);

    state.ctx.save();
    state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
    state.ctx.drawImage(state.video, 0, 0, state.canvas.width, state.canvas.height);

    const keypoints = traducirLandmarks(landmarks);

    if (keypoints) {
        const piernas = quedarseConPiernas(keypoints);
        dibujarPiernas(piernas);

        if (state.framesCalibrados < FRAMES_PARA_CALIBRAR) {
            calibrar(piernas);
        } else if (state.pausaEntrePasos) {
        } else {
            medirAvance(piernas);
        }
    }

    state.ctx.restore();
}

function quedarseConPiernas(kp) {
    const deBase = ['left_shoulder', 'right_shoulder', 'left_hip', 'right_hip'];
    const dePiernas = ['left_knee', 'right_knee', 'left_ankle', 'right_ankle'];
    const out = {};
    for (const nombre of deBase) {
        const p = kp.find(k => k.name === nombre);
        if (p && p.score >= SCORE_MINIMO_BASE) out[nombre] = p;
    }
    for (const nombre of dePiernas) {
        const p = kp.find(k => k.name === nombre);
        if (p && p.score >= SCORE_MINIMO) out[nombre] = p;
    }
    return out;
}

function medirAnchoCadera(piernas) {
    const { left_hip: ci, right_hip: cd } = piernas;
    if (!ci || !cd) return null;
    return Math.hypot(ci.x - cd.x, ci.y - cd.y);
}

function medirEscalaCuerpo(piernas) {
    const { left_hip: ci, left_ankle: ai, right_hip: cd, right_ankle: ad } = piernas;

    const largos = [];
    if (ci && ai) largos.push(Math.hypot(ci.x - ai.x, ci.y - ai.y));
    if (cd && ad) largos.push(Math.hypot(cd.x - ad.x, cd.y - ad.y));
    if (largos.length) return largos.reduce((a, b) => a + b, 0) / largos.length;

    if (ci && cd) return medirAnchoCadera(piernas) * 3;

    return null;
}

function calibrar(piernas) {
    const panel = document.getElementById("exercise-instruction-panel");
    panel.innerText = " Calibrando postura...";
    pintarBarra(state.framesCalibrados / FRAMES_PARA_CALIBRAR * 100);


    if (state.framesCalibrados === FRAMES_PARA_CALIBRAR - 1) {
        const escala = medirEscalaCuerpo(piernas);


        if (escala) {
            state.baseKeypoints = mapear(piernas);
            state.baseScale = escala;
            state.baseDzPie = { left: null, right: null };
            for (const lado of ['left', 'right']) {
                const tob = piernas[`${lado}_ankle`];
                const cad = piernas[`${lado}_hip`];
                if (tob && cad && tob.z != null && cad.z != null) {
                    state.baseDzPie[lado] = tob.z - cad.z;
                }
            }
            const dzOtro = state.baseDzPie.left != null ? state.baseDzPie.left : state.baseDzPie.right;
            if (state.baseDzPie.left == null) state.baseDzPie.left = dzOtro;
            if (state.baseDzPie.right == null) state.baseDzPie.right = dzOtro;
            state.baseZTobillo = { left: null, right: null };
            for (const lado of ['left', 'right']) {
                const tob = piernas[`${lado}_ankle`];
                if (tob && tob.z != null) state.baseZTobillo[lado] = tob.z;
            }
            const zOtro = state.baseZTobillo.left != null ? state.baseZTobillo.left : state.baseZTobillo.right;
            if (state.baseZTobillo.left == null) state.baseZTobillo.left = zOtro;
            if (state.baseZTobillo.right == null) state.baseZTobillo.right = zOtro;
        } else {
            state.framesCalibrados = 0;
            panel.innerText = " No te veo entero, aléjate un poco";
            return;
        }
    }
    state.framesCalibrados++;

    if (state.framesCalibrados === FRAMES_PARA_CALIBRAR) cargarEjercicio();
}

function mapear(piernas) {
    const out = {};
    for (const k in piernas) out[k] = { ...piernas[k] };
    return out;
}

function scorePasoPose(piernas, lado, adelanta) {
    const tobillo = piernas[`${lado}_ankle`];
    const cadera = piernas[`${lado}_hip`];
    if (!tobillo || tobillo.z == null || !cadera || cadera.z == null) return 0;

    const dzBase = state.baseDzPie[lado] != null
        ? state.baseDzPie[lado]
        : state.baseDzPie[lado === 'left' ? 'right' : 'left'];
    if (dzBase == null) return 0;

    let senal = adelanta
        ? dzBase - (tobillo.z - cadera.z)
        : (tobillo.z - cadera.z) - dzBase;

    const zTobBase = state.baseZTobillo[lado];
    if (zTobBase != null) {
        const deltaAbs = adelanta
            ? (zTobBase - tobillo.z)
            : (tobillo.z - zTobBase);
        senal = Math.max(senal, deltaAbs);
    }

    const objetivo = adelanta ? PROFUNDIDAD_OBJETIVO : PROFUNDIDAD_OBJETIVO_ATRAS;
    return Math.max(0, Math.min(100, (senal / objetivo) * 100));
}

function medirAvance(piernas) {
    const ejercicio = ejercicioActual();
    const base = state.baseKeypoints;
    if (!ejercicio || !base || !state.baseScale) return;

    if (ejercicio.tipoMovimiento === 'vuelta') {
        medirVuelta();
        return;
    }

    if (esEjercicioSecuencia(ejercicio.tipoMovimiento)) {
        medirSecuenciaPose(piernas);
        return;
    }


    const escala = state.baseScale;
    let score = 0;

    const esAdelanteAtras = ejercicio.tipoMovimiento.includes('adelante')
                         || ejercicio.tipoMovimiento.includes('atras');

    const Necesarios = {
        pie_izquierdo_izquierda: ['left_ankle'],
        pie_derecho_derecha: ['right_ankle'],
        pie_izquierdo_adelante: ['left_ankle', 'right_ankle'],
        pie_derecho_adelante:   ['left_ankle', 'right_ankle'],
        pie_izquierdo_atras:    ['left_ankle', 'right_ankle'],
        pie_derecho_atras:      ['left_ankle', 'right_ankle']
    }[ejercicio.tipoMovimiento] || [];

    const listo = esAdelanteAtras
        ? Necesarios.some(n => piernas[n] && base[n])
        : Necesarios.every(n => piernas[n] && base[n]);
    if (!listo) return;

    switch (ejercicio.tipoMovimiento) {
        case "pie_izquierdo_izquierda":
        case "pie_derecho_derecha": {
            const lado = ejercicio.tipoMovimiento.includes('izquierda') ? 'left' : 'right';
            const dx = piernas[`${lado}_ankle`].x - base[`${lado}_ankle`].x;
            const delta = ejercicio.tipoMovimiento.includes('derecha') ? -dx : dx;
            score = Math.max(0, Math.min(100, (delta / (escala * 0.12)) * 100));
            break;
        }

        case "pie_izquierdo_adelante":
        case "pie_derecho_adelante": {
            score = Math.max(
                scorePasoPose(piernas, 'left', true),
                scorePasoPose(piernas, 'right', true));
            break;
        }

        case "pie_izquierdo_atras":
        case "pie_derecho_atras": {
            score = Math.max(
                scorePasoPose(piernas, 'left', false),
                scorePasoPose(piernas, 'right', false));
            break;
        }
    }

    if (state.enCooldown) {
        pintarBarra(100);
        return;
    }

    if (SOLO_POSE) {
        if (score >= 100) {
            destelloBarra('paso-listo');
            tocarEfecto('acertar.mp3', 0.5);
            pintarBarra(100);
            confirmarRepeticion();
        } else {
            pintarBarra(score);
        }
        return;
    }

    const umbralArmar = UMBRAL_ACIERTO * 100;
    if (score >= umbralArmar && !state.positionHeld) {
        state.positionHeld = true;
        const placa = placaDelEjercicio(ejercicio);
        anunciar(`¡Paso listo! Pisa la placa ${GLIFO_PLACA[placa]}`);
        pintarHintPlaca([placa], true);
        pintarBarra(100);
    } else if (!state.positionHeld) {
        pintarBarra(score);
    }


    const reset = esAdelanteAtras ? RESET_MOVIMIENTO_AF : RESET_MOVIMIENTO;

    if (score < 100 * reset && state.positionHeld) {
        if (state.repeticionesRealizadas < ejercicio.repsObjetivo) {
            state.positionHeld = false;
            anunciar(`¡${ejercicio.nombre}!`);
            pintarHintPlaca([placaDelEjercicio(ejercicio)]);
        }
    }
}

function pulsacionPlaca(dir) {
    if (state.pausaEntrePasos) {
        if (dir === 'UP') avanzarParadaPaso();
        return;
    }


    if (!state.placaSolo && !state.detectionEngineReady) return;

    const ejercicio = ejercicioActual();
    if (!ejercicio) return;

    if (ejercicio.tipoMovimiento === 'vuelta') {
        procesarPulsacionVuelta(dir);
        return;
    }

    if (esEjercicioSecuencia(ejercicio.tipoMovimiento)) {
        procesarPulsacionSecuencia(dir);
        return;
    }

    if (SOLO_POSE && !state.placaSolo) {
        destelloBarra('paso-fallo');
        tocarEfecto('fallar.mp3', 0.25);
        anunciar("Placa apagada · la rep cuenta con la pose al 100%", 1500);
        return;
    }

    const esperada = placaDelEjercicio(ejercicio);

    if (dir !== esperada) {
        destelloBarra('paso-fallo');
        tocarEfecto('fallar.mp3', 0.25);
        anunciar(`Esa no es la placa · pisa ${GLIFO_PLACA[esperada]}`, 1200);
        return;
    }

    if (state.enCooldown) return;

    if (POSE_MANDA && !state.placaSolo && !state.positionHeld) {
        destelloBarra('paso-fallo');
        tocarEfecto('fallar.mp3', 0.25);
        anunciar(`Primero el paso · la placa ${GLIFO_PLACA[esperada]} cuenta cuando la pose este lista`, 1600);
        return;
    }

    destelloBarra('paso-listo');
    tocarEfecto('acertar.mp3', 0.5);
    confirmarRepeticion();
}

function confirmarRepeticion(avisoPropio) {
    state.positionHeld = false;
    registrarRepeticionValida();

    if (!avisoPropio) {
        const ejercicio = ejercicioActual();
        const reps = state.repeticionesRealizadas;
        const total = ejercicio ? ejercicio.repsObjetivo : 0;
        if (total && reps >= total) anunciar("¡Bien hecho! Ejercicio listo");
        else anunciar(`¡Bien hecho! Rep ${reps} de ${total}`, 1200);
    }

    state.enCooldown = true;
    (async () => {
        await esperar(MS_SOSTENIDO);
        state.enCooldown = false;
        state.positionHeld = false;
    })();
}

const SECUENCIA_VUELTA = ['RIGHT', 'DOWN', 'LEFT'];

const NOMBRE_PLACA = { UP: 'arriba', DOWN: 'abajo', LEFT: 'izquierda', RIGHT: 'derecha' };

function secuenciaVueltaActual() {
    const baile = danceOptionsDetector[state.selectedDanceIdx];
    return (baile && baile.secuenciaVuelta) || SECUENCIA_VUELTA;
}

function barraPorPisoVuelta() {
    return 100 / secuenciaVueltaActual().length;
}

function glifosVuelta() {
    return secuenciaVueltaActual().map(d => GLIFO_PLACA[d]).join(' ');
}

function procesarPulsacionVuelta(dir) {
    if (state.enCooldown) return;

    const sec = secuenciaVueltaActual();
    const glifos = glifosVuelta();
    const ahora = Date.now();

    const esperada = sec[state.vueltaPaso];

    if (dir === esperada) {
        if (!state.vueltaInicio) state.vueltaInicio = ahora;
        state.vueltaPaso += 1;

        if (state.vueltaPaso >= sec.length) {
            destelloBarra('paso-listo');
            tocarEfecto('acertar.mp3', 0.5);
            anunciar("¡Vuelta lista!", 1000);
            state.vueltaPaso = 0;
            state.vueltaInicio = 0;
            pintarHintVuelta(sec.length);
            pintarBarra(100);
            confirmarRepeticion(true);
            return;
        }

        const viene = sec[state.vueltaPaso];
        anunciar(`¡Bien! Ahora ${NOMBRE_PLACA[viene]} ${GLIFO_PLACA[viene]}`, 1200);
        pintarBarra(state.vueltaPaso * barraPorPisoVuelta());
        pintarHintVuelta(state.vueltaPaso);
        return;
    }

    const recien = state.vueltaPaso > 0 ? sec[state.vueltaPaso - 1] : null;
    if (recien && dir === recien) return;
    state.vueltaPaso = 0;
    state.vueltaInicio = 0;
    destelloBarra('paso-fallo');
    tocarEfecto('fallar.mp3', 0.25);
    anunciar(`Esa no · la vuelta va ${glifos}`, 1200);
    if (dir === sec[0]) {
        state.vueltaPaso = 1;
        state.vueltaInicio = ahora;
        pintarBarra(barraPorPisoVuelta());
        pintarHintVuelta(1);
        return;
    }
    pintarHintVuelta(0);
}

function medirVuelta() {
    if (state.enCooldown) {
        pintarBarra(100);
        return;
    }
    pintarBarra(state.vueltaPaso * barraPorPisoVuelta());
}

const EJERCICIOS_SECUENCIA = {
    atras_samba: {
        nombre: "brinco",
        pose: [
            { lado: 'left',  adelanta: false },
            { lado: 'right', adelanta: false }
        ],
        placas: ['DOWN', 'DOWN'],
        avisoSegunda: "¡Bien! Ahora atrás con el derecho ↓",
        avisoCompleto: "¡Brinco listo!"
    },
    adelante_atras_samba: {
        nombre: "adelante y atras",
        pose: [
            { lado: 'left', adelanta: true  },
            { lado: 'left', adelanta: false }
        ],
        placas: ['UP', 'DOWN'],
        avisoSegunda: "¡Bien! Ahora atrás con el izquierdo ↓",
        avisoCompleto: "¡Adelante y atrás listos!"
    }
};

const esEjercicioSecuencia = tipo => !!EJERCICIOS_SECUENCIA[tipo];

function pintarHintSecuencia(pasosDados) {
    const hint = document.getElementById('placa-hint');
    if (!hint) return;

    const ejercicio = ejercicioActual();
    const cfg = ejercicio && EJERCICIOS_SECUENCIA[ejercicio.tipoMovimiento];
    if (!cfg) return;

    hint.replaceChildren();
    hint.classList.remove('apretada');
    cfg.placas.forEach((dir, i) => {
        const img = document.createElement('img');
        img.src = SVG_PLACA[dir];
        img.alt = `Toque ${i + 1} de la ${cfg.nombre}: placa ${dir}`;
        if (i < pasosDados) img.className = 'hecha';
        else if (i === pasosDados) img.className = 'sigue';
        hint.appendChild(img);
    });
    hint.classList.add('visible');
}

function desarmarSecuenciaPose(motivo) {
    state.secuenciaPaso = 0;
    destelloBarra('paso-fallo');
    tocarEfecto('fallar.mp3', 0.25);
    anunciar(motivo, 1400);
    pintarHintSecuencia(0);
}

function completarSecuenciaPose() {
    const ejercicio = ejercicioActual();
    const cfg = ejercicio && EJERCICIOS_SECUENCIA[ejercicio.tipoMovimiento];
    destelloBarra('paso-listo');
    tocarEfecto('acertar.mp3', 0.5);
    anunciar(cfg ? cfg.avisoCompleto : "¡Lista!", 1000);
    state.secuenciaPaso = 0;
    pintarHintSecuencia(999);
    pintarBarra(100);
    confirmarRepeticion(true);
}

function medirSecuenciaPose(piernas) {
    const ejercicio = ejercicioActual();
    const cfg = ejercicio && EJERCICIOS_SECUENCIA[ejercicio.tipoMovimiento];
    if (!cfg) return;

    if (state.enCooldown) {
        pintarBarra(100);
        return;
    }

    const pasos = cfg.pose;
    const piso = 100 / pasos.length;
    const paso = state.secuenciaPaso;
    const actual = pasos[Math.min(paso, pasos.length - 1)];

    const score = scorePasoPose(piernas, actual.lado, actual.adelanta);

    if (score >= 100) {
        state.secuenciaPaso += 1;

        if (state.secuenciaPaso >= pasos.length) {
            completarSecuenciaPose();
            return;
        }

        anunciar(cfg.avisoSegunda, 1200);
        pintarHintSecuencia(state.secuenciaPaso);
        pintarBarra(state.secuenciaPaso * piso);
        return;
    }

    pintarBarra(paso * piso + (score * piso / 100));
}

function procesarPulsacionSecuencia(dir) {
    if (state.enCooldown) return;

    const ejercicio = ejercicioActual();
    const cfg = ejercicio && EJERCICIOS_SECUENCIA[ejercicio.tipoMovimiento];
    if (!cfg) return;

    if (dir !== cfg.placas[state.secuenciaPaso]) {
        desarmarSecuenciaPose(`Esa no · la ${cfg.nombre} va ${cfg.placas.map(d => GLIFO_PLACA[d]).join(' ')}`);
        return;
    }

    state.secuenciaPaso += 1;

    if (state.secuenciaPaso >= cfg.placas.length) {
        completarSecuenciaPose();
        return;
    }

    anunciar(cfg.avisoSegunda, 1200);
    pintarBarra(state.secuenciaPaso * (100 / cfg.placas.length));
    pintarHintSecuencia(state.secuenciaPaso);
}

function textoCanonico() {
    if (state.pausaEntrePasos) {
        return "Presione adelante (↑) para continuar";
    }
    const ejercicio = ejercicioActual();
    if (!ejercicio) return "";

    if (state.enCooldown) return "¡Bien! Repite el paso otra vez";
    if (ejercicio.tipoMovimiento === 'vuelta') {
        if (state.vueltaPaso > 0) {
            const prox = secuenciaVueltaActual()[state.vueltaPaso];
            return prox ? `¡Bien! Ahora ${NOMBRE_PLACA[prox]} ${GLIFO_PLACA[prox]}` : "¡Bien!";
        }
        return `¡${ejercicio.nombre}!`;
    }
    if (esEjercicioSecuencia(ejercicio.tipoMovimiento)) {
        if (state.secuenciaPaso > 0) {
            return EJERCICIOS_SECUENCIA[ejercicio.tipoMovimiento].avisoSegunda;
        }
        return `¡${ejercicio.nombre}!`;
    }
    if (state.positionHeld) {
        const placa = placaDelEjercicio(ejercicio);
        return `¡Paso listo! Pisa la placa ${GLIFO_PLACA[placa]}`;
    }
    return `¡${ejercicio.nombre}!`;
}

let anuncioPendiente = null;

function anunciar(texto, volverMs) {
    const panel = document.getElementById("exercise-instruction-panel");
    if (!panel) return;

    if (anuncioPendiente) { clearTimeout(anuncioPendiente); anuncioPendiente = null; }
    panel.innerText = texto;

    if (volverMs) {
        anuncioPendiente = setTimeout(() => {
            anuncioPendiente = null;
            panel.innerText = textoCanonico();
        }, volverMs);
    }
}

function destelloBarra(clase) {
    const cont = document.querySelector('.progress-container');
    if (!cont) return;
    cont.classList.remove('paso-listo', 'paso-fallo');
    void cont.offsetWidth;
    cont.classList.add(clase);
    setTimeout(() => cont.classList.remove(clase), 700);
}

function pintarHintPlaca(direcciones, apretada) {
    const hint = document.getElementById('placa-hint');
    if (!hint) return;

    hint.replaceChildren();
    (direcciones || []).forEach(dir => {
        const img = document.createElement('img');
        img.src = SVG_PLACA[dir];
        img.alt = `Placa ${dir}`;
        hint.appendChild(img);
    });
    hint.classList.toggle('apretada', !!apretada);
    hint.classList.toggle('visible', !!(direcciones && direcciones.length));
}

function pintarHintVuelta(pasosDados) {
    const hint = document.getElementById('placa-hint');
    if (!hint) return;

    hint.replaceChildren();
    hint.classList.remove('apretada');
    secuenciaVueltaActual().forEach((dir, i) => {
        const img = document.createElement('img');
        img.src = SVG_PLACA[dir];
        img.alt = `Toque ${i + 1} de la vuelta: placa ${dir}`;
        if (i < pasosDados) img.className = 'hecha';
        else if (i === pasosDados) img.className = 'sigue';
        hint.appendChild(img);
    });
    hint.classList.add('visible');
}

function dibujarPiernas(piernas) {
    const puntos = ['left_hip', 'right_hip', 'left_knee', 'right_knee', 'left_ankle', 'right_ankle'];
    const conexiones = [
        ['left_hip', 'right_hip'],
        ['left_hip', 'left_knee'], ['left_knee', 'left_ankle'],
        ['right_hip', 'right_knee'], ['right_knee', 'right_ankle']
    ];

    state.ctx.strokeStyle = '#00FF7F';
    state.ctx.lineWidth = 3;
    for (const [a, b] of conexiones) {
        const p1 = piernas[a], p2 = piernas[b];
        if (!p1 || !p2) continue;
        state.ctx.beginPath();
        state.ctx.moveTo(p1.x, p1.y);
        state.ctx.lineTo(p2.x, p2.y);
        state.ctx.stroke();
    }


    state.ctx.fillStyle = '#FF3B30';
    for (const nombre of puntos) {
        const p = piernas[nombre];
        if (!p) continue;
        state.ctx.beginPath();
        state.ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        state.ctx.fill();
    }
}

window.debugDetector = () => ({
    motorListo: state.detectionEngineReady,
    framesCalibrados: `${state.framesCalibrados}/${FRAMES_PARA_CALIBRAR}`,
    baseGuardada: !!state.baseKeypoints,
    baseScale: state.baseScale,
    baseDzPie: state.baseDzPie,
    baseZTobillo: state.baseZTobillo,
    profundidadObjetivo: PROFUNDIDAD_OBJETIVO,
    profundidadObjetivoAtras: PROFUNDIDAD_OBJETIVO_ATRAS,
    baile: danceOptionsDetector[state.selectedDanceIdx]?.name,
    ejercicio: ejercicioActual()?.nombre,
    modoPlaca: state.placaSolo,
    poseArmada: state.positionHeld,
    vueltaPaso: state.vueltaPaso,
    secuenciaPaso: state.secuenciaPaso,
    enCooldown: state.enCooldown,
    barra: document.getElementById('progress-bar').style.width,
    porcentaje: document.getElementById('perc-text').textContent
});

function cargarEjercicio() {
    if (!state.placaSolo && state.framesCalibrados < FRAMES_PARA_CALIBRAR) return;

    const videoEl = document.getElementById("ejercicio-video");
    videoEl.src = "";
    if (anuncioPendiente) { clearTimeout(anuncioPendiente); anuncioPendiente = null; }

    const lista = listaEjerciciosEnCurso();
    if (state.ejercicioActualIdx >= lista.length) {
        if (state.audioUnificadoGlobal) state.audioUnificadoGlobal.pause();
        apagarDetector();
        irAPantalla('screen-game');
        return;
    }

    const ejercicio = lista[state.ejercicioActualIdx];

    const baile = danceOptionsDetector[state.selectedDanceIdx];
    const nivel = baile && baile.niveles && baile.niveles[nivelEnCurso()];
    const ejemplos = (nivel && nivel.ejemplos) || SECUENCIA_POR_DEFECTO;
    const demo = ejercicio.imagen || ejemplos[state.ejercicioActualIdx % ejemplos.length];

    document.getElementById("exercise-instruction-panel").innerText = `¡${ejercicio.nombre}!`;

    const esSecuencia = ejercicio.tipoMovimiento === 'vuelta'
                     || esEjercicioSecuencia(ejercicio.tipoMovimiento);
    if (SOLO_POSE && !state.placaSolo && !esSecuencia) {
        const hint = document.getElementById('placa-hint');
        if (hint) hint.classList.remove('visible');
    } else if (ejercicio.tipoMovimiento === 'vuelta') pintarHintVuelta(0);
    else if (esEjercicioSecuencia(ejercicio.tipoMovimiento)) pintarHintSecuencia(0);
    else pintarHintPlaca([placaDelEjercicio(ejercicio)]);

    videoEl.onloadedmetadata = () => {
        if (videoEl.videoWidth && videoEl.videoHeight) {
            videoEl.style.aspectRatio = `${videoEl.videoWidth} / ${videoEl.videoHeight}`;
        }
    };
    videoEl.src = demo;
    videoEl.play();
    pintarContadorReps();
    pintarBarra(0);
    state.positionHeld = false;
}

async function registrarRepeticionValida() {
    state.repeticionesRealizadas++;
    pintarContadorReps();
    pintarBarra(0);

    const ejercicio = ejercicioActual();
    if (state.repeticionesRealizadas >= ejercicio.repsObjetivo) {
        setTimeout(mostrarParadaPaso, 1200);
    } else {
        setTimeout(() => { state.positionHeld = false; }, 500);
    }
}

function mostrarParadaPaso() {
    if (state.pausaEntrePasos) return;
    state.pausaEntrePasos = true;
    const caja = document.getElementById('parada-paso');
    if (caja) caja.classList.add('visible');

    const hint = document.getElementById('placa-hint');
    if (hint) pintarHintPlaca(['UP'], true);
    document.getElementById('exercise-instruction-panel').innerText
        = "¡Ejercicio listo!";
}

function ocultarParadaPaso() {
    state.pausaEntrePasos = false;
    const caja = document.getElementById('parada-paso');
    if (caja) caja.classList.remove('visible');
}

function avanzarParadaPaso() {
    ocultarParadaPaso();
    state.ejercicioActualIdx++;
    state.repeticionesRealizadas = 0;
    cargarEjercicio();
}

function pintarContadorReps() {
    const ejercicio = ejercicioActual();
    if (ejercicio) {
        document.getElementById("reps-count-panel").innerText =
            `Reps: ${state.repeticionesRealizadas} / ${ejercicio.repsObjetivo}`;
    }
}

function pintarBarra(porcentaje) {
    document.getElementById("progress-bar").style.width = `${porcentaje}%`;
    document.getElementById("perc-text").innerText = `${Math.round(porcentaje)}%`;
}
