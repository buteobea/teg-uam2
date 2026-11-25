# Web del TEG-UAM

Web del **Grupo de Investigación de Ecología y Conservación de Ecosistemas Terrestres (TEG-UAM)**, Departamento de Ecología, Universidad Autónoma de Madrid.

Web estática (HTML + CSS + JavaScript): sin PHP, WordPress ni base de datos, sin cookies. No requiere mantenimiento técnico ni actualizaciones de seguridad. Se publica gratis con GitHub Pages.

## Estructura

| Archivo | Qué es |
|---|---|
| `datos.js` | **Todos los contenidos**: líneas, miembros, proyectos, publicaciones, tesis y novedades. Es el único archivo que hay que editar para actualizar la web. |
| `index.html` | Diseño y funcionamiento (espectrograma, ordenación del equipo, Gantt de proyectos, buscador de publicaciones, calendario de tesis). |
| `img/` | Fotografías y logotipo. |

## Cómo actualizar contenidos

1. En GitHub, abre `datos.js` y pulsa el lápiz (*Edit this file*).
2. Copia un elemento existente de la lista que quieras ampliar (miembro, proyecto, publicación…) y cambia sus datos. Respeta comas, comillas y llaves.
3. Pulsa *Commit changes*. La web se actualiza sola en 1-2 minutos.

Campos principales:

- **Miembro**: `{ nombre, email (usuario UAM sin @uam.es), lineas ("vertebrados agraria"), puesto, orcid, coord: true }`
- **Proyecto**: `{ t (título), ref, fin_ (financiador), ini, fin (años), ip, linea, tipo ("life" | "nacional" | "internacional" | "contrato"), eur }` — un proyecto aparece «en curso» si `fin` ≥ 2026.
- **Publicación**: `{ a (año), au (autores), t (título), r (revista), v (vol: págs), doi, q ("Q1"…), oa: true, tipo ("art" | "cap" | "prensa") }`
- **Tesis**: `{ estado ("leida" | "curso"), autor, t, dir, fecha, prog }`
- **Novedad**: `{ fecha, tipo, t, txt, img, url }`

Identificadores de líneas: `vertebrados`, `agraria`, `pastizales`, `evaluacion`, `biogeografia`.

## Publicación

*Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`*.
Para usar el dominio `teguam.es`: *Settings → Pages → Custom domain* y crear en el proveedor del dominio los registros DNS que indica GitHub.

## Nota sobre el espectrograma

El espectrograma de la portada es una **simulación** generada en el navegador (no una grabación real); las cajas imitan detecciones automáticas de especies esteparias.
