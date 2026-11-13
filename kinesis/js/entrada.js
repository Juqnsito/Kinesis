const DIRECCIONES = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
const dirMap = { "ARRIBA": "UP", "ABAJO": "DOWN", "IZQUIERDA": "LEFT", "DERECHA": "RIGHT" };
const mapaTeclas = { ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT" };


const SENALES_PLACA = {
    ARRIBA: 'UP', UP: 'UP', ARROWUP: 'UP', TOP: 'UP', ADELANTE: 'UP', U: 'UP',
    ABAJO: 'DOWN', DOWN: 'DOWN', ARROWDOWN: 'DOWN', ATRAS: 'DOWN', D: 'DOWN',
    IZQUIERDA: 'LEFT', IZQ: 'LEFT', LEFT: 'LEFT', ARROWLEFT: 'LEFT', L: 'LEFT',
    DERECHA: 'RIGHT', DER: 'RIGHT', RIGHT: 'RIGHT', RIGTH: 'RIGHT', ARROWRIGHT: 'RIGHT', R: 'RIGHT'
};

const REGEX_SENAL = /(ARROW[ _-]?(?:UP|DOWN|LEFT|RIGHT)|ARRIBA|ABAJO|IZQUIERDA|DERECHA|ADELANTE|ATRAS|RIGTH|RIGHT|LEFT|DOWN|UP|IZQ|DER)/;

function dirDeSerie(texto) {
    const cruda = String(texto).toUpperCase();

    const compacta = cruda.replace(/[^A-Z]/g, '');
    if (SENALES_PLACA[compacta]) return SENALES_PLACA[compacta];
    if (/^ARROW/.test(compacta) && SENALES_PLACA[compacta.slice(5)]) {
        return SENALES_PLACA[compacta.slice(5)];
    }

    const hallada = REGEX_SENAL.exec(cruda);
    if (!hallada) return null;
    const token = hallada[0].replace(/[^A-Z]/g, '');
    return SENALES_PLACA[token] || null;
}

const FLECHA_POR_DIR = { UP: 'ArrowUp', DOWN: 'ArrowDown', LEFT: 'ArrowLeft', RIGHT: 'ArrowRight' };

function pulsarFlecha(dir) {
    const tecla = FLECHA_POR_DIR[dir];
    if (!tecla) return;
    const ev = new KeyboardEvent('keydown', {
        key: tecla,
        code: tecla,
        bubbles: true,
        cancelable: true
    });
    ev.esPlaca = true;
    document.dispatchEvent(ev);
}


let bufferSerie = "";
let temporizadorFlush = null;

const FLUSH_MS = 120;

async function readSerial() {
    bufferSerie = "";
    while (state.port && state.reader) {
        try {
            const { value, done } = await state.reader.read();
            if (done) {
                state.reader.releaseLock();
                clearTimeout(temporizadorFlush);
                state.leerPlaca = false;
                state.reader = null;
                if (state.port) { try { state.port.close(); } catch (e) {} state.port = null; }
                if (state.statusText) state.statusText.innerText = "Buscando la placa...";
                setTimeout(reabrirPlacaSiHay, MS_REINTENTO_PLACA);
                break;
            }
            if (value) {
                bufferSerie += value;
                const lineas = bufferSerie.split("\n");
                bufferSerie = lineas.pop();
                for (const linea of lineas) procesarLineaSerie(linea);
                programarFlush();
            }
        } catch (error) {
            console.error("Error leyendo Serial:", error);
            clearTimeout(temporizadorFlush);
            state.leerPlaca = false;
            state.reader = null;
            if (state.port) { try { state.port.close(); } catch (e) {} state.port = null; }
            if (state.statusText) state.statusText.innerText = "Buscando la placa...";
            setTimeout(reabrirPlacaSiHay, MS_REINTENTO_PLACA);
            break;
        }
    }
}

function programarFlush() {
    clearTimeout(temporizadorFlush);
    if (!state.port || !state.reader) return;
    temporizadorFlush = setTimeout(() => {
        if (!bufferSerie.length || !state.reader) return;
        const dir = dirDeSerie(bufferSerie);
        if (dir) {
            bufferSerie = "";
            pulsarFlecha(dir);
        } else if (bufferSerie.length > 128) {
            bufferSerie = "";
        } else {
            programarFlush();
        }
    }, FLUSH_MS);
}

function procesarLineaSerie(linea) {
    const dir = dirDeSerie(linea);
    if (!dir) {
        console.log("[placa] linea no reconocida:", JSON.stringify(linea.trim()));
        return;
    }
    pulsarFlecha(dir);
}

const MS_REINTENTO_PLACA = 3000;
let intentosPlaca = 0;

async function reabrirPlacaSiHay() {
    if (state.port || state.leerPlaca) return;
    if (!navigator.serial || !navigator.serial.getPorts) return;

    const puertos = await navigator.serial.getPorts();
    if (!puertos.length) return;

    try {
        const port = puertos[0];
        await port.open({ baudRate: 115200 });
        state.port = port;
        const decoder = new TextDecoderStream();
        port.readable.pipeTo(decoder.writable).catch(() => {});
        state.reader = decoder.readable.getReader();
        state.leerPlaca = true;
        intentosPlaca = 0;
        if (state.statusText) state.statusText.innerText = "Arduino Conectado";
        readSerial();
        console.log("[placa] conectada y leyendo en esta pagina");
    } catch (error) {
        intentosPlaca++;
        if (state.statusText) state.statusText.innerText = "Buscando la placa...";
        console.log("[placa] reconexion fallida (intento " + intentosPlaca + ")",
            error && error.message);
        setTimeout(reabrirPlacaSiHay, MS_REINTENTO_PLACA);
    }
}

window.addEventListener('pagehide', () => {
    state.leerPlaca = false;
    temporizadorFlush = null;
    bufferSerie = "";
    if (state.port) {
        try { state.port.close(); } catch (e) {}
        state.port = null;
    }
});

const DEBOUNCE_MS = 300;

function arribaSinRepetir(accion) {
    const ahora = Date.now();
    if (ahora - state.lastUpTime <= DEBOUNCE_MS) return false;
    state.lastUpTime = ahora;
    accion();
    return true;
}

function leerPulsacion(input) {
    const bruto = String(input).toUpperCase().replace(/^ARROW/, '').trim();

    const dir = dirMap[bruto] || bruto;
    if (!DIRECCIONES.includes(dir)) return;

    if (typeof manejadorDeEntrada === 'function') {
        manejadorDeEntrada(dir);
        return;
    }
    const manejador = window['entrada_' + dir];
    if (typeof manejador === 'function') manejador();
}

function conectarTeclado() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey || e.altKey)) {
            return;
        }

        const dir = mapaTeclas[e.key];
        if (!dir) return;

        if (window.tecladoOcupadoPorLaPagina && !e.esPlaca) return;

        e.preventDefault();
        leerPulsacion(dir);
    });
}
