/* TEG-UAM · láminas vectoriales generadas (ilustraciones de las líneas). No hace falta tocarlo. */
(() => {
const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
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
let UID = 0;
function plate(kind, seed = 1, cls = '') {
  const f = PLATES[kind] || PLATES.biogeografia, u = 'p' + (++UID) + '-';
  // identificadores únicos por lámina (evita ids repetidos cuando hay varias en la misma página)
  const s = f(rng(seed * 9973 + kind.length)).replace(/id="(st|dt|cr)"/g, `id="${u}$1"`).replace(/url\(#(st|dt|cr)\)/g, `url(#${u}$1)`);
  return `<svg class="${cls}" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${s}</svg>`;
}
window.TEG_PLATES = { PLATES, KINDS, plate, rng };
})();
