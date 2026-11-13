# Créditos de música

Todas las pistas de `music/dances/` son fragmentos de audio **libre** descargados de
Wikimedia Commons. Los originales completos están en `music/_originales/`; de ahí
`tools/preparar-musica.mjs` saca **el trozo de 60 s con más ritmo** (no desde el
segundo 0, que en varias pistas era una introducción sin percussiones), lo normaliza a
−14 LUFS y lo exporta a mp3 mono 128 kbps.

El tempo y el tiempo fuerte los detecta `ritmo.js` (envolvente de ataques +
autocorrelación) y las flechas las arma la propia app al entrar al juego, colgando cada
nota del golpe real más cercano. La tabla de abajo es la que imprime el script.

| Baile | Archivo | Tempo | Corte | Golpes/10 s al inicio | Obra original | Licencia |
|---|---|---|---|---|---|---|
| Salsa | `salsa.mp3` | 112 BPM | 18.2 s | 62 | [PRINCE BARRETO - LA CUENTA.wav](https://commons.wikimedia.org/wiki/File:PRINCE_BARRETO_-_LA_CUENTA.wav) | CC BY-SA 4.0 |
| Merengue | `merengue.mp3` | 120 BPM | 21.1 s | 46 | [Notanico Merengue (ISRC USUAN1100130).mp3](https://commons.wikimedia.org/wiki/File:Notanico_Merengue_(ISRC_USUAN1100130).mp3) | CC BY 3.0 |
| Samba | `samba.mp3` | 136 BPM | 11.2 s | 48 | [53704 reinsamba samba-batucada1.wav](https://commons.wikimedia.org/wiki/File:53704_reinsamba_samba-batucada1.wav) | CC BY 4.0 |
| Flamenco | `flamenco.mp3` | 141 BPM | 4.5 s | 46 | ["La Farruca" interpretada por El Mochuelo](https://commons.wikimedia.org/wiki/File:%22La_Farruca%22_interpretada_por_El_Mochuelo_-_original.wav) | CC BY-SA 4.0 |
| Irish Ceili | `ceilidh.mp3` | 103 BPM | 79.9 s | 37 | [1-07 The Irish Ballad.mp3](https://commons.wikimedia.org/wiki/File:1-07_The_Irish_Ballad.mp3) | Dominio público |
| Baile del Ainu | `ainu.mp3` | 72 BPM (declarado) | — | 28 | [Audio recording of an Ainu song by Bronisław Piłsudski](https://commons.wikimedia.org/wiki/File:Audio_recording_of_an_Ainu_song_by_Bronis%C5%82aw_Pi%C5%82sudski.mp3) | Dominio público |
| Izena no Kai | `izena.mp3` | 152 BPM | 71.4 s | 39 | [InNantouChyou.wav](https://commons.wikimedia.org/wiki/File:InNantouChyou.wav) | CC BY-SA 4.0 |
| Sinte | `sinte.mp3` | 88 BPM | — | 20 | [Ceramic Djembe.wav](https://commons.wikimedia.org/wiki/File:Ceramic_Djembe.wav) | CC0 |
| Adowa | `adowa.mp3` | 88 BPM | 108.5 s | 50 | [Kpanlogo Rhythmus.wav](https://commons.wikimedia.org/wiki/File:Kpanlogo_Rhythmus.wav) | CC BY-SA 4.0 |
| El Haka | `haka.mp3` | 160 BPM | 56.5 s | 52 | [CXLVIII - 03 - haka.ogg](https://commons.wikimedia.org/wiki/File:CXLVIII_-_03_-_haka.ogg) | CC BY 4.0 |
| El Hula | `hula.mp3` | 66 BPM (declarado) | 9.4 s | 45 | [Palakiko & Paaluhi - Southern Blues.mp3](https://commons.wikimedia.org/wiki/File:Palakiko_%26_Paaluhi_(Ferera_%26_Paaluhi)_-_Southern_Blues.mp3) | Dominio público |

El script deja también `cortes.json` con estos mismos números, para no tener que volver
a mirar la consola.

## Notas sobre los casos dudosos

- **Baile del Ainu** y **El Hula** llevan un tempo declarado a mano (72 y 66 BPM) en
  `ritmo.js`, y el script lo marca con `<-- declarado a mano`. Son piezas de canto y de
  grabación de 1920 muy lenta: la autocorrelación da un pico de 0.11 y 0.05, o sea
  ruido. Se usa un tempo lento y compatible con el carácter del baile.
- **Sinte** y **Baile del Ainu** son pistas muy cortas (11 s y 20 s), más cortas que el
  fragmento de 60 s. Se repiten con un fundido de 0.8 s, así que el juego tiene música
  suficiente y sin cortes. Por eso su columna "Corte" está vacía: no hay dónde elegir.
- **El Haka** mide 160 BPM, más rápido que los 105 que daba la medición anterior sobre
  solo 60 s de la pista. Con la pista entera, la rejilla de 160 BPM es la que mejor
  explica dónde caen los golpes, y a 0.37 s por negra es un tempo de cante, que es lo
  que es un haka.
- **Izena no Kai**: no existe grabación okinawana libre en Wikimedia Commons (las
  categorías *Music of Okinawa* y *Sanshin* están vacías o no tienen audio). La pista
  elegida es una canción de bon dance japonesa, del mismo país y del mismo tipo de
  festa, pero **no es una pieza de Izena**. Si consigues una grabación con licencia
  clara de Izena u Okinawan, sustituye `music/_originales/izena.*` y ejecuta
  `node tools/preparar-musica.mjs`.

## Créditos de los vectores de continentes

`continents.js` se generó a partir de **Natural Earth 1:110m Admin 0 Countries**
(dominio público, https://www.naturalearthdata.com/), con proyección equirectangular
propia. Cada continente va a 1000 px de alto, con el antimeridiano corregido anillo
por anillo y Rusia partida en los Urales (lon 60°).

## Otros recursos

- Banderas: [flagcdn.com](https://flagcdn.com)
- Modelo de pose: MediaPipe Pose (BlazePose) 0.5, `mediapipe_pose/` incluido en el proyecto
