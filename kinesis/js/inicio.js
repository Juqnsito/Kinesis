
function iniciarPagina() {
    cargarSesion();
    conectarTeclado();
    reabrirPlacaSiHay();
    asegurarMuteFondo();
    reproducirFondoGlobal(true);
    abrirCerrarPanelSilencioso();
}

function abrirCerrarPanelSilencioso() {
    const panel = document.getElementById('game-debugger');
    if (panel) panel.style.display = 'none';
}

function permitirAutoplay() {
    document.addEventListener('click', function reintentar() {
        const v = document.getElementById('fondo-global');
        if (v && v.paused) {
            asegurarMuteFondo();
            v.play().catch(() => {});
        }
    }, { once: true });
}

function asegurarMuteFondo() {
    const v = document.getElementById('fondo-global');
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
}