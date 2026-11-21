# SEO — blancodev.es

Documentación de trabajo del proyecto SEO.

## Estado

| Fase | Entregable | Estado |
|---|---|---|
| 0 | Baseline y medición | ✅ Documentado; GSC/Bing pendientes de cuenta |
| 1 | Quick wins | ✅ Implementado y verificado en local |
| 2 | Rutas y modelo de datos | ✅ Implementado y verificado |
| 3 | Páginas estáticas + shell | ✅ 26 URLs generadas y verificadas |
| 4 | Contenido | ✅ Casos, About y contacto revisados; 0 errores de metadatos |
| 5 | Metadatos y JSON-LD por página | ⏳ Siguiente |
| 6 | Rendimiento y CWV | ⏳ |
| 7 | SEO internacional | ⏳ |
| 8 | Autoridad y contenido continuo | ⏳ |
| 9 | QA, CI y despliegue | ⏳ |

## Documentos

- [Baseline 2026-11-19](baseline-2026-11-19.md)
- [Fase 1 — Quick wins](phase-1-quick-wins.md)
- [Fase 2 — Arquitectura](phase-2-architecture.md)
- [Fase 3 — Páginas estáticas](phase-3-static-pages.md)
- [Fase 4 — Contenido](phase-4-content.md)
- [Roadmap](roadmap.md)
- Artefactos de medición: `docs/seo/baseline/`

## Comandos útiles

```bash
npm run build
npm run dev
```

Verificación post-despliegue:

```bash
curl -sI https://blancodev.es/ | grep -i strict-transport-security
curl -s -o /dev/null -w "%{http_code}\n" https://blancodev.es/esto-no-existe
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://www.blancodev.es/
```

## Reglas del proyecto

- Una sola fuente de verdad para rutas: `src/routes.ts`.
- Un H1 por página; jerarquía H2/H3 sin saltos.
- Títulos ≤60 caracteres; descriptions ≤155.
- Nada de contenido distinto para bots y personas.
- Enlaces internos siempre con `<a href>`.
- No redirigir por IP ni por `Accept-Language`.
