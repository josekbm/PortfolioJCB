# Fase 1 — Quick wins SEO

**Fecha:** 2026-11-19
**Estado:** implementado y verificado en local; pendiente de despliegue
**Rama sugerida:** `seo/phase-1-quick-wins`

---

## 1. Alcance

Cambios de bajo riesgo y alto impacto para que el contenido exista, haya jerarquía semántica, metadatos correctos, datos estructurados y un servidor que no genere soft 404 ni contenido duplicado.

## 2. Cambios realizados

### 2.1 H1 y jerarquía

- `src/apps/AboutApp.tsx`: añadido un `<h1>` con nombre y rol (`{info.firstName} {info.lastName} — {info.role}`).
- `src/apps/apps.module.css`: nueva clase `.srOnly` para mantener el H1 accesible sin alterar la composición visual.
- El H1 se renderiza en la ventana About, abierta por defecto.

### 2.2 Fallback sin JavaScript

- `index.html` y `es/index.html`: bloque `<noscript>` con overlay fijo, H1, bio corta, servicios, trabajos seleccionados, email, GitHub, LinkedIn, CV y enlace al otro idioma.
- Los estilos del fallback están en `<head>` y solo afectan a `#nojs-fallback`, que no existe cuando JavaScript está activo.
- Resultado medido: **1 H1, 3 H2, 5 enlaces y 141 palabras** con JS desactivado.

### 2.3 Metadatos

| Elemento | Antes | Ahora |
|---|---|---|
| `description` EN | 163 | **141** |
| `description` ES | 177 | **143** |
| `title` ES | 73 | **58** |
| `meta keywords` | Presente | **Eliminado** |
| `robots` | Ausente | `index, follow, max-image-preview:large` |
| `og:image:type` | Ausente | `image/png` |
| `twitter:image:alt` | Ausente | Añadido |

Open Graph y Twitter descriptions se alinearon con la description principal.

### 2.4 Datos estructurados

`index.html` y `es/index.html` incluyen un `@graph` JSON-LD con:

- `Person` (`@id: /#person`): nombre, cargo, descripción, URL, imagen, email, dirección, `sameAs` (GitHub, LinkedIn), `knowsAbout`, `worksFor`.
- `WebSite` (`@id: /#website`): URL, nombre, descripción, idiomas, publisher.
- `ProfessionalService` (`@id: /#business`): nombre, URL, descripción, imagen, logo, email, fundador, dirección, `areaServed`, `sameAs`, `serviceType` y `hasOfferCatalog` con los cuatro servicios.

La imagen `Person` usa una URL estable: `public/portrait.webp` (copia de `src/img/self.webp`, 640×640).

### 2.5 Servidor

- `nginx.conf`:
  - `www.blancodev.es` → **301** a `https://blancodev.es$request_uri`.
  - `error_page 404 /404.html` y `try_files $uri $uri/ =404` (sin fallback a la home).
  - `Strict-Transport-Security` añadido vía snippet.
  - `gzip_types` ampliado con `application/xml`.
- `nginx/security-headers.conf`: HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
  - HSTS se aplica sin `includeSubDomains` para no romper subdominios que aún no hayan migrado a HTTPS. Se puede añadir cuando todos estén en HTTPS.
- `Dockerfile`: copia el snippet y ejecuta `RUN nginx -t`, de modo que el build falla si la configuración es inválida.
- `public/404.html`: página bilingüe, `noindex`, enlaces a home EN/ES, email, GitHub y LinkedIn.

> **Nota de despliegue:** el bloque de `www` solo actúa si el reverse proxy (Nginx Proxy Manager) enruta `www.blancodev.es` a este contenedor y conserva la cabecera `Host`. Si no lo hace, el 301 debe configurarse en NPM. Verificar tras desplegar.

### 2.6 Puente de contenido (temporal)

- `src/os/Desktop.tsx`: las 6 apps se montan siempre; las cerradas se ocultan con el atributo `hidden`.
- `src/os/Window.tsx` + `Window.module.css`: soporte de `hidden` y regla `.window[hidden] { display: none; }`.
- Efecto: el DOM contiene Servicios, Proyectos, Skills y Contacto sin interacción.
- Es una medida puente. La Fase 3 la sustituye por páginas estáticas; no debe considerarse la solución definitiva.
- **Retirado en la Fase 3:** el escritorio vuelve a montar solo las ventanas abiertas; las páginas estáticas cubren el contenido rastreable.

## 3. Verificación local

Comandos y resultados:

```bash
npm run build
# tsc --noEmit + vite build OK

# JSON-LD válido en ambos HTML
python3 -c "import json,re; ..."  # 3 nodos por página

# DOM con JS activado (Puppeteer + Chrome for Testing)
# 1 H1 · 2 H2 · 24 enlaces · 6 ventanas (4 hidden) · todas las secciones en el DOM

# DOM con JS desactivado
# 1 H1 · 3 H2 · 5 enlaces · 141 palabras · fallback visible
```

Metadatos verificados:

- EN: title 52, description 141.
- ES: title 58, description 143.
- JSON-LD: 1 bloque válido por página, 3 nodos.

## 4. Verificación pendiente tras desplegar

```bash
curl -sI https://blancodev.es/ | grep -i strict-transport-security
curl -s -o /dev/null -w "%{http_code}\n" https://blancodev.es/esto-no-existe   # 404
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://www.blancodev.es/ # 301
curl -s https://blancodev.es/esto-no-existe | grep noindex                     # página 404 bilingüe

ASSET=$(curl -s https://blancodev.es/ | grep -o '/assets/main-[^"]*\.js' | head -1)
curl -sI "https://blancodev.es$ASSET" | grep -iE 'cache-control|x-content-type|x-frame|referrer'
# Esperado: public, max-age=31536000, immutable + las 3 cabeceras de seguridad
```

Además:

- Rich Results Test sobre `/` y `/es/`.
- Schema Markup Validator.
- Inspeccionar URL en GSC y comprobar el HTML renderizado.

## 5. Limitaciones conocidas

- El contenido de las secciones cerradas está en el DOM pero oculto con `display: none`; Google puede indexarlo, pero con menos peso que una página estática. Se resuelve en la Fase 3.
- El H1 de About es visualmente oculto; en la Fase 4 cada página tendrá su H1 visible.
- `www`, 404 y HSTS dependen del despliegue real y del reverse proxy.
- Los assets medidos antes de la fase devolvían `max-age=28843` (~8 h), sin `immutable` y sin cabeceras de seguridad, aunque la config del repo pedía cache immutable. Hay que verificar que el edge/NPM no las reescribe.
- No se han tocado los metadatos por ruta porque aún no existen rutas públicas (Fase 3).

## 6. Rollback

`git revert` del commit de la fase. Todo el build (HTML, bundle React, `public/`, `nginx.conf`, `nginx/security-headers.conf` y `Dockerfile`) se despliega junto; el único cambio de infraestructura es la configuración de nginx y el Dockerfile.

> **Entrega:** `public/404.html`, `public/portrait.webp`, `nginx/security-headers.conf`, `src/routes.ts` y `docs/` son archivos nuevos. Deben incluirse en el commit; si solo se commitean los modificados, el build de Docker falla en `COPY nginx/security-headers.conf` y faltan el 404 y el retrato.
