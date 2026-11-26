/* =====================================================================
   Comprobación automática de datos.js (se ejecuta sola en GitHub en cada cambio)
   ---------------------------------------------------------------------
   Busca los errores típicos al editar a mano: comas o comillas que faltan,
   campos obligatorios vacíos, años que no son números, líneas de investigación
   que no existen, fotos que no están en img/, etc.
   · Si hay ERRORES, la web no se publica y GitHub marca el cambio con una ✗ roja
     y la línea exacta del problema.
   · Los AVISOS no bloquean nada (p. ej. falta la traducción al inglés).
   Para probarlo en tu ordenador: node herramientas/validar.mjs
   ===================================================================== */
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GH = !!process.env.GITHUB_ACTIONS;
const errores = [], avisos = [];
const NOW = new Date().getFullYear();

function cargar(nombre) {
  const f = path.join(RAIZ, nombre); if (!fs.existsSync(f)) return { win: {}, src: '', f: nombre };
  const src = fs.readFileSync(f, 'utf8'), ctx = { window: {} }; vm.createContext(ctx);
  try { new vm.Script(src, { filename: nombre }).runInContext(ctx); }
  catch (e) {
    const m = String(e.stack || '').match(new RegExp(nombre.replace('.', '\\.') + ':(\\d+)'));
    errores.push({ f: nombre, line: m ? +m[1] : 1, msg: `El archivo no se puede leer (${e.message}). Suele ser una coma, unas comillas o una llave que faltan o sobran en esa línea o en la anterior.` });
  }
  return { win: ctx.window, src, f: nombre };
}
const D = cargar('datos.js'); cargar('datos-auto.js'); cargar('datos-citas.js'); cargar('espectrograma.js');
const lineaDe = (txt) => { if (!txt) return 1; const i = D.src.indexOf(JSON.stringify(String(txt)).slice(1, -1)); return i < 0 ? 1 : D.src.slice(0, i).split('\n').length; };
const err = (ref, msg) => errores.push({ f: 'datos.js', line: lineaDe(ref), msg });
const warn = (ref, msg) => avisos.push({ f: 'datos.js', line: lineaDe(ref), msg });

if (!errores.length) {
  const W = D.win;
  const listas = ['LINEAS', 'MIEMBROS', 'PROYECTOS', 'PUBLICACIONES', 'TESIS', 'LUGARES', 'NOVEDADES', 'OFERTAS', 'PREMIOS', 'ACTIVIDADES', 'ESTANCIAS', 'FINANCIADORES', 'COLABORADORES', 'GALERIA'];
  for (const k of listas) if (W[k] !== undefined && !Array.isArray(W[k])) err(`window.${k}`, `${k} debe ser una lista entre corchetes [ ... ].`);
  for (const k of ['LINEAS', 'MIEMBROS', 'PROYECTOS', 'PUBLICACIONES']) if (!Array.isArray(W[k])) err('', `Falta la lista ${k}: no se puede borrar la línea «window.${k} = [».`);
  const L = new Set((W.LINEAS || []).map(l => l.id));
  const txt = v => typeof v === 'string' && v.trim() !== '';
  const num = v => typeof v === 'number' && Number.isFinite(v);
  const local = p => p && !/^(https?:|data:|\/\/)/.test(p);
  const existe = p => fs.existsSync(path.join(RAIZ, p.split('?')[0]));
  const url = (o, k, ref) => { if (o[k] && !/^https?:\/\//.test(o[k])) err(ref, `«${k}» debe ser una dirección web completa que empiece por https:// (ahora: "${o[k]}").`); };
  const obj = (o, k, ref) => { if (!o || typeof o !== 'object' || Array.isArray(o)) { err(ref, `Un elemento de ${k} no es un bloque { ... } válido.`); return false; } return true; };

  const vistos = new Set();
  (W.MIEMBROS || []).forEach((m, i) => { if (!obj(m, 'MIEMBROS')) return; const r = m.nombre || `MIEMBROS nº ${i + 1}`;
    if (!txt(m.nombre)) err(r, `MIEMBROS nº ${i + 1}: falta "nombre".`);
    if (vistos.has(m.nombre)) err(r, `«${m.nombre}» aparece dos veces en MIEMBROS.`); vistos.add(m.nombre);
    for (const id of String(m.lineas || '').split(/\s+/).filter(Boolean)) if (!L.has(id)) err(r, `${m.nombre}: la línea «${id}» no existe. Usa: ${[...L].join(', ')}.`);
    if (!m.antiguo && !txt(m.lineas)) warn(r, `${m.nombre}: no tiene "lineas" asignadas.`);
    if (!m.antiguo && !txt(m.firma)) warn(r, `${m.nombre}: sin "firma" no se enlazan sus publicaciones.`);
    if (m.email && /@uam\.es$/i.test(m.email)) warn(r, `${m.nombre}: en "email" basta con lo que va antes de @uam.es.`);
    if (m.orcid && !/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(m.orcid)) err(r, `${m.nombre}: el ORCID «${m.orcid}» no tiene el formato 0000-0000-0000-0000.`);
    if (local(m.foto) && !existe(m.foto)) err(m.foto, `${m.nombre}: no existe la foto «${m.foto}». Súbela a img/personas/ o corrige el nombre (mayúsculas, tildes y extensión cuentan).`);
    ['uam', 'rg', 'scholar', 'web'].forEach(k => url(m, k, r));
    if (m.antiguo !== undefined && typeof m.antiguo !== 'boolean') err(r, `${m.nombre}: "antiguo" debe ser true o false, sin comillas.`);
    if (!m.antiguo && txt(m.bio) && !txt(m.bio_en)) warn(r, `${m.nombre}: falta "bio_en" (biografía en inglés).`); });

  const TIPOS_P = ['life', 'nacional', 'internacional', 'contrato'];
  (W.PROYECTOS || []).forEach((p, i) => { if (!obj(p, 'PROYECTOS')) return; const r = p.t || `PROYECTOS nº ${i + 1}`;
    if (!txt(p.t)) err(r, `PROYECTOS nº ${i + 1}: falta el título "t".`);
    if (!num(p.ini) || !num(p.fin)) err(r, `Proyecto «${(p.t || '').slice(0, 50)}»: "ini" y "fin" deben ser años sin comillas (p. ej. "ini": 2026).`);
    else if (p.fin < p.ini) err(r, `Proyecto «${p.t.slice(0, 50)}»: el año de fin es anterior al de inicio.`);
    if (!TIPOS_P.includes(p.tipo)) err(r, `Proyecto «${(p.t || '').slice(0, 50)}»: "tipo" debe ser ${TIPOS_P.join(', ')}.`);
    if (p.linea && !L.has(p.linea)) err(r, `Proyecto «${(p.t || '').slice(0, 50)}»: la línea «${p.linea}» no existe.`);
    url(p, 'web', r); });

  const TIPOS_B = ['art', 'cap', 'div', 'nota', 'prensa'], dois = new Map();
  (W.PUBLICACIONES || []).forEach((b, i) => { if (!obj(b, 'PUBLICACIONES')) return; const r = b.t || `PUBLICACIONES nº ${i + 1}`;
    if (!txt(b.t)) err(r, `PUBLICACIONES nº ${i + 1}: falta el título "t".`);
    if (!num(b.a) || b.a < 1950 || b.a > NOW + 1) err(r, `Publicación «${(b.t || '').slice(0, 50)}»: el año "a" debe ser un número sin comillas (p. ej. "a": 2026).`);
    if (!TIPOS_B.includes(b.tipo)) err(r, `Publicación «${(b.t || '').slice(0, 50)}»: "tipo" debe ser ${TIPOS_B.join(', ')}.`);
    if (b.q && !/^Q[1-4]$/.test(b.q)) err(r, `Publicación «${(b.t || '').slice(0, 50)}»: "q" debe ser Q1, Q2, Q3 o Q4.`);
    if (b.oa !== undefined && typeof b.oa !== 'boolean') err(r, `Publicación «${(b.t || '').slice(0, 50)}»: "oa" debe ser true o false, sin comillas.`);
    if (b.doi && /^https?:/i.test(b.doi)) warn(r, `Publicación «${b.t.slice(0, 50)}»: en "doi" basta el código (10.xxxx/…), sin https://doi.org/.`);
    if (b.doi) { const d = b.doi.toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, ''); if (dois.has(d)) warn(r, `Publicación repetida (mismo DOI que «${dois.get(d).slice(0, 40)}»).`); dois.set(d, b.t); } });

  (W.TESIS || []).forEach((t, i) => { if (!obj(t, 'TESIS')) return; const r = t.autor || `TESIS nº ${i + 1}`;
    if (!txt(t.autor) || !txt(t.t)) err(r, `TESIS nº ${i + 1}: faltan "autor" o "t".`);
    if (!['leida', 'curso'].includes(t.estado)) err(r, `Tesis de ${t.autor || '?'}: "estado" debe ser leida o curso (sin tilde).`); });

  (W.LUGARES || []).forEach((g, i) => { if (!obj(g, 'LUGARES')) return; const r = g.n || `LUGARES nº ${i + 1}`;
    if (!num(g.lat) || !num(g.lon) || Math.abs(g.lat) > 90 || Math.abs(g.lon) > 180) err(r, `Lugar «${g.n || i + 1}»: "lat" y "lon" deben ser números sin comillas (p. ej. 40.54 y -3.69).`);
    if (!['sede', 'campo', 'colab'].includes(g.tipo)) err(r, `Lugar «${g.n || i + 1}»: "tipo" debe ser sede, campo o colab.`);
    if (g.linea && !L.has(g.linea)) err(r, `Lugar «${g.n}»: la línea «${g.linea}» no existe.`); });

  (W.NOVEDADES || []).forEach((n, i) => { if (!obj(n, 'NOVEDADES')) return; if (!txt(n.t)) err(`NOVEDADES`, `NOVEDADES nº ${i + 1}: falta el título "t".`);
    if (local(n.img) && !existe(n.img)) err(n.img, `Noticia «${n.t}»: no existe la imagen «${n.img}».`);
    if (txt(n.t) && !txt(n.t_en)) warn(n.t, `Noticia «${n.t.slice(0, 50)}»: falta "t_en" (título en inglés).`); });
  for (const k of ['PREMIOS', 'ACTIVIDADES', 'OFERTAS']) (W[k] || []).forEach((x, i) => { if (obj(x, k) && !txt(x.t)) err(k, `${k} nº ${i + 1}: falta "t".`); });

  (W.FINANCIADORES || []).forEach((f, i) => { if (!obj(f, 'FINANCIADORES')) return; if (!txt(f.n)) err('FINANCIADORES', `FINANCIADORES nº ${i + 1}: falta "n".`);
    if (f.buscar) { try { new RegExp(f.buscar); } catch (e) { err(f.n, `${f.n}: "buscar" no es válido.`); } }
    if (local(f.logo) && !existe(f.logo)) err(f.logo, `${f.n}: no existe el logo «${f.logo}».`); url(f, 'url', f.n); });
  (W.COLABORADORES || []).forEach(c => { if (obj(c, 'COLABORADORES')) url(c, 'url', c.n); });

  (W.GALERIA || []).forEach((g, i) => { if (!obj(g, 'GALERIA')) return; const r = g.img || 'GALERIA';
    if (!txt(g.img)) err(r, `GALERIA nº ${i + 1}: falta "img".`); else if (local(g.img) && !existe(g.img)) err(r, `Galería: no existe la foto «${g.img}». Súbela a img/galeria/ o corrige el nombre.`);
    if (!txt(g.autor)) err(r, `Galería «${g.img}»: falta "autor" (hay que indicar quién hizo la foto).`);
    if (g.linea && !L.has(g.linea)) err(r, `Galería «${g.img}»: la línea «${g.linea}» no existe.`); });

  if (W.CONFIG && W.CONFIG.goatcounter && !/^[a-z0-9-]+$/.test(W.CONFIG.goatcounter)) err('goatcounter', `CONFIG.goatcounter debe ser solo el código de la cuenta (p. ej. "teguam"), sin https:// ni .goatcounter.com.`);
}

for (const e of errores) console.log(GH ? `::error file=${e.f},line=${e.line}::${e.msg}` : `✗ ${e.f}:${e.line}  ${e.msg}`);
for (const a of avisos) console.log(GH ? `::warning file=${a.f},line=${a.line}::${a.msg}` : `· aviso ${a.f}:${a.line}  ${a.msg}`);
console.log(errores.length ? `\n✗ ${errores.length} error(es): corrígelos para que la web se publique.` : `\n✓ datos.js correcto${avisos.length ? ` (${avisos.length} avisos, no impiden publicar)` : ''}.`);
process.exit(errores.length ? 1 : 0);
