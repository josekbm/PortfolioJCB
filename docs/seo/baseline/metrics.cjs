const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer-core');

/**
 * Reproduces the rendered-DOM metrics from the baseline.
 *
 * Usage (CommonJS so NODE_PATH works):
 *   npm --prefix /tmp/seo-tools install puppeteer-core
 *   CHROME_PATH="/path/to/chrome" \
 *     NODE_PATH=/tmp/seo-tools/node_modules \
 *     node docs/seo/baseline/metrics.cjs
 *
 * Method: viewport 1280x900, wait 3.5 s after `load` (the boot sequence takes
 * ~2.15 s), then read `document.body.innerText` and `textContent`.
 */
const chrome = process.env.CHROME_PATH;
if (!chrome) {
  console.error('Set CHROME_PATH to a Chrome/Chromium executable.');
  process.exit(1);
}

const urls = {
  en: 'https://blancodev.es/',
  es: 'https://blancodev.es/es/',
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: 'new',
    args: ['--no-sandbox'],
  });

  const out = {};
  for (const [lang, url] of Object.entries(urls)) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(url, { waitUntil: 'load' });
    await new Promise((resolve) => setTimeout(resolve, 3500));
    out[lang] = await page.evaluate(() => {
      const inner = document.body.innerText.replace(/\s+/g, ' ').trim();
      const text = document.body.textContent.replace(/\s+/g, ' ').trim();
      const links = [...document.querySelectorAll('a')].map((a) => {
        const href = a.getAttribute('href');
        return {
          href,
          text: a.textContent.trim(),
          external: /^https?:/.test(href || ''),
        };
      });
      return {
        innerTextWords: inner.split(' ').filter(Boolean).length,
        textContentWords: text.split(' ').filter(Boolean).length,
        h1: document.querySelectorAll('h1').length,
        h2: document.querySelectorAll('h2').length,
        h3: document.querySelectorAll('h3').length,
        links,
      };
    });
    await page.close();
  }

  await browser.close();
  const target = path.join(__dirname, 'dom-metrics.json');
  fs.writeFileSync(target, JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
