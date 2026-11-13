const danceOptionsElegir = [
    { name: "Salsa", flag: "../img/flags/salsa.webp", img: "../img/dances/salsa.webp", continent: "América", continentImg: "../img/continent/america-blanco.webp", history: "Nació en el Caribe y se cocinó en Nueva York, donde las comunidades cubanas y puertorriqueñas mezclaron el son, el mambo, la plena y la bomba con el jazz del Harlem. Es un baile de pareja, festivo y social, con pasos rápidos, giros y una conexión fluida entre los dos bailarines.", song: "../music/dances/salsa.mp3", menuSongStartSeconds: 29.0 },
    { name: "Merengue", flag: "../img/flags/merengue.webp", img: "../img/dances/merengue.webp", continent: "América", continentImg: "../img/continent/america-blanco.webp", history: "Es el baile nacional de República Dominicana y nació como danza rural hacia finales del siglo XIX, mezclando pasos europeos con ritmos africanos. Su rasgo más reconocible es el paso cojeante, con el peso siempre sobre el mismo pie.", song: "../music/dances/merengue.mp3", menuSongStartSeconds: 29.0 },
    { name: "Samba", flag: "../img/flags/samba.webp", img: "../img/dances/samba.webp", continent: "América", continentImg: "../img/continent/america-blanco.webp", history: "Tiene raíces africanas: en Bahia, quienes cosechaban caña bailaban en círculos al son de panderos y tambores. El ritmo va en 2/4 y es sincopado, con pandero, tamborim, cuíca y cavaquinho.", song: "../music/dances/samba.mp3", menuSongStartSeconds: 29.0 },
    { name: "Flamenco", oculto: true, flag: "../img/flags/flamenco.webp", img: "../img/dances/flamenco.webp", continent: "Europa", continentImg: "../img/continent/europa-blanco.webp", history: "Nació en Andalucía del cante gitano-andaluz y se consolidó en las tabernas del siglo XIX. Se baila con los pies marcando el compás sobre una tabla: zapateado, braceo y palmas. Desde 2010 es Patrimonio Inmaterial de la Humanidad.", song: "../music/dances/flamenco.mp3", menuSongStartSeconds: 0.0 },
    { name: "El Areíto", flag: "../img/flags/areito.webp", img: "../img/dances/areito.webp", continent: "América", continentImg: "../img/continent/america-blanco.webp", history: "El areíto fue el principal ritual socio-cultural y de transmisión oral de la civilización taína en La Española, alcanzando su punto máximo entre los siglos IX y XV (aprox. 800-1492 d. C.) hasta la llegada de los colonizadores españoles en el siglo XVI. En ausencia de escritura alfabética, funcionaba como un archivo viviente: mediante la combinación de música, canto coordinado y danza colectiva, la comunidad memorizaba y preservaba su historia, genealogías y tradiciones. Se celebraba en el batey (plaza central) bajo la guía del tequina (líder de canto), quien marcaba el ritmo con el mayohuacán (tambor de madera) y maracas. Un solo areíto podía extenderse por más de un día continuo, sirviendo a la vez como celebración política, rito religioso y mecanismo de cohesión social.", song: "../music/dances/areito.mp3", menuSongStartSeconds: 5.0 }
];

const LATERALES = 1;
const CENTRO = LATERALES;

let container, fila, boxes = [];

function crearSelectorBaile() {
    container = document.getElementById('cuadros');
    fila = document.getElementById('cuadros-fila');
    fila.replaceChildren();
    fila.style.transform = 'translateX(0px)';

    danceOptionsElegir.forEach(dance => {
        if (dance.oculto) return;   
        const previa = new Image();
        previa.src = dance.img;
    });



    const visibles = danceOptionsElegir.filter(d => !d.oculto);
    let elegido = visibles.indexOf(danceOptionsElegir[state.selectedDanceIdx]);
    if (elegido < 0) elegido = 0;
    const orden = visibles.slice();
    const primero = orden.splice(elegido, 1)[0];
    orden.splice(CENTRO, 0, primero);

    orden.forEach(dance => {
        const box = document.createElement('div');
        box.className = 'box';
        const img = document.createElement('img');
        img.src = dance.flag;
        img.alt = dance.name;
        box.appendChild(img);
        fila.appendChild(box);
    });

    boxes = fila.querySelectorAll('.box');
    pintarBaileElegido();


    document.querySelector('.flecha-izq').onclick = () => moverBaile('LEFT');
    document.querySelector('.flecha-der').onclick = () => moverBaile('RIGHT');

    document.querySelectorAll('.flecha').forEach(f => f.classList.add('flecha-entra'));


    container.onclick = (e) => {
        const box = e.target.closest('.box');
        if (box && box.classList.contains('centre')) confirmarBaile();
    };
}

function baileEnCentro() {
    return boxes[CENTRO].children[0].alt;
}

function ajustarTamanoBanderas() {
    if (!boxes.length) return;
    const anchoCarril = container.clientWidth;
    const gap = 46;

    const ancho = Math.max(96, Math.floor((anchoCarril / 2 - LATERALES * gap) / (LATERALES + 0.5)));
    boxes.forEach(b => {
        b.style.width = ancho + 'px';
        b.style.height = Math.round(ancho / 1.68) + 'px';
    });
    fila.style.columnGap = gap + 'px';
}

function buscar(nombre) {
    return danceOptionsElegir.find(d => d.name === nombre);
}

function centrarBaileEnMedio() {
    const elegida = boxes[CENTRO];
    if (!elegida) return;

    fila.classList.add('sin-transicion');
    fila.style.transform = 'translateX(0px)';

    const ventana = container.getBoundingClientRect();
    const caja = elegida.getBoundingClientRect();
    const diferencia = (caja.left + caja.width / 2) - (ventana.left + ventana.width / 2);

    fila.style.transform = `translateX(${-diferencia}px)`;
    void fila.offsetWidth;
    fila.classList.remove('sin-transicion');
}

function moverBaile(dir) {
    const rolesAnteriores = {};
    boxes.forEach((b, i) => {
        rolesAnteriores[b.children[0].alt] = i === CENTRO ? 'centro'
            : (Math.abs(i - CENTRO) === 1 ? 'vecino' : 'fuera');
    });
    state.rolesAnteriores = rolesAnteriores;

    const primera = boxes[0];
    const ultima = boxes[boxes.length - 1];
    if (dir === 'LEFT')  fila.insertBefore(ultima, primera);
    if (dir === 'RIGHT') fila.appendChild(primera);
    boxes = fila.querySelectorAll('.box');
    state.ultimaDireccionFoto = dir;
    const flecha = document.querySelector(dir === 'LEFT' ? '.flecha-izq' : '.flecha-der');
    if (flecha) {
        flecha.classList.remove('flecha-nudge-izq', 'flecha-nudge-der');
        void flecha.offsetWidth;
        flecha.classList.add(dir === 'LEFT' ? 'flecha-nudge-izq' : 'flecha-nudge-der');
    }
    pintarBaileElegido();
}

function confirmarBaile() {
    tocarEfecto('seleccionar.mp3', 0.2);
    state.dificultad = 'hard';
    guardarSesion();
    irAPantalla('screen-detector');
}

function entradaElegir(dir) {
    if (dir === 'LEFT')  moverBaile('LEFT');
    if (dir === 'RIGHT') moverBaile('RIGHT');
    if (dir === 'UP')    confirmarBaile();
}

function pintarBaileElegido() {
    const dance = buscar(baileEnCentro());
    if (!dance) return;

    state.selectedDanceIdx = danceOptionsElegir.indexOf(dance);

    [...boxes].forEach((b, i) => {
        const esCentro = i === CENTRO;
        const esVecino = Math.abs(i - CENTRO) === 1;
        const esFuera = !esCentro && !esVecino;
        b.classList.toggle('centre', esCentro);
        b.classList.toggle('box-fuera', esFuera);
        if (!esCentro && !esFuera) {
            b.style.opacity = String(0.55 - Math.min(Math.abs(i - CENTRO), 4) * 0.12);
        } else {
            b.style.opacity = '';
        }

        b.classList.remove('bandera-entra', 'bandera-sale', 'bandera-centro');
        void b.offsetWidth;   
        if (state.rolesAnteriores) {
            const antes = state.rolesAnteriores[b.children[0].alt];
            const rolAhora = esCentro ? 'centro' : (esFuera ? 'fuera' : 'vecino');
            if (antes && antes !== rolAhora) {
                if (antes === 'fuera')       b.classList.add('bandera-entra');
                else if (rolAhora === 'fuera') b.classList.add('bandera-sale');
                else if (rolAhora === 'centro') b.classList.add('bandera-centro');
            }
        }
    });
    state.rolesAnteriores = null;

    centrarBaileEnMedio();

    mostrarFotoBaile(dance.img, state.ultimaDireccionFoto);
    pintarNombreBaile(dance.name, !!state.ultimaDireccionFoto);
    pintarContinente(dance, !!state.ultimaDireccionFoto);
    state.ultimaDireccionFoto = null;

    animarHistoria(dance.history);
    cambiarMusica(dance);
}

let nombreCambioId = 0;

function construirLetras(el, name) {
    el.classList.remove('nombre-sale', 'nombre-entra');
    el.replaceChildren();
    [...name].forEach((ch, i) => {
        const s = document.createElement('span');
        s.className = 'letra';
        s.style.setProperty('--i', i);
        s.textContent = ch === ' ' ? ' ' : ch;
        el.appendChild(s);
    });
}

function pintarNombreBaile(name, animar) {
    const el = document.getElementById('dance-name');
    if (!el) return;

    if (!animar) {
        construirLetras(el, name);
        return;
    }

    const id = ++nombreCambioId;
    const letras = el.querySelectorAll('.letra');
    const espera = letras.length * 12 + 170;
    el.classList.remove('nombre-entra');
    el.classList.add('nombre-sale');
    setTimeout(() => {
        if (id !== nombreCambioId) return;
        construirLetras(el, name);
        void el.offsetWidth;
        el.classList.add('nombre-entra');
    }, espera);
}

let contCambioId = 0;

function pintarContinente(dance, animar) {
    const img = document.getElementById('continente-img');
    const txt = document.getElementById('continente-nombre');
    if (!img || !txt) return;

    const aplicar = () => {
        img.src = dance.continentImg;
        txt.textContent = dance.continent;
    };

    if (!animar) {
        aplicar();
        return;
    }

    const id = ++contCambioId;
    img.classList.remove('cont-entra-img');
    txt.classList.remove('cont-entra-txt');
    img.classList.add('cont-sale-img');
    txt.classList.add('cont-sale-txt');
    setTimeout(() => {
        if (id !== contCambioId) return;
        aplicar();
        img.classList.remove('cont-sale-img');
        txt.classList.remove('cont-sale-txt');
        void img.offsetWidth;
        void txt.offsetWidth;
        img.classList.add('cont-entra-img');
        txt.classList.add('cont-entra-txt');
    }, 170);
}

let fotoActual = null;
let fotoCruceId = 0;

function capaFoto(letra) {
    return document.getElementById(letra === 'a' ? 'dance-photo-a' : 'dance-photo-b');
}

function tiraFoto() {
    return document.getElementById('foto-tira');
}

function mostrarFotoBaile(src, dir) {
    const tira = tiraFoto();
    const A = capaFoto('a'), B = capaFoto('b');
    if (!tira || !A || !B) return;

    const cruce = ++fotoCruceId;

    if (!fotoActual || !tira.contains(fotoActual)) fotoActual = A;
    const actual = fotoActual;
    const otra = actual === A ? B : A;

    tira.classList.add('tira-sin-anim');
    tira.prepend(actual);
    tira.classList.add('tira-en-0');
    tira.classList.remove('tira-en-der');
    A.classList.remove('foto-apaga');
    B.classList.remove('foto-apaga');

    if (!actual.getAttribute('src')) {
        actual.src = src;
        fotoActual = actual;
        return;
    }

    if (actual.getAttribute('src') === src) {
        fotoActual = actual;
        return;
    }

    otra.src = src;

    const lista = ('decode' in otra)
        ? Promise.race([otra.decode(), new Promise(res => setTimeout(res, 900))])
        : Promise.resolve();
    lista.catch(() => {}).then(() => {
        if (cruce !== fotoCruceId) return;
        if (dir === 'LEFT') {
            tira.prepend(otra);
            tira.classList.add('tira-en-der');
            tira.classList.remove('tira-en-0');
        } else {
            tira.append(otra);
            tira.classList.add('tira-en-0');
            tira.classList.remove('tira-en-der');
        }
        otra.classList.add('foto-apaga');
        void tira.offsetWidth;
        tira.classList.remove('tira-sin-anim');
        if (dir === 'LEFT') {
            tira.classList.add('tira-en-0');
            tira.classList.remove('tira-en-der');
        } else {
            tira.classList.add('tira-en-der');
            tira.classList.remove('tira-en-0');
        }
        otra.classList.remove('foto-apaga');
        actual.classList.add('foto-apaga');
        fotoActual = otra;
    });
}

function cambiarMusica(dance) {
    const actual = state.audioUnificadoGlobal;
    if (actual && actual.dataset.song === dance.song) return;

    if (actual) {
        actual.pause();
        state.audioUnificadoGlobal = null;
    }

    const audio = new Audio(dance.song);
    audio.dataset.song = dance.song;
    audio.volume = volumenBase(audio, 0.4);
    const inicioMenu = dance.menuSongStartSeconds ?? 0;
    audio.oncanplaythrough = () => {
        audio.oncanplaythrough = null;
        if (state.audioUnificadoGlobal !== audio) return;
        if (inicioMenu > 0) {
            try { audio.currentTime = inicioMenu; } catch (e) {}
        }
        audio.play().catch(() => {});
    };
    state.audioUnificadoGlobal = audio;
}

function animarHistoria(text) {
    const el = document.getElementById('dance-history');
    el.replaceChildren();
    text.split(' ').forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.animationDelay = `${i * 0.03}s`;
        el.append(span, ' ');
    });
}
