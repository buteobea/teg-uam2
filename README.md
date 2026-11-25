# Web del TEG-UAM

Web del **Grupo de Investigación de Ecología y Conservación de Ecosistemas Terrestres (TEG-UAM)**, Departamento de Ecología, Universidad Autónoma de Madrid.

Web estática (HTML + CSS + JavaScript): sin PHP, WordPress ni base de datos, sin cookies. No requiere mantenimiento técnico ni actualizaciones de seguridad. Se publica gratis con GitHub Pages.

## Páginas

| Página | Contenido |
|---|---|
| `index.html` | Portada: espectrograma animado, cifras clave y acceso a todas las secciones |
| `lineas.html` | Las cinco líneas, con su equipo, proyectos en curso y publicaciones recientes |
| `equipo.html` | Diagrama de ordenación del equipo y listado con buscador |
| `miembro.html?id=…` | Ficha individual (se genera sola: publicaciones, proyectos y tesis de cada persona) |
| `proyectos.html` | Diagrama de Gantt de proyectos con filtros |
| `mapa.html` | Mapa mundial y de España con las zonas de trabajo y colaboraciones |
| `publicaciones.html` | Evolución anual, buscador y botón «Copiar cita» |
| `tesis.html` | Calendario de defensas y listado de tesis |
| `novedades.html` | Novedades y presencia en medios |
| `contacto.html` | Contacto, formación y ofertas de TFG/TFM/tesis |

## Cómo actualizar contenidos

**Todo el contenido está en `datos.js`.** No hace falta tocar ningún otro archivo.

1. En GitHub, abre `datos.js` y pulsa el lápiz (*Edit this file*).
2. Copia un elemento de la lista que quieras ampliar y cambia sus datos. Respeta comas, comillas y llaves.
3. Pulsa *Commit changes*. La web se actualiza sola en 1-2 minutos.

Cada bloque de `datos.js` lleva al principio un comentario que explica sus campos. Lo más habitual:

- **Nueva publicación** → `PUBLICACIONES`. La gráfica anual y las fichas personales se actualizan solas.
- **Nuevo miembro** → `MIEMBROS`. El campo `firma` (p. ej. `"Traba"` o `"Morales, M|M. B. Morales"`) sirve para enlazar sus publicaciones, proyectos y tesis automáticamente.
- **Años anteriores sin listado completo** → `ANUAL`, con el número total de artículos.
- **Nuevo lugar en el mapa** → `LUGARES`, con latitud y longitud en grados decimales.
- **Oferta de TFG/TFM/tesis** → `OFERTAS`.

## Imágenes

Las ilustraciones de las líneas y noticias se generan en el navegador (son vectoriales y se ven nítidas a cualquier tamaño). Para usar fotografías:

- Súbelas a `img/` (JPG de al menos 1600 px de ancho; retratos de 600 × 600 px).
- Indica la ruta en el campo `img` de la línea o la novedad, o en `foto` del miembro.

## Publicación

*Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`*.
Para usar el dominio `teguam.es`: *Settings → Pages → Custom domain* y crear en el proveedor del dominio los registros DNS que indica GitHub.

## Dependencias externas

- Tipografías de Google Fonts (Archivo, IBM Plex Mono).
- Contornos de países para el mapa: `world-atlas@2.0.2` desde cdn.jsdelivr.net (si no carga, la página muestra igualmente la lista de lugares).
- `lib/d3.min.js` (d3 v7.9.0, incluido en el repositorio) para las proyecciones del mapa.

El espectrograma de la portada es una **simulación** generada en el navegador, no una grabación real.
