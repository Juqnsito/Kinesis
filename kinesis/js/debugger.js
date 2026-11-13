
function esAtajoDebugger(e) {
    if (e.repeat) return false;                       
    const conModificador = e.metaKey || e.ctrlKey || e.altKey;
    const esTecla = e.code === 'KeyD' || e.code === 'KeyQ'
        || ['d', 'q'].includes(String(e.key).toLowerCase());
    return conModificador && esTecla;
}

window.addEventListener('keydown', (e) => {
    if (!esAtajoDebugger(e)) return;
    e.preventDefault();
    e.stopPropagation();
    abrirCerrarPanel();
    console.info('[debugger] panel alterna con Cmd/Ctrl/Alt + D o Q');
}, true);

function montarBotonDebugger() {
    if (document.getElementById('debug-orb')) return;

    const orb = document.createElement('button');
    orb.id = 'debug-orb';
    orb.type = 'button';
    orb.title = 'Debugger · saltar pantallas (Cmd/Ctrl + D o Q)';
    orb.setAttribute('aria-label', 'Abrir panel debugger');
    orb.style.cssText = [
        'position: fixed',
        'bottom: 14px',
        'right: 14px',
        'padding: 10px 16px',
        'border-radius: 999px',
        'border: 2px solid #ffcc00',
        'background: rgba(20, 20, 20, 0.9)',
        'color: #ffcc00',
        'font-family: monospace',
        'font-size: 15px',
        'font-weight: bold',
        'line-height: 1',
        'cursor: pointer',
        'z-index: 100001',
        'box-shadow: 0 6px 18px rgba(0,0,0,0.45)',
        'opacity: 0.95'
    ].join('; ');
    orb.innerText = '🛠️ DEBUG';
    orb.addEventListener('click', (e) => {
        e.stopPropagation();
        console.info('[debugger] clic en el boton DEBUG');
        try {
            abrirCerrarPanel();
        } catch (err) {
            console.error('[debugger] error al abrir el panel:', err);
            orb.innerText = '❌ ' + err.message;
            orb.style.borderColor = '#ff4d4d';
            orb.style.color = '#ff4d4d';
        }
    });
    orb.addEventListener('mouseenter', () => { orb.style.opacity = '1'; });
    orb.addEventListener('mouseleave', () => { orb.style.opacity = '0.95'; });

    document.body.appendChild(orb);
    console.info('[debugger] boton DEBUG montado, listo para clic');
}

if (document.body) montarBotonDebugger();
else document.addEventListener('DOMContentLoaded', montarBotonDebugger, { once: true });

const PAGINAS_DEBUG = [
    { id: 'connect',         etiqueta: '0. Conectar Placa' },
    { id: 'screen-camara',   etiqueta: '0.5. Elegir Camara' },
    { id: 'screen-cta',      etiqueta: '1. Inicio' },
    { id: 'screen-elegir',   etiqueta: '2. Elegir Baile' },
    { id: 'screen-detector', etiqueta: '3. Detector AI' },
    { id: 'screen-game',     etiqueta: '4. Juego' },
    { id: 'pantalla-score',  etiqueta: '5. Score' }
];

function asegurarPanelDebug() {
    let debugPanel = document.getElementById('game-debugger');
    if (debugPanel) return debugPanel;
    debugPanel = document.createElement('div');
    debugPanel.id = 'game-debugger';
    debugPanel.style.cssText = 'display: none; position: fixed; top: 20px; right: 20px;'
        + ' background-color: rgba(20, 20, 20, 0.95); color: white;'
        + ' border: 2px solid #ffcc00; border-radius: 10px; padding: 15px;'
        + ' z-index: 100000; font-family: monospace; flex-direction: column;'
        + ' gap: 8px; box-shadow: 0px 10px 25px rgba(0,0,0,0.5); width: 180px;';
    (document.body || document.documentElement).appendChild(debugPanel);
    return debugPanel;
}

function abrirCerrarPanel() {
    const debugPanel = asegurarPanelDebug();
    if (debugPanel.style.display === "none" || debugPanel.style.display === "") {
        debugPanel.style.display = "flex";
        console.info('[debugger] panel ABIERTO');
        if (!debugPanel.innerHTML) {
            const muteOn = (typeof audioMuteado !== 'undefined') && audioMuteado;
            debugPanel.innerHTML = `
                <div style="font-weight:bold; margin-bottom:10px; border-bottom:1px solid #555; padding-bottom:5px; color:#ffcc00;">🛠️ Panel Debugger</div>
                <button style="color:#70d7ff; border-color:#70d7ff;" onclick="window.debugIrA(pantallaSiguiente())">⏭ Saltar a la siguiente pantalla</button>
                ${PAGINAS_DEBUG.map(p =>
                    `<button onclick="window.debugIrA('${p.id}')">${p.etiqueta}</button>`
                ).join('')}
                <button id="debug-mute-btn" onclick="window.alternarMuteDebug()">${muteOn ? '🔇 Mute: ON' : '🔊 Mute: OFF'}</button>
                <button id="debug-borrar-puntos" style="color:#ff9500; border-color:#ff9500;" onclick="window.debugBorrarPuntos()">🗑 Borrar puntos (competencia desde cero)</button>
                <div style="font-size:10px; color:#888; margin-top:8px; text-align:center;">Cmd/Ctrl + D o Q · Alt + D o Q · boton 🛠️ abajo a la derecha</div>
            `;
        }
    } else {
        debugPanel.style.display = "none";
        console.info('[debugger] panel CERRADO');
    }
}

window.debugIrA = (id) => irAPantalla(id, true);

const ALIAS_PANTALLAS_DEBUG = {
    'connect':      'connect',         'conectar': 'connect', 'placa': 'connect',
    'camara':       'screen-camara',   'camera':   'screen-camara',
    'cta':          'screen-cta',      'inicio':   'screen-cta',
    'elegir':       'screen-elegir',   'baile':    'screen-elegir',
    'detector':     'screen-detector',
    'juego':        'screen-game',     'game': 'screen-game', 'jugar': 'screen-game',
    'score':        'pantalla-score',  'puntos': 'pantalla-score', 'final': 'pantalla-score'
};

window.ir = function(nombre) {
    if (typeof irAPantalla !== 'function') {
        console.warn('[debugger] esta pagina no tiene el enrutador (navegacion.js): ir() no funciona aqui.');
        return;
    }
    const busca = String(nombre || '')
        .toLowerCase()
        .replace(/^(screen-|pantalla-)/, '')
        .trim();
    const destino = ALIAS_PANTALLAS_DEBUG[busca];
    if (!destino) {
        console.warn('[debugger] no conozco "' + nombre + '". Pantallas:', Object.keys(ALIAS_PANTALLAS_DEBUG).join(', '));
        return;
    }
    console.info('[debugger] ir -> ' + destino);
    irAPantalla(destino, true);
};

console.info('[debugger] consola: ir("juego"), ir("score"), ir("elegir"), ir("connect")...');

window.debugBorrarPuntos = () => {
    let borradas = 0;
    try {
        const claves = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && (k.startsWith('leaderboard_') || k === 'hola')) claves.push(k);
        }
        claves.forEach(k => { localStorage.removeItem(k); borradas++; });
    } catch (e) {}

    state.partidaGuardada = null;

    const btn = document.getElementById('debug-borrar-puntos');
    if (btn) {
        btn.innerText = borradas
            ? `✔ ${borradas} ranking(s) borrados`
            : '✔ Ya estaba desde cero';
        setTimeout(() => {
            btn.innerText = '🗑 Borrar puntos (competencia desde cero)';
        }, 1800);
    }
};