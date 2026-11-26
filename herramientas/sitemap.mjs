/* Genera sitemap.xml y robots.txt (los usa Google para indexar todas las páginas,
   incluidas las fichas de cada miembro y de cada proyecto).
   Uso: node herramientas/sitemap.mjs [https://dirección-de-la-web/]  */
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = (process.argv[2] || process.env.SITE || 'https://buteobea.github.io/teg-uam2/').replace(/\/?$/, '/');
const c = { window: {} }; vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(RAIZ, 'datos.js'), 'utf8'), c); const W = c.window;
const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const slug = s => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
const pages = fs.readdirSync(RAIZ).filter(f => f.endsWith('.html') && !['miembro.html', 'proyecto.html'].includes(f) && !(f === 'galeria.html' && !(W.GALERIA || []).length));
const rutas = [...pages.map(f => f === 'index.html' ? '' : f),
  ...(W.MIEMBROS || []).map(m => 'miembro.html?id=' + slug(m.nombre)),
  ...(W.PROYECTOS || []).map(p => 'proyecto.html?id=' + slug(p.t))];
const x = s => s.replace(/&/g, '&amp;');
const url = r => `<url><loc>${x(SITE + r)}</loc><xhtml:link rel="alternate" hreflang="es" href="${x(SITE + r)}"/><xhtml:link rel="alternate" hreflang="en" href="${x(SITE + 'en/' + r)}"/></url>`;
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${rutas.map(r => url(r)).join('\n')}\n${rutas.map(r => url(r).replace(`<loc>${x(SITE + r)}</loc>`, `<loc>${x(SITE + 'en/' + r)}</loc>`)).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(RAIZ, 'sitemap.xml'), xml);
fs.writeFileSync(path.join(RAIZ, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`);
console.log(`sitemap.xml: ${rutas.length * 2} direcciones`);
