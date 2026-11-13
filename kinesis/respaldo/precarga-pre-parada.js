/* ============================================================
   PRECARGA GLOBAL
   La primera pantalla es la de conectar (connect.html): mientras
   el jugador conecta la placa, el navegador baja en orden TODO lo
   que van a pedir las pantallas siguientes (videos de los pasos,
   musica, portadas). Todo queda en el cache HTTP: cuando el
   jugador llega a elegir/detector/juego no espera ni un clip.
   ------------------------------------------------------------
   Se baja en COLA (uno a la vez) para no saturar la conexion con
   20 pedidos a la vez, y arranca con un retardo para darle
   prioridad a lo de la propia pantalla (fondo, conectado).
   ============================================================ */

const ORDEN_DE_PRECARGA = [
    /* 1) Fondo compartido y videos de ejercicios: lo que frena al
          jugador en el detector y en el juego. */
    "../img/fondo-4K.webm",

    /* Salsa (los repiten el detector y el juego) */
    "../img/dances/deteccion-bailes/Salsa/izquierda.mp4",
    "../img/dances/deteccion-bailes/Salsa/derecha.mp4",
    "../img/dances/deteccion-bailes/Salsa/adelante-izquierda.mp4",
    "../img/dances/deteccion-bailes/Salsa/adelante-derecha.mp4",
    "../img/dances/deteccion-bailes/Salsa/izquierda-atras.mp4",
    "../img/dances/deteccion-bailes/Salsa/derecha-atras.mp4",
    "../img/abajo_izquierda.webm",
    "../img/abajo_derecha.webm",

    /* Merengue */
    "../img/dances/deteccion-bailes/Merengue/adelante.mp4",
    "../img/dances/deteccion-bailes/Merengue/atras.mp4",
    "../img/dances/deteccion-bailes/Merengue/derecha.mp4",
    "../img/dances/deteccion-bailes/Merengue/vuelta.mp4",

    /* Samba */
    "../img/dances/deteccion-bailes/Samba/pasitos-derecha.mp4",
    "../img/dances/deteccion-bailes/Samba/adelante.mp4",
    "../img/dances/deteccion-bailes/Samba/atras.mp4",
    "../img/dances/deteccion-bailes/Samba/atras-rapido.mp4",

    /* Flamenco */
    "../img/dances/deteccion-bailes/Flamenco/izquierda-alante.webm",
    "../img/dances/deteccion-bailes/Flamenco/derecha-alante.webm",
    "../img/dances/deteccion-bailes/Flamenco/izquierda.webm",
    "../img/dances/deteccion-bailes/Flamenco/derecha.webm",

    /* 2) Musica de los bailes (suena en elegir y juego) */
    "../music/dances/salsa.mp3",
    "../music/dances/merengue.mp3",
    "../music/dances/samba.mp3",
    "../music/dances/irish ceili.mp3",
    "../music/dances/flamenco.mp3",
    "../music/dances/areito.mp3",

    /* 3) Efectos (pequenos, el navegador los pide igual) */
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

    /* 4) Portadas y banderas de la pantalla de elegir */
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

/* Solo se lanza una vez: si el jugador recarga ya no importa. */
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
            /* Sin conexion o servidor caido: no hay drama, la app
               funciona igual, solo tardaria al pedirse por primera vez. */
            console.log("[precarga] error:", url, error && error.message);
        }
    }
    console.log("[precarga] lista: todo lo del juego esta en cache");
}
