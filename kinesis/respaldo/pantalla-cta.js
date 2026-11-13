/* Mensajes del CTA. Solo los usa esta pantalla. */
const ctaMessages = [
    "¿Quieres ser el bailarín internacional?",
    "Cada continente tiene un nuevo paso para ofrecer, ¿quieres aceptar?",
    "¿Que es el mundo sin un poco de baile?"
];

const CHAR_DELAY_TITULO = 0.026;
const ROTACION_MS       = 4500;

function animarLetras(container, text, delayStep) {
    container.innerHTML = '';
    let i = 0;
    text.split(' ').forEach((word, w) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        for (const letra of word) {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.style.animationDelay = `${i * delayStep}s`;
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
        flag: "../img/flags/salsa.png"
    },
    {
        name: "Merengue",
        flag: "../img/flags/merengue.png"
    },
    {
        name: "Samba",
        flag: "../img/flags/samba.png"
    },
    {
        name: "Flamenco",
        flag: "../img/flags/flamenco.png"
    },
    {
        name: "Irish Ceili",
        flag: "../img/flags/ceilidh.png"
    },
    {
        name: "Baile del Ainu",
        flag: "../img/flags/ainu.png"
    },
    {
        name: "Izena no Kai",
        flag: "../img/flags/izena.png"
    },
    {
        name: "Sinte",
        flag: "../img/flags/sinte.png"
    },
    {
        name: "Adowa",
        flag: "../img/flags/adowa.png"
    },
    {
        name: "El Haka",
        flag: "../img/flags/haka.png"
    },
    {
        name: "El Hula",
        flag: "../img/flags/hula.png"
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

    animarLetras(titleEl, ctaMessages[idx], CHAR_DELAY_TITULO);
}

/* Pintar las banderas y arrancar la rotacion van en el mismo arranque.
   Antes eran dos funciones distintas (prepararInicio y
   arrancarMensajesInicio) porque irAPantalla() tenia que decidir cual
   de las dos tocaba segun si la pantalla se mostraba por primera vez o
   se reabria. Ahora la pagina es la pantalla y se arranca una vez. */
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

            titleEl.classList.add('fade-out');

            state.currentCtaIndex = (state.currentCtaIndex + 1) % ctaMessages.length;
            const next = state.currentCtaIndex;

            state.ctaTimeout = setTimeout(() => {
                titleEl.classList.remove('fade-out');
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
