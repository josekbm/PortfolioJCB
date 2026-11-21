# Fase 4 — Contenido

**Fecha:** 2026-11-21
**Estado:** implementado, desplegado y verificado en producción
**Commit:** `4498625`
**Dependencias:** Fases 0-3

---

## 1. Decisiones de contenido

Antes de reescribir el copy se validaron con el usuario los datos que no podían deducirse del repositorio:

- **Años:** no se muestran. `year` queda vacío y no se renderiza.
- **Trabajo de cliente:** solo JM Sánchez. El resto son proyectos personales o de bootcamp, y el índice lo dice explícitamente.
- **Pruebas:** no hay métricas ni testimonios que se puedan publicar. No se inventan.
- **Contacto:** disponibilidad actual y respuesta en 24-48 horas laborables (hora de Madrid).
- **Experiencia:** se incorpora la del CV incluido en `public/CV_Jose_Carlos_Blanco.pdf`.

## 2. Correcciones factuales

Los casos describían stacks que no coincidían con los repositorios públicos. Se corrigieron:

| Proyecto | Antes | Ahora |
|---|---|---|
| JM Sánchez | Web de una página | Web multipágina: 9 URLs, 4 páginas de servicio y precios |
| Gamer's Nest | React + TypeScript + CSS Modules | React 18 + JavaScript + Material UI + API de RAWG |
| Miranda's Dashboard | Sass, login protegido | Redux Toolkit, styled-components, rutas protegidas y tests de Cypress |
| Miranda's Backend | Node.js + Express + MongoDB | TypeScript + Express + JWT/Passport + validación + almacén JSON |
| OXYGENShop | Tarjetas de producto y carrito | Planes de precios, selector de divisas, modal, slider y newsletter (no hay carrito) |
| Photo Dash | JavaScript vanilla + CSS3 | React + Redux Toolkit + API de Unsplash + MUI |
| Hotel Miranda | CSS + JavaScript | SCSS + BEM + Swiper para los sliders |
| API REST .NET | .NET genérico | .NET 7 + EF Core + SQLite + JWT |

También se corrigieron sobreclaims menores: `react-spinners` no se usa en Photo Dash, y el backend de Miranda no es consumido por el dashboard público.

## 3. Ampliación de los casos

Cada caso tiene ahora un problema, una solución y unos resultados apoyados en el repositorio o la demo real. Se eliminaron las afirmaciones que no se podían verificar.

Palabras en el HTML final (EN/ES):

| Página | Antes (producción) | Ahora (EN/ES) |
|---|---|---|
| JM Sánchez | 190 | 283 / 318 |
| Gamer's Nest | 144 | 296 / 316 |
| Miranda's Dashboard | 141 | 274 / 291 |
| Miranda's Backend | 197 | 315 / 352 |
| OXYGENShop | 123 | 271 / 295 |
| Photo Dash | 133 | 265 / 300 |
| Hotel Miranda | 128 | 259 / 273 |
| API REST .NET | 239 | 354 / 381 |
| About | 202 | 399 / 438 |
| Contact | 131 | 172 / 178 |
| Projects | 356 | 386 / 438 |
| Services | 733 | 735 / 788 |
| Home | 163 | 172 / 184 |

No se añadieron años, métricas ni testimonios.

## 4. About y experiencia

- `src/data/info.ts` e `info.es.ts` incorporan `experience` y `education` tipados.
- `src/components/ExperienceContent.tsx` renderiza la trayectoria en About (página estática y ventana del escritorio):
  - AMETEL — Full Stack & Process Automation Engineer (Feb 2024 — actualidad).
  - Oxygen Coworking — Full Stack Developer (Mar 2023 — Ago 2023).
  - INNN — Front-End Developer (Oct 2022 — Feb 2023).
  - DAW en Ilerna, formación Full Stack en Oxygen Academy y certificado EF SET C2.
- La ventana About del escritorio comparte el mismo componente.

## 5. Contacto

- Intro con el tipo de encargo que se acepta y confirmación de lectura personal.
- Bloque “Qué incluir en tu primer correo”: objetivo, plazo/restricciones y enlaces.
- Compromiso de respuesta en 24-48 horas laborables (hora de Madrid).
- Se mantiene el proceso de 4 pasos y el estado de disponibilidad.

## 6. Enlazado interno y tono

- Cada caso incluye ahora dos casos relacionados (`More case studies` / `Más casos de estudio`), con prioridad por categoría. Todas las páginas de proyecto tienen 21 enlaces internos.
- El índice de proyectos explica que mezcla trabajo de cliente y proyectos personales.
- La home muestra el estado de disponibilidad.
- Se revisó el tono EN/ES: se eliminaron anglicismos innecesarios (`founders`, `retainers`, `briefing`), se unificó el tratamiento de tú y se corrigieron frases que sonaban a traducción automática.
- Se unificó el inglés británico (`containerised`, `practise`, `favourites`, `sanitises`).

## 7. Verificación

- `npm run build`: OK; 26 páginas y 26 URLs en el sitemap.
- Producción (`https://blancodev.es`, 2026-11-21): 26 URLs, 0 problemas de título/description/H1/canonical, contenido nuevo visible en About, Contacto y los 8 casos.
- Assets: `Cache-Control: public, max-age=31536000, immutable`; cabeceras de seguridad presentes.
- `title` ≤60 y `description` ≤155 en las 26 páginas: **0 problemas**.
- Un solo `<h1>` por página, canonical propio y 3 `hreflang`: **0 errores**.
- JSON-LD válido en las 26 páginas: **0 errores**.
- Enlaces internos: **35 destinos únicos, 0 enlaces rotos**.
- Sin títulos ni descripciones duplicados.
- `sitemap.xml`: 26 URLs únicas, sin `404.html`.
- Páginas de contenido: 0 scripts de React; About y casos mantienen HTML estático.

## 8. Limitaciones y siguiente

- La experiencia se ha transcrito del CV; el usuario debe confirmar cargos y fechas si cambian.
- No hay métricas, testimonios ni años. Si aparecen pruebas reales, se pueden añadir en una revisión posterior.
- El bundle JS de la home crece de ~74 KB a ~79,6 KB gzip por el mayor volumen de datos. Es esperado; la Fase 6 puede separar datos por ruta o cargar el escritorio de forma diferida.
- Sigue pendiente desactivar **Cache Assets** en NPM (§6 del HANDOFF) y verificar GSC/Bing.
- Fase 5: OG por página y schema detallado (`Service`, `FAQPage`, `SoftwareSourceCode`, `dateCreated`).
