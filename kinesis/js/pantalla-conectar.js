async function solicitarArduino() {
    if (state.port) {
        irAPantalla('screen-camara');
        return;
    }
    try {
        if (state.statusText) state.statusText.innerText = "Conectando...";
        state.port = await navigator.serial.requestPort();
        await state.port.open({ baudRate: 115200 });

        const decoder = new TextDecoderStream();
        state.port.readable.pipeTo(decoder.writable);
        state.reader = decoder.readable.getReader();

        if (state.statusText) state.statusText.innerText = "Arduino Conectado";
        conectarPlaca();
    } catch (err) {
        if (state.statusText) state.statusText.innerText = "Modo Teclado activo";
        state.port = null;
    } finally {
        irAPantalla('screen-camara');
    }
}

const LLAVE_CAMARA = 'kinesisCamaraId';

function camaraRecordada() {
    try { return localStorage.getItem(LLAVE_CAMARA); } catch (e) { return null; }
}

async function elegirCamara() {
    const lista = document.getElementById('lista-camaras');
    if (!lista) { irAPantalla('screen-cta'); return; }

    lista.innerHTML = '';

    let camaras = [];
    try {
        const permiso = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        permiso.getTracks().forEach(t => t.stop());
        camaras = (await navigator.mediaDevices.enumerateDevices())
            .filter(d => d.kind === 'videoinput');
    } catch (err) {
        irAPantalla('screen-cta');
        return;
    }

    if (!camaras.length) { irAPantalla('screen-cta'); return; }

    const recordada = camaraRecordada();

    camaras.forEach((cam, i) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerText = cam.label || `Cámara ${i + 1}`;
        if (cam.deviceId && cam.deviceId === recordada) btn.classList.add('elegida');
        btn.addEventListener('click', () => {
            if (!cam.deviceId) { irAPantalla('screen-cta'); return; }
            state.camaraId = cam.deviceId;
            try { localStorage.setItem(LLAVE_CAMARA, cam.deviceId); } catch (e) {}
            lista.querySelectorAll('button').forEach(b => b.classList.remove('elegida'));
            btn.classList.add('elegida');
            irAPantalla('screen-cta');
        });
        li.appendChild(btn);
        lista.appendChild(li);
    });

    const normal = document.getElementById('camara-normal');
    normal.onclick = () => {
        state.camaraId = null;
        try { localStorage.removeItem(LLAVE_CAMARA); } catch (e) {}
        irAPantalla('screen-cta');
    };
}

function conectarPlaca() {
    if (state.leerPlaca) return;
    state.leerPlaca = true;
    readSerial();
}

window.addEventListener('pagehide', () => {
    state.leerPlaca = false;
    if (state.port) {
        try { state.port.close(); } catch (e) {}
        state.port = null;
    }
});