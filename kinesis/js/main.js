document.addEventListener("DOMContentLoaded", () => {

    state.grid      = document.getElementById("grid");
    state.scoreText = document.getElementById("score-display");
    state.statusText = document.getElementById("status");


    document.getElementById('connect').addEventListener('click', () => solicitarArduino());
    document.getElementById('screen-cta').addEventListener('click', () => irAPantalla('screen-elegir'));
    document.getElementById('restartBtn').addEventListener('click', volverAlInicio);


    precargarModelo();
    precargarVideos();
    reproducirFondoDetector(false);
    crearSelectorBaile();
    conectarTeclado();
    prepararInicio();


    irAPantalla('connect');
});