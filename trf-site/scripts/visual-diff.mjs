/**
 * Diff visual: espelho do site original  x  app novo.
 *
 *   node scripts/visual-diff.mjs                      # rotas padrao, larguras padrao
 *   node scripts/visual-diff.mjs --routes=/ --w=1440  # pontual
 *   node scripts/visual-diff.mjs --sel="footer.site"  # so um recorte
 *
 * Pre-requisitos (dois servidores no ar):
 *   levantamento-trf\servir-espelho.cmd   -> http://localhost:8080
 *   npm run dev                           -> http://localhost:5173
 *
 * Saida: out/diff/ com orig/novo/diff por rota+largura, e um relatorio.html.
 */
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ORIG = 'http://localhost:8080';
const NOVO = 'http://localhost:5173';
const OUT = 'out/diff';

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v = 'true'] = a.slice(2).split('=');
      return [k, v];
    }),
);

const ROUTES = (
  args.routes ??
  [
    '/',
    '/robotic-palletizing/',
    '/robotic-palletizing/cobot-palletizer/',
    '/case-packing/',
    '/conveyor-systems/',
    '/industries/',
    '/industries/food-processing/',
    '/resources/case-studies/avon/',
    '/parts-and-service/',
    '/about/',
    '/contact/',
    '/tools/palletizing-roi-calculator/',
  ].join(',')
).split(',');

const WIDTHS = (args.w ?? '1920,1440,1280,1024,900,768,600,390').split(',').map(Number);
const SELECTOR = args.sel || null;
const THRESHOLD = Number(args.threshold ?? 0.1);

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function shoot(base, route, width, file) {
  const page = await browser.newPage({
    // Ao recortar um elemento, a viewport precisa ser alta o bastante para
    // ele caber: se nao couber, o Playwright rola e compoe a imagem, e a
    // composicao introduz deslocamento subpixel que mascara o diff real.
    // Para a pagina inteira, 1000px e o certo (afeta 100svh, sticky etc).
    viewport: { width, height: SELECTOR ? 2600 : 1000 },
    deviceScaleFactor: 1,
  });
  /* O CSS de congelamento precisa valer DESDE o primeiro paint: injetado so
     depois do load, o reveal ja comecou e cada lado captura num ponto
     diferente da transicao — era essa a origem do diff oscilando entre
     0,15% e 4% na mesma pagina. */
  const freeze =
    '*,*::before,*::after{animation:none!important;transition:none!important}' +
    '.rv{opacity:1!important;transform:none!important;transition-delay:0s!important}' +
    'video{visibility:hidden}' +
    '.hero-radial,.final-radial{transform:rotate(0deg)!important}' +
    /* numa captura fullPage o Playwright rola a pagina, e um elemento sticky
       acompanha o scroll: cada lado o congela num ponto diferente. Em repouso
       sticky e static ocupam o mesmo espaco, entao trocar e seguro aqui. */
    '.split-img,.split-col{position:static!important}' +
    (SELECTOR && !/header/.test(SELECTOR) ? 'header.site{display:none!important}' : '');

  await page.addInitScript((css) => {
    const apply = () => {
      const st = document.createElement('style');
      st.textContent = css;
      document.head.appendChild(st);
    };
    if (document.head) apply();
    else document.addEventListener('DOMContentLoaded', apply);
  }, freeze);

  await page.goto(base + route, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => {});
  await page.addStyleTag({ content: freeze });
  await page.evaluate(() => {
    document.querySelectorAll('.rv').forEach((e) => e.classList.add('in'));
    document.querySelectorAll('video').forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });
    // tira o lazy de todas as imagens: senao cada lado carrega um subconjunto
    // diferente na hora da captura e o diff vira ruido
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => i.setAttribute('loading', 'eager'));
  });

  /* Espera TODA imagem decodificar — inclusive as ja `complete`, que podem
     nao ter sido pintadas ainda. Sem isso, uma foto aparece em branco num dos
     lados e o diff acusa a area inteira. */
  await page
    .evaluate(
      () =>
        new Promise((resolve) => {
          const done = () =>
            Promise.all(Array.from(document.images).map((i) => i.decode().catch(() => {}))).then(
              () => requestAnimationFrame(() => requestAnimationFrame(resolve)),
            );
          if (document.readyState === 'complete') done();
          else window.addEventListener('load', done, { once: true });
        }),
    )
    .catch(() => {});
  await page.waitForTimeout(900);

  const target = SELECTOR ? await page.$(SELECTOR) : null;
  if (SELECTOR && !target) {
    await page.close();
    return null;
  }
  if (target) await target.screenshot({ path: file });
  else await page.screenshot({ path: file, fullPage: true });

  await page.close();
  return true;
}

const rows = [];

for (const route of ROUTES) {
  for (const w of WIDTHS) {
    const slug = (route.replace(/\//g, '_') || '_root') + '-' + w;
    const fa = join(OUT, `${slug}-orig.png`);
    const fb = join(OUT, `${slug}-novo.png`);
    const fd = join(OUT, `${slug}-diff.png`);

    const okA = await shoot(ORIG, route, w, fa);
    const okB = await shoot(NOVO, route, w, fb);
    if (!okA || !okB) {
      rows.push({ route, w, pct: null, note: 'seletor ausente em um dos lados' });
      continue;
    }

    const a = PNG.sync.read(readFileSync(fa));
    const b = PNG.sync.read(readFileSync(fb));

    // compara na area comum; diferenca de altura entra como penalidade
    const width_ = Math.min(a.width, b.width);
    const height_ = Math.min(a.height, b.height);
    const diff = new PNG({ width: width_, height: height_ });

    const crop = (img) => {
      if (img.width === width_ && img.height === height_) return img;
      const out = new PNG({ width: width_, height: height_ });
      PNG.bitblt(img, out, 0, 0, width_, height_, 0, 0);
      return out;
    };

    const n = pixelmatch(
      crop(a).data,
      crop(b).data,
      diff.data,
      width_,
      height_,
      { threshold: THRESHOLD },
    );

    writeFileSync(fd, PNG.sync.write(diff));

    const pct = (n / (width_ * height_)) * 100;
    const hDelta = Math.abs(a.height - b.height);
    rows.push({
      route,
      w,
      pct,
      hOrig: a.height,
      hNovo: b.height,
      hDelta,
      files: [fa, fb, fd],
    });

    const flag = pct <= 2 && hDelta <= 40 ? 'OK ' : pct <= 6 ? '~~ ' : 'XX ';
    console.log(
      `${flag} ${route.padEnd(42)} ${String(w).padStart(5)}px  ` +
        `diff ${pct.toFixed(2).padStart(6)}%   altura ${a.height} vs ${b.height} (${hDelta >= 0 ? '+' : ''}${b.height - a.height})`,
    );
  }
}

/* relatorio HTML com os tres lado a lado */
const html = `<!doctype html><meta charset="utf-8"><title>Diff visual TRF</title>
<style>
 body{background:#0A0A0A;color:#EEE;font:14px system-ui;padding:24px}
 h2{font-size:15px;margin:34px 0 10px;border-bottom:1px solid #333;padding-bottom:6px}
 .r{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:8px}
 .r div{font-size:11px;color:#888}
 img{width:100%;border:1px solid #333;background:#fff}
 .ok{color:#C0FF00}.warn{color:#ffc83d}.bad{color:#ff5a5a}
</style>
<h1>Diff visual — espelho original x app novo</h1>
${rows
  .map(
    (r) => `<h2>${r.route} @ ${r.w}px —
  <span class="${r.pct == null ? 'warn' : r.pct <= 2 ? 'ok' : r.pct <= 6 ? 'warn' : 'bad'}">
  ${r.pct == null ? r.note : r.pct.toFixed(2) + '%'}</span>
  <span style="color:#888">altura ${r.hOrig ?? '?'} vs ${r.hNovo ?? '?'}</span></h2>
 ${
   r.files
     ? `<div class="r">
   <div>original<img src="${r.files[0].split('/').pop()}"></div>
   <div>novo<img src="${r.files[1].split('/').pop()}"></div>
   <div>diff<img src="${r.files[2].split('/').pop()}"></div>
 </div>`
     : ''
 }`,
  )
  .join('\n')}`;

writeFileSync(join(OUT, 'relatorio.html'), html);

const scored = rows.filter((r) => r.pct != null);
const avg = scored.reduce((s, r) => s + r.pct, 0) / (scored.length || 1);
console.log(`\nmedia: ${avg.toFixed(2)}%   |   relatorio: ${join(OUT, 'relatorio.html')}`);

await browser.close();
