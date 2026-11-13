/* Duracion maxima de la parte de juego (desde el ¡GO!), en segundos.
   40 por defecto. Cada baile puede traer su propio valor con
   `duracionMaxSegundos` dentro del objeto de danceOptionsJuego;
   si no lo trae, vale este de abajo. */
const DURACION_MAX_JUEGO_S = 40;

/* La duracion en curso sale del baile: el objeto de danceOptionsJuego
   lleva (opcional) su duracionMaxSegundos. */
function duracionDelBaile(selectedDance) {
    return (selectedDance && selectedDance.duracionMaxSegundos) ?? DURACION_MAX_JUEGO_S;
}

/* Bailes del juego: el time se calcula por BPM, la dir la eliges tu.
   Mismo orden en todos los archivos: selectedDanceIdx es compartido. */

const createMap = (bpm, offset, notes) => {
  const beatDuration = 60 / bpm;
  return notes.map(note => ({
    time: Number((offset + (note.beat * beatDuration)).toFixed(3)),
    dir: note.dir
  }));
};

const danceOptionsJuego = [
    {
        name: "Salsa", slug: "salsa", song: "../music/dances/salsa.mp3",
        gameAudioStartSeconds: 0, ventanaPerfectoMs: 180, vueltas: 1, margenHard: 15,
        duracionMaxSegundos: 30,
        timing: { duracionScroll: 2.6, inicioY: -200, margenAciertoMs: 400 },
        map: createMap(90, 5.333, [
            { beat: 0, dir: "LEFT" }, { beat: 2, dir: "DOWN" },
            { beat: 4, dir: "RIGHT" }, { beat: 6, dir: "UP" },
            { beat: 8, dir: "DOWN" }, { beat: 10, dir: "LEFT" },
            { beat: 12, dir: "UP" }, { beat: 14, dir: "RIGHT" },
            { beat: 16, dir: "DOWN" }, { beat: 18, dir: "UP" },
            { beat: 20, dir: "LEFT" }, { beat: 22, dir: "RIGHT" },
            { beat: 24, dir: "DOWN" }, { beat: 26, dir: "LEFT" },
            { beat: 28, dir: "UP" }, { beat: 30, dir: "DOWN" },
            { beat: 32, dir: "RIGHT" }, { beat: 34, dir: "LEFT" },
            { beat: 36, dir: "UP" }, { beat: 38, dir: "LEFT" },
            { beat: 40, dir: "RIGHT" }, { beat: 42, dir: "UP" },
            { beat: 44, dir: "LEFT" }, { beat: 46, dir: "DOWN" }
        ])
    },
    {
        name: "Merengue", slug: "merengue", song: "../music/dances/merengue.mp3",
        gameAudioStartSeconds: 0.2, ventanaPerfectoMs: 180, vueltas: 1, margenHard: 15,
        duracionMaxSegundos: 30,
        timing: { duracionScroll: 2.6, inicioY: -200, margenAciertoMs: 400 },
        map: createMap(142.1, 5.223, [
   
            { beat: 0,  dir: "RIGHT" },  { beat: 2,  dir: "RIGHT" },
            { beat: 4,  dir: "RIGHT" },    { beat: 6, dir: "RIGHT" },
            { beat: 8, dir: "RIGHT" },  { beat: 10, dir: "RIGHT" },
            { beat: 12, dir: "RIGHT" },{ beat: 14, dir: "RIGHT" },    
            { beat: 22, dir: "UP" },  { beat: 24, dir: "UP" },
            { beat: 26, dir: "LEFT" },{ beat: 28, dir: "LEFT" },  
            { beat: 30, dir: "DOWN" }, { beat: 32, dir: "DOWN" },
            { beat: 34, dir: "RIGHT" }, { beat: 36, dir: "RIGHT" },
            { beat: 38, dir: "UP" }, { beat: 40, dir: "DOWN" },
            { beat: 42, dir: "UP" }, { beat: 44, dir: "DOWN" },
            { beat: 46, dir: "UP" }, { beat: 48, dir: "DOWN" },
             { beat: 50, dir: "UP" }, { beat: 52, dir: "DOWN" },
            { beat: 54, dir: "UP" }, { beat: 56, dir: "DOWN" }
        ])
    },
    {
        name: "Samba", slug: "samba", song: "../music/dances/samba.mp3",
        gameAudioStartSeconds: 0, ventanaPerfectoMs: 180, vueltas: 1, margenHard: 15,
        duracionMaxSegundos: 33,
        timing: { duracionScroll: 2.6, inicioY: -200, margenAciertoMs: 400 },
        map: createMap(123, 5.333, [
         
            { beat: 0, dir: "RIGHT" }, { beat: 2, dir: "RIGHT" },
            { beat: 4, dir: "RIGHT" }, { beat: 6, dir: "RIGHT" },
            { beat: 8, dir: "RIGHT" }, { beat: 10, dir: "RIGHT" },
            { beat: 11.7, dir: "DOWN" }, { beat: 13.7, dir: "DOWN" },
            { beat: 15.7, dir: "DOWN" }, { beat: 17.7, dir: "DOWN" },
            { beat: 19.7, dir: "DOWN" }, { beat: 21.7, dir: "DOWN" },
            { beat: 23.7, dir: "DOWN" }, { beat: 25.7, dir: "DOWN" },
            { beat: 28, dir: "UP" }, { beat: 30, dir: "DOWN" },
            { beat: 32, dir: "UP" }, { beat: 34, dir: "DOWN" },
            { beat: 36, dir: "UP" }, { beat: 38, dir: "DOWN" },
            { beat: 40, dir: "UP" }, { beat: 42, dir: "DOWN" },
            { beat: 44, dir: "UP" }, { beat: 46, dir: "DOWN" },
            { beat: 48, dir: "UP" }, { beat: 50, dir: "DOWN" },
            { beat: 52, dir: "UP" }, { beat: 54, dir: "DOWN" },
            { beat: 56, dir: "UP" }, { beat: 58, dir: "DOWN" },
        ])
    },
    {
        name: "Flamenco", slug: "flamenco", song: "../music/dances/flamenco.mp3",
        gameAudioStartSeconds: 0, ventanaPerfectoMs: 180, vueltas: 1, margenHard: 15,
        duracionMaxSegundos: 30,
        timing: { duracionScroll: 2.6, inicioY: -200, margenAciertoMs: 400 },
        map: createMap(146, 5.333, [
            { beat: 0,  dir: "UP" },    { beat: 2,  dir: "LEFT" },
            { beat: 4,  dir: "RIGHT" }, { beat: 6,  dir: "UP" },
            { beat: 8,  dir: "LEFT" },  { beat: 10, dir: "UP" },
            { beat: 12, dir: "RIGHT" }, { beat: 14, dir: "UP" },
            { beat: 16, dir: "LEFT" },  { beat: 18, dir: "RIGHT" },
            { beat: 20, dir: "UP" },    { beat: 22, dir: "LEFT" },
            { beat: 24, dir: "UP" },    { beat: 26, dir: "RIGHT" },
            { beat: 28, dir: "LEFT" },  { beat: 30, dir: "UP" },
            { beat: 32, dir: "LEFT" },  { beat: 34, dir: "RIGHT" },
            { beat: 36, dir: "UP" },    { beat: 38, dir: "LEFT" },
            { beat: 40, dir: "UP" },    { beat: 42, dir: "RIGHT" },
            { beat: 44, dir: "UP" },    { beat: 46, dir: "LEFT" },
            { beat: 48, dir: "RIGHT" }, { beat: 50, dir: "UP" },
            { beat: 52, dir: "LEFT" },  { beat: 54, dir: "UP" },
            { beat: 56, dir: "RIGHT" }, { beat: 58, dir: "LEFT" },
            { beat: 60, dir: "UP" },    { beat: 62, dir: "RIGHT" },
            { beat: 64, dir: "UP" },    { beat: 66, dir: "LEFT" },
            { beat: 68, dir: "UP" }
        ])
    },
    {

        name: "El Areíto", slug: "areito", song: "../music/dances/areito.mp3",
        gameAudioStartSeconds: 0, ventanaPerfectoMs: 180, vueltas: 1, margenHard: 15,
        /* Duracion del juego en segundos: corta la partida cuando
           llega. Cambia el numero para ajustar; cada baile lleva el
           suyo asi que ninguno depende del valor global. */
        duracionMaxSegundos: 32,
        timing: { duracionScroll: 2.6, inicioY: -200, margenAciertoMs: 400 },
        map: createMap(103, 3.2, [
            /* Ciclo 1: doble adelante, adelante, atras, lados, vuelta */
            { beat: 1,  dir: "UP" },   { beat: 2,  dir: "UP" },
            { beat: 3,  dir: "UP" },   { beat: 4,  dir: "UP" },
            { beat: 5,  dir: "UP" },{ beat: 6,  dir: "UP" },
            { beat: 7, dir: "UP" },   { beat: 8, dir: "UP" },
            { beat: 9, dir: "UP" }, { beat: 10, dir: "UP" },

            { beat: 12, dir: "UP" },   { beat: 14, dir: "UP" },
            { beat: 16, dir: "UP" },   { beat: 18, dir: "UP" },
            { beat: 20, dir: "DOWN" },{ beat: 22, dir: "DOWN" },
            { beat: 24, dir: "DOWN" },   { beat: 26, dir: "DOWN" },
            { beat: 28, dir: "RIGHT" }, { beat: 30, dir: "LEFT" },
            { beat: 32, dir: "RIGHT" }, { beat: 34, dir: "LEFT" },
            { beat: 36, dir: "RIGHT" }, { beat: 38, dir: "LEFT" },
            { beat: 40, dir: "RIGHT" }, { beat: 42, dir: "LEFT" },
            { beat: 44, dir: "UP" }, { beat: 46, dir: "UP" },
            { beat: 48, dir: "LEFT" }, { beat: 50, dir: "LEFT" },
            { beat: 52, dir: "DOWN" }, { beat: 54, dir: "DOWN" },
            { beat: 56, dir: "RIGHT" }, { beat: 58, dir: "RIGHT" },


        ])
    }
];

/* Flechas y timing. Solo los usa el juego. */
const imageSources = {
    UP:    "../img/arrow-up.svg",
    DOWN:  "../img/arrow-down.svg",
    LEFT:  "../img/arrow-left.svg",
    RIGHT: "../img/arrow-right.svg"
};

/* El timing es individual por baile: cada objeto de danceOptionsJuego lleva
   su propio bloque `timing`. Los ?? son red de seguridad por si a un
   baile le falta un campo; para sincronizar un baile se edita su `timing`. */
function timingsDelBaile(idx) {
    const d = danceOptionsJuego[idx] || {};
    const t = d.timing || {};
    return {
        duracionScroll:   t.duracionScroll   ?? 1.982,
        margenAciertoMs:  t.margenAciertoMs  ?? 400,
        inicioY:          t.inicioY          ?? -200,
        ventanaPerfecto:  d.ventanaPerfectoMs ?? t.ventanaPerfectoMs ?? 150
    };
}

// Escribe el puntaje en el numero del marcador de cristal
function sumarPuntos(valor) {
    const n = document.getElementById('score-value');
    if (n) n.textContent = valor;
}

/* Frases del aviso. Rotan segun el combo para que no se repita siempre
   la misma palabra: el titulo va en mayusculas y el subtitulo explica. */
const FRASES_COMBO = [
    { titulo: '¡PERFECT!',    clase: 'perfecto', sub: 'spot on' },
    { titulo: '¡WELL DONE!', clase: 'perfecto', sub: 'keep going' },
    { titulo: '¡NICE!',       clase: 'perfecto', sub: 'on time' },
    { titulo: '¡DOUBLE!',     clase: 'combo',    sub: 'x2 chained' },
    { titulo: '¡SUPERB!',     clase: 'combo',    sub: 'flawless' },
    { titulo: '¡ON A ROLL!',  clase: 'combo',    sub: 'dont stop' },
    { titulo: '¡UNSTOPPABLE!',clase: 'oro',      sub: 'x3 in a row' },
    { titulo: '¡MAGICAL!',    clase: 'oro',      sub: 'next level' },
    { titulo: '¡MAGNIFICENT!',clase: 'oro',      sub: 'x4 combo' },
    { titulo: '¡INCREDIBLE!', clase: 'oro',      sub: 'nobody can stop you' },
];

/* Multiplicador por combo: x1 hasta 5 perfectos, x2 hasta 10,
   x3 hasta 20 y x4 a partir de 20. */
function multiplicadorDeCombo(combo) {
    if (combo >= 20) return 4;
    if (combo >= 10) return 3;
    if (combo >= 5)  return 2;
    return 1;
}

// Sube el combo y recalcula el multiplicador
function subirCombo() {
    state.combo++;
    if (state.combo > state.mejorCombo) state.mejorCombo = state.combo;
    state.multiplicador = multiplicadorDeCombo(state.combo);
    pintarCombo();
    return state.combo;
}

// Rompe la racha: se llama en cualquier acierto que no sea perfecto
// y cuando se escapa una flecha sin tocarla
function romperCombo() {
    /* La cadena de la vuelta muere con la racha: si se conserva
       encadenaria un giro falso a traves de una nota fallada. */
    state.secuenciaVuelta = [];
    if (!state.combo && state.multiplicador === 1) return;
    state.combo = 0;
    state.multiplicador = 1;
    pintarCombo();
}

/* Vigila la vuelta del merengue: guarda las ultimas 3 direcciones
   perfectas seguidas y devuelve true si cierran el giro completo
   (→ ↓ ← o ← ↓ →). Se usa para el aviso especial '¡LA VUELTA!'. */
function cierraVuelta(dir) {
    const sec = state.secuenciaVuelta || (state.secuenciaVuelta = []);
    sec.push(dir);
    if (sec.length > 3) sec.shift();
    if (sec.length === 3 &&
        (sec.join(',') === 'RIGHT,DOWN,LEFT' || sec.join(',') === 'LEFT,DOWN,RIGHT')) {
        sec.length = 0;              // el giro ya se celebro: arranca limpio
        return true;
    }
    return false;
}

// Pinta el estado del combo en el banner y junto a los puntos.
// El panel izquierdo es el marcador de PASOS: siempre visible, con el
// total de aciertos arriba en grande y la racha debajo.
function pintarCombo() {
    const banner = document.getElementById('combo-banner');
    const num    = document.getElementById('combo-num');
    const pasos  = document.getElementById('pasos-num');
    const chip   = document.getElementById('score-combo');
    const chipX  = document.getElementById('combo-x');

    const chipBox = document.getElementById('score-display');
    if (chipBox) chipBox.classList.toggle('combo-alto', state.multiplicador >= 2);

    if (num) num.textContent = state.combo;
    if (pasos) pasos.textContent = state.aciertosPerfectos || 0;
    if (chip) chip.textContent = state.multiplicador > 1 ? 'x' + state.multiplicador : '';
    if (chipX) chipX.textContent = state.multiplicador > 1 ? 'x' + state.multiplicador : '';

    if (banner) {
        // El panel de PASOS siempre se ve: el pop solo salta en racha.
        banner.classList.add('activo');
        const enRacha = state.combo >= 3;
        banner.classList.toggle('en-racha', enRacha);
        if (enRacha) {
            // Reinicia la animacion para que salte cada vez
            banner.classList.remove('pop');
            void banner.offsetWidth;
            banner.classList.add('pop');
        }
    }
}

/* Aviso grande tipo recreativa. Se crea el texto, se muestra y se
   borra solo al terminar la animacion. */
function mostrarAviso(texto, clase, subtitulo) {
    const box = document.getElementById('hit-feedback');
    if (!box) return;
    box.innerHTML =
        '<span class="aviso ' + clase + '">' + texto + '</span>' +
        (subtitulo ? '<span class="aviso-sub">' + subtitulo + '</span>' : '');
    box.classList.remove('anim');
    void box.offsetWidth;
    box.classList.add('anim');
}

/* Enciende el pulsador que acaba de pulsarse: es el feedback de que
   el acierto fue recibido y de si fue perfecto o no. */
function destellarReceptor(dir, perfecto) {
    const el = document.getElementById('target-' + dir);
    if (!el) return;
    el.classList.remove('golpe-perfecto', 'golpe-bien');
    void el.offsetWidth;                       // reinicia la animacion
    el.classList.add(perfecto ? 'golpe-perfecto' : 'golpe-bien');
}

/* Velocidad efectiva de caida. En normal, cada 3 perfectos seguidos
   las flechas caen un poco mas rapido (0.08 s menos de scroll por
   tramo, suelo en 1.15 s). En hard (vuelta 2+) la velocidad es fija y
   alta desde el inicio hasta el final: base menos 0.9 s con suelo en
   0.9 s, sin aceleracion por combo. No se sale del ritmo en ningun
   caso: la posicion de cada nota sale del reloj de la cancion, el
   scroll solo cambia lo rapido que se ve caer y con cuanta antelacion
   aparece. */
function scrollEfectivo() {
    const base = timingsDelBaile(state.selectedDanceIdx).duracionScroll;
    if (state.vueltaActual >= 2) return Math.max(0.9, base - 0.9);
    const pasos = Math.floor((state.combo || 0) / 3);
    return Math.max(1.15, base - 0.08 * pasos);
}

/* Maximo teorico de una vuelta: las N notas todas perfectas, con su
   combo y su multiplicador. Es la referencia del umbral hard. */
function maxTeorico(numNotas) {
    let total = 0;
    for (let combo = 1; combo <= numNotas; combo++) {
        total += 100 * multiplicadorDeCombo(combo);
    }
    return total;
}

async function empezarJuego() {
    if (state.gameStarted) return;

    const selectedDance = danceOptionsJuego[state.selectedDanceIdx];
    document.getElementById('dance-title-game').innerText = selectedDance.name;


    state.notes = [];
    state.notaSiguienteIdx = 0;
    state.videoTriggerIdx = 0;
    state.score = 0;
    state.aciertosPerfectos = 0;
    state.yaTerminoElJuego = false;
    state.combo = 0;
    state.mejorCombo = 0;
    state.multiplicador = 1;
    state.vueltaActual = 1;
    /* Umbral para abrir la 2ª vuelta en hard: el maximo teorico de la
       1ª vuelta (10 perfectas con su combo) menos el margen del baile. */
    state.umbralHard = maxTeorico(selectedDance.map.length) - (selectedDance.margenHard ?? 15);
    pintarCombo();
    sumarPuntos(0);


    let overlay = document.getElementById("game-sequence-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "game-sequence-overlay";
        Object.assign(overlay.style, {
            position: "absolute", top: "0", left: "0", width: "100%", height: "100%",


            backgroundColor: "rgba(9, 22, 42, 0.55)",
            display: "flex", justifyContent: "center",
            alignItems: "center", zIndex: "1000", transition: "background-color 0.5s ease",
            flexDirection: 'column'
        });
        document.getElementById('screen-game').appendChild(overlay);
    }
    overlay.style.display = "flex";
    overlay.style.backgroundColor = "rgba(9, 22, 42, 0.55)";
    overlay.innerHTML = `<div style="font-family: var(--font-apple); font-size: clamp(48px, 9vh, 110px); font-weight: 700; letter-spacing: -0.03em; color: #ffffff; text-shadow: 0 4px 30px rgba(0,0,0,0.45);">¡Prepárate!</div>`;


    if (state.audioUnificadoGlobal) {
        state.audioUnificadoGlobal.pause();
        state.audioUnificadoGlobal = null;
    }
    state.audioUnificadoGlobal = new Audio(selectedDance.song);
    state.audioUnificadoGlobal.volume = volumenBase(state.audioUnificadoGlobal, 0.5);

    const countdownPromise = new Promise(resolve => {
        setTimeout(() => {
            overlay.innerHTML = "";
            const countdownEl = document.createElement("div");
            Object.assign(countdownEl.style, {


                fontSize: "clamp(90px, 20vh, 190px)",
                fontFamily: "var(--font-apple)",
                fontWeight: "700",
                letterSpacing: "-0.04em",
                color: "#ffffff",
                textShadow: "0 0 60px rgba(112, 215, 255, 0.8), 0 4px 30px rgba(0,0,0,0.45)"
            });
            overlay.appendChild(countdownEl);

            let segundos = 3;
            tocarEfecto("321.mp3", 0.3);
            countdownEl.innerText = segundos;

            const intervalo = setInterval(() => {
                segundos--;
                if (segundos > 0) {
                    tocarEfecto("321.mp3", 0.3);
                    countdownEl.innerText = segundos;
                } else if (segundos === 0) {
                    tocarEfecto("go.mp3", 0.3);
                    countdownEl.innerText = "¡GO!";
                    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
                } else {
                    clearInterval(intervalo);
                    overlay.style.display = "none";
                    resolve();
                }
            }, 1000);
        }, 2000);
    });

    /* Cada baile dice desde que segundo arranca su cancion en el juego
       (gameAudioStartSeconds). La musica entra ahora cuando TERMINA el
       conteo (mas abajo, tras await countdownPromise), y el gameTime es
       "segundos desde ese instante": el offset es solo el arranque del
       audio, sin regla manual. Asi los time del map cuentan desde el
       fin del conteo: la primera flecha cae en su time del mapa, que
       para el areito sale del offset del createMap.
       Red de seguridad: si el arranque pedido cae fuera de la cancion
       (pide el 66 en un mp3 de 60 s), se baja a 0 en cuanto se conocen
       los metadatos, que siempre llegan antes de que acabe la cuenta
       atras. Sin esto la cancion terminaria al instante y el juego no
       avanzaria. */
    state.inicioEfectivo = selectedDance.gameAudioStartSeconds ?? 0;
    try { state.audioUnificadoGlobal.currentTime = state.inicioEfectivo; }
    catch (e) { state.audioUnificadoGlobal.currentTime = 0; }
    state.audioUnificadoGlobal.addEventListener('loadedmetadata', () => {
        const audio = state.audioUnificadoGlobal;
        const dur = audio ? audio.duration : NaN;
        if (Number.isFinite(dur) && state.inicioEfectivo >= dur - 5) {
            console.warn('gameAudioStartSeconds fuera de la cancion: se arranca desde 0');
            state.inicioEfectivo = 0;
            try { audio.currentTime = 0; } catch (e) {}
        }
    }, { once: true });
    await countdownPromise;

    /* TODO arranca JUNTO aqui, al terminar el conteo: la musica entra
       en este mismo instante (se estaba preparando antes, pero sonaba
       ya durante el 3-2-1: aca se lanza el play), y ese instante ES el
       segundo 0 del gameTime. Lo que hace que las flechas caigan antes
       o despues ya no lo decide el offset: lo decide cuandoCae, poniendo
       la primera nota del mapa alli donde el jugador quiera. */
    state.gameAudioOffset = state.inicioEfectivo;
    state.audioUnificadoGlobal.play().catch(e => console.error("Error reproduciendo audio del juego:", e));
    state.gameStarted = true;
    requestAnimationFrame(avanzarNotas);
}

function crearNota(dir, expectedTime) {
    const targetBtn = document.getElementById(`target-${dir}`);
    if (!targetBtn || !state.grid) return;

    /* Fuera de absolutamente todo: la nota vive en el body, no dentro
       del panel ni de ningun otro div. Sus coordenadas son de la
       ventana (position:fixed, ver .note en juego.css), asi que cae por
       la pagina entera, por encima de lo que sea (z-index 1000). */
    const caja = targetBtn.getBoundingClientRect();
    const bordePanel = state.grid.getBoundingClientRect().bottom;

    const noteEl = document.createElement("div");
    noteEl.className = "note";

    const imgEl = document.createElement("img");
    imgEl.src = imageSources[dir];
    noteEl.appendChild(imgEl);

    const yFin = caja.top;
    /* La flecha nace arriba de la pantalla (fuera de vista) y cae hasta
       el receptor justo en su tiempo, luego sigue hasta salir por abajo.
       Antes nacia a inicioY px del receptor (en el medio) y parecia que
       salia de la nada. */
    const yStart = -120;
    noteEl.style.left = caja.left + "px";
    noteEl.style.top  = yStart + "px";
    noteEl.style.zIndex = "1000";

    document.body.appendChild(noteEl);
    state.notes.push({
        dir, element: noteEl, expectedTime,
        x: caja.left, yStart, yFin,
        /* A esta altura se juzga como escapada (el borde del panel,
           como antes): suena el fallo y rompe la racha, pero la flecha
           SIGUE cayendo hasta el final de la pagina. */
        missY: bordePanel,
        fallada: false
    });
}

function avanzarNotas() {
    if (!state.gameStarted) return;

    const selectedDance = danceOptionsJuego[state.selectedDanceIdx];
    /* La caida acelera con el combo (ver scrollEfectivo): el spawn y la
       posicion usan ese mismo valor para que la nota siga llegando al
       receptor justo en su tiempo de la cancion. */
    const scroll = scrollEfectivo();
    const gameTime = state.audioUnificadoGlobal
        ? state.audioUnificadoGlobal.currentTime - state.gameAudioOffset : 0;

    /* Corte duro al terminar el baile: por defecto 40 s (const de
       arriba), pero cada baile puede traer su propio
       duracionMaxSegundos en danceOptionsJuego. */
    if (gameTime >= duracionDelBaile(selectedDance)) {
        terminarJuego(true);
        return;
    }


    while (state.videoTriggerIdx < selectedDance.map.length &&
        selectedDance.map[state.videoTriggerIdx].time <= gameTime) {
        state.videoTriggerIdx++;
    }


    while (state.notaSiguienteIdx < selectedDance.map.length &&
        selectedDance.map[state.notaSiguienteIdx].time <= gameTime + scroll) {
        const nota = selectedDance.map[state.notaSiguienteIdx];
        /* No se crean notas que caerian despues del corte del baile. */
        if (nota.time <= duracionDelBaile(selectedDance) && nota.time >= gameTime - 0.2) {
            crearNota(nota.dir, nota.time);
        }
        state.notaSiguienteIdx++;
    }


    for (let i = state.notes.length - 1; i >= 0; i--) {
        const note = state.notes[i];
        const tiempoRestante = note.expectedTime - gameTime;
        const t = 1.0 - (tiempoRestante / scroll);
        /* Misma velocidad antes y despues del receptor: al pasar de
           t = 1 la flecha sigue bajando con el mismo ritmo hasta el
           final de la pagina. */
        const y_actual = note.yStart + ((note.yFin - note.yStart) * t);

        note.element.style.top = y_actual + "px";

        /* Una flecha que se pasa sin tocarla. Antes pedia 'miss.mp3', que no
           esta en music/sfx/, asi que el sonido no salia nunca y solo
           quedaba el fallo silencioso de red. Se usa 'fallar.mp3', que
           es el SFX de fallo que ya suena cuando pulsas una flecha
           equivocada: para el jugador las dos cosas son lo mismo, se le
           escapó una nota. */
        /* Se juzga al cruzar el borde del panel (como antes): rompe la
           racha en silencio (sin aviso, que si no spamea) y suena el
           fallo de siempre. La flecha NO se borra aqui: sigue cayendo
           hasta salir de la pagina. */
        if (!note.fallada && (y_actual > note.missY || t > 1.2)) {
            romperCombo();
            tocarEfecto('fallar.mp3', 0.3);
            note.fallada = true;
        }

        /* Se borra del DOM solo cuando ya salio de la pagina (100% del
           ancho y del alto de la ventana). Asi no se acumulan nodos y
           la pagina no se laguea. */
        if (y_actual > window.innerHeight ||
            note.x < -120 || note.x > window.innerWidth + 120) {
            note.element.remove();
            state.notes.splice(i, 1);
        }
    }


    /* Fin del mapa. La 2ª vuelta solo entra en modo hard y solo si al
       cerrar la 1ª se llego al umbral de puntos; si no, la partida se
       cierra aqui (avisando lo que falto) y no se repite nada. */
    if (state.notaSiguienteIdx >= selectedDance.map.length && state.notes.length === 0) {
        const maxVueltas = selectedDance.vueltas ?? 2;
        const desbloqueado = state.vueltaActual > 1 || state.score >= (state.umbralHard ?? Infinity);
        if (state.vueltaActual < maxVueltas && desbloqueado) {
            siguienteVuelta(selectedDance, maxVueltas);
        } else if (state.gameStarted) {
            if (state.vueltaActual === 1 && !desbloqueado) {
                mostrarAviso('¡MODO HARD BLOQUEADO!', 'aviso-fallo',
                    'te faltaron ' + Math.max(0, state.umbralHard - state.score) + ' puntos');
                state.gameStarted = false;
                setTimeout(() => terminarJuego(true), 1500);
            } else {
                terminarJuego(true);
            }
        }
    } else {
        requestAnimationFrame(avanzarNotas);
    }
}

/* Empieza la vuelta siguiente, siempre en modo hard: el body se tiñe
   de rojizo (ver body.modo-hard en juego.css), la cancion vuelve a su
   arranque con 2.5 s de respiro para el anuncio, y el mapa entra de
   nuevo con los puntos y el combo acumulados. */
async function siguienteVuelta(selectedDance, maxVueltas) {
    document.body.classList.add('modo-hard');
    state.vueltaActual++;
    state.notaSiguienteIdx = 0;
    state.videoTriggerIdx = 0;
    try { state.audioUnificadoGlobal.currentTime = state.inicioEfectivo; }
    catch (e) {}
    state.gameAudioOffset = state.inicioEfectivo + 2.5;
    await mostrarOverlayHard();
    requestAnimationFrame(avanzarNotas);
}

/* Pantalla de anuncio del hard, con el mismo estilo que la cuenta de
   3-2-1: titulo grande, subtitulo y sonido. Dura 2.2 s, que caben en
   el respiro del offset sin desincronizar nada. */
function mostrarOverlayHard() {
    return new Promise(resolve => {
        let overlay = document.getElementById('game-sequence-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'game-sequence-overlay';
            Object.assign(overlay.style, {
                position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: '1000', transition: 'background-color 0.5s ease', flexDirection: 'column'
            });
            document.getElementById('screen-game').appendChild(overlay);
        }
        overlay.style.display = 'flex';
        overlay.style.backgroundColor = 'rgba(45, 5, 0, 0.62)';
        overlay.innerHTML = '<div class="hard-titulo">¡HARD MODE!</div>' +
            '<div class="hard-sub">a toda velocidad · no rompas la racha</div>';
        tocarEfecto('go.mp3', 0.5);
        setTimeout(() => { overlay.style.display = 'none'; resolve(); }, 2200);
    });
}

function recibirDireccion(dir) {

    const target = document.getElementById(`target-${dir}`);
    if (target) {
        target.classList.add("active");
        setTimeout(() => target.classList.remove("active"), 100);
    }

    if (!state.gameStarted || !state.audioUnificadoGlobal) return;

    /* Sin offsets: el time del mapa es el que se juzga. Para mover una
       flecha se edita su `time` en el mapa del baile. Las ventanas de
       acierto (perfecto y normal) si se leen del baile: las necesita el
       modo hard y el combo. */
    const timings = timingsDelBaile(state.selectedDanceIdx);
    const hitTime = (state.audioUnificadoGlobal.currentTime - state.gameAudioOffset) * 1000;


    let bestMatch = -1;
    let smallestDiff = Infinity;

    for (let i = 0; i < state.notes.length; i++) {
        /* Las ya falladas siguen cayendo por la pagina pero estan fuera
           de juego: si contaran, pulsar tarde spamearia el aviso FALLÓ. */
        if (state.notes[i].dir === dir && !state.notes[i].fallada) {
            const noteTime = state.notes[i].expectedTime * 1000;
            const diff = Math.abs(hitTime - noteTime);
            if (diff < smallestDiff) { smallestDiff = diff; bestMatch = i; }
        }
    }

    if (bestMatch !== -1) {
        const note = state.notes[bestMatch];
        if (smallestDiff <= timings.ventanaPerfecto) {
            // PERFECTO: sube el combo y los puntos se multiplican
            state.aciertosPerfectos = (state.aciertosPerfectos || 0) + 1;
            const combo = subirCombo();
            /* subirCombo pinta con el contador ya actualizado porque el
               incremento va antes: asi el panel de PASOS no va uno por
               detras. */
            pintarCombo();
            const base = 100 * state.multiplicador;
            state.score += base;

            // El aviso cambia con la racha. Los textos rotan para que la
            // partida no suene repetitiva, siempre en mayusculas como en
            // las recreativas. Cada 3 de combo el subtitulo avisa de que
            // las flechas caen mas rapido (ver scrollEfectivo).
            const frases = FRASES_COMBO[combo % FRASES_COMBO.length];
            /* El aviso de velocidad solo tiene sentido en la vuelta
               normal: en hard ya se va a tope desde el inicio. */
            const sub = (state.vueltaActual < 2 && combo % 3 === 0) ? frases.sub + ' · más rápido' : frases.sub;

            /* Feedback de la vuelta del merengue: si los ultimos 3
               perfectos seguidos cierran el giro (→ ↓ ← o ← ↓ →),
               ese aviso manda sobre el de racha de siempre. */
            if (cierraVuelta(dir)) {
                mostrarAviso('¡LA VUELTA!', 'aviso-oro', 'el giro completo, sin fallar');
            } else {
                mostrarAviso(frases.titulo, 'aviso-' + frases.clase, sub);
            }

            tocarEfecto('acertar.mp3', 0.5);
            note.element.remove();
            state.notes.splice(bestMatch, 1);
            destellarReceptor(dir, true);
        } else if (smallestDiff <= timings.margenAciertoMs) {
            // Acierto normal: cuenta, pero rompe la racha
            state.score += 50;
            romperCombo();
            mostrarAviso('¡SUFICIENTE!', 'aviso-bien', 'con eso vale');
            tocarEfecto('fallar_vrd.mp3', 0.5);
            note.element.remove();
            state.notes.splice(bestMatch, 1);
            destellarReceptor(dir, false);
        } else {
            romperCombo();
            mostrarAviso('¡FALLÓ!', 'aviso-fallo', 'se rompió la racha');
            tocarEfecto('fallar.mp3', 0.5);
        }
        sumarPuntos(state.score);
    }
}

function terminarJuego(navigateToScore = true) {
    /* El modo hard muere con la partida: la pagina de score vuelve a
       sus colores normales aunque el documento sobreviviera. */
    document.body.classList.remove('modo-hard');
    state.notes.forEach(note => note.element.remove());
    state.notes = [];
    state.gameStarted = false;
    state.yaTerminoElJuego = true;
    state.videoTriggerIdx = 0;

    /* Los aplausos no se suenan aqui: al saltar de pagina el documento
       se descarga y el audio se cortaria a mitad. score.html los
       reproduce al llegar (mismo archivo, distinto instante). Aqui lo
       unico que importa es dejar el resultado guardado. */
    if (navigateToScore) {
        guardarSesion();
        irAPantalla('pantalla-score');
    }
}
