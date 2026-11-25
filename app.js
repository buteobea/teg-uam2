/* =====================================================================
   TEG-UAM · código común de todas las páginas
   No hace falta tocar este archivo para actualizar contenidos (ver datos.js).
   ===================================================================== */
(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const slug = s => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const W = window;
const L = W.LINEAS || [], M = W.MIEMBROS || [], P = W.PROYECTOS || [], B = W.PUBLICACIONES || [],
      T = W.TESIS || [], N = W.NOVEDADES || [], G = W.LUGARES || [], A = W.ANUAL || [], O = W.OFERTAS || [];
const NOWY = new Date().getFullYear(), NOW = NOWY + new Date().getMonth() / 12;
const lineById = id => L.find(l => l.id === id);
const mLines = m => (m.lineas || '').split(/\s+/).filter(Boolean);
const active = p => p.fin >= NOWY;
const email = m => m.email ? (m.email.includes('@') ? m.email : m.email + '@uam.es') : '';
const initials = n => n.split(' ').filter(w => w.length > 2 && w[0] === w[0].toUpperCase()).slice(0, 2).map(w => w[0]).join('');
const firmas = m => (m.firma || '').split('|').map(s => s.trim()).filter(Boolean);
const signs = (m, txt) => firmas(m).some(f => String(txt || '').includes(f));
const PAGE = document.body.dataset.page;

/* ---------- RNG con semilla ---------- */
const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

/* =====================================================================
   LÁMINAS: ilustraciones vectoriales generadas para cada línea.
   Se ven nítidas a cualquier tamaño. Si una línea tiene "img", se usa la foto.
   ===================================================================== */
const C = { ink: '#12170E', ink2: '#1C2416', g1: '#24301B', g2: '#33421F', olive: '#4F6421', leaf: '#92AA32', lime: '#B9CB6F', straw: '#E4D58C', paper: '#F1EFDC', red: '#C25A2E' };
function blob(r, cx, cy, rad, n = 56, amp = .22) {
  const ph = [r() * 6, r() * 6, r() * 6], pts = [];
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; const k = 1 + amp * (Math.sin(a * 2 + ph[0]) * .5 + Math.sin(a * 3 + ph[1]) * .3 + Math.sin(a * 5 + ph[2]) * .2); pts.push([cx + Math.cos(a) * rad * k, cy + Math.sin(a) * rad * k * .8]); }
  return 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z';
}
const PLATES = {
  vertebrados(r) {
    let s = `<rect width="800" height="500" fill="${C.ink}"/>`;
    for (let y = 60; y < 460; y += 50) s += `<line x1="40" x2="780" y1="${y}" y2="${y}" stroke="${C.g1}"/>`;
    // sonograma: frase de notas silbadas con armónico
    let x = 70; const base = 300;
    for (let i = 0; i < 13; i++) {
      const y0 = base - i % 5 * 26 - r() * 20, w = 22 + r() * 18, dy = (r() - .3) * 46;
      const c = i % 4 === 2 ? C.straw : C.leaf;
      s += `<path d="M${x} ${y0} q${w / 2} ${-dy - 8} ${w} ${-dy}" stroke="${c}" stroke-width="${6 + r() * 3}" fill="none" stroke-linecap="round"/>`;
      s += `<path d="M${x} ${y0 - 150} q${w / 2} ${(-dy - 8) * 1.6} ${w} ${-dy * 1.6}" stroke="${C.olive}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`;
      x += w + 14 + r() * 16;
    }
    // trayectoria de telemetría
    let px = 60, py = 430, d = `M${px} ${py}`, dots = '';
    for (let i = 0; i < 22; i++) { px += 26 + r() * 12; py += (r() - .55) * 34; py = Math.max(360, Math.min(470, py)); d += `L${px.toFixed(0)} ${py.toFixed(0)}`; dots += `<circle cx="${px.toFixed(0)}" cy="${py.toFixed(0)}" r="3" fill="${C.straw}"/>`; }
    s += `<path d="${d}" fill="none" stroke="${C.lime}" stroke-width="1.4" stroke-dasharray="4 4"/>${dots}`;
    s += `<text x="40" y="40" fill="${C.straw}" font-family="IBM Plex Mono,monospace" font-size="15">kHz · s</text>`;
    return s;
  },
  agraria(r) {
    const fills = ['url(#st)', 'url(#dt)', C.leaf, C.olive, '#C9C08A', 'url(#cr)', C.g2];
    let s = `<defs><pattern id="st" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(20)"><rect width="10" height="10" fill="${C.olive}"/><line x1="0" y1="0" x2="0" y2="10" stroke="${C.leaf}" stroke-width="4"/></pattern>
      <pattern id="dt" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="${C.ink2}"/><circle cx="6" cy="6" r="2.2" fill="${C.straw}"/></pattern>
      <pattern id="cr" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><rect width="9" height="9" fill="#A9B65E"/><line x1="0" y1="0" x2="0" y2="9" stroke="${C.olive}" stroke-width="2"/></pattern></defs>
      <rect width="800" height="500" fill="${C.ink}"/><g transform="rotate(-9 400 250) translate(-70 -60) scale(1.18)">`;
    const split = (x, y, w, h, d) => {
      if (d === 0 || (w < 110 && h < 110)) { const f = fills[(r() * fills.length) | 0]; s += `<rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" fill="${f}" rx="2"/>`; return; }
      const k = .3 + r() * .4;
      if ((w > h) ^ (r() < .2)) { split(x, y, w * k, h, d - 1); split(x + w * k, y, w * (1 - k), h, d - 1); }
      else { split(x, y, w, h * k, d - 1); split(x, y + h * k, w, h * (1 - k), d - 1); }
    };
    split(0, 0, 800, 500, 5);
    s += `</g><path d="M40 470 C 220 380, 380 420, 520 300 S 740 120, 790 60" stroke="${C.straw}" stroke-width="2.5" fill="none" stroke-dasharray="10 8"/>`;
    [[110, 437], [300, 395], [520, 300], [700, 160]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="10" fill="${C.ink}" stroke="${C.straw}" stroke-width="2.5"/>`);
    return s;
  },
  pastizales(r) {
    let s = `<rect width="800" height="500" fill="${C.ink}"/><rect y="350" width="800" height="150" fill="${C.ink2}"/>`;
    for (let i = 0; i < 3; i++) s += `<line x1="0" x2="800" y1="${385 + i * 36}" y2="${385 + i * 36}" stroke="${C.g1}"/>`;
    for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 800).toFixed(0)}" cy="${(365 + r() * 130).toFixed(0)}" r="${(1.5 + r() * 2.5).toFixed(1)}" fill="${r() < .3 ? C.straw : C.olive}"/>`;
    for (let i = 0; i < 70; i++) {
      const x = 10 + r() * 780, h = 60 + r() * 190, bend = (r() - .5) * 90;
      s += `<path d="M${x.toFixed(0)} 352 Q ${(x + bend / 3).toFixed(0)} ${(352 - h * .6).toFixed(0)} ${(x + bend).toFixed(0)} ${(352 - h).toFixed(0)}" stroke="${r() < .25 ? C.lime : C.leaf}" stroke-width="${(1.5 + r() * 2.5).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
      if (r() < .18) s += `<ellipse cx="${(x + bend).toFixed(0)}" cy="${(352 - h).toFixed(0)}" rx="4" ry="9" fill="${C.straw}" transform="rotate(${(bend / 3).toFixed(0)} ${(x + bend).toFixed(0)} ${(352 - h).toFixed(0)})"/>`;
    }
    for (let i = 0; i < 5; i++) {
      const x0 = 80 + r() * 560, x1 = x0 + 90 + r() * 160, top = 40 + r() * 80;
      s += `<path d="M${x0.toFixed(0)} 150 Q ${((x0 + x1) / 2).toFixed(0)} ${top.toFixed(0)} ${x1.toFixed(0)} 352" stroke="${C.straw}" stroke-width="1.6" fill="none" stroke-dasharray="3 7"/><circle cx="${x1.toFixed(0)}" cy="352" r="5" fill="${C.straw}"/>`;
    }
    return s;
  },
  evaluacion(r) {
    let s = `<rect width="800" height="500" fill="${C.ink}"/>`;
    for (let k = 9; k >= 1; k--) s += `<path d="${blob(r, 560, 190, 34 * k, 64, .12)}" fill="none" stroke="${k % 3 ? C.g2 : C.olive}" stroke-width="${k % 3 ? 1.2 : 2}"/>`;
    // planta solar
    for (let i = 0; i < 7; i++) for (let j = 0; j < 5; j++) s += `<path d="M${60 + i * 42} ${330 + j * 26} l30 0 l-8 16 l-30 0z" fill="${(i + j) % 5 ? C.olive : C.leaf}"/>`;
    // carretera con paso de fauna
    s += `<path d="M-20 470 L820 150" stroke="${C.g2}" stroke-width="44"/><path d="M-20 470 L820 150" stroke="${C.straw}" stroke-width="2" stroke-dasharray="18 14"/>`;
    s += `<g transform="rotate(-20.85 470 337)"><rect x="430" y="300" width="80" height="74" fill="${C.leaf}" opacity=".95"/><path d="M430 300 h80 M430 374 h80" stroke="${C.lime}" stroke-width="4"/></g>`;
    for (let i = 0; i < 9; i++) s += `<circle cx="${(445 + i * 6 + r() * 6).toFixed(0)}" cy="${(250 + i * 26).toFixed(0)}" r="3.4" fill="${C.straw}"/>`;
    s += `<path d="M120 120 l14 -40 l14 40 M134 80 v120" stroke="${C.lime}" stroke-width="3" fill="none"/><circle cx="134" cy="80" r="5" fill="${C.red}"/>`;
    return s;
  },
  biogeografia(r) {
    let s = `<rect width="800" height="500" fill="${C.ink}"/>`;
    for (let y = 40; y < 500; y += 46) s += `<path d="M0 ${y} Q 400 ${y + 14} 800 ${y}" stroke="${C.g1}" fill="none"/>`;
    const isl = [[200, 300, 110], [430, 200, 70], [560, 360, 52], [640, 170, 36], [330, 410, 30], [110, 150, 42]];
    isl.forEach(([x, y, rad]) => { [[1, C.g2], [.72, C.olive], [.46, C.leaf], [.22, C.straw]].forEach(([k, c]) => { s += `<path d="${blob(r, x, y, rad * k, 48, .28)}" fill="${c}"/>`; }); });
    // grano de polen
    s += `<g transform="translate(690 90)"><circle r="46" fill="none" stroke="${C.straw}" stroke-width="2"/><circle r="36" fill="none" stroke="${C.straw}" stroke-width="1" stroke-dasharray="2 4"/>`;
    for (let i = 0; i < 3; i++) { const a = i * 2.094 - 1.57; s += `<ellipse cx="${(Math.cos(a) * 41).toFixed(1)}" cy="${(Math.sin(a) * 41).toFixed(1)}" rx="5" ry="9" fill="${C.ink}" stroke="${C.straw}" stroke-width="1.5" transform="rotate(${(a * 57.3 + 90).toFixed(0)} ${(Math.cos(a) * 41).toFixed(1)} ${(Math.sin(a) * 41).toFixed(1)})"/>`; }
    s += `</g>`;
    // filogenia
    s += `<path d="M640 470 h40 M680 470 v-60 h60 M680 470 v40 h60 M740 410 v-24 h40 M740 410 v20 h40" stroke="${C.lime}" stroke-width="1.6" fill="none" transform="translate(0 -40)"/>`;
    return s;
  }
};
const KINDS = Object.keys(PLATES);
function plate(kind, seed = 1, cls = '') {
  const f = PLATES[kind] || PLATES.biogeografia;
  return `<svg class="${cls}" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${f(rng(seed * 9973 + kind.length))}</svg>`;
}
function plateOrImg(l, seed) { return l.img ? `<img src="${esc(l.img)}" alt="" loading="lazy">` : plate(l.id, seed); }

/* =====================================================================
   NAVEGACIÓN Y PIE (comunes a todas las páginas)
   ===================================================================== */
const PAGES = [['index.html', 'Inicio', 'inicio'], ['lineas.html', 'Líneas', 'lineas'], ['equipo.html', 'Equipo', 'equipo'], ['proyectos.html', 'Proyectos', 'proyectos'], ['mapa.html', 'Dónde trabajamos', 'mapa'], ['publicaciones.html', 'Publicaciones', 'publicaciones'], ['tesis.html', 'Tesis', 'tesis'], ['novedades.html', 'Novedades', 'novedades'], ['contacto.html', 'Contacto', 'contacto']];
const cur = PAGE === 'miembro' ? 'equipo' : PAGE;
document.body.insertAdjacentHTML('afterbegin', `<header class="nav over" id="nav"><div class="wrap">
  <a class="brand" href="index.html"><span class="lg"><img src="img/logo.png" alt=""></span><span><b>TEG · UAM</b><small>Ecología y Conservación de Ecosistemas Terrestres</small></span></a>
  <button id="mbtn" aria-expanded="false" aria-controls="menu">Menú</button>
  <ul id="menu">${PAGES.slice(1).map(p => `<li><a href="${p[0]}"${p[2] === cur ? ' aria-current="page"' : ''}>${p[1]}</a></li>`).join('')}</ul>
</div><i class="prog" id="prog"></i></header>`);
document.body.insertAdjacentHTML('beforeend', `<footer><div class="cols">
  <div><div class="flogo"><img src="img/logo.png" alt="TEG · Terrestrial Ecology Group, Universidad Autónoma de Madrid"></div><p>Grupo de Investigación de Ecología y Conservación de Ecosistemas Terrestres. Departamento de Ecología, Universidad Autónoma de Madrid.</p></div>
  <div><h4>Explorar</h4><p>${PAGES.slice(1, 6).map(p => `<a href="${p[0]}">${p[1]}</a>`).join('<br>')}</p></div>
  <div><h4>&nbsp;</h4><p>${PAGES.slice(6).map(p => `<a href="${p[0]}">${p[1]}</a>`).join('<br>')}</p></div>
  <div><h4>Dónde estamos</h4><p>Edificio de Biología, C/ Darwin 2<br>Campus de Cantoblanco, 28049 Madrid</p><p class="mono coords">40.545° N · 3.692° W</p></div>
</div><div class="base2"><span>© ${NOWY} TEG-UAM · Universidad Autónoma de Madrid</span><span>Web estática, sin cookies ni seguimiento</span></div></footer><div class="toast" id="toast"></div>`);
const nav = $('#nav'), prog = $('#prog');
const onScroll = () => { const y = scrollY, h = document.documentElement.scrollHeight - innerHeight; prog.style.width = (h > 0 ? y / h * 100 : 0) + '%'; nav.classList.toggle('over', y < 30); };
addEventListener('scroll', onScroll, { passive: true }); onScroll();
$('#mbtn').addEventListener('click', () => { const o = $('#menu').classList.toggle('open'); $('#mbtn').setAttribute('aria-expanded', o); if (o) nav.classList.remove('over'); else onScroll(); });
const rvo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvo.unobserve(e.target); } }), { threshold: .12 });
const reveal = () => $$('.rv:not(.in)').forEach(el => rvo.observe(el));
const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 2200); };
const countUp = (el, n, d = 1300) => { if (RM) { el.textContent = n; return; } const t0 = performance.now(); const f = t => { const k = Math.min(1, (t - t0) / d); el.textContent = Math.round(n * (1 - (1 - k) ** 3)); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
const kpis = (sel, arr) => { const el = $(sel); if (!el) return; el.innerHTML = arr.map(s => `<div><b data-n="${s[0]}">${RM ? s[0] : 0}</b><span>${esc(s[1])}</span></div>`).join(''); $$(sel + ' b').forEach((b, i) => setTimeout(() => countUp(b, +b.dataset.n), 200 + i * 120)); };
const pageArt = (kind, seed) => { const a = $('.phead .art'); if (a) a.innerHTML = plate(kind, seed); };

/* ---------- ordenación (posición de cada persona) ---------- */
const ang = i => -Math.PI / 2 + Math.PI / L.length + i * 2 * Math.PI / L.length;
const hash = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return h; };
const PTS = M.map((m, i) => { const ls = mLines(m); let x = 0, y = 0; ls.forEach(id => { const k = L.findIndex(l => l.id === id); if (k >= 0) { x += Math.cos(ang(k)); y += Math.sin(ang(k)); } }); if (ls.length) { x /= ls.length; y /= ls.length; } const h = hash(m.nombre); x = x * .6 + ((h & 255) / 255 - .5) * .32; y = y * .6 + (((h >> 8) & 255) / 255 - .5) * .32; return { m, x, y, ls, i, id: slug(m.nombre) }; });

/* ---------- publicaciones: utilidades ---------- */
const TIPOPUB = { art: 'Artículo', cap: 'Libro/capítulo', div: 'Divulgación', nota: 'Editorial/carta/nota', prensa: 'Prensa' };
const pubHref = b => b.doi ? 'https://doi.org/' + b.doi : (b.url || 'https://scholar.google.com/scholar?q=' + encodeURIComponent(b.t));
const pubHTML = (b, i) => `<div class="pub"><span class="y mono">${b.a}</span><div><a class="t" href="${esc(pubHref(b))}">${esc(b.t)}</a><div class="a">${b.au ? esc(b.au) + '. ' : ''}<em>${esc(b.r)}</em>${b.v ? ' ' + esc(b.v) : ''}${b.q ? `<span class="badge q">${esc(b.q)}</span>` : ''}${b.oa ? '<span class="badge oa">Open Access</span>' : ''}${b.tipo !== 'art' ? `<span class="badge k ${esc(b.tipo)}">${TIPOPUB[b.tipo] || ''}</span>` : ''}<button class="cite" data-c="${i}">Copiar cita</button></div></div></div>`;
const citeText = b => `${b.au} (${b.a}). ${b.t}. ${b.r}${b.v ? ', ' + b.v : ''}.${b.doi ? ' https://doi.org/' + b.doi : (b.url ? ' ' + b.url : '')}`;
document.addEventListener('click', e => { const c = e.target.closest('.cite'); if (!c) return; const b = B[+c.dataset.c]; navigator.clipboard?.writeText(citeText(b)).then(() => toast('Cita copiada'), () => toast('No se pudo copiar')); });
const yearSeries = () => {
  const ys = new Set(B.filter(b => b.tipo === 'art').map(b => b.a)); A.forEach(a => ys.add(a.a));
  const min = Math.min(...ys), max = Math.max(...ys), out = [];
  for (let y = min; y <= max; y++) { const arts = B.filter(b => b.a === y && b.tipo === 'art'); const an = A.find(a => a.a === y); if (arts.length) out.push({ y, n: arts.length, q1: arts.filter(b => b.q === 'Q1').length, qk: arts.some(b => b.q), oa: arts.filter(b => b.oa).length }); else out.push({ y, n: an ? an.articulos : null, q1: 0, qk: false, nota: an?.nota || 'Sin datos' }); }
  return out;
};

/* ---------- Gantt ---------- */
function gantt(el, list) {
  const Y0 = 2013, Y1 = 2032, pct = y => (y - Y0) / (Y1 - Y0) * 100;
  const yrs = [2014, 2017, 2020, 2023, 2026, 2029, 2032].map(y => `<span style="left:${pct(y)}%">${y}</span>`).join('');
  el.innerHTML = `<div class="g-axis mono"><span class="lab">${list.length} proyectos</span><div class="g-years">${yrs}</div></div>` + (list.length ? list.map((p, i) => `<div class="g-row"><button aria-expanded="false"><span class="g-t">${esc(p.t)}<small>${p.ini === p.fin ? p.ini : p.ini + '–' + p.fin} · ${esc(p.fin_)}</small></span><span class="track"><i class="bar ${esc(p.tipo)}" style="left:${pct(p.ini)}%;width:${Math.max(1.2, pct(p.fin + 1) - pct(p.ini))}%;transition-delay:${Math.min(i, 20) * 40}ms"></i><i class="today" style="left:${pct(NOW)}%"></i></span></button><div class="g-more">${p.ref ? `<b>Referencia:</b> ${esc(p.ref)} · ` : ''}${p.ip ? `<b>IP:</b> ${esc(p.ip)} · ` : ''}${p.eur ? `<b>Presupuesto:</b> ${esc(p.eur)} · ` : ''}<b>Línea:</b> <a href="lineas.html#${esc(p.linea)}">${esc(lineById(p.linea)?.nombre || '')}</a></div></div>`).join('') : '<p class="empty">Ningún proyecto coincide.</p>');
  el.classList.remove('in'); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
}
document.addEventListener('click', e => { const b = e.target.closest('.g-row>button'); if (!b) return; const r = b.parentElement; r.classList.toggle('open'); b.setAttribute('aria-expanded', r.classList.contains('open')); });

/* =====================================================================
   PÁGINAS
   ===================================================================== */
const PAGE_INIT = {

/* ---------------- INICIO ---------------- */
inicio() {
  // espectrograma simulado
  const sg = $('#sg'), ov = $('#ov'), sx = sg.getContext('2d'), ox = ov.getContext('2d');
  const COLS = 720, ROWS = 220, FMAX = 10; sg.width = COLS; sg.height = ROWS;
  const stops = [[18, 23, 14], [34, 46, 22], [79, 100, 33], [146, 170, 50], [228, 213, 140], [252, 250, 232]];
  const cmap = v => { v = Math.max(0, Math.min(.999, v)) * (stops.length - 1); const i = v | 0, f = v - i, a = stops[i], b = stops[i + 1]; return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]; };
  const SP = [{ n: 'Chersophilus duponti', k: 'whistle' }, { n: 'Alauda arvensis', k: 'trill' }, { n: 'Melanocorypha calandra', k: 'trill' }, { n: 'Galerida theklae', k: 'phrase' }, { n: 'Tetrax tetrax', k: 'snort' }, { n: 'Pterocles orientalis', k: 'phrase' }, { n: 'Calandrella brachydactyla', k: 'phrase' }, { n: 'Tettigoniidae', k: 'insect' }];
  let voices = [], boxes = [], col = 0; const rnd = Math.random;
  const spawn = () => { const s = SP[(rnd() * SP.length) | 0]; const len = { whistle: 150, trill: 120, phrase: 80, snort: 40, insect: 110 }[s.k] * (0.7 + rnd() * .6); const base = { whistle: 2.2 + rnd() * 1.2, trill: 3 + rnd() * 1.5, phrase: 3.5 + rnd() * 2, snort: 1 + rnd() * .6, insect: 7.4 + rnd() * 1.2 }[s.k]; voices.push({ s, len, age: 0, base, seed: rnd() * 100, amp: (s.k === 'insect' ? .28 : .5) + rnd() * .35, lo: 99, hi: 0, start: col }); };
  const freqAt = v => { const t = v.age, k = v.s.k, sd = v.seed;
    if (k === 'whistle') { const note = Math.floor(t / 22), ph = (t % 22) / 22; if (ph > .72) return null; return v.base + [0, .25, .55, .9, 1.3, .4][note % 6] + ph * .35; }
    if (k === 'trill') return v.base + .9 * Math.sin(t * .55 + sd) + .4 * Math.sin(t * .13);
    if (k === 'phrase') { const seg = Math.floor(t / 9), ph = (t % 9) / 9; if (ph > .65) return null; return v.base + Math.sin(seg * 2.3 + sd) * 1.1 - ph * .6; }
    if (k === 'snort') return (t % 10 < 5) ? v.base + rnd() * .15 : null;
    return (t % 6 < 3) ? v.base : null; };
  const colData = sx.createImageData(1, ROWS);
  const step = () => {
    sx.drawImage(sg, -1, 0); const e = new Float32Array(ROWS);
    for (let r = 0; r < ROWS; r++) { const f = FMAX * (1 - r / ROWS); e[r] = .05 + .045 * rnd() + .18 * Math.exp(-f * 1.6) * (0.6 + rnd() * .6); }
    for (const v of voices) { const f = freqAt(v); v.age++; if (f == null) continue;
      for (const [h, a] of (v.s.k === 'insect' ? [[1, 1]] : [[1, 1], [2, .32]])) { const fh = f * h; if (fh > FMAX) continue; const r0 = (1 - fh / FMAX) * ROWS, w = v.s.k === 'snort' ? 7 : v.s.k === 'insect' ? 10 : 2.2;
        for (let r = Math.max(0, r0 - w * 3 | 0); r < Math.min(ROWS, r0 + w * 3); r++) e[r] += v.amp * a * Math.exp(-((r - r0) ** 2) / (2 * w * w));
        if (h === 1) { const pad = v.s.k === 'insect' ? .4 : .25; v.lo = Math.min(v.lo, fh - pad); v.hi = Math.max(v.hi, fh + pad); } } }
    for (let r = 0; r < ROWS; r++) { const c = cmap(e[r]), i = r * 4; colData.data[i] = c[0]; colData.data[i + 1] = c[1]; colData.data[i + 2] = c[2]; colData.data[i + 3] = 255; }
    sx.putImageData(colData, COLS - 1, 0);
    for (const v of voices.filter(v => v.age >= v.len)) if (v.hi > 0) boxes.push({ x0: v.start, x1: col, lo: v.lo, hi: v.hi, n: v.s.n, c: (.72 + rnd() * .26).toFixed(2), born: col });
    voices = voices.filter(v => v.age < v.len); if (voices.length < 2 && rnd() < .022) spawn(); boxes = boxes.filter(b => col - b.x1 < COLS); col++; };
  const drawOv = () => { const Wd = ov.clientWidth, H = ov.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
    if (ov.width !== Wd * dpr || ov.height !== H * dpr) { ov.width = Wd * dpr; ov.height = H * dpr; }
    ox.setTransform(dpr, 0, 0, dpr, 0, 0); ox.clearRect(0, 0, Wd, H); const kx = Wd / COLS, ky = H / ROWS; ox.font = '500 12px "IBM Plex Mono",monospace';
    for (const b of boxes) { const x = Wd - (col - b.x0) * kx, x2 = Wd - (col - b.x1) * kx, y = (1 - b.hi / FMAX) * ROWS * ky, y2 = (1 - b.lo / FMAX) * ROWS * ky;
      const a = Math.min(1, (col - b.born) / 25) * (Wd < 700 ? Math.max(0, Math.min(1, (H * .3 - y2) / 30)) : Math.max(0, Math.min(1, (x / Wd - .42) / .2))); if (a <= 0) continue;
      ox.globalAlpha = a; ox.strokeStyle = '#E4D58C'; ox.lineWidth = 1.25; ox.strokeRect(x, y, x2 - x, y2 - y);
      const lab = b.n + '  ' + b.c, tw = ox.measureText(lab).width; ox.fillStyle = 'rgba(18,23,14,.82)'; ox.fillRect(x, y - 19, tw + 10, 17); ox.fillStyle = '#E4D58C'; ox.fillText(lab, x + 5, y - 6); }
    ox.globalAlpha = 1; };
  for (let i = 0; i < COLS; i++) step(); drawOv();
  let vis = true; new IntersectionObserver(es => { vis = es[0].isIntersecting; }).observe($('.hero'));
  let acc = 0, last = performance.now();
  const loop = t => { const dt = Math.min(64, t - last); last = t; if (vis && !document.hidden) { acc += dt * .055; while (acc >= 1) { step(); acc--; } drawOv(); } requestAnimationFrame(loop); };
  if (!RM) requestAnimationFrame(loop); addEventListener('resize', drawOv);

  const art26 = B.filter(b => b.a === NOWY && b.tipo === 'art').length;
  kpis('#stats', [[M.length, 'investigadores'], [P.filter(active).length, 'proyectos activos'], [art26, `artículos en ${NOWY}`], [new Set(G.map(g => g.pais)).size, 'países con trabajo']]);

  // puertas al resto de páginas, cada una con una mini-figura de sus datos
  const vb = 'viewBox="0 0 400 190" preserveAspectRatio="xMidYMid meet"';
  const vLines = `<svg ${vb}>${L.map((l, i) => `<svg x="${i * 80}" y="0" width="80" height="190" viewBox="0 0 160 500" preserveAspectRatio="xMidYMid slice">${PLATES[l.id](rng(i + 3))}</svg>`).join('')}</svg>`;
  const vTeam = `<svg ${vb}>${L.map((l, i) => `<line x1="200" y1="95" x2="${200 + Math.cos(ang(i)) * 80}" y2="${95 + Math.sin(ang(i)) * 80}" stroke="var(--olive)" stroke-width="1"/>`).join('')}${PTS.map(p => `<circle cx="${200 + p.x * 80}" cy="${95 + p.y * 80}" r="${p.m.coord ? 5 : 3.5}" fill="${p.m.coord ? 'var(--olive)' : 'var(--leaf)'}"/>`).join('')}</svg>`;
  const act = P.filter(active).sort((a, b) => a.ini - b.ini).slice(0, 12), px = y => 20 + (y - 2016) / 16 * 360;
  const vProj = `<svg ${vb}><line x1="${px(NOW)}" x2="${px(NOW)}" y1="10" y2="180" stroke="var(--red)" stroke-dasharray="3 3"/>${act.map((p, i) => `<rect x="${px(p.ini)}" y="${16 + i * 13.5}" width="${px(p.fin + 1) - px(p.ini)}" height="8" rx="2" fill="${{ life: 'var(--olive)', internacional: 'var(--ochre)' }[p.tipo] || 'var(--leaf)'}"/>`).join('')}</svg>`;
  const ex = lon => 200 + lon / 180 * 190, ey = lat => 95 - lat / 90 * 90;
  let grat = ''; for (let la = -60; la <= 60; la += 30) grat += `<line x1="10" x2="390" y1="${ey(la)}" y2="${ey(la)}" stroke="var(--rule)"/>`; for (let lo = -150; lo <= 150; lo += 30) grat += `<line y1="5" y2="185" x1="${ex(lo)}" x2="${ex(lo)}" stroke="var(--rule)"/>`;
  const vMap = `<svg ${vb}>${grat}${G.map(g => `<circle cx="${ex(g.lon)}" cy="${ey(g.lat)}" r="${g.tipo === 'sede' ? 5 : 3.5}" fill="${g.tipo === 'sede' ? 'var(--red)' : g.tipo === 'colab' ? 'var(--card)' : 'var(--olive)'}" stroke="var(--olive)" stroke-width="1.2"/>`).join('')}</svg>`;
  const ser = yearSeries(), mx = Math.max(1, ...ser.map(s => s.n || 0)), bw = 360 / ser.length;
  const vPub = `<svg ${vb}>${ser.map((s, i) => s.n == null ? `<rect x="${20 + i * bw + 3}" y="120" width="${bw - 6}" height="50" fill="none" stroke="var(--mute)" stroke-dasharray="3 3"/>` : `<rect x="${20 + i * bw + 3}" y="${170 - s.n / mx * 150}" width="${bw - 6}" height="${s.n / mx * 150}" fill="var(--leaf)"/><text x="${20 + i * bw + bw / 2}" y="185" text-anchor="middle" font-size="11" fill="var(--mute)">${s.y}</text>`).join('')}</svg>`;
  const ty = T.map(t => +(String(t.fecha).match(/20\d\d/) || [0])[0]).filter(Boolean), tcount = {};
  const vTes = `<svg ${vb}><line x1="20" x2="380" y1="160" y2="160" stroke="var(--mute)"/>${ty.map(y => { tcount[y] = (tcount[y] || 0) + 1; return `<circle cx="${30 + (y - 2018) / 12 * 340 + (tcount[y] % 2 ? -5 : 5)}" cy="${150 - Math.floor((tcount[y] - 1) / 2) * 12}" r="4.5" fill="var(--leaf)"/>`; }).join('')}</svg>`;
  const doors = [['lineas.html', 'Líneas de investigación', `${L.length} líneas, del individuo al paisaje y de lo local a lo global.`, vLines],
    ['equipo.html', 'Equipo', `${M.length} personas ordenadas según lo que investigan, con su ficha individual.`, vTeam],
    ['proyectos.html', 'Proyectos', `${P.filter(active).length} proyectos en curso: LIFE, Plan Estatal, internacionales y transferencia.`, vProj],
    ['mapa.html', 'Dónde trabajamos', `Trabajo de campo y colaboraciones en ${new Set(G.map(g => g.pais)).size} países de cuatro continentes.`, vMap],
    ['publicaciones.html', 'Publicaciones', `${B.length} publicaciones desde ${Math.min(...B.map(b => b.a))}: evolución anual, buscador y citas.`, vPub],
    ['tesis.html', 'Tesis doctorales', `${T.filter(t => t.estado === 'leida').length} tesis leídas y ${T.filter(t => t.estado === 'curso').length} en curso, en un calendario de defensas.`, vTes]];
  $('#doors').innerHTML = doors.map(d => `<a class="door rv" href="${d[0]}"><div class="viz">${d[3]}</div><div class="in"><h3>${d[1]}</h3><p>${d[2]}</p><span class="go">Entrar →</span></div></a>`).join('');
  // destacado: proyecto LIFE más reciente en curso
  const f = P.filter(p => p.tipo === 'life' && active(p)).sort((a, b) => b.ini - a.ini)[0];
  if (f) $('#feat').innerHTML = `<div class="plate">${plate(f.linea, 11)}</div><div><span class="mono mute">Proyecto destacado · ${f.ini}–${f.fin}</span><h2 style="margin:10px 0 14px">${esc(f.t)}</h2><p class="mute">${esc(f.fin_)}${f.eur ? ' · ' + esc(f.eur) : ''}${f.ip ? ' · ' + esc(f.ip) : ''}</p><div class="btns"><a class="btn" href="proyectos.html">Todos los proyectos</a><a class="btn ghost" href="mapa.html">Ver en el mapa</a></div></div>`;
  $('#lastnews').innerHTML = N.slice(0, 3).map((n, i) => newsCard(n, i)).join('');
},

/* ---------------- LÍNEAS ---------------- */
lineas() {
  pageArt('agraria', 4);
  kpis('#kp', [[L.length, 'líneas'], [P.filter(active).length, 'proyectos activos'], [M.length, 'investigadores']]);
  $('#lnav').innerHTML = L.map(l => `<a class="chip" style="display:inline-flex;align-items:center;text-decoration:none" href="#${l.id}">${esc(l.corto)}</a>`).join('');
  $('#lines').innerHTML = L.map((l, i) => {
    const ppl = PTS.filter(p => p.ls.includes(l.id)), pr = P.filter(p => p.linea === l.id && active(p));
    const pubs = B.filter(b => b.tipo === 'art' && ppl.some(p => signs(p.m, b.au))).sort((a, b) => b.a - a.a);
    const where = G.filter(g => g.linea === l.id);
    return `<section class="line rv" id="${l.id}"><div class="plate">${plateOrImg(l, i + 1)}</div><div>
      <span class="mono mute">Línea ${i + 1} de ${L.length}</span><h2 style="margin-top:8px">${esc(l.nombre)}</h2><p class="lede">${esc(l.texto)}</p>
      <div class="tags">${(l.claves || []).map(k => `<span class="tag">${esc(k)}</span>`).join('')}</div>
      <h4>Quién (${ppl.length})</h4><div class="ppl">${ppl.map(p => `<a class="tag" href="miembro.html?id=${p.id}">${esc(p.m.nombre.split(' ').slice(0, 2).join(' '))}</a>`).join('')}</div>
      ${pr.length ? `<h4>Proyectos en curso (${pr.length})</h4><ul class="plist">${pr.map(p => `<li>${esc(p.t)}<small>${p.ini}–${p.fin} · ${esc(p.fin_)}</small></li>`).join('')}</ul>` : ''}
      ${pubs.length ? `<h4>Publicaciones recientes (${pubs.length} en la web)</h4><ul class="plist">${pubs.slice(0, 4).map(b => `<li><a href="${esc(pubHref(b))}">${esc(b.t)}</a><small>${b.a} · ${esc(b.r)}</small></li>`).join('')}</ul>` : ''}
      ${where.length ? `<p class="note" style="margin-top:16px">Trabajo en ${esc([...new Set(where.map(g => g.pais))].join(', '))} · <a href="mapa.html?linea=${l.id}">ver en el mapa</a></p>` : ''}
    </div></section>`; }).join('');
},

/* ---------------- EQUIPO ---------------- */
equipo() {
  pageArt('biogeografia', 6);
  kpis('#kp', [[M.length, 'personas'], [M.filter(m => m.orcid).length, 'con ORCID enlazado'], [T.filter(t => t.estado === 'curso').length, 'tesis en curso']]);
  const svg = $('#ordsvg'), tip = $('#tip'); let oLine = new URLSearchParams(location.search).get('linea') || '', oQ = '', drawn = false;
  function draw(anim) {
    const Wd = svg.clientWidth, H = svg.clientHeight; if (!Wd) return; const small = Wd < 520, cx = Wd / 2, cy = H / 2 + 6, R = Math.min(Wd, H) * (small ? .33 : .4);
    let s = `<g stroke="var(--rule)"><line x1="${cx - R * 1.15}" y1="${cy}" x2="${cx + R * 1.15}" y2="${cy}"/><line x1="${cx}" y1="${cy - R * 1.15}" x2="${cx}" y2="${cy + R * 1.15}"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke-dasharray="2 5"/></g>`;
    L.forEach((l, i) => { const x = cx + Math.cos(ang(i)) * R, y = cy + Math.sin(ang(i)) * R, on = !oLine || oLine === l.id, lx = cx + Math.cos(ang(i)) * (R + 14), ly = cy + Math.sin(ang(i)) * (R + 14), anc = Math.cos(ang(i)) > .3 ? 'start' : Math.cos(ang(i)) < -.3 ? 'end' : 'middle';
      s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${on ? 'var(--acc)' : 'var(--rule)'}" stroke-width="${oLine === l.id ? 2.2 : 1.3}" marker-end="url(#ar)"/><text x="${lx}" y="${ly + (Math.sin(ang(i)) > .3 ? 12 : Math.sin(ang(i)) < -.3 ? -4 : 4)}" text-anchor="${anc}" font-size="${small ? 11 : 13}" font-weight="650" fill="${on ? 'var(--text)' : 'var(--mute)'}" style="cursor:pointer" data-line="${l.id}">${esc(l.corto)}</text>`; });
    PTS.forEach(p => { const x = cx + p.x * R, y = cy + p.y * R, hit = (!oLine || p.ls.includes(oLine)) && (!oQ || norm(p.m.nombre).includes(oQ)), r = p.m.coord ? 7.5 : 5.5;
      s += `<circle class="pt" data-i="${p.i}" cx="${anim ? cx : x}" cy="${anim ? cy : y}" data-x="${x}" data-y="${y}" r="${r}" fill="${hit ? (p.m.coord ? 'var(--olive)' : 'var(--leaf)') : 'var(--rule)'}" stroke="${p.m.coord ? 'var(--leaf)' : 'var(--card)'}" stroke-width="${p.m.coord ? 3 : 1.5}" opacity="${hit ? 1 : .55}" style="cursor:pointer;transition:cx .9s cubic-bezier(.2,.7,.2,1) ${p.i * 12}ms,cy .9s cubic-bezier(.2,.7,.2,1) ${p.i * 12}ms,fill .3s"/>`; });
    svg.innerHTML = `<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="var(--acc)"/></marker></defs>` + s;
    if (anim) requestAnimationFrame(() => requestAnimationFrame(() => svg.querySelectorAll('.pt').forEach(c => { c.setAttribute('cx', c.dataset.x); c.setAttribute('cy', c.dataset.y); })));
  }
  const ro = new ResizeObserver(() => draw(false)); ro.observe(svg);
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting && !drawn) { drawn = true; draw(!RM); o.disconnect(); } }, { threshold: .3 }).observe(svg);
  svg.addEventListener('pointermove', e => { const c = e.target.closest('.pt'); if (!c) { tip.style.opacity = 0; return; } const p = PTS[+c.dataset.i], r = svg.getBoundingClientRect(); tip.style.left = (e.clientX - r.left) + 'px'; tip.style.top = (e.clientY - r.top) + 'px'; tip.innerHTML = `${esc(p.m.nombre)}<small>${esc(p.m.puesto || p.ls.map(id => lineById(id)?.corto).join(' · ') || 'TEG-UAM')} · ver ficha</small>`; tip.style.opacity = 1; });
  svg.addEventListener('pointerleave', () => tip.style.opacity = 0);
  svg.addEventListener('click', e => { const t = e.target.closest('[data-line]'); if (t) { setLine(oLine === t.dataset.line ? '' : t.dataset.line); return; } const c = e.target.closest('.pt'); if (c) location.href = 'miembro.html?id=' + PTS[+c.dataset.i].id; });
  $('#ochips').innerHTML = [['', 'Todas']].concat(L.map(l => [l.id, l.corto])).map(c => `<button class="chip" data-v="${c[0]}" aria-pressed="${c[0] === oLine}">${esc(c[1])}</button>`).join('');
  function setLine(v) { oLine = v; $$('#ochips .chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.v === v)); draw(false); people(); }
  $('#ochips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) setLine(b.dataset.v); });
  $('#oq').addEventListener('input', e => { oQ = norm(e.target.value); draw(false); people(); });
  function people() { const list = PTS.filter(p => (!oLine || p.ls.includes(oLine)) && (!oQ || norm(p.m.nombre).includes(oQ))).sort((a, b) => (b.m.coord ? 1 : 0) - (a.m.coord ? 1 : 0) || a.m.nombre.localeCompare(b.m.nombre, 'es'));
    $('#ocount').textContent = list.length + (list.length === 1 ? ' persona' : ' personas');
    $('#people').innerHTML = list.map(p => `<a class="person${p.m.coord ? ' c' : ''}" href="miembro.html?id=${p.id}"><span class="av">${p.m.foto ? `<img src="${esc(p.m.foto)}" alt="">` : esc(initials(p.m.nombre))}</span><div><b>${esc(p.m.nombre)}</b><span>${esc(p.m.puesto || p.ls.map(id => lineById(id)?.corto).join(' · ') || 'TEG-UAM')}</span></div></a>`).join('') || '<p class="empty">Nadie coincide con la búsqueda.</p>'; }
  people();
},

/* ---------------- FICHA DE MIEMBRO ---------------- */
miembro() {
  const id = new URLSearchParams(location.search).get('id'), p = PTS.find(x => x.id === id);
  if (!p) { $('#mname').textContent = 'Persona no encontrada'; $('#mbody').innerHTML = '<p><a class="btn" href="equipo.html">Volver al equipo</a></p>'; return; }
  const m = p.m; document.title = m.nombre + ' · TEG-UAM';
  pageArt(p.ls[0] || 'biogeografia', p.i + 2);
  $('#mname').textContent = m.nombre; $('#crumbname').textContent = m.nombre.split(' ').slice(0, 2).join(' ');
  $('#mrole').textContent = m.puesto || 'Miembro del TEG-UAM';
  $('#mav').innerHTML = m.foto ? `<img src="${esc(m.foto)}" alt="">` : esc(initials(m.nombre));
  const pubs = B.map((b, i) => ({ b, i })).filter(x => signs(m, x.b.au)).sort((a, b) => b.b.a - a.b.a);
  const pr = P.filter(x => signs(m, x.ip)).sort((a, b) => b.fin - a.fin);
  const th = T.filter(t => signs(m, t.dir) || m.nombre.includes(t.autor));
  kpis('#kp', [[pubs.length, 'publicaciones en esta web'], [pr.length, 'proyectos como IP o participante'], [th.length, 'tesis dirigidas o tutorizadas']]);
  const em = email(m);
  $('#mbody').innerHTML = `<div class="cols2">
    <div><h3>Líneas</h3><div class="tags">${p.ls.map(id => `<a class="tag" href="lineas.html#${id}">${esc(lineById(id)?.nombre)}</a>`).join('') || '<span class="mute">Pendiente de asignar</span>'}</div>
      <h3 style="margin-top:24px">Contacto</h3><p>${em ? `<a href="mailto:${esc(em)}">${esc(em)}</a><br>` : ''}${m.orcid ? `ORCID: <a href="https://orcid.org/${esc(m.orcid)}">${esc(m.orcid)}</a>` : ''}${!em && !m.orcid ? '<span class="mute">Sin datos de contacto públicos.</span>' : ''}</p>
      ${pr.length ? `<h3 style="margin-top:24px">Proyectos</h3><ul class="plist">${pr.map(x => `<li>${esc(x.t)}<small>${x.ini}–${x.fin} · ${esc(x.fin_)}${active(x) ? ' · en curso' : ''}</small></li>`).join('')}</ul>` : ''}
      ${th.length ? `<h3 style="margin-top:24px">Tesis</h3><ul class="plist">${th.map(t => `<li>${esc(t.autor)}: ${esc(t.t)}<small>${t.estado === 'leida' ? 'Leída' : 'En curso'} ${esc(t.fecha)} · ${esc(t.prog)}</small></li>`).join('')}</ul>` : ''}
    </div>
    <div><h3>Publicaciones (${pubs.length})</h3><div id="mpubs">${pubs.length ? pubs.slice(0, 12).map(x => pubHTML(x.b, x.i)).join('') : '<p class="mute">Aún no hay publicaciones suyas en la web.</p>'}</div>${pubs.length > 12 ? `<button class="btn ghost" id="mmore" style="color:var(--text);margin-top:16px">Ver las ${pubs.length}</button>` : ''}
      <p class="note" style="margin-top:14px">Se enlazan automáticamente buscando su firma en las autorías de las publicaciones recogidas en la web.</p></div></div>`;
  $('#mmore')?.addEventListener('click', e => { $('#mpubs').innerHTML = pubs.map(x => pubHTML(x.b, x.i)).join(''); e.target.remove(); });
},

/* ---------------- PROYECTOS ---------------- */
proyectos() {
  pageArt('evaluacion', 8);
  const TIP = { life: 'LIFE', nacional: 'Nacionales', internacional: 'Internacionales', contrato: 'Contratos' };
  kpis('#kp', [[P.filter(active).length, 'en curso'], [P.filter(p => p.tipo === 'life').length, 'proyectos LIFE'], [P.filter(p => p.tipo === 'internacional' && active(p)).length, 'internacionales en curso'], [P.filter(p => p.tipo === 'contrato' && active(p)).length, 'contratos en curso']]);
  let pF = 'act', q = '';
  $('#pchips').innerHTML = [['act', 'En curso'], ['all', 'Todos']].concat(Object.entries(TIP)).concat(L.map(l => ['l:' + l.id, l.corto])).map(c => `<button class="chip" data-v="${c[0]}" aria-pressed="${c[0] === pF}">${esc(c[1])}</button>`).join('');
  const draw = () => gantt($('#gantt'), P.filter(p => (pF === 'all' || (pF === 'act' ? active(p) : pF.startsWith('l:') ? p.linea === pF.slice(2) : p.tipo === pF)) && (!q || norm([p.t, p.ref, p.ip, p.fin_].join(' ')).includes(q))).sort((a, b) => (active(b) - active(a)) || b.ini - a.ini || b.fin - a.fin));
  $('#pchips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; pF = b.dataset.v; $$('#pchips .chip').forEach(c => c.setAttribute('aria-pressed', c === b)); draw(); });
  $('#pq').addEventListener('input', e => { q = norm(e.target.value); draw(); });
  draw();
  // financiadores en curso
  const fund = {}; P.filter(active).forEach(p => { const k = p.tipo; fund[k] = (fund[k] || 0) + 1; });
  const tot = Object.values(fund).reduce((a, b) => a + b, 0);
  $('#mix').innerHTML = Object.entries(TIP).map(([k, v]) => `<div class="meter"><div class="row"><span>${v}</span><b>${fund[k] || 0}</b></div><div class="tr"><i style="width:${tot ? (fund[k] || 0) / tot * 100 : 0}%;background:${{ life: 'var(--olive)', internacional: 'var(--ochre)' }[k] || 'var(--leaf)'}"></i></div></div>`).join('');
},

/* ---------------- MAPA ---------------- */
mapa() {
  pageArt('biogeografia', 12);
  const nat = G.filter(g => g.pais === 'España'), intl = G.filter(g => g.pais !== 'España');
  kpis('#kp', [[new Set(G.map(g => g.pais)).size, 'países'], [nat.length, 'lugares en España'], [intl.length, 'lugares fuera de España'], [G.filter(g => g.tipo === 'campo').length, 'zonas de trabajo de campo']]);
  let fT = '', fL = new URLSearchParams(location.search).get('linea') || '', sel = -1;
  const EN = { 'España': 'Spain', 'Portugal': 'Portugal', 'Marruecos': 'Morocco', 'Brasil': 'Brazil', 'Paraguay': 'Paraguay', 'Costa Rica': 'Costa Rica', 'México': 'Mexico', 'Ecuador': 'Ecuador', 'Chile': 'Chile', 'Argentina': 'Argentina', 'Colombia': 'Colombia', 'Sudáfrica': 'South Africa', 'Italia': 'Italy', 'Francia': 'France', 'Reino Unido': 'United Kingdom', 'Noruega': 'Norway' };
  const hiNames = new Set(G.map(g => EN[g.pais]).filter(Boolean));
  $('#mchips').innerHTML = [['', 'Todo'], ['campo', 'Trabajo de campo'], ['colab', 'Colaboraciones']].map(c => `<button class="chip" data-t="${c[0]}" aria-pressed="${c[0] === fT}">${c[1]}</button>`).join('') + L.map(l => `<button class="chip" data-l="${l.id}" aria-pressed="${l.id === fL}">${esc(l.corto)}</button>`).join('');
  const vis = g => g.tipo === 'sede' || ((!fT || g.tipo === fT) && (!fL || g.linea === fL));
  const tip = $('#mtip');
  function list() {
    const by = {}; G.forEach((g, i) => { if (vis(g)) (by[g.pais] = by[g.pais] || []).push(i); });
    const order = Object.keys(by).sort((a, b) => (a === 'España' ? -1 : b === 'España' ? 1 : a.localeCompare(b, 'es')));
    $('#places').innerHTML = order.map(c => `<section><h4>${esc(c)}</h4>${by[c].map(i => `<button data-i="${i}" class="${i === sel ? 'on' : ''}">${esc(G[i].n)}<small>${esc(G[i].txt)}</small></button>`).join('')}</section>`).join('');
  }
  let geo = null, d3 = W.d3;
  function draw() {
    list(); if (!geo || !d3) return;
    [['#world', 'w'], ['#spain', 's']].forEach(([selr, k]) => {
      const fig = $(selr), svg = fig.querySelector('svg'), Wd = fig.clientWidth, H = fig.clientHeight; if (!Wd) return;
      let proj, proj2 = null, box2 = null;
      if (k === 'w') proj = d3.geoNaturalEarth1().fitExtent([[10, 10], [Wd - 10, H - 10]], { type: 'Sphere' });
      else {
        proj = d3.geoMercator().fitExtent([[14, 36], [Wd - 14, H * .76]], { type: 'MultiPoint', coordinates: [[-9.6, 43.9], [4.4, 36.0]] });
        box2 = [14, H * .79, Math.min(Wd * .42, (H * .19) * 2.4), H * .19];
        proj2 = d3.geoMercator().fitExtent([[box2[0] + 6, box2[1] + 6], [box2[0] + box2[2] - 6, box2[1] + box2[3] - 6]], { type: 'MultiPoint', coordinates: [[-18.2, 29.4], [-13.4, 27.6]] });
      }
      const path = d3.geoPath(proj); let s = '';
      if (k === 'w') s += `<path class="grat" d="${path(d3.geoGraticule10())}"/><path d="${path({ type: 'Sphere' })}" fill="none" stroke="var(--rule)"/>`;
      s += geo.features.map(f => `<path class="land${hiNames.has(f.properties.name) ? ' hi' : ''}" d="${path(f) || ''}"/>`).join('');
      if (proj2) { const p2 = d3.geoPath(proj2); s += `<rect x="${box2[0]}" y="${box2[1]}" width="${box2[2]}" height="${box2[3]}" fill="var(--card)" stroke="var(--rule)"/><g clip-path="url(#cc)">${geo.features.filter(f => f.properties.name === 'Spain').map(f => `<path class="land hi" d="${p2(f) || ''}"/>`).join('')}</g><clipPath id="cc"><rect x="${box2[0]}" y="${box2[1]}" width="${box2[2]}" height="${box2[3]}"/></clipPath><text x="${box2[0] + 6}" y="${box2[1] + 14}" class="mono" font-size="10" fill="var(--mute)">Canarias</text>`; }
      G.forEach((g, i) => { if (!vis(g)) return; if (k === 's' && g.pais !== 'España') return; const pj = (k === 's' && g.lat < 30) ? proj2 : proj; const xy = pj([g.lon, g.lat]); if (!xy) return;
        const r = g.tipo === 'sede' ? 6.5 : (k === 'w' ? 4.5 : 6);
        if (g.tipo === 'sede') s += `<circle class="pulse" cx="${xy[0]}" cy="${xy[1]}" r="${r}"/>`;
        s += `<circle class="pin ${g.tipo}${i === sel ? ' on' : ''}" data-i="${i}" cx="${xy[0].toFixed(1)}" cy="${xy[1].toFixed(1)}" r="${i === sel ? 9 : r}"/>`; });
      svg.innerHTML = s;
    });
  }
  const show = (i, e, fig) => { const g = G[i]; tip.innerHTML = `${esc(g.n)} · ${esc(g.pais)}<small>${esc(g.txt)}</small>`; const r = fig.getBoundingClientRect(); tip.style.left = (e.clientX - r.left) + 'px'; tip.style.top = (e.clientY - r.top) + 'px'; fig.appendChild(tip); tip.style.opacity = 1; };
  ['#world', '#spain'].forEach(s => { const fig = $(s); fig.addEventListener('pointermove', e => { const c = e.target.closest('.pin'); if (c) show(+c.dataset.i, e, fig); else tip.style.opacity = 0; }); fig.addEventListener('pointerleave', () => tip.style.opacity = 0); fig.addEventListener('click', e => { const c = e.target.closest('.pin'); if (c) { sel = +c.dataset.i; draw(); } }); });
  $('#places').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; sel = +b.dataset.i; draw(); (G[sel].pais === 'España' ? $('#spain') : $('#world')).scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); });
  $('#mchips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; if (b.dataset.t !== undefined) { fT = b.dataset.t; $$('#mchips [data-t]').forEach(c => c.setAttribute('aria-pressed', c === b)); } else { fL = fL === b.dataset.l ? '' : b.dataset.l; $$('#mchips [data-l]').forEach(c => c.setAttribute('aria-pressed', c.dataset.l === fL)); } draw(); });
  const ro = new ResizeObserver(() => draw()); ro.observe($('#world')); ro.observe($('#spain'));
  list();
  const fail = () => ['#world', '#spain'].forEach(s => $(s).insertAdjacentHTML('beforeend', '<div class="mapfail">No se pudo cargar la base cartográfica. Los lugares aparecen en la lista inferior.</div>'));
  if (!d3) { fail(); return; }
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json').then(r => r.json()).then(topo => { geo = topoFeatures(topo, 'countries'); draw(); }).catch(fail);
},

/* ---------------- PUBLICACIONES ---------------- */
publicaciones() {
  pageArt('vertebrados', 14);
  const artsY = B.filter(b => b.a === NOWY && b.tipo === 'art');
  kpis('#kp', [[artsY.length, `artículos en ${NOWY}`], [artsY.filter(b => b.q === 'Q1').length, 'en revistas Q1'], [artsY.filter(b => b.oa).length, 'en acceso abierto'], [B.filter(b => b.tipo === 'prensa').length, 'tribunas y artículos de prensa']]);
  // gráfica de evolución anual
  const fig = $('#chart'), svg = fig.querySelector('svg'), ser = yearSeries();
  let seen = false;
  function chart(anim) {
    const Wd = fig.clientWidth, H = fig.clientHeight; if (!Wd) return; const pad = { l: 44, r: 16, t: 26, b: 34 }, iw = Wd - pad.l - pad.r, ih = H - pad.t - pad.b;
    const mx = Math.max(10, ...ser.map(s => s.n || 0)) * 1.15, bw = iw / ser.length, y = v => pad.t + ih - v / mx * ih;
    let s = ''; const step = mx > 60 ? 20 : 10;
    for (let v = 0; v <= mx; v += step) s += `<line x1="${pad.l}" x2="${Wd - pad.r}" y1="${y(v)}" y2="${y(v)}" stroke="var(--rule)"/><text x="${pad.l - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="var(--mute)" class="mono">${v}</text>`;
    ser.forEach((d, i) => { const x = pad.l + i * bw + bw * .18, w = bw * .64;
      if (d.n == null) { s += `<rect x="${x}" y="${y(mx * .35)}" width="${w}" height="${y(0) - y(mx * .35)}" fill="none" stroke="var(--mute)" stroke-dasharray="4 4"/><text x="${x + w / 2}" y="${y(mx * .35) - 8}" text-anchor="middle" font-size="11" fill="var(--mute)">sin datos</text>`; }
      else { const h = y(0) - y(d.n), hq = y(0) - y(d.q1), tr = anim ? `style="transform-origin:${x}px ${y(0)}px;transform:scaleY(0);transition:transform 1s cubic-bezier(.2,.7,.2,1) ${i * 90}ms"` : '';
        s += `<g class="gb" ${tr}><rect x="${x}" y="${y(d.n)}" width="${w}" height="${h}" fill="var(--leaf)" rx="2"/>${d.qk ? `<rect x="${x}" y="${y(d.q1)}" width="${w}" height="${hq}" fill="var(--olive)" rx="2"/>` : ''}</g><text x="${x + w / 2}" y="${y(d.n) - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">${d.n}</text>`; }
      s += `<text x="${x + w / 2}" y="${H - 12}" text-anchor="middle" font-size="12" fill="var(--mute)" class="mono">${d.y}${d.y === NOWY ? '*' : ''}</text>`; });
    svg.innerHTML = s;
    if (anim) requestAnimationFrame(() => requestAnimationFrame(() => svg.querySelectorAll('.gb').forEach(g => g.style.transform = 'scaleY(1)')));
  }
  const ro = new ResizeObserver(() => chart(false)); ro.observe(fig);
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting && !seen) { seen = true; chart(!RM); o.disconnect(); } }, { threshold: .3 }).observe(fig);
  const missing = ser.filter(s => s.n == null).map(s => s.y);
  $('#chartnote').textContent = `Artículos en revistas científicas recogidos en las memorias anuales del grupo; en oscuro, los publicados en revistas Q1 (cuando consta el cuartil). ${NOWY} es el año en curso.${missing.length ? ' Años sin datos: ' + missing.join(', ') + '.' : ''}`;
  // listado
  const years = [...new Set(B.map(b => b.a))].sort((a, b) => b - a);
  $('#by').innerHTML = '<option value="">Todos los años</option>' + years.map(y => `<option>${y}</option>`).join('');
  let shown = 15;
  const draw = () => { const q = norm($('#bq').value), y = $('#by').value, t = $('#bt').value, oa = $('#boa').checked;
    const list = B.map((b, i) => ({ b, i })).filter(({ b }) => (!y || String(b.a) === y) && (!t || b.tipo === t) && (!oa || b.oa) && (!q || norm([b.au, b.t, b.r].join(' ')).includes(q))).sort((a, b) => b.b.a - a.b.a);
    $('#bcount').textContent = list.length + (list.length === 1 ? ' publicación' : ' publicaciones');
    $('#pubs').innerHTML = list.slice(0, shown).map(x => pubHTML(x.b, x.i)).join('') || '<p class="empty">Ninguna publicación coincide con la búsqueda.</p>';
    $('#bmore').style.display = list.length > shown ? '' : 'none'; };
  ['#bq', '#by', '#bt', '#boa'].forEach(id => $(id).addEventListener('input', () => { shown = 15; draw(); }));
  $('#bmore').addEventListener('click', () => { shown += 20; draw(); });
  draw();
},

/* ---------------- TESIS ---------------- */
tesis() {
  pageArt('pastizales', 16);
  const isUAM = t => /UAM|Autónoma de Madrid|^Ecolog[ií]a\.?$/i.test(t.prog);
  const lei = T.filter(t => t.estado === 'leida'), curT = T.filter(t => t.estado === 'curso');
  kpis('#kp', [[curT.length, 'tesis en curso'], [lei.length, 'tesis leídas recogidas'], [T.filter(t => !isUAM(t)).length, 'en otras universidades']]);
  const tYear = t => { const m = String(t.fecha).match(/20\d\d/); return m ? +m[0] : null; };
  const TY0 = 2017.5, TY1 = 2030.5, tp = y => (y - TY0) / (TY1 - TY0) * 100, by = {};
  T.forEach((t, i) => { const y = tYear(t) ?? '?'; (by[y] = by[y] || []).push(i); });
  let h = '<div class="base"></div>'; for (let y = 2018; y <= 2030; y++) h += `<span class="yr mono" style="left:${tp(y)}%">${y}</span>`;
  Object.entries(by).forEach(([y, ids]) => { if (y === '?') return; ids.forEach((i, k) => h += `<button class="dot ${T[i].estado}" data-i="${i}" style="left:${tp(+y) + ((k % 2) ? .9 : -.9)}%;bottom:${40 + Math.floor(k / 2) * 20}px;transition-delay:${(+y - 2018) * 80 + k * 40}ms" aria-label="${esc(T[i].autor)}"></button>`); });
  $('#tcal').innerHTML = h;
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { $('#tcal').classList.add('in'); o.disconnect(); } }, { threshold: .3 }).observe($('#tcal'));
  const showT = i => { const t = T[i]; $$('#tcal .dot').forEach(d => d.classList.toggle('on', +d.dataset.i === i)); $('#tinfo').innerHTML = `<b style="color:#fff">${esc(t.autor)}</b> · ${esc(t.t)}<br><span class="mono" style="color:#AEB6A2">${t.estado === 'leida' ? 'Leída' : 'Prevista'} ${esc(t.fecha)} · Dir.: ${esc(t.dir)} · ${esc(t.prog)}</span>`; };
  $('#tcal').addEventListener('click', e => { const d = e.target.closest('.dot'); if (d) showT(+d.dataset.i); });
  $('#tcal').addEventListener('pointerover', e => { const d = e.target.closest('.dot'); if (d) showT(+d.dataset.i); });
  $('#tnote').textContent = (by['?'] || []).length ? `${by['?'].length} tesis en curso no tienen fecha prevista y no aparecen en el calendario.` : '';
  let f = '';
  $('#tchips').innerHTML = [['', 'Todas'], ['curso', 'En curso'], ['leida', 'Leídas'], ['uam', 'UAM'], ['ext', 'Otras universidades']].map(c => `<button class="chip" data-v="${c[0]}" aria-pressed="${c[0] === f}">${c[1]}</button>`).join('');
  const draw = () => { const list = T.filter(t => !f || (f === 'uam' ? isUAM(t) : f === 'ext' ? !isUAM(t) : t.estado === f)).sort((a, b) => (tYear(a) || 9999) - (tYear(b) || 9999));
    $('#tl').innerHTML = list.map(t => `<div><b>${esc(t.autor)}</b><span>${esc(t.t)}</span><span class="mono">${t.estado === 'leida' ? 'Leída' : 'Prevista'} ${esc(t.fecha || 's. f.')} · ${esc(t.prog)} · Dir.: ${esc(t.dir)}</span></div>`).join(''); };
  $('#tchips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; f = b.dataset.v; $$('#tchips .chip').forEach(c => c.setAttribute('aria-pressed', c === b)); draw(); });
  draw();
},

/* ---------------- NOVEDADES ---------------- */
novedades() {
  pageArt('vertebrados', 18);
  $('#news').innerHTML = N.map((n, i) => newsCard(n, i)).join('') || '<p class="empty">Todavía no hay novedades.</p>';
  $('#premios').innerHTML = (W.PREMIOS || []).map(p => `<li><b>${p.url ? `<a href="${esc(p.url)}">${esc(p.t)}</a>` : esc(p.t)}</b><small>${p.a} · ${esc(p.quien)}</small></li>`).join('');
  $('#activ').innerHTML = (W.ACTIVIDADES || []).map(a => `<li><b>${esc(a.t)}</b><small>${esc(a.fecha)} · ${esc(a.lugar)}${a.quien ? ' · ' + esc(a.quien) : ''}</small></li>`).join('');
  const press = B.filter(b => b.tipo === 'prensa');
  $('#press').innerHTML = press.map(b => `<li><a href="${esc(pubHref(b))}">${esc(b.t)}</a><small>${esc(b.au)} · ${esc(b.r)} ${b.a}</small></li>`).join('');
},

/* ---------------- CONTACTO ---------------- */
contacto() {
  pageArt('evaluacion', 20);
  const co = M.filter(m => m.coord);
  $('#coord').innerHTML = co.map(m => `<a class="person c" href="miembro.html?id=${slug(m.nombre)}"><span class="av">${esc(initials(m.nombre))}</span><div><b>${esc(m.nombre)}</b><span>${esc(email(m))}</span></div></a>`).join('');
  $('#estancias').innerHTML = (W.ESTANCIAS || []).map(e => `<li><b>${esc(e.quien)}</b> · ${esc(e.prog)}<small>${esc(e.origen)} · ${esc(e.fecha)} · ${esc(e.tema)}</small></li>`).join('');
  $('#ofertas').innerHTML = O.length ? O.map(o => `<div><span class="mono mute">${esc(o.tipo || '')}</span><h3 style="margin-top:6px">${esc(o.t)}</h3><p class="mute">${esc(o.txt || '')}${o.contacto ? ' · ' + esc(o.contacto) : ''}</p></div>`).join('') : `<div><h3>¿Quieres hacer tu TFG, TFM o tesis con nosotros?</h3><p class="mute" style="margin:6px 0 0">Ahora mismo no hay ofertas publicadas. Escribe a la coordinación o a quien trabaje en la línea que te interese: consulta el <a href="equipo.html">equipo</a> y las <a href="lineas.html">líneas</a>.</p></div>`;
}
};

function newsCard(n, i) {
  return `<article><div class="plate">${n.img ? `<img src="${esc(n.img)}" alt="" loading="lazy">` : plate(KINDS[i % KINDS.length], 40 + i)}</div><div class="in"><span class="mono">${esc(n.fecha)} · ${esc(n.tipo)}</span><h3 style="margin-top:6px">${n.url ? `<a href="${esc(n.url)}" style="color:inherit">${esc(n.t)}</a>` : esc(n.t)}</h3><p>${esc(n.txt)}</p></div></article>`;
}

/* ---------- TopoJSON → GeoJSON (mínimo, para el mapa) ---------- */
function topoFeatures(topo, name) {
  const tf = topo.transform, arcs = topo.arcs.map(a => { let x = 0, y = 0; return a.map(p => tf ? (x += p[0], y += p[1], [x * tf.scale[0] + tf.translate[0], y * tf.scale[1] + tf.translate[1]]) : p); });
  const ring = idx => { const out = []; idx.forEach((i, k) => { const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i]; a.forEach((p, j) => { if (j || !k) out.push(p); }); }); return out; };
  const geom = g => g.type === 'Polygon' ? { type: 'Polygon', coordinates: g.arcs.map(ring) } : g.type === 'MultiPolygon' ? { type: 'MultiPolygon', coordinates: g.arcs.map(p => p.map(ring)) } : null;
  return { type: 'FeatureCollection', features: topo.objects[name].geometries.map(g => ({ type: 'Feature', properties: g.properties || {}, geometry: geom(g) })).filter(f => f.geometry) };
}

(PAGE_INIT[PAGE] || (() => {}))();
reveal();
})();
