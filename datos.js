/* =====================================================================
   DATOS DE LA WEB DEL TEG-UAM
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para actualizar contenidos.
   Cada bloque es una lista; añade o borra elementos copiando el formato
   de los que ya hay. Respeta comas, comillas y corchetes.
   Las imágenes van en la carpeta img/.
   ===================================================================== */

/* ---------- LÍNEAS DE INVESTIGACIÓN ----------
   id: identificador corto (se usa en miembros y proyectos)               */
window.LINEAS = [
  { id: "vertebrados", nombre: "Ecología de vertebrados terrestres", corto: "Vertebrados",
    img: "img/linea-vertebrados.jpg",
    texto: "Ecología y conservación de aves esteparias (alondra ricotí, sisón, ganga ortega, cernícalo primilla), murciélagos, ungulados y otros vertebrados: nicho ecológico, ecología trófica, movimiento y migración, selección de hábitat, competencia y depredación. Combinamos seguimiento acústico pasivo, telemetría, fototrampeo, metabarcoding y genética del paisaje.",
    claves: ["aves esteparias", "ecoacústica", "movimiento", "nicho trófico", "murciélagos", "necrófagos"] },
  { id: "agraria", nombre: "Ecología agraria", corto: "Agraria",
    img: "img/linea-agraria.jpg",
    texto: "Efectos de la intensificación, el abandono y la Política Agraria Común sobre la biodiversidad de los paisajes agrícolas. Evaluamos medidas agroambientales, diseñamos indicadores y asesoramos en la gestión de zonas de interés para las aves esteparias y sistemas agrarios de alto valor natural.",
    claves: ["PAC", "medidas agroambientales", "ganadería extensiva", "agroestepas", "servicios ecosistémicos"] },
  { id: "pastizales", nombre: "Pastizales y matorrales mediterráneos", corto: "Pastizales",
    img: "img/linea-pastizales.jpg",
    texto: "Dinámica de comunidades vegetales y de invertebrados en pastizales y matorrales: dispersión, bancos de semillas, herbivoría, pastoreo y trashumancia, fuego y su efecto sobre hormigas y escarabajos coprófagos, y funcionamiento del suelo.",
    claves: ["pastoreo", "vías pecuarias", "fuego", "escarabajos coprófagos", "hormigas", "suelo"] },
  { id: "evaluacion", nombre: "Evaluación y restauración ambiental", corto: "Impactos",
    img: "img/linea-evaluacion.jpg",
    texto: "Impactos de infraestructuras de transporte, plantas fotovoltaicas y parques eólicos sobre la fauna y diseño de medidas correctoras: pasos de fauna, pantallas anticolisión, sistemas de detección de aves. Restauración ecológica, conectividad y ecología de carreteras.",
    claves: ["ecología de carreteras", "fotovoltaica", "eólica", "conectividad", "restauración"] },
  { id: "biogeografia", nombre: "Biogeografía, macroecología y paleoecología", corto: "Biogeografía",
    img: "img/linea-biogeografia.jpg",
    texto: "Patrones de biodiversidad a escala regional y global y su historia: biogeografía insular (Azores), diversidad funcional y filogenética, lagunas de conocimiento, distribución de la flora ibérica (AFLIBER) y reconstrucción paleoecológica de la vegetación a partir del polen.",
    claves: ["islas", "macroecología", "filogenia", "flora ibérica", "paleopalinología", "bases de datos"] }
];

/* ---------- MIEMBROS ----------
   nombre, email (sin @uam.es si es de la UAM; completo si es otro),
   lineas (ids separados por espacios), puesto (opcional), orcid (opcional),
   coord: true para coordinación                                              */
window.MIEMBROS = [
  { nombre: "Diego Llusia Genique", email: "diego.llusia", lineas: "vertebrados", puesto: "Coordinador del grupo", coord: true },
  { nombre: "Pablo Acebes Vives", email: "pablo.acebes", lineas: "vertebrados agraria", puesto: "Coordinador del grupo", coord: true },
  { nombre: "Adrián Barrero Diego", email: "adrian.barrero", lineas: "vertebrados" },
  { nombre: "Ana Santos Torres", email: "ana.santost", lineas: "vertebrados", puesto: "Investigadora predoctoral" },
  { nombre: "Ana Margarida Coelho dos Santos", email: "anamc.santos", lineas: "biogeografia pastizales" },
  { nombre: "André Menegotto Domingos", email: "andre.menegotto", lineas: "biogeografia" },
  { nombre: "Ángel Pedro Pérez Olea", email: "pedrop.olea", lineas: "vertebrados agraria" },
  { nombre: "Begoña Peco Vázquez", email: "begonna.peco", lineas: "pastizales" },
  { nombre: "Beatriz Cortés Caballero", email: "", lineas: "vertebrados", puesto: "Investigadora predoctoral" },
  { nombre: "Cristina Mata Estacio", email: "cristina.mata", lineas: "evaluacion", puesto: "Profesora Permanente Laboral", orcid: "0000-0002-6206-1015" },
  { nombre: "Daniel Bustillo de la Rosa", email: "daniel.bustillodela", lineas: "vertebrados" },
  { nombre: "David González del Portillo", email: "david.gonzalezd", lineas: "vertebrados agraria" },
  { nombre: "Eduardo Tomás Mezquida", email: "eduardo.mezquida", lineas: "vertebrados" },
  { nombre: "Eva María Cuesta Moreno", email: "eva.cuesta", lineas: "pastizales biogeografia" },
  { nombre: "Francisco Martín Azcárate", email: "fm.azcarate", lineas: "pastizales evaluacion" },
  { nombre: "Ignacio Ramos Gutiérrez", email: "ignacio.ramosgutierrez", lineas: "biogeografia", puesto: "Profesor Ayudante Doctor", orcid: "0000-0002-8675-0114" },
  { nombre: "Israel Hervás Bengochea", email: "israel.hervas", lineas: "evaluacion" },
  { nombre: "Javier Seoane Pinilla", email: "javier.seoane", lineas: "biogeografia vertebrados" },
  { nombre: "Jesús Herranz Barrera", email: "jesus.herranz", lineas: "evaluacion" },
  { nombre: "Juan Traba Díaz", email: "juan.traba", lineas: "vertebrados agraria" },
  { nombre: "Juan Carlos Moreno Saiz", email: "jcarlos.moreno", lineas: "biogeografia" },
  { nombre: "Juan Esteban Malo Arrázola", email: "je.malo", lineas: "evaluacion vertebrados", puesto: "Profesor Titular", orcid: "0000-0002-6033-5035" },
  { nombre: "Juan José Oñate Rubalcaba", email: "juan.onate", lineas: "agraria" },
  { nombre: "Julia Gómez Catasús", email: "julia.gomez", lineas: "vertebrados evaluacion", puesto: "Profesora Ayudante Doctora", orcid: "0000-0001-8949-5318" },
  { nombre: "Julia Zurdo Jordá", email: "julia.zurdo", lineas: "vertebrados" },
  { nombre: "Laura dos Santos Pinto Vázquez", email: "laura.dossantospinto", lineas: "" },
  { nombre: "Lourenço Falcão Rodrigues", email: "lourenco.falcao", lineas: "evaluacion" },
  { nombre: "Manuel Borja Morales Prieto", email: "manuel.morales", lineas: "vertebrados agraria", puesto: "Catedrático · Director del CIBC-UAM", orcid: "0000-0001-8534-7895" },
  { nombre: "Margarita Reverter Cid", email: "margarita.reverter", lineas: "vertebrados" },
  { nombre: "María Fátima Franco Múgica", email: "fatima.franco", lineas: "biogeografia", puesto: "Profesora Contratada Doctora", orcid: "0000-0002-9372-8863" },
  { nombre: "María Isabel Castro Parga", email: "isabel.castro", lineas: "" },
  { nombre: "Pedro Sáez Gómez", email: "pedro.saez", lineas: "vertebrados" },
  { nombre: "Rafael Molina Venegas", email: "rafael.molina", lineas: "biogeografia" },
  { nombre: "Rodrigo García Vegas", email: "rodrigo.garciav", lineas: "" },
  { nombre: "Sonia Llorente Culebras", email: "", lineas: "biogeografia" },
  { nombre: "William Douglas Carvalho Sá", email: "william.mustin", lineas: "biogeografia vertebrados", puesto: "Investigador Ramón y Cajal", orcid: "0000-0003-2518-9148" }
];

/* ---------- PROYECTOS ----------
   tipo: "life" | "nacional" | "internacional" | "contrato"
   ini / fin: años. ip: investigador/a principal. eur: presupuesto (texto)   */
window.PROYECTOS = [
  { t: "LIFE Iber-Ricotí: restauración del hábitat y refuerzo poblacional de la alondra ricotí", ref: "LIFE-2025-SAP-NAT-NATURE", fin_: "Comisión Europea · LIFE", ini: 2026, fin: 2031, ip: "Juan Traba (coordinación científica UAM)", linea: "vertebrados", tipo: "life", eur: "≈15 M€ (proyecto completo)" },
  { t: "LIFE Connect Ricotí: conectividad de la metapoblación ibérica de alondra ricotí", ref: "LIFE20 NAT/ES/000133", fin_: "Comisión Europea · LIFE", ini: 2021, fin: 2026, ip: "Juan Traba", linea: "vertebrados", tipo: "life", eur: "≈5,5 M€" },
  { t: "LIFE Ricotí: alondra ricotí y su hábitat en Soria", ref: "LIFE15 NAT/ES/000802", fin_: "Comisión Europea · LIFE", ini: 2016, fin: 2021, ip: "Juan Traba", linea: "vertebrados", tipo: "life" },
  { t: "LIFE Cañadas: conectividad ecológica de las vías pecuarias", ref: "LIFE18 NAT/ES/000930", fin_: "Comisión Europea · LIFE", ini: 2019, fin: 2024, ip: "Francisco Martín Azcárate", linea: "pastizales", tipo: "life" },
  { t: "SONORA: indicadores bioacústicos y sociales del uso público en parques nacionales insulares", ref: "3664/2026", fin_: "MITECO · Red de Parques Nacionales", ini: 2026, fin: 2030, ip: "William D. Carvalho", linea: "vertebrados", tipo: "nacional", eur: "96.597 €" },
  { t: "CLIMBFUN: cambio climático y escarabajos coprófagos de montaña y sus funciones", ref: "PID2024-155510NB-I00", fin_: "Agencia Estatal de Investigación", ini: 2025, fin: 2028, ip: "Ana M. C. Santos", linea: "pastizales", tipo: "nacional", eur: "162.500 €" },
  { t: "TranSolar: las plantas solares como escenario de interacciones depredador-presa", ref: "AVANZA UAM 2026 / PID2024-157894OB-I00", fin_: "UAM · Programa Avanza", ini: 2026, fin: 2027, ip: "Cristina Mata", linea: "evaluacion", tipo: "nacional", eur: "26.632 €" },
  { t: "EcoSolar: impactos ecológicos y sociales de los sistemas fotovoltaicos", ref: "AVANZA UAM 2026 / PID2024-155694OA-I00", fin_: "UAM · Programa Avanza", ini: 2026, fin: 2027, ip: "Julia Gómez Catasús y Violeta Hevia", linea: "evaluacion", tipo: "nacional", eur: "27.185 €" },
  { t: "Funciones y servicios de los ecosistemas en paisajes agrícolas y renaturalizados", ref: "PID2022-142096OB-I00", fin_: "Ministerio de Ciencia, Innovación y Universidades", ini: 2023, fin: 2027, ip: "Pablo Acebes y Pedro P. Olea", linea: "agraria", tipo: "nacional", eur: "237.500 €" },
  { t: "GEOFEAR: miedo en aves a lo largo de gradientes geográficos y de uso del suelo", ref: "PID2023-149694NB-I00", fin_: "Ministerio de Ciencia e Innovación", ini: 2024, fin: 2027, ip: "Mario Díaz (MNCN-CSIC); participa M. B. Morales", linea: "vertebrados", tipo: "nacional", eur: "162.000 €" },
  { t: "Aves amenazadas como guía para restaurar las agroestepas", ref: "PID2025-170929OB-I00", fin_: "Ministerio de Ciencia e Innovación", ini: 2024, fin: 2027, ip: "Santiago Mañosa (UB); participa M. B. Morales", linea: "agraria", tipo: "nacional", eur: "223.875 €" },
  { t: "DUNGPOOL: pool de especies y ensamblaje de escarabajos coprófagos en un mundo más cálido", ref: "PID2021-122380NA-I00", fin_: "Agencia Estatal de Investigación", ini: 2022, fin: 2026, ip: "Ana M. C. Santos", linea: "pastizales", tipo: "nacional", eur: "176.660 €" },
  { t: "Enfrentando la crisis de polinizadores: seguimiento acústico de abejas", ref: "PID2022-141923OB-I00", fin_: "Agencia Estatal de Investigación", ini: 2023, fin: 2026, ip: "Diego Llusia", linea: "vertebrados", tipo: "nacional", eur: "107.500 €" },
  { t: "FrogNet: nuevas tecnologías para el seguimiento automático de biodiversidad", ref: "IND2023/AMB-28600", fin_: "Comunidad de Madrid · Doctorados industriales", ini: 2023, fin: 2026, ip: "Diego Llusia", linea: "vertebrados", tipo: "nacional", eur: "119.774 €" },
  { t: "Efecto del ruido de aerogeneradores y las balizas luminosas en paseriformes de estepa", ref: "SI4/PJI/2024-00222", fin_: "UAM · Doctores emergentes", ini: 2025, fin: 2026, ip: "Julia Gómez Catasús", linea: "evaluacion", tipo: "nacional", eur: "36.986 €" },
  { t: "CORREDORAS: estabilidad de comunidades vegetales a escalas temporales largas", ref: "PID2022-141558NB-I00", fin_: "MICIU", ini: 2023, fin: 2026, ip: "Graciela Gil Romera (IPE-CSIC); participa F. Franco", linea: "biogeografia", tipo: "nacional", eur: "161.000 €" },
  { t: "BIOFOODSCAPE: paisajes agroalimentarios en las montañas españolas", ref: "PID2023-146662OB-I00", fin_: "MICIU", ini: 2024, fin: 2027, ip: "N. López Estébanez y Y. Jiménez Olivencia; participa F. Franco", linea: "biogeografia", tipo: "nacional", eur: "97.000 €" },
  { t: "ODISEA: impacto antrópico en los bosques testigo del Centro-Oeste ibérico", ref: "PID2020-119836GB-I00", fin_: "Ministerio de Ciencia e Innovación", ini: 2021, fin: 2025, ip: "I. García-Amorena (UPM); participa F. Franco", linea: "biogeografia", tipo: "nacional", eur: "107.690 €" },
  { t: "Seguimiento de especies del Catálogo Regional de Especies Amenazadas de Madrid", ref: "", fin_: "Comunidad de Madrid", ini: 2026, fin: 2026, ip: "Felipe Martínez (UPM); participan J. C. Moreno e I. Ramos", linea: "biogeografia", tipo: "nacional", eur: "30.000 €" },
  { t: "Efectos ecosistémicos del fuego a corto y medio plazo", ref: "PID2022-138420NB-I00", fin_: "Ministerio de Ciencia e Innovación", ini: 2023, fin: 2026, ip: "Francisco Martín Azcárate", linea: "pastizales", tipo: "nacional" },
  { t: "Filogenias curativas", ref: "PID2022-138776NA-I00", fin_: "Ministerio de Ciencia e Innovación", ini: 2023, fin: 2026, ip: "Rafael Molina Venegas", linea: "biogeografia", tipo: "nacional" },
  { t: "Emerging technologies to study biodiversity impacts under global change", ref: "2020-T1/AMB-20636", fin_: "Comunidad de Madrid · Atracción de Talento", ini: 2022, fin: 2027, ip: "Diego Llusia", linea: "vertebrados", tipo: "nacional" },
  { t: "EcoQuilô: fuego, agricultura tradicional y biodiversidad en comunidades quilombolas de las sabanas amazónicas", ref: "CNPq 442555/2025-3", fin_: "CNPq (Brasil) · PRÓ-AMAZONIA", ini: 2026, fin: 2028, ip: "William D. Carvalho", linea: "biogeografia", tipo: "internacional", eur: "80.000 €" },
  { t: "Impacto de los incendios sobre la calidad del aire y la fauna en el Pantanal y la Amazonía", ref: "CNPq 444435/2024-7", fin_: "CNPq (Brasil)", ini: 2025, fin: 2027, ip: "William D. Carvalho (co-IP)", linea: "vertebrados", tipo: "internacional", eur: "100.000 €" },
  { t: "Subida del nivel del mar, hábitats y vertebrados en el estuario del Amazonas", ref: "CNPq 444953/2024-8", fin_: "CNPq (Brasil)", ini: 2025, fin: 2027, ip: "William D. Carvalho (co-IP)", linea: "vertebrados", tipo: "internacional", eur: "80.000 €" },
  { t: "Un marco conceptual revisado sobre las lagunas de conocimiento de la biodiversidad global", ref: "CNPq 441125/2023-9", fin_: "CNPq (Brasil)", ini: 2024, fin: 2026, ip: "Richard J. Ladle; participa A. M. C. Santos", linea: "biogeografia", tipo: "internacional", eur: "≈50.500 €" },
  { t: "Living Corridors: personas, cultura y conservación para la conectividad ecológica", ref: "CIVIS Seed Fund 2025-0000000088", fin_: "Alianza CIVIS (UAM · Witwatersrand · Sapienza)", ini: 2025, fin: 2026, ip: "Cristina Mata", linea: "evaluacion", tipo: "internacional", eur: "11.100 €" },
  { t: "Interactive effects of local and landscape scale restoration of semi-natural grasslands", ref: "PCI2022-132961", fin_: "AEI · Biodiversa+", ini: 2022, fin: 2025, ip: "Juan Traba", linea: "agraria", tipo: "internacional" },
  { t: "Cátedra UAM-CTFC-TotalEnergies Steppe Forward", ref: "FUAM 066206", fin_: "TotalEnergies Renovables", ini: 2021, fin: 2026, ip: "Manuel B. Morales", linea: "agraria", tipo: "contrato", eur: "750.000 € + 100.000 € (renovación)" },
  { t: "Medidas agroambientales en zonas de interés para las aves esteparias (ZRAE) de Madrid", ref: "FUAM 066208", fin_: "GREFA · Terra Naturalis · Fundación Global Nature", ini: 2025, fin: 2026, ip: "Manuel B. Morales", linea: "agraria", tipo: "contrato", eur: "32.454 €" },
  { t: "Evaluación del sistema de detección de aves IdentiFlight® en parques eólicos", ref: "FUAM 0496/2024", fin_: "Zefiro Partners", ini: 2024, fin: 2026, ip: "Julia Gómez Catasús", linea: "evaluacion", tipo: "contrato", eur: "105.739 €" },
  { t: "Programa de medidas agroambientales para aves esteparias", ref: "FUAM 026113", fin_: "Contrato de transferencia", ini: 2021, fin: 2029, ip: "Juan Traba", linea: "agraria", tipo: "contrato" },
  { t: "Pantalla tubular anticolisión de avifauna para líneas de alta velocidad", ref: "UAM2024-UAM/213", fin_: "Contrato de transferencia", ini: 2024, fin: 2027, ip: "Jesús Herranz", linea: "evaluacion", tipo: "contrato" },
  { t: "Relaciones depredador-presa en la planta fotovoltaica Kappa", ref: "FUAM 095803", fin_: "Tramperase S.L.", ini: 2023, fin: 2024, ip: "Juan E. Malo", linea: "evaluacion", tipo: "contrato", eur: "24.527 €" },
  { t: "Estudio ecosistémico de la planta fotovoltaica de Navarredonda", ref: "FUAM", fin_: "EDP Renovables", ini: 2023, fin: 2024, ip: "Cristina Mata", linea: "evaluacion", tipo: "contrato", eur: "45.080 €" },
  { t: "Seguimiento del estado de conservación de la flora protegida de España", ref: "FUAM 027904", fin_: "SEBiCoP · Plan de Recuperación", ini: 2024, fin: 2025, ip: "Juan Carlos Moreno Saiz", linea: "biogeografia", tipo: "contrato", eur: "12.190 €" },
  { t: "Red centinela de impactos de la energía eólica sobre la fauna", ref: "TED2021-131388B-I00", fin_: "MICIN · Transición Ecológica", ini: 2022, fin: 2025, ip: "Ángel P. Pérez Olea", linea: "evaluacion", tipo: "nacional" },
  { t: "ELECTROSTEPPE", ref: "TED2021-130352B-I00", fin_: "MICIN · Transición Ecológica", ini: 2022, fin: 2025, ip: "", linea: "evaluacion", tipo: "nacional" },
  { t: "LIFE Impacto Cero: pantalla tubular antichoque para aves en alta velocidad", ref: "", fin_: "Comisión Europea · LIFE+", ini: 2013, fin: 2017, ip: "", linea: "evaluacion", tipo: "life" }
];

/* ---------- PUBLICACIONES ----------
   a: año · au: autores · t: título · r: revista o libro · v: volumen/páginas
   doi · q: cuartil ("Q1".."Q4", "" si no aplica) · oa: true si Open Access
   tipo: "art" (artículo) | "cap" (libro/capítulo) | "prensa"                 */
window.PUBLICACIONES = [
  { a: 2026, au: "Alencar-Silva, T.P.; …; Carvalho, W.D.", t: "Outcomes of wildlife rehabilitation vary by causes of admission for birds and mammals affected by human-wildlife impacts in southeastern Brazil", r: "Journal for Nature Conservation", v: "89: 127134", doi: "10.1016/j.jnc.2025.127134", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Bravo, C.; Traba, J.; Gómez-Catasús, J.", t: "Scientific synthesis of the International Congress on Palearctic Steppe Birds – Ciudad Real 2025: proposals and conclusions on steppe bird conservation", r: "Ardeola", v: "73: 2-14", doi: "10.13157/arla.73.2.2026.SI-fo1", q: "Q3", tipo: "art" },
  { a: 2026, au: "Bravo, C.; Velázquez, M.; Pérez-García, J.M.; Liu, J.; Landa-Barrio, M.; González del Portillo, D.; Morales, M.B.", t: "Diet of the Eurasian Stone-Curlew Burhinus oedicnemus based on stomach contents of birds killed by aircraft", r: "Ardeola", v: "73(2): 125-138", doi: "", q: "", tipo: "art" },
  { a: 2026, au: "Conde-Raposo, E.; Azcárate, F.M.; …; García-Cervigón, A.", t: "The value of old pine plantations in ants' conservation in the Mediterranean: a comparison with well-conserved forests", r: "Forest Ecology and Management", v: "606: 123556", doi: "10.1016/j.foreco.2026.123556", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Ferreira, M.M.; Bobrowiec, P.E.D.; Mustin, K.; Carvalho, W.D.", t: "Unveiling emerging trends and gaps in scientific research on vertebrate biodiversity in tropical savannahs", r: "Ecology and Evolution", v: "16(2): e72917", doi: "10.1002/ece3.72917", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Funosas, D.; Sebastián-González, E.; …; Barrero, A.; Traba, J.; …; Llusia, D.; Morales, M.B.; Acebes, P.; …; Pérez-Granados, C.", t: "A global assessment of BirdNET performance: differences among continents, biomes, and species", r: "Ecological Indicators", v: "182: 114550", doi: "10.1016/j.ecolind.2025.114550", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Genelhú, S.M.C.; Simões, M.H.; Assis, M.A.C.; Ribeiro, M.S.; Prous, X.; Carvalho, W.D.", t: "Diversidade de morcegos em cavernas de São Félix do Xingu, Pará: análise espacial e dinâmica sazonal", r: "Revista Brasileira de Espeleologia", v: "1(15): 191-243", doi: "10.37002/rbesp.v1i15.2950", q: "", oa: true, tipo: "art" },
  { a: 2026, au: "Goicolea, T.; …; Moreno, J.C.; Ramos-Gutiérrez, I.; …; Mateo, R.G.", t: "A unified plant ecology database for Spain", r: "Scientific Data", v: "13: 355", doi: "10.1038/s41597-026-06757-8", q: "Q1", tipo: "art" },
  { a: 2026, au: "Hernández-Cabello, J.; Rodríguez-Moreno, B.; Morales, M.B.; Garcés-Toledano, F.; Martínez-Dalmau, J.; Olea, P.P.", t: "Beyond the breeding grounds: identifying post-breeding staging areas, corridors and ecological niche of the Lesser Kestrel", r: "Ibis", v: "", doi: "10.1111/ibi.70082", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Hernández-Téllez, I.; González del Portillo, D.; Arroyo, B.; García de la Morena, E.; Mañosa, S.; Bota, G.; Morales, M.B.", t: "Impact of climate on the migration phenology of the endangered Little Bustard in Spain", r: "Ibis", v: "", doi: "10.1111/ibi.70096", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Jungkeit-Milla, K.; …; Franco-Múgica, F.; …; Gil-Romera, G.", t: "Introducing relative pollen productivity estimates for Iberian taxa: methodological insights and implications for landscape modelling in the Western Mediterranean", r: "Biogeosciences", v: "23: 6119-6147", doi: "10.5194/bg-23-6119-2026", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Llorente-Culebras, S.; Correia, R.; Menegotto, A.; Santos, A.M.C.; Ladle, R.J.", t: "Patterns and drivers of knowledge gaps in global databases of mammal traits", r: "Diversity and Distributions", v: "32: e70184", doi: "10.1111/ddi.70184", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Mattos, F.S.; Carvalho, W.D.; Hilário, R.R.", t: "Identifying the optimal sampling design for the inventorying and monitoring of medium- and large-sized mammals", r: "Hystrix, the Italian Journal of Mammalogy", v: "37(1)", doi: "10.4404/hystrix-00826-2025", q: "Q2", oa: true, tipo: "art" },
  { a: 2026, au: "Matthews, T.J.; …; Santos, A.M.C.; …; Faurby, S.", t: "Emergent patterns of island biodiversity in the Anthropocene", r: "Science Advances", v: "12(30): eaee1788", doi: "10.1126/sciadv.aee1788", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Mayordomo-Herranz, L.; Forgione Ciarrocchi, E.; Santos, A.M.C.; López-Baucells, A.; Menegotto, A.; Tena, E.; Carvalho, W.D.", t: "I need my green space: minimum urban green areas to maintain bat diversity and activity in a large European metropolis", r: "Urban Ecosystems", v: "29: 4", doi: "10.1007/s11252-025-01861-w", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Medrano-Vizcaíno, P.; Mougeot, F.; …; Morales, M.B.; Olea, P.P.; Traba, J.; Benítez-López, A.", t: "Identifying the exposure of taxonomic, functional, and phylogenetic diversity of steppe birds to renewable energy development", r: "Conservation Biology", v: "40: e70291", doi: "", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Mejia, P.; Carvalho, W.D.; Dáttilo, W.; Toledo, J.J.", t: "The role of precipitation and host assemblage composition in shaping bat–bat fly network structure", r: "Ecosphere", v: "17(8): e70734", doi: "10.1002/ecs2.70734", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Nascimento, Y.N.; Carvalho, W.D.; Mustin, K.", t: "Territórios quilombolas e conservação em ecossistemas pouco protegidos do Amapá", r: "Revista de Estudos Interdisciplinares", v: "8(3): 1-26", doi: "10.56579/rei.v8i3.3169", q: "", oa: true, tipo: "art" },
  { a: 2026, au: "Oyarzabal, G.; Cardoso, P.; Rigal, F.; Boieiro, M.; Santos, A.M.C.; …; Borges, P.A.V.", t: "Darwin's naturalization conundrum in the Azores: scale-dependent patterns of arthropod invasion", r: "Diversity and Distributions", v: "32: e70265", doi: "10.1111/ddi.70265", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Pérez-Granados, C.; Etxebarría, J.M.; …; Barrero, A.; Traba, J.; …; Llusia, D.; Morales, M.B.; Acebes, P.; …; Sebastián-González, E.", t: "WABAD: A World Annotated Bird Acoustic Dataset for Passive Acoustic Monitoring", r: "Ecology", v: "107(2): e70317", doi: "10.1002/ecy.70317", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Pozsgai, G.; Cardoso, P.; …; Santos, A.M.C.; …; Borges, P.A.V.", t: "Stability in the face of global decline: a 20-year study of arthropods in an oceanic archipelago", r: "Scientific Reports", v: "16: 27703", doi: "10.1038/s41598-026-57146-5", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Sánchez-Gracia, M.; Moreno-Saiz, J.C.; Fernández-Mazuecos, M.", t: "Tracing the origins of Mediterranean steppe flora: phylogenetics and biogeography of Iberian Astragalus sect. Platyglottis", r: "Organisms Diversity & Evolution", v: "26: 31-46", doi: "10.1007/s13127-026-00701-9", q: "Q4", oa: true, tipo: "art" },
  { a: 2026, au: "Solé-Bujalance, L.; Morales, M.B.; Bota, G.", t: "Home-range ecology of seven Palaearctic steppe bird species: a meta-analysis of spatial dimensions and ecological knowledge gaps", r: "Animal Biotelemetry", v: "", doi: "10.1186/s40317-026-00498-6", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Ramos-Gutiérrez, I.; Acedo, C.; Alfaro-Saiz, E.; …; Moreno-Saiz, J.C.", t: "AFLIBER v.2: updating the Iberian database of vascular plant distributions", r: "Mediterranean Botany", v: "47(2): e106425", doi: "10.5209/mbot.106425", q: "", oa: true, tipo: "art" },
  { a: 2026, au: "Ramos-Gutiérrez, I.; Pipins, S.; Molina-Venegas, R.; Fernández-Mazuecos, M.; Jiménez-Mejías, P.; Moreno-Saiz, J.C.; Forest, F.", t: "Priority areas for preserving angiosperm evolutionary history in the Iberian Peninsula", r: "Diversity and Distributions", v: "32(6): e70224", doi: "10.1111/ddi.70224", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Ruiz Daza, R.; Acebes, P.; Oñate, J.; Viñuela, J.; Blanco, J.V.; Olea, P.P.", t: "Efectos del abandono de la ganadería extensiva en la estructura y composición de comunidades de vertebrados necrófagos", r: "Ecosistemas", v: "35: 3088", doi: "10.7818/ECOS.3088", q: "Q4", oa: true, tipo: "art" },
  { a: 2026, au: "Shan, Y.; Gómez-Fernández, A.; Evers, J.; Freckleton, R.P.; Jones, G.E.; Milla, R.; Osborne, C.P.", t: "Evolution of competitiveness during wheat domestication", r: "Current Biology", v: "36: 1329-1338", doi: "10.1016/j.cub.2026.01.061", q: "Q1", tipo: "art" },
  { a: 2026, au: "Vizuete, B.; García-Llorente, M.; …; Azcárate, F.M.; Hevia, V.; …; Oteros-Rozas, E.", t: "Agroecological transition in Madrid's extensive livestock systems: how expert-perceived NCPs guide transformation pathways", r: "Ambio", v: "55: 2266-2280", doi: "10.1007/s13280-026-02361-7", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Wallon, S.; Leite, A.; Dueñas-Rojas, A.; Cuesta, E.; Santos, A.M.C.; Borges, P.A.V.", t: "Seasonal variation of dung-associated arthropods in cattle pastures of Terceira Island (Azores): a year-round, event-based dataset", r: "Biodiversity Data Journal", v: "14: e186171", doi: "10.3897/BDJ.14.e186171", q: "Q2", tipo: "art" },
  { a: 2026, au: "Xavier, B.S.; Mustin, K.; …; Santos, A.M.C.; Vieira, M.V.; Carvalho, W.D.", t: "Replacing natural savannas with eucalyptus or soybeans leads to a change in the use of the matrix and taxonomic and functional erosion of bat diversity in Amazonian savannas", r: "Agriculture, Ecosystems & Environment", v: "396: 109995", doi: "10.1016/j.agee.2025.109995", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Xavier, B.S.; Vizentin-Bugoni, J.; …; Vieira, M.V.; Carvalho, W.D.", t: "Replacing the natural savanna matrix with eucalyptus plantations and soybean fields changes the seed rain promoted by bats in Amazonian savannas", r: "Biological Conservation", v: "313: 111510", doi: "10.1016/j.biocon.2025.111510", q: "Q1", oa: true, tipo: "art" },
  { a: 2026, au: "Zhumi-Deleg, G.; López-Tello, E.; Carvalho, W.D.; Flores-Ramírez, D.; López-Téllez, C.; Mandujano, S.", t: "Changes in activity patterns of wild mammals related to human disturbance in dry tropical forest of Mexico", r: "Mammal Research", v: "71: 48", doi: "10.1007/s13364-026-00869-7", q: "Q2", oa: true, tipo: "art" },
  { a: 2026, au: "Adania, C.H.; Silva, J.C.R.; Felippe, P.A.N.; Filoni, C.; Carvalho, W.D.", t: "Carnivora – Felidae (Onça, Suçuarana, Jaguatirica e Gatos-do-mato)", r: "Tratado de Animais Selvagens – Medicina Veterinária, 3ª ed. Guanabara Koogan", v: "Vol. 1: 910-944", doi: "", tipo: "cap" },
  { a: 2026, au: "Ascensão, F.; Barrientos, R.; Ford, A.; …; Malo, J.E.; …; D'Amico, M.", t: "Charting the path ahead: key research priorities in road ecology", r: "Road Ecology. Synthesis and Perspectives. Springer", v: "Cap. 50", doi: "10.1007/978-3-032-16641-8", tipo: "cap" },
  { a: 2026, au: "Barrientos, R.; Malo, J.E.", t: "Road impacts on population persistence", r: "Road Ecology. Synthesis and Perspectives. Springer", v: "Cap. 12", doi: "10.1007/978-3-032-16641-8", tipo: "cap" },
  { a: 2026, au: "Martín Azcárate, F.", t: "Aprender a convivir con el fuego", r: "El País (Tribuna), 30 de julio", v: "", url: "https://elpais.com/opinion/2026-07-30/aprender-a-convivir-con-el-fuego.html", tipo: "prensa" },
  { a: 2026, au: "Manzano Baena, P.; Martín Azcárate, F.", t: "Lecciones de la sabana africana para las áreas quemadas", r: "El País (Tribuna), 24 de octubre", v: "", url: "https://elpais.com/clima-y-medio-ambiente/2026-10-24/lecciones-de-la-sabana-africana-para-las-areas-quemadas.html", tipo: "prensa" },
  { a: 2026, au: "Carvalho, W.D.; Mayordomo-Herranz, L.", t: "Hagan caso a los murciélagos en Madrid: son «fascinantes» y controlan las plagas", r: "El País, 9 de marzo", v: "", url: "https://elpais.com/espana/madrid/2026-03-09/hagan-caso-a-los-murcielagos-en-madrid-son-fascinantes-y-controlan-las-plagas.html", tipo: "prensa" },

  { a: 2024, au: "Barrero, A.; Gómez-Catasús, J.; Pérez-Granados, C.; Bustillo-de la Rosa, D.; Traba, J.", t: "Conspecific density and habitat quality drive the defence and vocal behaviour of a territorial passerine", r: "Ibis", v: "166(3): 826-843", doi: "10.1111/ibi.13295", tipo: "art" },
  { a: 2024, au: "Barrero, A.; Traba, J.; Tarjuelo, R.", t: "Increased density of conspecifics caused niche contraction in a multispecific passerine assemblage", r: "Ecology", v: "105(5): e4296", doi: "10.1002/ecy.4296", tipo: "art" },
  { a: 2024, au: "Bustillo-de la Rosa, D.; Barrero, A.; Traba, J.; García, J.T.; Morales, M.B.; Vázquez-Domínguez, E.", t: "Landscape features influencing gene flow and connectivity of an endangered passerine", r: "Ecology and Evolution", v: "14(5): e11078", doi: "10.1002/ece3.11078", tipo: "art" },
  { a: 2024, au: "Cabodevilla, X.; Malo, J.E.; Aguirre de Cárcer, D.; Zurdo, J.; Chaboy-Cansado, R.; Rastrojo, A.; García, F.J.; Traba, J.", t: "Zoonotic potential of urban wildlife faeces, assessed through metabarcoding", r: "Science of the Total Environment", v: "952: 175866", doi: "10.1016/j.scitotenv.2024.175866", tipo: "art" },
  { a: 2024, au: "Falcão Rodrigues, L.; Mata Estacio, C.; Herranz Barrera, J.; Santamaría Figueroa, A.E.; Malo Arrázola, J.E.", t: "High-speed railway infrastructure leads to species-specific changes and biotic homogenisation in surrounding bird community", r: "PLoS One", v: "19(4): e0301899", doi: "10.1371/journal.pone.0301899", tipo: "art" },
  { a: 2024, au: "Gómez-Catasús, J.; Morales, M.B.; Giralt, D.; González del Portillo, D.; …; Traba, J.; Bota, G.", t: "Solar photovoltaic energy development and biodiversity conservation: current knowledge and research gaps", r: "Conservation Letters", v: "17(4): e13025", doi: "10.1111/conl.13025", tipo: "art" },
  { a: 2024, au: "González del Portillo, D.; Morales, M.B.; Arroyo, B.", t: "Temporal trends of land-use favourability for the strongly declining little bustard: assessing the role of protected areas", r: "PeerJ", v: "12: e16661", doi: "10.7717/peerj.16661", tipo: "art" },
  { a: 2024, au: "Guerrero, I.; Duque, D.; Oñate, J.J.; …; Morales, M.B.", t: "Agricultural intensification affects birds' trait diversity across Europe", r: "Basic and Applied Ecology", v: "74: 40-48", doi: "10.1016/j.baae.2023.11.007", tipo: "art" },
  { a: 2024, au: "Iglesias-Merchán, C.; Llusia, D.; Márquez, R.", t: "Importance of the receiver's height for transmission studies in acoustic ecology", r: "Journal of the Acoustical Society of America", v: "155(3): 2065-2074", doi: "10.1121/10.0025286", tipo: "art" },
  { a: 2024, au: "Illera, J.C.; …; Seoane, J.; Carrascal, L.M.", t: "Collapse of an insular bird species driven by a decrease in rainfall", r: "Science of the Total Environment", v: "957: 177888", doi: "10.1016/j.scitotenv.2024.177888", tipo: "art" },
  { a: 2024, au: "Llorente-Culebras, S.; Carmona, C.P.; Carvalho, W.D.; Menegotto, A.; Molina-Venegas, R.; Ladle, R.J.; Santos, A.M.C.", t: "Island biodiversity in peril: anticipating a loss of mammals' functional diversity with future species extinctions", r: "Global Change Biology", v: "30(6): e17375", doi: "10.1111/gcb.17375", tipo: "art" },
  { a: 2024, au: "Llusia, D.", t: "The limits of acoustic indices", r: "Nature Ecology & Evolution", v: "8(4): 606-607", doi: "10.1038/s41559-024-02348-1", tipo: "art" },
  { a: 2024, au: "Mata, C.; González, B.A.; Donoso, D.S.; Fuentes-Allende, N.; Estades, C.F.; Malo, J.E.", t: "Ecological connectivity of vicuña (Vicugna vicugna) in a remote area of Chile and conservation implications", r: "Land", v: "13(4): 472", doi: "10.3390/land13040472", tipo: "art" },
  { a: 2024, au: "Méndez, D.; Vargas, F.H.; Sarasola, J.H.; Olea, P.P.", t: "Validating the concept of top scavenger: the Andean Condor as a model species", r: "Royal Society Open Science", v: "11(7): 240409", doi: "10.1098/rsos.240409", tipo: "art" },
  { a: 2024, au: "Mezquida, E.T.; Olano, J.M.", t: "Spatial and temporal variation in the antagonistic and mutualistic interactions among seed predator arthropods, seed-dispersing birds, and the Spanish juniper", r: "Insects", v: "15(8): 620", doi: "10.3390/insects15080620", tipo: "art" },
  { a: 2024, au: "Molina-Venegas, R.", t: "How to get the most out of phylogenetic imputation without abusing it", r: "Methods in Ecology and Evolution", v: "15(3): 456-463", doi: "10.1111/2041-210X.14198", tipo: "art" },
  { a: 2024, au: "Olea, P.P.; de Diego, N.; García, J.T.; Viñuela, J.", t: "Habitat type modulates sharp body mass oscillations in cyclic common vole populations", r: "Scientific Reports", v: "14: 12013", doi: "10.1038/s41598-024-62687-8", tipo: "art" },
  { a: 2024, au: "Ramón-Martínez, D.; Seoane, J.", t: "Changes in thermal niche position and breadth of bird assemblages in Spain in relation to increasing temperatures", r: "Journal of Biogeography", v: "51(5)", doi: "10.1111/jbi.14779", tipo: "art" },
  { a: 2024, au: "Rodríguez Ballesteros, A.; Desjonquères, C.; Hevia, V.; García Llorente, M.; Ulloa, J.S.; Llusia, D.", t: "Towards acoustic monitoring of bees: wingbeat sounds are related to species and individual traits", r: "Philosophical Transactions of the Royal Society B", v: "379(1904): 20230111", doi: "10.1098/rstb.2023.0111", tipo: "art" },
  { a: 2024, au: "Serrano, A.R.; Peco, B.; Morillo, J.A.; Ochoa-Hueso, R.", t: "Abandonment of traditional livestock grazing reduces soil fertility and enzyme activity, alters soil microbial communities, and decouples microbial networks in Mediterranean grasslands", r: "Agriculture, Ecosystems & Environment", v: "366: 108932", doi: "10.1016/j.agee.2024.108932", tipo: "art" },
  { a: 2024, au: "Solascasas, P.; Hevia, V.; Ochoa-Hueso, R.; Azcárate, F.M.", t: "Land use change of transhumant drove roads leads to soil quality degradation: a case study in Central Spain", r: "Applied Soil Ecology", v: "196: 105308", doi: "10.1016/j.apsoil.2024.105308", tipo: "art" },
  { a: 2024, au: "Xirocostas, Z.A.; Ollerton, J.; Peco, B.; …; Moles, A.T.", t: "Introduced species shed friends as well as enemies", r: "Scientific Reports", v: "14: 11088", doi: "10.1038/s41598-024-61788-8", tipo: "art" },
  { a: 2024, au: "Zurdo, J.; Bustillo-de la Rosa, D.; Barrero, A.; Gómez-Catasús, J.; Reverter, M.; …; Morales, M.B.; Traba, J.", t: "Spatio-temporal variation of the endangered Dupont's lark diet across Iberia and Morocco", r: "PLoS One", v: "19(12): e0301318", doi: "10.1371/journal.pone.0301318", tipo: "art" },
  { a: 2024, au: "Sáez-Gómez, P.; Canessa, S.; …; Reverter, M.; Traba, J.", t: "Programa de translocación 2023-2026 para la alondra ricotí en el marco del proyecto LIFE Connect Ricotí", r: "Libro · ISBN 978-84-09-59591-4", v: "", doi: "", tipo: "cap" }
];

/* ---------- TESIS ----------
   estado: "leida" | "curso" · fecha: fecha de lectura o prevista              */
window.TESIS = [
  { estado: "leida", autor: "Marcelo Martins Ferreira", t: "Uncovering the soundscape of the Amazonian savannas", dir: "W. D. Carvalho, P. E. D. Bobrowiec y D. Llusia", fecha: "28/05/2026", prog: "INPA (Brasil)" },
  { estado: "leida", autor: "Julia Zurdo Jordá", t: "Trophic ecology of steppe passerines: a molecular approach", dir: "J. Traba y M. B. Morales", fecha: "2024", prog: "Ecología UAM", url: "http://hdl.handle.net/10486/715184" },
  { estado: "leida", autor: "Alexander García Antón", t: "Macroecología y conservación de la alondra ricotí Chersophilus duponti", dir: "J. Traba", fecha: "2024", prog: "Ecología UAM", url: "http://hdl.handle.net/10486/715149" },
  { estado: "leida", autor: "Margarita Reverter Cid", t: "Ecological foundations for the restoration of Iberian shrub-steppes", dir: "J. Traba y C. Pérez-Granados", fecha: "2024", prog: "Ecología UAM", url: "http://hdl.handle.net/10486/715170" },
  { estado: "curso", autor: "Ana Santos Torres", t: "Impact of conservation actions towards Dupont's lark on other non-target species", dir: "A. M. C. Santos y J. Gómez Catasús", fecha: "dic. 2026", prog: "Ecología UAM" },
  { estado: "curso", autor: "Yuri Nascimento do Nascimento", t: "Local perspectives on conservation and sustainable development in the savannahs of Amapá", dir: "W. D. Carvalho y K. Mustin", fecha: "nov. 2026", prog: "UNIFAP (Brasil)" },
  { estado: "curso", autor: "Diego Méndez", t: "Ecology of movement in New World vultures", dir: "P. P. Olea y J. H. Sarasola", fecha: "2026", prog: "Biología UAM" },
  { estado: "curso", autor: "José Andrés Salazar Zúñiga", t: "Factores ambientales, depredación y fenología reproductiva en una comunidad de Phyllomedusinae", dir: "D. Llusia e I. de la Riva", fecha: "2026", prog: "Ecología UAM" },
  { estado: "curso", autor: "Geane Rodrigues de Souza", t: "Monitoramento acústico de comunidades de anuros no Estado de Goiás", dir: "R. P. Bastos y D. Llusia", fecha: "2026", prog: "UFG (Brasil)" },
  { estado: "curso", autor: "Irene Julián Posadas", t: "Interacciones a largo plazo entre vegetación, humanos y clima en el piso subalpino del Pirineo sur", dir: "P. González-Sampériz y G. Gil Romera (tutora: F. Franco)", fecha: "ene. 2027", prog: "Ecología UAM" },
  { estado: "curso", autor: "Eduardo Rodrigues dos Santos", t: "Impacts of the sugar and alcohol industry in Brazil on biodiversity and rural communities", dir: "W. D. Carvalho y K. Mustin", fecha: "feb. 2027", prog: "UNIFAP (Brasil)" },
  { estado: "curso", autor: "Victoria Cumia Espinosa de los Monteros", t: "FrogNet: desarrollo de nuevas tecnologías para el seguimiento automático de biodiversidad", dir: "D. Llusia y E. García de la Morena", fecha: "2027", prog: "Ecología UAM · Doctorado industrial" },
  { estado: "curso", autor: "Fábio de Souza Mattos", t: "Spatiotemporal relationships between detections from line transect surveys and camera traps", dir: "W. D. Carvalho y R. Hilário", fecha: "sep. 2027", prog: "UNIFAP (Brasil)" },
  { estado: "curso", autor: "Daniela Aparecida Savariz Bôlla", t: "Human-driven impacts on bat health and distribution in Brazilian Amazonia", dir: "W. D. Carvalho y P. Pequeno", fecha: "dic. 2027", prog: "INPA (Brasil)" },
  { estado: "curso", autor: "Almudena Dueñas Rojas", t: "Cambio global, ensamblaje de comunidades y funciones de los escarabajos coprófagos", dir: "A. M. C. Santos y P. A. V. Borges", fecha: "abr. 2028", prog: "Ecología UAM" },
  { estado: "curso", autor: "Juan Pascual Gil de Gómez", t: "Efectos del fuego sobre las hormigas a nivel ecosistémico: ¿resiliencia mediterránea?", dir: "F. M. Azcárate y X. Cerdá", fecha: "abr. 2028", prog: "Ecología UAM" },
  { estado: "curso", autor: "Jaime Valera Gallego", t: "BeeSound: towards acoustic monitoring of bees", dir: "D. Llusia y V. Hevia", fecha: "2028", prog: "Ecología UAM" },
  { estado: "curso", autor: "Griselda Zárate Betzel", t: "Monitoreo acústico de ensamblajes de anuros de los humedales de Ñeembucú, Paraguay", dir: "D. Llusia y L. S. M. Sugai", fecha: "2028", prog: "Ecología UAM" },
  { estado: "curso", autor: "Fernando Rivada Álvarez", t: "Origen de Ranavirus e impacto en anfibios, reptiles y piscifactorías de España", dir: "J. Bosch y A. Machordom (tutora: J. Gómez Catasús)", fecha: "2028", prog: "Ecología UAM" },
  { estado: "curso", autor: "Fillipe Pedroso dos Santos", t: "Amazonian anurans: gaps in knowledge, patterns of diversity and rarity", dir: "W. D. Carvalho y R. Hilário", fecha: "dic. 2028", prog: "UNIFAP (Brasil)" },
  { estado: "curso", autor: "Beatriz Rodríguez Moreno", t: "Ecología de la migración estival del cernícalo primilla en la Península Ibérica", dir: "P. P. Olea y M. B. Morales", fecha: "", prog: "Ecología UAM" },
  { estado: "curso", autor: "Laura Solé Bujalance", t: "Interacción entre aves y desarrollos fotovoltaicos: lecciones para la planificación territorial", dir: "G. Bota y M. B. Morales", fecha: "", prog: "Ecología UAM · Cátedra Steppe Forward" },
  { estado: "curso", autor: "Javier Hernández Cabello", t: "Ecología del movimiento post-reproductor y migración estival en un contexto de cambio global", dir: "M. B. Morales y P. P. Olea", fecha: "", prog: "Ecología UAM · Cátedra Steppe Forward" },
  { estado: "curso", autor: "Rocío Ruiz Daza", t: "Abandono de la ganadería, necrófagos y servicios ecosistémicos", dir: "P. P. Olea y P. Acebes", fecha: "", prog: "Ecología UAM · Contrato predoctoral CAM" },
  { estado: "curso", autor: "Catalina Pérez García", t: "Perturbaciones antrópicas y perezosos silvestres en Costa Rica", dir: "P. Acebes y R. Cliffe", fecha: "", prog: "Ecología UAM" },
  { estado: "curso", autor: "Noelia de Diego", t: "Papel de la comadreja en el control biológico del topillo campesino", dir: "J. T. García, F. Díaz y P. P. Olea", fecha: "", prog: "UCLM" },
  { estado: "curso", autor: "Lidia Mayordomo Herranz", t: "Environmental and anthropogenic drivers of bat diversity and distribution in Spain", dir: "W. D. Carvalho", fecha: "2030", prog: "Ecología UAM" },
  { estado: "curso", autor: "Angélica Viviana Yantén Arévalo", t: "Bat conservation in Amazonian savannas: ecological and social dimensions", dir: "W. D. Carvalho y P. E. D. Bobrowiec", fecha: "jul. 2030", prog: "INPA (Brasil)" }
];

/* ---------- NOVEDADES / HITOS ----------  (más reciente primero)        */
window.NOVEDADES = [
  { fecha: "2026", tipo: "Premio", t: "Premio Andrés Barbosa a la mejor tesis en Ornitología", txt: "David González del Portillo recibe el premio de SEO/BirdLife a la mejor tesis doctoral en Ornitología.", img: "img/linea-agraria.jpg" },
  { fecha: "2026", tipo: "Premio", t: "American Journal of Botany Synthesis Prize", txt: "Reconocimiento a A. Gómez-Fernández por su trabajo de síntesis en botánica.", img: "img/linea-pastizales.jpg" },
  { fecha: "jul. 2026", tipo: "Proyecto", t: "Arranca LIFE Iber-Ricotí", txt: "Nuevo LIFE de casi 15 M€ para la alondra ricotí, con la coordinación científica en el TEG.", img: "img/proy-1.jpg", url: "https://www.uam.es/ciencias/facultad/noticias/iber-ricoti" },
  { fecha: "2026", tipo: "Ciencia abierta", t: "WABAD y BirdNET: la acústica de aves, a escala global", txt: "Miembros del grupo firman la mayor base mundial de grabaciones anotadas y la evaluación global de BirdNET.", img: "img/campo-1.jpg" },
  { fecha: "jul.–oct. 2026", tipo: "Divulgación", t: "El TEG en El País", txt: "Tribunas sobre incendios y artículos sobre murciélagos urbanos en Madrid.", img: "img/campo-3.jpg" }
];
