/* Calibracion y ejercicios. Solo los usa el detector. */
const FRAMES_PARA_CALIBRAR = 60;

/* Ejercicios base (los viejos, los de Salsa). Sin `imagen` usan los
   `ejemplos` del baile, ciclandolos (ver cargarEjercicio). Los videos
   viven en img/dances/deteccion-bailes: en img/ raiz quedaron solo
   los abajo_* (los demas se movieron a la carpeta de Salsa). */
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

/* ============================================================
   DOBLE FEEDBACK: pose + placa
   Un paso solo cuenta cuando la camara ve la pose al 100% Y la
   persona pisa la placa que corresponde (o aprieta la flecha del
   teclado, que llega por el mismo carril). El toque es uno solo.
   ============================================================ */

/* La placa que confirma cada tipo de paso: el lateral izquierdo se
   pisa con la placa izquierda, el adelante con la de arriba (↑) y
   el atras con la de abajo (↓). "vuelta" no esta aca: no confirma
   una placa sola, son las dos laterales dentro de un intervalo. */
/* MODO PRUEBA JSON (temporal). Dos interruptores:
   - POSE_MANDA  = la placa/teclado solo cuenta si la pose paso el
     umbral (doble feedback exigente). Desactivado por ahora.
   - SOLO_POSE   = doble feedback APAGADO: la rep se cuenta sola en
     cuanto la barra llega al 100%, sin placa ni teclado (medirAvance
     lo hace). En modo placa (sin camara) el bypass de la placa queda.
   Para el doble feedback de siempre: SOLO_POSE=false, POSE_MANDA=false. */
const POSE_MANDA = false;
const SOLO_POSE = true;

/* Los pasos se miden por DESPLAZAMIENTO contra la base calibrada,
   sin comparar puntos contra ningún json de poses:
     laterales      → eje X (positivo = derecha, negativo = izquierda)
     adelante/atrás → eje Z de MediaPipe (ver medirAvance). */

const PLACA_POR_TIPO = {
    pie_izquierdo_izquierda: 'LEFT',
    pie_derecho_derecha:     'RIGHT',
    pie_izquierdo_adelante:  'UP',
    pie_derecho_adelante:    'UP',
    pie_izquierdo_atras:     'DOWN',
    pie_derecho_atras:       'DOWN'
};

/* El intervalo y la secuencia de "La Vuelta" viven mas abajo
   (SECUENCIA_VUELTA = → ↓ ←). */

const GLIFO_PLACA = { UP: '↑', DOWN: '↓', LEFT: '←', RIGHT: '→' };
const SVG_PLACA = {
    UP: '../img/arrow-up.svg',
    DOWN: '../img/arrow-down.svg',
    LEFT: '../img/arrow-left.svg',
    RIGHT: '../img/arrow-right.svg'
};

/* Bailes para el detector: cada uno trae su lista de ejercicios.
   Mismo orden que el resto: el indice selectedDanceIdx es compartido.
   Los `ejemplos` apuntan a img/dances/deteccion-bailes (en img/ raiz
   ya no viven esos clips).
   Merengue y Samba usan sus videos propios por ejercicio. */
const danceOptionsDetector = [
    { name: "Salsa", ejemplos: [
        "../img/dances/deteccion-bailes/Salsa/izquierda.mp4",
        "../img/dances/deteccion-bailes/Salsa/derecha.mp4",
        "../img/dances/deteccion-bailes/Salsa/adelante-izquierda.mp4",
        "../img/dances/deteccion-bailes/Salsa/adelante-derecha.mp4"
    ], ejercicios: listaEjercicios },
    { name: "Merengue", ejemplos: [
        "../img/dances/deteccion-bailes/Merengue/adelante.mp4",
        "../img/dances/deteccion-bailes/Merengue/atras.mp4",
        "../img/dances/deteccion-bailes/Merengue/derecha.mp4"
    ], ejercicios: [
        { nombre: "Paso Adelante",     imagen: "../img/dances/deteccion-bailes/Merengue/adelante.mp4", repsObjetivo: 2, tipoMovimiento: "pie_derecho_adelante"  },
        { nombre: "Paso Atras",        imagen: "../img/dances/deteccion-bailes/Merengue/atras.mp4",    repsObjetivo: 2, tipoMovimiento: "pie_izquierdo_atras"   },
        { nombre: "Paso a la Derecha", imagen: "../img/dances/deteccion-bailes/Merengue/derecha.mp4",  repsObjetivo: 2, tipoMovimiento: "pie_derecho_derecha"   },
        /* La Vuelta sigue por botones (placa/teclado): el tipo 'vuelta'
           arma su secuencia → ↓ ← en procesarPulsacionVuelta y no usa
           la pose. NO pasarlo al sistema nuevo de secuencias por pose
           (EJERCICIOS_SECUENCIA): aca los botones son quien manda. */
        { nombre: "La Vuelta",         imagen: "../img/dances/deteccion-bailes/Merengue/vuelta.mp4",   repsObjetivo: 2, tipoMovimiento: "vuelta"                }
    ]},
    { name: "Samba", ejemplos: [
        "../img/dances/deteccion-bailes/Samba/pasitos-derecha.mp4",
        "../img/dances/deteccion-bailes/Samba/adelante.mp4",
        "../img/dances/deteccion-bailes/Samba/atras.mp4"
    ], ejercicios: [
        /* Pasos sueltos con su clip nuevo y su placa (derecha →,
           adelante con el pie IZQUIERDO ↑, atras con el izquierdo ↓:
           como marca el paso real). Y el brinco: atras con el derecho
           y luego atras con el izquierdo, sin tiempo de espera
           (atras_samba, ver EJERCICIOS_SECUENCIA). El clip lento del
           baile ya no existe: cada paso demostrado va con el suyo. */
        { nombre: "Pasitos a la Derecha",      imagen: "../img/dances/deteccion-bailes/Samba/pasitos-derecha.mp4", repsObjetivo: 2, tipoMovimiento: "pie_derecho_derecha"     },
        { nombre: "Paso Adelante",             imagen: "../img/dances/deteccion-bailes/Samba/adelante.mp4",        repsObjetivo: 2, tipoMovimiento: "pie_izquierdo_adelante"  },
        { nombre: "Paso Atras",                imagen: "../img/dances/deteccion-bailes/Samba/atras.mp4",           repsObjetivo: 2, tipoMovimiento: "pie_izquierdo_atras"     },
        { nombre: "Atras Modo Samba (Brinco)", imagen: "../img/dances/deteccion-bailes/Samba/atras-rapido.mp4",     repsObjetivo: 2, tipoMovimiento: "atras_samba"             }
    ]},
    /* Flamenco: mismo orden que elegir/leaderboard (indice 3). Oculto:
       en pantalla-elegir no se puede elegir, asi que el detector nunca
       lo recibe. La entrada sigue aca para mantener los indices
       compartidos. Sus 4 pasos son los 4 del flamenco ("alante" =
       adelante, el flamenco no pisa atras). Placas: adelante → ↑,
       laterales → ←/→ (PLACA_POR_TIPO ya las resuelve). */
    { name: "Flamenco", oculto: true, ejemplos: [
        "../img/dances/deteccion-bailes/Flamenco/izquierda-alante.webm",
        "../img/dances/deteccion-bailes/Flamenco/derecha-alante.webm",
        "../img/dances/deteccion-bailes/Flamenco/izquierda.webm",
        "../img/dances/deteccion-bailes/Flamenco/derecha.webm"
    ], ejercicios: [
        { nombre: "Pie Izquierdo Alante",    imagen: "../img/dances/deteccion-bailes/Flamenco/izquierda-alante.webm", repsObjetivo: 2, tipoMovimiento: "pie_izquierdo_adelante"  },
        { nombre: "Pie Derecho Alante",      imagen: "../img/dances/deteccion-bailes/Flamenco/derecha-alante.webm",   repsObjetivo: 2, tipoMovimiento: "pie_derecho_adelante"    },
        { nombre: "Pie Izquierdo a la Izquierda", imagen: "../img/dances/deteccion-bailes/Flamenco/izquierda.webm",   repsObjetivo: 2, tipoMovimiento: "pie_izquierdo_izquierda" },
        { nombre: "Pie Derecho a la Derecha",     imagen: "../img/dances/deteccion-bailes/Flamenco/derecha.webm",     repsObjetivo: 2, tipoMovimiento: "pie_derecho_derecha"     }
    ]},
    /* El Areíto: clips en mp4 sueltos en img/dances/deteccion-bailes/Areito.
       "doble-adelante" es el adelante rapido (2 pasadas con laterales,
       repetidas). "Atras" todavia no tiene fichero: sin video, el
       reproductor queda en negro y el paso se aprueba igual con la
       placa. Cuando salga, soltarlo como Areito/atras.mp4. */
    { name: "El Areíto", ejemplos: [
        "../img/dances/deteccion-bailes/Areito/adelante.mp4",
        "../img/dances/deteccion-bailes/Areito/derecha.mp4",
        "../img/dances/deteccion-bailes/Areito/izquierda.mp4"
    ], ejercicios: [
        { nombre: "Doble Adelante", imagen: "../img/dances/deteccion-bailes/Areito/doble-adelante.mp4", repsObjetivo: 2, tipoMovimiento: "pie_derecho_adelante"    },
        { nombre: "Adelante",       imagen: "../img/dances/deteccion-bailes/Areito/adelante.mp4",       repsObjetivo: 2, tipoMovimiento: "pie_izquierdo_adelante"  },
        { nombre: "Atras",          imagen: "../img/dances/deteccion-bailes/Areito/atras.mp4",          repsObjetivo: 2, tipoMovimiento: "pie_izquierdo_atras"     },
        { nombre: "Lado Derecho",   imagen: "../img/dances/deteccion-bailes/Areito/derecha.mp4",        repsObjetivo: 2, tipoMovimiento: "pie_derecho_derecha"     },
        { nombre: "Lado Izquierdo", imagen: "../img/dances/deteccion-bailes/Areito/izquierda.mp4",      repsObjetivo: 2, tipoMovimiento: "pie_izquierdo_izquierda" },
        { nombre: "La Vuelta",      imagen: "../img/dances/deteccion-bailes/Areito/vuelta.mp4",         repsObjetivo: 1, tipoMovimiento: "vuelta"                  }
    ]}
];

/* La lista en curso sale del baile elegido; si un baile no la trae,
   cae a la base. Todas las funciones que avanzaban ejercicios pasan
   por aqui para no seguir contando la lista de Salsa con otro baile. */
function listaEjerciciosEnCurso() {
    const baile = danceOptionsDetector[state.selectedDanceIdx];
    return (baile && baile.ejercicios) || listaEjercicios;
}

function ejercicioActual() {
    return listaEjerciciosEnCurso()[state.ejercicioActualIdx];
}

function placaDelEjercicio(ejercicio) {
    return ejercicio && PLACA_POR_TIPO[ejercicio.tipoMovimiento];
}

const SCORE_MINIMO = 0.4;

const UMBRAL_ACIERTO = 0.8;
// Por debajo de este porcentaje se desarma la posición para poder contar
// otra vez. Es una banda de histéresis: sin ella, armar y desarmar en
// frames alternos contaría reps inventadas.
const RESET_MOVIMIENTO = 0.4;
// Adelante/atrás da muchos más falsos positivos que el lateral: el pie se
// mueve apenas al respirar, al cambiar el peso o al corregir la postura,
// y con 0.40 eso ya cuenta. Bajando a 0.52 hay que volver bastante más
// atrás para rearmar, así el rebote entre frames no llega a sumar.
const RESET_MOVIMIENTO_AF = 0.52;
const MS_SOSTENIDO = 1300;
// Score mínimo para que un punto del torso/cadera cuente (solo se usan
// para anclar la base y el dz; los tobillos van al SCORE_MINIMO).
const SCORE_MINIMO_BASE = 0.25;

/* Cuánto tiene que ACERCARSE (o alejarse) el pie en el EJE Z de
   MediaPipe para que adelante/atrás llegue al 100%. El z viene
   normalizado (origen = centro de las caderas, escala como x), así
   que el valor no depende de la resolución de la cámara: con ~0.2
   llega un paso de baile normal y completo. Con la señal z sola. */
let PROFUNDIDAD_OBJETIVO = 0.2;

/* Lo mismo para ATRAS: al alejar el pie el cambio de z es menor que
   al acercarlo, asi que el objetivo es mas chico. */
let PROFUNDIDAD_OBJETIVO_ATRAS = 0.12;

/* Cambiarlas desde la consola del detector:
   profundidadObjetivo()                  -> las dos de ahora
   profundidadObjetivo(0.15)              -> cambia solo la de adelante
   profundidadObjetivo(0.15, 0.1)         -> adelante y atras        */
window.profundidadObjetivo = (adelante, atras) => {
    if (adelante != null) PROFUNDIDAD_OBJETIVO = adelante;
    if (atras != null) PROFUNDIDAD_OBJETIVO_ATRAS = atras;
    return { adelante: PROFUNDIDAD_OBJETIVO, atras: PROFUNDIDAD_OBJETIVO_ATRAS };
};

/* == LOS DOS CAMINOS: TOBILLO Y RODILLA ==
   Modo 1 (el de siempre): se mide con el TOBILLO. Modo 2 (fallback
   por frame, automatico): si el tobillo no llego a `piernas` (lo
   corta quedarseConPiernas por score), la RODILLA resuelve con la
   misma receta y el objetivo escalado con estos factores. La rodilla
   viaja MENOS que el tobillo — sobre todo en los laterales, donde
   casi no barre — asi que sin esta escala habria que bailar exagerado
   para que contara. Si el tobillo vuelve, manda el modo 1 solo: no
   hay estado extra ni aviso al jugador. Ajuste fino (probar en vivo):
     RODILLA_FACTOR_Z  adelante/atrás (eje Z)  ~0.60
     RODILLA_FACTOR_X  laterales (eje X)       ~0.35 */
const RODILLA_FACTOR_Z = 0.60;
const RODILLA_FACTOR_X = 0.35;

/* Los nodos de la camara se enganchan desde el arranque de
   detector.html, no al cargar el archivo: este script tambien se
   carga en cta.html (para precargar el modelo) y ahi no existe
   #webcam, asi que al ejecutarse en el nivel superior haria
   state.video = null para siempre. */

// El fondo 4K es el <video> global compartido, no uno propio de esta
// pantalla, asi que no hay nada que crear ni que pausar aqui.

function precargarVideos() {
    // Se precargan tanto los vídeos por defecto como los de todos los
    // bailes (sus ejemplos y su video por ejercicio), que son pocos y
    // así no hay tirones al cambiar de secuencia.
    const todos = new Set();
    listaEjercicios.forEach(ejercicio => todos.add(ejercicio.imagen));
    SECUENCIA_POR_DEFECTO.forEach(v => todos.add(v));
    danceOptionsDetector.forEach(b => {
        (b.ejemplos || []).forEach(v => todos.add(v));
        (b.ejercicios || []).forEach(ejercicio => ejercicio.imagen && todos.add(ejercicio.imagen));
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
    /* MediaPipe Pose reemplaza a MoveNet. Aparte de x/y, cada landmark
       trae el eje Z: origen en el centro de las caderas, escala similar
       a x, y MENOR = MAS CERCA de la camara. Con ese z se miden de verdad los pasos
       adelante/atras (ver medirAvance), sin trucos de perspectiva.
       modelComplexity 2 = el modelo grande (heavy, pose_landmark_heavy),
       la calidad mas alta (lo mas parecido a Thunder). Es lo mas pesado,
       si va lento en pantallas flojas bajar a 1 (el doble de rapido) o
       a 0. Todo el runtime vive en
       ../mediapipe_pose/: pose.js, el wasm y los .task van por
       locateFile. */
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

/* MediaPipe entrega el frame por callback dentro de pose.send(), no
   como un await: guardamos el resultado y el resolver del await aqui
   para que dibujarFrame() siga funcionando igual. */
let resolverLandmarks = null;

function resultadosMediaPipe(results) {
    if (resolverLandmarks) {
        const r = resolverLandmarks;
        resolverLandmarks = null;
        r(results);
    }
}

/* El equivalente del viejo detector.estimatePoses(video): manda el
   frame a MediaPipe y resuelve con los landmarks del resultado
   (state.detector es la instancia de Pose creada en crearDetector). */
async function estimarLandmarks(video) {
    const promesa = new Promise((resolve) => { resolverLandmarks = resolve; });
    await state.detector.send({ image: video });
    return await promesa;
}

/* Indices de MediaPipe (BlazePose, 33 puntos) para los nombres que
   usa todo este archivo (los mismos de la captura calibrada). Solo
   hacen falta torso + piernas. */
const INDICE_MEDIAPIPE = {
    left_shoulder:  11, right_shoulder: 12,
    left_hip:       23, right_hip:      24,
    left_knee:      25, right_knee:     26,
    left_ankle:     27, right_ankle:    28
};

/* Traduce el resultado de MediaPipe al formato clave de este proyecto:
   un array con { name, x, y, z, score }. x/y pasan a pixeles del
   canvas (el video se dibuja estirado sobre el canvas, y las medidas
   de calibracion viven en pixeles de canvas). z queda SIN tocar:
   MediaPipe ya la entrega normalizada (origen = centro de caderas) y
   asi se compara 100% con la base calibrada. score = visibility, que
   es la contraparte del score de MoveNet. */
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
    return await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
    });
}

async function encenderDetector() {
    if (state.detectionEngineReady) return;

    const panel = document.getElementById("exercise-instruction-panel");

    try {

        if (!state.detectorPromise) precargarModelo();




        panel.innerText = "Pidiendo cámara...";
        if (!state.cameraStream) state.cameraStream = await pedirCamara();

        panel.innerText = "Cargando modelo...";
        /* El detector tarda en estar y se nota: mientras tanto se sigue
           mostrando la postura en crudo para que la pantalla no parezca
           congelada durante la espera. */
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
        /* Sin camara (permiso denegado, webcam ausente o error) el
           aprendizaje sigue: los ejercicios avanzan confirmados con
           la placa sola y de una vez se carga el primero, para que
           el panel y el demo no queden pegados en "Cargando...". */
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
    // Primero se corta el bucle: si no, el frame que esté en vuelo
    // vuelve a encolar requestAnimationFrame y sigue corriendo con la
    // cámara ya apagada.
    state.detectionEngineReady = false;

    if (state.cameraStream) {
        state.cameraStream.getTracks().forEach(t => t.stop());
        state.cameraStream = null;
    }
    /* El chequeo de state.video es necesario porque este archivo tambien
       se carga en cta.html, donde no hay webcam: este script llega a
       apagarDetector() al saltar de pagina y #webcam no existe ahi. */
    if (state.video && state.video.srcObject) {
        state.video.srcObject.getTracks().forEach(t => t.stop());
        state.video.srcObject = null;
    }
    state.bucleOcupado = false;
}

/* Al saltar a otra pagina el detector se desmonta solo (el documento
   entero desaparece), pero la camara no: sin esto el pilotillo se
   queda encendido aunque el jugador ya este en la pantalla de juego.
   Los tracks se paran a mano antes de que el navegador recycle el
   dispositivo. */
window.addEventListener('pagehide', apagarDetector);

function reiniciarDetector() {
    state.ejercicioActualIdx = 0;
    state.repeticionesRealizadas = 0;
    state.framesCalibrados = 0;
    state.baseKeypoints = null;
    // También la escala: si no, un valor viejo sobrevive al reinicio y
    // el porcentaje se calcula con la referencia de la vez anterior.
    state.baseScale = null;
    // La profundidad base (eje z de MediaPipe) caduca igual.
    state.baseDzPie = { left: null, right: null };
    state.baseZTobillo = { left: null, right: null };
    // y las de rodilla (modo tobillo tapado) caen con ellas.
    state.baseDzRodilla = { left: null, right: null };
    state.baseZRodilla = { left: null, right: null };
    state.positionHeld = false;
    state.enCooldown = false;
    // La vuelta (merengue) empieza sin secuencia armada.
    state.vueltaPaso = 0;
    state.vueltaInicio = 0;
    // Las secuencias de dos pasos (brinco del samba, adelante+atras)
    // empiezan sin paso armado: se necesitan en orden, sin espera.
    state.secuenciaPaso = 0;
    // cada carga de pagina se empieza con camara: placaSolo se decide
    // de nuevo en encenderDetector() si la camara no arranca.
    state.placaSolo = false;
}

async function renderPoses() {
    if (!state.detectionEngineReady) return;

    // Guarda de reentrada: estimatePoses tarda más que un frame, así que
    // sin esto las llamadas se encadenan (1 → 2 → 4 → 8...) y la GPU se
    // satura. Con la guarda solo hay una inferencia en vuelo.
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
        } else {
            medirAvance(piernas);
        }
    }

    state.ctx.restore();
    // El requestAnimationFrame lo pone renderPoses, al final de su try/finally
}

function quedarseConPiernas(kp) {
    // Hombros y cadera van tambien: no se dibujan, la cadera sirve para
    // el centro del cuerpo y el dz de la profundidad, los hombros para
    // la escala fijada al calibrar. Los de base pueden llegar mas
    // flojos con SCORE_MINIMO_BASE; lo que se MIDE (tobillos) sigue al
    // SCORE_MINIMO estricto.
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

// Ancho de cadera en píxeles. Sirve como respaldo.
function medirAnchoCadera(piernas) {
    const { left_hip: ci, right_hip: cd } = piernas;
    if (!ci || !cd) return null;
    return Math.hypot(ci.x - cd.x, ci.y - cd.y);
}

// Largo de la pierna (cadera → tobillo). Se usa como escala para los
// movimientos laterales, que se miden en píxeles sobre el pie.
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
            /* Profundidad base de cada pie en el eje z de MediaPipe:
               dz = z(tobillo) - z(cadera del mismo lado). En parado el
               pie y la cadera estan casi a la misma distancia de la
               camara, dz ~ 0 (puede no serlo exacto: por eso se guarda
               como referencia al calibrar). Adelante → dz baja, atras
               → sube; el delta contra ESTA base manda (ver medirAvance).
               Si un lado llega sin tobillo, cae al otro. */
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
            /* Z absoluta de cada tobillo al calibrar: la señal de
               respaldo de adelante/atras (la mas util al RETROCEDER,
               ve medirAvance). Si un lado no se ve, cae al otro. */
            state.baseZTobillo = { left: null, right: null };
            for (const lado of ['left', 'right']) {
                const tob = piernas[`${lado}_ankle`];
                if (tob && tob.z != null) state.baseZTobillo[lado] = tob.z;
            }
            const zOtro = state.baseZTobillo.left != null ? state.baseZTobillo.left : state.baseZTobillo.right;
            if (state.baseZTobillo.left == null) state.baseZTobillo.left = zOtro;
            if (state.baseZTobillo.right == null) state.baseZTobillo.right = zOtro;
            /* Igual pero para la RODILLA, base del modo 2 (fallback):
               su dz contra la cadera y su z absoluta. Rodilla y cadera
               van al mismo bombo: si el tobillo se pierde en el juego,
               estos numeros ya estaban al calibrar. Si un lado no se
               ve, cae al otro igual que arriba. */
            state.baseDzRodilla = { left: null, right: null };
            for (const lado of ['left', 'right']) {
                const rod = piernas[`${lado}_knee`];
                const cad = piernas[`${lado}_hip`];
                if (rod && cad && rod.z != null && cad.z != null) {
                    state.baseDzRodilla[lado] = rod.z - cad.z;
                }
            }
            const dzoRod = state.baseDzRodilla.left != null ? state.baseDzRodilla.left : state.baseDzRodilla.right;
            if (state.baseDzRodilla.left == null) state.baseDzRodilla.left = dzoRod;
            if (state.baseDzRodilla.right == null) state.baseDzRodilla.right = dzoRod;
            state.baseZRodilla = { left: null, right: null };
            for (const lado of ['left', 'right']) {
                const rod = piernas[`${lado}_knee`];
                if (rod && rod.z != null) state.baseZRodilla[lado] = rod.z;
            }
            const zOtroRod = state.baseZRodilla.left != null ? state.baseZRodilla.left : state.baseZRodilla.right;
            if (state.baseZRodilla.left == null) state.baseZRodilla.left = zOtroRod;
            if (state.baseZRodilla.right == null) state.baseZRodilla.right = zOtroRod;
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

/* == Score de ADELANTE o ATRAS de un lado (0-100, eje Z de
   MediaPipe; MENOR = mas cerca de la camara) ==

   MODO 1 (tobillo): DOS senales (gana la mayor), las dos contra la
   base de la CALIBRACION:
     1) RELATIVA: dz = z(tobillo) - z(cadera del mismo lado), contra el
        dz de la calibracion (asi el resto del cuerpo no engania).
     2) ABSOLUTA: la z del TOBILLO contra la guardada al calibrar
        (respaldo clave para ATRAS: el pie se aleja poco respecto a la
        cadera pero si de la camara).
   Atras usa PROFUNDIDAD_OBJETIVO_ATRAS (mas chico: al alejarse el
   cambio de z es menor).

   MODO 2 (rodilla): si el tobillo no llego a `piernas` (queda cortado
   en quedarseConPiernas, suele pasar de puntas o con el pie al borde
   del cuadro), la RODILLA resuelve con la misma receta sobre SUS
   bases (baseDzRodilla/baseZRodilla, al calibrar) y el objetivo
   escalado por RODILLA_FACTOR_Z (la rodilla viaja menos que el
   tobillo porque la zancada estira desde la cadera al pie).

   La comparten los pasos sueltos y las secuencias del samba (brinco). */
function scorePasoPose(piernas, lado, adelanta) {
    const tobillo = piernas[`${lado}_ankle`];
    const cadera = piernas[`${lado}_hip`];
    const rodilla = piernas[`${lado}_knee`];

    if (tobillo && tobillo.z != null && cadera && cadera.z != null) {
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

    if (rodilla && rodilla.z != null && cadera && cadera.z != null) {
        const sides = state.baseDzRodilla;
        const dzRodBase = sides ? (sides[lado] != null ? sides[lado] : sides[lado === 'left' ? 'right' : 'left']) : null;
        if (dzRodBase == null) return 0;

        let senalRod = adelanta
            ? dzRodBase - (rodilla.z - cadera.z)
            : (rodilla.z - cadera.z) - dzRodBase;

        const zRodBase = state.baseZRodilla ? state.baseZRodilla[lado] : null;
        if (zRodBase != null) {
            const deltaAbsRod = adelanta ? (zRodBase - rodilla.z) : (rodilla.z - zRodBase);
            senalRod = Math.max(senalRod, deltaAbsRod);
        }

        const objetivoRod = (adelanta ? PROFUNDIDAD_OBJETIVO : PROFUNDIDAD_OBJETIVO_ATRAS) * RODILLA_FACTOR_Z;
        return Math.max(0, Math.min(100, (senalRod / objetivoRod) * 100));
    }

    return 0;
}

/* == Score del paso LATERAL de un lado (0-100, eje X contra la base
   calibrada). La camara entrega la x invertida respecto a como se ve
   en pantalla (la camara no espeja, el video si se muestra espejado):
     pie DERECHO a la derecha → dx NEGATIVO
     pie IZQUIERDO a la izquierda → dx POSITIVO
   (invertido respecto a la intuicion: si sale al reves otra vez,
   intercambia el signo de `delta` aqui.)
   MODO 2: sin tobillo, la rodilla resuelve con el objetivo escalado
   por RODILLA_FACTOR_X — en un lateral casi no barre, por eso el
   factor es mas chico que el de Z. */
function scoreLateral(piernas, base, escala, lado, pieDerecho) {
    const tobillo = piernas[`${lado}_ankle`];
    if (tobillo && base && base[`${lado}_ankle`]) {
        const dx = tobillo.x - base[`${lado}_ankle`].x;
        const delta = pieDerecho ? -dx : dx;
        return Math.max(0, Math.min(100, (delta / (escala * 0.12)) * 100));
    }

    const rodilla = piernas[`${lado}_knee`];
    if (rodilla && base && base[`${lado}_knee`]) {
        const dxRod = rodilla.x - base[`${lado}_knee`].x;
        const deltaRod = pieDerecho ? -dxRod : dxRod;
        return Math.max(0, Math.min(100, (deltaRod / (escala * 0.12 * RODILLA_FACTOR_X)) * 100));
    }

    return 0;
}

function medirAvance(piernas) {
    const ejercicio = ejercicioActual();
    const base = state.baseKeypoints;
    if (!ejercicio || !base || !state.baseScale) return;

    /* La Vuelta no se mide con la pose: se arma con el primer pisón y
       se completa con el segundo (ver procesarPulsacionVuelta). Aqui
       solo vigilamos que el pisón armado no caduque. */
    if (ejercicio.tipoMovimiento === 'vuelta') {
        medirVuelta();
        return;
    }

    /* Las secuencias del samba (brinco y adelante+atras) tampoco: son
       DOS pasos que se necesitan uno despues del otro, sin tiempo de
       espera; el pie lo distingue la pose (ver medirSecuenciaPose). */
    if (esEjercicioSecuencia(ejercicio.tipoMovimiento)) {
        medirSecuenciaPose(piernas);
        return;
    }


    const escala = state.baseScale;
    let score = 0;

    /* TODO se mide por DESPLAZAMIENTO contra la base calibrada, sin
       comparar puntos contra ningun json de poses:
         laterales      → eje X (positivo = derecha, negativo = izquierda)
         adelante/atrás → eje Z de MediaPipe ( pie acercándose a la
                          cámara = z menor ) */
    const esAdelanteAtras = ejercicio.tipoMovimiento.includes('adelante')
                         || ejercicio.tipoMovimiento.includes('atras');

    const Necesarios = {
        pie_izquierdo_izquierda: ['left_ankle'],
        pie_derecho_derecha: ['right_ankle'],
        pie_izquierdo_adelante: ['left_ankle'],
        pie_derecho_adelante: ['right_ankle'],
        pie_izquierdo_atras: ['left_ankle'],
        pie_derecho_atras: ['right_ankle']
    }[ejercicio.tipoMovimiento] || [];

    /* Modo 2 de los DOS CAMINOS: si el tobillo pedido no llego a
       `piernas` (se corto en quedarseConPiernas por score bajo),
       su RODILLA del mismo lado puede resolver: el par ankle → knee
       sustituye nodo por nodo, y el score se calcula en
       scorePasoPose/scoreLateral. */
    const listo = Necesarios.every(n =>
        (piernas[n] && base[n])
        || (n.includes('ankle')
            && piernas[n.replace('ankle', 'knee')]
            && base[n.replace('ankle', 'knee')]));
    if (!listo) return;

    switch (ejercicio.tipoMovimiento) {
        /* Lateral: desplazamiento del pie sobre el EJE X contra la
           base calibrada. Probado en vivo: en la cámara el valor de x
           queda al revés de como se ve en pantalla (la camara no
           espeja, el video sí se muestra espejado), así que:
             pie DERECHO a la derecha → dx NEGATIVO
             pie IZQUIERDO a la izquierda → dx POSITIVO
           (invertido respecto a la intuición: si sale al revés otra
           vez, intercambia el signo de `delta` aquí.) */
        case "pie_izquierdo_izquierda":
        case "pie_derecho_derecha": {
            const lado = ejercicio.tipoMovimiento.includes('izquierda') ? 'left' : 'right';
            const pieDerecho = ejercicio.tipoMovimiento.includes('derecha');
            score = scoreLateral(piernas, base, escala, lado, pieDerecho);
            break;
        }

        /* Adelante / atrás: SOLO el EJE Z de MediaPipe.
           MediaPipe entrega z con origen en el centro de las caderas y
           MENOR = MAS CERCA de la camara:
             adelante → el pie se acerca a la camara → z baja
             atrás    → el pie se aleja            → z sube.
           DOS señales (gana la que mas avance dé), las dos contra la
           base de la CALIBRACION:
             1) RELATIVA: dz = z(tobillo) - z(cadera del mismo lado).
                El dz de la calibracion (state.baseDzPie) sobre el de
                ahora: asi el movimiento del resto del cuerpo no engaña.
             2) ABSOLUTA: la z del TOBILLO contra la z del tobillo
                guardada al calibrar (state.baseZTobillo). Respaldo
                importante para ATRAS: al retroceder el pie se aleja
                poco respecto a la cadera (el cuerpo lo acompania) y
                el dz relativo apenas cambia; el tobillo en cambio
                si se aleja de la camara y su z sube claro.

           ATRAS usa su propio objetivo (PROFUNDIDAD_OBJETIVO_ATRAS,
           mas chico) porque al alejarse el cambio de z es menor que
           al acercarse. */
        case "pie_izquierdo_adelante":
        case "pie_derecho_adelante": {
            score = scorePasoPose(piernas, ejercicio.tipoMovimiento.includes('izquierdo') ? 'left' : 'right', true);
            break;
        }

        case "pie_izquierdo_atras":
        case "pie_derecho_atras": {
            score = scorePasoPose(piernas, ejercicio.tipoMovimiento.includes('izquierdo') ? 'left' : 'right', false);
            break;
        }
    }

    if (state.enCooldown) {
        pintarBarra(100);
        return;
    }

    /* MODO SOLO POSE: al llegar la barra al 100% la rep se cuenta sola,
       sin placa ni teclado (doble feedback apagado). La barra se pinta
       SIEMPRE con el score del frame: asi se ve el porcentaje subir
       mientras haces el paso y cuando la rep cuenta vuelve a empezar
       desde 0 (el cooldown sostiene el 100 un momento y el primer
       frame libre lo baja). El cooldown evita contar dos veces el
       mismo paso. */
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

    /* Umbral alcanzado: el desplazamiento esta (primer feedback) pero
       la rep NO cuenta todavia. Se arma y se espera el pisón de la
       placa correcta (segundo feedback); ese toque es quien registra,
       ver pulsacionPlaca(). */
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


    // El umbral de rearme depende del tipo de movimiento: adelante/atrás
    // usa el más alto porque la señal z rebota más entre frames.
    const reset = esAdelanteAtras ? RESET_MOVIMIENTO_AF : RESET_MOVIMIENTO;

    /* Si la pose se desarma (el pie volvió cerca de la base) se
       apaga el aviso de "pisa la placa", pero el pisón sigue valiendo
       igual: la placa manda aunque la camara esté a medias. */
    if (score < 100 * reset && state.positionHeld) {
        if (state.repeticionesRealizadas < ejercicio.repsObjetivo) {
            state.positionHeld = false;
            anunciar(`¡${ejercicio.nombre}!`);
            pintarHintPlaca([placaDelEjercicio(ejercicio)]);
        }
    }
}

/* ============================================================
   LA PLACA (y el teclado, que llega por el mismo carril)

   Cada pulsacion de placa pasa por aqui. Un paso (los que se miden
   con pose) cuenta con UN toque de la placa correcta mientras el
   brazo de la pose sigue armado. La Vuelta armada con placas vive
   en procesarPulsacionVuelta().
   ============================================================ */
function pulsacionPlaca(dir) {
    /* La placa manda: el pisón de la flecha correcta cuenta el paso
       aunque la camara no haya visto la pose (deteccion a medias o
       ausente). La pose al 100% solo arma el aviso "ya lo tienes,
       pisa": no es requisito para contar. Sin camara tampoco impide,
       modo placa (ver encenderDetector). */

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

    /* MODO SOLO POSE: la placa/teclado no decide (mientras dure la
       prueba). Sonar un toque no vale y no rompe nada: la rep se
       cuenta sola cuando la barra llega al 100% (ver medirAvance).
       Sin camara (placaSolo) el bypass queda, si no no habria como
       avanzar. */
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

    /* MODO PRUEBA (POSE_MANDA): el toque SOLO cuenta si el paso ya se
       armo (el desplazamiento paso el umbral y la barra llego a 100).
       En modo placa (sin camara) el bypass queda, si no no habria
       como avanzar. */
    if (POSE_MANDA && !state.placaSolo && !state.positionHeld) {
        destelloBarra('paso-fallo');
        tocarEfecto('fallar.mp3', 0.25);
        anunciar(`Primero el paso · la placa ${GLIFO_PLACA[esperada]} cuenta cuando la pose este lista`, 1600);
        return;
    }

    /* Tocado. Un solo toque de la flecha correcta con la pose lista. */
    destelloBarra('paso-listo');
    tocarEfecto('acertar.mp3', 0.5);
    confirmarRepeticion();
}

/* Cuenta la rep que ya paso los dos filtros (paso + placa) y arma el
   cooldown, igual que el conteo automatico de antes. Avisa SIEMPRE:
   antes quedaba muda cuando el paso nunca armo (o placa sola) y el
   jugador no veia ningun "bien hecho". Con
   avisoPropio quien llama ya se anuncio (La Vuelta). */
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

/* La Vuelta: secuencia fija de placas, sin deteccion. Derecha, atras,
   izquierda — en ORDEN y dentro del intervalo. */
const SECUENCIA_VUELTA = ['RIGHT', 'DOWN', 'LEFT'];
const MS_VUELTA = 1100;

/* Cada toque vale un tercio de la barra. */
const BARRA_POR_PISO_VUELTA = 100 / SECUENCIA_VUELTA.length;

/* Cada pisada correcta avanza la secuencia; la equivocada (o dejar
   pasar el intervalo) la desarma. Piso fallido sobre "derecha" sirve
   para arrancar de nuevo: es el primer paso de la secuencia. */
function procesarPulsacionVuelta(dir) {
    if (state.enCooldown) return;

    const ahora = Date.now();

    // Si el primer paso (o el segundo) ya vencio, desarmar antes de
    // mirar este toque.
    if (state.vueltaPaso > 0 && ahora - state.vueltaInicio > MS_VUELTA) {
        state.vueltaPaso = 0;
        state.vueltaInicio = 0;
        destelloBarra('paso-fallo');
        tocarEfecto('fallar.mp3', 0.25);
        anunciar("Se pasó el tiempo · la vuelta va → ↓ ←", 1400);
    }

    const esperada = SECUENCIA_VUELTA[state.vueltaPaso];

    if (dir === esperada) {
        if (!state.vueltaInicio) state.vueltaInicio = ahora;
        state.vueltaPaso += 1;

        // Tercer toque a tiempo: vuelta completa.
        if (state.vueltaPaso >= SECUENCIA_VUELTA.length) {
            destelloBarra('paso-listo');
            tocarEfecto('acertar.mp3', 0.5);
            anunciar("¡Vuelta lista!", 1000);
            state.vueltaPaso = 0;
            state.vueltaInicio = 0;
            pintarHintVuelta(SECUENCIA_VUELTA.length);
            pintarBarra(100);
            confirmarRepeticion(true);
            return;
        }

        anunciar(state.vueltaPaso === 1 ? "¡Bien! Ahora atrás ↓" : "¡Bien! Ahora izquierda ←", 1200);
        pintarBarra(state.vueltaPaso * BARRA_POR_PISO_VUELTA);
        pintarHintVuelta(state.vueltaPaso);
        return;
    }

    // Toque equivocado: se desarma. Si el toque fue "derecha" arranca
    // otra vez al instante (es el primer paso valido de la secuencia).
    state.vueltaPaso = 0;
    state.vueltaInicio = 0;
    destelloBarra('paso-fallo');
    tocarEfecto('fallar.mp3', 0.25);
    anunciar("Esa no · la vuelta va → ↓ ←", 1200);
    if (dir === SECUENCIA_VUELTA[0]) {
        state.vueltaPaso = 1;
        state.vueltaInicio = ahora;
        pintarBarra(BARRA_POR_PISO_VUELTA);
        pintarHintVuelta(1);
        return;
    }
    pintarHintVuelta(0);
}

/* Frame a frame mientras el ejercicio es La Vuelta: si el primer
   pisón vencio (el jugador no logro pisar la otra placa a tiempo) se
   desarma con su aviso, y la barra refleja donde va la combinacion. */
function medirVuelta() {
    // Durante el cooldown tras una vuelta contada la barra se queda
    // llena, igual que en los pasos que se miden con pose.
    if (state.enCooldown) {
        pintarBarra(100);
        return;
    }

    // El intervalo corre desde la PRIMERA pisada de la secuencia: si
    // no llego el tercer toque a tiempo, la vuelta se desarma.
    if (state.vueltaPaso > 0 && Date.now() - state.vueltaInicio > MS_VUELTA) {
        state.vueltaPaso = 0;
        state.vueltaInicio = 0;
        destelloBarra('paso-fallo');
        tocarEfecto('fallar.mp3', 0.25);
        anunciar("Se pasó el tiempo · la vuelta va → ↓ ←", 1400);
        pintarHintVuelta(0);
    }
    pintarBarra(state.vueltaPaso * BARRA_POR_PISO_VUELTA);
}

/* ============================================================
   SECUENCIAS DE DOS PASOS (del samba)
   Dos pasos que se necesitan uno despues del OTRO, SIN tiempo de
   espera entre ellos: no hay intervalo que venza, solo se desarma
   si tocas/pisas otra placa. Cada secuencia completa vale una rep.
     - "Atras Modo Samba (Brinco)": atras pie DERECHO y luego atras
       pie IZQUIERDO. Las dos pisan ↓, asi que el pie lo distingue la
       POSE (scorePasoPose por tobillo); en modo placa, dos pisones ↓.
     - "Adelante y Atras (Secuencia)": adelante con el pie IZQUIERDO
       (↑) y luego atras con el izquierdo (↓), el orden del paso.
   ============================================================ */
const EJERCICIOS_SECUENCIA = {
    atras_samba: {
        nombre: "brinco",
        pose: [
            { lado: 'right', adelanta: false },
            { lado: 'left',  adelanta: false }
        ],
        placas: ['DOWN', 'DOWN'],
        avisoSegunda: "¡Bien! Ahora atrás con el izquierdo ↓",
        avisoCompleto: "¡Brinco listo!"
    },
    adelante_atras_samba: {
        nombre: "adelante y atras",
        pose: [
            { lado: 'left', adelanta: true  },
            { lado: 'left', adelanta: false }
        ],
        placas: ['UP', 'DOWN'],
        avisoSegunda: "¡Bien! Ahora atrás ↓",
        avisoCompleto: "¡Adelante y atrás listos!"
    }
};

const esEjercicioSecuencia = tipo => !!EJERCICIOS_SECUENCIA[tipo];

/* El hint de una secuencia: sus flechas en orden. La que toca ahora
   lleva `sigue` (late); las ya pisadas quedan apagadas. */
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

/* Frame a frame de una secuencia: el pie del paso en curso lo mide la
   pose (scorePasoPose por tobillo); al llegar al 100% avanza al
   siguiente. SIN intervalo que venza: solo se desarma al pisar otra
   placa (ver procesarPulsacionSecuencia) o al cambiar de ejercicio. */
function medirSecuenciaPose(piernas) {
    const ejercicio = ejercicioActual();
    const cfg = ejercicio && EJERCICIOS_SECUENCIA[ejercicio.tipoMovimiento];
    if (!cfg) return;

    // Durante el cooldown tras una secuencia contada la barra se queda
    // llena, igual que en los pasos que se miden con pose.
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

        // Ultima pata de la secuencia: cuenta la rep.
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

/* Modo placa (sin camara): no hay pose para distinguir el pie, asi
   que pisones de las placas correctas EN ORDEN completan la secuencia
   (el brinco son dos ↓; adelante+atras son ↑ y luego ↓). Placa
   equivocada: se desarma. */
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

/* Texto "canonico" del panel de instrucciones: vuelve a el cuando
   acaba un aviso temporal (averígluense los estados, no los frames). */
function textoCanonico() {
    const ejercicio = ejercicioActual();
    if (!ejercicio) return "";

    if (state.enCooldown) return "¡Bien! Repite el paso otra vez";
    if (ejercicio.tipoMovimiento === 'vuelta') {
        if (state.vueltaPaso > 0) {
            return state.vueltaPaso === 1 ? "¡Bien! Ahora atrás ↓" : "¡Bien! Ahora izquierda ←";
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

/* Aviso temporal en el panel. Sin volverMs el aviso es el canonico del
   momento (por ejemplo el "pisa la placa" al armar la pose). */
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

/* Destello de la barra de progreso: verde al contar el paso, rojo
   cuando el toque no vale. Se le quita la clase a la fuerza para que
   una animacion nueva arranque de cero aunque la anterior siga viva. */
function destelloBarra(clase) {
    const cont = document.querySelector('.progress-container');
    if (!cont) return;
    cont.classList.remove('paso-listo', 'paso-fallo');
    void cont.offsetWidth;
    cont.classList.add(clase);
    setTimeout(() => cont.classList.remove(clase), 700);
}

/* El hint de placas: flechas que dicen qué se pisa en el ejercicio
   actual. `apretada` las enciende (pulsacion pendiente de confirmar). */
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

/* El hint de La Vuelta: las tres flechas en orden (→ ↓ ←). La que
   toca ahora lleva `sigue` (late); las ya pisadas quedan apagadas. */
function pintarHintVuelta(pasosDados) {
    const hint = document.getElementById('placa-hint');
    if (!hint) return;

    hint.replaceChildren();
    hint.classList.remove('apretada');
    SECUENCIA_VUELTA.forEach((dir, i) => {
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
    // Profundidad base (eje z de MediaPipe) y objetivo de paso:
    // adelante/atrás cuentan cuando |dz ahora - dz base| >= objetivo.
    baseDzPie: state.baseDzPie,
    baseZTobillo: state.baseZTobillo,
    baseDzRodilla: state.baseDzRodilla,
    baseZRodilla: state.baseZRodilla,
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
    /* En modo placa (sin camara) no hay calibracion: la lista carga
       igual porque los pasos los aprueba la placa. Con camara, el
       guard original no deja cargar antes de calibrar. */
    if (!state.placaSolo && state.framesCalibrados < FRAMES_PARA_CALIBRAR) return;

    const videoEl = document.getElementById("ejercicio-video");
    videoEl.src = "";
    if (anuncioPendiente) { clearTimeout(anuncioPendiente); anuncioPendiente = null; }

    const lista = listaEjerciciosEnCurso();
    if (state.ejercicioActualIdx >= lista.length) {
        if (state.audioUnificadoGlobal) state.audioUnificadoGlobal.pause();
        /* Se suelta la camara antes de saltar: si no, el juego empieza
           con el pilotillo de la pantalla anterior todavia encendido. */
        apagarDetector();
        irAPantalla('screen-game');
        return;
    }

    const ejercicio = lista[state.ejercicioActualIdx];

    // El demo por ejercicio manda si lo trae (Merengue y Samba usan sus
    // videos de img/dances/deteccion-bailes). El que no lo trae sale de
    // la propiedad `ejemplos` del baile elegido (arriba de este archivo),
    // así que el paso que se enseña encaja con el estilo que se está
    // aprendiendo. Un baile sin `ejemplos` usa SECUENCIA_POR_DEFECTO.
    const baile = danceOptionsDetector[state.selectedDanceIdx];
    const ejemplos = (baile && baile.ejemplos) || SECUENCIA_POR_DEFECTO;
    const demo = ejercicio.imagen || ejemplos[state.ejercicioActualIdx % ejemplos.length];

    document.getElementById("exercise-instruction-panel").innerText = `¡${ejercicio.nombre}!`;

    // Que se vea desde el arranque qué placa confirma este paso. Los
    // ejercicios de secuencia (La Vuelta y los del samba) muestran la
    // suya entera con la siguiente señalada. En modo SOLO POSE no
    // invitamos a pisar: se oculta la flecha de los pasos sueltos.
    const esSecuencia = ejercicio.tipoMovimiento === 'vuelta'
                     || esEjercicioSecuencia(ejercicio.tipoMovimiento);
    if (SOLO_POSE && !state.placaSolo && !esSecuencia) {
        const hint = document.getElementById('placa-hint');
        if (hint) hint.classList.remove('visible');
    } else if (ejercicio.tipoMovimiento === 'vuelta') pintarHintVuelta(0);
    else if (esEjercicioSecuencia(ejercicio.tipoMovimiento)) pintarHintSecuencia(0);
    else pintarHintPlaca([placaDelEjercicio(ejercicio)]);

    /* El alto y el ancho del VIDEO mandan: al cargar el demo se
       escribe su aspect-ratio real (videoWidth/videoHeight) para que
       la caja copie la forma del clip y no se recorte nada (ver
       #ejercicio-video en css/detector.css). Con onloadedmetadata
       (no addEventListener) se reemplaza en cada demo, sin duplicar
       listeners. Sin clip (caja en negro) no llega a disparar. */
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
        setTimeout(() => {
            state.ejercicioActualIdx++;
            state.repeticionesRealizadas = 0;
            cargarEjercicio();
        }, 1200);
    } else {
        setTimeout(() => { state.positionHeld = false; }, 500);
    }
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
