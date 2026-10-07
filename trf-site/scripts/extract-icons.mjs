/**
 * Converte os 47 SVG inline extraidos do site original em um modulo React.
 *
 *   node scripts/extract-icons.mjs
 *
 * Le   ../levantamento-trf/04-assets/icones-svg-inline/
 * Gera src/components/icons/icons.tsx  (mapa nome -> JSX)
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, '..', 'levantamento-trf', '04-assets', 'icones-svg-inline');
const OUT = join(root, 'src', 'components', 'icons');

/* atributos SVG que o React quer em camelCase */
const ATTR = {
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-opacity': 'strokeOpacity',
  'fill-opacity': 'fillOpacity',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'clip-path': 'clipPath',
  'vector-effect': 'vectorEffect',
  'text-anchor': 'textAnchor',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'letter-spacing': 'letterSpacing',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'xlink:href': 'xlinkHref',
  'xmlns:xlink': 'xmlnsXlink',
  'xmlns:inkscape': 'xmlnsInkscape',
  class: 'className',
  for: 'htmlFor',
};

function toJsx(svg) {
  let s = svg;

  // 1. do <svg> raiz: tira width/height (tamanho vem do CSS), aria/focusable
  //    (quem decide e o wrapper) e a class do contexto original (.hero-t, .pc-icon…)
  s = s.replace(/^<svg([^>]*)>/, (_m, attrs) => {
    const cleaned = attrs
      .replace(/\s(width|height)="[^"]*"/g, '')
      .replace(/\s(aria-hidden|focusable|class)="[^"]*"/g, '');
    return `<svg${cleaned} aria-hidden="true" focusable="false">`;
  });

  // 2. kebab-case -> camelCase nos atributos conhecidos
  for (const [from, to] of Object.entries(ATTR)) {
    s = s.replaceAll(new RegExp(`\\s${from}="`, 'g'), ` ${to}="`);
  }

  // 3. atributos data-*/aria-* ficam como estao; qualquer outro kebab vira camel
  s = s.replace(/\s([a-z]+)-([a-z]+)="/g, (m, a, b) => {
    if (a === 'data' || a === 'aria' || a === 'xmlns') return m;
    return ` ${a}${b[0].toUpperCase()}${b.slice(1)}="`;
  });

  // 4. auto-fecha tags vazias que o React exige fechadas
  s = s.replace(/<(path|circle|rect|line|polyline|polygon|ellipse|use|stop)([^>]*[^/])>/g, '<$1$2 />');

  return s;
}

/* Os 4 SVG que o extrator nao conseguiu nomear (nao tinham titulo por perto).
   Identificados pelo viewBox / class original. */
const RENAME = {
  '005-icone.svg': 'privacy-choices', // .pc-icon, viewBox 0 0 30 14, cores proprias (CCPA opt-out)
  '006-icone.svg': 'brand-t', //         .hero-t,  viewBox 995 -4 210 166 — o "T" da marca
  '007-icone.svg': 'brand-t', //         .final-t, mesmo path do 006
  '047-icone.svg': 'temperature', //     termometro
};

function slugOf(file) {
  if (RENAME[file]) return RENAME[file];
  // "009-custom-engineering.svg" -> "custom-engineering"
  return file.replace(/^\d+-/, '').replace(/\.svg$/, '');
}

const files = readdirSync(SRC)
  .filter((f) => f.endsWith('.svg'))
  .sort();

const seen = new Map();
const entries = [];

for (const f of files) {
  let name = slugOf(f);
  if (name === 'icone' || !name) name = 'icone';
  const n = (seen.get(name) ?? 0) + 1;
  seen.set(name, n);
  const key = n === 1 ? name : `${name}-${n}`;
  const svg = readFileSync(join(SRC, f), 'utf8').trim();
  entries.push({ key, file: f, jsx: toJsx(svg) });
}

mkdirSync(OUT, { recursive: true });

const out = `/* GERADO por scripts/extract-icons.mjs — nao editar a mao.
   ${entries.length} icones SVG extraidos do site original. */
/* eslint-disable */
import type { ReactElement } from 'react';

export const ICONS: Record<string, ReactElement> = {
${entries.map((e) => `  // ${e.file}\n  ${JSON.stringify(e.key)}: (\n    ${e.jsx}\n  ),`).join('\n')}
};

export type IconName = keyof typeof ICONS;

/** Renderiza um icone pelo nome. O tamanho e a cor vem do CSS do wrapper. */
export function Icon({ name }: { name: string }) {
  const svg = ICONS[name];
  if (!svg) {
    if (import.meta.env?.DEV) console.warn('[Icon] nao encontrado:', name);
    return null;
  }
  return svg;
}
`;

writeFileSync(join(OUT, 'icons.tsx'), out);
console.log(`${entries.length} icones -> src/components/icons/icons.tsx`);
console.log(entries.map((e) => '  ' + e.key).join('\n'));
