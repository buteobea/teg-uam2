# Cómo editar la web del TEG-UAM

Esta guía es para cualquier miembro del grupo. No hace falta saber programar ni instalar nada: todo se hace desde el navegador, en GitHub.

> **Resumen en una línea:** abre `datos.js` → pulsa el lápiz ✏️ → copia un bloque parecido al que quieres añadir y cambia los textos → *Commit changes*. En 1-2 minutos está publicado.

---

## Índice

1. [Antes de empezar (solo la primera vez)](#1-antes-de-empezar-solo-la-primera-vez)
2. [Cómo se edita, paso a paso](#2-cómo-se-edita-paso-a-paso)
3. [Las 5 reglas para no romper nada](#3-las-5-reglas-para-no-romper-nada)
4. [Recetas: qué cambiar para cada cosa](#4-recetas-qué-cambiar-para-cada-cosa)
5. [Subir una foto](#5-subir-una-foto)
6. [Textos en inglés](#6-textos-en-inglés)
7. [Lo que se actualiza solo](#7-lo-que-se-actualiza-solo)
8. [Si algo sale mal](#8-si-algo-sale-mal)
9. [Preguntas frecuentes](#9-preguntas-frecuentes)

---

## 1. Antes de empezar (solo la primera vez)

1. Crea una cuenta gratuita en [github.com](https://github.com/signup) (sirve el correo de la UAM).
2. Pide a quien administra la web que te añada como colaborador/a del repositorio. Te llegará un correo de invitación: acéptalo.
3. Guarda en favoritos el archivo de datos: **https://github.com/buteobea/teg-uam2/blob/main/datos.js**

## 2. Cómo se edita, paso a paso

1. Abre `datos.js` (el enlace de arriba).
2. Pulsa el icono del **lápiz ✏️** (*Edit this file*), arriba a la derecha.
3. Busca la sección que quieres tocar con **Ctrl + F** (Cmd + F en Mac). Cada sección empieza con un comentario en mayúsculas que explica sus campos, por ejemplo `/* NOVEDADES ... */`.
4. Haz el cambio (ver las [recetas](#4-recetas-qué-cambiar-para-cada-cosa)).
5. Pulsa el botón verde **Commit changes…**. En el cuadro que aparece, escribe en *Commit message* una frase corta sobre lo que has hecho (p. ej. «Añade noticia premio SEO») y vuelve a pulsar **Commit changes**.
6. Espera 1-2 minutos y recarga la web (si no ves el cambio, pulsa Ctrl + Shift + R para saltarte la caché).

## 3. Las 5 reglas para no romper nada

Cada elemento de una lista es un bloque entre llaves `{ ... }`. Al copiar uno:

1. **Cada bloque termina en coma**: `},`
2. **Los textos van entre comillas dobles**: `"así"`. Si un texto lleva comillas dentro, usa las tipográficas «así» o escribe `\"`.
3. **Entre campos, coma**: `"t": "Título", "a": 2026`
4. **Los números y `true`/`false` van sin comillas**: `"a": 2026`, `"oa": true`
5. **No borres la línea `window.ALGO = [` ni el `];` final** de cada lista.

Ejemplo correcto (fíjate en las comas y comillas):

```js
  { "fecha": "2026", "tipo": "Premio", "t": "Título de la noticia", "txt": "Texto breve." },
```

## 4. Recetas: qué cambiar para cada cosa

En todas: **copia un bloque existente de la misma lista y pégalo justo debajo**, y luego cambia sus datos. Los campos que no necesites puedes borrarlos (salvo los marcados como obligatorios).

### Añadir una noticia → `NOVEDADES`

Las noticias van **de más reciente a más antigua**: pega la nueva **la primera** de la lista. Las tres primeras salen en la portada.

```js
  { "fecha": "dic. 2026", "tipo": "Proyecto", "t": "Título corto", "txt": "Una o dos frases.",
    "t_en": "Short title", "txt_en": "One or two sentences." },
```

`tipo` es una etiqueta libre: Premio, Proyecto, Ciencia abierta, Divulgación, Prensa…

### Añadir una persona → `MIEMBROS`

```js
  { "nombre": "Nombre Apellido Apellido", "email": "nombre.apellido", "lineas": "vertebrados agraria",
    "puesto": "Investigadora predoctoral", "firma": "Apellido, N|N. Apellido",
    "orcid": "0000-0000-0000-0000", "foto": "img/personas/nombre-apellido.jpg",
    "bio": "Dos o tres frases.", "bio_en": "Two or three sentences." },
```

- **Obligatorios:** `nombre`, `lineas`.
- `email`: solo lo que va antes de `@uam.es`.
- `lineas`: una o varias de estas, separadas por un espacio: `vertebrados`, `agraria`, `pastizales`, `evaluacion`, `biogeografia`.
- `firma`: cómo aparece tu apellido en las autorías de los artículos. Con esto, tus publicaciones, proyectos y tesis salen solos en tu ficha. Si firmas de varias formas, sepáralas con `|`.
- `orcid`: muy recomendable, porque con él tus publicaciones nuevas se añaden solas (ver [apartado 7](#7-lo-que-se-actualiza-solo)).
- Otros campos opcionales: `despacho`, `tel`, `uam` (enlace a tu ficha en la web de la UAM), `rg` (ResearchGate), `scholar` (Google Scholar), `web` (página personal), `coord: true` (coordinación).

### Cambiar tu ficha (bio, foto, despacho…) → `MIEMBROS`

Busca tu nombre con Ctrl + F y cambia el campo. Para añadir un campo que no tienes, añádelo dentro de tus llaves con su coma: `, "tel": "914 978 000"`.

### Alguien deja el grupo → `MIEMBROS`

**No lo borres.** Añade `"antiguo": true` en su bloque. Pasará a la sección «Antiguos miembros» y sus publicaciones seguirán enlazadas.

```js
  { "nombre": "Nombre Apellido", "antiguo": true, ... },
```

### Añadir un proyecto → `PROYECTOS`

```js
  { "t": "Título del proyecto", "ref": "PID2026-000000OB-I00", "fin_": "MICIU · Plan Estatal",
    "ini": 2026, "fin": 2029, "ip": "Nombre Apellido", "linea": "agraria", "tipo": "nacional",
    "eur": "150.000 €", "web": "https://web-oficial-del-proyecto.org",
    "resumen": "Qué estudia el proyecto en 2-4 frases.", "resumen_en": "What the project studies." },
```

- **Obligatorios:** `t`, `ini`, `fin`, `tipo`.
- `tipo`: `life`, `nacional`, `internacional` o `contrato` (decide el color en el diagrama).
- `fin_`: el financiador. `ini`/`fin`: años de inicio y fin (sin comillas).
- Cada proyecto tiene su propia página, que se crea sola. `resumen` y `web` aparecen en ella.

### Añadir una publicación a mano → `PUBLICACIONES`

Normalmente **no hace falta**: se añaden solas cada dos semanas. Úsalo para libros, capítulos, divulgación o algo que no aparezca.

```js
  { "a": 2026, "au": "Apellido, N.; Otro, A.", "t": "Título", "r": "Revista o editorial",
    "v": "12(3): 45-67", "doi": "10.xxxx/xxxxx", "q": "Q1", "oa": true, "tipo": "art" },
```

`tipo`: `art` (artículo), `cap` (libro o capítulo), `div` (divulgación), `nota` (editorial, carta o nota), `prensa`. Para el DOI, pon solo el código, sin `https://doi.org/`.

### Añadir una tesis → `TESIS`

```js
  { "estado": "curso", "autor": "Nombre Apellido", "t": "Título de la tesis",
    "dir": "J. Traba y A. Barrero", "fecha": "2029", "prog": "Doctorado en Ecología (UAM)" },
```

`estado`: `curso` (en marcha) o `leida`. Cuando se defienda, cambia a `leida` y pon la fecha exacta (`"28/05/2029"`).

### Añadir un premio → `PREMIOS`

```js
  { "a": 2026, "quien": "Nombre Apellido", "t": "Nombre del premio", "t_en": "Award name" },
```

### Añadir un congreso, jornada o curso → `ACTIVIDADES`

```js
  { "fecha": "mayo 2026", "t": "Nombre de la actividad", "lugar": "UAM, Madrid",
    "quien": "Organiza", "t_en": "Activity name" },
```

### Publicar una oferta de TFG, TFM, tesis o contrato → `OFERTAS`

**Lo más fácil: el formulario.** No hace falta tocar `datos.js`.

1. En el repositorio, abre la pestaña **Issues → New issue → «📢 Nueva oferta»** (o entra directamente en [este enlace](https://github.com/buteobea/teg-uam2/issues/new?template=oferta.yml); también está en la web, al final de «Ofertas abiertas»).
2. Rellena los campos: tipo, título, descripción, línea, quién dirige, correo, fecha límite (AAAA-MM-DD), inicio, duración, si es remunerada y un enlace a la convocatoria. Los campos en inglés son opcionales.
3. Pulsa **Submit new issue**. En un par de minutos la oferta aparece en la web (Contacto → Ofertas abiertas, aviso en la portada y en la ficha de quien la dirige) y GitHub te deja un comentario confirmándolo. Si falta algo o la fecha está mal escrita, el comentario te dice qué corregir.

- **Corregirla:** en la issue, menú **···** → **Edit**, cambia lo que sea y guarda. La web se actualiza sola.
- **Retirarla** (plaza cubierta): pulsa **Close issue**. Si pusiste fecha límite, también se oculta sola al día siguiente.
- Solo publica automáticamente quien tiene acceso al repositorio. Si otra persona usa el formulario, no se publica nada.

**A mano**, si lo prefieres, en `datos.js`:

```js
window.OFERTAS = [
  { "tipo": "TFM", "t": "Uso del espacio de la ganga ortega", "txt": "Trabajo de campo en primavera y análisis en R.",
    "linea": "agraria", "dirige": "Juan Traba, Adrián Barrero", "contacto": "juan.traba@uam.es",
    "plazo": "2027-03-31", "inicio": "septiembre 2027", "duracion": "1 curso", "remunerada": "No" },
];
```

### Añadir un estudiante visitante o Erasmus → `ESTANCIAS`

```js
  { "quien": "Nombre Apellido", "origen": "Universidad (País)", "prog": "Erasmus+",
    "fecha": "feb.–jun. 2027", "tema": "Tema de la estancia", "tema_en": "Topic" },
```

### Añadir un lugar al mapa → `LUGARES`

```js
  { "n": "Nombre del sitio", "pais": "España", "lat": 41.23, "lon": -2.45, "tipo": "campo",
    "linea": "vertebrados", "txt": "Qué hacemos allí.", "n_en": "Site name", "txt_en": "What we do there." },
```

- `tipo`: `campo` (trabajo de campo), `colab` (colaboración) o `sede`.
- Coordenadas: en Google Maps, clic derecho sobre el sitio → copia los dos números (el primero es `lat`, el segundo `lon`).
- `pais` en español y con el nombre habitual (España, Brasil, Chile…).

### Añadir un financiador → `FINANCIADORES`

```js
  { "n": "Nombre de la entidad", "n_en": "Name in English", "tipo": "publico", "url": "https://web-de-la-entidad.org",
    "logo": "img/logos/entidad.png", "buscar": "Nombre corto|Sigla" },
```

- `tipo`: `publico`, `internacional` o `empresa` (las empresas aparecen marcadas como «Transferencia» y al final).
- `buscar`: palabras que aparecen en el campo `fin_` de sus proyectos, separadas por `|`. Sirve para que la web cuente sola cuántos proyectos ha financiado.
- `logo` es opcional: sin logo se muestra el nombre. Sube los logos a `img/logos/` (PNG o SVG con fondo transparente).

### Añadir un colaborador → `COLABORADORES`

```js
  { "n": "Nombre de la institución", "pais": "Portugal", "url": "https://..." },
```

Son las instituciones con las que el grupo colabora de forma estable. Las coautorías con otras instituciones salen solas en la página **Red**.

### Añadir fotos a la galería → `GALERIA`

1. Sube las fotos a la carpeta `img/galeria/` (ver [Subir una foto](#5-subir-una-foto)). Pueden ser grandes: la web las reduce sola al publicar.
2. Añade un bloque por foto:

```js
window.GALERIA = [
  { "img": "img/galeria/anillamiento-2026.jpg", "pie": "Anillamiento de alondras en Layna", "pie_en": "Ringing larks in Layna",
    "autor": "Nombre Apellido", "fecha": "abril 2026", "lugar": "Soria", "linea": "vertebrados" },
];
```

- `autor` es obligatorio: hay que indicar siempre quién hizo la foto. Sube solo fotos propias o con permiso, y evita que se reconozca a personas que no hayan dado su consentimiento.
- La página **Galería** aparece sola en el menú en cuanto hay al menos una foto.

### Activar las estadísticas de visitas → `CONFIG`

Escribe el código de la cuenta de GoatCounter entre las comillas: `goatcounter: "teguam"`.

## 5. Subir una foto

1. Prepara la foto: **cuadrada**, de unos **600 × 600 px**, en **JPG**. Ponle un nombre sin tildes, eñes ni espacios: `nombre-apellido.jpg`.
2. En GitHub, entra en la carpeta `img/personas/`.
3. Pulsa **Add file → Upload files**, arrastra la foto y pulsa **Commit changes**.
4. En tu bloque de `MIEMBROS`, pon `"foto": "img/personas/nombre-apellido.jpg"`.

Si no hay foto, la web muestra tus iniciales.

## 6. Textos en inglés

La web tiene versión en inglés (botón **EN** del menú). Casi todos los campos de texto tienen su gemelo terminado en `_en`: `bio_en`, `resumen_en`, `t_en`, `txt_en`, `tema_en`, `n_en`…

- Si rellenas el `_en`, se usa en la versión inglesa.
- Si lo dejas sin poner, la versión inglesa muestra el texto en español. No se rompe nada.

Los títulos de publicaciones y tesis no se traducen.

## 7. Lo que se actualiza solo

- **Publicaciones:** los días 1 y 15 de cada mes, la web busca en [OpenAlex](https://openalex.org) los artículos nuevos de cada miembro y los añade (archivo `datos-auto.js`; no lo edites a mano). Funciona mucho mejor si cada persona tiene su `orcid` en `MIEMBROS`. Para lanzarlo en el momento: pestaña **Actions → Actualizar publicaciones → Run workflow**.
- **Citas, índice h y red de colaboraciones:** se actualizan a la vez que las publicaciones, también desde OpenAlex (archivo `datos-citas.js`; no lo edites a mano).
- **Gráficas, cifras de la portada, fichas personales y páginas de proyecto:** se calculan solas a partir de `datos.js`.
- **Espectrograma de la portada:** es una grabación real de alondra ricotí de [Xeno-canto (XC838241)](https://xeno-canto.org/838241), licencia CC BY-NC-SA 4.0, sin sonido. Para cambiarlo por otra grabación, ver el `README.md`.

## 8. Si algo sale mal

**La web comprueba sola cada cambio.** Al guardar `datos.js`, GitHub revisa el archivo en un minuto:

- ✅ **Tic verde:** todo bien, la web se actualiza.
- ❌ **Cruz roja:** hay un error y **la web no se actualiza** (sigue publicada la última versión buena, así que nadie ve la web rota). Para ver qué pasa, pulsa la ✗ (junto al nombre del último cambio, en la página principal del repositorio) → **Details**. Verás un mensaje en español con la línea exacta, por ejemplo:
  > datos.js línea 76: Proyecto «LIFE Iber-Ricotí…»: "ini" y "fin" deben ser años sin comillas.
- Los **avisos** (triángulo amarillo, p. ej. «falta la traducción al inglés») no impiden publicar.

**Para arreglar un error:** abre `datos.js`, pulsa el lápiz, ve a la línea indicada (o a la anterior) y revísala con [las 5 reglas](#3-las-5-reglas-para-no-romper-nada).
- **Deshacerlo:** en `datos.js`, pulsa **History** (arriba a la derecha), abre la versión anterior a tu cambio, pulsa **…** → **View file**, copia el contenido y pégalo en el editor. Nada se pierde: GitHub guarda todas las versiones y quién hizo cada cambio.

**No veo mi cambio:** espera 2 minutos y recarga con Ctrl + Shift + R. En la pestaña **Actions** se ve si la publicación ha terminado (tic verde).

**Una publicación automática está mal asignada:** muévela de `datos-auto.js` a `PUBLICACIONES` corregida, o avisa a quien administra la web para corregir `herramientas/autores-openalex.json`.

## 9. Preguntas frecuentes

**¿Puedo estropear la web de forma permanente?** No. Cualquier cambio se puede deshacer desde *History*.

**¿Tengo que tocar los archivos `.html`, `app.js` o `styles.css`?** No. Solo `datos.js` (y fotos en `img/`). Los demás archivos son el diseño.

**¿Tengo que escribir mis publicaciones?** No, salvo libros, capítulos o divulgación que no aparezcan en OpenAlex.

**¿Dónde cambio los textos fijos (portada, contacto…)?** Están en los `.html`, que se generan con una herramienta. Pide el cambio a quien administra la web.

**¿Quién administra la web?** Beatriz Cortés Caballero (Investigadora predoctoral, línea de vertebrados).
