import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  projectSlugs,
  projectStaticPaths,
  renderPage,
  staticPaths,
} from '../.ssr/entry-server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const SITE = 'https://blancodev.es';
const today = new Date().toISOString().slice(0, 10);

const baseGraphs = {
  en: JSON.parse(
    fs.readFileSync(path.join(root, 'src/seo/base-graph.en.json'), 'utf8'),
  ),
  es: JSON.parse(
    fs.readFileSync(path.join(root, 'src/seo/base-graph.es.json'), 'utf8'),
  ),
};

const breadcrumbLabels = {
  en: {
    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
  },
  es: {
    home: 'Inicio',
    services: 'Servicios',
    projects: 'Proyectos',
    about: 'Sobre mí',
    contact: 'Contacto',
  },
};

function abs(pathname) {
  return `${SITE}${pathname}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeXml(value) {
  return escapeHtml(value).replace(/'/g, '&apos;');
}

function serializeGraph(graph) {
  return JSON.stringify(graph).replace(/</g, '\\u003c');
}

function pageGraph(page) {
  const graph = structuredClone(baseGraphs[page.lang]);
  const labels = breadcrumbLabels[page.lang];
  const homePath = page.lang === 'es' ? '/es/' : '/';
  const isHome = page.routeKey === 'home';
  const items = [];

  if (!isHome) {
    items.push({ name: labels.home, item: abs(homePath) });

    if (page.projectSlug) {
      items.push({
        name: labels.projects,
        item: abs(page.lang === 'es' ? '/es/proyectos/' : '/projects/'),
      });
      items.push({
        name: page.breadcrumbTitle ?? page.title,
        item: abs(page.path),
      });
    } else {
      items.push({ name: labels[page.routeKey], item: abs(page.path) });
    }
  }

  const breadcrumbId = isHome ? null : `${abs(page.path)}#breadcrumb`;
  const webPageId = `${abs(page.path)}#webpage`;

  if (breadcrumbId) {
    graph['@graph'].push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    });
  }

  graph['@graph'].push({
    '@type': 'WebPage',
    '@id': webPageId,
    url: abs(page.path),
    name: page.title,
    description: page.description,
    inLanguage: page.lang,
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#person` },
    ...(breadcrumbId ? { breadcrumb: { '@id': breadcrumbId } } : {}),
  });

  if (page.projectSlug) {
    graph['@graph'].push({
      '@type': 'CreativeWork',
      '@id': `${abs(page.path)}#project`,
      name: page.title,
      description: page.description,
      url: abs(page.path),
      inLanguage: page.lang,
      creator: { '@id': `${SITE}/#person` },
    });
  }

  return graph;
}

function pageHtml(page, cssLink) {
  const image = `${SITE}/og-image${page.lang === 'es' ? '-es' : ''}.png`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const manifest = page.lang === 'es' ? '/site.es.webmanifest' : '/site.webmanifest';

  return `<!doctype html>
<html lang="${page.lang}" data-lang="${page.lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="author" content="Jose Carlos Blanco" />
    <meta name="theme-color" content="#0b0f14" />
    <script>
      try {
        var stored = localStorage.getItem('theme');
        var theme =
          stored === 'light' || stored === 'dark'
            ? stored
            : window.matchMedia('(prefers-color-scheme: light)').matches
              ? 'light'
              : 'dark';
        document.documentElement.dataset.theme = theme;
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b0f14' : '#f6f7fb');
      } catch (e) {}
    </script>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="${manifest}" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${abs(page.path)}" />
    <link rel="alternate" hreflang="en" href="${abs(page.enPath)}" />
    <link rel="alternate" hreflang="es" href="${abs(page.esPath)}" />
    <link rel="alternate" hreflang="x-default" href="${abs(page.enPath)}" />
    <meta property="og:type" content="${page.ogType}" />
    <meta property="og:site_name" content="blancodev" />
    <meta property="og:locale" content="${page.lang === 'es' ? 'es_ES' : 'en_GB'}" />
    <meta property="og:locale:alternate" content="${page.lang === 'es' ? 'en_GB' : 'es_ES'}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${abs(page.path)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${title}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${title}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@400;500;700&amp;display=swap"
      rel="stylesheet"
    />
    ${cssLink}
    <script type="application/ld+json">${serializeGraph(pageGraph(page))}</script>
    <script
      defer
      src="https://stats.blancodev.es/script.js"
      data-website-id="4c1854a7-3d39-4398-8cd5-646e37ddd501"
      data-domains="blancodev.es,www.blancodev.es"
    ></script>
  </head>
  <body>
    <div id="root">${page.body}</div>
  </body>
</html>
`;
}

function injectHome(html, page) {
  const script = html.match(/<script type="module"[^>]*><\/script>/)?.[0];
  if (!script) {
    throw new Error('Could not find the React entry script in the home HTML.');
  }

  // Rebuild the home from the same head/body template as the content pages,
  // so titles, descriptions, canonical, hreflang and OG come from routes.ts.
  // Then re-attach the React entry script: it replaces the static shell.
  return pageHtml(page, cssLink).replace(
    '</body>',
    () => `  ${script}\n  </body>`,
  );
}

function writePage(pathname, html) {
  const rel = pathname.replace(/^\/+|\/+$/g, '');
  const outDir = path.join(dist, rel);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
}

function sitemap(paths) {
  const urls = paths.map((pathname) => {
    const page = renderPage(pathname);
    if (!page) throw new Error(`No page metadata for ${pathname}`);
    return { path: page.path, enPath: page.enPath, esPath: page.esPath };
  });

  const body = urls
    .map(
      (url) => `  <url>
    <loc>${escapeXml(abs(url.path))}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(abs(url.enPath))}" />
    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(abs(url.esPath))}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(abs(url.enPath))}" />
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${body}
</urlset>
`;
}

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  throw new Error('dist/index.html not found. Run the client build first.');
}

const homeHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const cssLink = homeHtml.match(/<link rel="stylesheet"[^>]*>/)?.[0];
if (!cssLink) {
  throw new Error('Could not find the stylesheet link in dist/index.html.');
}

const staticPages = staticPaths();
const projectPages = projectStaticPaths(projectSlugs());
const allPaths = [...new Set([...staticPages, ...projectPages].map((item) => item.path))];

let written = 0;
for (const pathname of allPaths) {
  const page = renderPage(pathname);
  if (!page) throw new Error(`No page rendered for ${pathname}`);

  if (pathname === '/' || pathname === '/es/') {
    const homeFile = path.join(dist, page.lang === 'es' ? 'es/index.html' : 'index.html');
    const source = fs.readFileSync(homeFile, 'utf8');
    fs.writeFileSync(homeFile, injectHome(source, page));
  } else {
    writePage(pathname, pageHtml(page, cssLink));
  }
  written += 1;
}

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap(allPaths));

console.log(
  `Prerendered ${written} pages and a sitemap with ${allPaths.length} URLs.`,
);
