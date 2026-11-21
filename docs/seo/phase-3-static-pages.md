# Fase 3 — Páginas estáticas + shell del escritorio

**Fecha:** 2026-11-21
**Estado:** implementado y verificado en local
**Dependencias:** Fases 1 y 2

---

## 1. Resultado

El sitio pasa de 2 URLs HTML a **26 URLs con contenido completo**:

- 10 páginas estáticas (5 secciones × 2 idiomas).
- 16 casos de estudio (8 proyectos × 2 idiomas).
- Home con el escritorio interactivo y un shell estático inicial.
- `sitemap.xml` generado con las 26 URLs y sus alternates EN/ES/x-default.

Cada página de contenido es **HTML puro**: no carga React, solo la hoja de estilos, las fuentes, el script de analítica y un script inline mínimo para aplicar el tema guardado.

## 2. Arquitectura

```
npm run build
├─ tsc --noEmit
├─ vite build                    → dist/ (cliente, imágenes, CSS)
├─ vite build --config vite.ssr.config.ts → .ssr/entry-server.js
└─ node scripts/prerender.mjs    → 26 HTML + sitemap.xml
```

### 2.1 Home

- `scripts/prerender.mjs` reconstruye la home con la misma plantilla de `<head>` y `<body>` que las páginas de contenido (`pageHtml`), usando los metadatos de `src/routes.ts`. Después recupera el `<script type="module">` de React del build cliente y lo vuelve a insertar: `createRoot` reemplaza el shell estático por el escritorio.
- El `<noscript>` antiguo y el CSS de `#nojs-fallback` ya no se generan: el shell estático **es** el fallback sin JS.
- La home estática tiene un H1 orientado al rol (`Full Stack & Process Automation Engineer`) y una intro de 2-3 líneas con enlace a `/about/`; no repite la bio ni el neofetch de About.
- El dock del escritorio son enlaces `<a>` reales (`/services/`, `/projects/`, etc.) con `preventDefault` para seguir abriendo ventanas. Así el DOM renderizado también conserva enlaces internos.
- Se retiró el puente de la Fase 1: el escritorio vuelve a montar solo las ventanas abiertas. El contenido oculto ya no se duplica en el DOM; las páginas estáticas son la fuente rastreable.

### 2.2 Páginas de contenido

- `src/pages/PageShell.tsx`: menu bar, ventana maximizada y dock con enlaces reales. Usa clases planas de `src/pages/static.css` para que el HTML del servidor y el CSS del cliente coincidan sin depender de hashes de CSS Modules.
- Páginas:
  - `ServicesPage.tsx` — servicios, proceso, paquetes y FAQ.
  - `ProjectsPage.tsx` — índice de los 8 proyectos con tarjetas enlazadas.
  - `ProjectPage.tsx` — caso de estudio con problema, solución, resultados, stack y CTA.
  - `AboutPage.tsx` — bio, neofetch, skills, contacto y CV.
  - `ContactPage.tsx` — contacto, disponibilidad, proceso y email.
  - `HomeStatic.tsx` — contenido inicial de la home.
- `src/components/ProjectMedia.tsx`: previews de imagen/código, enlaces live/source y código con resaltado básico, compartido por índice, detalle y app del escritorio.
- `src/components/ServicesContent.tsx`: todo el contenido de servicios, compartido por `ServicesApp` (ventana) y `ServicesPage` (estática); los niveles de encabezado y el CTA cambian según el modo.
- `src/components/ContactDetails.tsx`: lista de contacto, acciones y proceso, compartido por `ContactApp` y `ContactPage`.
- `src/components/ProfileSummary.tsx`: retrato, neofetch, bio y chips, compartido por `AboutApp` y `AboutPage`.
- `src/entry-server.tsx`: resuelve la ruta, el idioma y el proyecto, renderiza con `renderToStaticMarkup` y devuelve metadatos + cuerpo.
- `LanguageProvider` acepta `initialLang` para renderizar sin `document`.
- `PageShell` incluye migas de pan visibles (`Home > Sección` o `Home > Projects > Proyecto`) y el selector de idioma como enlace real.

### 2.3 CSS y assets

- `src/pages/static.css` se importa desde `main.tsx`, así que entra en el bundle CSS del cliente y lo usan tanto la home como las páginas estáticas.
- Clases planas `staticShell`, `staticWindow`, `staticH1`, `staticRole`, `staticBreadcrumb`, etc. para que el HTML del servidor y el CSS del cliente coincidan sin depender de hashes.
- Los componentes de contenido reutilizan `src/apps/apps.module.css`; los hashes de CSS Modules coinciden entre el build cliente y el SSR.
- Las imágenes (`self`, `mock*`) se resuelven a las mismas URLs `/assets/*` que emite el build cliente y llevan `width`/`height` intrínsecos (`src/data/imageSizes.ts`).
- Tema claro/oscuro: script inline en cada página que lee `localStorage.theme` o `prefers-color-scheme`; los acentos del tema claro se oscurecieron para cumplir contraste y `--accent-on-dark` conserva el acento brillante en paneles oscuros (ver §5).
- El gradiente del H1 usa `background-image` en tema claro para no resetear `background-clip: text`.

## 3. SEO por página

Cada HTML generado incluye:

- `<title>` y `description` desde `src/routes.ts` (rutas estáticas) o `project.seoTitle`/`seoDescription` (casos).
- `canonical` absoluto y `hreflang` en/es/x-default.
- Open Graph y Twitter Card con imagen por idioma.
- `robots: index, follow, max-image-preview:large`.
- JSON-LD:
  - Base `Person` + `WebSite` + `ProfessionalService` desde `src/seo/base-graph.*.json`.
  - `WebPage` y `BreadcrumbList` en todas las páginas excepto la home (que no tiene migas), y `CreativeWork` en proyectos.
- Migas de pan visibles (`Home > Services`, `Home > Projects > Proyecto`) alineadas con el `BreadcrumbList`; el último ítem de proyecto usa el título corto, no el `seoTitle`.
- Un solo `<h1>`; jerarquía H2/H3. La home usa un H1 de rol, About usa “About Jose Carlos Blanco” y Projects “Projects & case studies”.
- Enlaces internos en el dock, tarjetas, breadcrumbs y CTA.
- `lang` correcto por página.
- Imágenes con `width`/`height` intrínsecos (`src/data/imageSizes.ts`).

El `sitemap.xml` se genera desde `staticPaths()` + `projectStaticPaths()` con `lastmod` de build y alternates. `public/sitemap.xml` se eliminó: el sitemap es un artefacto de build en `dist/`.

## 4. Verificación

- `npm run build`: OK; **26 páginas** y **26 URLs** en el sitemap.
- Todas las URLs del sitemap tienen fichero, canonical propio, 1 H1, title, description y hreflang: **0 errores** en la validación automática.
- Páginas de contenido: **0 scripts de React**; CSS y JSON-LD presentes.
- Home:
  - Sin JS: shell estático, 1 H1 de rol, **153 palabras**, **20 enlaces**, sin `<noscript>`.
  - Con JS: el escritorio reemplaza el shell; **2 ventanas** (About y Terminal), **0 ventanas ocultas**; 1 H1; enlace real a `/es/`; dock con enlaces reales; al hacer clic en Services se abre la ventana sin navegar.
- Navegación con JS desactivado: Home → Services → ES Services → Projects → caso JM Sánchez → volver a Projects.
- Migas de pan visibles y schema coincidente en About, Services, Projects y casos; la home no tiene migas.
- Imágenes: 0 `<img>` sin `width`/`height` en las 26 páginas.
- Lighthouse (localhost, tema claro):
  - `/services/`: Performance **99**, Accessibility **100**, Best Practices **100**, SEO **100**; LCP 1,6 s; CLS 0.
  - `/contact/` y `/about/`: **99 / 100 / 100 / 100**.
  - `/projects/`: Performance **92**, Accessibility **100**, Best Practices **100**, SEO **100**.
- `dist` ~1,6 MB; CSS 38 KB (7,6 KB gzip); las páginas estáticas no cargan el bundle React de 238 KB (74 KB gzip).

## 5. Accesibilidad

- Se oscurecieron `--accent` y `--accent-2` en el tema claro para que el texto y los iconos cumplan contraste.
- `--accent-on-dark` conserva el acento brillante en paneles de código y mockups, que siempre son oscuros.
- El gradiente del H1 en tema claro usa `background-image`; ya no resetea `background-clip: text`.
- Se eliminaron `aria-label` que no incluían el texto visible del selector de idioma y del CV.
- El puente de la Fase 1 se retiró; las ventanas minimizadas usan `inert` y la terminal recupera el foco al reabrirse.
- Resultado: accesibilidad **100** en Services, Contact, About y Projects.

## 6. Limitaciones

- Las páginas estáticas solo existen tras `npm run build`; `npm run dev` no las genera. Para previsualizarlas: `npm run build && npm run preview` (o Docker).
- `vite preview` aplica su fallback SPA: una ruta inexistente o `/services` sin barra devuelven la home. Eso es solo del servidor de preview; nginx (`try_files $uri $uri/ =404`) devuelve 404 real y redirige los directorios a su barra final.
- La home sigue cargando React (74 KB gzip) para el escritorio; las páginas de contenido no.
- Las tarjetas de proyecto sin imagen no son clicables en la zona de código; el título y el enlace "case study" sí.
- `year` de los proyectos sigue opcional; el contenido de los casos es un primer borrador a validar (Fase 4).
- Las imágenes OG son por idioma, no por página; el schema por página se ampliará en la Fase 5.
- Las fuentes siguen viniendo de Google Fonts; el self-host es Fase 6.
- El tema de las páginas estáticas se aplica con un script inline; no hay toggle en el shell (se cambia desde la home).
- `public/sitemap.xml` ya no existe; el sitemap solo se genera en `dist/` durante `npm run build`. Un `vite build` aislado no lo produce.

## 7. Siguiente

- Fase 4: revisar y ampliar el copy de servicios, proyectos y about; validar `year` y resultados.
- Fase 5: OG por página y schema detallado (`Service`, `FAQPage`, `SoftwareSourceCode`, `dateCreated`).
- Fase 6: self-host de fuentes, preload y optimización de la home.
