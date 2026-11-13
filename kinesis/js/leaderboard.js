const danceOptionsRegistro = [
    { slug: "salsa", name: "Salsa", funfact: "La pista es «La Cuenta», un tamborito de Prince Barreto, el rey del tamborito de Panamá. El trozo que suena aquí late a 112 BPM y viene bajo licencia CC BY-SA 4.0.", pais: "cu", continent: "América" },
    { slug: "merengue", name: "Merengue", funfact: "Suena un merengue de Notanico, el grupo dominicano más grabado de la historia. El corte está a 120 BPM, el tempo más redondo del set, y el original es la única pista con ISRC en el título (USUAN1100130).", pais: "do", continent: "América" },
    { slug: "samba", name: "Samba", funfact: "Esta pista es una reinsamba (samba-batucada) de grabación directa: percusión en vivo y sin ensayos. Corre a 136 BPM y es una de las piezas con licencia CC BY 4.0.", pais: "br", continent: "América" },
    { slug: "flamenco", name: "Flamenco", funfact: "El flamenco es cante, toque y baile en la misma respiración, y desde 2010 es Patrimonio Inmaterial de la Humanidad. Aquí el compás no lo lleva un tambor: lo marcan los talones contra la tabla, que es exactamente para lo que sirve.", pais: "es", continent: "Europa" },
    { slug: "areito", name: "El Areíto", funfact: "El areíto es la ceremonia taína del Caribe: canto y baile colectivo que narraba las genealogías y los mitos de los caciques. La pista del juego late a 103 BPM, con la cadencia de tambores de madera y maracas que describieron los cronistas del siglo XVI.", pais: "do", continent: "América" }
];


const MAX = 5;
const clave = (slug) => `leaderboard_${slug}`;

function baileJugado() {
    const d = danceOptionsRegistro[state.selectedDanceIdx] || {};
    return { slug: d.slug || 'salsa', nombre: d.name || 'Baile' };
}

function normalizarIniciales(texto) {
    const limpio = String(texto || '').trim().replace(/\s+/g, ' ').slice(0, 12);
    return limpio || 'AAA';
}

function top5(slug) {
    try {
        const raw = localStorage.getItem(clave(slug));
        const lista = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(lista)) return [];
        return lista
            .map((e) => (typeof e === 'number'
                ? { iniciales: 'AAA', puntos: e }        
                : { iniciales: normalizarIniciales(e.iniciales), puntos: Number(e.puntos) || 0 }))
            .sort((a, b) => b.puntos - a.puntos)
            .slice(0, MAX);
    } catch (e) {
        return [];
    }
}

function guardarPuntaje(slug, puntos, iniciales) {
    const lista = [
        ...top5(slug),
        { iniciales: normalizarIniciales(iniciales), puntos: Number(puntos) || 0 }
    ].sort((a, b) => b.puntos - a.puntos).slice(0, MAX);
    localStorage.setItem(clave(slug), JSON.stringify(lista));
    return lista;
}

function cambiarInicialesGuardadas(slug, puntos, iniciales) {
    const lista = top5(slug);
    const p = Number(puntos) || 0;
    let cambia = false;
    for (const fila of lista) {
        if (fila.puntos === p) {
            fila.iniciales = normalizarIniciales(iniciales);
            cambia = true;
            break;                       
        }
    }
    if (!cambia) return guardarPuntaje(slug, p, iniciales);
    lista.sort((a, b) => b.puntos - a.puntos);
    localStorage.setItem(clave(slug), JSON.stringify(lista));
    return lista;
}

function ordenarPuntosEnPantalla() {
    const h = document.querySelectorAll(".lb-score");
    let a = [];

    for (let i = 0; i < h.length; i++) {
        a.push(h[i].innerText)
    }

    a.sort((a, b) => b - a)

    for (let i = 0; i < h.length; i++) {
        h[i].innerText = a[i]
    }

    local(a)

    function local(points) {
        localStorage.setItem("hola", points)
        localStorage.getItem("hola")
    }
}

const puestos = ['🥇', '🥈', '🥉', '4º', '5º'];

function calcularPuesto(slug, nombre, puntos, iniciales, yaGuardado = false) {
    const lista = yaGuardado ? top5(slug) : guardarPuntaje(slug, puntos, iniciales);

    const ul = document.getElementById('lb-list');
    const titulo = document.getElementById('lb-title');
    const p = Number(puntos) || 0;
    const mias = normalizarIniciales(iniciales);

    if (titulo) titulo.textContent = 'Top 5 · ' + nombre;

    const puesto = lista.findIndex(f => f.iniciales === mias && f.puntos === p) + 1;

    if (ul) {
        ul.innerHTML = '';

        lista.forEach((fila, i) => {
            const li = document.createElement('li');
            li.className = 'lb-row' + (fila.iniciales === mias && fila.puntos === p ? ' lb-row-hoy' : '');
            li.innerHTML =
                '<span class="lb-nombre">' +
                    '<span class="lb-pos">' + puestos[i] + '</span>' +
                    '<span class="lb-iniciales">' + fila.iniciales + '</span>' +
                '</span>' +
                '<span class="lb-score">' + fila.puntos + '</span>';
            ul.appendChild(li);
        });

        ordenarPuntosEnPantalla();

        for (let i = lista.length; i < MAX; i++) {
            const li = document.createElement('li');
            li.className = 'lb-row';
            li.style.opacity = '0.35';
            li.innerHTML =
                '<span class="lb-nombre">' +
                    '<span class="lb-pos">' + puestos[i] + '</span>' +
                    '<span class="lb-iniciales">---</span>' +
                '</span>' +
                '<span class="lb-score">-</span>';
            ul.appendChild(li);
        }
    }

    return { puesto, total: lista.length };
}
