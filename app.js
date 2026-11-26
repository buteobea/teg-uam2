/* =====================================================================
   TEG-UAM · código común de todas las páginas (español e inglés)
   No hace falta tocar este archivo para actualizar contenidos (ver datos.js).
   ===================================================================== */
(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const slug = s => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const W = window, EN = document.documentElement.lang === 'en', ROOT = EN ? '../' : '';
const { PLATES, KINDS, plate, rng } = W.TEG_PLATES;
const CFG = W.CONFIG || {};
const L = W.LINEAS || [], MALL = W.MIEMBROS || [], P = W.PROYECTOS || [], T = W.TESIS || [], N = W.NOVEDADES || [],
      G = W.LUGARES || [], A = W.ANUAL || [], O = W.OFERTAS || [];
const M = MALL.filter(m => !m.antiguo), MF = MALL.filter(m => m.antiguo);
/* publicaciones: lista principal + las añadidas automáticamente (sin duplicados) */
const B = (() => { const k = new Set(), out = []; const key = p => [p.doi && 'd' + p.doi.toLowerCase(), 't' + norm(p.t).replace(/[^a-z0-9]/g, '').slice(0, 70)].filter(Boolean);
  for (const p of [...(W.PUBLICACIONES || []), ...(W.PUBLICACIONES_AUTO || [])]) { const ks = key(p); if (ks.some(x => k.has(x))) continue; ks.forEach(x => k.add(x)); out.push(p); } return out; })();
const NOWY = new Date().getFullYear(), NOW = NOWY + new Date().getMonth() / 12;
const PAGE = document.body.dataset.page;

/* ---------- textos de la interfaz ---------- */
const S = {
 es: { nav: ['Líneas', 'Equipo', 'Proyectos', 'Dónde trabajamos', 'Publicaciones', 'Tesis', 'Novedades', 'Contacto'], menu: 'Menú', other: 'EN', otherT: 'English version',
  brandSub: 'Ecología y Conservación de Ecosistemas Terrestres', explore: 'Explorar', where: 'Dónde estamos', staticSite: 'Web estática, sin cookies', stats: 'Estadísticas de visitas',
  footTxt: 'Grupo de Investigación de Ecología y Conservación de Ecosistemas Terrestres. Departamento de Ecología, Universidad Autónoma de Madrid.',
  researchers: 'investigadores', activeProj: 'proyectos activos', artsY: y => `artículos en ${y}`, countries: 'países con trabajo', copied: 'Cita copiada', copyFail: 'No se pudo copiar', copy: 'Copiar cita',
  spReal: 'Espectrograma real', spRec: 'grabación', kHz: 'kHz', enter: 'Entrar →',
  doors: { lineas: ['Líneas de investigación', n => `${n} líneas, del individuo al paisaje y de lo local a lo global.`], equipo: ['Equipo', n => `${n} personas ordenadas según lo que investigan, con su ficha individual.`], proyectos: ['Proyectos', n => `${n} proyectos en curso: LIFE, Plan Estatal, internacionales y transferencia.`], mapa: ['Dónde trabajamos', n => `Trabajo de campo y colaboraciones en ${n} países de cuatro continentes.`], publicaciones: ['Publicaciones', (n, y) => `${n} publicaciones desde ${y}: evolución anual, buscador y citas.`], tesis: ['Tesis doctorales', (a, b) => `${a} tesis leídas y ${b} en curso, en un calendario de defensas.`] },
  featured: 'Proyecto destacado', allProj: 'Todos los proyectos', seeProj: 'Ver el proyecto',
  lines: 'líneas', inves: 'investigadores', lineOf: (i, n) => `Línea ${i} de ${n}`, who: 'Quién', activeP: 'Proyectos en curso', recentPubs: n => `Publicaciones recientes (${n} en la web)`, workIn: 'Trabajo en', onMap: 'ver en el mapa',
  people: 'personas', withOrcid: 'con ORCID enlazado', thInProg: 'tesis en curso', all: 'Todas', allM: 'Todos', person: n => n === 1 ? '1 persona' : n + ' personas', nobody: 'Nadie coincide con la búsqueda.', seeProfile: 'ver ficha',
  axis1: 'eje 1', axis2: 'eje 2', former: 'Antiguos miembros', formerTxt: 'Personas que han formado parte del grupo.', formerTag: 'Antiguo miembro del TEG-UAM', member: 'Miembro del TEG-UAM',
  notFound: 'Persona no encontrada', backTeam: 'Volver al equipo', pubsWeb: 'publicaciones en esta web', projIP: 'proyectos como IP o participante', thDir: 'tesis dirigidas o tutorizadas',
  linesH: 'Líneas', pending: 'Pendiente de asignar', contact: 'Contacto', email: 'Correo', office: 'Despacho', phone: 'Teléfono', noContact: 'Sin datos de contacto públicos.', uamProfile: 'Ficha en la UAM', personalWeb: 'Web personal',
  ownTh: 'Su tesis doctoral', projects: 'Proyectos', dirTh: n => `Tesis dirigidas o tutorizadas (${n})`, pubs: n => `Publicaciones (${n})`, noPubs: 'Aún no hay publicaciones suyas en la web.', seeAll: n => `Ver las ${n}`, autoLink: 'Se enlazan automáticamente buscando su firma en las autorías de las publicaciones recogidas en la web.',
  read: 'Leída', inProg: 'En curso', expected: 'prevista', dir: 'Dir.', nd: 's. f.', ongoing: 'en curso',
  types: { life: 'LIFE', nacional: 'Nacionales', internacional: 'Internacionales', contrato: 'Contratos' }, type1: { life: 'Proyecto LIFE', nacional: 'Proyecto nacional', internacional: 'Proyecto internacional', contrato: 'Contrato de transferencia' },
  inCourse: 'en curso', lifeP: 'proyectos LIFE', intlA: 'internacionales en curso', contrA: 'contratos en curso', onGoing: 'En curso', nProj: n => `${n} proyectos`, noProj: 'Ningún proyecto coincide.',
  ref: 'Referencia', ip: 'IP', budget: 'Presupuesto', line: 'Línea', funder: 'Financiación', period: 'Vigencia', kind: 'Tipo', fullCard: 'Ficha completa del proyecto →', officialWeb: 'Web oficial del proyecto', teamP: 'Personas del grupo', otherLine: 'Otros proyectos de la línea', places: 'Dónde se trabaja en esta línea', autoSummary: p => `Proyecto ${p.fin >= NOWY ? 'en curso' : 'finalizado'} (${p.ini}–${p.fin}) financiado por ${p.fin_}.`, projNF: 'Proyecto no encontrado', backProj: 'Volver a los proyectos', status: ['En curso', 'Finalizado'],
  countriesK: 'países', placesES: 'lugares en España', placesOut: 'lugares fuera de España', fieldK: 'zonas de trabajo de campo', everything: 'Todo', field: 'Trabajo de campo', collab: 'Colaboraciones', canarias: 'Canarias', mapFail: 'No se pudo cargar la base cartográfica. Los lugares aparecen en la lista inferior.',
  pubNote: (y, miss) => `Artículos en revistas científicas recogidos en las memorias anuales del grupo; en oscuro, los publicados en revistas Q1 (cuando consta el cuartil). ${y} es el año en curso.${miss.length ? ' Años sin datos: ' + miss.join(', ') + '.' : ''}`, noData: 'sin datos', inQ1: 'en revistas Q1', inOA: 'en acceso abierto', press: 'tribunas y artículos de prensa', allY: 'Todos los años', nPubs: n => n === 1 ? '1 publicación' : n + ' publicaciones', noPub: 'Ninguna publicación coincide con la búsqueda.', autoAdded: 'añadida automáticamente',
  tipoPub: { art: 'Artículo', cap: 'Libro/capítulo', div: 'Divulgación', nota: 'Editorial/carta/nota', prensa: 'Prensa' },
  thReadK: 'tesis leídas recogidas', otherUni: 'en otras universidades', noDate: n => `${n} tesis en curso no tienen fecha prevista y no aparecen en el calendario.`, uam: 'UAM', otherU: 'Otras universidades', readF: 'Leídas', progF: 'En curso',
  noNews: 'Todavía no hay novedades.', offer: '¿Quieres hacer tu TFG, TFM o tesis con nosotros?', offerTxt: 'Ahora mismo no hay ofertas publicadas. Escribe a la coordinación o a quien trabaje en la línea que te interese: consulta el <a href="equipo.html">equipo</a> y las <a href="lineas.html">líneas</a>.' },
 en: { nav: ['Research', 'Team', 'Projects', 'Where we work', 'Publications', 'Theses', 'News', 'Contact'], menu: 'Menu', other: 'ES', otherT: 'Versión en español',
  brandSub: 'Terrestrial Ecosystem Ecology and Conservation', explore: 'Explore', where: 'Where we are', staticSite: 'Static website, no cookies', stats: 'Visitor statistics',
  footTxt: 'Terrestrial Ecosystem Ecology and Conservation Research Group. Department of Ecology, Universidad Autónoma de Madrid.',
  researchers: 'researchers', activeProj: 'active projects', artsY: y => `papers in ${y}`, countries: 'countries we work in', copied: 'Citation copied', copyFail: 'Could not copy', copy: 'Copy citation',
  spReal: 'Real spectrogram', spRec: 'recording', kHz: 'kHz', enter: 'Enter →',
  doors: { lineas: ['Research lines', n => `${n} lines, from individuals to landscapes and from local to global.`], equipo: ['Team', n => `${n} people arranged by what they study, each with a profile page.`], proyectos: ['Projects', n => `${n} ongoing projects: LIFE, national, international and knowledge transfer.`], mapa: ['Where we work', n => `Fieldwork and collaborations in ${n} countries on four continents.`], publicaciones: ['Publications', (n, y) => `${n} publications since ${y}: yearly trend, search and citations.`], tesis: ['PhD theses', (a, b) => `${a} completed and ${b} ongoing theses on a defence calendar.`] },
  featured: 'Featured project', allProj: 'All projects', seeProj: 'See the project',
  lines: 'research lines', inves: 'researchers', lineOf: (i, n) => `Line ${i} of ${n}`, who: 'Who', activeP: 'Ongoing projects', recentPubs: n => `Recent publications (${n} on this site)`, workIn: 'Work in', onMap: 'see on the map',
  people: 'people', withOrcid: 'with ORCID linked', thInProg: 'ongoing theses', all: 'All', allM: 'All', person: n => n === 1 ? '1 person' : n + ' people', nobody: 'No one matches your search.', seeProfile: 'open profile',
  axis1: 'axis 1', axis2: 'axis 2', former: 'Former members', formerTxt: 'People who have been part of the group.', formerTag: 'Former TEG-UAM member', member: 'TEG-UAM member',
  notFound: 'Person not found', backTeam: 'Back to the team', pubsWeb: 'publications on this site', projIP: 'projects as PI or participant', thDir: 'theses supervised',
  linesH: 'Research lines', pending: 'Not yet assigned', contact: 'Contact', email: 'Email', office: 'Office', phone: 'Phone', noContact: 'No public contact details.', uamProfile: 'UAM profile', personalWeb: 'Personal website',
  ownTh: 'PhD thesis', projects: 'Projects', dirTh: n => `Theses supervised (${n})`, pubs: n => `Publications (${n})`, noPubs: 'No publications on this site yet.', seeAll: n => `Show all ${n}`, autoLink: 'Linked automatically by matching their name in the author lists of the publications on this site.',
  read: 'Completed', inProg: 'Ongoing', expected: 'expected', dir: 'Supervisors', nd: 'n.d.', ongoing: 'ongoing',
  types: { life: 'LIFE', nacional: 'National', internacional: 'International', contrato: 'Contracts' }, type1: { life: 'LIFE project', nacional: 'National project', internacional: 'International project', contrato: 'Knowledge-transfer contract' },
  inCourse: 'ongoing', lifeP: 'LIFE projects', intlA: 'ongoing international', contrA: 'ongoing contracts', onGoing: 'Ongoing', nProj: n => `${n} projects`, noProj: 'No project matches.',
  ref: 'Reference', ip: 'PI', budget: 'Budget', line: 'Research line', funder: 'Funding', period: 'Period', kind: 'Type', fullCard: 'Project page →', officialWeb: 'Official project website', teamP: 'Group members involved', otherLine: 'Other projects in this line', places: 'Where this line works', autoSummary: p => `${p.fin >= NOWY ? 'Ongoing' : 'Completed'} project (${p.ini}–${p.fin}) funded by ${p.fin_}.`, projNF: 'Project not found', backProj: 'Back to projects', status: ['Ongoing', 'Completed'],
  countriesK: 'countries', placesES: 'sites in Spain', placesOut: 'sites outside Spain', fieldK: 'fieldwork areas', everything: 'All', field: 'Fieldwork', collab: 'Collaborations', canarias: 'Canary Islands', mapFail: 'The base map could not be loaded. The sites are listed below.',
  pubNote: (y, miss) => `Journal papers listed in the group's annual reports; darker bars show papers in Q1 journals (where the quartile is known). ${y} is the current year.${miss.length ? ' Years without data: ' + miss.join(', ') + '.' : ''}`, noData: 'no data', inQ1: 'in Q1 journals', inOA: 'open access', press: 'opinion and press articles', allY: 'All years', nPubs: n => n === 1 ? '1 publication' : n + ' publications', noPub: 'No publication matches your search.', autoAdded: 'added automatically',
  tipoPub: { art: 'Paper', cap: 'Book/chapter', div: 'Outreach', nota: 'Editorial/letter/note', prensa: 'Press' },
  thReadK: 'completed theses listed', otherUni: 'at other universities', noDate: n => `${n} ongoing theses have no expected date and are not shown on the calendar.`, uam: 'UAM', otherU: 'Other universities', readF: 'Completed', progF: 'Ongoing',
  noNews: 'No news yet.', offer: 'Would you like to do your BSc, MSc or PhD with us?', offerTxt: 'There are no open calls right now. Write to the coordinators or to whoever works in the line you are interested in: see the <a href="equipo.html">team</a> and the <a href="lineas.html">research lines</a>.' }
}[EN ? 'en' : 'es'];
Object.assign(S, EN ? {
  navRed: 'Network', navGal: 'Gallery',
  citT: 'Citations according to OpenAlex', nCit: n => n === 1 ? '1 citation' : n + ' citations', sortNew: 'Newest first', sortCit: 'Most cited', sortL: 'Sort',
  impact: 'Impact', totCit: 'citations in total', hGroup: 'group h-index', citedPct: 'of publications cited', mostCited: 'Most cited',
  impNote: d => `Citations according to OpenAlex for the publications listed on this site (matched by DOI or title), updated on ${d}. The group h-index is the largest number h of publications with at least h citations each. Citation counts differ between databases (Web of Science, Scopus or Google Scholar give different figures).`,
  hIdx: 'h-index', citsAll: 'Citations', worksAll: 'Works', impM: d => `According to OpenAlex, whole career (updated on ${d}).`, oaProfile: 'OpenAlex profile', kpiH: 'h-index (OpenAlex)',
  netMembers: 'connected people', netPairs: 'co-author pairs within the group', netInst: 'co-authoring institutions', netCountries: 'countries',
  onlyGroup: 'Group only', withInst: 'With institutions', topInst: 'Institutions with most joint publications', works: n => n === 1 ? '1 joint publication' : n + ' joint publications',
  together: n => n === 1 ? '1 publication together' : n + ' publications together', pubsN: n => n === 1 ? '1 publication' : n + ' publications',
  netNote: d => `A line joins two group members when they co-sign at least one publication on this site, and a member with an institution when that institution appears in the affiliation of a co-author of their publications (OpenAlex, updated on ${d}). Only the institutions with most joint work are drawn. Line width: number of publications. Drag the nodes to rearrange them.`,
  legMember: 'Group member', legFormer: 'Former member', legES: 'Spanish institution', legIntl: 'Institution abroad', countriesH: 'Co-authoring institutions by country', netAria: 'Co-authorship network between group members and other institutions', netEmpty: 'Citation data are not available yet.',
  funders: 'Supported by', fundersTxt: 'Organisations that fund or have funded the group\'s projects and contracts.', nProjF: n => n === 1 ? '1 project' : n + ' projects', transfer: 'Knowledge transfer',
  collabsH: 'We work with', collabsTxt: (n, c) => `The group also co-authors publications with ${n} institutions in ${c} countries.`, seeNet: 'See the collaboration network',
  galEmpty: 'There are no photos in the gallery yet.', galEmptyTxt: 'Group members can add them by following the editing guide.', close: 'Close', prev: 'Previous', next: 'Next', photoBy: 'Photo'
} : {
  navRed: 'Red', navGal: 'Galería',
  citT: 'Citas según OpenAlex', nCit: n => n === 1 ? '1 cita' : n + ' citas', sortNew: 'Más recientes', sortCit: 'Más citadas', sortL: 'Ordenar',
  impact: 'Impacto', totCit: 'citas en total', hGroup: 'índice h del grupo', citedPct: 'de las publicaciones, citadas', mostCited: 'La más citada',
  impNote: d => `Citas según OpenAlex de las publicaciones recogidas en esta web (identificadas por DOI o por título), actualizadas el ${d}. El índice h del grupo es el mayor número h de publicaciones con al menos h citas cada una. Las cifras cambian según la base de datos (Web of Science, Scopus o Google Scholar dan valores distintos).`,
  hIdx: 'Índice h', citsAll: 'Citas', worksAll: 'Trabajos', impM: d => `Según OpenAlex, para toda su trayectoria (actualizado el ${d}).`, oaProfile: 'Perfil en OpenAlex', kpiH: 'índice h (OpenAlex)',
  netMembers: 'personas conectadas', netPairs: 'parejas de coautores dentro del grupo', netInst: 'instituciones coautoras', netCountries: 'países',
  onlyGroup: 'Solo el grupo', withInst: 'Con instituciones', topInst: 'Instituciones con más publicaciones conjuntas', works: n => n === 1 ? '1 publicación conjunta' : n + ' publicaciones conjuntas',
  together: n => n === 1 ? '1 publicación juntos' : n + ' publicaciones juntos', pubsN: n => n === 1 ? '1 publicación' : n + ' publicaciones',
  netNote: d => `Una línea une a dos personas del grupo cuando firman juntas al menos una publicación de esta web, y a una persona con una institución cuando esa institución aparece en la afiliación de algún coautor de sus publicaciones (OpenAlex, actualizado el ${d}). Solo se dibujan las instituciones con más trabajos conjuntos. Grosor de la línea: número de publicaciones. Puedes arrastrar los nodos.`,
  legMember: 'Miembro del grupo', legFormer: 'Antiguo miembro', legES: 'Institución española', legIntl: 'Institución extranjera', countriesH: 'Instituciones coautoras por país', netAria: 'Red de coautorías entre miembros del grupo y otras instituciones', netEmpty: 'Los datos de citas aún no están disponibles.',
  funders: 'Con el apoyo de', fundersTxt: 'Entidades que financian o han financiado proyectos y contratos del grupo.', nProjF: n => n === 1 ? '1 proyecto' : n + ' proyectos', transfer: 'Transferencia',
  collabsH: 'Colaboramos con', collabsTxt: (n, c) => `Además, el grupo firma publicaciones con ${n} instituciones de ${c} países.`, seeNet: 'Ver la red de colaboraciones',
  galEmpty: 'Todavía no hay fotos en la galería.', galEmptyTxt: 'Cualquier miembro del grupo puede añadirlas siguiendo la guía de edición.', close: 'Cerrar', prev: 'Anterior', next: 'Siguiente', photoBy: 'Foto'
});
/* ---------- ofertas ---------- */
const hoy = new Date().toISOString().slice(0, 10);
const OV = (W.OFERTAS || []).filter(o => !o.plazo || o.plazo >= hoy);
const REPO = CFG.repo || 'buteobea/teg-uam2';
const fdate = d => { const x = new Date(d + 'T12:00'); return isNaN(x) ? d : x.toLocaleDateString(EN ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'short', year: 'numeric' }); };
const TIPO_EN = { 'TFG': 'BSc thesis', 'TFM': 'MSc thesis', 'Tesis doctoral': 'PhD', 'Prácticas externas': 'Internship', 'Erasmus+ / estancia': 'Erasmus+ / visit', 'Contrato': 'Contract', 'Otro': 'Other' };
const otipo = o => EN ? (TIPO_EN[o.tipo] || o.tipo) : o.tipo;
const linkPeople = s => String(s || '').split(/\s*,\s*|\s+y\s+|\s+and\s+/).filter(Boolean).map(n => { const m = MALL.find(x => norm(x.nombre).includes(norm(n)) || norm(n).split(' ').every(w => norm(x.nombre).includes(w))); return m ? `<a href="miembro.html?id=${slug(m.nombre)}">${esc(n)}</a>` : esc(n); }).join(', ');
// markdown mínimo (negrita, cursiva, listas y párrafos) para los textos de las ofertas
const mdLite = s => { const inl = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, '$1<em>$2</em>').replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>');
  const out = []; let list = null;
  for (const raw of String(s || '').replace(/\r/g, '').split('\n')) { const l = raw.trim(); const ul = l.match(/^[-*•]\s+(.*)/), ol = l.match(/^\d+[.)]\s+(.*)/);
    if (ul || ol) { const tag = ul ? 'ul' : 'ol'; if (!list || list.tag !== tag) { if (list) out.push(`</${list.tag}>`); list = { tag }; out.push(`<${tag}>`); } out.push(`<li>${inl((ul || ol)[1])}</li>`); continue; }
    if (list) { out.push(`</${list.tag}>`); list = null; }
    if (l) out.push(`<p>${inl(l)}</p>`); }
  if (list) out.push(`</${list.tag}>`); return out.join(''); };
function offerCard(o) {
  const days = o.plazo ? Math.ceil((new Date(o.plazo + 'T23:59') - new Date()) / 864e5) : null;
  const rem = EN ? ({ 'Sí': 'Yes', 'No': 'No', 'Depende de la convocatoria': 'Depends on the call' }[o.remunerada] || o.remunerada) : o.remunerada;
  const rows = [[S.ofReq, o.requisitos && mdLite(o.requisitos)], [S.ofDir, o.dirige && linkPeople(o.dirige)], [S.ofStart, o.inicio && esc(o.inicio)], [S.ofDur, o.duracion && esc(o.duracion)], [S.ofPaid, rem && esc(rem)]].filter(r => r[1]);
  const subj = encodeURIComponent((EN ? 'Position: ' : 'Oferta: ') + tr(o, 't'));
  return `<article class="offer"><div class="otop"><span class="otag">${esc(otipo(o))}</span>${[...String(o.lineas || '').split(/\s+/), o.linea].filter(Boolean).map(id => `<a class="tag" href="lineas.html#${esc(id)}">${esc(lShort(id))}</a>`).join('')}${o.plazo ? `<span class="oplazo${days <= 14 ? ' soon' : ''}">${S.ofDeadline} ${fdate(o.plazo)}${days != null && days <= 60 ? ' · ' + S.ofLeft(days) : ''}</span>` : `<span class="oplazo">${S.ofOpen}</span>`}</div>
    <h3>${esc(tr(o, 't'))}</h3><div class="otxt">${mdLite(tr(o, 'txt'))}</div>
    ${rows.length ? `<dl class="ficha">${rows.map(r => `<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join('')}</dl>` : ''}
    <div class="btns">${o.contacto ? `<a class="btn" href="mailto:${esc(o.contacto)}?subject=${subj}">${S.ofWrite}</a>` : ''}${o.enlace ? `<a class="btn ghost" href="${esc(o.enlace)}">${S.ofCall} ↗</a>` : ''}</div></article>`;
}
Object.assign(S, EN ? {
  ofReq: 'Requirements', ofDir: 'Supervisors', ofStart: 'Start', ofDur: 'Duration', ofPaid: 'Paid', ofDeadline: 'Apply by', ofOpen: 'Open until filled', ofLeft: n => n <= 0 ? 'last day' : n === 1 ? '1 day left' : n + ' days left',
  ofWrite: 'Write to apply', ofCall: 'Call / more info', ofAll: 'All', ofPost: u => `Are you a group member? <a href="${u}">Publish a position with the form</a> (a GitHub account with access to the repository is required) or see the <a href="https://github.com/${REPO}/blob/main/EDITAR.md#publicar-una-oferta-de-tfg-tfm-tesis-o-contrato--ofertas">editing guide</a>.`,
  ofNone: 'There are no open positions right now.', ofHome: n => n === 1 ? '1 open position' : n + ' open positions', ofHomeTxt: 'Right now:', ofSee: 'See positions', ofMine: n => `Open positions (${n})`
} : {
  ofReq: 'Requisitos', ofDir: 'Dirige', ofStart: 'Inicio', ofDur: 'Duración', ofPaid: 'Remunerada', ofDeadline: 'Plazo:', ofOpen: 'Abierta hasta cubrirse', ofLeft: n => n <= 0 ? 'último día' : n === 1 ? 'queda 1 día' : 'quedan ' + n + ' días',
  ofWrite: 'Escribir para solicitarla', ofCall: 'Convocatoria / más información', ofAll: 'Todas', ofPost: u => `¿Eres del grupo? <a href="${u}">Publica una oferta con el formulario</a> (hace falta una cuenta de GitHub con acceso al repositorio) o consulta la <a href="https://github.com/${REPO}/blob/main/EDITAR.md#publicar-una-oferta-de-tfg-tfm-tesis-o-contrato--ofertas">guía de edición</a>.`,
  ofNone: 'Ahora mismo no hay ofertas abiertas.', ofHome: n => n === 1 ? '1 oferta abierta' : n + ' ofertas abiertas', ofHomeTxt: 'Ahora mismo:', ofSee: 'Ver ofertas', ofMine: n => `Ofertas abiertas (${n})`
});
/* ---------- citas (OpenAlex) ---------- */
const CI = W.CITAS || { obras: {}, instituciones: [], autores: {} };
const GAL = W.GALERIA || [];
const normD = d => String(d || '').trim().toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, '');
const ciKey = b => b.doi ? 'doi:' + normD(b.doi) : 't:' + norm(b.t).replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
const ciOf = b => CI.obras[ciKey(b)] || null;
const cites = b => { const o = ciOf(b); return o ? o[0] : null; };
const hIndex = arr => { const s = arr.filter(x => x != null).sort((a, b) => b - a); let h = 0; while (h < s.length && s[h] >= h + 1) h++; return h; };
const ciDate = () => CI.fecha ? new Date(CI.fecha + 'T12:00').toLocaleDateString(EN ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
const ctry = (() => { try { const dn = new Intl.DisplayNames([EN ? 'en' : 'es'], { type: 'region' }); return c => { try { return dn.of(c); } catch (e) { return c; } }; } catch (e) { return c => c; } })();
const flag = c => /^[A-Z]{2}$/.test(c || '') ? String.fromCodePoint(...[...c].map(x => 0x1F1E6 + x.charCodeAt(0) - 65)) : '';
/* red de colaboraciones: miembros (con publicaciones) e instituciones coautoras */
function buildNet(maxInst = 36) {
  const mem = MALL.map(m => ({ m, id: slug(m.nombre), pubs: 0, kind: m.antiguo ? 'old' : 'mem' })), pair = {}, mi = {}, iw = {};
  B.forEach(b => { const who = mem.filter(x => signs(x.m, b.au)); who.forEach(x => x.pubs++);
    for (let a = 0; a < who.length; a++) for (let c = a + 1; c < who.length; c++) { const k = who[a].id + '|' + who[c].id; pair[k] = (pair[k] || 0) + 1; }
    const o = ciOf(b); if (!o) return; for (const j of o[1]) { iw[j] = (iw[j] || 0) + 1; for (const x of who) { const k = x.id + '|' + j; mi[k] = (mi[k] || 0) + 1; } } });
  const nodes = mem.filter(x => x.pubs > 0);
  const top = Object.keys(iw).map(Number).sort((a, b) => iw[b] - iw[a]).slice(0, maxInst).filter(j => iw[j] >= 3);
  const inst = top.map(j => { const [n, c, t] = CI.instituciones[j] || ['?', '', '']; return { j, id: 'i' + j, name: n, c, t, pubs: iw[j], kind: c === 'ES' ? 'es' : 'intl' }; });
  const byId = Object.fromEntries([...nodes, ...inst].map(n => [n.id, n]));
  const links = [];
  for (const [k, w] of Object.entries(pair)) { const [a, b] = k.split('|'); if (byId[a] && byId[b]) links.push({ source: a, target: b, w, kind: 'mm' }); }
  for (const [k, w] of Object.entries(mi)) { const [a, j] = k.split('|'); if (byId[a] && byId['i' + j]) links.push({ source: a, target: 'i' + j, w, kind: 'mi' }); }
  const allInst = Object.keys(iw).map(Number), countries = {};
  allInst.forEach(j => { const c = (CI.instituciones[j] || [])[1]; if (c && c !== 'ES') countries[c] = (countries[c] || 0) + 1; else if (c === 'ES') countries.ES = (countries.ES || 0) + 1; });
  return { nodes, inst, links, pairs: Object.keys(pair).length, nInst: allInst.length, countries, iw };
}
const PAIS_EN = { 'España': 'Spain', 'Portugal': 'Portugal', 'Marruecos': 'Morocco', 'Brasil': 'Brazil', 'Paraguay': 'Paraguay', 'Costa Rica': 'Costa Rica', 'México': 'Mexico', 'Ecuador': 'Ecuador', 'Chile': 'Chile', 'Argentina': 'Argentina', 'Colombia': 'Colombia', 'Sudáfrica': 'South Africa', 'Italia': 'Italy', 'Francia': 'France', 'Reino Unido': 'United Kingdom', 'Noruega': 'Norway' };
const PUESTO_EN = { 'Catedrático de Universidad': 'Full Professor', 'Profesor Titular de Universidad': 'Associate Professor', 'Profesora Titular de Universidad': 'Associate Professor', 'Profesor Titular': 'Associate Professor', 'Profesor Contratado Doctor': 'Associate Professor (tenured)', 'Profesora Contratada Doctora': 'Associate Professor (tenured)', 'Profesora Ayudante Doctora': 'Assistant Professor', 'Profesor Ayudante Doctor': 'Assistant Professor', 'Profesora Permanente Laboral': 'Associate Professor', 'Investigador Ramón y Cajal': 'Ramón y Cajal Researcher', 'Investigadora Ramón y Cajal': 'Ramón y Cajal Researcher', 'Investigador contratado de proyecto': 'Project researcher', 'Investigadora contratada de proyecto': 'Project researcher', 'Investigadora predoctoral contratada de proyecto': 'PhD researcher (project contract)', 'Investigadora predoctoral': 'PhD researcher', 'Investigador predoctoral': 'PhD researcher', 'Coordinador del grupo': 'Group coordinator', 'Director del CIBC-UAM': 'Director of CIBC-UAM', 'Investigador de Atracción de Talento (Comunidad de Madrid)': 'Talent Attraction Researcher (Madrid Region)' };
const tr = (o, f) => (EN && o && o[f + '_en']) ? o[f + '_en'] : (o ? o[f] : '');
const puesto = m => { if (EN && m.puesto_en) return m.puesto_en; const p = m.puesto || ''; return EN ? p.split(' · ').map(x => PUESTO_EN[x] || x).join(' · ') : p; };
const pais = p => EN ? (PAIS_EN[p] || p) : p;
const asset = p => !p ? '' : /^(https?:|data:|\/)/.test(p) ? p : ROOT + p;
const lineById = id => L.find(l => l.id === id);
const lName = id => tr(lineById(id), 'nombre') || '', lShort = id => tr(lineById(id), 'corto') || '';
const mLines = m => (m.lineas || '').split(/\s+/).filter(Boolean);
const active = p => p.fin >= NOWY;
const email = m => m.email ? (m.email.includes('@') ? m.email : m.email + '@uam.es') : '';
const initials = n => n.split(' ').filter(w => w.length > 2 && w[0] === w[0].toUpperCase()).slice(0, 2).map(w => w[0]).join('');
const firmas = m => (m.firma || '').split('|').map(s => s.trim()).filter(Boolean);
const signs = (m, txt) => firmas(m).some(f => String(txt || '').includes(f));
const pid = p => slug(p.t);
const hash = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return h; };
const avatar = m => m.foto ? `<img src="${esc(asset(m.foto))}" alt="" loading="lazy" onerror="this.replaceWith('${esc(initials(m.nombre))}')">` : esc(initials(m.nombre));

/* ---------- navegación y pie ---------- */
const FILES = ['lineas', 'equipo', 'proyectos', 'mapa', 'publicaciones', 'tesis', 'novedades', 'contacto'];
const NAV = FILES.map((f, i) => [f, S.nav[i]]);
NAV.splice(5, 0, ['red', S.navRed]); if ((W.GALERIA || []).length) NAV.splice(8, 0, ['galeria', S.navGal]);
const cur = { miembro: 'equipo', proyecto: 'proyectos' }[PAGE] || PAGE;
const here = location.pathname.split('/').pop() || 'index.html';
const otherHref = (EN ? '../' : 'en/') + here + location.search + location.hash;
document.body.insertAdjacentHTML('afterbegin', `<a class="skip" href="#main">${EN ? 'Skip to content' : 'Saltar al contenido'}</a><header class="nav over" id="nav"><div class="wrap">
  <a class="brand" href="index.html"><span class="lg"><img src="${ROOT}img/logo.png" alt=""></span><span><b>TEG · UAM</b><small>${S.brandSub}</small></span></a>
  <button id="mbtn" aria-expanded="false" aria-controls="menu">${S.menu}</button>
  <ul id="menu">${NAV.map(([f, t]) => `<li><a href="${f}.html"${f === cur ? ' aria-current="page"' : ''}>${t}</a></li>`).join('')}<li><a class="lang" href="${otherHref}" hreflang="${EN ? 'es' : 'en'}" title="${S.otherT}">${S.other}</a></li></ul>
</div><i class="prog" id="prog"></i></header>`);
$('main')?.setAttribute('id', 'main');
document.body.insertAdjacentHTML('beforeend', `<footer><div class="cols">
  <div><div class="flogo"><img src="${ROOT}img/logo.png" alt="TEG · Terrestrial Ecology Group, Universidad Autónoma de Madrid"></div><p>${S.footTxt}</p></div>
  <div><h2 class="fh">${S.explore}</h2><p>${NAV.slice(0, 5).map(([f, t]) => `<a href="${f}.html">${t}</a>`).join('<br>')}</p></div>
  <div><p class="fh" aria-hidden="true">&nbsp;</p><p>${NAV.slice(5).map(([f, t]) => `<a href="${f}.html">${t}</a>`).join('<br>')}<br><a href="${otherHref}">${S.otherT}</a></p></div>
  <div><h2 class="fh">${S.where}</h2><p>${EN ? 'Biology Building, C/ Darwin 2<br>Cantoblanco Campus, 28049 Madrid, Spain' : 'Edificio de Biología, C/ Darwin 2<br>Campus de Cantoblanco, 28049 Madrid'}</p><p class="mono coords">40.545° N · 3.692° W</p></div>
</div><div class="base2"><span>© ${NOWY} TEG-UAM · Universidad Autónoma de Madrid</span><span>${S.staticSite}${CFG.goatcounter && CFG.estadisticas_publicas ? ` · <a href="https://${esc(CFG.goatcounter)}.goatcounter.com">${S.stats}</a>` : ''}</span></div></footer><div class="toast" id="toast" role="status"></div>`);
if (CFG.goatcounter) { const g = document.createElement('script'); g.async = true; g.src = 'https://gc.zgo.at/count.js'; g.dataset.goatcounter = `https://${CFG.goatcounter}.goatcounter.com/count`; document.head.appendChild(g); }
const nav = $('#nav'), prog = $('#prog');
const onScroll = () => { const y = scrollY, h = document.documentElement.scrollHeight - innerHeight; prog.style.width = (h > 0 ? y / h * 100 : 0) + '%'; nav.classList.toggle('over', y < 30); };
addEventListener('scroll', onScroll, { passive: true }); onScroll();
$('#mbtn').addEventListener('click', () => { const o = $('#menu').classList.toggle('open'); $('#mbtn').setAttribute('aria-expanded', o); if (o) nav.classList.remove('over'); else onScroll(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#menu').classList.contains('open')) { $('#mbtn').click(); $('#mbtn').focus(); } });
const rvo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvo.unobserve(e.target); } }), { threshold: .12 });
const reveal = () => $$('.rv:not(.in)').forEach(el => rvo.observe(el));
const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 2200); };
const countUp = (el, n, d = 1300) => { if (RM) { el.textContent = n; return; } const t0 = performance.now(); const f = t => { const k = Math.min(1, (t - t0) / d); el.textContent = Math.round(n * (1 - (1 - k) ** 3)); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
const kpis = (sel, arr) => { const el = $(sel); if (!el) return; el.innerHTML = arr.map(s => `<div><b data-n="${s[0]}">${RM ? s[0] : 0}</b><span>${esc(s[1])}</span></div>`).join(''); $$(sel + ' b').forEach((b, i) => setTimeout(() => countUp(b, +b.dataset.n), 200 + i * 120)); };
const pageArt = (kind, seed) => { const a = $('.phead .art'); if (a) a.innerHTML = plate(kind, seed); };
const plateOrImg = (l, seed) => l.img ? `<img src="${esc(asset(l.img))}" alt="" loading="lazy">` : plate(l.id, seed);

/* ---------- ordenación del equipo ---------- */
const ang = i => -Math.PI / 2 + Math.PI / L.length + i * 2 * Math.PI / L.length;
const PTS = M.map((m, i) => { const ls = mLines(m); let x = 0, y = 0; ls.forEach(id => { const k = L.findIndex(l => l.id === id); if (k >= 0) { x += Math.cos(ang(k)); y += Math.sin(ang(k)); } }); if (ls.length) { x /= ls.length; y /= ls.length; } const h = hash(m.nombre); x = x * .6 + ((h & 255) / 255 - .5) * .32; y = y * .6 + (((h >> 8) & 255) / 255 - .5) * .32; return { m, x, y, ls, i, id: slug(m.nombre) }; });

/* ---------- publicaciones ---------- */
const pubHref = b => b.doi ? 'https://doi.org/' + b.doi : (b.url || 'https://scholar.google.com/scholar?q=' + encodeURIComponent(b.t));
const pubHTML = (b, i) => `<div class="pub"><span class="y mono">${b.a}</span><div><a class="t" href="${esc(pubHref(b))}">${esc(b.t)}</a><div class="a">${b.au ? esc(b.au) + '. ' : ''}<em>${esc(b.r)}</em>${b.v ? ' ' + esc(b.v) : ''}${b.q ? `<span class="badge q">${esc(b.q)}</span>` : ''}${b.oa ? '<span class="badge oa">Open Access</span>' : ''}${b.tipo !== 'art' ? `<span class="badge k ${esc(b.tipo)}">${S.tipoPub[b.tipo] || ''}</span>` : ''}${b.auto ? `<span class="badge k">${S.autoAdded}</span>` : ''}${cites(b) ? `<span class="badge cit" title="${S.citT}">${S.nCit(cites(b))}</span>` : ''}<button class="cite" data-c="${i}">${S.copy}</button></div></div></div>`;
const citeText = b => `${b.au} (${b.a}). ${b.t}. ${b.r}${b.v ? ', ' + b.v : ''}.${b.doi ? ' https://doi.org/' + b.doi : (b.url ? ' ' + b.url : '')}`;
document.addEventListener('click', e => { const c = e.target.closest('.cite'); if (!c) return; navigator.clipboard?.writeText(citeText(B[+c.dataset.c])).then(() => toast(S.copied), () => toast(S.copyFail)); });
const yearSeries = () => {
  const ys = new Set(B.filter(b => b.tipo === 'art').map(b => b.a)); A.forEach(a => ys.add(a.a));
  const min = Math.min(...ys), max = Math.max(...ys), out = [];
  for (let y = min; y <= max; y++) { const arts = B.filter(b => b.a === y && b.tipo === 'art'); const an = A.find(a => a.a === y); if (arts.length) out.push({ y, n: arts.length, q1: arts.filter(b => b.q === 'Q1').length, qk: arts.some(b => b.q) }); else out.push({ y, n: an ? an.articulos : null, q1: 0, qk: false }); }
  return out;
};

/* ---------- Gantt ---------- */
function gantt(el, list) {
  const Y0 = 2013, Y1 = 2032, pct = y => (y - Y0) / (Y1 - Y0) * 100;
  const yrs = [2014, 2017, 2020, 2023, 2026, 2029, 2032].map(y => `<span style="left:${pct(y)}%">${y}</span>`).join('');
  el.innerHTML = `<div class="g-axis mono"><span class="lab">${S.nProj(list.length)}</span><div class="g-years">${yrs}</div></div>` + (list.length ? list.map((p, i) => `<div class="g-row"><button aria-expanded="false"><span class="g-t">${esc(tr(p, 't'))}<small>${p.ini === p.fin ? p.ini : p.ini + '–' + p.fin} · ${esc(p.fin_)}</small></span><span class="track"><i class="bar ${esc(p.tipo)}" style="left:${pct(p.ini)}%;width:${Math.max(1.2, pct(p.fin + 1) - pct(p.ini))}%;transition-delay:${Math.min(i, 20) * 40}ms"></i><i class="today" style="left:${pct(NOW)}%"></i></span></button><div class="g-more">${p.ref ? `<b>${S.ref}:</b> ${esc(p.ref)} · ` : ''}${p.ip ? `<b>${S.ip}:</b> ${esc(p.ip)} · ` : ''}${p.eur ? `<b>${S.budget}:</b> ${esc(p.eur)} · ` : ''}<b>${S.line}:</b> ${esc(lName(p.linea))}<br><a href="proyecto.html?id=${pid(p)}">${S.fullCard}</a></div></div>`).join('') : `<p class="empty">${S.noProj}</p>`);
  el.classList.remove('in'); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
}
document.addEventListener('click', e => { const b = e.target.closest('.g-row>button'); if (!b) return; const r = b.parentElement; r.classList.toggle('open'); b.setAttribute('aria-expanded', r.classList.contains('open')); });

/* ---------- espectrograma REAL de la portada (lo genera herramientas/espectrograma.py) ---------- */
function realSpectrogram() {
  // Espectrograma de una grabación real (sin sonido) que avanza como en un grabador en directo.
  // Las detecciones se dibujan al terminar cada canto, como en el aviso de un reconocedor.
  const E = W.ESPECTROGRAMA, box = $('.spec');
  if (!E || !box) { if (box) { box.innerHTML = plate('vertebrados', 7); box.classList.add('noreal'); } $('.det-legend')?.remove(); $('.axis')?.remove(); return; }
  const k = E.fmax / 1000; $('.axis').innerHTML = [1, .75, .5, .25, 0].map((f, i) => `<span>${(k * f).toLocaleString(EN ? 'en' : 'es', { maximumFractionDigits: 1 })}${i ? '' : ' ' + S.kHz}</span>`).join('');
  const lic = E.licencia ? ` (<a href="${esc(E.licencia_url || '#')}">${esc(E.licencia)}</a>)` : '';
  const src = E.fuente ? `, <a href="${esc(E.url || '#')}">${esc(E.fuente)}</a>` : '';
  $('.det-legend span').innerHTML = [S.spReal, `<em>${esc(E.especie)}</em>`, esc(E.lugar), esc(E.fecha), E.autor && `${S.spRec}: ${esc(E.autor)}${src}${lic}`].filter(Boolean).join(' · ');
  if (!(E.cajas || []).length) $('.det-legend i')?.remove();
  box.innerHTML = '<canvas></canvas>';
  const cv = $('canvas', box), cx = cv.getContext('2d'), img = new Image();
  img.onload = () => {
    const IW = img.naturalWidth, IH = img.naturalHeight, PXS = IW / E.duracion;
    let head = ((E.cajas || [])[0]?.t1 + 1.2 || 4) * PXS, last = performance.now(), vis = true, Wd = 0, H = 0, sc = 1, sy = 1;
    const size = () => { const dpr = Math.min(2, devicePixelRatio || 1); Wd = cv.clientWidth; H = cv.clientHeight; cv.width = Wd * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); sy = H / IH; sc = Wd / (PXS * Math.max(4, Math.min(12, Wd / 105))); };
    const draw = () => {
      const span = Wd / sc; cx.clearRect(0, 0, Wd, H);
      // ventana [head-span, head] del bucle, partida en dos trozos si cruza el final
      let s0 = ((head - span) % IW + IW) % IW, rest = span, dx = 0;
      while (rest > 0) { const w = Math.min(rest, IW - s0); cx.drawImage(img, s0, 0, w, IH, dx * sc - .5, 0, w * sc + 1, H); dx += w; rest -= w; s0 = 0; }
      cx.font = '500 12px "IBM Plex Mono",monospace'; cx.lineWidth = 1.25;
      const cyc = Math.floor(head / IW);
      for (let n = cyc - 1; n <= cyc; n++) for (const b of E.cajas || []) {
        const x0 = b.t0 * PXS + n * IW, x1 = b.t1 * PXS + n * IW, age = head - x1;
        if (age < 0 || x0 < head - span) continue;
        const X0 = Wd - (head - x0) * sc, X1 = Wd - (head - x1) * sc, y0 = (1 - b.f1 / E.fmax) * H, y1 = (1 - b.f0 / E.fmax) * H;
        const a = Math.min(1, age / (PXS * .35)) * (Wd < 700 ? 1 : Math.max(0, Math.min(1, (X0 / Wd - .42) / .2)));
        if (a <= 0) continue;
        cx.globalAlpha = a; cx.strokeStyle = '#E4D58C'; cx.strokeRect(X0, y0, X1 - X0, y1 - y0);
        const lab = b.etiqueta, tw = cx.measureText(lab).width;
        cx.fillStyle = 'rgba(18,23,14,.82)'; cx.fillRect(X0, y0 - 19, tw + 10, 17); cx.fillStyle = '#E4D58C'; cx.fillText(lab, X0 + 5, y0 - 6);
      }
      cx.globalAlpha = 1;
    };
    size(); draw(); addEventListener('resize', () => { size(); draw(); });
    new IntersectionObserver(es => { vis = es[0].isIntersecting; }).observe($('.hero'));
    const loop = t => { const dt = Math.min(64, t - last); last = t; if (vis && !document.hidden) { head += dt / 1000 * PXS; draw(); } requestAnimationFrame(loop); };
    if (!RM) requestAnimationFrame(loop);
  };
  img.src = asset(E.img);
}

/* =====================================================================
   PÁGINAS
   ===================================================================== */
const PAGE_INIT = {
inicio() {
  realSpectrogram();
  const artsY = B.filter(b => b.a === NOWY && b.tipo === 'art').length, nC = new Set(G.map(g => g.pais)).size;
  kpis('#stats', [[M.length, S.researchers], [P.filter(active).length, S.activeProj], [artsY, S.artsY(NOWY)], [nC, S.countries]]);
  const vb = 'viewBox="0 0 400 190" preserveAspectRatio="xMidYMid meet"';
  const vLines = `<svg ${vb}>${L.map((l, i) => `<svg x="${i * 80}" y="0" width="80" height="190" viewBox="0 0 160 500" preserveAspectRatio="xMidYMid slice">${PLATES[l.id](rng(i + 3))}</svg>`).join('')}</svg>`;
  const vTeam = `<svg ${vb}>${L.map((l, i) => `<line x1="200" y1="95" x2="${200 + Math.cos(ang(i)) * 80}" y2="${95 + Math.sin(ang(i)) * 80}" stroke="var(--olive)"/>`).join('')}${PTS.map(p => `<circle cx="${200 + p.x * 80}" cy="${95 + p.y * 80}" r="${p.m.coord ? 5 : 3.5}" fill="${p.m.coord ? 'var(--olive)' : 'var(--leaf)'}"/>`).join('')}</svg>`;
  const act = P.filter(active).sort((a, b) => a.ini - b.ini).slice(0, 12), px = y => 20 + (y - 2016) / 16 * 360;
  const vProj = `<svg ${vb}><line x1="${px(NOW)}" x2="${px(NOW)}" y1="10" y2="180" stroke="var(--red)" stroke-dasharray="3 3"/>${act.map((p, i) => `<rect x="${px(p.ini)}" y="${16 + i * 13.5}" width="${px(p.fin + 1) - px(p.ini)}" height="8" rx="2" fill="${{ life: 'var(--olive)', internacional: 'var(--ochre)' }[p.tipo] || 'var(--leaf)'}"/>`).join('')}</svg>`;
  const ex = lon => 200 + lon / 180 * 190, ey = lat => 95 - lat / 90 * 90;
  let grat = ''; for (let la = -60; la <= 60; la += 30) grat += `<line x1="10" x2="390" y1="${ey(la)}" y2="${ey(la)}" stroke="var(--rule)"/>`; for (let lo = -150; lo <= 150; lo += 30) grat += `<line y1="5" y2="185" x1="${ex(lo)}" x2="${ex(lo)}" stroke="var(--rule)"/>`;
  const vMap = `<svg ${vb}>${grat}${G.map(g => `<circle cx="${ex(g.lon)}" cy="${ey(g.lat)}" r="${g.tipo === 'sede' ? 5 : 3.5}" fill="${g.tipo === 'sede' ? 'var(--red)' : g.tipo === 'colab' ? 'var(--card)' : 'var(--olive)'}" stroke="var(--olive)" stroke-width="1.2"/>`).join('')}</svg>`;
  const ser = yearSeries(), mx = Math.max(1, ...ser.map(s => s.n || 0)), bw = 360 / ser.length;
  const vPub = `<svg ${vb}>${ser.map((s, i) => s.n == null ? `<rect x="${20 + i * bw + 3}" y="120" width="${bw - 6}" height="50" fill="none" stroke="var(--mute)" stroke-dasharray="3 3"/>` : `<rect x="${20 + i * bw + 3}" y="${170 - s.n / mx * 150}" width="${bw - 6}" height="${s.n / mx * 150}" fill="var(--leaf)"/><text x="${20 + i * bw + bw / 2}" y="185" text-anchor="middle" font-size="10" fill="var(--mute)">${String(s.y).slice(2)}</text>`).join('')}</svg>`;
  const tcount = {}, ty = T.map(t => +(String(t.fecha).match(/20\d\d/) || [0])[0]).filter(Boolean);
  const vTes = `<svg ${vb}><line x1="20" x2="380" y1="160" y2="160" stroke="var(--mute)"/>${ty.map(y => { tcount[y] = (tcount[y] || 0) + 1; return `<circle cx="${30 + (y - 2018) / 12 * 340 + (tcount[y] % 2 ? -5 : 5)}" cy="${150 - Math.floor((tcount[y] - 1) / 2) * 12}" r="4.5" fill="var(--leaf)"/>`; }).join('')}</svg>`;
  const D = S.doors, minY = Math.min(...B.map(b => b.a));
  const doors = [['lineas', D.lineas[0], D.lineas[1](L.length), vLines], ['equipo', D.equipo[0], D.equipo[1](M.length), vTeam], ['proyectos', D.proyectos[0], D.proyectos[1](P.filter(active).length), vProj], ['mapa', D.mapa[0], D.mapa[1](nC), vMap], ['publicaciones', D.publicaciones[0], D.publicaciones[1](B.length, minY), vPub], ['tesis', D.tesis[0], D.tesis[1](T.filter(t => t.estado === 'leida').length, T.filter(t => t.estado === 'curso').length), vTes]];
  $('#doors').innerHTML = doors.map(d => `<a class="door rv" href="${d[0]}.html"><div class="viz">${d[3]}</div><div class="in"><h3>${d[1]}</h3><p>${d[2]}</p><span class="go">${S.enter}</span></div></a>`).join('');
  const f = P.filter(p => p.tipo === 'life' && active(p)).sort((a, b) => b.ini - a.ini)[0];
  if (f) $('#feat').innerHTML = `<div class="plate">${plate(f.linea, 11)}</div><div><span class="mono mute">${S.featured} · ${f.ini}–${f.fin}</span><h2 style="margin:10px 0 14px">${esc(tr(f, 't'))}</h2><p class="mute">${esc(tr(f, 'resumen') || f.fin_)}</p><div class="btns"><a class="btn" href="proyecto.html?id=${pid(f)}">${S.seeProj}</a><a class="btn ghost" href="proyectos.html">${S.allProj}</a></div></div>`;
  $('#lastnews').innerHTML = N.slice(0, 3).map((n, i) => newsCard(n, i)).join('');
  funders();
  if (OV.length) $('#feat').closest('section').insertAdjacentHTML('afterend', `<section class="band tight"><div class="wrap offbar"><div><b>${S.ofHome(OV.length)}</b><span>${S.ofHomeTxt} ${[...new Set(OV.map(otipo))].join(' · ')}</span></div><a class="btn" href="contacto.html#ofertas">${S.ofSee} →</a></div></section>`);
  const nfig = $('#hnet'); if (nfig && window.d3) { const net = buildNet(24); if (net.nInst) { drawNet(nfig, net, { small: true }); $('#hnetk').innerHTML = [[net.nInst, S.netInst], [Object.keys(net.countries).length, S.netCountries], [net.pairs, S.netPairs]].map(s => `<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join(''); } else nfig.closest('section')?.remove(); }
},

red() {
  pageArt('biogeografia', 21);
  const net = buildNet(), d = ciDate();
  kpis('#kp', [[net.nodes.filter(n => n.kind === 'mem').length, S.netMembers], [net.pairs, S.netPairs], [net.nInst, S.netInst], [Object.keys(net.countries).length, S.netCountries]]);
  const fig = $('#net'); let inst = true, line = '';
  $('#rchips').innerHTML = [['i', S.withInst], ['g', S.onlyGroup]].map(c => `<button class="chip" data-v="${c[0]}" aria-pressed="${c[0] === 'i'}">${c[1]}</button>`).join('') + L.map(l => `<button class="chip" data-l="${l.id}" aria-pressed="false">${esc(tr(l, 'corto'))}</button>`).join('');
  const redraw = () => drawNet(fig, net, { inst, line });
  $('#rchips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return;
    if (b.dataset.v) { inst = b.dataset.v === 'i'; $$('#rchips [data-v]').forEach(x => x.setAttribute('aria-pressed', x === b)); }
    else { line = line === b.dataset.l ? '' : b.dataset.l; $$('#rchips [data-l]').forEach(x => x.setAttribute('aria-pressed', x.dataset.l === line)); }
    redraw(); });
  if (!net.nInst) { $('#rnote').textContent = S.netEmpty; inst = false; }
  else $('#rnote').textContent = S.netNote(d);
  redraw(); let t; new ResizeObserver(() => { clearTimeout(t); t = setTimeout(redraw, 200); }).observe(fig);
  const top = Object.keys(net.iw).map(Number).sort((a, b) => net.iw[b] - net.iw[a]).slice(0, 15);
  $('#ilist').innerHTML = top.map(j => { const [n, c] = CI.instituciones[j]; return `<li><span>${esc(n)}</span><small>${flag(c)} ${esc(ctry(c))} · ${S.works(net.iw[j])}</small></li>`; }).join('');
  const cs = Object.entries(net.countries).sort((a, b) => b[1] - a[1]), mx = Math.max(1, ...cs.map(c => c[1]));
  $('#countries').innerHTML = cs.map(([c, n]) => `<div><span>${flag(c)} ${esc(ctry(c))}</span><i style="width:${Math.max(2, n / mx * 100)}%"></i><b>${n}</b></div>`).join('');
},

galeria() {
  pageArt('pastizales', 9);
  const g = $('#gal'), lines = [...new Set(GAL.map(x => x.linea).filter(Boolean))];
  if (!GAL.length) { g.innerHTML = `<div class="empty"><h2 class="h3">${S.galEmpty}</h2><p class="mute">${S.galEmptyTxt}</p></div>`; return; }
  kpis('#kp', [[GAL.length, EN ? 'photos' : 'fotos'], [new Set(GAL.map(x => x.autor)).size, EN ? 'photographers' : 'autores']]);
  let f = '';
  if (lines.length > 1) { $('#gchips').innerHTML = [['', S.all]].concat(lines.map(id => [id, lShort(id)])).map(c => `<button class="chip" data-l="${c[0]}" aria-pressed="${c[0] === f}">${esc(c[1])}</button>`).join('');
    $('#gchips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; f = b.dataset.l; $$('#gchips .chip').forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); }); }
  let list = [];
  const cap = x => [tr(x, 'pie'), x.lugar, x.fecha].filter(Boolean).map(esc).join(' · ');
  const src = x => x.fuente ? ` · <a href="${esc(x.fuente)}">${EN ? 'source' : 'fuente'} ↗</a>` : '';
  const draw = () => { list = GAL.filter(x => !f || x.linea === f);
    g.innerHTML = list.map((x, i) => `<figure><button class="gimg" data-i="${i}" aria-label="${esc(tr(x, 'pie') || S.photoBy)}"><img src="${esc(asset(x.img))}" alt="${esc(tr(x, 'pie') || '')}" loading="lazy"></button><figcaption>${cap(x)}<small>© ${esc(x.autor || 'TEG-UAM')}${src(x)}</small></figcaption></figure>`).join(''); };
  draw();
  const dlg = $('#lightbox'); let cur = 0, opener = null;
  const show = i => { cur = (i + list.length) % list.length; const x = list[cur]; $('#lbimg').src = asset(x.img); $('#lbimg').alt = tr(x, 'pie') || ''; $('#lbcap').innerHTML = `${cap(x)} <small>© ${esc(x.autor || 'TEG-UAM')}${src(x)} · ${cur + 1}/${list.length}</small>`; };
  g.addEventListener('click', e => { const b = e.target.closest('.gimg'); if (!b) return; opener = b; show(+b.dataset.i); dlg.showModal(); $('#lbclose').focus(); });
  $('#lbprev').onclick = () => show(cur - 1); $('#lbnext').onclick = () => show(cur + 1); $('#lbclose').onclick = () => dlg.close();
  dlg.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => opener?.focus());
},

lineas() {
  pageArt('agraria', 4);
  kpis('#kp', [[L.length, S.lines], [P.filter(active).length, S.activeProj], [M.length, S.inves]]);
  $('#lnav').innerHTML = L.map(l => `<a class="chip" style="display:inline-flex;align-items:center;text-decoration:none" href="#${l.id}">${esc(tr(l, 'corto'))}</a>`).join('');
  $('#lines').innerHTML = L.map((l, i) => {
    const ppl = PTS.filter(p => p.ls.includes(l.id)), pr = P.filter(p => p.linea === l.id && active(p));
    const pubs = B.filter(b => b.tipo === 'art' && ppl.some(p => signs(p.m, b.au))).sort((a, b) => b.a - a.a);
    const where = G.filter(g => g.linea === l.id);
    return `<section class="line rv" id="${l.id}"><div class="plate">${plateOrImg(l, i + 1)}</div><div>
      <span class="mono mute">${S.lineOf(i + 1, L.length)}</span><h2 style="margin-top:8px">${esc(tr(l, 'nombre'))}</h2><p class="lede">${esc(tr(l, 'texto'))}</p>
      <div class="tags">${(tr(l, 'claves') || []).map(k => `<span class="tag">${esc(k)}</span>`).join('')}</div>
      <h3>${S.who} (${ppl.length})</h3><div class="ppl">${ppl.map(p => `<a class="tag" href="miembro.html?id=${p.id}">${esc(p.m.nombre.split(' ').slice(0, 2).join(' '))}</a>`).join('')}</div>
      ${pr.length ? `<h3>${S.activeP} (${pr.length})</h3><ul class="plist">${pr.map(p => `<li><a href="proyecto.html?id=${pid(p)}">${esc(tr(p, 't'))}</a><small>${p.ini}–${p.fin} · ${esc(p.fin_)}</small></li>`).join('')}</ul>` : ''}
      ${pubs.length ? `<h3>${S.recentPubs(pubs.length)}</h3><ul class="plist">${pubs.slice(0, 4).map(b => `<li><a href="${esc(pubHref(b))}">${esc(b.t)}</a><small>${b.a} · ${esc(b.r)}</small></li>`).join('')}</ul>` : ''}
      ${where.length ? `<p class="note" style="margin-top:16px">${S.workIn} ${esc([...new Set(where.map(g => pais(g.pais)))].join(', '))} · <a href="mapa.html?linea=${l.id}">${S.onMap}</a></p>` : ''}
    </div></section>`; }).join('');
},

equipo() {
  pageArt('biogeografia', 6);
  kpis('#kp', [[M.length, S.people], [M.filter(m => m.orcid).length, S.withOrcid], [T.filter(t => t.estado === 'curso').length, S.thInProg]]);
  const svg = $('#ordsvg'), tip = $('#tip'); let oLine = new URLSearchParams(location.search).get('linea') || '', oQ = '', drawn = false;
  function draw(anim) {
    const Wd = svg.clientWidth, H = svg.clientHeight; if (!Wd) return; const small = Wd < 520, cx = Wd / 2, cy = H / 2 + 6, R = Math.min(Wd, H) * (small ? .33 : .4);
    let s = `<g stroke="var(--rule)"><line x1="${cx - R * 1.15}" y1="${cy}" x2="${cx + R * 1.15}" y2="${cy}"/><line x1="${cx}" y1="${cy - R * 1.15}" x2="${cx}" y2="${cy + R * 1.15}"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke-dasharray="2 5"/></g>`;
    if (!small) s += `<text x="${cx + R * 1.15}" y="${cy - 8}" text-anchor="end" class="mono" fill="var(--mute)" font-size="11">${S.axis1}</text><text x="${cx - 8}" y="${cy + R * 1.15}" text-anchor="end" class="mono" fill="var(--mute)" font-size="11">${S.axis2}</text>`;
    L.forEach((l, i) => { const x = cx + Math.cos(ang(i)) * R, y = cy + Math.sin(ang(i)) * R, on = !oLine || oLine === l.id, lx = cx + Math.cos(ang(i)) * (R + 14), ly = cy + Math.sin(ang(i)) * (R + 14), anc = Math.cos(ang(i)) > .3 ? 'start' : Math.cos(ang(i)) < -.3 ? 'end' : 'middle';
      s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${on ? 'var(--acc)' : 'var(--rule)'}" stroke-width="${oLine === l.id ? 2.2 : 1.3}" marker-end="url(#ar)"/><text x="${lx}" y="${ly + (Math.sin(ang(i)) > .3 ? 12 : Math.sin(ang(i)) < -.3 ? -4 : 4)}" text-anchor="${anc}" font-size="${small ? 11 : 13}" font-weight="650" fill="${on ? 'var(--text)' : 'var(--mute)'}" style="cursor:pointer" data-line="${l.id}">${esc(tr(l, 'corto'))}</text>`; });
    PTS.forEach(p => { const x = cx + p.x * R, y = cy + p.y * R, hit = (!oLine || p.ls.includes(oLine)) && (!oQ || norm(p.m.nombre).includes(oQ)), r = p.m.coord ? 7.5 : 5.5;
      s += `<circle class="pt" data-i="${p.i}" cx="${anim ? cx : x}" cy="${anim ? cy : y}" data-x="${x}" data-y="${y}" r="${r}" fill="${hit ? (p.m.coord ? 'var(--olive)' : 'var(--leaf)') : 'var(--rule)'}" stroke="${p.m.coord ? 'var(--leaf)' : 'var(--card)'}" stroke-width="${p.m.coord ? 3 : 1.5}" opacity="${hit ? 1 : .55}" style="cursor:pointer;transition:cx .9s cubic-bezier(.2,.7,.2,1) ${p.i * 12}ms,cy .9s cubic-bezier(.2,.7,.2,1) ${p.i * 12}ms,fill .3s"/>`; });
    svg.innerHTML = `<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="var(--acc)"/></marker></defs>` + s;
    if (anim) requestAnimationFrame(() => requestAnimationFrame(() => svg.querySelectorAll('.pt').forEach(c => { c.setAttribute('cx', c.dataset.x); c.setAttribute('cy', c.dataset.y); })));
  }
  const ro = new ResizeObserver(() => draw(false)); ro.observe(svg);
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting && !drawn) { drawn = true; draw(!RM); o.disconnect(); } }, { threshold: .3 }).observe(svg);
  svg.addEventListener('pointermove', e => { const c = e.target.closest('.pt'); if (!c) { tip.style.opacity = 0; return; } const p = PTS[+c.dataset.i], r = svg.getBoundingClientRect(); tip.style.left = (e.clientX - r.left) + 'px'; tip.style.top = (e.clientY - r.top) + 'px'; tip.innerHTML = `${esc(p.m.nombre)}<small>${esc(puesto(p.m) || p.ls.map(lShort).join(' · ') || 'TEG-UAM')} · ${S.seeProfile}</small>`; tip.style.opacity = 1; });
  svg.addEventListener('pointerleave', () => tip.style.opacity = 0);
  svg.addEventListener('click', e => { const t = e.target.closest('[data-line]'); if (t) { setLine(oLine === t.dataset.line ? '' : t.dataset.line); return; } const c = e.target.closest('.pt'); if (c) location.href = 'miembro.html?id=' + PTS[+c.dataset.i].id; });
  $('#ochips').innerHTML = [['', S.all]].concat(L.map(l => [l.id, tr(l, 'corto')])).map(c => `<button class="chip" data-v="${c[0]}" aria-pressed="${c[0] === oLine}">${esc(c[1])}</button>`).join('');
  function setLine(v) { oLine = v; $$('#ochips .chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.v === v)); draw(false); people(); }
  $('#ochips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) setLine(b.dataset.v); });
  $('#oq').addEventListener('input', e => { oQ = norm(e.target.value); draw(false); people(); });
  const card = (p, cls = '') => `<a class="person${p.m.coord ? ' c' : ''}${cls}" href="miembro.html?id=${p.id}"><span class="av">${avatar(p.m)}</span><div><b>${esc(p.m.nombre)}</b><span>${esc((cls ? '' : puesto(p.m)) || p.ls.map(lShort).join(' · ') || 'TEG-UAM')}</span></div></a>`;
  function people() { const list = PTS.filter(p => (!oLine || p.ls.includes(oLine)) && (!oQ || norm(p.m.nombre).includes(oQ))).sort((a, b) => (b.m.coord ? 1 : 0) - (a.m.coord ? 1 : 0) || a.m.nombre.localeCompare(b.m.nombre, 'es'));
    $('#ocount').textContent = S.person(list.length);
    $('#people').innerHTML = list.map(p => card(p)).join('') || `<p class="empty">${S.nobody}</p>`; }
  people();
  if (MF.length) $('#former').innerHTML = `<h2>${S.former}</h2><p class="mute" style="margin:8px 0 0">${S.formerTxt}</p><div class="people">${MF.map(m => card({ m, id: slug(m.nombre), ls: mLines(m) }, ' old')).join('')}</div>`;
},

miembro() {
  const id = new URLSearchParams(location.search).get('id'), m = MALL.find(x => slug(x.nombre) === id);
  if (!m) { $('#mname').textContent = S.notFound; $('#mbody').innerHTML = `<p><a class="btn" href="equipo.html">${S.backTeam}</a></p>`; return; }
  const ls = mLines(m); document.title = m.nombre + ' · TEG-UAM';
  pageArt(ls[0] || 'biogeografia', hash(m.nombre) & 31);
  $('#mname').textContent = m.nombre; $('#crumbname').textContent = m.nombre.split(' ').slice(0, 2).join(' ');
  $('#mrole').textContent = m.antiguo ? S.formerTag : (puesto(m) || S.member);
  $('#mav').innerHTML = m.foto ? `<img src="${esc(asset(m.foto))}" alt="${esc(m.nombre)}" onerror="this.replaceWith('${esc(initials(m.nombre))}')">` : esc(initials(m.nombre));
  const pubs = B.map((b, i) => ({ b, i })).filter(x => signs(m, x.b.au)).sort((a, b) => b.b.a - a.b.a);
  const pr = P.filter(x => signs(m, x.ip)).sort((a, b) => b.fin - a.fin);
  const own = T.filter(t => norm(m.nombre).includes(norm(t.autor)) || norm(t.autor).includes(norm(m.nombre)));
  const th = T.filter(t => signs(m, t.dir) && !own.includes(t)).sort((a, b) => (a.estado === b.estado ? 0 : a.estado === 'curso' ? -1 : 1));
  const oa = CI.autores[m.nombre];
  kpis('#kp', [[pubs.length, S.pubsWeb], [pr.length, S.projIP], [th.length, S.thDir]].concat(oa && oa.h != null ? [[oa.h, S.kpiH]] : []));
  const bio = tr(m, 'bio'); if (bio) $('#mrole').insertAdjacentHTML('afterend', `<p class="lede" style="font-size:16.5px;max-width:70ch;margin-top:14px;color:#C9CFBD">${esc(bio)}</p>`);
  const em = email(m);
  const links = [[m.orcid && 'https://orcid.org/' + m.orcid, 'ORCID'], [m.uam, S.uamProfile], [m.scholar, 'Google Scholar'], [m.rg, 'ResearchGate'], [m.web, S.personalWeb]].filter(x => x[0]);
  const thItem = t => `<li>${esc(t.autor)}: ${esc(t.t)}<small>${t.estado === 'leida' ? S.read : S.inProg + ' · ' + S.expected} ${esc(t.fecha || S.nd)} · ${esc(t.prog)} · ${S.dir}: ${esc(t.dir)}</small></li>`;
  $('#mbody').innerHTML = `<div class="cols2">
    <div><h2 class="h3">${S.linesH}</h2><div class="tags">${ls.map(id => `<a class="tag" href="lineas.html#${id}">${esc(lName(id))}</a>`).join('') || `<span class="mute">${S.pending}</span>`}</div>
      ${m.antiguo ? '' : `<h2 class="h3" style="margin-top:24px">${S.contact}</h2><dl class="ficha">${em ? `<dt>${S.email}</dt><dd><a href="mailto:${esc(em)}">${esc(em)}</a></dd>` : ''}${m.despacho ? `<dt>${S.office}</dt><dd>${esc(EN ? m.despacho.replace('Edificio de Biología', 'Biology Building') : m.despacho)}</dd>` : ''}${m.tel ? `<dt>${S.phone}</dt><dd>${esc(m.tel)}</dd>` : ''}${m.orcid ? `<dt>ORCID</dt><dd><a href="https://orcid.org/${esc(m.orcid)}">${esc(m.orcid)}</a></dd>` : ''}</dl>${!em && !m.despacho ? `<p class="mute">${S.noContact}</p>` : ''}`}
      ${links.length ? `<div class="tags">${links.map(l => `<a class="tag" href="${esc(l[0])}">${l[1]} ↗</a>`).join('')}</div>` : ''}
      ${own.length ? `<h2 class="h3" style="margin-top:24px">${S.ownTh}</h2><ul class="plist">${own.map(thItem).join('')}</ul>` : ''}
      ${pr.length ? `<h2 class="h3" style="margin-top:24px">${S.projects}</h2><ul class="plist">${pr.map(x => `<li><a href="proyecto.html?id=${pid(x)}">${esc(tr(x, 't'))}</a><small>${x.ini}–${x.fin} · ${esc(x.fin_)}${active(x) ? ' · ' + S.ongoing : ''}</small></li>`).join('')}</ul>` : ''}
      ${(() => { const mo = OV.filter(o => signs(m, o.dirige) || norm(o.dirige || '').includes(norm(m.nombre.split(' ').slice(0, 2).join(' ')))); return mo.length ? `<h2 class="h3" style="margin-top:24px">${S.ofMine(mo.length)}</h2><ul class="plist">${mo.map(o => `<li><a href="contacto.html#ofertas">${esc(tr(o, 't'))}</a><small>${esc(otipo(o))}${o.plazo ? ' · ' + S.ofDeadline + ' ' + fdate(o.plazo) : ''}</small></li>`).join('')}</ul>` : ''; })()}
      ${th.length ? `<h2 class="h3" style="margin-top:24px">${S.dirTh(th.length)}</h2><ul class="plist">${th.map(thItem).join('')}</ul>` : ''}
    </div>
    <div>${oa ? `<h2 class="h3">${S.impact}</h2><dl class="ficha"><dt>${S.hIdx}</dt><dd>${oa.h ?? '–'}</dd><dt>${S.citsAll}</dt><dd>${(oa.citas || 0).toLocaleString(EN ? 'en' : 'es')}</dd><dt>${S.worksAll}</dt><dd>${oa.trabajos || 0}</dd></dl><p class="note">${S.impM(ciDate())} <a href="https://openalex.org/authors/${esc(oa.oa)}">${S.oaProfile} ↗</a></p><h2 class="h3" style="margin-top:24px">` : '<h2 class="h3">'}${S.pubs(pubs.length)}</h2><div id="mpubs">${pubs.length ? pubs.slice(0, 12).map(x => pubHTML(x.b, x.i)).join('') : `<p class="mute">${S.noPubs}</p>`}</div>${pubs.length > 12 ? `<button class="btn ghost" id="mmore" style="color:var(--text);margin-top:16px">${S.seeAll(pubs.length)}</button>` : ''}
      <p class="note" style="margin-top:14px">${S.autoLink}</p></div></div>`;
  $('#mmore')?.addEventListener('click', e => { $('#mpubs').innerHTML = pubs.map(x => pubHTML(x.b, x.i)).join(''); e.target.remove(); });
},

proyectos() {
  pageArt('evaluacion', 8);
  funders();
  kpis('#kp', [[P.filter(active).length, S.inCourse], [P.filter(p => p.tipo === 'life').length, S.lifeP], [P.filter(p => p.tipo === 'internacional' && active(p)).length, S.intlA], [P.filter(p => p.tipo === 'contrato' && active(p)).length, S.contrA]]);
  let pF = 'act', q = '';
  $('#pchips').innerHTML = [['act', S.onGoing], ['all', S.allM]].concat(Object.entries(S.types)).concat(L.map(l => ['l:' + l.id, tr(l, 'corto')])).map(c => `<button class="chip" data-v="${c[0]}" aria-pressed="${c[0] === pF}">${esc(c[1])}</button>`).join('');
  const draw = () => gantt($('#gantt'), P.filter(p => (pF === 'all' || (pF === 'act' ? active(p) : pF.startsWith('l:') ? p.linea === pF.slice(2) : p.tipo === pF)) && (!q || norm([p.t, p.t_en, p.ref, p.ip, p.fin_].join(' ')).includes(q))).sort((a, b) => (active(b) - active(a)) || b.ini - a.ini || b.fin - a.fin));
  $('#pchips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; pF = b.dataset.v; $$('#pchips .chip').forEach(c => c.setAttribute('aria-pressed', c === b)); draw(); });
  $('#pq').addEventListener('input', e => { q = norm(e.target.value); draw(); });
  draw();
  const fund = {}; P.filter(active).forEach(p => { fund[p.tipo] = (fund[p.tipo] || 0) + 1; }); const tot = Object.values(fund).reduce((a, b) => a + b, 0);
  $('#mix').innerHTML = Object.entries(S.types).map(([k, v]) => `<div class="meter"><div class="row"><span>${v}</span><b>${fund[k] || 0}</b></div><div class="tr"><i style="width:${tot ? (fund[k] || 0) / tot * 100 : 0}%;background:${{ life: 'var(--olive)', internacional: 'var(--ochre)' }[k] || 'var(--leaf)'}"></i></div></div>`).join('');
},

proyecto() {
  const id = new URLSearchParams(location.search).get('id'), p = P.find(x => pid(x) === id);
  if (!p) { $('#ptitle').textContent = S.projNF; $('#pbody').innerHTML = `<p><a class="btn" href="proyectos.html">${S.backProj}</a></p>`; return; }
  document.title = tr(p, 't').split(':')[0] + ' · TEG-UAM';
  pageArt(p.linea || 'vertebrados', hash(p.t) & 31);
  $('#ptitle').textContent = tr(p, 't'); $('#crumbname').textContent = tr(p, 't').split(':')[0].slice(0, 40);
  $('#ptype').textContent = `${S.type1[p.tipo] || ''} · ${active(p) ? S.status[0] : S.status[1]} · ${p.ini}${p.fin !== p.ini ? '–' + p.fin : ''}`;
  const team = M.filter(m => signs(m, p.ip)), other = P.filter(x => x !== p && x.linea === p.linea && active(x)).slice(0, 6), where = G.filter(g => g.linea === p.linea && g.tipo !== 'sede');
  const Y0 = Math.min(p.ini, NOWY) - 1, Y1 = Math.max(p.fin, NOWY) + 2, pc = y => (y - Y0) / (Y1 - Y0) * 100;
  $('#pbody').innerHTML = `<div class="cols2">
    <div><p class="lede">${esc(tr(p, 'resumen') || S.autoSummary(p))}</p>
      ${p.web ? `<div class="btns"><a class="btn" href="${esc(p.web)}">${S.officialWeb} ↗</a></div>` : ''}
      <div class="ptime" aria-hidden="true"><div class="track" style="height:26px;background:var(--tint);border-radius:6px"><i class="bar ${esc(p.tipo)}" style="left:${pc(p.ini)}%;width:${pc(p.fin + 1) - pc(p.ini)}%;transform:none"></i><i class="today" style="left:${pc(NOW)}%"></i></div><div class="mono mute" style="display:flex;justify-content:space-between;margin-top:6px"><span>${Y0}</span><span>${Y1}</span></div></div>
      ${team.length ? `<h3 style="margin-top:32px">${S.teamP}</h3><div class="people" style="grid-template-columns:repeat(auto-fill,minmax(230px,1fr))">${team.map(m => `<a class="person${m.coord ? ' c' : ''}" href="miembro.html?id=${slug(m.nombre)}"><span class="av">${avatar(m)}</span><div><b>${esc(m.nombre)}</b><span>${esc(puesto(m))}</span></div></a>`).join('')}</div>` : ''}
    </div>
    <div><dl class="ficha big">${p.ref ? `<dt>${S.ref}</dt><dd>${esc(p.ref)}</dd>` : ''}<dt>${S.funder}</dt><dd>${esc(p.fin_)}</dd><dt>${S.period}</dt><dd>${p.ini}–${p.fin}</dd>${p.ip ? `<dt>${S.ip}</dt><dd>${esc(p.ip)}</dd>` : ''}${p.eur ? `<dt>${S.budget}</dt><dd>${esc(p.eur)}</dd>` : ''}<dt>${S.line}</dt><dd><a href="lineas.html#${esc(p.linea)}">${esc(lName(p.linea))}</a></dd><dt>${S.kind}</dt><dd>${S.type1[p.tipo] || ''}</dd></dl>
      ${where.length ? `<h3 style="margin-top:28px">${S.places}</h3><ul class="plist">${where.slice(0, 6).map(g => `<li>${esc(tr(g, 'n'))} · ${esc(pais(g.pais))}<small>${esc(tr(g, 'txt'))}</small></li>`).join('')}</ul>` : ''}
      ${other.length ? `<h3 style="margin-top:28px">${S.otherLine}</h3><ul class="plist">${other.map(x => `<li><a href="proyecto.html?id=${pid(x)}">${esc(tr(x, 't'))}</a><small>${x.ini}–${x.fin}</small></li>`).join('')}</ul>` : ''}
    </div></div>`;
},

mapa() {
  pageArt('biogeografia', 12);
  const nat = G.filter(g => g.pais === 'España'), intl = G.filter(g => g.pais !== 'España');
  kpis('#kp', [[new Set(G.map(g => g.pais)).size, S.countriesK], [nat.length, S.placesES], [intl.length, S.placesOut], [G.filter(g => g.tipo === 'campo').length, S.fieldK]]);
  let fT = '', fL = new URLSearchParams(location.search).get('linea') || '', sel = -1;
  const hiNames = new Set(G.map(g => PAIS_EN[g.pais]).filter(Boolean));
  $('#mchips').innerHTML = [['', S.everything], ['campo', S.field], ['colab', S.collab]].map(c => `<button class="chip" data-t="${c[0]}" aria-pressed="${c[0] === fT}">${c[1]}</button>`).join('') + L.map(l => `<button class="chip" data-l="${l.id}" aria-pressed="${l.id === fL}">${esc(tr(l, 'corto'))}</button>`).join('');
  const vis = g => g.tipo === 'sede' || ((!fT || g.tipo === fT) && (!fL || g.linea === fL));
  const tip = $('#mtip');
  function list() {
    const by = {}; G.forEach((g, i) => { if (vis(g)) (by[g.pais] = by[g.pais] || []).push(i); });
    const order = Object.keys(by).sort((a, b) => (a === 'España' ? -1 : b === 'España' ? 1 : pais(a).localeCompare(pais(b), EN ? 'en' : 'es')));
    $('#places').innerHTML = order.map(c => `<section><h3>${esc(pais(c))}</h3>${by[c].map(i => `<button data-i="${i}" class="${i === sel ? 'on' : ''}">${esc(tr(G[i], 'n'))}<small>${esc(tr(G[i], 'txt'))}</small></button>`).join('')}</section>`).join('');
  }
  let geo = null; const d3 = W.d3;
  function draw() {
    list(); if (!geo || !d3) return;
    [['#world', 'w'], ['#spain', 's']].forEach(([selr, k]) => {
      const fig = $(selr), svg = fig.querySelector('svg'), Wd = fig.clientWidth, H = fig.clientHeight; if (!Wd) return;
      let proj, proj2 = null, box2 = null;
      if (k === 'w') proj = d3.geoNaturalEarth1().fitExtent([[10, 10], [Wd - 10, H - 10]], { type: 'Sphere' });
      else { proj = d3.geoMercator().fitExtent([[14, 36], [Wd - 14, H * .76]], { type: 'MultiPoint', coordinates: [[-9.6, 43.9], [4.4, 36.0]] });
        box2 = [14, H * .79, Math.min(Wd * .42, (H * .19) * 2.4), H * .19];
        proj2 = d3.geoMercator().fitExtent([[box2[0] + 6, box2[1] + 6], [box2[0] + box2[2] - 6, box2[1] + box2[3] - 6]], { type: 'MultiPoint', coordinates: [[-18.2, 29.4], [-13.4, 27.6]] }); }
      const path = d3.geoPath(proj); let s = '';
      if (k === 'w') s += `<path class="grat" d="${path(d3.geoGraticule10())}"/><path d="${path({ type: 'Sphere' })}" fill="none" stroke="var(--rule)"/>`;
      s += geo.features.map(f => `<path class="land${hiNames.has(f.properties.name) ? ' hi' : ''}" d="${path(f) || ''}"/>`).join('');
      if (proj2) { const p2 = d3.geoPath(proj2); s += `<rect x="${box2[0]}" y="${box2[1]}" width="${box2[2]}" height="${box2[3]}" fill="var(--card)" stroke="var(--rule)"/><g clip-path="url(#cc)">${geo.features.filter(f => f.properties.name === 'Spain').map(f => `<path class="land hi" d="${p2(f) || ''}"/>`).join('')}</g><clipPath id="cc"><rect x="${box2[0]}" y="${box2[1]}" width="${box2[2]}" height="${box2[3]}"/></clipPath><text x="${box2[0] + 6}" y="${box2[1] + 14}" class="mono" font-size="10" fill="var(--mute)">${S.canarias}</text>`; }
      G.forEach((g, i) => { if (!vis(g)) return; if (k === 's' && g.pais !== 'España') return; const pj = (k === 's' && g.lat < 30) ? proj2 : proj; const xy = pj([g.lon, g.lat]); if (!xy) return;
        const r = g.tipo === 'sede' ? 6.5 : (k === 'w' ? 4.5 : 6);
        if (g.tipo === 'sede') s += `<circle class="pulse" cx="${xy[0]}" cy="${xy[1]}" r="${r}"/>`;
        s += `<circle class="pin ${g.tipo}${i === sel ? ' on' : ''}" data-i="${i}" cx="${xy[0].toFixed(1)}" cy="${xy[1].toFixed(1)}" r="${i === sel ? 9 : r}"/>`; });
      svg.innerHTML = s;
    });
  }
  const show = (i, e, fig) => { const g = G[i]; tip.innerHTML = `${esc(tr(g, 'n'))} · ${esc(pais(g.pais))}<small>${esc(tr(g, 'txt'))}</small>`; const r = fig.getBoundingClientRect(); tip.style.left = (e.clientX - r.left) + 'px'; tip.style.top = (e.clientY - r.top) + 'px'; fig.appendChild(tip); tip.style.opacity = 1; };
  ['#world', '#spain'].forEach(s => { const fig = $(s); fig.addEventListener('pointermove', e => { const c = e.target.closest('.pin'); if (c) show(+c.dataset.i, e, fig); else tip.style.opacity = 0; }); fig.addEventListener('pointerleave', () => tip.style.opacity = 0); fig.addEventListener('click', e => { const c = e.target.closest('.pin'); if (c) { sel = +c.dataset.i; draw(); } }); });
  $('#places').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; sel = +b.dataset.i; draw(); (G[sel].pais === 'España' ? $('#spain') : $('#world')).scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); });
  $('#mchips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; if (b.dataset.t !== undefined) { fT = b.dataset.t; $$('#mchips [data-t]').forEach(c => c.setAttribute('aria-pressed', c === b)); } else { fL = fL === b.dataset.l ? '' : b.dataset.l; $$('#mchips [data-l]').forEach(c => c.setAttribute('aria-pressed', c.dataset.l === fL)); } draw(); });
  const ro = new ResizeObserver(() => draw()); ro.observe($('#world')); ro.observe($('#spain'));
  list();
  const fail = () => ['#world', '#spain'].forEach(s => $(s).insertAdjacentHTML('beforeend', `<div class="mapfail">${S.mapFail}</div>`));
  if (!d3) { fail(); return; }
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json').then(r => r.json()).then(topo => { geo = topoFeatures(topo, 'countries'); draw(); }).catch(fail);
},

publicaciones() {
  pageArt('vertebrados', 14);
  const artsY = B.filter(b => b.a === NOWY && b.tipo === 'art');
  kpis('#kp', [[artsY.length, S.artsY(NOWY)], [artsY.filter(b => b.q === 'Q1').length, S.inQ1], [artsY.filter(b => b.oa).length, S.inOA], [B.filter(b => b.tipo === 'prensa').length, S.press]]);
  const fig = $('#chart'), svg = fig.querySelector('svg'), ser = yearSeries(); let seen = false;
  function chart(anim) {
    const Wd = fig.clientWidth, H = fig.clientHeight; if (!Wd) return; const pad = { l: 44, r: 16, t: 26, b: 34 }, iw = Wd - pad.l - pad.r, ih = H - pad.t - pad.b;
    const mx = Math.max(10, ...ser.map(s => s.n || 0)) * 1.15, bw = iw / ser.length, y = v => pad.t + ih - v / mx * ih;
    let s = ''; const step = mx > 60 ? 20 : 10;
    for (let v = 0; v <= mx; v += step) s += `<line x1="${pad.l}" x2="${Wd - pad.r}" y1="${y(v)}" y2="${y(v)}" stroke="var(--rule)"/><text x="${pad.l - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="var(--mute)" class="mono">${v}</text>`;
    ser.forEach((d, i) => { const x = pad.l + i * bw + bw * .18, w = bw * .64;
      if (d.n == null) s += `<rect x="${x}" y="${y(mx * .35)}" width="${w}" height="${y(0) - y(mx * .35)}" fill="none" stroke="var(--mute)" stroke-dasharray="4 4"/><text x="${x + w / 2}" y="${y(mx * .35) - 8}" text-anchor="middle" font-size="11" fill="var(--mute)">${S.noData}</text>`;
      else { const h = y(0) - y(d.n), hq = y(0) - y(d.q1), trn = anim ? `style="transform-origin:${x}px ${y(0)}px;transform:scaleY(0);transition:transform 1s cubic-bezier(.2,.7,.2,1) ${i * 90}ms"` : '';
        s += `<g class="gb" ${trn}><rect x="${x}" y="${y(d.n)}" width="${w}" height="${h}" fill="var(--leaf)" rx="2"/>${d.qk ? `<rect x="${x}" y="${y(d.q1)}" width="${w}" height="${hq}" fill="var(--olive)" rx="2"/>` : ''}</g><text x="${x + w / 2}" y="${y(d.n) - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">${d.n}</text>`; }
      s += `<text x="${x + w / 2}" y="${H - 12}" text-anchor="middle" font-size="12" fill="var(--mute)" class="mono">${d.y}${d.y === NOWY ? '*' : ''}</text>`; });
    svg.innerHTML = s;
    if (anim) requestAnimationFrame(() => requestAnimationFrame(() => svg.querySelectorAll('.gb').forEach(g => g.style.transform = 'scaleY(1)')));
  }
  const ro = new ResizeObserver(() => chart(false)); ro.observe(fig);
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting && !seen) { seen = true; chart(!RM); o.disconnect(); } }, { threshold: .3 }).observe(fig);
  $('#chartnote').textContent = S.pubNote(NOWY, ser.filter(s => s.n == null).map(s => s.y));
  const withC = B.filter(b => cites(b) != null);
  if (withC.length && $('#impact')) {
    const tot = withC.reduce((s, b) => s + cites(b), 0), best = withC.slice().sort((a, b) => cites(b) - cites(a))[0];
    $('#impact').innerHTML = `<div><b>${tot.toLocaleString(EN ? 'en' : 'es')}</b><span>${S.totCit}</span></div><div><b>${hIndex(withC.map(cites))}</b><span>${S.hGroup}</span></div><div><b>${Math.round(withC.filter(b => cites(b) > 0).length / withC.length * 100)} %</b><span>${S.citedPct}</span></div><div class="mc"><span class="mono mute">${S.mostCited} · ${S.nCit(cites(best))}</span><a href="${esc(pubHref(best))}">${esc(best.t)}</a><small>${esc((best.au || '').length > 70 ? best.au.slice(0, 68).replace(/[,;][^,;]*$/, '') + ' et al.' : best.au)} (${best.a}) · <em>${esc(best.r)}</em></small></div>`;
    $('#impnote').textContent = S.impNote(ciDate());
  } else $('#impsec')?.remove();
  const years = [...new Set(B.map(b => b.a))].sort((a, b) => b - a);
  $('#by').innerHTML = `<option value="">${S.allY}</option>` + years.map(y => `<option>${y}</option>`).join('');
  let shown = 15;
  const draw = () => { const q = norm($('#bq').value), y = $('#by').value, t = $('#bt').value, oa = $('#boa').checked;
    const list = B.map((b, i) => ({ b, i })).filter(({ b }) => (!y || String(b.a) === y) && (!t || b.tipo === t) && (!oa || b.oa) && (!q || norm([b.au, b.t, b.r].join(' ')).includes(q))).sort($('#bs')?.value === 'c' ? (a, b) => (cites(b.b) ?? -1) - (cites(a.b) ?? -1) || b.b.a - a.b.a : (a, b) => b.b.a - a.b.a);
    $('#bcount').textContent = S.nPubs(list.length);
    $('#pubs').innerHTML = list.slice(0, shown).map(x => pubHTML(x.b, x.i)).join('') || `<p class="empty">${S.noPub}</p>`;
    $('#bmore').style.display = list.length > shown ? '' : 'none'; };
  ['#bq', '#by', '#bt', '#boa', '#bs'].forEach(id => $(id)?.addEventListener('input', () => { shown = 15; draw(); }));
  $('#bmore').addEventListener('click', () => { shown += 20; draw(); });
  draw();
},

tesis() {
  pageArt('pastizales', 16);
  const isUAM = t => /UAM|Autónoma de Madrid|^Ecolog[ií]a\.?$/i.test(t.prog);
  const lei = T.filter(t => t.estado === 'leida'), curT = T.filter(t => t.estado === 'curso');
  kpis('#kp', [[curT.length, S.thInProg], [lei.length, S.thReadK], [T.filter(t => !isUAM(t)).length, S.otherUni]]);
  const tYear = t => { const m = String(t.fecha).match(/20\d\d/); return m ? +m[0] : null; };
  const TY0 = 2017.5, TY1 = 2030.5, tp = y => (y - TY0) / (TY1 - TY0) * 100, by = {};
  T.forEach((t, i) => { const y = tYear(t) ?? '?'; (by[y] = by[y] || []).push(i); });
  let h = '<div class="base"></div>'; for (let y = 2018; y <= 2030; y++) h += `<span class="yr mono" style="left:${tp(y)}%">${y}</span>`;
  Object.entries(by).forEach(([y, ids]) => { if (y === '?') return; ids.forEach((i, k) => h += `<button class="dot ${T[i].estado}" data-i="${i}" style="left:${tp(+y) + ((k % 2) ? .9 : -.9)}%;bottom:${40 + Math.floor(k / 2) * 20}px;transition-delay:${(+y - 2018) * 80 + k * 40}ms" aria-label="${esc(T[i].autor)}"></button>`); });
  $('#tcal').innerHTML = h;
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { $('#tcal').classList.add('in'); o.disconnect(); } }, { threshold: .3 }).observe($('#tcal'));
  const showT = i => { const t = T[i]; $$('#tcal .dot').forEach(d => d.classList.toggle('on', +d.dataset.i === i)); $('#tinfo').innerHTML = `<b style="color:#fff">${esc(t.autor)}</b> · ${esc(t.t)}<br><span class="mono" style="color:#AEB6A2">${t.estado === 'leida' ? S.read : S.expected} ${esc(t.fecha)} · ${S.dir}: ${esc(t.dir)} · ${esc(t.prog)}</span>`; };
  $('#tcal').addEventListener('click', e => { const d = e.target.closest('.dot'); if (d) showT(+d.dataset.i); });
  $('#tcal').addEventListener('pointerover', e => { const d = e.target.closest('.dot'); if (d) showT(+d.dataset.i); });
  $('#tnote').textContent = (by['?'] || []).length ? S.noDate(by['?'].length) : '';
  let f = '';
  $('#tchips').innerHTML = [['', S.all], ['curso', S.progF], ['leida', S.readF], ['uam', S.uam], ['ext', S.otherU]].map(c => `<button class="chip" data-v="${c[0]}" aria-pressed="${c[0] === f}">${c[1]}</button>`).join('');
  const draw = () => { const list = T.filter(t => !f || (f === 'uam' ? isUAM(t) : f === 'ext' ? !isUAM(t) : t.estado === f)).sort((a, b) => (tYear(b) || 0) - (tYear(a) || 0));
    $('#tl').innerHTML = list.map(t => `<div><b>${esc(t.autor)}</b><span>${esc(t.t)}</span><span class="mono">${t.estado === 'leida' ? S.read : S.expected} ${esc(t.fecha || S.nd)} · ${esc(t.prog)} · ${S.dir}: ${esc(t.dir)}</span></div>`).join(''); };
  $('#tchips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; f = b.dataset.v; $$('#tchips .chip').forEach(c => c.setAttribute('aria-pressed', c === b)); draw(); });
  draw();
},

novedades() {
  pageArt('vertebrados', 18);
  $('#news').innerHTML = N.map((n, i) => newsCard(n, i)).join('') || `<p class="empty">${S.noNews}</p>`;
  $('#premios').innerHTML = (W.PREMIOS || []).map(p => `<li><b>${p.url ? `<a href="${esc(p.url)}">${esc(tr(p, 't'))}</a>` : esc(tr(p, 't'))}</b><small>${p.a} · ${esc(p.quien)}</small></li>`).join('');
  $('#activ').innerHTML = (W.ACTIVIDADES || []).map(a => `<li><b>${esc(tr(a, 't'))}</b><small>${esc(a.fecha)} · ${esc(a.lugar)}${a.quien ? ' · ' + esc(a.quien) : ''}</small></li>`).join('');
  $('#press').innerHTML = B.filter(b => b.tipo === 'prensa').map(b => `<li><a href="${esc(pubHref(b))}">${esc(b.t)}</a><small>${esc(b.au)} · ${esc(b.r)} ${b.a}</small></li>`).join('');
},

contacto() {
  pageArt('evaluacion', 20);
  $('#coord').innerHTML = M.filter(m => m.coord).map(m => `<a class="person c" href="miembro.html?id=${slug(m.nombre)}"><span class="av">${avatar(m)}</span><div><b>${esc(m.nombre)}</b><span>${esc(email(m))}</span></div></a>`).join('');
  $('#estancias').innerHTML = (W.ESTANCIAS || []).map(e => `<li><b>${esc(e.quien)}</b> · ${esc(tr(e, 'prog'))}<small>${esc(e.origen)} · ${esc(e.fecha)} · ${esc(tr(e, 'tema'))}</small></li>`).join('');
  const of = $('#ofertas');
  if (of) { let ft = ''; const tipos = [...new Set(OV.map(o => o.tipo))];
    const draw = () => { const l = OV.filter(o => !ft || o.tipo === ft); of.innerHTML = l.length ? l.map(offerCard).join('') : `<div class="offer empty"><h3>${S.offer}</h3><p class="mute" style="margin:6px 0 0">${S.offerTxt}</p></div>`; };
    if (tipos.length > 1) { $('#ofchips').innerHTML = [['', S.ofAll]].concat(tipos.map(t => [t, otipo({ tipo: t })])).map(c => `<button class="chip" data-t="${esc(c[0])}" aria-pressed="${c[0] === ft}">${esc(c[1])}</button>`).join('');
      $('#ofchips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; ft = b.dataset.t; $$('#ofchips .chip').forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); }); }
    draw(); $('#ofpost').innerHTML = S.ofPost(`https://github.com/${REPO}/issues/new?template=oferta.yml`);
    if (location.hash === '#ofertas') $('#ofertas-sec').scrollIntoView(); }
}
};

function newsCard(n, i) {
  return `<article><div class="plate">${n.img ? `<img src="${esc(asset(n.img))}" alt="" loading="lazy">` : plate(KINDS[i % KINDS.length], 40 + i)}</div><div class="in"><span class="mono">${esc(n.fecha)} · ${esc(n.tipo)}</span><h3 style="margin-top:6px">${n.url ? `<a href="${esc(n.url)}" style="color:inherit">${esc(tr(n, 't'))}</a>` : esc(tr(n, 't'))}</h3><p>${esc(tr(n, 'txt'))}</p></div></article>`;
}

/* ---------- financiadores y colaboradores ---------- */
function funders() {
  const el = $('#funders'); if (!el) return;
  const F = (W.FINANCIADORES || []).map(f => { let n = 0; try { n = f.buscar ? P.filter(p => new RegExp(f.buscar, 'i').test(p.fin_ || '')).length : 0; } catch (e) { } return { f, n }; })
    .sort((a, b) => (a.f.tipo === 'empresa') - (b.f.tipo === 'empresa') || b.n - a.n);
  const tile = ({ f, n }) => { const inner = `${f.logo ? `<img src="${esc(asset(f.logo))}" alt="${esc(tr(f, 'n'))}" loading="lazy">` : `<b>${esc(tr(f, 'n'))}</b>`}<span class="mono">${f.tipo === 'empresa' ? S.transfer + (n ? ' · ' : '') : ''}${n ? S.nProjF(n) : ''}</span>`;
    return f.url ? `<a class="fund" href="${esc(f.url)}">${inner}</a>` : `<div class="fund">${inner}</div>`; };
  el.innerHTML = F.map(tile).join('');
  const C = W.COLABORADORES || [], cl = $('#collabs');
  if (cl) cl.innerHTML = C.map(c => { const inner = `<b>${esc(tr(c, 'n'))}</b><span class="mono">${esc(pais(c.pais || ''))}</span>`; return c.url ? `<a class="fund col" href="${esc(c.url)}">${inner}</a>` : `<div class="fund col">${inner}</div>`; }).join('');
  const net = buildNet(), nc = Object.keys(net.countries).length;
  if ($('#collabtxt') && net.nInst) $('#collabtxt').innerHTML = `${S.collabsTxt(net.nInst, nc)} <a href="red.html">${S.seeNet} →</a>`;
}
/* ---------- dibujo de la red (d3) ---------- */
function drawNet(fig, net, opts = {}) {
  const svg = d3.select(fig).select('svg'), tip = fig.querySelector('.nettip');
  const Wd = fig.clientWidth, H = fig.clientHeight;
  svg.attr('viewBox', `0 0 ${Wd} ${H}`).selectAll('*').remove();
  const showInst = opts.inst !== false, line = opts.line || '';
  let nodes = [...net.nodes, ...(showInst ? net.inst : [])].map(n => ({ ...n })), ids = new Set(nodes.map(n => n.id));
  const links = net.links.filter(l => ids.has(l.source) && ids.has(l.target)).map(l => ({ ...l }));
  const deg = new Set(links.flatMap(l => [l.source, l.target])); nodes = nodes.filter(n => deg.has(n.id));
  const topI = new Set(nodes.filter(n => !(n.kind === 'mem' || n.kind === 'old')).sort((a, b) => b.pubs - a.pubs).slice(0, opts.small ? 0 : 7).map(n => n.id));
  const r = n => n.kind === 'mem' || n.kind === 'old' ? 4 + Math.sqrt(n.pubs) * 1.7 : 3 + Math.sqrt(n.pubs) * 1.4;
  const sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(l => l.kind === 'mm' ? 60 : 130).strength(l => l.kind === 'mm' ? Math.min(.9, .12 + l.w * .06) : .04))
    .force('charge', d3.forceManyBody().strength(n => n.kind === 'mem' || n.kind === 'old' ? -260 : -110))
    .force('x', d3.forceX(Wd / 2).strength(.04)).force('y', d3.forceY(H / 2).strength(.06 * Wd / H))
    .force('collide', d3.forceCollide(n => r(n) + 3)).stop();
  for (let i = 0; i < 320; i++) sim.tick();
  // encajar en el recuadro
  const q = (a, f) => { const s = a.slice().sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.max(0, Math.round(f * (s.length - 1))))]; };
  const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y), x0 = q(xs, .03), x1 = q(xs, .97), y0 = q(ys, .03), y1 = q(ys, .97);
  const k = Math.min((Wd - 90) / Math.max(1, x1 - x0), (H - 70) / Math.max(1, y1 - y0), 2), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  nodes.forEach(n => { n.x = Math.max(18, Math.min(Wd - 18, Wd / 2 + (n.x - cx) * k)); n.y = Math.max(18, Math.min(H - 18, H / 2 + (n.y - cy) * k)); });
  const col = n => ({ mem: 'var(--olive)', old: 'var(--mute)', es: 'var(--straw)', intl: 'var(--red)' }[n.kind]);
  const gl = svg.append('g'), gn = svg.append('g');
  const L2 = gl.selectAll('line').data(links).join('line').attr('stroke', l => l.kind === 'mm' ? 'var(--olive)' : 'var(--ochre)')
    .attr('stroke-opacity', l => l.kind === 'mm' ? .6 : opts.small ? .09 : .16).attr('stroke-width', l => l.kind === 'mm' ? Math.min(6, .7 + Math.sqrt(l.w) * .9) : Math.min(3, .4 + Math.sqrt(l.w) * .35));
  const isM = n => n.kind === 'mem' || n.kind === 'old';
  const N2 = gn.selectAll('g').data(nodes).join(enter => { const g = enter.append('g').attr('class', 'nn');
    g.each(function (n) { const s = d3.select(this);
      const a = isM(n) ? s.append('a').attr('href', 'miembro.html?id=' + n.id).attr('aria-label', `${n.m.nombre}: ${S.pubsN(n.pubs)}`) : s.append('g').attr('tabindex', 0).attr('role', 'img').attr('aria-label', `${n.name} (${ctry(n.c)}): ${S.works(n.pubs)}`);
      if (isM(n)) a.append('circle').attr('r', r(n)).attr('fill', col(n)).attr('stroke', 'var(--paper)').attr('stroke-width', 1.5);
      else a.append('rect').attr('x', -r(n)).attr('y', -r(n)).attr('width', r(n) * 2).attr('height', r(n) * 2).attr('rx', 2).attr('transform', 'rotate(45)').attr('fill', col(n)).attr('stroke', 'var(--olive)').attr('stroke-width', 1);
      const lab = isM(n) ? (!opts.small && n.pubs >= 14 ? n.m.nombre[0] + '. ' + ((n.m.firma || '').split('|')[0].split(',')[0].trim() || n.m.nombre.split(' ')[1]) : '') : (topI.has(n.id) ? (n.name.length > 30 ? n.name.slice(0, 29) + '…' : n.name) : '');
      if (lab) { const lf = n.x > Wd * .68; a.append('text').text(lab).attr('x', lf ? -(r(n) + 4) : r(n) + 4).attr('y', 4).attr('text-anchor', lf ? 'end' : 'start').attr('class', isM(n) ? 'nl' : 'nl inst'); } });
    return g; });
  const pos = () => { L2.attr('x1', l => l.source.x).attr('y1', l => l.source.y).attr('x2', l => l.target.x).attr('y2', l => l.target.y); N2.attr('transform', n => `translate(${n.x},${n.y})`); };
  pos();
  const nb = n => new Set([n.id, ...links.filter(l => l.source.id === n.id || l.target.id === n.id).flatMap(l => [l.source.id, l.target.id])]);
  const focus = (n, ev) => { const s = nb(n); N2.classed('dim', d => !s.has(d.id)); L2.classed('dim', l => l.source.id !== n.id && l.target.id !== n.id);
    const ws = links.filter(l => l.source.id === n.id || l.target.id === n.id).sort((a, b) => b.w - a.w).slice(0, 4).map(l => { const o = l.source.id === n.id ? l.target : l.source; return `${esc(isM(o) ? o.m.nombre : o.name)} · ${l.w}`; });
    tip.innerHTML = `<b>${esc(isM(n) ? n.m.nombre : n.name)}</b><span>${isM(n) ? S.pubsN(n.pubs) : flag(n.c) + ' ' + esc(ctry(n.c)) + ' · ' + S.works(n.pubs)}</span>${ws.length ? `<small>${ws.join('<br>')}</small>` : ''}`;
    tip.hidden = false; const bx = fig.getBoundingClientRect(); const x = n.x / Wd * bx.width, y = n.y / H * bx.height; tip.style.left = Math.min(bx.width - 250, x + 14) + 'px'; tip.style.top = Math.max(0, y - 10) + 'px'; };
  const blur = () => { N2.classed('dim', false); L2.classed('dim', false); tip.hidden = true; };
  N2.on('mouseenter focusin', (ev, n) => focus(n, ev)).on('mouseleave focusout', blur);
  if (line) N2.classed('dim', n => !(isM(n) && mLines(n.m).includes(line)));
  N2.call(d3.drag().on('start', (ev, n) => { sim.alphaTarget(.2).restart(); n.fx = n.x; n.fy = n.y; }).on('drag', (ev, n) => { n.fx = ev.x; n.fy = ev.y; }).on('end', (ev, n) => { sim.alphaTarget(0); n.fx = n.fy = null; }));
  sim.on('tick', pos);
  if (!RM) sim.alpha(.05).restart();
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
