# Web del TEG-UAM

Web del **Grupo de Investigación de Ecología y Conservación de Ecosistemas Terrestres (TEG-UAM)**, Departamento de Ecología, Universidad Autónoma de Madrid.

Web estática (HTML + CSS + JavaScript): sin PHP, WordPress ni base de datos, sin cookies. No requiere mantenimiento técnico ni actualizaciones de seguridad. Se publica gratis con GitHub Pages.

## Páginas

| Página | Contenido |
|---|---|
| `index.html` | Portada: espectrograma real (sin sonido), cifras clave y acceso a todas las secciones |
| `lineas.html` | Las cinco líneas, con su equipo, proyectos en curso y publicaciones recientes |
| `equipo.html` | Diagrama de ordenación del equipo y listado con buscador |
| `miembro.html?id=…` | Ficha individual (se genera sola: publicaciones, proyectos y tesis de cada persona) |
| `proyectos.html` | Diagrama de Gantt de proyectos con filtros |
| `proyecto.html?id=…` | Ficha de cada proyecto: resumen, financiación, IP, equipo y enlace a la web oficial |
| `mapa.html` | Mapa mundial y de España con las zonas de trabajo y colaboraciones |
| `publicaciones.html` | Evolución anual, buscador y botón «Copiar cita» |
| `tesis.html` | Calendario de defensas y listado de tesis |
| `novedades.html` | Novedades y presencia en medios |
| `contacto.html` | Contacto, formación y ofertas de TFG/TFM/tesis |

Todas las páginas existen también en inglés en `en/` (botón **EN/ES** del menú). Los textos de `datos.js` se traducen con los campos terminados en `_en` (`bio_en`, `resumen_en`, `t_en`…); si faltan, se muestra el texto en español.

## Cómo actualizar contenidos

👉 **Guía paso a paso para cualquier miembro del grupo: [EDITAR.md](EDITAR.md)** (recetas con ejemplos para noticias, miembros, proyectos, tesis, fotos, textos en inglés y qué hacer si algo falla).

**Todo el contenido está en `datos.js`.** No hace falta tocar ningún otro archivo.

1. En GitHub, abre `datos.js` y pulsa el lápiz (*Edit this file*).
2. Copia un elemento de la lista que quieras ampliar y cambia sus datos. Respeta comas, comillas y llaves.
3. Pulsa *Commit changes*. La web se actualiza sola en 1-2 minutos.

Cada bloque de `datos.js` lleva al principio un comentario que explica sus campos. Lo más habitual:

- **Publicaciones**: se añaden **solas** cada dos semanas (días 1 y 15) desde OpenAlex, ver abajo. Para añadir una a mano → `PUBLICACIONES`.
- **Miembro que deja la UAM** → añade `antiguo: true`; pasa a «Antiguos miembros».
- **Proyecto** → `PROYECTOS`; `resumen`/`resumen_en` para su ficha y `web` para el enlace oficial.
- **Nuevo miembro** → `MIEMBROS`. El campo `firma` (p. ej. `"Traba"` o `"Morales, M|M. B. Morales"`) sirve para enlazar sus publicaciones, proyectos y tesis automáticamente.
- **Años anteriores sin listado completo** → `ANUAL`, con el número total de artículos.
- **Nuevo lugar en el mapa** → `LUGARES`, con latitud y longitud en grados decimales.
- **Oferta de TFG/TFM/tesis** → `OFERTAS`.

## Imágenes

Las ilustraciones de las líneas y noticias se generan en el navegador (son vectoriales y se ven nítidas a cualquier tamaño). Para usar fotografías:

- Súbelas a `img/` (JPG de al menos 1600 px de ancho; retratos de 600 × 600 px).
- Indica la ruta en el campo `img` de la línea o la novedad, o en `foto` del miembro.

## Publicaciones automáticas

`.github/workflows/publicaciones.yml` ejecuta `herramientas/actualizar-publicaciones.mjs` los días 1 y 15 de cada mes. Busca en [OpenAlex](https://openalex.org) los trabajos nuevos de cada miembro (por ORCID o por nombre + afiliación UAM), descarta los duplicados y los guarda en `datos-auto.js`. Se puede lanzar a mano en *Actions → Publicaciones → Run workflow*. Si una persona sale mal identificada, corrige su id en `herramientas/autores-openalex.json`. Para pasar una publicación automática a la lista principal basta con moverla a `PUBLICACIONES`.

## Espectrograma de la portada

Es una grabación real convertida en imagen, que avanza en tiempo real y marca los cantos de la especie; no se reproduce ningún sonido. La actual es [XC838241](https://xeno-canto.org/838241) de Xeno-canto (cyclopithecus, *Chersophilus duponti*, Timoneda d'Alfés, Lleida, 2022; licencia CC BY-NC-SA 4.0, que exige citar la autoría, uso no comercial y compartir igual: la web lo cumple con el crédito al pie del espectrograma). Para cambiarla (necesita Python con numpy, scipy y Pillow, y ffmpeg para MP3/FLAC):

```
python3 herramientas/espectrograma.py grabacion.wav --desde 12 --hasta 52 \
  --especie "Chersophilus duponti" --lugar "Páramo de Layna (Soria)" --fecha 2025-04 --autor "Nombre Apellido" \
  --tabla seleccion_raven.txt      # opcional: recuadros de las detecciones
```

Genera `img/espectrograma.png` y `espectrograma.js`. Mientras `espectrograma.js` valga `null`, la portada muestra una lámina ilustrada en su lugar.

## Estadísticas de visitas

Con [GoatCounter](https://www.goatcounter.com) (gratuito, sin cookies, no necesita banner de consentimiento): crea una cuenta, por ejemplo `teguam`, y escribe ese código en `CONFIG.goatcounter` en `datos.js`. Las estadísticas se consultan en `https://teguam.goatcounter.com`.

## Publicación

*Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`*.
Para usar el dominio `teguam.es`: *Settings → Pages → Custom domain* y crear en el proveedor del dominio los registros DNS que indica GitHub.

## Dependencias externas

- Tipografías de Google Fonts (Archivo, IBM Plex Mono).
- Contornos de países para el mapa: `world-atlas@2.0.2` desde cdn.jsdelivr.net (si no carga, la página muestra igualmente la lista de lugares).
- `lib/d3.min.js` (d3 v7.9.0, incluido en el repositorio) para las proyecciones del mapa.

