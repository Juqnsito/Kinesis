const ctaMessages = [
    { titulo: "El mundo es tu pista de baile",
        sub:   "¡Explorémoslo!" },
    { titulo: "¿Puedes sentir el ritmo?",
        sub:   "¡A bailar!" },
    { titulo: "Cada país tiene su propio ritmo",
        sub:   "¡Encuentra el tuyo!" },
    { titulo: "¿Cuántos bailes conoces?",
        sub:   "¡Acepta el desafío!" },
    { titulo: "Tu movimiento. Tu cultura. Tu mundo",
        sub:   "¡Empieza el viaje con nosotros!" }
];

const ctaMessagesAnteriores = [
    "¿Quieres ser el bailarín internacional?",
    "Cada continente tiene un nuevo paso para ofrecer, ¿quieres aceptar?",
    "¿Que es el mundo sin un poco de baile?"
];

const CHAR_DELAY_TITULO = 0.026;
const ROTACION_MS       = 4500;

function animarLetras(container, text, delayStep, retrasoBase = 0) {
    container.innerHTML = '';
    let i = 0;
    text.split(' ').forEach((word, w) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        for (const letra of word) {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.style.animationDelay = `${(retrasoBase + i * delayStep).toFixed(3)}s`;
            charSpan.textContent = letra;
            wordSpan.appendChild(charSpan);
            i++;
        }
        container.appendChild(wordSpan);
        i++;
    });
}
const countries = [
    {
        name: "Salsa",
        flag: "../img/flags/salsa.webp"
    },
    {
        name: "Merengue",
        flag: "../img/flags/merengue.webp"
    },
    {
        name: "Samba",
        flag: "../img/flags/samba.webp"
    },
    {
        name: "Flamenco",
        flag: "../img/flags/flamenco.webp"
    },
    {
        name: "Irish Ceili",
        flag: "../img/flags/ceilidh.webp"
    },
    {
        name: "Baile del Ainu",
        flag: "../img/flags/ainu.webp"
    },
    {
        name: "Izena no Kai",
        flag: "../img/flags/izena.webp"
    },
    {
        name: "Sinte",
        flag: "../img/flags/sinte.webp"
    },
    {
        name: "Adowa",
        flag: "../img/flags/adowa.webp"
    },
    {
        name: "El Haka",
        flag: "../img/flags/haka.webp"
    },
    {
        name: "El Hula",
        flag: "../img/flags/hula.webp"
    },
    {
        name: "El Areíto",
        flag: "../img/flags/areito.webp"
    }
];
function crearBanderasLaterales() {
    document.querySelectorAll('#screen-cta .scroll').forEach(scroll => {
        scroll.innerHTML = '';

        for (let copia = 0; copia < 2; copia++) {
            const col = document.createElement('div');
            countries.forEach(country => {
                const img = document.createElement('img');
                img.src = country.flag;
                img.alt = country.name;
                col.appendChild(img);
            });
            scroll.appendChild(col);
        }
    });
    aplicarGrisPorDistancia();
}

function aplicarGrisPorDistancia() {
    document.querySelectorAll('#screen-cta .scroll').forEach(scroll => {
        const altoCarril = scroll.getBoundingClientRect().height || 1;
        scroll.querySelectorAll('img').forEach(img => {
            const b = img.getBoundingClientRect();

            const centro = b.top + b.height / 2 - scroll.getBoundingClientRect().top;

            const dist = Math.abs(centro - altoCarril / 2) / (altoCarril / 2);


            const gris = Math.min(1, Math.pow(dist, 1.15));
            img.style.filter = `grayscale(${gris.toFixed(3)})`;

            img.style.opacity = String(1 - gris * 0.35);
        });
    });
}

function mostrarMensajeInicio(idx) {
    const titleEl = document.getElementById('cta-title-container');
    if (!titleEl) return;
    const subEl = document.getElementById('cta-sub-container');

    const msg = ctaMessages[idx];
    const retrasoSub = msg.titulo.split(' ').join('').length * CHAR_DELAY_TITULO + 0.18;

    animarLetras(titleEl, msg.titulo, CHAR_DELAY_TITULO);
    if (subEl) animarLetras(subEl, msg.sub, CHAR_DELAY_TITULO, retrasoSub);
}

function avanzarDesdeCta() {
    pararMensajesInicio();
    irAPantalla('screen-elegir');
    tocarEfecto('cambiar.mp3', 0.2);
}

function arrancarMensajesInicio() {
    crearBanderasLaterales();
    pararMensajesInicio();
    mostrarMensajeInicio(state.currentCtaIndex || 0);




    window.addEventListener('resize', aplicarGrisPorDistancia);
    if (!state.ctaGrisRaf) {
        const sonear = () => {
            aplicarGrisPorDistancia();
            state.ctaGrisRaf = requestAnimationFrame(sonear);
        };
        state.ctaGrisRaf = requestAnimationFrame(sonear);
    }

    if (ctaMessages.length > 1) {
        state.ctaInterval = setInterval(() => {
            const titleEl = document.getElementById('cta-title-container');
            const subEl = document.getElementById('cta-sub-container');

            titleEl.classList.add('fade-out');
            if (subEl) subEl.classList.add('fade-out');

            state.currentCtaIndex = (state.currentCtaIndex + 1) % ctaMessages.length;
            const next = state.currentCtaIndex;

            state.ctaTimeout = setTimeout(() => {
                titleEl.classList.remove('fade-out');
                if (subEl) subEl.classList.remove('fade-out');
                mostrarMensajeInicio(next);
            }, 480);
        }, ROTACION_MS);
    }
}

function pararMensajesInicio() {
    if (state.ctaInterval) { clearInterval(state.ctaInterval); state.ctaInterval = null; }
    if (state.ctaTimeout)  { clearTimeout(state.ctaTimeout);  state.ctaTimeout = null; }
    if (state.ctaGrisRaf)  { cancelAnimationFrame(state.ctaGrisRaf); state.ctaGrisRaf = null; }
    window.removeEventListener('resize', aplicarGrisPorDistancia);
}
