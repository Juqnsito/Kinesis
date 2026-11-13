
const ORDEN_DE_PRECARGA = [
    "../img/fondo-4K.webm",

    "../img/dances/deteccion-bailes/Salsa/hard/izquierda.mp4",
    "../img/dances/deteccion-bailes/Salsa/hard/derecha.mp4",
    "../img/dances/deteccion-bailes/Salsa/hard/adelante-izquierda.mp4",
    "../img/dances/deteccion-bailes/Salsa/hard/adelante-derecha.mp4",
    "../img/dances/deteccion-bailes/Salsa/hard/izquierda-atras.mp4",
    "../img/dances/deteccion-bailes/Salsa/hard/derecha-atras.mp4",
    "../img/abajo_izquierda.webm",
    "../img/abajo_derecha.webm",

    "../img/dances/deteccion-bailes/Merengue/hard/derecha.mp4",
    "../img/dances/deteccion-bailes/Merengue/hard/adelante.mp4",
    "../img/dances/deteccion-bailes/Merengue/hard/adelante-atras.mp4",
    "../img/dances/deteccion-bailes/Merengue/hard/vuelta.mp4",

    "../img/dances/deteccion-bailes/Samba/hard/pasitos-derecha.mp4",
    "../img/dances/deteccion-bailes/Samba/hard/adelante-atras.mp4",
    "../img/dances/deteccion-bailes/Samba/hard/atras-rapido.mp4",

    "../img/dances/deteccion-bailes/Flamenco/hard/izquierda-alante.webm",
    "../img/dances/deteccion-bailes/Flamenco/hard/derecha-alante.webm",
    "../img/dances/deteccion-bailes/Flamenco/hard/izquierda.webm",
    "../img/dances/deteccion-bailes/Flamenco/hard/derecha.webm",

    "../img/dances/deteccion-bailes/areito/hard/doble-adelante.mp4",
    "../img/dances/deteccion-bailes/areito/hard/adelante.mp4",
    "../img/dances/deteccion-bailes/areito/hard/derecha.mp4",
    "../img/dances/deteccion-bailes/areito/hard/izquierda.mp4",
    "../img/dances/deteccion-bailes/areito/hard/vuelta.mp4",

    "../music/dances/salsa.mp3",
    "../music/dances/merengue.mp3",
    "../music/dances/samba.mp3",
    "../music/dances/irish ceili.mp3",
    "../music/dances/flamenco.mp3",
    "../music/dances/areito.mp3",

    "../music/sfx/321.mp3",
    "../music/sfx/go.mp3",
    "../music/sfx/acertar.mp3",
    "../music/sfx/fallar.mp3",
    "../music/sfx/fallar_vrd.mp3",
    "../music/sfx/aplausos.mp3",
    "../music/sfx/DTMF.mp3",
    "../music/sfx/BackMainMenu.wav",
    "../music/seleccionar.mp3",
    "../music/cambiar.mp3",

    "../img/dances/salsa.webp",
    "../img/dances/merengue.webp",
    "../img/dances/flamenco.webp",
    "../img/dances/samba.webp",
    "../img/dances/ceilidh.webp",
    "../img/dances/adowa.webp",
    "../img/dances/ainu.webp",
    "../img/dances/haka.webp",
    "../img/dances/hula.webp",
    "../img/dances/sinte.webp",
    "../img/dances/izena.webp",
    "../img/dances/areito.webp",
    "../img/flags/salsa.webp",
    "../img/flags/merengue.webp",
    "../img/flags/samba.webp",
    "../img/flags/flamenco.webp",
    "../img/flags/ceilidh.webp",
    "../img/flags/adowa.webp",
    "../img/flags/ainu.webp",
    "../img/flags/haka.webp",
    "../img/flags/hula.webp",
    "../img/flags/sinte.webp",
    "../img/flags/izena.webp",
    "../img/flags/areito.webp",
    "../img/continent/america.webp",
    "../img/continent/europa.webp",
    "../img/continent/asia.webp",
    "../img/continent/africa.webp",
    "../img/continent/oceania.webp",
    "../img/continent/america-blanco.webp",
    "../img/continent/europa-blanco.webp",
    "../img/continent/asia-blanco.webp",
    "../img/continent/africa-blanco.webp",
    "../img/continent/oceania-blanco.webp",
    "../img/paises/ar.webp",
    "../img/paises/br.webp",
    "../img/paises/co.webp",
    "../img/paises/cu.webp",
    "../img/paises/do.webp",
    "../img/paises/es.webp",
    "../img/paises/id.webp",
    "../img/paises/jp.webp",
    "../img/paises/mx.webp"
];

let precargaArrancada = false;

async function iniciarPrecarga(retardo = 1800) {
    if (precargaArrancada) return;
    precargaArrancada = true;

    await esperar(retardo);
    console.log("[precarga] arrancando en background:", ORDEN_DE_PRECARGA.length, "recursos");

    for (const url of ORDEN_DE_PRECARGA) {
        try {
            const res = await fetch(url);
            if (!res.ok) console.log("[precarga] fallo:", url, res.status);
        } catch (error) {
            console.log("[precarga] error:", url, error && error.message);
        }
    }
    console.log("[precarga] lista: todo lo del juego esta en cache");
}
