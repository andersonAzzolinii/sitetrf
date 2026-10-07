/**
 * Compara a altura de cada <section> de uma rota nos dois lados.
 * Mostra onde o layout diverge, em ordem.
 *
 *   node scripts/sections.mjs <rota> [largura]
 */
import { chromium } from 'playwright';

const ORIG = 'http://localhost:8080';
const NOVO = 'http://localhost:5173';
const [route = '/', width = '1440'] = process.argv.slice(2);

const browser = await chromium.launch();

async function read(base) {
  const page = await browser.newPage({ viewport: { width: Number(width), height: 1000 } });
  await page.goto(base + route, { waitUntil: 'networkidle', timeout: 90000 });
  await page.addStyleTag({
    content: '*,*::before,*::after{animation:none!important;transition:none!important}',
  });
  await page.evaluate(() => document.querySelectorAll('.rv').forEach((e) => e.classList.add('in')));
  await page.waitForTimeout(700);
  const d = await page.evaluate(() => {
    const m = document.querySelector('main') ?? document.body;
    return {
      total: Math.round(document.documentElement.scrollHeight),
      main: Math.round(m.getBoundingClientRect().height),
      secs: Array.from(m.querySelectorAll(':scope > section')).map((s) => ({
        cls: s.className,
        h: Math.round(s.getBoundingClientRect().height),
      })),
    };
  });
  await page.close();
  return d;
}

const a = await read(ORIG);
const b = await read(NOVO);

console.log(`doc   orig=${a.total}  novo=${b.total}  (${b.total - a.total >= 0 ? '+' : ''}${b.total - a.total})`);
console.log(`main  orig=${a.main}   novo=${b.main}   (${b.main - a.main >= 0 ? '+' : ''}${b.main - a.main})\n`);
console.log('#   classe (orig)'.padEnd(46) + 'orig'.padStart(6) + 'novo'.padStart(7) + '  delta');

const n = Math.max(a.secs.length, b.secs.length);
for (let i = 0; i < n; i++) {
  const sa = a.secs[i];
  const sb = b.secs[i];
  const cls = (sa?.cls ?? '(ausente)').slice(0, 42);
  const ha = sa ? sa.h : 0;
  const hb = sb ? sb.h : 0;
  const d = hb - ha;
  const mark = !sa || !sb ? ' <-- FALTA BLOCO' : Math.abs(d) > 12 ? ' <--' : '';
  console.log(
    `${String(i).padStart(2)}  ${cls.padEnd(44)}${String(ha).padStart(5)}${String(hb).padStart(7)}  ${d >= 0 ? '+' : ''}${d}${mark}`,
  );
  if (sa && sb && sa.cls !== sb.cls) console.log(`       novo.classe = ${sb.cls}`);
}

await browser.close();
