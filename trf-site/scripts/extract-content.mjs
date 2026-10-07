/**
 * Converte os 84 HTMLs espelhados em arquivos de dados tipados.
 *
 *   node scripts/extract-content.mjs            # gera src/content/pages/*.ts
 *   node scripts/extract-content.mjs --verify   # so confere, nao escreve
 *   node scripts/extract-content.mjs --only=/about/
 *
 * Le  ../levantamento-trf/01-html/
 * Gera src/content/pages/<slug>.ts  +  src/content/pages/index.ts
 *
 * A home nao e gerada: tem layout proprio e esta escrita a mao em home.ts.
 *
 * PRINCIPIO: tabelas, cards e grades vivem DENTRO do .prose, intercaladas com
 * os paragrafos. Elas entram no `body` como sub-blocos, na ordem — promove-las
 * a blocos de secao separados perderia o texto ao redor.
 */
import { parse } from 'node-html-parser';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, '..', 'levantamento-trf', '01-html');
const ICONS_DIR = join(root, '..', 'levantamento-trf', '04-assets', 'icones-svg-inline');
const OUT = join(root, 'src', 'content', 'pages');

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v = 'true'] = a.slice(2).split('=');
      return [k, v];
    }),
);
const VERIFY = args.verify === 'true';

/* ------------------------------------------------------------------ icones */

const RENAME = {
  '005-icone.svg': 'privacy-choices',
  '006-icone.svg': 'brand-t',
  '007-icone.svg': 'brand-t',
  '047-icone.svg': 'temperature',
};
/**
 * Normaliza um SVG para comparacao. O parser expande `<circle/>` em
 * `<circle></circle>`, enquanto o catalogo guarda a forma auto-fechada —
 * sem reduzir as duas a mesma forma, nenhum icone casa.
 */
function normSvg(s) {
  return s
    .replace(/\s+/g, ' ')
    .replace(/>\s*<\/(circle|path|rect|line|polyline|polygon|ellipse|use|stop)>/g, '/>')
    .replace(/\s*\/>/g, '/>')
    .trim();
}

const hashSvg = (s) => createHash('md5').update(normSvg(s)).digest('hex').slice(0, 10);

const iconByHash = new Map();
{
  const seen = new Map();
  for (const f of readdirSync(ICONS_DIR).filter((x) => x.endsWith('.svg')).sort()) {
    const base = RENAME[f] ?? f.replace(/^\d+-/, '').replace(/\.svg$/, '');
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    const key = n === 1 ? base : `${base}-${n}`;
    iconByHash.set(hashSvg(readFileSync(join(ICONS_DIR, f), 'utf8')), key);
  }
}

function iconNameOf(node) {
  const svg = node?.querySelector('svg');
  if (!svg) return null;
  return iconByHash.get(hashSvg(svg.outerHTML)) ?? null;
}

/* ------------------------------------------------------------------- utils */

/** Entidades que o parser deixa passar (`&#x27;` em "customer's", etc). */
function unescapeHtml(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&rarr;/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

const clean = (s) => unescapeHtml(s ?? '').replace(/ /g, ' ').replace(/\s+/g, ' ');

/**
 * A Cloudflare ofusca e-mails no HTML e os remonta por JS. Como estamos lendo
 * o HTML cru, desfazemos aqui: o primeiro byte do `data-cfemail` e a chave
 * XOR dos demais.
 */
function cfEmail(hex) {
  const key = parseInt(hex.slice(0, 2), 16);
  let out = '';
  for (let i = 2; i < hex.length; i += 2) out += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ key);
  return out;
}

function toRoute(href) {
  if (!href) return null;
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return { href };
  const hash = href.includes('#') ? '#' + href.split('#')[1] : '';
  let p = href.split('#')[0].split('?')[0];
  p = p.replace(/(^|\/)index\.html$/, '/').replace(/\.html$/, '/');
  p = p.replace(/^(\.\.\/)+/, '');
  if (!p.startsWith('/')) p = '/' + p;
  p = p.replace(/\/{2,}/g, '/');
  if (!p.endsWith('/')) p += '/';
  return { to: p + hash };
}

function imgInfo(src) {
  if (!src) return null;
  const file = src.split('?')[0].split('/').pop();
  const ext = (file.match(/\.([a-z0-9]+)$/i)?.[1] ?? 'webp').toLowerCase();
  const name = file.replace(/\.(webp|jpg|jpeg|png|svg|avif)$/i, '');
  const m = name.match(/^(.*)-(960|1920)$/);
  const extra = ext === 'webp' ? {} : { ext };
  if (m) return { base: m[1], single: false, ...extra };
  return { base: name, single: true, ...extra };
}

/**
 * Le a imagem com os atributos que decidem QUAL arquivo o browser baixa.
 * Sem o `sizes` real, o hero pede a versao 960 onde o original pede a 1920 e
 * o diff acusa a foto inteira.
 */
function imgOf(el) {
  if (!el) return null;
  const hasSrcset = !!el.getAttribute('srcset');
  /* Sem srcset o browser usa o arquivo do src e pronto. Tratar como `single`
     preserva isso: gerar um srcset onde o original nao tem faria o browser
     escolher a versao 960 onde o original sempre carrega a 1920. */
  const info = hasSrcset
    ? imgInfo(el.getAttribute('src'))
    : (() => {
        const f = (el.getAttribute('src') ?? '').split('?')[0].split('/').pop() ?? '';
        if (!f) return null;
        const ex = (f.match(/\.([a-z0-9]+)$/i)?.[1] ?? 'webp').toLowerCase();
        return {
          base: f.replace(/\.(webp|jpg|jpeg|png|svg|avif)$/i, ''),
          single: true,
          ...(ex === 'webp' ? {} : { ext: ex }),
        };
      })();
  if (!info) return null;
  const w = Number(el.getAttribute('width')) || undefined;
  const h = Number(el.getAttribute('height')) || undefined;
  return {
    ...info,
    alt: el.getAttribute('alt') ?? '',
    ...(el.getAttribute('sizes') ? { sizes: el.getAttribute('sizes') } : {}),
    ...(w ? { width: w } : {}),
    ...(h ? { height: h } : {}),
  };
}

/* ----------------------------------------------------- spans (texto rico) */

function spansOf(node) {
  if (!node) return [];
  const out = [];
  const push = (v) => {
    if (typeof v === 'string') {
      if (!v) return;
      const last = out[out.length - 1];
      if (typeof last === 'string') out[out.length - 1] = last + v;
      else out.push(v);
    } else out.push(v);
  };

  const walk = (n) => {
    for (const c of n.childNodes) {
      if (c.nodeType === 3) {
        push(clean(c.rawText).replace(/→/g, ''));
        continue;
      }
      if (c.nodeType !== 1) continue;
      const tag = c.rawTagName?.toLowerCase();
      const cls = c.getAttribute('class') ?? '';

      if (tag === 'svg' || cls.split(/\s+/).includes('arr')) continue;

      if (cls.split(/\s+/).includes('pn')) {
        const txt = clean(c.text).trim();
        const platform = txt.replace(/^TRF/, '').trim();
        push({ k: 'pn', ...(platform ? { platform } : {}) });
        continue;
      }
      if (cls.includes('lime')) {
        push({ k: 'lime', t: clean(c.text) });
        continue;
      }
      if (cls.includes('nb')) {
        push({ k: 'nb', t: clean(c.text) });
        continue;
      }
      if (tag === 'strong' || tag === 'b') {
        /* mesmo motivo do <a>: se o negrito traz o lockup dentro, achatar em
           texto mudaria o peso e a largura da linha */
        const rich = c.querySelector('.pn') ? spansOf(c) : null;
        push({ k: 'b', t: clean(c.text), ...(rich && rich.length ? { spans: rich } : {}) });
        continue;
      }
      if (tag === 'a') {
        /* link de e-mail ofuscado pela Cloudflare: remonta o endereco real */
        const cf = c.querySelector('.__cf_email__')?.getAttribute('data-cfemail');
        if (cf) {
          const mail = cfEmail(cf);
          push({ k: 'a', t: mail, href: 'mailto:' + mail });
          continue;
        }
        const r = toRoute(c.getAttribute('href'));
        /* se o link traz o lockup dentro, preserva a estrutura: achatar em
           texto faria o .pn perder o text-transform:none herdado */
        const rich = c.querySelector('.pn') ? spansOf(c) : null;
        push({
          k: 'a',
          t: clean(c.text).replace(/→/g, '').trim(),
          ...(rich && rich.length ? { spans: rich } : {}),
          ...(r ?? {}),
        });
        continue;
      }
      if (tag === 'br') {
        push(' ');
        continue;
      }
      walk(c);
    }
  };

  walk(node);

  const res = out.filter((s) => (typeof s === 'string' ? s.trim() !== '' || s === ' ' : true));
  if (typeof res[0] === 'string') res[0] = res[0].replace(/^\s+/, '');
  const last = res.length - 1;
  if (typeof res[last] === 'string') res[last] = res[last].replace(/\s+$/, '');
  return res.filter((s) => s !== '');
}

function simple(spans) {
  if (spans.length === 1 && typeof spans[0] === 'string') return spans[0];
  return spans;
}

const ctaOf = (a) => {
  const r = toRoute(a.getAttribute('href'));
  const c = a.getAttribute('class') ?? '';
  return {
    label: simple(spansOf(a)),
    variant: /\bpri\b/.test(c) ? 'pri' : /sec-d/.test(c) ? 'sec-d' : 'sec-c',
    arrow: !!a.querySelector('.arr'),
    ...(r ?? {}),
  };
};

/* ------------------------------------------------- helpers dos sub-blocos */

const colsOf = (cls) =>
  /\bc4\b/.test(cls) ? 4 : /\bc3\b/.test(cls) ? 3 : /\bc2\b/.test(cls) ? 2 : 1;

function indItems(ul) {
  return ul.querySelectorAll('a.ind').map((a) => {
    const info = imgOf(a.querySelector('img'));
    const r = toRoute(a.getAttribute('href'));
    return {
      title: clean(a.querySelector('.ind-t')?.text ?? '').trim(),
      text: clean(a.querySelector('.ind-p')?.text ?? '').trim(),
      icon: iconNameOf(a.querySelector('.ind-ico')) ?? '',
      ...(r ?? {}),
      img: info ?? { base: '', alt: '' },
    };
  });
}

function tileLinks(ul) {
  return ul.querySelectorAll('a').map((a) => ({
    label: clean(a.text).replace(/→/g, '').trim(),
    ...(toRoute(a.getAttribute('href')) ?? {}),
  }));
}

function logoItems(ul) {
  return ul.querySelectorAll('li').map((li) => {
    const img = li.querySelector('img');
    const a = li.querySelector('a');
    return {
      src: '/assets/logos/' + (img?.getAttribute('src') ?? '').split('?')[0].split('/').pop(),
      alt: img?.getAttribute('alt') ?? '',
      ...(a ? { href: a.getAttribute('href') } : {}),
    };
  });
}

function journeyPhases(ol) {
  return ol.querySelectorAll('li.rv, :scope > li').map((li) => ({
    n: clean(li.querySelector('.jn')?.text ?? '').trim(),
    title: spansOf(li.querySelector('.jt')),
    items: li.querySelectorAll('ul.jl > li').map((x) => spansOf(x)),
  }));
}

function processSteps(ol) {
  return ol.querySelectorAll(':scope > li').map((li) => ({
    n: clean(li.querySelector('.n')?.text ?? '').trim(),
    title: spansOf(li.querySelector('.t')),
    text: li.querySelector('.d') ? spansOf(li.querySelector('.d')) : undefined,
  }));
}

function icardItems(div) {
  return div.querySelectorAll('.ic').map((ic) => ({
    icon: iconNameOf(ic) ?? '',
    title: spansOf(ic.querySelector('h3')),
    text: spansOf(ic.querySelector('p')),
  }));
}

function storyCards(grid) {
  return grid.querySelectorAll('.scard').map((c) => {
    const a = c.querySelector('a.card-link');
    const r = a ? toRoute(a.getAttribute('href')) : null;
    const info = imgOf(c.querySelector('.scard-img img'));
    const logo = c.querySelector('img.case-logo');
    const x = c.querySelector('.scard-x');
    return {
      title: spansOf(c.querySelector('h3')),
      text: c.querySelector('.scard-b p') ? spansOf(c.querySelector('.scard-b p')) : undefined,
      ...(r ?? {}),
      ...(info ? { img: info } : {}),
      ...(logo
        ? {
            logo: {
              src: '/assets/logos/' + logo.getAttribute('src').split('?')[0].split('/').pop(),
              alt: logo.getAttribute('alt') ?? '',
            },
          }
        : {}),
      ...(x ? { extra: richOf(x) } : {}),
    };
  });
}

function specTileItems(div) {
  return div.querySelectorAll('.st').map((s) => ({
    value: clean(s.querySelector('.st-v')?.text ?? '').trim(),
    label: clean(s.querySelector('.st-l')?.text ?? '').trim(),
  }));
}

function tableData(t, cls = '') {
  /* head e celulas saem como Spans: varias trazem o lockup TRF, que precisa
     sobreviver (o <th> tem text-transform:uppercase, mas `.pn` tem none — se
     virasse texto puro, "TRFCobot" renderizaria como "TRFCOBOT").
     Algumas celulas tambem trazem uma <ul> dentro, que precisa continuar
     sendo uma lista — achatar viraria um paragrafo unico. */
  const cellOf = (td) => {
    const ul = td.querySelector('ul, ol');
    if (!ul) return { spans: spansOf(td) };
    const list = ul.querySelectorAll(':scope > li').map((li) => spansOf(li));
    ul.remove();
    return { spans: spansOf(td), list };
  };
  return {
    head: t.querySelectorAll('thead th').map((th) => spansOf(th)),
    rows: t.querySelectorAll('tbody tr').map((tr) => tr.querySelectorAll('td').map(cellOf)),
    ...(cls.split(/\s+/).includes('spec') ? { spec: true } : {}),
  };
}

function galImages(div) {
  return div.querySelectorAll('img').map((img) => imgOf(img)).filter(Boolean);
}

/* -------------------------------------------------------- corpo (Rich[]) */

function richOf(container) {
  if (!container) return [];
  const body = [];

  for (const c of container.childNodes) {
    if (c.nodeType !== 1) continue;
    const tag = c.rawTagName?.toLowerCase();
    const cls = c.getAttribute('class') ?? '';
    /* checagem por token, sem RegExp dinamico — e mais direta e nao depende
       de escaping, que ja escondeu um bug aqui */
    const tokens = cls.split(/\s+/).filter(Boolean);
    const has = (w) => tokens.includes(w);

    if (tag === 'p') {
      if (has('eyebrow') || has('certs-h')) continue;
      if (has('go-row')) {
        const a = c.querySelector('a');
        if (a) {
          const r = toRoute(a.getAttribute('href'));
          body.push({ k: 'go', label: clean(a.text).replace(/→/g, '').trim(), ...(r ?? {}) });
        }
        continue;
      }
      const sp = spansOf(c);
      if (sp.length) body.push({ k: 'p', spans: sp });
      continue;
    }

    if (tag === 'h3') {
      body.push({ k: 'h3', spans: spansOf(c), id: c.getAttribute('id') ?? undefined });
      continue;
    }

    /* ---- sub-blocos, na ordem em que aparecem ---- */

    if (tag === 'ul' && has('inds')) {
      body.push({ k: 'inds', items: indItems(c) });
      continue;
    }
    if (tag === 'ul' && has('tiles')) {
      body.push({ k: 'tiles', links: tileLinks(c) });
      continue;
    }
    if (tag === 'ul' && has('logos')) {
      if (has('certs')) continue; // absorvido pelo seals
      const parent = c.parentNode;
      const certsUl = parent?.querySelector('ul.logos.certs');
      const certsP = parent?.querySelector('p.certs-h');
      body.push({
        k: 'logos',
        seals: logoItems(c),
        certsLabel: certsP ? clean(certsP.text).trim() : undefined,
        certs: certsUl ? logoItems(certsUl) : undefined,
      });
      continue;
    }
    if (tag === 'ol' && has('journey')) {
      body.push({ k: 'journey', phases: journeyPhases(c) });
      continue;
    }
    if (tag === 'ol' && has('process')) {
      body.push({ k: 'process', steps: processSteps(c) });
      continue;
    }
    if (tag === 'ul' || tag === 'ol') {
      if (has('jl') || has('plat-grid') || has('ev-list') || has('social') || has('home-nums') || has('parent-facts'))
        continue;
      const kind = has('checks') ? 'checks' : tag;
      const items = c.querySelectorAll(':scope > li').map((li) => spansOf(li));
      if (items.length) body.push({ k: kind, items });
      continue;
    }

    if (tag === 'div' && has('cards')) {
      if (has('icards')) body.push({ k: 'icards', cards: icardItems(c) });
      else body.push({ k: 'cards', cols: colsOf(cls), cards: storyCards(c) });
      continue;
    }
    if (tag === 'div' && has('spec-tiles')) {
      body.push({ k: 'specTiles', items: specTileItems(c) });
      continue;
    }
    if (tag === 'div' && has('table-wrap')) {
      const t = c.querySelector('table');
      if (t) body.push({ k: 'table', ...tableData(t, cls) });
      continue;
    }
    if (tag === 'div' && has('gal')) {
      body.push({ k: 'gal', images: galImages(c) });
      continue;
    }
    if (tag === 'div' && has('cta-btns')) {
      const ctas = c.querySelectorAll('a').map(ctaOf);
      if (ctas.length) body.push({ k: 'ctas', ctas });
      continue;
    }
    if (tag === 'img') {
      const info = imgOf(c);
      if (info) body.push({ k: 'img', img: info });
      continue;
    }
    if (tag === 'figure' || (tag === 'div' && !cls)) {
      body.push(...richOf(c));
      continue;
    }
  }
  return body;
}

/* ------------------------------------------------- classificador de secao */

const eyebrowOf = (sec) => {
  const e = sec.querySelector('.eyebrow');
  return e ? simple(spansOf(e)) : undefined;
};

const h2Of = (sec) => {
  const h = sec.querySelector('h2');
  return h ? { h2: spansOf(h), id: h.getAttribute('id') ?? undefined } : {};
};

function classify(sec) {
  const cls = sec.getAttribute('class') ?? '';
  const has = (s) => cls.split(/\s+/).includes(s);
  const theme = has('dark') ? 'dark' : 'light';

  if (has('hero')) {
    if (has('hero-home')) return null; // so na home
    return hero(sec, has('hero-compact') ? 'compact' : 'image');
  }
  if (has('home-title') || has('plats') || has('partners') || has('parent') || has('events') || has('follow'))
    return null; // exclusivos da home
  if (has('benefits')) return benefits(sec);
  if (has('pp')) return productPoints(sec);
  if (has('nums')) return numberStrip(sec, has('svc-nums'));
  if (has('faq')) return faq(sec);
  if (has('final')) return final(sec);
  if (has('show')) return showBanner(sec);
  if (has('roi')) return roi(sec, cls);
  if (has('split')) return split(sec, theme, cls);
  return prose(sec, theme);
}

function hero(sec, variant) {
  const img = sec.querySelector('.hero-bg');
  const info = imgOf(img);
  const h1 = sec.querySelector('h1');
  const sol = sec.querySelector('.solution');
  const lead = sec.querySelector('.lead');
  const ctas = sec.querySelectorAll('.btns a').map(ctaOf);
  return {
    type: 'hero',
    variant,
    eyebrow: eyebrowOf(sec),
    h1: h1 ? spansOf(h1) : undefined,
    solution: sol ? spansOf(sol) : undefined,
    lead: lead ? spansOf(lead) : undefined,
    ctas: ctas.length ? ctas : undefined,
    img: info ? { ...info, eager: true } : undefined,
  };
}

const iconItems = (sec, itemSel, hSel, pSel) =>
  sec.querySelectorAll(itemSel).map((it) => ({
    icon: iconNameOf(it) ?? '',
    title: spansOf(it.querySelector(hSel)),
    text: spansOf(it.querySelector(pSel)),
  }));

const benefits = (sec) => ({
  type: 'benefits',
  label: sec.getAttribute('aria-label') ?? undefined,
  items: iconItems(sec, '.ben', '.ben-h', '.ben-p'),
});

const productPoints = (sec) => ({
  type: 'productPoints',
  items: iconItems(sec, '.pp-i', '.pp-h', '.pp-p'),
});

function numberStrip(sec, svc) {
  const items = sec.querySelectorAll('.num').map((n) => {
    const v = n.querySelector('.num-v');
    const l = n.querySelector('.num-l');
    const cnt = v?.querySelector('.cnt');
    const raw = clean(v?.text ?? '').trim();
    return {
      ...(cnt ? { countTo: Number(cnt.getAttribute('data-to')) } : {}),
      value: cnt ? clean(cnt.text).trim() : raw.replace(/\+$/, ''),
      ...(raw.endsWith('+') ? { suffix: '+' } : {}),
      label: l && l.querySelector('.pn') ? spansOf(l) : clean(l?.text ?? '').trim(),
    };
  });
  return { type: 'numberStrip', ...(svc ? { variant: 'svc' } : {}), items };
}

const faq = (sec) => {
  const h = sec.querySelector('h2');
  return {
    type: 'faq',
    eyebrow: eyebrowOf(sec),
    h2: clean(h?.text ?? '').trim(),
    id: h?.getAttribute('id') ?? undefined,
    items: sec.querySelectorAll('details.qa').map((d) => ({
      q: spansOf(d.querySelector('summary .q') ?? d.querySelector('summary')),
      a: richOf(d.querySelector('.ans')),
    })),
  };
};

function final(sec) {
  const info = imgOf(sec.querySelector('.final-bg'));
  const lead = sec.querySelector('.final-p');
  return {
    type: 'final',
    eyebrow: eyebrowOf(sec),
    ...h2Of(sec),
    lead: lead ? spansOf(lead) : undefined,
    ctas: sec.querySelectorAll('.btns a').map(ctaOf),
    bgImg: info ?? undefined,
  };
}

function showBanner(sec) {
  const a = sec.querySelector('a.btn');
  return {
    type: 'showBanner',
    eyebrow: eyebrowOf(sec),
    title: spansOf(sec.querySelector('.show-t')),
    cta: a ? ctaOf(a) : { label: '', variant: 'pri' },
  };
}

function roi(sec, cls) {
  /* a variante vem da classe do FORM, nao da secao: a pagina de privacidade
     usa `sec roi` puro e seria confundida com a calculadora */
  const form = sec.querySelector('form');
  const fcls = form?.getAttribute('class') ?? '';
  const variant = fcls.includes('omb-form')
    ? 'ombudsman'
    : fcls.includes('priv-form')
      ? 'optOut'
      : fcls.includes('contact-form')
        ? 'contact'
        : fcls.includes('catalog-form') || cls.includes('catalog')
          ? 'catalog'
          : 'calculator';
  /* a plataforma vem de data-product (catalogo) ou do input hidden (roi-fixed) */
  const prodAttr = sec.querySelector('[data-product]')?.getAttribute('data-product');
  const hidden = sec.querySelector('input[name="platform"][type="hidden"]')?.getAttribute('value');
  const product = prodAttr || hidden || undefined;
  const intro = sec.querySelector('.roi-intro');
  return {
    type: 'roi',
    variant,
    ...(product ? { product } : {}),
    eyebrow: eyebrowOf(sec),
    ...h2Of(sec),
    intro: intro ? spansOf(intro) : undefined,
  };
}

function split(sec, theme, cls) {
  const info = imgOf(sec.querySelector('.split-img img'));
  const prose = sec.querySelector('.split-in .prose') ?? sec.querySelector('.prose');
  const tail = sec.querySelector('.tbl-tail');
  const iw = sec.querySelector('.split-img')?.getAttribute('class') ?? '';
  const mode = iw.includes('fp')
    ? 'contain-white'
    : iw.includes('on-dark')
      ? 'contain-dark'
      : cls.includes('inl')
        ? 'inline'
        : 'cover';
  return {
    type: 'split',
    theme,
    ...(cls.includes('auto') ? { sticky: true } : {}),
    imgMode: mode,
    eyebrow: eyebrowOf(sec),
    ...h2Of(sec),
    body: richOf(prose),
    img: info ?? { base: '', alt: '' },
    /* a variante tbl traz um segundo wrap abaixo do split, com a tabela */
    tail: tail ? richOf(tail) : undefined,
  };
}

/** Secao generica: tudo (texto E grades) entra no body, na ordem. */
function prose(sec, theme) {
  const wrap = sec.querySelector('.wrap.prose') ?? sec.querySelector('.wrap');
  if (!wrap) return null;
  return {
    type: 'prose',
    theme,
    eyebrow: eyebrowOf(sec),
    ...h2Of(sec),
    body: richOf(wrap),
  };
}

/* ------------------------------------------------------------- serializacao */

function ser(v, ind = 0) {
  const pad = '  '.repeat(ind);
  const pad2 = '  '.repeat(ind + 1);
  if (v === undefined) return 'undefined';
  if (v === null) return 'null';
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    return '[\n' + v.map((x) => pad2 + ser(x, ind + 1)).join(',\n') + '\n' + pad + ']';
  }
  const keys = Object.keys(v).filter((k) => v[k] !== undefined);
  if (!keys.length) return '{}';
  return (
    '{\n' +
    keys
      .map((k) => `${pad2}${/^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${ser(v[k], ind + 1)}`)
      .join(',\n') +
    '\n' +
    pad +
    '}'
  );
}

/* --------------------------------------------------------------- pipeline */

function walkHtml(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walkHtml(p, acc);
    else if (e === 'index.html') acc.push(p);
  }
  return acc;
}

const files = walkHtml(SRC).sort();
mkdirSync(OUT, { recursive: true });

const pages = [];
const warnings = [];

for (const file of files) {
  const rel = relative(SRC, file).replace(/\\/g, '/');
  const route = '/' + rel.replace(/index\.html$/, '');
  if (route === '/') continue;
  if (args.only && route !== args.only) continue;

  const html = readFileSync(file, 'utf8');
  const doc = parse(html, { blockTextElements: { script: false, style: false } });

  const main = doc.querySelector('main');
  if (!main) {
    warnings.push(`${route}: sem <main>`);
    continue;
  }

  const blocks = [];
  for (const sec of main.querySelectorAll(':scope > section')) {
    const b = classify(sec);
    if (b) blocks.push(b);
    else warnings.push(`secao sem bloco -> class="${sec.getAttribute('class')}"`);
  }

  const crumbs = doc.querySelectorAll('.crumbs li').map((li) => {
    const a = li.querySelector('a');
    const node = a ?? li;
    /* o ultimo crumb costuma trazer o lockup: preserva os spans, senao a
       fonte display nao e aplicada e a linha fica 1px mais baixa */
    const rich = node.querySelector('.pn') ? spansOf(node) : null;
    return {
      label: clean(node.text).trim(),
      ...(rich && rich.length ? { spans: rich } : {}),
      ...(a ? (toRoute(a.getAttribute('href')) ?? {}) : {}),
    };
  });

  const og = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '';

  const page = {
    route,
    title: clean(doc.querySelector('title')?.text ?? '').trim(),
    description: doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    ogImage: og ? '/assets/og/' + og.split('/').pop() : '',
    breadcrumbs: crumbs.length ? crumbs : undefined,
    blocks,
  };

  const slug = route.replace(/^\/|\/$/g, '').replace(/\//g, '__') || 'index';
  pages.push({ slug, route, page, nBlocks: blocks.length });

  if (!VERIFY) {
    const varName = 'page_' + slug.replace(/[^a-zA-Z0-9_]/g, '_');
    writeFileSync(
      join(OUT, slug + '.ts'),
      `import type { Page } from '../types';\n\n/* GERADO por scripts/extract-content.mjs — nao editar a mao. */\nexport const ${varName}: Page = ${ser(page, 0)};\n`,
    );
  }
}

if (!VERIFY) {
  const v = (s) => 'page_' + s.replace(/[^a-zA-Z0-9_]/g, '_');
  writeFileSync(
    join(OUT, 'index.ts'),
    `/* GERADO por scripts/extract-content.mjs — nao editar a mao. */\n` +
      `import type { Page } from '../types';\n` +
      `import { home } from './home';\n` +
      pages.map((p) => `import { ${v(p.slug)} } from './${p.slug}';`).join('\n') +
      `\n\nexport const PAGES: Page[] = [\n  home,\n` +
      pages.map((p) => `  ${v(p.slug)},`).join('\n') +
      `\n];\n\nexport const BY_ROUTE = new Map(PAGES.map((p) => [p.route, p]));\n`,
  );
}

console.log(`${pages.length} paginas (+1 home escrita a mao)`);
console.log(`blocos: ${pages.reduce((s, p) => s + p.nBlocks, 0)}`);
if (warnings.length) {
  const grouped = {};
  for (const w of warnings) grouped[w] = (grouped[w] ?? 0) + 1;
  console.log(`\n${warnings.length} avisos:`);
  for (const [k, n] of Object.entries(grouped).sort((a, b) => b[1] - a[1]).slice(0, 25))
    console.log(`  ${String(n).padStart(3)}x  ${k}`);
}
