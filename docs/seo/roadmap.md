# Roadmap SEO

Objetivo: pasar de 2 URLs sin contenido indexable a 26 URLs con contenido completo (10 páginas estáticas y 16 casos de estudio, contando EN/ES), metadatos por ruta y datos estructurados, sin perder la estética de escritorio.

## Fases

### Fase 0 — Baseline y medición ✅

- GSC/Bing: pendiente de acceso a la cuenta (pasos en el baseline).
- Lighthouse, DOM renderizado, cabeceras y estado del servidor documentados.

### Fase 1 — Quick wins ✅

- H1 + fallback `<noscript>`.
- Metadatos ajustados y `meta keywords` eliminado.
- JSON-LD base (`Person`, `WebSite`, `ProfessionalService`).
- 404 real, 301 de `www`, HSTS.
- Puente: las 6 ventanas se renderizan en el DOM.

### Fase 2 — Arquitectura ✅

- `src/routes.ts` con URLs, metadatos y helpers.
- Modelo de proyectos ampliado (slug, summary, problema, solución, resultados, SEO).
- Mapa de enlazado interno.

### Fase 3 — Páginas estáticas + shell ✅

- `PageShell` con menu bar, dock y ventana maximizada.
- SSR + prerender por ruta con `vite build --ssr` y `renderToStaticMarkup`.
- Home con shell estático inyectado en `#root`; React lo reemplaza al cargar.
- Páginas de servicios, proyectos, 8 casos, about y contacto.
- Sitemap de 26 URLs con alternates EN/ES/x-default.
- Dock del escritorio convertido a enlaces reales.
- Verificado: 26 páginas, 0 errores de canonical/H1/hreflang, Lighthouse 99/100/100/100 en services.

### Fase 4 — Contenido ✅

- Home: propuesta de valor y disponibilidad.
- Servicios: H1 comercial, servicios, proceso, paquetes, FAQ y tono revisado.
- Proyectos: índice + 8 casos con problema/solución/resultados verificados contra los repos.
- About: experiencia y formación del CV, skills, foto y CV.
- Contacto: email, disponibilidad, ubicación, plazo de respuesta y qué incluir.
- Enlazado interno: dos casos relacionados por proyecto y anchor text descriptivo.
- Sin años, métricas ni testimonios inventados.

### Fase 5 — Metadatos y JSON-LD por página

- Title/description/canonical/hreflang/OG por ruta.
- `BreadcrumbList`, `FAQPage`, `CreativeWork` por proyecto, `Service`.
- Validar con Rich Results Test y Schema Markup Validator.

### Fase 6 — Rendimiento y CWV

- Self-host de fuentes, preload, subset.
- Lazy load de islas interactivas; páginas de contenido con JS mínimo.
- Boot no bloqueante, `prefers-reduced-motion`.
- Imágenes con dimensiones, srcset y formatos modernos.
- Objetivo: LCP <2,5 s, CLS <0,1, INP <200 ms.

### Fase 7 — SEO internacional

- hreflang recíproco en head y sitemap.
- Selector de idioma como enlace a la URL gemela.
- Sin redirección automática por IP/idioma.
- Traducciones completas, no automáticas.

### Fase 8 — Autoridad y contenido

- GSC/Bing semanal, alertas.
- Backlinks legítimos, LinkedIn, GitHub, artículos.
- 1-2 artículos al mes y casos de estudio.
- Testimonios y señales E-E-A-T.

### Fase 9 — QA, CI y despliegue

- `npm run seo:check` (200, H1 único, metadatos, canonical, hreflang, JSON-LD).
- GitHub Action con Lighthouse CI y presupuestos.
- Checklist pre/post deploy y rollback.
- Runbook en `docs/seo/README.md`.

## KPIs

| KPI | Baseline | Objetivo |
|---|---|---|
| URLs indexables | 2 | 26 (10 estáticas + 16 casos) |
| Palabras en DOM (EN/ES) | 181 / 190 | >600 por página |
| H1 | 0 | 1 por página |
| Enlaces en DOM | 1 | >20 por página |
| LCP móvil | 2,7 s | <2,5 s |
| CLS móvil | 0,03 | <0,1 |
| JSON-LD | 0 | Por página |
| Soft 404 | Sí | No |

## No hacer

- Comprar enlaces ni keyword stuffing.
- Auto-redirigir por idioma o IP.
- Servir contenido distinto a bots.
- Migrar de framework sin necesidad.
- Esperar resultados en días.
