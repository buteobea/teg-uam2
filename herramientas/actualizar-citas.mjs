/* =====================================================================
   Actualización de citas e índice h (cada dos semanas, vía GitHub Actions)
   ---------------------------------------------------------------------
   Para cada publicación de la web con DOI (datos.js y datos-auto.js):
     · número de citas según OpenAlex
     · instituciones coautoras (para la red de colaboraciones)
   Para cada miembro identificado en herramientas/autores-openalex.json:
     · índice h, citas totales y número de trabajos según OpenAlex
   Lo guarda en datos-citas.js. No hace falta editar nada a mano.
   ===================================================================== */
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROR_UAM = '01cby8j38';
const API = 'https://api.openalex.org';
const MAIL = process.env.OPENALEX_EMAIL || '';
const ldJS = f => { const c = { window: {} }; vm.createContext(c); if (fs.existsSync(f)) vm.runInContext(fs.readFileSync(f, 'utf8'), c); return c.window; };
const normD = d => String(d || '').trim().toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, '');
const nt = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

export async function main(fetchFn = globalThis.fetch, log = console.log) {
  const get = async u => { const url = u + (MAIL ? '&mailto=' + encodeURIComponent(MAIL) : ''); const r = await fetchFn(url); if (!r.ok) throw new Error(r.status + ' ' + url); return r.json(); };
  const D = ldJS(path.join(RAIZ, 'datos.js')), AUTO = ldJS(path.join(RAIZ, 'datos-auto.js')), OLD = ldJS(path.join(RAIZ, 'datos-citas.js')).CITAS || {};
  const pubs = [...(D.PUBLICACIONES || []), ...(AUTO.PUBLICACIONES_AUTO || [])];
  const dois = [...new Set(pubs.map(p => normD(p.doi)).filter(Boolean))];
  const SEL = 'doi,cited_by_count,authorships';
  const works = [];
  for (let i = 0; i < dois.length; i += 40) {
    const r = await get(`${API}/works?filter=doi:${dois.slice(i, i + 40).map(encodeURIComponent).join('|')}&per-page=50&select=${SEL}`);
    works.push(...(r.results || []));
  }
  log(`obras encontradas en OpenAlex: ${works.length} de ${dois.length} DOI`);
  // instituciones coautoras (sin la UAM), solo las que aparecen en 2 o más trabajos
  const cnt = {}, info = {};
  for (const w of works) { const vis = new Set(); for (const a of w.authorships || []) for (const s of a.institutions || []) {
    if (!s.id || String(s.ror || '').endsWith(ROR_UAM) || vis.has(s.id)) continue; vis.add(s.id); cnt[s.id] = (cnt[s.id] || 0) + 1; info[s.id] = [s.display_name, s.country_code || '', s.type || '']; } }
  const keep = Object.keys(cnt).filter(k => cnt[k] >= 2).sort((a, b) => cnt[b] - cnt[a]), idx = Object.fromEntries(keep.map((k, j) => [k, j]));
  const obras = {};
  // se conservan las obras sin DOI que ya se habían emparejado por título
  for (const [k, v] of Object.entries(OLD.obras || {})) if (k.startsWith('t:')) obras[k] = [v[0], []];
  for (const w of works) obras['doi:' + normD(w.doi)] = [w.cited_by_count || 0, [...new Set((w.authorships || []).flatMap(a => (a.institutions || []).map(s => idx[s.id])).filter(x => x !== undefined))]];
  // autores
  const fAut = path.join(RAIZ, 'herramientas', 'autores-openalex.json');
  const ids = fs.existsSync(fAut) ? JSON.parse(fs.readFileSync(fAut, 'utf8')) : {};
  const autores = {}, todos = Object.entries(ids).filter(([, v]) => v && v.length).map(([n, v]) => [n, v[0]]);
  for (let i = 0; i < todos.length; i += 40) {
    const ch = todos.slice(i, i + 40);
    const r = await get(`${API}/authors?filter=id:${ch.map(x => x[1]).join('|')}&per-page=50&select=id,summary_stats,cited_by_count,works_count`);
    for (const a of r.results || []) { const id = a.id.split('/').pop(); for (const [n, x] of ch) if (x === id) autores[n] = { oa: id, h: a.summary_stats?.h_index ?? null, citas: a.cited_by_count || 0, trabajos: a.works_count || 0 }; }
  }
  log(`autores actualizados: ${Object.keys(autores).length}`);
  const out = { fecha: new Date().toISOString().slice(0, 10), fuente: 'OpenAlex', obras, instituciones: keep.map(k => info[k]), autores };
  fs.writeFileSync(path.join(RAIZ, 'datos-citas.js'), '/* Citas, instituciones coautoras e índice h según OpenAlex. Se actualiza solo cada dos semanas\n   (herramientas/actualizar-citas.mjs). No hace falta editarlo a mano. */\nwindow.CITAS = ' + JSON.stringify(out) + ';\n');
  return out;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main().catch(e => { console.error(e); process.exit(1); });
