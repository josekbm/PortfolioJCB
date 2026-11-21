# Fase 2 — Arquitectura de información y modelo de datos

**Fecha:** 2026-11-19
**Estado:** implementado
**Dependencias:** Fase 1 completada

---

## 1. Objetivo

Tener una única fuente de verdad para URLs, idiomas y metadatos, y un modelo de proyectos preparado para generar páginas de caso de estudio estáticas en la Fase 3.

## 2. Manifiesto de rutas

Archivo: `src/routes.ts`

```ts
import {
  ROUTES,
  PUBLIC_ROUTES,
  pathFor,
  alternatePath,
  routeForPath,
  projectForPath,
  projectPath,
  projectAlternatePath,
  staticPaths,
  projectStaticPaths,
} from './routes';
```

### 2.1 Mapa de URLs

| Ruta | EN | ES | `appId` | Indexable |
|---|---|---|---|---|
| Home | `/` | `/es/` | `null` (escritorio) | Sí |
| Servicios | `/services/` | `/es/servicios/` | `services` | Sí |
| Proyectos | `/projects/` | `/es/proyectos/` | `projects` | Sí |
| Caso de estudio | `/projects/<slug>/` | `/es/proyectos/<slug>/` | `projects` | Sí |
| Sobre mí | `/about/` | `/es/sobre-mi/` | `about` | Sí |
| Contacto | `/contact/` | `/es/contacto/` | `contact` | Sí |
| 404 | `/404.html` | `/404.html` | `null` | No |

### 2.2 Metadatos por ruta

Cada `RouteDef` incluye `title` y `description` en EN/ES, con límites SERP:

| Ruta | Title EN/ES | Desc EN/ES |
|---|---|---|
| Home | 52 / 58 | 141 / 143 |
| Services | 49 / 43 | 123 / 138 |
| Projects | 44 / 49 | 125 / 139 |
| About | 46 / 47 | 132 / 135 |
| Contact | 28 / 29 | 115 / 118 |

### 2.3 Helpers

| Helper | Uso |
|---|---|
| `pathFor(key, lang)` | URL de una ruta estática |
| `alternatePath(key, lang)` | URL gemela para el selector de idioma |
| `routeForPath(pathname)` | Resolver `/es/servicios` → ruta `services` (solo rutas estáticas) |
| `projectForPath(pathname)` | Resolver `/es/proyectos/<slug>/` → `{ slug, lang }` |
| `projectPath(slug, lang)` | URL de un caso de estudio |
| `projectAlternatePath(slug, lang)` | URL gemela del caso |
| `staticPaths()` | Pares ruta/idioma para el prerender |
| `projectStaticPaths(slugs)` | Pares proyecto/idioma para el prerender |

`routeForPath` normaliza barras finales y descarta query/hash.

## 3. Modelo de datos de proyectos

Archivo: `src/data/info.ts` (interfaz y datos EN) y `src/data/info.es.ts` (datos ES).

Nuevos campos en `Project`:

| Campo | Tipo | Uso |
|---|---|---|
| `slug` | `string` | URL estable del caso de estudio |
| `summary` | `string` | Tarjeta, listado y meta description corta |
| `seoTitle` | `string` | `<title>` de la página del proyecto |
| `seoDescription` | `string` | Meta description de la página |
| `year` | `number?` | Año de entrega; opcional hasta confirmarlo |
| `problem` | `string` | Contexto y objetivo del cliente |
| `solution` | `string` | Qué se construyó |
| `results` | `string[]` | Resultados honestos, sin métricas inventadas |

### 3.1 Slugs

| Proyecto | Slug |
|---|---|
| JM Sánchez · Cortador de Jamón | `jm-sanchez` |
| Gamer's Nest | `gamers-nest` |
| Miranda's Dashboard | `mirandas-dashboard` |
| Miranda's Backend | `mirandas-backend` |
| OXYGENShop | `oxygenshop` |
| Photo Dash | `photo-dash` |
| Hotel Miranda | `hotel-miranda` |
| API REST in .NET | `api-rest-dotnet` |

Los 8 slugs son únicos y coinciden en EN/ES.

### 3.2 Límites verificados

- `seoTitle` EN: 43-54 caracteres.
- `seoTitle` ES: 46-54 caracteres.
- `seoDescription` EN: 109-151 caracteres.
- `seoDescription` ES: 129-153 caracteres.

## 4. Enlazado interno previsto

```
Home
 ├─ Servicios ──→ Proyectos, Contacto
 ├─ Proyectos ──→ cada caso, Servicios, Contacto
 ├─ Sobre mí ──→ Servicios, Proyectos, Contacto
 └─ Contacto ──→ Servicios, Proyectos

Cada caso de estudio ──→ índice de proyectos, Servicios, Contacto
Cada página ──→ versión en el otro idioma (hreflang + selector)
```

Reglas:

- Todos los enlaces internos serán `<a href>`, no solo `onClick`.
- Anchor text descriptivo ("ver el caso de JM Sánchez", no "clic aquí").
- Ninguna página quedará a más de 2 clics desde la home.
- El dock y el menú usarán `pathFor`/`alternatePath`.

## 5. Validación

- `npm run build` pasa (`tsc --noEmit` + `vite build`).
- 8 slugs únicos en cada idioma.
- Paridad EN/ES de proyectos y slugs.
- Metadatos dentro de límites.
- `src/routes.ts` compila; aún no se importa en la UI (se usará en la Fase 3).

## 6. Pendiente / notas

- La Fase 3 ya regenera la home completa (head y body) desde `src/routes.ts` en el build; los `index.html` fuente quedan solo para `npm run dev`.
- `year` queda opcional; conviene rellenarlo con el año real de cada proyecto antes de publicar los casos.
- Los textos `problem`, `solution` y `results` son un primer borrador basado en la información existente; el usuario debe validarlos.
- No se han creado aún las páginas ni las URLs; esta fase solo define el contrato que consumirá la Fase 3.
- El sitemap se generará en la Fase 3 a partir de `PUBLIC_ROUTES` + `projectStaticPaths`.
