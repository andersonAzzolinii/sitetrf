/**
 * Screenshot utilitario.
 *   node scripts/shot.mjs <url> <saida.png> [largura] [--full]
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const [url, out, w = '1440', ...rest] = process.argv.slice(2);
const full = rest.includes('--full');

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(w), height: 1000 },
  deviceScaleFactor: 1,
});

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1200);

// dispara o reveal de tudo que ainda nao entrou em viewport
await page.evaluate(() => document.querySelectorAll('.rv').forEach((e) => e.classList.add('in')));
await page.waitForTimeout(700);

mkdirSync(dirname(out), { recursive: true });
await page.screenshot({ path: out, fullPage: full });

const info = await page.evaluate(() => {
  const b = document.body;
  const cs = getComputedStyle(b);
  const h1 = document.querySelector('h1');
  return {
    title: document.title,
    bodyFont: cs.fontFamily,
    bodyBg: cs.backgroundColor,
    h1Font: h1 ? getComputedStyle(h1).fontFamily : null,
    h1Size: h1 ? getComputedStyle(h1).fontSize : null,
    docHeight: document.documentElement.scrollHeight,
    fontsLoaded: Array.from(document.fonts).map((f) => `${f.family} ${f.weight} ${f.status}`),
  };
});

console.log(JSON.stringify(info, null, 2));
if (errors.length) console.log('ERROS NO CONSOLE:\n' + errors.join('\n'));
else console.log('sem erros de console');

await browser.close();
