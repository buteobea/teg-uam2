/* =====================================================================
   Ofertas: convierte el formulario «Nueva oferta» (una issue de GitHub) en
   una entrada de OFERTAS en datos.js. Lo ejecuta .github/workflows/ofertas.yml.
   · issue abierta o editada → crea o actualiza la oferta
   · issue cerrada           → retira la oferta
   Variables de entorno: ACCION (opened|edited|reopened|closed|labeled), NUMERO, CUERPO, URL
   Escribe en la salida un mensaje para comentar en la issue (o «ERROR: …»).
   ===================================================================== */
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const F = path.join(RAIZ, 'datos.js');

// «### Etiqueta\n\nvalor» → { etiqueta: valor }
export function leerFormulario(cuerpo) {
  const out = {}; const partes = String(cuerpo || '').replace(/\r/g, '').split(/^### +/m).slice(1);
  for (const p of partes) { const i = p.indexOf('\n'); const k = p.slice(0, i).trim(); let v = p.slice(i + 1).trim(); if (v === '_No response_' || v === 'None') v = ''; out[k] = v; }
  return out;
}
const CAMPOS = { tipo: 'Tipo de oferta', t: 'Título', t_en: 'Título en inglés', txt: 'Descripción', txt_en: 'Descripción en inglés', requisitos: 'Requisitos o perfil',
  linea: 'Línea de investigación', dirige: 'Dirige o tutoriza', contacto: 'Correo de contacto', plazo: 'Fecha límite para solicitarla', inicio: 'Inicio previsto',
  duracion: 'Duración', remunerada: '¿Es remunerada?', enlace: 'Enlace a la convocatoria o a más información' };

export function construir(f, lineas, numero, url) {
  const o = { issue: numero };
  for (const [k, et] of Object.entries(CAMPOS)) if (f[et]) o[k] = f[et];
  const errores = [];
  if (!o.t) errores.push('falta el título'); if (!o.txt) errores.push('falta la descripción'); if (!o.dirige) errores.push('falta quién dirige');
  if (!o.contacto || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o.contacto)) errores.push('el correo de contacto no es válido');
  if (o.plazo) { if (!/^\d{4}-\d{2}-\d{2}$/.test(o.plazo) || isNaN(Date.parse(o.plazo))) errores.push(`la fecha límite «${o.plazo}» debe tener el formato AAAA-MM-DD (p. ej. 2027-03-31)`); }
  if (o.enlace && !/^https?:\/\//.test(o.enlace)) errores.push('el enlace debe empezar por https://');
  // una o dos líneas (los nombres pueden llevar comas, así que se buscan enteros en el texto)
  const elegidas = lineas.filter(x => String(o.linea || '').includes(x.nombre)).map(x => x.id);
  if (elegidas.length > 2) errores.push('has elegido más de dos líneas de investigación (máximo dos)');
  delete o.linea; if (elegidas.length) o.lineas = elegidas.slice(0, 2).join(' ');
  o.t = o.t.replace(/^\[Oferta\]\s*/i, '');
  if (url) o.url = url;
  return { o, errores };
}

// sustituye el bloque «window.OFERTAS = [ … ];» por la lista nueva (una oferta por línea)
export function escribirOfertas(src, lista) {
  const ini = src.indexOf('window.OFERTAS = ['); if (ini < 0) throw new Error('No encuentro «window.OFERTAS = [» en datos.js');
  const resto = src.slice(ini); const m = resto.match(/^window\.OFERTAS = \[\s*\];|^window\.OFERTAS = \[[\s\S]*?\n\];/);
  if (!m) throw new Error('No encuentro el final de la lista OFERTAS en datos.js');
  const nuevo = lista.length ? 'window.OFERTAS = [\n' + lista.map(o => '  ' + JSON.stringify(o)).join(',\n') + '\n];' : 'window.OFERTAS = [];';
  return src.slice(0, ini) + nuevo + resto.slice(m[0].length);
}

export function main(env = process.env) {
  const src = fs.readFileSync(F, 'utf8'); const c = { window: {} }; vm.createContext(c); vm.runInContext(src, c);
  const W = c.window, n = +env.NUMERO; let lista = (W.OFERTAS || []).map(o => ({ ...o }));
  const antes = lista.length;
  if (env.ACCION === 'closed') {
    lista = lista.filter(o => o.issue !== n);
    if (lista.length === antes) return 'Nada que retirar: esta oferta no estaba en la web.';
    fs.writeFileSync(F, escribirOfertas(src, lista)); return '🗑️ Oferta retirada de la web. Si se cerró por error, pulsa «Reopen issue» y volverá a aparecer.';
  }
  const { o, errores } = construir(leerFormulario(env.CUERPO), W.LINEAS || [], n, env.URL);
  if (errores.length) return 'ERROR: no he podido publicar la oferta porque ' + errores.join('; ') + '. Edita el formulario (menú ··· → Edit) para corregirlo y se publicará sola.';
  const i = lista.findIndex(x => x.issue === n);
  if (i >= 0) lista[i] = o; else lista.unshift(o);
  fs.writeFileSync(F, escribirOfertas(src, lista));
  return `✅ Oferta ${i >= 0 ? 'actualizada' : 'publicada'}. Aparecerá en la web (Contacto → Ofertas abiertas) en un par de minutos.${o.plazo ? ` Se ocultará sola después del ${o.plazo}.` : ''} Para retirarla antes, cierra esta issue.`;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try { console.log(main()); } catch (e) { console.log('ERROR: ' + e.message); process.exitCode = 1; }
}
