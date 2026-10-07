# Plano de reconstrução — site TRF em React + Vite

Baseado no levantamento em [levantamento-trf/](levantamento-trf/).
Objetivo: reproduzir **a mesma estilização, os mesmos conceitos, os mesmos textos e o mesmo
posicionamento de cards** do `trfautomation.com`, em React + Vite.

---

## 0. A decisão que define o projeto

O levantamento revelou uma coisa que muda tudo: **as 83 páginas internas são a mesma página.**

Agrupando as 84 rotas pela assinatura de seções, o padrão é:

```
hero has-img  →  (benefits | pp)  →  N × sec[light|dark][ split auto][ inl|tbl]
              →  sec light faq    →  sec split auto (CTA relacionado)  →  final
```

~70 assinaturas "distintas" entre 84 páginas — mas a diferença entre elas é só **quantos
blocos `sec` tem e em que ordem**. Não são 84 layouts; é **um renderizador de blocos** com
84 arquivos de dados.

**Portanto: não construa 84 páginas. Construa ~25 componentes de bloco e um
`<BlockRenderer>` alimentado por JSON.**

A prova mais forte disso está nas 3 páginas de SEO local que o levantamento encontrou fora
do sitemap (`/case-packing/tx/dallas/`, `/conveyor-systems/ca/fresno/`,
`/robotic-palletizing/ks/lenexa/`): mesmo arquétipo, **zero classes CSS novas**, só o nome da
cidade variando. O site original já é um gerador de blocos — ele só não é um em React ainda.

Consequências:
- A home é o único layout realmente único (12 blocos exclusivos dela).
- Adicionar uma página 85 depois = escrever um JSON, não um componente.
- Páginas de SEO local (`{hub}/{estado}/{cidade}/`) viram um template paramétrico: você
  gera dezenas a partir de uma lista de cidades, que é claramente a intenção do original.
- O conteúdo sai do levantamento por script, não digitado à mão (§5).

---

## 1. Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Build | **Vite 6** + React 19 + TypeScript | pedido |
| Roteamento + SSG | **`vite-react-ssg`** | o site original é 84 HTMLs estáticos com JSON-LD, `og:image` por página e sitemap. Uma SPA perde tudo isso. Este plugin usa `react-router` normal e **pré-renderiza cada rota em HTML no build** — mantém React e entrega o mesmo HTML estático do original |
| Estilo | **CSS global em camadas + CSS custom properties** | ver §2.1 — a decisão mais importante depois da §0 |
| Conteúdo | **TS tipado** (`content/*.ts`) gerado por script | type-safety nos blocos; sem CMS por ora |
| Ícones | **47 SVGs locais como componentes React** | já extraídos em `04-assets/icones-svg-inline/` |
| Formulários | fetch nativo + `react-hook-form` (opcional) | o original usa 40 linhas de JS vanilla; não precisa de mais |
| Testes visuais | **Playwright** (screenshot diff) | ver §9 |

```bash
npm create vite@latest trf-site -- --template react-ts
cd trf-site
npm i react-router-dom vite-react-ssg
npm i -D @playwright/test sharp
```

> **Nota única sobre alternativa:** para um site de 84 páginas estáticas de marketing, Astro
> seria tecnicamente mais direto (menos JS no cliente por padrão). Como você pediu React+Vite,
> o plano todo assume React+Vite — e `vite-react-ssg` cobre a lacuna de SSG. Fica só registrado.

---

## 2. Estratégia de CSS — **não reescreva em Tailwind**

### 2.1 A decisão

O site tem **um** arquivo CSS de 75 KB que já é a fonte de verdade completa, com valores
calibrados por QA ao longo de semanas. Reescrever isso em Tailwind ou CSS-in-JS significa
re-derivar à mão centenas de valores (`clamp()`, chanfros, 23 breakpoints) — é exatamente
onde a fidelidade se perde.

**Faça o port direto do CSS**, reorganizado em camadas, com duas correções:

1. **Resolva a cascata de patches.** O `site.css` cresceu por emendas no final
   (`/* 30/09 (Leonardo): ... */`, `/* H18 ... */`) que sobrescrevem o topo com `!important`.
   Exemplos reais que você **tem** que resolver na origem, não copiar:

   | Regra | Topo do arquivo | Valor real aplicado |
   |---|---|---|
   | `.logo img` height | `28px` | **`56px`** (48px scrolled, 50px ≤1260, 36px ≤480) |
   | `.bar` min-height | `80px` | **`100px`** (80px scrolled) |
   | `.entry` | `clip-path` + borda + fundo | **tudo removido** — vira wrapper só com `drop-shadow` |
   | `.entry-card` | (não existia) | é quem tem o chanfro de 22px e a borda verde |
   | `.entry-b` | `border-top: 2px verde` | **`border-bottom`**, fundo `#050505` |
   | `.benefits` | `--s800`, sem padding | **`#000`, `padding: 44px 0`**, cards com chanfro |
   | `.ben` | linha com divisórias | **caixas centradas** com borda e chanfro 14px |
   | `.home-t` | visível, 84–132px | **`display: none`** |
   | `.entry-go` | `font-size: .74rem` | **`font-size: 0`** (só a seta aparece) |
   | `a.ind` | `padding: 26px 22px` | **`padding: 0`** + `.ind-ph`/`.ind-in` internos |
   | `.plat-img` | fundo `#000`, borda direita | **fundo `#fff`**, sem borda, `padding: 6px` |
   | `a.plat` grid | `112px 1fr` | **`132px 1fr`** (108px ≤600) |
   | `.eyebrow` | `.72rem` | **`.8rem`** |

   > `06-analise/08-design-system.md` traz a tabela completa de valores já resolvidos.
   > Use **aquele documento** como especificação, não o `site.css` de cima para baixo.

2. **Elimine os `!important`.** Eles existem só por causa da cascata de emendas. Num CSS
   reorganizado por camadas, nenhum é necessário — e manter sabota qualquer ajuste futuro.

### 2.2 Organização

```
src/styles/
├─ 00-tokens.css        :root — cores, fontes, chanfros, z-index
├─ 01-reset.css         box-sizing, img, a, ::selection, :focus-visible
├─ 02-fonts.css         @font-face das 2 famílias
├─ 03-base.css          body, h1-h3, p, .wrap, .lime, .eyebrow, .arr
├─ 04-layout.css        .sec (+.light/.dark), .prose, .sec-head
├─ 05-chrome.css        header.site, .bar, nav.main, .mega, footer.site, .legal, .crumbs
├─ components/          um arquivo por bloco: hero.css, entries.css, cards.css,
│                       plats.css, journey.css, inds.css, events.css, faq.css,
│                       final.css, logos.css, tiles.css, process.css, roi.css,
│                       tables.css, benefits.css, nums.css, parent.css, follow.css
└─ index.css            @import de tudo, nesta ordem
```

Importe `index.css` uma vez em `main.tsx`. Sem CSS Modules: as classes do original
(`.scard`, `.plat`, `.ind`) são estáveis, descritivas e já batem com o levantamento —
mantê-las idênticas é o que permite comparar DOM a DOM com o espelho offline.

### 2.3 Tokens, incluindo os que faltavam

O `:root` original só tem 12 tokens. Metade dos valores do site está hard-coded. Promova-os:

```css
:root {
  /* cores — do original */
  --black: #000;  --green: #C0FF00;  --grey: #C0C0C0;  --white: #EEEEEE;
  --s900: #0A0A0A; --s800: #141414; --s700: #1F1F1F; --t2: #4A4A4A;

  /* cores que estavam soltas no CSS */
  --s950: #050505;        /* .entry-b, .entry-card, ol.process */
  --s960: #070707;        /* a.plat */
  --hover-dark: #111;     /* a.ind:hover */
  --green-hover: #d4ff4d; /* .btn.pri:hover */
  --ink: #1c1c1c;         /* texto em seção clara */
  --line-dark: rgba(255,255,255,.12);
  --line-dark-soft: rgba(255,255,255,.08);
  --green-soft: rgba(192,255,0,.55);
  --on-dark: rgba(255,255,255,.74);   /* cor de corpo padrão sobre escuro */

  /* tipografia */
  --display: "Hubot Sans", Arial, sans-serif;
  --body: "Host Grotesk", Arial, Helvetica, sans-serif;

  /* chanfro — a escala real, nomeada */
  --ch-xs: 8px;   --ch: 12px;    --ch-sm: 14px;
  --ch-md: 18px;  --ch-lg: 22px; --ch-xl: 26px;

  /* layout */
  --wrap: 1320px;
  --gutter: 20px;          /* ≥1024px → 40px */
  --hdr: 101px;            /* ≤1260px → 81px — usado pelo vídeo do hero */
  --sticky-top: 130px;     /* .split-img sticky */
}
```

### 2.4 O chanfro como utilitário

É o elemento assinatura do site (34 ocorrências, 9 tamanhos). Nunca escreva o `polygon()`
duas vezes:

```css
/* 00-tokens.css */
.ch-xs { clip-path: polygon(0 0, calc(100% - 8px)  0, 100% 8px,  100% 100%, 0 100%) }
.ch    { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%) }
.ch-sm { clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%) }
.ch-md { clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%) }
.ch-lg { clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%) }
.ch-xl { clip-path: polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%) }
```

Nos componentes, aplique via `@extend`-like (duplicar a declaração) ou compondo a classe no
JSX. **Atenção:** `clip-path` corta `box-shadow` e `outline`. É exatamente por isso que o
original envolve `.entry-card` (chanfrado) num `.entry` externo que carrega o `drop-shadow`
do glow verde. Replique essa estrutura de dois elementos sempre que precisar de sombra + chanfro.

---

## 3. Estrutura de pastas

```
trf-site/
├─ public/
│  ├─ assets/
│  │  ├─ fonts/          ← 2 .woff2 de 04-assets/fonts/
│  │  ├─ media/          ← 140 .webp de 04-assets/imagens-media/
│  │  ├─ video/          ← 2 .mp4 de 04-assets/videos/
│  │  ├─ logos/          ← 14 de 04-assets/logos-parceiros/
│  │  └─ og/             ← 81 .jpg de 04-assets/open-graph/
│  ├─ favicon.ico, favicon.svg, apple-touch-icon.png
│  └─ robots.txt
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx                  rotas + layout
│  ├─ styles/                  §2.2
│  ├─ components/
│  │  ├─ chrome/               SiteHeader, MegaMenu, SiteFooter, Breadcrumbs
│  │  ├─ blocks/               os ~25 blocos — §4
│  │  ├─ primitives/           Button, PN, Eyebrow, Arrow, GoLink, Chamfer, Picture
│  │  └─ icons/                os 47 ícones + Logo
│  ├─ content/
│  │  ├─ types.ts              o contrato de blocos — §4.1
│  │  ├─ nav.ts                mega menu + footer
│  │  ├─ site.ts               NAP, redes, evento atual
│  │  ├─ platforms.ts          as 9 plataformas
│  │  ├─ industries.ts         as 15 indústrias
│  │  └─ pages/                84 arquivos, um por rota (gerados — §5)
│  ├─ lib/
│  │  ├─ BlockRenderer.tsx
│  │  ├─ useReveal.ts
│  │  ├─ useScrolled.ts
│  │  ├─ useCountUp.ts
│  │  ├─ seo.tsx               <Head> + JSON-LD
│  │  └─ routes.ts             gerado de 04-rotas-e-metadados.json
│  └─ pages/
│     ├─ Home.tsx              o único layout próprio
│     └─ StandardPage.tsx      serve as outras 83
├─ scripts/
│  ├─ extract-content.mjs      HTML espelhado → content/pages/*.ts  — §5
│  ├─ extract-icons.mjs        SVG → componentes React
│  └─ visual-diff.mjs          Playwright: espelho vs app  — §9
└─ tests/visual.spec.ts
```

---

## 4. O sistema de blocos

### 4.1 Contrato de dados (`content/types.ts`)

```ts
export type Theme = 'light' | 'dark';

export type Block =
  // chrome de página
  | { type: 'hero'; variant: 'home' | 'image' | 'compact';
      eyebrow?: string; h1: string; solution?: string; lead?: string;
      ctas?: Cta[]; img?: Img; video?: Video; entries?: EntryCard[] }
  | { type: 'homeTitle'; h1: string; highlight?: string; nums: StatNum[] }
  | { type: 'benefits'; items: IconItem[] }           // 5 caixas centradas
  | { type: 'productPoints'; items: IconItem[] }      // .pp — 4 itens horizontais
  | { type: 'numberStrip'; variant?: 'svc'; items: StatNum[] }

  // conteúdo
  | { type: 'prose'; theme: Theme; eyebrow?: string; h2?: string; id?: string;
      body: Rich[] }
  | { type: 'split'; theme: Theme; sticky?: boolean;
      imgMode?: 'cover' | 'contain-white' | 'contain-dark' | 'inline';
      eyebrow?: string; h2?: string; body: Rich[]; img: Img; side?: 'left' | 'right' }

  // coleções
  | { type: 'cardGrid'; theme: Theme; cols: 1 | 2 | 3 | 4; eyebrow?: string;
      h2?: string; intro?: string; cards: StoryCard[] }
  | { type: 'iconCards'; theme: Theme; h2?: string; cards: IconItem[] }
  | { type: 'tiles'; theme: Theme; h2?: string; links: Link[] }
  | { type: 'platformColumns'; eyebrow?: string; h2?: string; intro?: string;
      columns: PlatformColumn[]; cta?: Cta }
  | { type: 'industryGrid'; theme: Theme; h2?: string; intro?: Rich[];
      items: IndustryCard[] }
  | { type: 'logoWall'; h2?: string; intro?: string;
      seals: Logo[]; certsLabel?: string; certs: Logo[] }
  | { type: 'journey'; theme: Theme; h2?: string; intro?: string; phases: Phase[] }
  | { type: 'process'; theme: Theme; h2?: string; steps: Step[] }
  | { type: 'specTiles'; theme: Theme; items: { value: string; label: string }[] }
  | { type: 'specTable'; theme: Theme; caption?: string;
      head: string[]; rows: string[][] }
  | { type: 'gallery'; theme: Theme; images: Img[] }

  // blocos próprios da home
  | { type: 'parent'; eyebrow?: string; h2: string; cta?: Cta;
      body: Rich[]; facts: { title: string; text: string }[]; outLink?: Link }
  | { type: 'events'; eyebrow?: string; h2: string; events: Event[] }
  | { type: 'follow'; eyebrow?: string; h2: string; lead: string; socials: Social[] }

  // conversão
  | { type: 'faq'; eyebrow?: string; h2: string; items: { q: string; a: Rich[] }[] }
  | { type: 'final'; eyebrow?: string; h2: string; highlight?: string;
      lead?: string; ctas: Cta[]; bgImg?: Img }
  | { type: 'showBanner'; eyebrow?: string; title: string; cta: Cta }
  | { type: 'roi'; variant: 'calculator' | 'catalog' | 'contact' | 'optOut';
      product?: string };

export interface Page {
  route: string;
  title: string;              // <title>
  description: string;
  ogImage: string;
  breadcrumbs: Link[];
  jsonLd?: object[];
  blocks: Block[];
}
```

`Rich` é o tipo do texto formatado — precisa suportar o que o `.prose` realmente tem:
parágrafo, `<strong>`, link, `ul`/`ol`, `ul.checks`, imagem inline, `a.go`, `.cta-btns`,
e **o lockup `<PN>`**.

```ts
export type Rich =
  | { k: 'p'; spans: Span[] }
  | { k: 'ul' | 'ol' | 'checks'; items: Span[][] }
  | { k: 'img'; img: Img }
  | { k: 'go'; label: string; href: string }
  | { k: 'ctas'; ctas: Cta[] };

export type Span =
  | string
  | { k: 'b'; t: string }
  | { k: 'a'; t: string; href: string }
  | { k: 'lime'; t: string }
  | { k: 'nb'; t: string }                      // white-space: nowrap
  | { k: 'pn'; platform?: string };             // TRF ou TRFCobot
```

### 4.2 O renderizador

```tsx
// lib/BlockRenderer.tsx
const MAP = {
  hero: Hero, homeTitle: HomeTitle, benefits: BenefitStrip,
  productPoints: ProductPoints, numberStrip: NumberStrip,
  prose: SectionProse, split: SectionSplit, cardGrid: CardGrid,
  iconCards: IconCards, tiles: TileLinks, platformColumns: PlatformColumns,
  industryGrid: IndustryGrid, logoWall: LogoWall, journey: Journey,
  process: ProcessGrid, specTiles: SpecTiles, specTable: SpecTable,
  gallery: Gallery, parent: ParentBlock, events: EventList, follow: FollowBlock,
  faq: FaqGrid, final: FinalCta, showBanner: ShowBanner, roi: RoiBlock,
} as const;

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map((b, i) => {
    const C = MAP[b.type] as React.FC<any>;
    return C ? <C key={i} {...b} /> : null;
  })}</>;
}
```

E as 83 páginas internas passam a ser:

```tsx
// pages/StandardPage.tsx
export default function StandardPage({ page }: { page: Page }) {
  return (
    <>
      <Seo page={page} />
      <Breadcrumbs items={page.breadcrumbs} />
      <main><BlockRenderer blocks={page.blocks} /></main>
    </>
  );
}
```

### 4.3 O componente `<PN>` — resolvendo o lockup

No HTML original o lockup está aninhado de forma redundante
(`.pn > b > .pn.pn-alone > b`), provavelmente artefato do gerador. Em React:

```tsx
export function PN({ platform }: { platform?: string }) {
  if (!platform) return <span className="pn pn-alone"><b>TRF</b></span>;
  return <span className="pn"><b>TRF</b>{platform}</span>;
}
// <PN />            → TRF
// <PN platform="Cobot" /> → TRFCobot
```

O CSS cuida do resto: peso 300/800, verde sobre escuro, **preto sobre claro**, peso 400 quando
dentro de texto corrido. Essa inversão por contexto é um detalhe fácil de perder — está
mapeada em `08-design-system.md` §3.7.

---

## 5. Conteúdo: extrair, não digitar

84 páginas × ~10 blocos = ~850 blocos. Digitar à mão é inviável e introduz erro nos textos —
e você pediu **os mesmos textos**. Então: **script de extração.**

### 5.1 `scripts/extract-content.mjs`

Entrada: `levantamento-trf/01-html/**/index.html` + `04-rotas-e-metadados.json`
Saída: `src/content/pages/<slug>.ts` tipado como `Page`

Lógica:
1. Parse do HTML com **`node-html-parser`** ou `cheerio`.
2. Metadados: `<title>`, `meta[description]`, `og:image`, `.crumbs ol li`, blocos JSON-LD.
3. Para cada `<section>` de nível 1 em `<main>`, classificar por `className` → `type`:
   | className contém | → type |
   |---|---|
   | `hero hero-home` | `hero` variant `home` |
   | `hero hero-compact` | `hero` variant `compact` |
   | `hero` | `hero` variant `image` |
   | `home-title` | `homeTitle` |
   | `benefits` | `benefits` |
   | `pp` | `productPoints` |
   | `nums` | `numberStrip` |
   | `plats` | `platformColumns` |
   | `partners` | `logoWall` |
   | `parent` | `parent` |
   | `events` | `events` |
   | `follow` | `follow` |
   | `faq` | `faq` |
   | `final` | `final` |
   | `show` | `showBanner` |
   | `roi` | `roi` (sub-variante por `catalog`/`contact-sec`/`omb`/`roi-fixed`) |
   | `split` | `split` (+ `auto`→sticky, `inl`/`tbl`, `fp`/`on-dark`→imgMode) |
   | `sec light`/`sec dark` + filhos | `prose`, ou o tipo do filho dominante (`ul.inds`→`industryGrid`, `ol.journey`→`journey`, `.cards`→`cardGrid`, `ul.tiles`→`tiles`, `.table-wrap`→`specTable`, `.icards`→`iconCards`, `.spec-tiles`→`specTiles`, `.gal`→`gallery`) |
4. Converter o conteúdo interno para `Rich[]`/`Span[]`, com uma regra crítica:
   **colapsar `span.pn` em `{ k:'pn', platform }`** — isso limpa o aninhamento duplo e é o
   que garante que o texto não vire sopa de `<span>`.
5. Normalizar caminhos: `../../assets/media/x.webp?v=...` → `/assets/media/x.webp`.
6. Reescrever links: `../contact/index.html` → `/contact/`.
7. Preservar `srcset`/`sizes`/`width`/`height`/`alt` das imagens — são parte do layout
   (os `aspect-ratio` inline evitam CLS).

### 5.2 Validação da extração

Não confie no script no escuro. Depois de gerar:

```bash
node scripts/extract-content.mjs --verify
```

- Reserialize cada `Page` para texto puro e compare com `06-analise/05-textos-todas-paginas.md`.
  **Diferença esperada: zero.** Qualquer divergência = bug do extrator ou bloco não mapeado.
- Liste blocos que caíram em `prose` genérico com filhos não reconhecidos → são os casos a
  tratar à mão.
- Conte: 84 páginas, 15 indústrias, 9 plataformas, 3 case studies, 3 páginas locais.

### 5.3 Conteúdo compartilhado, à mão

Esses são pequenos e vale escrever bem, em vez de extrair:
- `nav.ts` — o mega menu completo: 6 grupos, com as colunas "Platforms"/"By Product",
  "Food and Beverage"/"Consumer and Industrial" etc. Texto em `01-anatomia-home.md` §HEADER.
- `site.ts` — NAP (`14840 W 107th St, Lenexa, KS 66215` · `(913) 242-8019`), as 4 redes,
  o evento atual (PACK EXPO International 2026, 18–21/10/2026, McCormick Place, booth N-5660).
- `platforms.ts` — as 9: Cobot, Compact, Speed, Subzero (palletizing); Rapidpack, Onepack,
  Droppack (case packing); Intraflow, Cleanflow (conveying) — com kicker, descrição e faixas
  (`~1–10 cases/min, até ~22 lb` etc.).
- `industries.ts` — as 15, com ícone, foto e frase.

---

## 6. Fases de execução

### Fase 0 — Fundação (0,5 dia)
- [ ] `npm create vite` + TS + `vite-react-ssg` + `react-router-dom`
- [ ] Copiar assets do levantamento para `public/assets/` (fontes, mídia, vídeo, logos, og)
- [ ] `02-fonts.css` com os 2 `@font-face` + `<link rel="preload" crossorigin>` no HTML base
- [ ] `00-tokens.css` conforme §2.3
- [ ] **Checkpoint:** página em branco com `body { background: var(--white) }`, fontes
      carregando (confirme no DevTools → Network, sem fallback Arial)

### Fase 1 — Design system (1,5 dia)
- [ ] `01-reset.css`, `03-base.css`, `04-layout.css` — `.wrap`, `.sec`, `.prose`, `.eyebrow`,
      `.lime`, `.arr`, tipografia com os `clamp()` da tabela §1.4 do design system
- [ ] Primitivos: `<Button variant="pri|sec-d|sec-c">`, `<PN>`, `<Eyebrow>`, `<Arrow>`,
      `<GoLink>`, `<Picture>` (com srcset 960/1920)
- [ ] As 6 classes de chanfro
- [ ] Os 47 ícones → componentes React (`scripts/extract-icons.mjs`: SVG → `.tsx`,
      trocar `stroke="currentColor"`, remover `width`/`height` fixos)
- [ ] **Checkpoint:** uma página `/_kitchen-sink` que renderiza todos os primitivos,
      todas as variantes de botão, os 47 ícones e as 6 escalas de chanfro, sobre
      fundo claro **e** escuro. Compare com `04-assets/icones-svg-inline/_catalogo.html`.

### Fase 2 — Chrome (1,5 dia)
- [ ] `<SiteHeader>`: sticky, `rgba(0,0,0,.94)` + `backdrop-filter: blur(10px)`,
      `min-height: 100px` → `80px` com `.scrolled` (hook `useScrolled`, threshold 24px),
      logo 56px → 48px
- [ ] `<MegaMenu>`: **mantenha `<details>/<summary>`** como o original. É acessível por
      padrão, funciona sem JS, e no mobile (≤1260px) só precisa de `position: static` +
      `border-left: 2px verde` em CSS. Replicar o JS de fechar-os-outros (`inline-06.js`).
- [ ] `<SiteFooter>`: grid `1.4fr repeat(4,1fr)` → `1fr 1fr` (≤1100) → `1fr` (≤420);
      `.legal` com links + `.dev` de crédito
- [ ] `<Breadcrumbs>` com separador `/` via `li+li::before`
- [ ] `useReveal()`: IntersectionObserver `rootMargin: '0px 0px -8% 0px'`, `threshold: .08`,
      stagger `(i % 4) * 70ms`, respeitando `prefers-reduced-motion`
- [ ] **Checkpoint:** header + footer lado a lado com o espelho em 1920 / 1280 / 1024 / 768 / 390

### Fase 3 — Blocos, parte 1: os da home (2,5 dias)
Nesta ordem (é a ordem da página, e cada um valida o anterior):
- [ ] `<HeroHome>` — vídeo com `--vid: max(420px, calc(100svh - var(--hdr)))`,
      `autoplay muted loop playsinline`, troca para SD se `innerWidth <= 900`,
      pausa em reduced-motion, `.home-shade` com o duplo gradiente (radial + linear)
- [ ] `<EntryCards>` — **cuidado: o título vem ANTES da imagem no DOM.** `.entry` externo
      carrega o `drop-shadow` do glow verde; `.entry-card` interno tem o chanfro 22px e a
      borda `rgba(192,255,0,.55)`; hover = `translateY(-4px)` + glow mais forte
- [ ] `<HomeTitle>` — H1 centrado `max-width: 26ch` com `.lime` na segunda metade,
      + 4 `<StatNum>` com `useCountUp` (easing `1-(1-k)³`, 1400ms, `toLocaleString('en-US')`,
      `data-to` → só anima se `IntersectionObserver` e sem reduced-motion)
- [ ] `<BenefitStrip>` — 5 caixas centradas, ícone 56px, chanfro 14px; grid
      5 → 3 (≤1100) → 2 (≤700) → 1 (≤420), com os `grid-column: span 2` do QA
- [ ] `<CardGrid cols={3}>` + `<StoryCard>` — imagem 16/10 dessaturada, `.scard-b` com
      `border-top: 2px` verde e grid `1fr auto`
- [ ] `<PlatformColumns>` — 3 colunas (4+3+2 cards), `h3.plat-h` com contador
      "N platforms" e borda verde, `a.plat` grid `132px 1fr` com imagem sobre **branco**
- [ ] `<LogoWall>` — grid de 7, `ul.logos.seals` 132px e `ul.logos.certs` 110px,
      caixas brancas, `object-fit: contain`, `max-width: 82%`
- [ ] `<Journey>` — 5 fases em 5 colunas, `.jn` verde, `.jt` display 600, bullets
      quadrados verdes de 6px; 5 → 3 (≤1200) → 2 (≤800) → 1 (≤560)
- [ ] `<SectionSplit>` — `1.05fr .95fr`, variante `.fp` (contain sobre branco, sem chanfro),
      e a **cantoneira em L** verde do `::after`
- [ ] `<IndustryGrid>` — 15 cards em 5 colunas; foto 16/9 + ícone 46px **sobreposto**
      (`margin-top: -40px`, borda verde fraca); no mobile ≤560px o `.ind-p` some e o
      `.ind-go` fica só com a seta
- [ ] `<ParentBlock>` — `.9fr 1.1fr` + 3 `.parent-facts`
- [ ] `<EventList>` — grid `200px 1.3fr 1.5fr auto`, logo em caixa branca,
      `<dl class="ev-facts">` com `dt` verde uppercase
- [ ] `<FollowBlock>` — `1.1fr .9fr` + `ul.social.big` (grid 2×, 64px, chanfro 12px)

### Fase 4 — Home montada (0,5 dia)
- [ ] `pages/Home.tsx` com os 12 blocos na ordem exata
- [ ] `<Seo>` + JSON-LD (`Organization` + `WebSite`) de `03-javascript/json-ld/index.json`
- [ ] **Checkpoint — o mais importante do projeto:** screenshot diff da home contra
      `00-site-offline/index.html` em 1920 / 1440 / 1280 / 1024 / 900 / 768 / 600 / 390.
      **Meta: ≤2% de diferença de pixels por viewport.** Resolva aqui, antes de escalar.

### Fase 5 — Blocos, parte 2: os internos (2 dias)
- [ ] `<Hero variant="image">` — imagem `left: 32%; width: 68%`, `.hero-shade` com o
      gradiente duplo de 90°+0°; e `variant="compact"`
- [ ] `<SectionProse>` — o bloco mais usado do site. Renderiza `Rich[]`: `p`, `ul`, `ol`,
      `ul.checks` (marcador quadrado chanfrado de 14px), `img` (chanfro 22px), `.go-row`,
      `.cta-btns`. Inversão completa de cores por `theme`
- [ ] `<SectionSplit>` variantes `auto` (imagem `position: sticky; top: 130px`), `inl`, `tbl`
- [ ] `<ProductPoints>` (`.pp`) — 4 itens, ícone 30px, divisórias verticais
- [ ] `<FaqGrid>` + `<FaqItem>` — 2 colunas de `<details>`; o `.pm` é **um quadrado
      chanfrado de 7px com dois `::before`/`::after` verdes**, um deles rotacionando 90°→0°
- [ ] `<FinalCta>` — imagem de fundo `opacity: .45` + gradiente 90°, `.hero-grid`,
      `.final-radial` girando, o "T" `.final-t`, `min-height: 520px`
- [ ] `<TileLinks>` — `auto-fill minmax(250px, 1fr)`, 88px, **invertem para verde no hover**
- [ ] `<IconCards>`, `<SpecTiles>`, `<Gallery>`, `<NumberStrip variant="svc">`,
      `<ProcessGrid>`, `<ShowBanner>`
- [ ] `<SpecTable>` — e **o comportamento mobile: ≤600px a tabela vira cards**, com os
      rótulos vindos de `td[data-label]::before`. Garanta que o extrator preserve `data-label`
- [ ] Os ornamentos: `<HeroGrid>`, `<Radial>` (spin 120s), `<Circuit>`, `<BrandT>` —
      todos com `aria-hidden` e `pointer-events: none`

### Fase 6 — Conteúdo e rotas (1,5 dia)
- [ ] `scripts/extract-content.mjs` (§5.1) + `--verify` (§5.2)
- [ ] `nav.ts`, `site.ts`, `platforms.ts`, `industries.ts` à mão (§5.3)
- [ ] `lib/routes.ts` gerado de `04-rotas-e-metadados.json`; `vite-react-ssg` pré-renderiza
      as 84 rotas com trailing slash (`/robotic-palletizing/cobot-palletizer/`)
- [ ] `<Seo>`: title, description, canonical, `og:*`, `twitter:*`, JSON-LD por página
- [ ] **Checkpoint:** `npm run build` gera 84 HTMLs; `--verify` dá zero diferença de texto

### Fase 7 — Interações e formulários (1 dia)
- [ ] `<ContactForm>` — honeypot `input[name=website]` escondido em `left: -9999px`,
      `POST` para o endpoint de leads, estados de erro inline (`.roi-err`) e sucesso (`.cf-ok`)
- [ ] `<CatalogForm>` — idem + **validação de e-mail corporativo** (a blocklist de 50 domínios
      free está em `inline-08.js`)
- [ ] `<RoiCalculator>` — porte de `inline-11.js` (8,7 KB, o maior script): KPIs, barras
      animadas (`width` com transição `.8s`), `.roi-warn`, memória de cálculo em `<details>`
- [ ] `<PrivacyChoices>` — `navigator.globalPrivacyControl` → `data-gpc="1"`, opt-out
- [ ] **Envio: front-only, sem backend.** O `submit` é real (valida, bloqueia e-mail free,
      monta o payload exatamente como o original); só a entrega é plugável:

      ```ts
      // VITE_LEADS_API vazio  → modo mock: console.log do payload + estado de sucesso
      // VITE_LEADS_API setado → POST de verdade naquela URL
      const api = import.meta.env.VITE_LEADS_API;
      if (!api) { console.log('[lead]', payload); return ok(); }
      await fetch(api, { method:'POST', headers:{'Content-Type':'application/json'},
                         body: JSON.stringify(payload) });
      ```

      Default do projeto: **vazio** (mock). O endpoint do original
      (`https://trfpanel.trfautomation.com/api/leads`) fica registrado comentado no
      `.env.example` — apontar para lá cria leads reais no CRM da Torfresma, então só com
      intenção explícita.

### Fase 8 — SEO, performance, acessibilidade (1 dia)
- [ ] `sitemap.xml` gerado no build a partir de `routes.ts`
- [ ] `robots.txt` — **note que o original tem `Disallow: /`** porque está em pré-lançamento.
      Para um site de verdade: `Allow` + referência ao sitemap. E remova o
      `<meta robots="noindex, nofollow">`
- [ ] Opcional, mas é um diferencial real do original: o **`.md` por página + `/llms.txt`**.
      Já tem o renderizador de blocos — serializar `Block[]` para Markdown é ~80 linhas
- [ ] Performance: o vídeo do hero são 8,6 MB. Avalie `preload="none"` + poster, ou
      `<source type="video/webm">` antes do mp4 (economia típica de 30–50%)
- [ ] Lighthouse ≥95 nas 4 categorias; compare com o original (que parte de HTML estático,
      então a régua é alta)
- [ ] A11y: navegação por teclado no mega menu (`<details>` já resolve), `:focus-visible`
      com outline verde, contraste do `#C0C0C0` sobre `#000` (passa AA em texto normal),
      `prefers-reduced-motion` desligando todas as animações

### Fase 9 — QA de fidelidade (1 dia)
Ver §9.

---

## 7. Os 12 detalhes que, se passarem batido, matam a fidelidade

Levantados do CSS real. Cada um é um erro que parece pequeno e é imediatamente visível:

1. **`--white` é `#EEEEEE`, não `#fff`.** As seções claras são off-white. Usar branco puro
   muda o site inteiro.
2. **O chanfro tem 9 tamanhos, não 1.** Um botão (12px) e uma `.split-img` (26px) não têm o
   mesmo corte. A escala está em §2.3.
3. **O título do card de entrada vem antes da imagem.** `.entry-b` → `.entry-img` no DOM,
   com `border-bottom` verde. É o inverso do `.scard`.
4. **`clip-path` corta sombra.** Por isso o glow verde dos cards de entrada mora num wrapper
   externo. Ignorar isso = cards sem glow.
5. **Imagens em repouso são `saturate(.85) brightness(.85)`** e só ficam nítidas no hover.
   Sem isso o site parece "brilhante" demais.
6. **O `.pn` troca de cor por contexto.** Verde sobre escuro, **preto** sobre claro — com
   exceções (card, tile, process em seção clara voltam a verde).
7. **`.eyebrow` tem um traço verde de 22×2px no `::before`**, com `gap: 10px`.
8. **A seta é o caractere `→`**, não um ícone, e desliza 5px no hover do pai.
9. **O stagger do reveal é JS, não CSS** — `(i % 4) * 70ms`, aplicado como `transitionDelay`
   inline. Em React, aplique no efeito que registra o observer.
10. **O vídeo usa `100svh`, não `100vh`** (`--vid: max(420px, calc(100svh - var(--hdr)))`).
    No mobile a diferença é a barra do browser aparecendo e sumindo.
11. **A tabela vira cards no mobile** via `td[data-label]::before`. Precisa do `data-label`
    em cada `<td>` — o extrator tem que preservar.
12. **`.home-t` está `display: none`.** O "T" decorativo da home foi escondido no último
    patch. Não ressuscite porque está no CSS.

---

## 8. Como validar fidelidade (não "olhando")

Você tem o espelho offline funcionando — use-o como baseline automatizado.

```js
// scripts/visual-diff.mjs
const PAGES = ['/', '/robotic-palletizing/', '/robotic-palletizing/cobot-palletizer/',
               '/case-packing/', '/industries/', '/industries/food-processing/',
               '/resources/case-studies/avon/', '/contact/',
               '/tools/palletizing-roi-calculator/', '/about/'];
const VIEWPORTS = [1920, 1440, 1280, 1024, 900, 768, 600, 390];
// A (alvo):  http://localhost:8080<rota>   ← levantamento-trf\servir-espelho.cmd
// B (novo):  http://localhost:5173<rota>   ← npm run dev
// → screenshot full-page de cada, pixelmatch, relatório HTML com os 3 lado a lado
```

Suba o espelho por **HTTP**, não `file://`: algumas imagens usam caminho absoluto
(`/assets/...`) e não carregariam, o que poluiria o diff com falsos positivos.

Rode isso a partir da Fase 4 e trate como teste de regressão.

Checklist manual que o diff não pega:
- [ ] hover de todos os cards (transform, glow, filtro da imagem, cor da seta)
- [ ] mega menu: abrir/fechar, fechar-os-outros, clique fora, teclado (Tab/Enter/Esc)
- [ ] `.scrolled` do header na transição exata de 24px
- [ ] contador dos números disparando uma vez só, ao entrar em 40% de visibilidade
- [ ] vídeo: autoplay em desktop, troca para SD em ≤900px, pausado em reduced-motion
- [ ] `<details>` do FAQ: o `+` virando `−`
- [ ] tabela virando cards em ≤600px
- [ ] `prefers-reduced-motion: reduce` → tudo estático, nada invisível

---

## 9. Riscos e decisões que são suas

| # | Questão | Recomendação |
|---|---|---|
| 1 | **Conteúdo de terceiros.** Textos, fotos, logo TRF e os 14 logos de parceiros (ABB, FANUC, KUKA, Rockwell, Siemens, Interroll, Intralox, UL, PMMI, EcoVadis) são propriedade da Torfresma e dos respectivos donos. | Se o alvo é um site **seu**, reconstrua a estrutura e o design — que é o que você admirou — e **substitua** texto, fotos, marca e logos pelos seus. Logos de parceiro exigem autorização de uso. Se você trabalha para a TRF/Torfresma/Atlantic Digital, isso não se aplica. |
| 2 | **Fontes.** Hubot Sans e Host Grotesk são open source (OFL) — pode usar. | Baixe dos repositórios oficiais em vez de reusar os `.woff2` subsetados, para ter todos os pesos e ranges. |
| 3 | **Endpoint de leads.** Projeto é front-only, sem backend. | Resolvido na Fase 7: `VITE_LEADS_API` vazio = mock (payload no console + estado de sucesso). O form fica 100% funcional sem nenhum backend. Apontar para `trfpanel.trfautomation.com` grava leads reais no CRM da Torfresma — evite em teste. |
| 4 | **SSG vs SPA.** 84 páginas de marketing com JSON-LD por página. | `vite-react-ssg`. Se o SEO não importar no seu caso, uma SPA simplifica — mas aí você perde o que faz o original ser rápido. |
| 5 | **Vídeo de 8,6 MB.** | Reencode em WebM/AV1 + `preload="none"`. Ou um poster animado leve. |
| 6 | **23 breakpoints.** | Consolide em 5 (`600 / 900 / 1100 / 1260 / 1500`) e trate os outros como exceção pontual onde o QA original realmente precisou. |
| 7 | **Textos em inglês (en-US).** | Se o seu site for pt-BR, planeje i18n **agora**: o contrato de blocos já isola texto de layout, então é barato fazer no começo e caro depois. |

---

## 10. Cronograma

| Fase | Entrega | Dias |
|---|---|---|
| 0 | Fundação, assets, fontes, tokens | 0,5 |
| 1 | Design system + primitivos + 47 ícones | 1,5 |
| 2 | Header, mega menu, footer, breadcrumbs, reveal | 1,5 |
| 3 | Os 13 blocos da home | 2,5 |
| 4 | **Home com diff ≤2%** | 0,5 |
| 5 | Os 15 blocos das páginas internas | 2,0 |
| 6 | Extrator de conteúdo + 84 rotas + SEO | 1,5 |
| 7 | Formulários + calculadora ROI | 1,0 |
| 8 | SEO, performance, acessibilidade | 1,0 |
| 9 | QA de fidelidade | 1,0 |
| | **Total** | **~13 dias** |

Caminho crítico: **Fase 4**. Se a home não fechar em ≤2% de diff, as Fases 5–6 vão multiplicar
o desvio por 83 páginas. Não avance antes de fechar.

---

## 11. Ordem de ataque, resumida

```
1. Ler   levantamento-trf/06-analise/08-design-system.md      (a especificação)
2. Rodar levantamento-trf/servir-espelho.cmd                  (o alvo, lado a lado)
3. Fases 0→2    → chrome fiel
4. Fase 3→4     → home com diff ≤2%     ← portão de qualidade
5. Fase 5→6     → as 83 internas saem quase de graça
6. Fases 7→9    → forms, SEO, QA
```
