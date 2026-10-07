/**
 * Compara um recorte (seletor) do espelho original com o do app novo.
 *
 *   node scripts/compare.mjs <rotaA> <rotaB> <seletor> <saida-base> [larguras...]
 *   node scripts/compare.mjs / / "header.site" out/header 1440 1280 900
 *
 * Gera <base>-<w>-orig.png, <base>-<w>-novo.png e imprime as metricas
 * computadas dos dois lado a lado.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const ORIG = 'http://localhost:8080';
const NOVO = 'http://localhost:5173';

const [routeA, routeB, selector, outBase, ...ws] = process.argv.slice(2);
const widths = (ws.length ? ws : ['1440']).map(Number);

const browser = await chromium.launch();

async function grab(base, route, width, tag) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => document.querySelectorAll('.rv').forEach((e) => e.classList.add('in')));
  await page.waitForTimeout(600);

  const el = await page.$(selector);
  const out = `${outBase}-${width}-${tag}.png`;
  mkdirSync(dirname(out), { recursive: true });
  if (el) await el.screenshot({ path: out });
  else await page.screenshot({ path: out });

  const metrics = await page.evaluate((sel) => {
    const e = document.querySelector(sel);
    if (!e) return { missing: true };
    const r = e.getBoundingClientRect();
    const cs = getComputedStyle(e);
    const logo = e.querySelector('img');
    const nav = e.querySelector('nav.main');
    const firstLink = e.querySelector('nav.main summary, nav.main a.navlink');
    const cta = e.querySelector('.hdr-cta');
    return {
      w: Math.round(r.width),
      h: Math.round(r.height),
      bg: cs.backgroundColor,
      logoH: logo ? Math.round(logo.getBoundingClientRect().height) : null,
      navW: nav ? Math.round(nav.getBoundingClientRect().width) : null,
      linkFont: firstLink ? getComputedStyle(firstLink).fontSize : null,
      linkPad: firstLink ? getComputedStyle(firstLink).padding : null,
      ctaFont: cta ? getComputedStyle(cta).fontSize : null,
      ctaH: cta ? Math.round(cta.getBoundingClientRect().height) : null,
    };
  }, selector);

  await page.close();
  return { out, metrics };
}

for (const w of widths) {
  const a = await grab(ORIG, routeA, w, 'orig');
  const b = await grab(NOVO, routeB, w, 'novo');
  console.log(`\n=== ${selector} @ ${w}px ===`);
  const keys = new Set([...Object.keys(a.metrics), ...Object.keys(b.metrics)]);
  for (const k of keys) {
    const va = a.metrics[k];
    const vb = b.metrics[k];
    const same = String(va) === String(vb);
    console.log(`  ${same ? 'OK  ' : 'DIF '} ${k.padEnd(10)} orig=${String(va).padEnd(22)} novo=${vb}`);
  }
}

await browser.close();
