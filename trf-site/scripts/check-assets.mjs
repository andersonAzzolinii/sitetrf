/**
 * Confere se toda imagem referenciada pelos dados existe em public/.
 *
 *   node scripts/check-assets.mjs
 *
 * O <Picture> monta o caminho a partir de `base` + sufixo de largura, entao um
 * `base` errado so aparece como imagem em branco na pagina — este script pega
 * isso antes.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = join(root, 'src/content/pages');
const PUBLIC = join(root, 'public');

const missing = new Map();
let checked = 0;

const files = readdirSync(PAGES).filter((f) => f.endsWith('.ts'));

for (const f of files) {
  const src = readFileSync(join(PAGES, f), 'utf8');

  // cada bloco de imagem: base + single
  for (const m of src.matchAll(
    /base:\s*"([^"]+)"\s*,\s*(?:single:\s*(true|false)\s*,)?\s*(?:ext:\s*"([^"]+)"\s*,)?/g,
  )) {
    const base = m[1];
    const single = m[2] === 'true';
    const ext = m[3] ?? 'webp';
    const paths = single
      ? [`/assets/media/${base}.${ext}`]
      : [`/assets/media/${base}-960.${ext}`, `/assets/media/${base}-1920.${ext}`];

    for (const p of paths) {
      checked++;
      if (!existsSync(join(PUBLIC, p))) {
        if (!missing.has(p)) missing.set(p, new Set());
        missing.get(p).add(f);
      }
    }
  }

  // logos e outros src diretos
  for (const m of src.matchAll(/src:\s*"(\/assets\/[^"]+)"/g)) {
    checked++;
    const p = m[1];
    if (!existsSync(join(PUBLIC, p))) {
      if (!missing.has(p)) missing.set(p, new Set());
      missing.get(p).add(f);
    }
  }
}

console.log(`${checked} referencias conferidas`);
if (!missing.size) {
  console.log('nenhuma faltando');
} else {
  console.log(`\n${missing.size} FALTANDO:`);
  for (const [p, pages] of [...missing].sort()) {
    console.log(`  ${p}`);
    console.log(`      em: ${[...pages].slice(0, 3).join(', ')}${pages.size > 3 ? ` (+${pages.size - 3})` : ''}`);
  }
  process.exitCode = 1;
}
