# Levantamento completo — trfautomation.com

Espelho e engenharia reversa do site **TRF Industrial Automation** (`https://trfautomation.com/`).
Coletado em **06/10/2026**. Total: **111 MB**, **84 páginas**, **1.076 arquivos**.

---

## Estrutura

```
levantamento-trf/
├─ 00-site-offline/     ← ESPELHO NAVEGÁVEL. Abra index.html no browser e funciona 100%
├─ 01-html/             ← 84 páginas HTML cruas (sem assets)
├─ 02-css/              ← o CSS único + versão legível + tokens + queries
├─ 03-javascript/       ← todo o JS (era inline) extraído e desduplicado + JSON-LD
├─ 04-assets/           ← fontes, imagens, vídeos, logos, ícones, OG, marca
├─ 05-conteudo/         ← os textos (versão .md de cada página) + sitemap/llms.txt
└─ 06-analise/          ← os relatórios de engenharia reversa  ★ comece aqui
```

### `00-site-offline/` — 459 arquivos, 55 MB
Espelho fiel e **navegável**: as 84 páginas, com vídeo, fontes, imagens e navegação entre elas.
**Use como referência visual lado a lado durante a reconstrução.**

```
levantamento-trf\servir-espelho.cmd      →  http://localhost:8080/
```

Rode esse `.cmd` (ele sobe um `python -m http.server` na pasta e abre o browser).
Abrir o `index.html` direto por `file://` também funciona para quase tudo, **mas** as fotos
das indústrias na home e os favicons usam caminho absoluto (`/assets/...`) e só resolvem via
HTTP. Verificado: **6.766 referências resolvem, 0 quebradas.**

### `01-html/` — 84 arquivos, 4,0 MB
HTML de cada rota, no mesmo layout de diretórios do site (`robotic-palletizing/cobot-palletizer/index.html`).

### `02-css/` — 177 KB
| Arquivo | O que é |
|---|---|
| `site.css` | o original, 75 KB / 810 linhas minificadas — **a única folha de estilo do site** |
| `site.pretty.css` | o mesmo, reformatado em 3.374 linhas para leitura humana |
| `design-tokens.json` | os 12 custom properties do `:root` |
| `media-queries.txt` | as 23 media queries |
| `classes-no-css.txt` | as 231 classes definidas no CSS |

### `03-javascript/` — 97 arquivos, 700 KB
O site **não tem JS externo de aplicação** — tudo era inline. Aqui está desduplicado:
- `inline-01.js` … `inline-11.js` — os 11 scripts únicos (~2,5 KB no total)
- `_indice-scripts-inline.json` — qual script roda em quais páginas
- `vendor/cloudflare-email-decode.min.js` — o único script externo (injetado pela Cloudflare)
- `json-ld/` — os 84 blocos de dados estruturados, um por página

### `04-assets/` — 338 arquivos, 50 MB
| Pasta | Conteúdo |
|---|---|
| `fonts/` | `hubot-sans.woff2` (48 KB) + `host-grotesk.woff2` (20 KB) — as 2 famílias, open source |
| `imagens-media/` | 140 `.webp` — produtos, plataformas (`trf-w-*`), indústrias (`trf-ind-*`), cases |
| `videos/` | `trf-home-hero.mp4` (8,6 MB) + `trf-home-hero-mobile.mp4` (5,9 MB) |
| `logos-parceiros/` | 14 logos — ABB, FANUC, KUKA, Rockwell, Siemens, Interroll, Intralox, UL, PMMI, EcoVadis, PACK EXPO, Avon, Lodge, Custom Foods |
| `open-graph/` | 81 JPGs 1200×630 |
| `marca/` | `trf-logo-header.svg` + favicons |
| `icones-svg-inline/` | **47 ícones SVG** que estavam embutidos no HTML, extraídos — com `_catalogo.html` para visualizar todos de uma vez |
| `docs/` | 1 PDF |

### `05-conteudo/` — 87 arquivos, 1,1 MB
O site publica uma **versão Markdown de cada página** (`<link rel="alternate" type="text/markdown">`).
É a forma mais limpa de pegar os textos. Mais `_meta/` com `sitemap.xml`, `robots.txt` e `llms.txt`.

> Cuidado: o `.md` traz o conteúdo editorial, mas **omite** vários blocos de UI
> (faixa de benefícios, números, cards do hero, tabelas de plataforma, eventos).
> Para o texto *completo*, use `06-analise/05-textos-todas-paginas.md`.

### `06-analise/` ★ — 9 arquivos, 1,3 MB

| Arquivo | O que é |
|---|---|
| **`08-design-system.md`** | **o documento principal** — tokens, escala tipográfica, o chanfro, padrões visuais, animação, mapa classe→componente, JS, infra |
| `01-anatomia-home.md` | a home dissecada: árvore DOM + todos os textos, seção por seção |
| `02-home.formatado.html` | o HTML da home indentado para leitura |
| `03-estrutura-todas-paginas.md` | árvore DOM das 84 páginas |
| `04-rotas-e-metadados.json` | rota, title, description, h1 e lista de seções de cada página — **a fonte para montar o roteamento** |
| `05-textos-todas-paginas.md` | 853 KB — todo o texto de todas as páginas |
| `06-inventario-classes.md` | as 220 classes usadas no HTML × as 231 definidas no CSS |
| `07-inventario-midia.md` | cada arquivo de mídia com tamanho |
| `download-log.json` | log do espelhamento (413 requisições) |

---

## As 5 coisas que definem este site

1. **O chanfro.** Todo card, botão e superfície tem o canto superior direito cortado em 45°
   via `clip-path: polygon(...)`. 34 ocorrências, em 9 tamanhos diferentes (4px a 26px).
2. **Um único acento.** `#C0FF00` (verde-limão) sobre preto puro. Nada mais.
   Quase todo card tem **uma só aresta** verde de 2–4px que o ancora.
3. **Duas fontes, papéis rígidos.** Hubot Sans para tudo que é display/UI (uppercase +
   `letter-spacing` em botões e eyebrows); Host Grotesk só para texto corrido.
4. **Ritmo claro/escuro.** As seções alternam `.sec.light` (`#EEEEEE`) e `.sec.dark` (`#000`),
   e o CSS inverte cores de texto, links e do lockup `TRF` conforme o contexto.
5. **Tudo estático.** HTML gerado por rota, um CSS, ~2,5 KB de JS inline, zero framework.
   Rápido por construção.

---

## Observações sobre o site de origem

- `<meta robots="noindex, nofollow">` e `robots.txt: Disallow: /` → o site está no ar mas
  **em pré-lançamento**. O espelhamento foi feito com delay entre requisições.
- **3 páginas existem mas estão fora do `sitemap.xml`:** `/case-packing/tx/dallas/`,
  `/conveyor-systems/ca/fresno/` e `/robotic-palletizing/ks/lenexa/`. Respondem 200 e são
  linkadas só pela `/locations/`. É um **template de SEO local programático**
  (`{hub}/{estado}/{cidade}/`) em piloto — mesmo arquétipo das demais, zero classes novas,
  só o nome da cidade variando no H1, title e textos. Foram incluídas no levantamento
  (daí 84 páginas, não as 81 do sitemap).
- `?v=202610051729` nos assets indica build de 05/10/2026 — o site está em evolução ativa.
  Os comentários do CSS (`/* 30/09 (Leonardo): ... */`, `/* QA 28/09 */`) confirmam.
- O rodapé credita `atlanticdigital.com.br`; a empresa é a **Torfresma** (Brasil), operando
  nos EUA como TRF. Os textos, fotos, logo e logos de parceiros são **conteúdo proprietário de
  terceiros** — o design e os padrões de código servem como referência, mas texto, imagens e
  marca precisam ser substituídos pelos seus, a menos que você tenha direito sobre eles.
