/**
 * Compara o TEXTO renderizado de cada secao, original x novo.
 * Pega conteudo que o extrator deixou para tras.
 *
 *   node scripts/verify-text.mjs <rota> [--full]
 *   node scripts/verify-text.mjs --all       # roda em todas as rotas
 */
import { chromium } from 'playwright';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIG = 'http://localhost:8080';
const NOVO = 'http://localhost:5173';

const argv = process.argv.slice(2);
const FULL = argv.includes('--full');
const ALL = argv.includes('--all');
const route = argv.find((a) => !a.startsWith('--')) ?? '/';

let routes = [route];
if (ALL) {
  // le as rotas direto dos arquivos gerados (nao da para importar .ts aqui)
  const dir = join(root, 'src/content/pages');
  routes = readdirSync(dir)
    .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
    .map((f) => {
      const src = readFileSync(join(dir, f), 'utf8');
      const m = src.match(/route:\s*['"]([^'"]+)/);
      return m ? m[1] : null;
    })
    .filter(Boolean)
    .sort();
}

const browser = await chromium.launch();

async function textOf(base, r) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(base + r, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(400);
  const t = await page.evaluate(() => {
    const m = document.querySelector('main');
    if (!m) return [];
    return Array.from(m.querySelectorAll(':scope > section')).map((s) =>
      (s.innerText || '')
        .replace(/ /g, ' ')
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean),
    );
  });
  await page.close();
  return t;
}

let totalMissing = 0;
const report = [];

for (const r of routes) {
  const a = await textOf(ORIG, r);
  const b = await textOf(NOVO, r);

  const flatA = a.flat();
  const flatB = new Set(b.flat());
  const missing = flatA.filter((line) => !flatB.has(line));

  totalMissing += missing.length;
  report.push({ route: r, nSec: `${a.length}/${b.length}`, missing });

  const flag = missing.length === 0 ? 'OK ' : missing.length < 5 ? '~~ ' : 'XX ';
  console.log(
    `${flag} ${r.padEnd(52)} secoes ${String(a.length).padStart(2)}/${String(b.length).padStart(2)}  ` +
      `linhas faltando: ${missing.length}`,
  );
  if (missing.length && (FULL || !ALL)) {
    for (const m of missing.slice(0, FULL ? 999 : 12)) console.log(`      - ${m.slice(0, 110)}`);
    if (!FULL && missing.length > 12) console.log(`      ... +${missing.length - 12}`);
  }
}

console.log(`\ntotal de linhas de texto faltando: ${totalMissing}`);
await browser.close();
