
const CLAVE_INICIALES = 'kinesis_iniciales';

let datosPartida = null;  
let nombreMontado = false;

function leerNombreGuardado() {
    try { return normalizarIniciales(localStorage.getItem(CLAVE_INICIALES) || ''); }
    catch { return ''; }
}

function recordarIniciales() {
    const input = document.getElementById('pc-nombre');
    state.scoreIniciales = normalizarIniciales(input ? input.value : state.scoreIniciales);
    try { localStorage.setItem(CLAVE_INICIALES, state.scoreIniciales); } catch {}
    if (datosPartida) {
        cambiarInicialesGuardadas(datosPartida.slug, datosPartida.puntos, state.scoreIniciales);
        calcularPuesto(datosPartida.slug, datosPartida.nombre, datosPartida.puntos,
                          state.scoreIniciales, true);
    }
}

let volverMontado = false;
function montarBotonVolver() {
    if (volverMontado) return;
    const btn = document.getElementById('restartBtn');
    if (!btn) return;
    btn.addEventListener('click', volverAlInicio);
    volverMontado = true;
}

let teclaMontada = false;

function activarIniciales() {
    state.scoreIniciales = leerNombreGuardado();
    const input = document.getElementById('pc-nombre');
    if (input && !nombreMontado) {
        nombreMontado = true;
        if (state.scoreIniciales !== 'AAA') input.value = state.scoreIniciales;
        input.addEventListener('input', recordarIniciales);
    }
    if (!teclaMontada) {
        teclaMontada = true;
        window.tecladoOcupadoPorLaPagina = true;
    }
}

function volverAlInicio() {
    aplausos.pause();
    aplausos.currentTime = 0;
    if (state.audioUnificadoGlobal) { state.audioUnificadoGlobal.pause(); state.audioUnificadoGlobal = null; }

    setTimeout(() => tocarEfecto('BackMainMenu.wav', 0.4), 350);

    state.gameStarted = false;
    state.enCooldown = false;
    state.positionHeld = false;
    state.score = 0;
    state.aciertosPerfectos = 0;
    state.combo = 0;
    state.mejorCombo = 0;
    state.multiplicador = 1;
    state.modoDificil = false;
    datosPartida = null;

    guardarSesion();
    irAPantalla(RESTART_SCREEN, true);   
}

function banderaDelBaile(baile) {
    if (baile.pais) return `../img/paises/${baile.pais}.webp`;

    const continente = String(baile.continent || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');   
    return `../img/continent/${continente || 'europa'}.webp`;
}

function pintarTarjetaScore() {
    const { slug, nombre } = baileJugado();
    const baile = danceOptionsRegistro[state.selectedDanceIdx] || {};

    const cover = document.getElementById('pc-cover-img');
    if (cover) cover.src = banderaDelBaile(baile);


    const dn = document.getElementById('pc-dance-nombre');
    if (dn) dn.textContent = nombre;

    const ff = document.getElementById('pc-funfact');
    if (ff) ff.textContent = baile.funfact || `Esta vez te tocó ${nombre}.`;

    datosPartida = { slug, nombre, puntos: state.score };

    activarIniciales();

    const yaEstabaGuardada = state.partidaGuardada === `${slug}:${state.score}`;

    if (yaEstabaGuardada) {
        calcularPuesto(slug, nombre, state.score, state.scoreIniciales, true);
    } else {
        calcularPuesto(slug, nombre, state.score, state.scoreIniciales);
    }

    state.partidaGuardada = `${slug}:${state.score}`;

    const rating = document.getElementById('pc-rating');
    if (rating) rating.textContent = state.score;

}
