const DURACION_MAX_JUEGO_S = 40;

function duracionDelBaile(selectedDance) {
    return (selectedDance && selectedDance.duracionMaxSegundos) ?? DURACION_MAX_JUEGO_S;
}


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
        gameAudioStartSeconds: 30, ventanaPerfectoMs: 180,
        bpm: 90,
        duracionMaxSegundos: 30,
        umbralDificil: 2950,
        timing: { duracionScroll: 2.3, inicioY: -200, margenAciertoMs: 800 },
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
        ]),

        mapDificil: createMap(90, 5.333, [
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
        gameAudioStartSeconds: 0, ventanaPerfectoMs: 180,
        bpm: 71,
        duracionMaxSegundos: 30,
        umbralDificil: 3000,
        timing: { duracionScroll: 2.3, inicioY: -200, margenAciertoMs: 1000 },
        map: createMap(71, 5.223, [
                { beat: 0.6, dir: "RIGHT" }, { beat: 2.6, dir: "RIGHT" },
                { beat: 4.6, dir: "RIGHT" }, { beat: 6.6, dir: "RIGHT" },

                
                { beat: 8.6, dir: "RIGHT" }, { beat: 10.6, dir: "UP" },
                { beat: 11.6, dir: "DOWN" }, { beat: 12.6, dir: "UP" },
                { beat: 13.6, dir: "DOWN" },
                { beat: 14.6, dir: "UP" }, { beat: 15.6, dir: "DOWN" },
                { beat: 16.6, dir: "UP" },
                { beat: 17.6, dir: "DOWN" }, 
                { beat: 19.6, dir: "RIGHT" }, { beat: 21.6, dir: "RIGHT" },
                { beat: 23.6, dir: "RIGHT" },
                { beat: 25.6, dir: "RIGHT" }, { beat: 27.6, dir: "RIGHT" },

            ]),

        mapDificil: createMap(71, 5.223, [
                { beat: 0.6, dir: "RIGHT" }, { beat: 1.6, dir: "RIGHT" },
                { beat: 3.6, dir: "RIGHT" }, { beat: 4.6, dir: "RIGHT" },
                { beat: 5.6, dir: "RIGHT" }, { beat: 6.6, dir: "RIGHT" },

                
                { beat: 8.6, dir: "RIGHT" }, { beat: 10.6, dir: "UP" },
                { beat: 11.6, dir: "DOWN" }, { beat: 12.6, dir: "UP" },
                { beat: 13.6, dir: "DOWN" },
                { beat: 14.6, dir: "UP" }, { beat: 15.6, dir: "DOWN" },
                { beat: 16.6, dir: "UP" },
                { beat: 17.6, dir: "DOWN" }, 
                { beat: 19.6, dir: "UP" }, { beat: 20.6, dir: "UP" },
                { beat: 21.6, dir: "LEFT" },
                { beat: 22.6, dir: "LEFT" }, { beat: 23.6, dir: "DOWN" },
                { beat: 24.6, dir: "DOWN" },
                { beat: 25.6, dir: "RIGHT" },
                { beat: 26.6, dir: "RIGHT" },
        ])
    },
    {
        name: "Samba", slug: "samba", song: "../music/dances/samba.mp3",
        gameAudioStartSeconds: 0, ventanaPerfectoMs: 180,
        bpm: 123,
        duracionMaxSegundos: 33,
        umbralDificil: 4000,
        timing: { duracionScroll: 2.3, inicioY: -200, margenAciertoMs: 1000 },
        map: createMap(123, 5.333, [
{ beat: 1, dir: "RIGHT" }, { beat: 3, dir: "RIGHT" },
                { beat: 5, dir: "RIGHT" }, { beat: 7, dir: "RIGHT" },
                { beat: 9, dir: "RIGHT" },
                { beat: 11, dir: "DOWN" }, { beat: 13, dir: "DOWN" },
                { beat: 15, dir: "DOWN" }, { beat: 17, dir: "DOWN" },
                { beat: 19, dir: "DOWN" }, { beat: 21, dir: "DOWN" },
                { beat: 23, dir: "DOWN" }, { beat: 25, dir: "DOWN" },

                { beat: 27, dir: "UP" }, { beat: 29, dir: "DOWN" },
                { beat: 31, dir: "UP" }, { beat: 33, dir: "DOWN" },
                { beat: 35, dir: "UP" }, { beat: 37, dir: "DOWN" },
                { beat: 39, dir: "UP" }, { beat: 41, dir: "DOWN" },

            ]),

        mapDificil: createMap(123, 5.333, [
                { beat: 1, dir: "RIGHT" }, { beat: 3, dir: "RIGHT" },
                { beat: 5, dir: "RIGHT" }, { beat: 7, dir: "RIGHT" },
                { beat: 9, dir: "RIGHT" },
                { beat: 11, dir: "DOWN" }, { beat: 13, dir: "DOWN" },
                { beat: 15, dir: "DOWN" }, { beat: 17, dir: "DOWN" },
                { beat: 19, dir: "DOWN" }, { beat: 21, dir: "DOWN" },
                { beat: 23, dir: "DOWN" }, { beat: 25, dir: "DOWN" },

                { beat: 27, dir: "UP" }, { beat: 29, dir: "DOWN" },
                { beat: 31, dir: "UP" }, { beat: 33, dir: "DOWN" },
                { beat: 35, dir: "UP" }, { beat: 37, dir: "DOWN" },
                { beat: 39, dir: "UP" }, { beat: 41, dir: "DOWN" },
                { beat: 43, dir: "UP" }, { beat: 45, dir: "DOWN" },
                { beat: 47, dir: "UP" }, { beat: 49, dir: "DOWN" },
                { beat: 51, dir: "UP" }, { beat: 53, dir: "DOWN" },
                { beat: 55, dir: "UP" }, { beat: 57, dir: "DOWN" },
                { beat: 59, dir: "UP" }, { beat: 61, dir: "DOWN" },
                { beat: 63, dir: "UP" }, { beat: 65, dir: "DOWN" },
                { beat: 67, dir: "UP" }, { beat: 69, dir: "DOWN" },
                { beat: 71, dir: "UP" }, { beat: 73, dir: "DOWN" },
                { beat: 75, dir: "UP" }, { beat: 77, dir: "DOWN" },
                { beat: 79, dir: "UP" }, { beat: 81, dir: "DOWN" }
        ])
    },
    {
        name: "Flamenco", slug: "flamenco", song: "../music/dances/flamenco.mp3",
        gameAudioStartSeconds: 0, ventanaPerfectoMs: 180,
        bpm: 146,
        duracionMaxSegundos: 30,
        umbralDificil: 3000,
        timing: { duracionScroll: 2.3, inicioY: -200, margenAciertoMs: 400 },
        map: createMap(146, 5.333, [
                { beat: 0, dir: "UP" }, { beat: 1, dir: "DOWN" },
                { beat: 2, dir: "LEFT" }, { beat: 3, dir: "RIGHT" },
                { beat: 4, dir: "UP" }, { beat: 5, dir: "DOWN" },
                { beat: 6, dir: "LEFT" }, { beat: 7, dir: "RIGHT" },
                { beat: 8, dir: "LEFT" }, { beat: 8.5, dir: "LEFT" },
                { beat: 9, dir: "UP" }, { beat: 10, dir: "RIGHT" },
                { beat: 11, dir: "UP" }, { beat: 12, dir: "RIGHT" },
                { beat: 13, dir: "UP" },
                { beat: 14, dir: "LEFT" }, { beat: 15, dir: "UP" },
                { beat: 16, dir: "LEFT" }, { beat: 17, dir: "RIGHT" },
                { beat: 18, dir: "UP" }, { beat: 19, dir: "LEFT" },
                { beat: 20, dir: "UP" }, { beat: 21, dir: "RIGHT" },
                { beat: 22, dir: "UP" },
                { beat: 24, dir: "UP" }, { beat: 24.5, dir: "UP" },
                { beat: 25, dir: "RIGHT" }, { beat: 26, dir: "LEFT" },
                { beat: 27, dir: "UP" }, { beat: 28, dir: "LEFT" },
                { beat: 29, dir: "UP" }, { beat: 30, dir: "RIGHT" },
                { beat: 31, dir: "UP" },
                { beat: 32, dir: "LEFT" }, { beat: 32.5, dir: "LEFT" },
                { beat: 33, dir: "RIGHT" }, { beat: 34, dir: "UP" },
                { beat: 35, dir: "LEFT" }, { beat: 36, dir: "UP" },
                { beat: 37, dir: "RIGHT" }, { beat: 38, dir: "UP" },
                { beat: 39, dir: "LEFT" },
                { beat: 40, dir: "UP" }, { beat: 40.5, dir: "UP" },
                { beat: 41, dir: "RIGHT" }, { beat: 42, dir: "LEFT" },
                { beat: 43, dir: "UP" }, { beat: 44, dir: "UP" },
                { beat: 45, dir: "LEFT" }, { beat: 46, dir: "RIGHT" },
                { beat: 47, dir: "UP" },
                { beat: 48, dir: "RIGHT" }, { beat: 48.5, dir: "RIGHT" },
                { beat: 49, dir: "UP" }, { beat: 50, dir: "LEFT" },
                { beat: 51, dir: "UP" }, { beat: 52, dir: "LEFT" },
                { beat: 53, dir: "UP" }, { beat: 54, dir: "RIGHT" },
                { beat: 55, dir: "UP" },
                { beat: 56, dir: "RIGHT" }, { beat: 57, dir: "LEFT" },
                { beat: 58, dir: "UP" }, { beat: 59, dir: "LEFT" },
                { beat: 60, dir: "UP" }, { beat: 61, dir: "RIGHT" },
                { beat: 62, dir: "UP" }, { beat: 63, dir: "LEFT" },
                { beat: 64, dir: "UP" },
                { beat: 65, dir: "LEFT" }, { beat: 66, dir: "UP" },
                { beat: 67, dir: "RIGHT" }, { beat: 68, dir: "UP" }
            ]),

        mapDificil: createMap(146, 5.333, [
            { beat: 0, dir: "LEFT" },  { beat: 0.5, dir: "RIGHT" },
            { beat: 1, dir: "LEFT" },  { beat: 1.5, dir: "RIGHT" },
            { beat: 2, dir: "UP" },    { beat: 2.5, dir: "DOWN" },
            { beat: 3, dir: "LEFT" },  { beat: 3, dir: "RIGHT" },
            { beat: 4, dir: "UP" },    { beat: 4.5, dir: "DOWN" },
            { beat: 5, dir: "LEFT" },  { beat: 5.5, dir: "RIGHT" },
            { beat: 6, dir: "UP" },    { beat: 6, dir: "DOWN" },
            { beat: 7, dir: "LEFT" },  { beat: 7.5, dir: "RIGHT" },
            { beat: 8, dir: "LEFT" },  { beat: 8.5, dir: "UP" },
            { beat: 9, dir: "RIGHT" }, { beat: 9.5, dir: "DOWN" },
            { beat: 10, dir: "LEFT" }, { beat: 10.5, dir: "UP" },
            { beat: 11, dir: "RIGHT" },{ beat: 11.5, dir: "DOWN" },
            { beat: 12, dir: "LEFT" }, { beat: 12, dir: "RIGHT" },
            { beat: 13, dir: "UP" },   { beat: 13.5, dir: "DOWN" },
            { beat: 14, dir: "LEFT" }, { beat: 14.5, dir: "UP" },
            { beat: 15, dir: "RIGHT" },{ beat: 15.5, dir: "LEFT" },
            { beat: 16, dir: "UP" },   { beat: 16, dir: "DOWN" },
            { beat: 17, dir: "LEFT" }, { beat: 17.5, dir: "RIGHT" },
            { beat: 18, dir: "UP" },   { beat: 18.5, dir: "LEFT" },
            { beat: 19, dir: "DOWN" }, { beat: 19.5, dir: "RIGHT" },
            { beat: 20, dir: "UP" },   { beat: 20, dir: "DOWN" },
            { beat: 21, dir: "LEFT" }, { beat: 21.5, dir: "RIGHT" },
            { beat: 22, dir: "UP" },   { beat: 22.5, dir: "LEFT" },
            { beat: 23, dir: "DOWN" }, { beat: 23.5, dir: "RIGHT" },
            { beat: 24, dir: "LEFT" }, { beat: 24.5, dir: "UP" },
            { beat: 25, dir: "RIGHT" },{ beat: 25.5, dir: "DOWN" },
            { beat: 26, dir: "LEFT" }, { beat: 26.5, dir: "UP" },
            { beat: 27, dir: "RIGHT" },{ beat: 27.5, dir: "DOWN" },
            { beat: 28, dir: "LEFT" }, { beat: 28, dir: "RIGHT" },
            { beat: 29, dir: "UP" },   { beat: 29.5, dir: "DOWN" },
            { beat: 30, dir: "LEFT" }, { beat: 30.5, dir: "RIGHT" },
            { beat: 31, dir: "UP" },   { beat: 31.5, dir: "DOWN" },
            { beat: 32, dir: "LEFT" }, { beat: 32, dir: "RIGHT" },
            { beat: 33, dir: "UP" },   { beat: 33.5, dir: "DOWN" },
            { beat: 34, dir: "LEFT" }, { beat: 34.5, dir: "UP" },
            { beat: 35, dir: "RIGHT" },{ beat: 35.5, dir: "DOWN" },
            { beat: 36, dir: "LEFT" }, { beat: 36, dir: "RIGHT" },
            { beat: 37, dir: "UP" },   { beat: 37.5, dir: "DOWN" },
            { beat: 38, dir: "LEFT" }, { beat: 38.5, dir: "RIGHT" },
            { beat: 39, dir: "UP" },   { beat: 39.5, dir: "DOWN" },
            { beat: 40, dir: "LEFT" }, { beat: 40, dir: "RIGHT" },
            { beat: 41, dir: "UP" },   { beat: 41.5, dir: "DOWN" },
            { beat: 42, dir: "LEFT" }, { beat: 42.5, dir: "RIGHT" },
            { beat: 43, dir: "UP" },   { beat: 43.5, dir: "DOWN" },
            { beat: 44, dir: "LEFT" }, { beat: 44, dir: "RIGHT" },
            { beat: 45, dir: "UP" },   { beat: 45.5, dir: "DOWN" },
            { beat: 46, dir: "LEFT" }, { beat: 46.5, dir: "RIGHT" },
            { beat: 47, dir: "UP" },   { beat: 47.5, dir: "DOWN" },
            { beat: 48, dir: "LEFT" }, { beat: 48, dir: "RIGHT" },
            { beat: 49, dir: "UP" },   { beat: 49.5, dir: "DOWN" },
            { beat: 50, dir: "LEFT" }, { beat: 50.5, dir: "RIGHT" },
            { beat: 51, dir: "UP" },   { beat: 51.5, dir: "DOWN" },
            { beat: 52, dir: "LEFT" }, { beat: 52, dir: "RIGHT" },
            { beat: 53, dir: "UP" },   { beat: 53.5, dir: "DOWN" },
            { beat: 54, dir: "LEFT" }, { beat: 54.5, dir: "UP" },
            { beat: 55, dir: "RIGHT" },{ beat: 55.5, dir: "DOWN" },
            { beat: 56, dir: "LEFT" }, { beat: 56, dir: "RIGHT" },
            { beat: 57, dir: "UP" },   { beat: 57.5, dir: "DOWN" },
            { beat: 58, dir: "LEFT" }, { beat: 58.5, dir: "RIGHT" },
            { beat: 59, dir: "UP" },   { beat: 59.5, dir: "DOWN" },
            { beat: 60, dir: "LEFT" }
        ])
    },
    {
        name: "El Areíto", slug: "areito", song: "../music/dances/areito.mp3",
        gameAudioStartSeconds: 0, ventanaPerfectoMs: 180,
        bpm: 103,
        duracionMaxSegundos: 32,
        umbralDificil: 6000,
        timing: { duracionScroll: 2.3, inicioY: -200, margenAciertoMs: 400 },
        map: createMap(103, 3.2, [
                { beat: 1.0, dir: "UP" }, { beat: 2.0, dir: "UP" },
                { beat: 3.0, dir: "UP" }, { beat: 4.0, dir: "UP" },
                { beat: 5.0, dir: "UP" }, { beat: 6.0, dir: "UP" },
                { beat: 7.0, dir: "UP" }, { beat: 8.0, dir: "UP" },
                { beat: 9.0, dir: "UP" }, { beat: 10.0, dir: "UP" },
                { beat: 11.0, dir: "UP" }, { beat: 12.0, dir: "UP" },

                { beat: 14.0, dir: "UP" }, { beat: 16.0, dir: "UP" },
                { beat: 18.0, dir: "UP" }, { beat: 20.0, dir: "UP" },

                { beat: 22.0, dir: "DOWN" }, { beat: 24.0, dir: "DOWN" },
                { beat: 26.0, dir: "DOWN" }, { beat: 28.0, dir: "DOWN" },

                { beat: 30.0, dir: "LEFT" }, { beat: 32.0, dir: "RIGHT" },
                { beat: 34.0, dir: "LEFT" }, { beat: 36.0, dir: "RIGHT" },
                { beat: 38.0, dir: "LEFT" }, { beat: 40.0, dir: "RIGHT" },
                { beat: 42.0, dir: "LEFT" }, { beat: 44.0, dir: "RIGHT" },

            ]),

        mapDificil: createMap(103, 3.2, [
                { beat: 1.0, dir: "UP" }, { beat: 2.0, dir: "UP" },
                { beat: 3.0, dir: "UP" }, { beat: 4.0, dir: "UP" },
                { beat: 5.0, dir: "UP" }, { beat: 6.0, dir: "UP" },
                { beat: 7.0, dir: "UP" }, { beat: 8.0, dir: "UP" },
                { beat: 9.0, dir: "UP" }, { beat: 10.0, dir: "UP" },
                { beat: 11.0, dir: "UP" }, { beat: 12.0, dir: "UP" },

                { beat: 14.0, dir: "UP" }, { beat: 16.0, dir: "UP" },
                { beat: 18.0, dir: "UP" }, { beat: 20.0, dir: "UP" },

                { beat: 22.0, dir: "DOWN" }, { beat: 24.0, dir: "DOWN" },
                { beat: 26.0, dir: "DOWN" }, { beat: 28.0, dir: "DOWN" },

                { beat: 30.0, dir: "LEFT" }, { beat: 32.0, dir: "RIGHT" },
                { beat: 34.0, dir: "LEFT" }, { beat: 36.0, dir: "RIGHT" },
                { beat: 38.0, dir: "LEFT" }, { beat: 40.0, dir: "RIGHT" },
                { beat: 42.0, dir: "LEFT" }, { beat: 44.0, dir: "RIGHT" },

                { beat: 44.0, dir: "UP" }, { beat: 45.0, dir: "UP" },
                { beat: 46.0, dir: "LEFT" }, { beat: 47.0, dir: "LEFT" },
                { beat: 48.0, dir: "DOWN" }, { beat: 49.0, dir: "DOWN" },
                { beat: 50.0, dir: "RIGHT" }, { beat: 51.0, dir: "RIGHT" }
        ])
    }
];

const imageSources = {
    UP:    "../img/arrow-up.svg",
    DOWN:  "../img/arrow-down.svg",
    LEFT:  "../img/arrow-left.svg",
    RIGHT: "../img/arrow-right.svg"
};

const Z_NOTA = 1000;

function timingsDelBaile(idx) {
    const d = danceOptionsJuego[idx] || {};
    const t = d.timing || {};
    return {
        duracionScroll:   t.duracionScroll   ?? 2.3,
        margenAciertoMs:  t.margenAciertoMs  ?? 400,
        inicioY:          t.inicioY          ?? -200,
        ventanaPerfecto:  d.ventanaPerfectoMs ?? t.ventanaPerfectoMs ?? 150
    };
}

function sumarPuntos(valor) {
    const n = document.getElementById('score-value');
    if (n) n.textContent = valor;
}

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

function multiplicadorDeCombo(combo) {
    if (combo >= 20) return 4;
    if (combo >= 10) return 3;
    if (combo >= 5)  return 2;
    return 1;
}

function subirCombo() {
    state.combo++;
    if (state.combo > state.mejorCombo) state.mejorCombo = state.combo;
    state.multiplicador = multiplicadorDeCombo(state.combo);
    pintarCombo();
    return state.combo;
}

function romperCombo() {
    state.secuenciaVuelta = [];
    if (!state.combo && state.multiplicador === 1) return;
    state.combo = 0;
    state.multiplicador = 1;
    pintarCombo();
}

function cierraVuelta(dir) {
    const sec = state.secuenciaVuelta || (state.secuenciaVuelta = []);
    sec.push(dir);
    if (sec.length > 3) sec.shift();
    if (sec.length === 3 &&
        (sec.join(',') === 'RIGHT,DOWN,LEFT' || sec.join(',') === 'LEFT,DOWN,RIGHT')) {
        sec.length = 0;              
        return true;
    }
    return false;
}

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
        banner.classList.add('activo');
        const enRacha = state.combo >= 3;
        banner.classList.toggle('en-racha', enRacha);
        if (enRacha) {
            banner.classList.remove('pop');
            void banner.offsetWidth;
            banner.classList.add('pop');
        }
    }
}

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

function destellarReceptor(dir, perfecto) {
    const el = document.getElementById('target-' + dir);
    if (!el) return;
    el.classList.remove('golpe-perfecto', 'golpe-bien');
    void el.offsetWidth;                       
    el.classList.add(perfecto ? 'golpe-perfecto' : 'golpe-bien');
}

function mapDelBaile(baile) {
    if (!baile) return [];
    if (state.modoDificil && baile.mapDificil && baile.mapDificil.length) {
        return baile.mapDificil;
    }
    return baile.map || [];
}

function scrollEfectivo() {
    const base = timingsDelBaile(state.selectedDanceIdx).duracionScroll;
    if (state.modoDificil) return Math.max(0.9, base - 0.9);
    const pasos = Math.floor((state.combo || 0) / 3);
    return Math.max(1.15, base - 0.08 * pasos);
}


const APILADO_ESCALON_PCT = 0.55;   
const APILADO_NIVEL_MAX = 3;        

function anchoNota() {
    return Math.min(window.innerWidth * 0.07, window.innerHeight * 0.085);
}

function nivelApilado(dir, gameTime, scroll) {
    let nivel = 0;
    for (const n of state.notes) {
        if (n.dir !== dir || !n.nivel) continue;
        const t = 1 - (n.expectedTime - gameTime) / scroll;
        if (t < 1) nivel = Math.max(nivel, n.nivel + 1);
    }
    return nivel;
}

function offsetApilado(nivel) {
    if (!nivel) return 0;
    const mag = Math.min(nivel, APILADO_NIVEL_MAX);
    const lado = mag % 2 ? 1 : -1;
    return Math.ceil(mag / 2) * anchoNota() * APILADO_ESCALON_PCT * lado;
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
    state.modoDificil = false;
    state.dificilEnCambio = false;
    state.umbralDificil = selectedDance.umbralDificil ?? 3000;
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

    state.gameAudioOffset = state.inicioEfectivo;
    state.audioUnificadoGlobal.play().catch(e => console.error("Error reproduciendo audio del juego:", e));
    state.gameStarted = true;
    requestAnimationFrame(avanzarNotas);
}

function crearNota(dir, expectedTime, gameTime, scroll) {
    const targetBtn = document.getElementById(`target-${dir}`);
    if (!targetBtn || !state.grid) return;

    const caja = targetBtn.getBoundingClientRect();
    const bordePanel = state.grid.getBoundingClientRect().bottom;

    const nivel = nivelApilado(dir, gameTime, scroll);
    const offX = offsetApilado(nivel);

    const noteEl = document.createElement("div");
    noteEl.className = "note";

    const imgEl = document.createElement("img");
    imgEl.src = imageSources[dir];
    noteEl.appendChild(imgEl);

    const yFin = caja.top;
    const yStart = -120;
    noteEl.style.left = (caja.left + offX) + "px";
    noteEl.style.top  = yStart + "px";
    noteEl.style.zIndex = String(Z_NOTA);

    document.body.appendChild(noteEl);
    state.notes.push({
        dir, element: noteEl, expectedTime,
        x: caja.left, yStart, yFin, offX, nivel,
        missY: bordePanel,
        fallada: false
    });
}

function avanzarNotas() {
    if (!state.gameStarted) return;

    const selectedDance = danceOptionsJuego[state.selectedDanceIdx];
    const scroll = scrollEfectivo();
    const gameTime = state.audioUnificadoGlobal
        ? state.audioUnificadoGlobal.currentTime - state.gameAudioOffset : 0;

    if (gameTime >= duracionDelBaile(selectedDance)) {
        terminarJuego(true);
        return;
    }


    if (!state.dificilEnCambio) {
        while (state.videoTriggerIdx < mapDelBaile(selectedDance).length &&
            mapDelBaile(selectedDance)[state.videoTriggerIdx].time <= gameTime) {
            state.videoTriggerIdx++;
        }


        while (state.notaSiguienteIdx < mapDelBaile(selectedDance).length &&
            mapDelBaile(selectedDance)[state.notaSiguienteIdx].time <= gameTime + scroll) {
            const nota = mapDelBaile(selectedDance)[state.notaSiguienteIdx];
            if (nota.time <= duracionDelBaile(selectedDance) && nota.time >= gameTime - 0.2) {
                crearNota(nota.dir, nota.time, gameTime, scroll);
            }
            state.notaSiguienteIdx++;
        }
    }


    for (let i = state.notes.length - 1; i >= 0; i--) {
        const note = state.notes[i];
        const tiempoRestante = note.expectedTime - gameTime;
        const t = 1.0 - (tiempoRestante / scroll);
        const y_actual = note.yStart + ((note.yFin - note.yStart) * t);

        note.element.style.top = y_actual + "px";

        if (note.offX) {
            const cierre = 1 - Math.min(Math.max(t, 0), 1);
            note.element.style.left = (note.x + note.offX * cierre) + "px";
        }

        if (!note.fallada && (y_actual > note.missY || t > 1.2)) {
            romperCombo();
            tocarEfecto('fallar.mp3', 0.3);
            note.fallada = true;
        }

        if (y_actual > window.innerHeight ||
            note.x < -120 || note.x > window.innerWidth + 120) {
            note.element.remove();
            state.notes.splice(i, 1);
        }
    }


    if (state.notaSiguienteIdx >= mapDelBaile(selectedDance).length && state.notes.length === 0) {
        terminarJuego(true);
    } else {
        requestAnimationFrame(avanzarNotas);
    }
}

function activarModoDificil() {
    if (state.modoDificil || !state.gameStarted) return;
    state.modoDificil = true;
    document.body.classList.add('modo-hard');
    state.dificilEnCambio = true;
    state.notaSiguienteIdx = 0;
    state.videoTriggerIdx = 0;
    const audio = state.audioUnificadoGlobal;
    if (audio) audio.pause();
    state.notes.forEach(n => n.element.remove());
    state.notes = [];
    mostrarOverlayDificil().then(() => {
        const audio = state.audioUnificadoGlobal;
        if (audio && state.gameStarted) {
            try { audio.currentTime = state.inicioEfectivo; }
            catch (e) { audio.currentTime = 0; }
            state.gameAudioOffset = state.inicioEfectivo;
            state.dificilEnCambio = false;
            audio.play().catch(e => console.error("Error reanudando el audio del juego:", e));
        }
    });
}

function mostrarOverlayDificil() {
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
        overlay.innerHTML = '<div class="hard-titulo">¡PASOS DIFÍCILES!</div>' +
            '<div class="hard-sub">pasos nuevos y a toda velocidad · no rompas la racha</div>';
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

    const timings = timingsDelBaile(state.selectedDanceIdx);
    const hitTime = (state.audioUnificadoGlobal.currentTime - state.gameAudioOffset) * 1000;


    let bestMatch = -1;
    let smallestDiff = Infinity;

    for (let i = 0; i < state.notes.length; i++) {
        if (state.notes[i].dir === dir && !state.notes[i].fallada) {
            const noteTime = state.notes[i].expectedTime * 1000;
            const diff = Math.abs(hitTime - noteTime);
            if (diff < smallestDiff) { smallestDiff = diff; bestMatch = i; }
        }
    }

    if (bestMatch !== -1) {
        const note = state.notes[bestMatch];
        if (smallestDiff <= timings.ventanaPerfecto) {
            state.aciertosPerfectos = (state.aciertosPerfectos || 0) + 1;
            const combo = subirCombo();
            pintarCombo();
            const base = 100 * state.multiplicador;
            state.score += base;

            const frases = FRASES_COMBO[combo % FRASES_COMBO.length];
            const sub = (!state.modoDificil && combo % 3 === 0) ? frases.sub + ' · más rápido' : frases.sub;

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
        if (!state.modoDificil && state.score >= (state.umbralDificil ?? Infinity)) {
            activarModoDificil();
        }
    }
}

function terminarJuego(navigateToScore = true) {
    document.body.classList.remove('modo-hard');
    state.modoDificil = false;
    state.dificilEnCambio = false;
    state.notes.forEach(note => note.element.remove());
    state.notes = [];
    state.gameStarted = false;
    state.yaTerminoElJuego = true;
    state.videoTriggerIdx = 0;

    if (navigateToScore) {
        guardarSesion();
        irAPantalla('pantalla-score');
    }
}
