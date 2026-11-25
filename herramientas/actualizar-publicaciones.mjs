/* =====================================================================
   Actualización automática de publicaciones (cada dos semanas, vía GitHub Actions)
   ---------------------------------------------------------------------
   1. Identifica a cada miembro actual en OpenAlex (por ORCID o, si no tiene,
      por nombre + afiliación a la UAM) y guarda los identificadores en
      herramientas/autores-openalex.json. Ese archivo se puede corregir a mano:
      si un identificador es erróneo, cámbialo o bórralo y no se volverá a buscar.
   2. Descarga sus trabajos publicados desde la última revisión.
   3. Añade a datos-auto.js los que no estén ya en datos.js (por DOI o título).
   Las publicaciones añadidas aparecen en la web marcadas como «añadida automáticamente».
   Para pasarlas a la lista principal, cópialas a datos.js y bórralas de datos-auto.js.
   ===================================================================== */
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROR_UAM = '01cby8j38';                    // Universidad Autónoma de Madrid
const API = 'https://api.openalex.org';
const MAIL = process.env.OPENALEX_EMAIL || '';   // opcional: correo para el «polite pool» de OpenAlex
const nrm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const ldJS = f => { const c = { window: {} }; vm.createContext(c); if (fs.existsSync(f)) vm.runInContext(fs.readFileSync(f, 'utf8'), c); return c.window; };

export async function main(fetchFn = globalThis.fetch, log = console.log) {
  const get = async u => { const url = u + (MAIL ? (u.includes('?') ? '&' : '?') + 'mailto=' + encodeURIComponent(MAIL) : ''); const r = await fetchFn(url); if (!r.ok) throw new Error(r.status + ' ' + url); return r.json(); };
  const D = ldJS(path.join(RAIZ, 'datos.js')), AUTO = ldJS(path.join(RAIZ, 'datos-auto.js'));
  const miembros = (D.MIEMBROS || []).filter(m => !m.antiguo);
  const fAut = path.join(RAIZ, 'herramientas', 'autores-openalex.json');
  const ids = fs.existsSync(fAut) ? JSON.parse(fs.readFileSync(fAut, 'utf8')) : {};
  for (const m of miembros) {
    if (m.nombre in ids) continue;               // ya resuelto (o descartado a mano con [])
    try {
      if (m.orcid) { const a = await get(`${API}/authors/orcid:${m.orcid}`); ids[m.nombre] = [a.id.split('/').pop()]; }
      else {
        const r = await get(`${API}/authors?search=${encodeURIComponent(m.nombre)}&filter=affiliations.institution.ror:${ROR_UAM}&per-page=5`);
        const best = (r.results || []).filter(a => a.works_count > 0).sort((a, b) => (b.relevance_score || 0) - (a.relevance_score || 0))[0];
        ids[m.nombre] = best ? [best.id.split('/').pop()] : [];
      }
      log(`autor: ${m.nombre} → ${ids[m.nombre].join(', ') || 'no encontrado'}`);
    } catch (e) { log(`aviso: ${m.nombre}: ${e.message}`); }
  }
  fs.writeFileSync(fAut, JSON.stringify(ids, null, 2) + '\n');
  const lista = [...new Set(Object.entries(ids).filter(([n]) => miembros.some(m => m.nombre === n)).flatMap(([, v]) => v))];
  const meta = AUTO.AUTO_META || {};
  const hoy = new Date().toISOString().slice(0, 10);
  const desde = meta.ultima || `${new Date().getFullYear() - 1}-01-01`;
  const conocidos = new Set();
  for (const p of [...(D.PUBLICACIONES || []), ...(AUTO.PUBLICACIONES_AUTO || [])]) { if (p.doi) conocidos.add('d' + p.doi.toLowerCase()); conocidos.add('t' + nrm(p.t).slice(0, 70)); }
  const nuevas = [];
  for (let i = 0; i < lista.length; i += 40) {    // OpenAlex admite hasta ~50 ids por filtro
    let cursor = '*';
    while (cursor) {
      const r = await get(`${API}/works?filter=author.id:${lista.slice(i, i + 40).join('|')},from_publication_date:${desde},type:article|review|book-chapter|book|letter|editorial&per-page=100&cursor=${encodeURIComponent(cursor)}`);
      for (const w of r.results || []) {
        const doi = (w.doi || '').replace(/^https?:\/\/doi\.org\//, '').toLowerCase();
        const t = (w.title || w.display_name || '').trim(); if (!t) continue;
        const k1 = doi && 'd' + doi, k2 = 't' + nrm(t).slice(0, 70);
        if ((k1 && conocidos.has(k1)) || conocidos.has(k2)) continue;
        if (k1) conocidos.add(k1); conocidos.add(k2);
        const b = w.biblio || {};
        const v = [b.volume, b.issue ? `(${b.issue})` : '', b.first_page ? `: ${b.first_page}${b.last_page && b.last_page !== b.first_page ? '-' + b.last_page : ''}` : ''].join('').trim();
        const au = (w.authorships || []).map(a => a.author?.display_name).filter(Boolean);
        nuevas.push({ a: w.publication_year, au: au.length > 12 ? au.slice(0, 10).join('; ') + '; …; ' + au.at(-1) : au.join('; '), t,
          r: w.primary_location?.source?.display_name || '', v, doi, oa: !!w.open_access?.is_oa,
          tipo: /book/.test(w.type) ? 'cap' : /letter|editorial/.test(w.type) ? 'nota' : 'art', auto: hoy });
      }
      cursor = r.meta?.next_cursor || null;
    }
  }
  const todas = [...(AUTO.PUBLICACIONES_AUTO || []), ...nuevas].sort((a, b) => b.a - a.a);
  const ser = arr => '[\n' + arr.map(o => '  ' + JSON.stringify(o)).join(',\n') + '\n]';
  fs.writeFileSync(path.join(RAIZ, 'datos-auto.js'), `/* Publicaciones añadidas automáticamente desde OpenAlex por herramientas/actualizar-publicaciones.mjs.
   Revisa de vez en cuando esta lista: cópialas a datos.js (añadiendo cuartil si quieres) y bórralas de aquí. */
window.AUTO_META = ${JSON.stringify({ ultima: hoy })};
window.PUBLICACIONES_AUTO = ${ser(todas)};
`);
  log(`Revisado desde ${desde}: ${nuevas.length} publicaciones nuevas (${todas.length} en total en datos-auto.js).`);
  return nuevas.length;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) main().catch(e => { console.error(e); process.exit(1); });
