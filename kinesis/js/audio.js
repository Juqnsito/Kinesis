
let audioMuteado = false;
try { audioMuteado = localStorage.getItem('kinesis_mute_debug') === '1'; } catch (e) {}

const VOL_ORIG = new Map();

function volumenBase(audio, vol) {
    if (!VOL_ORIG.has(audio)) VOL_ORIG.set(audio, vol);
    return audioMuteado ? 0 : vol;
}

function aplicarMuteA(audio) {
    if (!audio) return;
    if (!VOL_ORIG.has(audio)) VOL_ORIG.set(audio, audio.volume);
    audio.volume = audioMuteado ? 0 : VOL_ORIG.get(audio);
}

function tocarEfecto(file, volume = 0.5) {
    if (typeof audioMuteado !== 'undefined' && audioMuteado) return null;

    const audio = new Audio(`../music/sfx/${file}`);
    audio.volume = volume;
    audio.play().catch(e => console.log("SFX bloqueado:", e));   
    return audio;
}

const aplausos = new Audio("../music/sfx/aplausos.mp3");
aplausos.volume = volumenBase(aplausos, 0.3);

const sfxDTMF = new Audio("../music/sfx/DTMF.mp3");
sfxDTMF.preload = 'auto';
sfxDTMF.volume = volumenBase(sfxDTMF, 0.3);

function pararAudioDeLaPagina() {
    sfxDTMF.pause();
    sfxDTMF.currentTime = 0;

    aplausos.pause();

    if (state.audioUnificadoGlobal) {
        state.audioUnificadoGlobal.pause();
    }
}

window.addEventListener('pagehide', pararAudioDeLaPagina);

function alternarMuteDebug() {
    audioMuteado = !audioMuteado;
    try { localStorage.setItem('kinesis_mute_debug', audioMuteado ? '1' : '0'); } catch (e) {}

    aplicarMuteA(aplausos);
    aplicarMuteA(sfxDTMF);
    try {
        if (typeof state !== 'undefined') aplicarMuteA(state.audioUnificadoGlobal);
    } catch (e) {}

    const btn = document.getElementById('debug-mute-btn');
    if (btn) btn.textContent = audioMuteado ? '🔇 Mute: ON' : '🔊 Mute: OFF';
    return audioMuteado;
}