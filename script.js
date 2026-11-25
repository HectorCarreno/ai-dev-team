/* ==========================================================================
   AI.DEV // PLAYBOOK — Interactive Educational Website Logic & Animations
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     0. i18n Dictionary (EN default cached from DOM + ES translations)
     ------------------------------------------------------------------------ */
  const esTranslations = {
    "doc.title": "AI.DEV // Primeros Pasos con IA en un Equipo de Desarrollo",
    "nav.foundations": "Fundamentos",
    "nav.models": "Modelos",
    "nav.concepts": "Conceptos",
    "nav.harnesses": "Harnesses",
    "nav.setup": "Lab de Setup",
    "nav.security": "Seguridad",
    "nav.rollout": "Despliegue",

    "hero.badge": "GUÍA DE INGENIERÍA EN EQUIPO · EDICIÓN INTERACTIVA",
    "hero.title": 'Primeros Pasos con <span class="gradient-text">Agentes de IA</span> en un Equipo Dev',
    "hero.lead": "Guía práctica de alto nivel técnico sobre harnesses, enrutamiento de modelos, skills reutilizables, subagentes, permisos y adopción segura.",
    "hero.cta1": "Explorar Lab de Setup",
    "hero.cta2": "Iniciar Currículo",
    "hero.m1": "Harnesses Cubiertos<br><small>Claude · OpenCode · Pi</small>",
    "hero.m2": "Módulos Clave<br><small>Labs Interactivos</small>",
    "hero.m3val": "4-Sem",
    "hero.m3": "Despliegue Seguro<br><small>Piloto a Producción</small>",
    "term.ready": "LISTO",

    "curr.1": "Harness y Modelos",
    "curr.2": "Calidad vs Precio y Local",
    "curr.3": "Skills, Agentes y Ciclo",
    "curr.4": "Harnesses Populares",
    "curr.5": "Lab de Setup: Claude / OpenCode / Pi",
    "curr.6": "Permisos y Seguridad",
    "curr.7": "Reglas Base y Despliegue",

    "fnd.kicker": "01 · Fundamentos",
    "fnd.title": "¿Qué es un harness? ¿Qué es un modelo?",
    "fnd.sub": "Haz clic en cualquier capa del flujo para inspeccionar cómo viaja tu prompt de forma segura hasta tu repositorio.",
    "fnd.traceBtn": "▶ Trazar Flujo de Solicitud",
    "fnd.hint": "o haz clic en cualquier nodo para inspeccionar",
    "fnd.n1badge": "ENTRADA",
    "fnd.n1title": "Tú",
    "fnd.n1sub": "Intención y tarea",
    "fnd.n2badge": "RUNTIME",
    "fnd.n2title": "Harness",
    "fnd.n2sub": "tools, memoria, reglas",
    "fnd.n3badge": "CEREBRO",
    "fnd.n3title": "Modelo",
    "fnd.n3sub": "razonamiento y código",
    "fnd.n4badge": "MANOS",
    "fnd.n4title": "Herramientas",
    "fnd.n4sub": "archivos, shell, git, web",
    "fnd.n5badge": "DESTINO",
    "fnd.n5title": "Nuestro Repo",
    "fnd.n5sub": "rama, tests, PR",
    "fnd.c1tag": "Modelo",
    "fnd.c1title": "Decide la inteligencia y calidad del código",
    "fnd.c1body": "Claude, GPT, Gemini, DeepSeek, Qwen. El modelo razona sobre el contexto, planifica cambios y genera texto, parches y llamadas a herramientas.",
    "fnd.c2tag": "Harness",
    "fnd.c2title": "Decide seguridad, contexto y capacidades",
    "fnd.c2body": "Claude Code, OpenCode, Pi. El harness carga <code>AGENTS.md</code>, aplica permisos allow/deny, ejecuta herramientas y gestiona subagentes.",

    "mod.kicker": "02 · Modelos y Enrutamiento",
    "mod.title": "Modelos populares: calidad vs. precio",
    "mod.sub": "Elige modelos según la complejidad de la tarea y la privacidad, no por moda. Filtra la matriz abajo.",
    "mod.fAll": "Todos los Modelos",
    "mod.fHigh": "Flagship (Planificación)",
    "mod.fMed": "Equilibrado (Diario)",
    "mod.fLow": "Rápido y Abierto (Volumen / Local)",
    "mod.th1": "Familia",
    "mod.th2": "Fortaleza",
    "mod.th3": "Costo Relativo",
    "mod.th4": "Ideal Para",
    "mod.cHigh": "Alto",
    "mod.cMed": "Medio",
    "mod.cLow": "Bajo",
    "mod.cMedLow": "Medio – Bajo",
    "mod.cVLow": "Muy Bajo",
    "mod.r1s": "Máximo razonamiento, refactors grandes",
    "mod.r1g": "Arquitectura, bugs difíciles, planificación",
    "mod.r2s": "Mejor calidad por dólar para código",
    "mod.r2g": "Desarrollo diario de features, revisiones",
    "mod.r3s": "Rápido y económico",
    "mod.r3g": "Ediciones pequeñas, tareas de subagentes",
    "mod.r4s": "Fuerte en uso general y código; niveles mini",
    "mod.r4g": "Uso amplio, tareas sensibles al costo",
    "mod.r5s": "Contexto muy grande, buen valor",
    "mod.r5g": "Codebases grandes y documentación",
    "mod.r6s": "Pesos abiertos, precio muy bajo",
    "mod.r6g": "Trabajo masivo, presupuesto, auto-hospedado",
    "mod.r7s": "Modelos abiertos sólidos para código",
    "mod.r7g": "Entornos locales y sensibles a privacidad",
    "mod.note": "Los precios y rankings cambian con frecuencia. Verifica en los sitios de cada proveedor antes de presupuestar.",
    "mod.s1tag": "Costoso",
    "mod.s1title": "Mejor calidad",
    "mod.s1body": "Clase Opus o GPT-5 superior. Planificación, arquitectura y depuración compleja.",
    "mod.s2tag": "Por Defecto",
    "mod.s2title": "Mejor valor",
    "mod.s2body": "Sonnet, GPT-5 intermedio, Gemini Pro. La mayoría del código diario ocurre aquí.",
    "mod.s3tag": "Volumen",
    "mod.s3title": "Barato y rápido",
    "mod.s3body": "Haiku, mini, Flash, DeepSeek. Búsquedas, tests, boilerplate y subagentes.",
    "mod.l1tag": "Local / Auto-hospedado",
    "mod.l1title": "Ejecuta en tu propia máquina",
    "mod.l1body": "Modelos de pesos abiertos (DeepSeek, Qwen, Kimi, Llama) servidos vía Ollama, vLLM o servidor privado.",
    "mod.l1a": "Cero datos salen de la máquina",
    "mod.l1b": "Sin facturación por token",
    "mod.l1c": "Más lento y menos capaz que los modelos cloud top",
    "mod.l1d": "Requiere hardware y mantenimiento",
    "mod.l2tag": "Nube / API",
    "mod.l2title": "El proveedor ejecuta el modelo",
    "mod.l2body": "Claude, GPT, Gemini y otros mediante API o planes empresariales gestionados.",
    "mod.l2a": "Máxima calidad y mejora continua más rápida",
    "mod.l2b": "Pago por uso; el costo escala con la demanda",
    "mod.l2c": "El código puede salir de tu red",
    "mod.l2d": "Revisar términos de retención y entrenamiento",
    "mod.rKicker": "Simulador Interactivo",
    "mod.rTitle": "Enrutador de Flujo Equilibrado: Local vs. Nube",
    "mod.rSub": "Selecciona una tarea real de ingeniería para ver el nivel de modelo recomendado y su justificación.",
    "mod.rt1": "Explicar regex y utilidades heredadas",
    "mod.rt2": "Refactorizar middleware de auth en 12 archivos",
    "mod.rt3": "Generar boilerplate de DTOs y tipos",
    "mod.rt4": "Depurar condición de carrera intermitente",
    "mod.rt5": "Revisión de PR de seguridad y lógica",

    "con.kicker": "03 · Conceptos Clave",
    "con.title": "Tarea, skill, agente y memoria del proyecto",
    "con.sub": "Los cuatro bloques fundamentales que hacen predecibles a los agentes de IA en todo el equipo.",
    "con.c1tag": "01 · Unidad de Trabajo",
    "con.c1title": "Tarea",
    "con.c1body": "Una unidad acotada de trabajo con definición clara de terminado. Las tareas pequeñas tienen mucha mayor tasa de éxito.",
    "con.c2tag": "02 · Manual Reutilizable",
    "con.c2title": "Skill (<code>SKILL.md</code>)",
    "con.c2body": "Instrucciones reutilizables: cómo escribimos migraciones de BD, creamos endpoints API o ejecutamos tests E2E de forma consistente.",
    "con.c3tag": "03 · Contexto Aislado",
    "con.c3title": "Agente (Subagente)",
    "con.c3body": "Ventana de contexto separada con su propio rol, herramientas restringidas y modelo. Ejemplo: un revisor de PR de solo lectura.",
    "con.c4tag": "04 · Cerebro Compartido",
    "con.c4body": "Memoria del proyecto: comandos de build/test, convenciones, estructura de carpetas y reglas de no hacer. Se lee al iniciar cada sesión.",
    "con.loopKicker": "Pipeline Interactivo",
    "con.loopTitle": "El Ciclo de Desarrollo Asistido por IA",
    "con.loopBtn": "▶ Simular Ciclo",
    "con.ls1t": "Escribir Tarea",
    "con.ls1s": "Alcance acotado",
    "con.ls2t": "Planificar",
    "con.ls2s": "Modelo fuerte",
    "con.ls3t": "Implementar",
    "con.ls3s": "En una rama",
    "con.ls4t": "Correr Tests",
    "con.ls4s": "Tests + lint",
    "con.ls5t": "Revisar",
    "con.ls5s": "Agente + humano",
    "con.ls6t": "Pull Request",
    "con.ls6s": "Mismo CI",
    "con.stKicker": "Checklist Inicial",
    "con.stTitle": "Configuración mínima inicial",
    "con.st1": "Elige un harness y un modelo por defecto para el equipo",
    "con.st2": "Agrega <code>AGENTS.md</code> a cada repo: stack, comandos, estilo y rutas prohibidas",
    "con.st3": "Crea 2 o 3 skills para tus tareas más repetitivas",
    "con.st4": "Añade un agente revisor de solo lectura para pull requests",
    "con.st5": "Exige rama + tests + revisión humana para cada cambio de IA",
    "con.exKicker": "Explorador Interactivo",
    "con.exTitle": "Estructura genérica de repositorio",
    "con.exSub": "Haz clic en cualquier archivo para inspeccionar su función:",

    "har.kicker": "04 · Harnesses",
    "har.title": "Comparativa de harnesses populares",
    "har.sub": "Elige una herramienta principal para el equipo y evita la fragmentación de configuraciones.",
    "har.c1tag": "Código Cerrado",
    "har.c1body": "Agente de terminal e IDE de Anthropic. Fuertes permisos integrados, hooks, subagentes y skills. El inicio más simple si estandarizas en Claude.",
    "har.c2tag": "Open Source · MIT",
    "har.c2body": "Agente de terminal con amplio soporte de proveedores—incluyendo Anthropic, OpenAI, Gemini y modelos locales con Ollama. Ideal para evitar vendor lock-in.",
    "har.c3tag": "Open Source",
    "har.c3body": "Agente de terminal minimalista y extensible basado en <code>AGENTS.md</code>, extensiones TypeScript, plantillas de prompts, skills y subagentes.",
    "har.th1": "Capacidad",
    "har.r1": "Código abierto",
    "har.no": "No",
    "har.yes": "Sí",
    "har.r2": "Elección de modelos",
    "har.m1": "Principalmente Claude",
    "har.m2": "Múltiples proveedores + local",
    "har.r3": "Control de permisos",
    "har.p1": "Fuerte, integrado",
    "har.p2": "Integrado (<code>opencode.json</code>)",
    "har.p3": "Vía extensiones TypeScript y ajustes",
    "har.r4": "Skills y subagentes",
    "har.sk1": "Sí (<code>.claude/</code>)",
    "har.sk2": "Sí (<code>.opencode/</code>)",
    "har.sk3": "Sí (<code>.pi/</code>)",
    "har.r5": "Curva de aprendizaje",
    "har.lc1": "Baja",
    "har.lc2": "Baja a media",
    "har.lc3": "Media",
    "har.r6": "Ideal para",
    "har.bf1": "Flujo pulido con Claude",
    "har.bf2": "Libertad de proveedores",
    "har.bf3": "Flujo minimalista personalizable",

    "lab.kicker": "05 · Lab Práctico de Setup",
    "lab.title": "Ejemplos de configuración: Claude, OpenCode y Pi",
    "lab.sub": "Cambia entre harnesses para inspeccionar archivos reales de configuración, subagentes, skills y ejecutar una simulación interactiva.",
    "lab.filesHead": "ARCHIVOS DEL PROYECTO",
    "lab.copy": "Copiar",
    "lab.simKicker": "Vista Previa en Vivo",
    "lab.simTitle": "Simular Setup del Agente y Ejecución de Subagente",
    "lab.runBtn": "▶ Ejecutar Simulación",
    "lab.resetBtn": "↺ Reiniciar",

    "sec.kicker": "06 · Seguridad y Permisos",
    "sec.title": "Niveles de permiso y reglas deny-by-default",
    "sec.sub": "Comienza en Edición Supervisada. Prueba cómo una política deny-by-default evalúa comandos reales abajo.",
    "sec.l1tag": "Nivel 1",
    "sec.l1title": "Solo lectura",
    "sec.l1body": "Solo leer y buscar código. Ideal para revisiones de PR, investigación y preguntas de onboarding.",
    "sec.l2tag": "Nivel 2 · Por Defecto",
    "sec.l2title": "Edición supervisada",
    "sec.l2body": "Edita archivos libremente; pide aprobación humana para cada comando shell. Opción por defecto.",
    "sec.l3tag": "Nivel 3",
    "sec.l3title": "Auto acotado",
    "sec.l3body": "Edición + comandos permitidos (<code>npm test</code>, <code>lint</code>). Tareas rutinarias en sandbox.",
    "sec.l4tag": "Nivel 4",
    "sec.l4title": "Auto completo",
    "sec.l4body": "Ejecución sin restricciones. Solo en sandboxes desechables—nunca con credenciales reales.",
    "sec.ptKicker": "Probador Interactivo de Políticas",
    "sec.ptTitle": "Prueba una Política Deny-by-Default",
    "sec.ptSub": "Haz clic en cualquier acción para ver cómo el harness la evalúa contra las reglas allow/deny.",
    "sec.ptBadge": "SELECCIONA UN COMANDO",
    "sec.ptPlaceholder": "Haz clic en una llamada de herramienta a la izquierda para evaluarla contra las reglas.",
    "sec.thKicker": "Modelo de Amenazas",
    "sec.thTitle": "Amenazas a conocer",
    "sec.th1t": "Inyección de prompts",
    "sec.th1d": "Instrucciones ocultas en issues, docs, páginas web o dependencias pueden desviar al agente.",
    "sec.th2t": "Plugins / MCP maliciosos",
    "sec.th2d": "Audita cada herramienta, skill y extensión como una dependencia de producción; fija versiones.",
    "sec.th3t": "Paquetes alucinados",
    "sec.th3d": "Verifica que cada nueva dependencia exista realmente y tenga mantenimiento activo.",
    "sec.th4t": "Debilitamiento silencioso",
    "sec.th4d": "Los agentes pueden desactivar tests para pasar. Protege tests y config de CI con code owners.",
    "sec.dpKicker": "Protección de Datos",
    "sec.dpTitle": "Secretos y manejo de datos",
    "sec.dp1": "Mantén archivos <code>.env</code>, llaves y tokens fuera de rutas legibles",
    "sec.dp2": "Usa tokens de corta duración y alcance acotado—nunca credenciales admin de producción",
    "sec.dp3": "Revisa términos de retención y entrenamiento del proveedor; prefiere planes enterprise",
    "sec.dp4": "Ejecuta un escáner de secretos (ej. <code>gitleaks</code>) en pre-commit y CI",
    "sec.dp5": "Restringe la salida de red desde sandboxes hacia hosts permitidos",
    "sec.clKicker": "Preparación del Equipo",
    "sec.clTitle": "Checklist de ruta segura",
    "sec.clScore": "Preparación:",
    "sec.cl1": "El agente trabaja en una rama o worktree, nunca directo en <code>main</code>",
    "sec.cl2": "Reglas deny cubren secretos, infra de prod y <code>git push</code>",
    "sec.cl3": "Hooks pre-commit ejecutan escaneo de secretos, lint y tests unitarios",
    "sec.cl4": "CI exige checks aprobados y aprobación de code-owner en rutas sensibles",
    "sec.cl5": "Logs de sesión y comandos se guardan para auditoría donde sea compatible",
    "sec.cl6": "Política escrita del equipo define qué datos pueden entrar en los prompts",

    "rol.kicker": "07 · Gobernanza y Despliegue",
    "rol.title": "Antes de empezar y despliegue en 4 semanas",
    "rol.sub": "Controles, propiedad del código y una ruta medida de 4 semanas del piloto al estándar del equipo.",
    "rol.g1tag": "Política y Personas",
    "rol.g1title": "Reglas base",
    "rol.g1aT": "Uso aceptable",
    "rol.g1aD": "Clasifica datos (público, interno, confidencial, regulado) y define límites de prompts.",
    "rol.g1bT": "Herramientas aprobadas",
    "rol.g1bD": "Revisión de proveedor: residencia de datos, GDPR, retención y términos contractuales.",
    "rol.g1cT": "Propiedad",
    "rol.g1cD": "El desarrollador que abre el PR es dueño del código. La IA nunca es autora responsable.",
    "rol.g1dT": "Licencias e IP",
    "rol.g1dD": "Revisa licencias de dependencias y similitud de código generado; involucra a legal si hace falta.",
    "rol.g2tag": "Proceso y Métricas",
    "rol.g2title": "Cómo medimos",
    "rol.g2aT": "Métricas base",
    "rol.g2aD": "Mide tiempo de ciclo, rondas de revisión, defectos escapados y esfuerzo por tarea primero.",
    "rol.g2bT": "Piloto de bajo riesgo",
    "rol.g2bD": "Comienza en un repo con buena cobertura de tests, dueño claro y sin ruta crítica de prod.",
    "rol.g2cT": "Límites de costo",
    "rol.g2cD": "Configura presupuestos por usuario, dashboards de uso y alertas desde el día uno.",
    "rol.g2dT": "Cultura opt-in",
    "rol.g2dD": "Comparte lo que funciona en un log del equipo; revisa <code>AGENTS.md</code> en retrospectivas.",
    "rol.w1tag": "Revisión Senior",
    "rol.w1title": "Lógica de alto riesgo",
    "rol.w1body": "Autenticación, autorización, criptografía, pagos y borrado de datos.",
    "rol.w2tag": "Evitar Sin Supervisión",
    "rol.w2title": "Operaciones críticas",
    "rol.w2body": "Hotfixes en producción, cambios de infraestructura y migraciones sobre datos reales.",
    "rol.w3tag": "Victorias Tempranas",
    "rol.w3title": "Buenas tareas iniciales",
    "rol.w3body": "Tests unitarios, docs, refactors respaldados por tests, boilerplate y explicación de código.",
    "rol.w4tag": "Antipatrones",
    "rol.w4title": "Qué evitar",
    "rol.w4body": "Mergear código sin leerlo, debilitar tests que fallan o saltarse la revisión de PR.",
    "rol.exKicker": "Plan de Ejecución",
    "rol.exTitle": "Despliegue Interactivo en 4 Semanas",
    "rol.exSub": "Haz clic en cada semana para ver hitos y criterios de salida.",
    "rol.wk1": "Semana 1 · Piloto",
    "rol.wk2": "Semana 2 · Skills y Agentes",
    "rol.wk3": "Semana 3 · Equipo y CI",
    "rol.wk4": "Semana 4 · Medir y Decidir",
    "rol.clKicker": "Próximos Pasos",
    "rol.clTitle": "Empecemos con seguridad",
    "rol.cl1": "Acordar la política de uso aceptable y herramientas aprobadas esta semana",
    "rol.cl2": "Elegir el repo piloto y de 2 a 3 desarrolladores piloto",
    "rol.cl3": "Capturar métricas base antes de la primera tarea asistida por IA",
    "rol.clBtn": "Volver al Lab de Setup ↑",

    "footer.left": "AI.DEV // PLAYBOOK — Guía Educativa de Ingeniería",
    "footer.right": "Diseñado para flujos con Claude Code, OpenCode y Pi"
  };

  // Cache default English DOM text/HTML before any translation runs
  const enTextCache = new Map();
  const enHtmlCache = new Map();
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    enTextCache.set(el, el.textContent);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    enHtmlCache.set(el, el.innerHTML);
  });
  const defaultDocTitle = document.title;

  let currentLang = localStorage.getItem("aidev-lang") === "es" ? "es" : "en";

  /* ------------------------------------------------------------------------
     1. Theme Toggle, Mobile Menu, Scroll Progress & Reveal Animations
     ------------------------------------------------------------------------ */
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const savedTheme = localStorage.getItem("aidev-theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
  themeIcon.textContent = savedTheme === "dark" ? "☀" : "☾";

  themeToggle.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("aidev-theme", next);
    themeIcon.textContent = next === "dark" ? "☀" : "☾";
  });

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.querySelector(".main-nav");
  mobileMenuBtn.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    mobileMenuBtn.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    });
  });

  const scrollBar = document.getElementById("scrollProgress");
  window.addEventListener(
    "scroll",
    () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      scrollBar.style.width = `${pct}%`;
    },
    { passive: true }
  );

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const navObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((l) => {
            l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );
  sections.forEach((s) => navObs.observe(s));

  /* ------------------------------------------------------------------------
     2. Hero Animated Terminal
     ------------------------------------------------------------------------ */
  const heroCmdEl = document.getElementById("heroTypedCmd");
  const heroOutEl = document.getElementById("heroTermOutput");
  const heroCmdText = {
    en: 'claude "Add rate limiting to /api/login using create-endpoint skill"',
    es: 'claude "Agrega rate limiting a /api/login usando el skill create-endpoint"'
  };
  const heroLines = {
    en: [
      { cls: "term-dim", text: "▸ Loaded project memory: CLAUDE.md (Node 22 + TypeScript + Vitest)" },
      { cls: "term-dim", text: "▸ Loaded skill: .claude/skills/create-endpoint/SKILL.md" },
      { cls: "term-ok", text: "✓ Branch check: feat/login-rate-limit (not main)" },
      { cls: "term-ok", text: "✓ Edited src/routes/login.ts + src/middleware/rateLimit.ts" },
      { cls: "term-ok", text: "✓ Policy Allow: Bash(npm test) → 42/42 tests passed" },
      { cls: "term-warn", text: "▸ Spawning read-only subagent: @reviewer (Claude Haiku)" },
      { cls: "term-ok", text: "✓ Review complete: 0 security issues · Ready for human PR review" }
    ],
    es: [
      { cls: "term-dim", text: "▸ Memoria cargada: CLAUDE.md (Node 22 + TypeScript + Vitest)" },
      { cls: "term-dim", text: "▸ Skill cargado: .claude/skills/create-endpoint/SKILL.md" },
      { cls: "term-ok", text: "✓ Verificación de rama: feat/login-rate-limit (no es main)" },
      { cls: "term-ok", text: "✓ Editado src/routes/login.ts + src/middleware/rateLimit.ts" },
      { cls: "term-ok", text: "✓ Política Allow: Bash(npm test) → 42/42 tests aprobados" },
      { cls: "term-warn", text: "▸ Lanzando subagente solo lectura: @reviewer (Claude Haiku)" },
      { cls: "term-ok", text: "✓ Revisión lista: 0 fallos de seguridad · Listo para revisión humana" }
    ]
  };

  let heroFinished = false;
  let heroIdx = 0;
  function renderHeroInstant() {
    heroCmdEl.textContent = heroCmdText[currentLang];
    heroOutEl.innerHTML = "";
    heroLines[currentLang].forEach((line) => {
      const div = document.createElement("div");
      div.className = `term-row ${line.cls}`;
      div.style.opacity = "1";
      div.textContent = line.text;
      heroOutEl.appendChild(div);
    });
  }

  function typeHero() {
    const cmd = heroCmdText[currentLang];
    if (heroIdx < cmd.length) {
      heroCmdEl.textContent += cmd[heroIdx++];
      setTimeout(typeHero, 24);
    } else {
      const lines = heroLines[currentLang];
      lines.forEach((line, i) => {
        setTimeout(() => {
          const div = document.createElement("div");
          div.className = `term-row ${line.cls}`;
          div.textContent = line.text;
          heroOutEl.appendChild(div);
          if (i === lines.length - 1) heroFinished = true;
        }, i * 360);
      });
    }
  }
  setTimeout(typeHero, 450);

  /* ------------------------------------------------------------------------
     3. Foundations: Interactive Architecture Pipeline
     ------------------------------------------------------------------------ */
  const layerData = {
    en: {
      you: {
        title: "1. You (Developer Intent)",
        desc: "You define a bounded task, acceptance criteria, and branch context. Clear, small tasks produce dramatically better patches.",
        example: 'Prompt: "Add Zod validation to POST /orders and write unit tests."'
      },
      harness: {
        title: "2. Harness (Runtime, Memory & Guardrails)",
        desc: "The harness (Claude Code, OpenCode, or Pi) reads AGENTS.md / CLAUDE.md, injects skills, enforces allow/deny rules, and isolates subagents.",
        example: "Loaded: AGENTS.md + .claude/settings.json (deny .env, allow npm test)"
      },
      model: {
        title: "3. Model (Reasoning & Code Generation)",
        desc: "The LLM (Opus, Sonnet, GPT-5, Gemini, DeepSeek, Qwen) plans the edit and emits structured tool calls—never touching your disk directly.",
        example: "Plan: 1) Read src/orders.ts  2) Add schema  3) Run vitest"
      },
      tools: {
        title: "4. Tools (Files, Shell, Git, Web)",
        desc: "Sandboxed tools execute approved read/edit/bash actions and return stdout or diffs back to the model for verification.",
        example: "Tool Call: Edit(./src/orders.ts) → Approved | Bash(npm test) → Exit 0"
      },
      repo: {
        title: "5. Our Repo (Branch, CI & Human Review)",
        desc: "Changes land on a feature branch, pass secret scanning + CI tests, and wait for human review before merging to main.",
        example: "git diff --stat → 2 files changed · PR #142 opened for team review"
      }
    },
    es: {
      you: {
        title: "1. Tú (Intención del Desarrollador)",
        desc: "Defines una tarea acotada, criterios de aceptación y contexto de rama. Tareas claras y pequeñas producen parches mucho mejores.",
        example: 'Prompt: "Agrega validación Zod a POST /orders y escribe tests unitarios."'
      },
      harness: {
        title: "2. Harness (Runtime, Memoria y Guardrails)",
        desc: "El harness (Claude Code, OpenCode o Pi) lee AGENTS.md / CLAUDE.md, inyecta skills, aplica reglas allow/deny y aísla subagentes.",
        example: "Cargado: AGENTS.md + .claude/settings.json (deny .env, allow npm test)"
      },
      model: {
        title: "3. Modelo (Razonamiento y Generación de Código)",
        desc: "El LLM (Opus, Sonnet, GPT-5, Gemini, DeepSeek, Qwen) planifica la edición y emite llamadas a herramientas—sin tocar el disco directamente.",
        example: "Plan: 1) Leer src/orders.ts  2) Agregar esquema  3) Correr vitest"
      },
      tools: {
        title: "4. Herramientas (Archivos, Shell, Git, Web)",
        desc: "Herramientas en sandbox ejecutan acciones aprobadas de lectura/edición/bash y devuelven stdout o diffs al modelo para verificar.",
        example: "Tool Call: Edit(./src/orders.ts) → Aprobado | Bash(npm test) → Exit 0"
      },
      repo: {
        title: "5. Nuestro Repo (Rama, CI y Revisión Humana)",
        desc: "Los cambios llegan a una rama feature, pasan escaneo de secretos + tests de CI y esperan revisión humana antes de mergear a main.",
        example: "git diff --stat → 2 archivos modificados · PR #142 abierto para revisión"
      }
    }
  };

  let activeLayerKey = "you";
  const pipelineNodes = document.querySelectorAll("#archPipeline .flow-node");
  const pipelineConnectors = document.querySelectorAll("#archPipeline .flow-connector");
  const layerInspector = document.getElementById("layerInspector");
  const animatePipelineBtn = document.getElementById("animatePipelineBtn");

  function selectLayer(key) {
    activeLayerKey = key;
    const info = layerData[currentLang][key];
    if (!info) return;
    pipelineNodes.forEach((n) => {
      const active = n.dataset.layer === key;
      n.classList.toggle("active", active);
      n.setAttribute("aria-selected", String(active));
    });
    layerInspector.innerHTML = `
      <h4>${info.title}</h4>
      <p class="mt-sm">${info.desc}</p>
      <div class="mt-sm"><code>${info.example}</code></div>
    `;
  }

  pipelineNodes.forEach((node) => {
    node.addEventListener("click", () => selectLayer(node.dataset.layer));
  });

  let pipelineTimer = null;
  animatePipelineBtn.addEventListener("click", () => {
    if (pipelineTimer) clearInterval(pipelineTimer);
    const keys = ["you", "harness", "model", "tools", "repo"];
    let step = 0;
    selectLayer(keys[0]);
    pipelineConnectors.forEach((c) => c.classList.remove("active"));

    pipelineTimer = setInterval(() => {
      step++;
      if (step >= keys.length) {
        clearInterval(pipelineTimer);
        pipelineConnectors.forEach((c) => c.classList.remove("active"));
        return;
      }
      if (pipelineConnectors[step - 1]) {
        pipelineConnectors[step - 1].classList.add("active");
      }
      selectLayer(keys[step]);
    }, 850);
  });

  /* ------------------------------------------------------------------------
     4. Models: Filterable Table & Local vs. Cloud Task Router
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const modelRows = document.querySelectorAll("#modelsTable tbody tr");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tier = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
      modelRows.forEach((row) => {
        const show = tier === "all" || row.dataset.tier === tier;
        row.classList.toggle("hidden-row", !show);
      });
    });
  });

  const routes = {
    en: {
      recPrefix: "Recommended:",
      explain: {
        badge: "LOCAL FIRST · ZERO COST",
        badgeCls: "tag-green",
        model: "Qwen3-Coder / Llama via Ollama",
        reason: "Explaining existing functions or regexes needs no frontier reasoning and keeps code 100% on your laptop."
      },
      arch: {
        badge: "CLOUD · HIGH REASONING",
        badgeCls: "tag-amber",
        model: "Claude Opus / Sonnet or GPT-5",
        reason: "Cross-file architecture refactors require deep dependency tracking and high accuracy across 12+ files."
      },
      scaffold: {
        badge: "LOCAL OR FAST CLOUD",
        badgeCls: "tag-cyan",
        model: "Local Qwen / Haiku / Gemini Flash",
        reason: "DTOs, types, and boilerplate are low-risk and pattern-driven—save flagship tokens for harder work."
      },
      race: {
        badge: "CLOUD · TOP TIER",
        badgeCls: "tag-amber",
        model: "Claude Opus / GPT-5 High Reasoning",
        reason: "Concurrency and timing bugs are subtle; use the strongest model to trace state transitions accurately."
      },
      review: {
        badge: "CLOUD · BALANCED SUBAGENT",
        badgeCls: "tag-cyan",
        model: "Claude Sonnet (Read-Only Reviewer)",
        reason: "Best quality-per-dollar for spotting logic bugs, missing edge cases, and security issues before human review."
      }
    },
    es: {
      recPrefix: "Recomendado:",
      explain: {
        badge: "LOCAL PRIMERO · COSTO CERO",
        badgeCls: "tag-green",
        model: "Qwen3-Coder / Llama vía Ollama",
        reason: "Explicar funciones o regex existentes no requiere razonamiento frontera y mantiene el código 100% en tu laptop."
      },
      arch: {
        badge: "NUBE · ALTO RAZONAMIENTO",
        badgeCls: "tag-amber",
        model: "Claude Opus / Sonnet o GPT-5",
        reason: "Los refactors transversales requieren rastreo profundo de dependencias y alta precisión en 12+ archivos."
      },
      scaffold: {
        badge: "LOCAL O NUBE RÁPIDA",
        badgeCls: "tag-cyan",
        model: "Qwen Local / Haiku / Gemini Flash",
        reason: "DTOs, tipos y boilerplate son de bajo riesgo y repetitivos—reserva tokens flagship para tareas difíciles."
      },
      race: {
        badge: "NUBE · NIVEL SUPERIOR",
        badgeCls: "tag-amber",
        model: "Claude Opus / GPT-5 Alto Razonamiento",
        reason: "Los bugs de concurrencia y tiempos son sutiles; usa el modelo más fuerte para trazar transiciones de estado."
      },
      review: {
        badge: "NUBE · SUBAGENTE EQUILIBRADO",
        badgeCls: "tag-cyan",
        model: "Claude Sonnet (Revisor Solo Lectura)",
        reason: "Mejor relación calidad/precio para detectar bugs lógicos, casos borde y fallos de seguridad antes del humano."
      }
    }
  };

  let activeRouteKey = "explain";
  const routerBtns = document.querySelectorAll("#routerTasks .router-task");
  const routerResult = document.getElementById("routerResult");

  function renderRoute(key) {
    activeRouteKey = key;
    const dict = routes[currentLang];
    const r = dict[key];
    routerBtns.forEach((b) => b.classList.toggle("active", b.dataset.route === key));
    routerResult.innerHTML = `
      <span class="tag ${r.badgeCls}">${r.badge}</span>
      <h4>${dict.recPrefix} ${r.model}</h4>
      <p>${r.reason}</p>
    `;
  }
  routerBtns.forEach((b) => b.addEventListener("click", () => renderRoute(b.dataset.route)));

  /* ------------------------------------------------------------------------
     5. Concepts: Animated Dev Loop & Generic Repo Explorer
     ------------------------------------------------------------------------ */
  const loopSteps = document.querySelectorAll("#devLoop .loop-step");
  const loopCaption = document.getElementById("loopCaption");
  const playDevLoopBtn = document.getElementById("playDevLoopBtn");

  const loopMessages = {
    en: [
      "Step 1 · Write Task: Define a bounded unit of work with clear acceptance criteria.",
      "Step 2 · Plan: Use a strong model to inspect files and propose a plan before editing.",
      "Step 3 · Implement: Execute edits on a dedicated git branch or worktree—never on main.",
      "Step 4 · Run Tests: Agent runs unit tests and linters via allow-listed commands.",
      "Step 5 · Review: A read-only reviewer subagent checks the diff, followed by a human dev.",
      "Step 6 · Pull Request: Same CI checks, secret scans, and definition of done as human code."
    ],
    es: [
      "Paso 1 · Escribir Tarea: Define una unidad acotada de trabajo con criterios claros de aceptación.",
      "Paso 2 · Planificar: Usa un modelo fuerte para inspeccionar archivos y proponer un plan antes de editar.",
      "Paso 3 · Implementar: Ejecuta cambios en una rama git dedicada o worktree—nunca en main.",
      "Paso 4 · Correr Tests: El agente ejecuta tests unitarios y linters mediante comandos permitidos.",
      "Paso 5 · Revisar: Un subagente revisor de solo lectura inspecciona el diff, seguido por un humano.",
      "Paso 6 · Pull Request: Mismos checks de CI, escaneo de secretos y definición de terminado que código humano."
    ]
  };

  let activeLoopIdx = 0;
  function selectLoopStep(idx) {
    activeLoopIdx = idx;
    loopSteps.forEach((s, i) => s.classList.toggle("active", i === idx));
    loopCaption.textContent = loopMessages[currentLang][idx];
  }
  loopSteps.forEach((s, i) => s.addEventListener("click", () => selectLoopStep(i)));

  let loopTimer = null;
  playDevLoopBtn.addEventListener("click", () => {
    if (loopTimer) clearInterval(loopTimer);
    let idx = 0;
    selectLoopStep(0);
    loopTimer = setInterval(() => {
      idx++;
      if (idx >= loopSteps.length) {
        clearInterval(loopTimer);
        return;
      }
      selectLoopStep(idx);
    }, 950);
  });

  const genericDocs = {
    en: {
      agents: `# AGENTS.md (Shared Project Memory)\nStack: TypeScript, Node 22, PostgreSQL\nTest: npm test\nLint: npm run lint\nRules:\n- Never edit .env or infra/prod/\n- Always add unit tests for new services`,
      skill1: `---\nname: create-endpoint\ndescription: Scaffold a validated REST endpoint\n---\n1. Define Zod schema in src/schemas/\n2. Add handler in src/routes/\n3. Write Vitest integration test`,
      skill2: `---\nname: write-tests\ndescription: Add unit & edge-case tests\n---\n- Mock external HTTP calls\n- Cover happy path + 4xx errors\n- Never weaken existing assertions`,
      reviewer: `---\nname: reviewer\ntools: Read, Grep, Glob\n---\nYou are a read-only PR reviewer.\nCheck for: auth gaps, SQL injection, missing tests, and silent test weakening.`,
      perms: `{\n  "allow": ["Bash(npm test)", "Read(./src/**)", "Edit(./src/**)"],\n  "deny": ["Read(./.env*)", "Bash(git push *)", "Edit(./infra/prod/**)"]\n}`
    },
    es: {
      agents: `# AGENTS.md (Memoria Compartida del Proyecto)\nStack: TypeScript, Node 22, PostgreSQL\nTest: npm test\nLint: npm run lint\nReglas:\n- Nunca editar .env ni infra/prod/\n- Siempre agregar tests unitarios para nuevos servicios`,
      skill1: `---\nname: create-endpoint\ndescription: Crear un endpoint REST validado\n---\n1. Definir esquema Zod en src/schemas/\n2. Agregar handler en src/routes/\n3. Escribir test de integración en Vitest`,
      skill2: `---\nname: write-tests\ndescription: Agregar tests unitarios y casos borde\n---\n- Mockear llamadas HTTP externas\n- Cubrir happy path + errores 4xx\n- Nunca debilitar aserciones existentes`,
      reviewer: `---\nname: reviewer\ntools: Read, Grep, Glob\n---\nEres un revisor de PR de solo lectura.\nVerifica: brechas de auth, inyección SQL, tests faltantes y debilitamiento de tests.`,
      perms: `{\n  "allow": ["Bash(npm test)", "Read(./src/**)", "Edit(./src/**)"],\n  "deny": ["Read(./.env*)", "Bash(git push *)", "Edit(./infra/prod/**)"]\n}`
    }
  };

  let activeGenericKey = "agents";
  const treeFiles = document.querySelectorAll("#genericTree .tree-file");
  const genericPreview = document.getElementById("genericPreview");
  function showGenericDoc(key) {
    activeGenericKey = key;
    treeFiles.forEach((f) => f.classList.toggle("active", f.dataset.doc === key));
    genericPreview.textContent = genericDocs[currentLang][key];
  }
  treeFiles.forEach((f) => f.addEventListener("click", () => showGenericDoc(f.dataset.doc)));

  /* ------------------------------------------------------------------------
     6. SETUP LAB: Claude Code, OpenCode & Pi Project Examples + Sim
     ------------------------------------------------------------------------ */
  const harnesses = {
    claude: {
      name: "Claude Code",
      summary: {
        en: "Uses CLAUDE.md for project memory, .claude/settings.json for allow/deny & hooks, and .claude/agents/ + .claude/skills/ for subagents & playbooks.",
        es: "Usa CLAUDE.md para memoria del proyecto, .claude/settings.json para reglas allow/deny y hooks, y .claude/agents/ + .claude/skills/ para subagentes y manuales."
      },
      badge: { en: "Anthropic CLI / IDE", es: "CLI / IDE de Anthropic" },
      termTitle: "claude-code — my-service",
      files: [
        {
          path: "CLAUDE.md",
          lang: "Markdown",
          content: `# Project Memory (CLAUDE.md)

## Stack & Commands
- Runtime: Node.js 22 + TypeScript + Fastify
- Test: \`npm test\` (Vitest)
- Lint: \`npm run lint\`

## Engineering Rules
- Work on a feature branch; never commit directly to \`main\`.
- Validate all request bodies with Zod schemas.
- Never read or modify \`.env*\` or \`infra/prod/**\`.
- Run \`npm test\` and \`npm run lint\` before finishing.`
        },
        {
          path: ".claude/settings.json",
          lang: "JSON",
          content: `{
  "permissions": {
    "allow": [
      "Read(./src/**)",
      "Edit(./src/**)",
      "Bash(npm test)",
      "Bash(npm run lint)",
      "Bash(git status)",
      "Bash(git diff *)"
    ],
    "deny": [
      "Read(./.env*)",
      "Read(./secrets/**)",
      "Bash(curl *)",
      "Bash(rm -rf *)",
      "Bash(git push *)",
      "Edit(./infra/prod/**)"
    ]
  }
}`
        },
        {
          path: ".claude/agents/reviewer.md",
          lang: "Markdown",
          content: `---
name: reviewer
description: Read-only security and code quality PR reviewer
tools: Read, Grep, Glob
model: haiku
---

You are a strict, read-only code reviewer.
Inspect the current git diff and check for:
1. Missing input validation or auth checks
2. Secrets or hardcoded credentials
3. Weakened or skipped unit tests
4. Unhandled async errors

Return a concise bullet list of findings with file:line references.`
        },
        {
          path: ".claude/skills/create-endpoint/SKILL.md",
          lang: "Markdown",
          content: `---
name: create-endpoint
description: Scaffold a Fastify route with Zod validation and Vitest coverage
---

## Steps
1. Create request/response Zod schema in \`src/schemas/<name>.ts\`.
2. Implement route handler in \`src/routes/<name>.ts\`.
3. Register route in \`src/app.ts\`.
4. Add unit & integration tests in \`tests/<name>.test.ts\`.
5. Run \`npm test\` and \`npm run lint\`.`
        }
      ],
      simSteps: {
        en: [
          { cls: "term-dim", text: '$ claude --agent reviewer "Review feat/orders-api"' },
          { cls: "term-dim", text: "▸ Reading CLAUDE.md and .claude/settings.json..." },
          { cls: "term-ok", text: "✓ Loaded permissions: 6 allow rules, 6 deny rules" },
          { cls: "term-ok", text: "✓ Loaded subagent: .claude/agents/reviewer.md (tools: Read, Grep, Glob | model: haiku)" },
          { cls: "term-warn", text: "▸ Subagent attempted: Read(./.env.production) → BLOCKED by deny rule" },
          { cls: "term-ok", text: "✓ Read(./src/routes/orders.ts) & Read(./tests/orders.test.ts)" },
          { cls: "term-ok", text: "✓ Finding [src/routes/orders.ts:24]: Add rate-limit middleware on POST /orders" },
          { cls: "term-ok", text: "✓ Session finished (read-only mode: 0 files modified)" }
        ],
        es: [
          { cls: "term-dim", text: '$ claude --agent reviewer "Revisar feat/orders-api"' },
          { cls: "term-dim", text: "▸ Leyendo CLAUDE.md y .claude/settings.json..." },
          { cls: "term-ok", text: "✓ Permisos cargados: 6 reglas allow, 6 reglas deny" },
          { cls: "term-ok", text: "✓ Subagente cargado: .claude/agents/reviewer.md (tools: Read, Grep, Glob | model: haiku)" },
          { cls: "term-warn", text: "▸ Subagente intentó: Read(./.env.production) → BLOQUEADO por regla deny" },
          { cls: "term-ok", text: "✓ Read(./src/routes/orders.ts) & Read(./tests/orders.test.ts)" },
          { cls: "term-ok", text: "✓ Hallazgo [src/routes/orders.ts:24]: Agregar middleware rate-limit en POST /orders" },
          { cls: "term-ok", text: "✓ Sesión finalizada (modo solo lectura: 0 archivos modificados)" }
        ]
      }
    },

    opencode: {
      name: "OpenCode",
      summary: {
        en: "Uses AGENTS.md + opencode.json for multi-provider routing (Cloud + local Ollama) and granular permissions, with .opencode/agents/ & .opencode/skills/.",
        es: "Usa AGENTS.md + opencode.json para enrutamiento multi-proveedor (Nube + Ollama local) y permisos granulares, con .opencode/agents/ y .opencode/skills/."
      },
      badge: { en: "MIT Open Source", es: "Open Source MIT" },
      termTitle: "opencode — my-service",
      files: [
        {
          path: "AGENTS.md",
          lang: "Markdown",
          content: `# Project Memory (AGENTS.md)

## Commands
- \`npm test\` — run Vitest suite
- \`npm run lint\` — ESLint + TypeScript check

## Conventions
- Keep business logic in \`src/services/\`, routes thin in \`src/routes/\`.
- Use \`@reviewer\` subagent before opening any pull request.
- Never touch \`.env*\` or \`infra/prod/**\`.`
        },
        {
          path: "opencode.json",
          lang: "JSON",
          content: `{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "ollama/qwen3-coder:14b",
  "permission": {
    "edit": "ask",
    "bash": {
      "npm test": "allow",
      "npm run lint": "allow",
      "git status": "allow",
      "git push *": "deny",
      "curl *": "deny"
    },
    "read": {
      ".env*": "deny",
      "secrets/**": "deny"
    }
  }
}`
        },
        {
          path: ".opencode/agents/reviewer.md",
          lang: "Markdown",
          content: `---
description: Read-only PR reviewer using fast/cheap model
mode: subagent
model: ollama/qwen3-coder:14b
tools:
  write: false
  edit: false
  bash: false
---

Review the staged changes for:
- Security flaws (injection, missing auth)
- Missing test coverage for new branches
- Adherence to AGENTS.md conventions`
        },
        {
          path: ".opencode/skills/create-endpoint/SKILL.md",
          lang: "Markdown",
          content: `---
name: create-endpoint
description: Create a typed endpoint with service + tests
---

1. Add DTO schema in \`src/schemas/\`.
2. Implement pure service function in \`src/services/\`.
3. Wire route in \`src/routes/\`.
4. Run \`npm test\` and invoke \`@reviewer\`.`
        }
      ],
      simSteps: {
        en: [
          { cls: "term-dim", text: '$ opencode run "Use create-endpoint skill for GET /health/ready"' },
          { cls: "term-dim", text: "▸ Loaded AGENTS.md & opencode.json (primary: claude-sonnet-4-5, small: ollama/qwen3-coder)" },
          { cls: "term-ok", text: "✓ Loaded skill: .opencode/skills/create-endpoint/SKILL.md" },
          { cls: "term-ok", text: "✓ Created src/routes/health.ts & tests/health.test.ts (supervised edit approved)" },
          { cls: "term-ok", text: "✓ Policy Allow: npm test → 18 passed" },
          { cls: "term-warn", text: "▸ Delegating review to @reviewer (ollama/qwen3-coder:14b, write=false)..." },
          { cls: "term-err", text: "✗ Blocked: @reviewer attempted bash(git push) → denied by policy" },
          { cls: "term-ok", text: "✓ @reviewer approved diff · Ready for PR" }
        ],
        es: [
          { cls: "term-dim", text: '$ opencode run "Usa skill create-endpoint para GET /health/ready"' },
          { cls: "term-dim", text: "▸ Cargados AGENTS.md y opencode.json (principal: claude-sonnet-4-5, pequeño: ollama/qwen3-coder)" },
          { cls: "term-ok", text: "✓ Skill cargado: .opencode/skills/create-endpoint/SKILL.md" },
          { cls: "term-ok", text: "✓ Creado src/routes/health.ts y tests/health.test.ts (edición supervisada aprobada)" },
          { cls: "term-ok", text: "✓ Política Allow: npm test → 18 aprobados" },
          { cls: "term-warn", text: "▸ Delegando revisión a @reviewer (ollama/qwen3-coder:14b, write=false)..." },
          { cls: "term-err", text: "✗ Bloqueado: @reviewer intentó bash(git push) → denegado por política" },
          { cls: "term-ok", text: "✓ @reviewer aprobó el diff · Listo para PR" }
        ]
      }
    },

    pi: {
      name: "Pi",
      summary: {
        en: "Minimal, hackable harness using AGENTS.md, .pi/settings.json, TypeScript extensions (.pi/extensions/) for custom guardrails, plus prompts & skills.",
        es: "Harness minimalista y extensible que usa AGENTS.md, .pi/settings.json, extensiones TypeScript (.pi/extensions/) para guardrails propios, más prompts y skills."
      },
      badge: { en: "Extensible Minimal CLI", es: "CLI Minimalista Extensible" },
      termTitle: "pi — my-service",
      files: [
        {
          path: "AGENTS.md",
          lang: "Markdown",
          content: `# Project Memory (AGENTS.md)

## Stack
- Node 22, TypeScript, Vitest

## Rules for Pi Agents
- Always run \`npm test\` after editing \`src/\`.
- Use \`/review\` prompt template before committing.
- Extension \`guardrails.ts\` blocks \`.env\`, \`prod\`, and \`git push\`.`
        },
        {
          path: ".pi/settings.json",
          lang: "JSON",
          content: `{
  "defaultProvider": "anthropic",
  "defaultModel": "claude-sonnet-4-5",
  "defaultThinkingLevel": "medium",
  "skills": [".pi/skills"],
  "prompts": [".pi/prompts"],
  "extensions": [".pi/extensions/guardrails.ts"]
}`
        },
        {
          path: ".pi/extensions/guardrails.ts",
          lang: "TypeScript",
          content: `// .pi/extensions/guardrails.ts — Custom safety hook
export default function guardrails(pi: any) {
  const blockedPaths = [".env", "secrets/", "infra/prod/"];
  const blockedCmds = ["git push", "rm -rf", "curl "];

  pi.on("tool_call", async (event: any) => {
    const path = event.input?.path || "";
    if (blockedPaths.some((p) => path.includes(p))) {
      return { block: true, reason: \`Blocked protected path: \${path}\` };
    }
    if (event.tool === "bash") {
      const cmd = event.input?.command || "";
      if (blockedCmds.some((c) => cmd.includes(c))) {
        return { block: true, reason: \`Blocked dangerous command: \${cmd}\` };
      }
    }
  });
}`
        },
        {
          path: ".pi/prompts/review.md",
          lang: "Markdown",
          content: `---
description: Run a structured read-only review of current git diff
---

Inspect \`git diff\` and evaluate:
1. Correctness & edge cases
2. Security & secret exposure
3. Test coverage in \`tests/\`

Do NOT modify files. Output a checklist of required fixes.`
        }
      ],
      simSteps: {
        en: [
          { cls: "term-dim", text: '$ pi "Implement /api/metrics endpoint and run /review"' },
          { cls: "term-dim", text: "▸ Loaded AGENTS.md & .pi/settings.json (provider: anthropic, thinking: medium)" },
          { cls: "term-ok", text: "✓ Registered extension: .pi/extensions/guardrails.ts" },
          { cls: "term-warn", text: "▸ Tool hook intercepted: Read(.env) → Blocked protected path: .env" },
          { cls: "term-ok", text: "✓ Implemented src/routes/metrics.ts + tests/metrics.test.ts" },
          { cls: "term-ok", text: "✓ Bash(npm test) → 24/24 passed" },
          { cls: "term-ok", text: "✓ Executed prompt template .pi/prompts/review.md → 0 blockers found" }
        ],
        es: [
          { cls: "term-dim", text: '$ pi "Implementar endpoint /api/metrics y ejecutar /review"' },
          { cls: "term-dim", text: "▸ Cargados AGENTS.md y .pi/settings.json (proveedor: anthropic, thinking: medium)" },
          { cls: "term-ok", text: "✓ Extensión registrada: .pi/extensions/guardrails.ts" },
          { cls: "term-warn", text: "▸ Hook interceptó: Read(.env) → Ruta protegida bloqueada: .env" },
          { cls: "term-ok", text: "✓ Implementado src/routes/metrics.ts + tests/metrics.test.ts" },
          { cls: "term-ok", text: "✓ Bash(npm test) → 24/24 aprobados" },
          { cls: "term-ok", text: "✓ Plantilla ejecutada .pi/prompts/review.md → 0 bloqueadores" }
        ]
      }
    }
  };

  let activeHarnessKey = "claude";
  let activeFileIdx = 0;
  let simTimer = null;

  const labTabs = document.querySelectorAll(".lab-tab");
  const labSummary = document.getElementById("labSummary");
  const ideFileList = document.getElementById("ideFileList");
  const ideFilePath = document.getElementById("ideFilePath");
  const ideFileLang = document.getElementById("ideFileLang");
  const ideCodeContent = document.getElementById("ideCodeContent");
  const copyCodeBtn = document.getElementById("copyCodeBtn");

  const runSimBtn = document.getElementById("runSimBtn");
  const resetSimBtn = document.getElementById("resetSimBtn");
  const simTermTitle = document.getElementById("simTermTitle");
  const simTermStatus = document.getElementById("simTermStatus");
  const simTermBody = document.getElementById("simTermBody");

  const simStatusLabels = {
    en: { idle: "IDLE", running: "RUNNING", complete: "COMPLETE" },
    es: { idle: "INACTIVO", running: "EJECUTANDO", complete: "COMPLETADO" }
  };

  function renderFile(idx) {
    activeFileIdx = idx;
    const h = harnesses[activeHarnessKey];
    const file = h.files[idx];
    ideFileList.querySelectorAll(".ide-file-btn").forEach((b, i) => {
      b.classList.toggle("active", i === idx);
    });
    ideFilePath.textContent = file.path;
    ideFileLang.textContent = file.lang;
    ideCodeContent.textContent = file.content;
  }

  function resetSimulation() {
    if (simTimer) {
      clearInterval(simTimer);
      simTimer = null;
    }
    const h = harnesses[activeHarnessKey];
    simTermTitle.textContent = h.termTitle;
    simTermStatus.textContent = simStatusLabels[currentLang].idle;
    simTermBody.innerHTML =
      currentLang === "es"
        ? `<div class="sim-placeholder">Haz clic en <strong>▶ Ejecutar Simulación</strong> para ver a <strong>${h.name}</strong> cargar memoria, aplicar permisos y ejecutar su flujo.</div>`
        : `<div class="sim-placeholder">Click <strong>▶ Run Simulation</strong> to watch <strong>${h.name}</strong> load project memory, enforce permissions, and run its workflow.</div>`;
  }

  function selectHarness(key) {
    activeHarnessKey = key;
    activeFileIdx = 0;
    const h = harnesses[key];

    labTabs.forEach((t) => {
      const isAct = t.dataset.harness === key;
      t.classList.toggle("active", isAct);
      t.setAttribute("aria-selected", String(isAct));
    });

    labSummary.innerHTML = `
      <div>
        <strong>${h.name}</strong> — <span class="muted">${h.summary[currentLang]}</span>
      </div>
      <span class="tag">${h.badge[currentLang]}</span>
    `;

    ideFileList.innerHTML = "";
    h.files.forEach((f, idx) => {
      const btn = document.createElement("button");
      btn.className = "ide-file-btn";
      btn.textContent = f.path;
      btn.addEventListener("click", () => renderFile(idx));
      ideFileList.appendChild(btn);
    });

    renderFile(0);
    resetSimulation();
  }

  labTabs.forEach((t) => t.addEventListener("click", () => selectHarness(t.dataset.harness)));

  copyCodeBtn.addEventListener("click", async () => {
    const text = harnesses[activeHarnessKey].files[activeFileIdx].content;
    try {
      await navigator.clipboard.writeText(text);
      copyCodeBtn.textContent = currentLang === "es" ? "Copiado ✓" : "Copied ✓";
      setTimeout(() => {
        copyCodeBtn.textContent = currentLang === "es" ? "Copiar" : "Copy";
      }, 1500);
    } catch {
      copyCodeBtn.textContent = currentLang === "es" ? "Error" : "Copy failed";
    }
  });

  runSimBtn.addEventListener("click", () => {
    if (simTimer) clearInterval(simTimer);
    const h = harnesses[activeHarnessKey];
    const steps = h.simSteps[currentLang];
    simTermBody.innerHTML = "";
    simTermStatus.textContent = simStatusLabels[currentLang].running;
    let step = 0;

    function pushLine() {
      if (step >= steps.length) {
        clearInterval(simTimer);
        simTimer = null;
        simTermStatus.textContent = simStatusLabels[currentLang].complete;
        return;
      }
      const item = steps[step++];
      const div = document.createElement("div");
      div.className = `term-row ${item.cls}`;
      div.textContent = item.text;
      simTermBody.appendChild(div);
      simTermBody.scrollTop = simTermBody.scrollHeight;
    }

    pushLine();
    simTimer = setInterval(pushLine, 520);
  });

  resetSimBtn.addEventListener("click", resetSimulation);

  /* ------------------------------------------------------------------------
     7. Security: Interactive Policy Tester & Readiness Checklist
     ------------------------------------------------------------------------ */
  const policyCases = {
    en: {
      allowBadge: "✓ ALLOWED",
      denyBadge: "✗ DENIED",
      test: {
        allowed: true,
        rule: 'Matched allow rule: "Bash(npm test)"',
        detail: "Whitelisted test command runs automatically in Scoped Auto or after one click in Supervised Edit."
      },
      env: {
        allowed: false,
        rule: 'Blocked by deny rule: "Read(./.env*)"',
        detail: "Secrets and environment files are completely unreadable to the agent."
      },
      "edit-src": {
        allowed: true,
        rule: 'Matched allow rule: "Edit(./src/**)"',
        detail: "Source code edits on a feature branch are permitted and tracked in git diff."
      },
      push: {
        allowed: false,
        rule: 'Blocked by deny rule: "Bash(git push *)"',
        detail: "Only a human developer pushes to remote or opens/merges the final PR."
      },
      curl: {
        allowed: false,
        rule: 'Blocked by deny rule: "Bash(curl *)"',
        detail: "Prevents data exfiltration and fetching unvetted remote scripts."
      },
      infra: {
        allowed: false,
        rule: 'Blocked by deny rule: "Edit(./infra/prod/**)"',
        detail: "Production infrastructure requires human-only changes and code-owner review."
      }
    },
    es: {
      allowBadge: "✓ PERMITIDO",
      denyBadge: "✗ DENEGADO",
      test: {
        allowed: true,
        rule: 'Regla allow coincidente: "Bash(npm test)"',
        detail: "Comando de prueba autorizado se ejecuta automáticamente en Auto Acotado o con un clic en Edición Supervisada."
      },
      env: {
        allowed: false,
        rule: 'Bloqueado por regla deny: "Read(./.env*)"',
        detail: "Los secretos y archivos de entorno son completamente ilegibles para el agente."
      },
      "edit-src": {
        allowed: true,
        rule: 'Regla allow coincidente: "Edit(./src/**)"',
        detail: "Las ediciones de código fuente en una rama feature están permitidas y rastreadas en git diff."
      },
      push: {
        allowed: false,
        rule: 'Bloqueado por regla deny: "Bash(git push *)"',
        detail: "Solo un desarrollador humano hace push al remoto o abre/mergea el PR final."
      },
      curl: {
        allowed: false,
        rule: 'Bloqueado por regla deny: "Bash(curl *)"',
        detail: "Previene la exfiltración de datos y descarga de scripts remotos no auditados."
      },
      infra: {
        allowed: false,
        rule: 'Bloqueado por regla deny: "Edit(./infra/prod/**)"',
        detail: "La infraestructura de producción requiere cambios solo humanos y revisión de code-owner."
      }
    }
  };

  let activePolicyCmd = null;
  const policyBtns = document.querySelectorAll("#policyCommands .policy-cmd");
  const policyVerdict = document.getElementById("policyVerdict");

  function renderPolicyVerdict(cmdKey) {
    activePolicyCmd = cmdKey;
    const dict = policyCases[currentLang];
    if (!cmdKey) {
      policyVerdict.innerHTML = `
        <span class="verdict-badge verdict-neutral">${currentLang === "es" ? esTranslations["sec.ptBadge"] : "SELECT A COMMAND"}</span>
        <p>${currentLang === "es" ? esTranslations["sec.ptPlaceholder"] : "Click a tool call on the left to evaluate it against the policy rules."}</p>
      `;
      return;
    }
    const c = dict[cmdKey];
    policyVerdict.innerHTML = `
      <span class="verdict-badge ${c.allowed ? "verdict-allow" : "verdict-deny"}">
        ${c.allowed ? dict.allowBadge : dict.denyBadge}
      </span>
      <h4><code>${c.rule}</code></h4>
      <p>${c.detail}</p>
    `;
  }

  policyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      policyBtns.forEach((b) => b.classList.toggle("active", b === btn));
      renderPolicyVerdict(btn.dataset.cmd);
    });
  });

  const checklistInputs = document.querySelectorAll("#safeChecklist input[type='checkbox']");
  const readinessScore = document.getElementById("readinessScore");
  const readinessFill = document.getElementById("readinessFill");

  function updateReadiness() {
    const total = checklistInputs.length;
    const checked = Array.from(checklistInputs).filter((i) => i.checked).length;
    readinessScore.textContent = `${checked} / ${total}`;
    readinessFill.style.width = `${(checked / total) * 100}%`;
  }
  checklistInputs.forEach((i) => i.addEventListener("change", updateReadiness));
  updateReadiness();

  /* ------------------------------------------------------------------------
     8. Rollout: Interactive 4-Week Timeline
     ------------------------------------------------------------------------ */
  const rolloutData = {
    en: {
      goalLabel: "Goal:",
      doneLabel: "Done when:",
      weeks: [
        {
          title: "Week 1 · Pilot with 2 to 3 developers on one repo",
          goal: "Establish safe foundations on a low-risk repository with good test coverage.",
          done: "AGENTS.md / CLAUDE.md written, primary harness installed, deny-by-default permissions configured, baseline metrics captured."
        },
        {
          title: "Week 2 · Build first skills and a reviewer subagent",
          goal: "Codify repeated team workflows so every developer gets consistent output.",
          done: "3 repeated tasks automated with SKILL.md files and a read-only PR reviewer agent active on pilot PRs."
        },
        {
          title: "Week 3 · Expand to the team & add CI guardrails",
          goal: "Roll out the validated setup to the wider engineering team with automated safety nets.",
          done: "All AI-assisted PRs pass secret scanning (gitleaks), unit tests, lint, and code-owner review."
        },
        {
          title: "Week 4 · Measure impact and set the team default",
          goal: "Evaluate real data before locking in tooling and budgets.",
          done: "Reviewed cycle time, review comments per PR, escaped defects, and monthly spend per developer."
        }
      ]
    },
    es: {
      goalLabel: "Objetivo:",
      doneLabel: "Listo cuando:",
      weeks: [
        {
          title: "Semana 1 · Piloto con 2 a 3 desarrolladores en un repo",
          goal: "Establecer bases seguras en un repositorio de bajo riesgo con buena cobertura de tests.",
          done: "AGENTS.md / CLAUDE.md escrito, harness principal instalado, permisos deny-by-default configurados y métricas base capturadas."
        },
        {
          title: "Semana 2 · Crear primeros skills y subagente revisor",
          goal: "Estandarizar flujos repetitivos para que todo el equipo obtenga resultados consistentes.",
          done: "3 tareas repetitivas automatizadas con SKILL.md y un agente revisor de solo lectura activo en PRs piloto."
        },
        {
          title: "Semana 3 · Expandir al equipo y añadir guardrails en CI",
          goal: "Desplegar la configuración validada al resto del equipo con redes de seguridad automáticas.",
          done: "Todos los PRs asistidos por IA pasan escaneo de secretos (gitleaks), tests unitarios, lint y revisión de code-owner."
        },
        {
          title: "Semana 4 · Medir impacto y definir el estándar del equipo",
          goal: "Evaluar datos reales antes de fijar herramientas y presupuestos.",
          done: "Revisado tiempo de ciclo, comentarios por PR, defectos escapados y gasto mensual por desarrollador."
        }
      ]
    }
  };

  let activeWeekIdx = 0;
  const rolloutBtns = document.querySelectorAll("#rolloutTabs .rollout-btn");
  const rolloutDetail = document.getElementById("rolloutDetail");

  function selectWeek(idx) {
    activeWeekIdx = idx;
    const dict = rolloutData[currentLang];
    const w = dict.weeks[idx];
    rolloutBtns.forEach((b, i) => b.classList.toggle("active", i === idx));
    rolloutDetail.innerHTML = `
      <h4>${w.title}</h4>
      <p class="mt-sm"><strong>${dict.goalLabel}</strong> ${w.goal}</p>
      <p class="mt-sm"><strong>${dict.doneLabel}</strong> ${w.done}</p>
    `;
  }
  rolloutBtns.forEach((b, i) => b.addEventListener("click", () => selectWeek(i)));

  /* ------------------------------------------------------------------------
     9. Language Switcher & localStorage Persistence (Default: "en")
     ------------------------------------------------------------------------ */
  const langToggle = document.getElementById("langToggle");
  const langOpts = langToggle.querySelectorAll(".lang-opt");

  function applyLanguage(lang) {
    currentLang = lang === "es" ? "es" : "en";
    localStorage.setItem("aidev-lang", currentLang);
    html.setAttribute("lang", currentLang);
    document.title = currentLang === "es" ? esTranslations["doc.title"] : defaultDocTitle;

    langOpts.forEach((opt) => {
      opt.classList.toggle("active", opt.dataset.lang === currentLang);
    });

    enTextCache.forEach((enText, el) => {
      const key = el.dataset.i18n;
      el.textContent = currentLang === "es" && esTranslations[key] ? esTranslations[key] : enText;
    });
    enHtmlCache.forEach((enHtml, el) => {
      const key = el.dataset.i18nHtml;
      el.innerHTML = currentLang === "es" && esTranslations[key] ? esTranslations[key] : enHtml;
    });

    // Re-render all dynamic JS panels in the active language
    if (heroFinished) renderHeroInstant();
    selectLayer(activeLayerKey);
    renderRoute(activeRouteKey);
    selectLoopStep(activeLoopIdx);
    showGenericDoc(activeGenericKey);
    selectHarness(activeHarnessKey);
    renderPolicyVerdict(activePolicyCmd);
    selectWeek(activeWeekIdx);
  }

  langToggle.addEventListener("click", () => {
    applyLanguage(currentLang === "en" ? "es" : "en");
  });

  // Initial render in saved or default ("en") language
  applyLanguage(currentLang);
})();
