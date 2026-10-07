/**
 * Mede propriedades computadas de varios seletores nos dois lados e aponta as diferencas.
 *
 *   node scripts/measure.mjs <rota> <largura> <sel1> <sel2> ...
 */
import { chromium } from 'playwright';

const ORIG = 'http://localhost:8080';
const NOVO = 'http://localhost:5173';

const [route, width, ...sels] = process.argv.slice(2);

const PROPS = [
  'display',
  'fontSize',
  'fontWeight',
  'fontFamily',
  'lineHeight',
  'letterSpacing',
  'color',
  'backgroundColor',
  'margin',
  'padding',
  'gap',
  'gridTemplateColumns',
  'alignItems',
  'justifyContent',
  'borderTop',
  'borderBottom',
  'textTransform',
  'maxWidth',
  'width',
  'height',
  'clipPath',
  'flexDirection',
  'aspectRatio',
  'objectFit',
  'position',
];

const browser = await chromium.launch();

async function read(base) {
  const page = await browser.newPage({ viewport: { width: Number(width), height: 1000 } });
  await page.goto(base + route, { waitUntil: 'networkidle', timeout: 90000 });
  await page.evaluate(() => document.querySelectorAll('.rv').forEach((e) => e.classList.add('in')));
  await page.waitForTimeout(500);
  const data = await page.evaluate(
    ({ sels, PROPS }) => {
      const out = {};
      for (const s of sels) {
        const e = document.querySelector(s);
        if (!e) {
          out[s] = { MISSING: true };
          continue;
        }
        const cs = getComputedStyle(e);
        const r = e.getBoundingClientRect();
        const o = { _box: `${Math.round(r.width)}x${Math.round(r.height)}` };
        for (const p of PROPS) o[p] = cs[p];
        out[s] = o;
      }
      return out;
    },
    { sels, PROPS },
  );
  await page.close();
  return data;
}

const a = await read(ORIG);
const b = await read(NOVO);

for (const s of sels) {
  const da = a[s] ?? {};
  const db = b[s] ?? {};
  const diffs = [];
  for (const k of new Set([...Object.keys(da), ...Object.keys(db)])) {
    if (String(da[k]) !== String(db[k])) diffs.push([k, da[k], db[k]]);
  }
  console.log(`\n### ${s}`);
  if (da.MISSING || db.MISSING) {
    console.log(`  AUSENTE  orig=${!!da.MISSING ? 'nao existe' : 'ok'}  novo=${!!db.MISSING ? 'nao existe' : 'ok'}`);
    continue;
  }
  if (!diffs.length) console.log('  identico');
  else
    for (const [k, va, vb] of diffs)
      console.log(`  ${k.padEnd(20)} orig=${String(va).slice(0, 46).padEnd(48)} novo=${String(vb).slice(0, 46)}`);
}

await browser.close();
