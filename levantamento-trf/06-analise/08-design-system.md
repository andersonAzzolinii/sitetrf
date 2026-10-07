# Design System — trfautomation.com

Extraído de `assets/site.css` (75.472 bytes, 810 linhas minificadas).

> **Atenção ao ler o CSS original:** o arquivo cresceu por *patches* no final (há comentários
> datados tipo `/* 30/09 (Leonardo): ... */`, `/* H18 bloco TRF + Torfresma maior */`).
> Várias regras do topo foram **sobrescritas** no fim com `!important`.
> Os valores abaixo são os **valores resolvidos** (o que o browser realmente aplica).
> Onde há divergência entre topo e fim do arquivo, está marcado com ⚠️.

---

## 1. Tokens

### 1.1 Cores (`:root`)

| Token | Valor | Uso |
|---|---|---|
| `--black` | `#000` | fundo de seções escuras, header, footer, cards |
| `--green` | `#C0FF00` | **cor de acento única** — lime/verde-limão |
| `--grey` | `#C0C0C0` | texto secundário sobre escuro |
| `--white` | `#EEEEEE` | fundo das seções claras (**não é `#fff`**) |
| `--s900` | `#0A0A0A` | superfície de card escuro nível 1 |
| `--s800` | `#141414` | superfície de card escuro nível 2 |
| `--s700` | `#1F1F1F` | superfície nível 3 (barras do ROI) |
| `--t2` | `#4A4A4A` | texto do eyebrow em seção clara |

### 1.2 Cores literais fora do `:root` (importante replicar)

| Valor | Onde |
|---|---|
| `#050505` | fundo de `.entry-b`, `.entry-card`, `ol.process` |
| `#070707` | fundo de `a.plat` |
| `#111` | hover de `a.ind`, hover de linha de tabela escura |
| `#d4ff4d` | hover do botão primário (verde clareado) |
| `#1c1c1c` | corpo de texto em `.sec.light .prose p` |
| `#9a9a9a` | hints do formulário ROI |
| `#ffc83d` | aviso do ROI (`.roi-warn`) |
| `#ff5a5a` / `#2a0000` | erro de formulário |
| `rgba(255,255,255,.74)` | **texto de corpo padrão sobre escuro** |
| `rgba(255,255,255,.08 → .14)` | bordas sobre escuro |
| `rgba(192,255,0,.55)` | borda verde “fraca” (entry-card, ind-ico) |

### 1.3 Tipografia

Duas famílias, ambas via `@font-face` local `.woff2` (subset latino):

| Token | Família | Arquivo | Peso declarados |
|---|---|---|---|
| `--display` | `"Hubot Sans", Arial, sans-serif` | `assets/fonts/hubot-sans.woff2` (48 KB) | 300, 400, 500, 600, 700, 800 |
| `--body` | `"Host Grotesk", Arial, Helvetica, sans-serif` | `assets/fonts/host-grotesk.woff2` (20 KB) | 400, 500, 600 |

- Um único arquivo por família serve **todos** os pesos (são variable fonts; `font-stretch:100%` no Hubot).
- `unicode-range` limitado a latim + alguns símbolos (inclui `U+2192` → a seta `→`).
- Ambas as fontes são open source (Hubot Sans é da GitHub, OFL; Host Grotesk, OFL).
- `font-display: swap`, com `<link rel="preload" as="font" crossorigin>` para as duas.

### 1.4 Escala tipográfica resolvida

| Elemento | font-family | peso | tamanho | line-height | letter-spacing | largura máx |
|---|---|---|---|---|---|---|
| `body` | body | 400 | `16px` | `1.625` | — | — |
| `.hero h1` | display | 700 | `clamp(2.5rem, 5.4vw, 4.6rem)` | `1.02` | `-.02em` | `14ch` |
| `.hero h1` ≤600px | display | 700 | `2.05rem` | `1.06` | | |
| `.home-h1` (home) | display | 700 | `clamp(2rem, 4.2vw, 3.8rem)` | `1.06` | `-.02em` | `26ch`, centrado |
| `.home-kicker` | display | 600 | `clamp(1.5rem, 3.1vw, 2.9rem)` | `1.1` | `-.01em` | `nowrap` (normal ≤900px) |
| `.hero.hero-compact h1` | display | 700 | `clamp(2rem, 4vw, 3.2rem)` | | | `20ch` |
| `.sec h2` | display | 700 | `clamp(2rem, 3.4vw, 3rem)` | `1.05` | `-.02em` | `22ch` |
| `.final h2` | display | 700 | `clamp(2.2rem, 4.4vw, 3.8rem)` | `1.04` | | `16ch` |
| `.sec h3` | display | 600 | `clamp(1.3rem, 1.8vw, 1.6rem)` | `1.2` | | — |
| `.solution` | display | **300** | `clamp(1.25rem, 2vw, 1.6rem)` | `1.3` | | `36ch` |
| `.hero .lead` | body | 400 | `1.15rem` | `1.6` | | `560px` |
| `.home-sign` | body | **500** | `1.16rem` | `1.6` | | `1120px` ⚠️ |
| `.eyebrow` | display | 600 | `.8rem` ⚠️ (era `.72rem`) | | `.12em` + UPPERCASE | — |
| `.prose p`, `.prose li` | body | 400 | `1.04rem` | `1.625` | | `70ch` |
| `.btn`, `.hdr-cta` | display | 600 | `.8rem` | | `.08em` + UPPERCASE | — |
| `.home-num-v` | display | 700 | `clamp(2.4rem, 4.4vw, 3.8rem)` | `1` | `-.02em` | tabular-nums |
| `ol.process .n` | display | **800** | `clamp(3rem, 4.8vw, 4.2rem)` | `.95` | `-.03em` | — |
| `.st-v` (spec tile) | display | **800** | `clamp(1.7rem, 2.6vw, 2.3rem)` | `1.05` | `-.02em` | — |

Globais: `h1,h2,h3 { text-wrap: balance }` · `p { text-wrap: pretty }` · `-webkit-font-smoothing: antialiased`.

### 1.5 Layout / grid

```
.wrap   max-width: 1320px; margin: 0 auto; padding: 0 20px;  (≥1024px → 0 40px)
.bar    max-width: none  ⚠️; padding: 0 20px; (≥1024px → 0 32px ⚠️)
.sec    padding: 64px 0;  (≥1024px → 84px 0;  ≤900px → 72px 0)
.final  padding: 110px 0; min-height: 520px;  (≤900px → 80px 0)
.sec.parent  padding: 110px 0 ⚠️  (≤700px → 72px)
.sec.events  padding: 80px 0 ⚠️
.benefits    padding: 44px 0 ⚠️
```

### 1.6 Breakpoints usados (23 media queries)

`max-width`: 360 · 420 · 460 · 480 · 560 · 600 · 620 · 700 · 760 · 800 · 900 · 1000 · 1100 · 1200 · 1260
`min-width`: 601 · 901 · 1024 · 1261 · 1500
Compostas: `(min-width:601px) and (max-width:900px)` · `(min-width:1261px) and (max-width:1480px)`
Mais: `@media (prefers-reduced-motion: reduce)`

> Não é uma escala limpa de breakpoints — são pontos de QA acumulados.
> Na reconstrução vale consolidar em 5 (`600 / 900 / 1100 / 1260 / 1500`) e tratar o resto como exceção pontual.

---

## 2. O elemento assinatura: o chanfro (`clip-path`)

**Este é o detalhe visual que define o site.** 34 ocorrências no CSS.
Todo card/botão/superfície tem o **canto superior direito cortado em 45°**:

```css
clip-path: polygon(0 0, calc(100% - Npx) 0, 100% Npx, 100% 100%, 0 100%);
```

Tokens declarados: `--ch: 12px`, `--ch-sm: 8px` — mas na prática há uma **escala por tamanho de componente**:

| N | Componentes |
|---|---|
| `26px` | `.split-img img` |
| `22px` | `.entry-card`, `ol.process`, `.roi-form`, `.roi-out`, `.prose img` |
| `18px` | `.scard`, `li.ev`, `.icards .ic` |
| `16px` | `ol.journey > li`, `.gal-i img` |
| `14px` | `ul.tiles a`, `.ben`, `a.ind`, `.st` |
| `12px` (`--ch`) | `.btn`, `.hdr-cta`, `.mega`, `a.plat`, `ul.logos li`, `ul.parent-facts li`, `ul.social.big a` |
| `8px` (`--ch-sm`) | `.mega .hub` |
| `7px` | `.pm` (ícone +/− do FAQ) |
| `5px` / `4px` | `ul.checks li::before`, `ol.process li::after` |

**Recomendação para o React:** criar um helper/mixin `chamfer(n)` e nunca escrever o polygon na mão.

```ts
export const chamfer = (n: number) =>
  `polygon(0 0, calc(100% - ${n}px) 0, 100% ${n}px, 100% 100%, 0 100%)`;
```

### Variante: a cantoneira em L
`.split-img::after` desenha um L verde deslocado atrás da imagem:
```css
left:-14px; bottom:-14px; width:40%; height:40%;
border-left:2px solid var(--green); border-bottom:2px solid var(--green);
```

---

## 3. Padrões visuais recorrentes

### 3.1 A borda verde de 2px
Quase todo card tem **uma única aresta verde** que o ancora:
- `.entry-b` → `border-bottom: 2px solid var(--green)` ⚠️ (o topo foi removido no patch H07)
- `.scard-b`, `h3.plat-h a` → `border-top` / `border-bottom: 2px`
- `ol.journey > li` → `border-top: 2px`
- `.icards .ic` → `border-top: 3px`
- `.st` → `border-left: 4px`
- `ol.process` → `border-bottom: 3px`
- `.svc-nums` → `border-bottom: 3px`
- `th` → `border-bottom: 2px`
- `.mega` → `border-top: 2px`
- `a.go` → `border-bottom: 2px`

### 3.2 O grid de pontos (`.hero-grid`)
```css
background-image: radial-gradient(rgba(255,255,255,.1) 1px, transparent 1px);
background-size: 10px 10px;
mask-image: linear-gradient(90deg,#000 0,#000 40%,transparent 68%);
```
Aparece no hero, em `.sec.plats` (opacity .25), em `.final`, e via `.sec.dark::before` (opacity .07, máscara vertical).

### 3.3 O "T" da marca como ornamento (SVG outline)
Um path SVG do T de TRF, `fill:none; stroke:currentColor`, cor verde, opacidade 0.28–0.55, posicionado sangrando fora da seção:
`.hero-t` (420px) · `.parent-t` (360px) · `.final-t` (300px) · `.home-t` ⚠️ **`display:none`** (escondido no último patch)
viewBox: `995 -4 210 166`.

### 3.4 O radial girando (`.hero-radial` / `.final-radial`)
SVG data-URI de linhas radiais verdes, 720×720, `opacity:.32`, `animation: spin 120s linear infinite`.

### 3.5 O circuito (`.circuit`)
SVG data-URI de trilhas de PCB verdes 520×360 no canto superior direito, `opacity:.22`.

### 3.6 Imagens: dessaturadas em repouso, nítidas no hover
```css
img { filter: saturate(.85) brightness(.85); transition: transform .6s, filter .6s }
a:hover img { transform: scale(1.05); filter: none }
```
Aplicado em `.entry-img`, `.scard-img`, `.ind-ph`.

### 3.7 O lockup de marca `.pn`
Como "TRF" + nome da plataforma são sempre renderizados juntos (`TRFCobot`, `TRFRapidpack`):

```html
<span class="pn"><b><span class="pn pn-alone"><b>TRF</b></span></b>Cobot</span>
```
```css
.pn   { font-family: var(--display); font-weight: 300; white-space: nowrap; letter-spacing: -.01em }
.pn b { font-weight: 800; color: var(--green) }
.pn.pn-alone b { font-weight: 800 }
/* dentro de texto corrido, o peso cai para 400: */
p .pn, li .pn, td .pn, summary .pn, .lead .pn, .ben-p .pn, small .pn, .scard p .pn { font-weight: 400 }
/* em seção clara o "TRF" vira preto, não verde: */
.sec.light .pn b, .show .pn b, .btn.pri .pn b, .hdr-cta .pn b { color: #000 }
/* exceções que voltam a verde mesmo em seção clara: */
.sec.light .scard .pn b, .sec.light ul.tiles a .pn b, .sec.light ol.process .pn b { color: var(--green) }
```

> ⚠️ O HTML real tem **aninhamento duplicado** (`.pn > b > .pn.pn-alone > b`), provavelmente
> artefato do gerador. Em React, substituir por **um componente `<PN>`** com duas variantes
> (`alone` e `platform`) resolve isso de forma limpa.

### 3.8 A seta `→`
Caractere literal `&rarr;` dentro de `<span class="arr">`, nunca um ícone:
```css
.arr { display:inline-block; margin-left:10px; transition: transform .22s ease }
*:hover .arr { transform: translateX(5px) }
```

---

## 4. Animação

| Nome | Definição | Uso |
|---|---|---|
| `.rv` → `.rv.in` | `opacity 0→1`, `translateY(18px)→0`, `.6s cubic-bezier(.2,.7,.2,1)` | **reveal on scroll** — em quase todo bloco |
| `@keyframes up` | `opacity 0→1`, `translateY(22px)→0` | `.hero .lead` (delay .12s), `.hero .btns` (delay .22s), `.ans`, `.roi-out` |
| `@keyframes drop` | `opacity 0→1`, `margin-top -6px→0`, `.2s` | abertura do mega menu |
| `@keyframes spin` | `rotate(360deg)`, `120s linear infinite` | `.hero-radial`, `.final-radial` |
| contador | JS, easing `1-(1-k)³`, duração 1400ms | `.home-nums .cnt` |

**Stagger do reveal:** feito em JS, não em CSS —
`e.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms'` → 0 / 70 / 140 / 210 ms ciclando.

`@media (prefers-reduced-motion: reduce)` zera `animation` e `transition` globalmente com `!important` e força `.rv { opacity:1; transform:none }`.

---

## 5. Inventário de componentes (mapa classe → componente React)

### Chrome (em todas as 81 páginas)

| CSS | Descrição | Componente sugerido |
|---|---|---|
| `header.site` > `.bar` | header sticky, `rgba(0,0,0,.94)` + `backdrop-filter: blur(10px)`; ganha `.scrolled` após 24px de scroll (altura 100px → 80px, logo 56px → 48px) | `<SiteHeader>` |
| `nav.main details` + `.mega` | mega menu nativo com `<details>/<summary>`; `.mega` em `position:absolute` centralizado, 1–2 colunas `.col`, `.h` de título, `.hub` = botão verde no pé | `<MegaMenu>` / `<MegaColumn>` |
| `.menu-btn` | botão hamburguer; só aparece ≤1260px. No mobile `nav.main` vira coluna e `.mega` fica `position:static` com `border-left: 2px verde` | idem |
| `.crumbs` | breadcrumb preto, separador `/` via `li+li::before` | `<Breadcrumbs>` |
| `footer.site` > `.foot` / `.legal` | grid `1.4fr repeat(4,1fr)`; `.legal` com flex space-between | `<SiteFooter>` |
| `ul.social` / `ul.social.big` | 40×40 outline → grid 2 col de 64px de altura com label | `<SocialList variant>` |

### Blocos de seção

| CSS | Descrição | Componente |
|---|---|---|
| `.hero` + `.hero-bg` / `.hero-shade` | hero padrão: imagem ocupando `left:32%; width:68%`, duplo gradiente | `<Hero>` |
| `.hero.hero-home` + `.hero-video` | hero da home: vídeo full-bleed, altura `max(420px, 100svh - var(--hdr))` | `<HeroHome>` |
| `.hero.hero-compact` | hero baixo (contact, compliance, privacy-choices) | `<Hero variant="compact">` |
| `.entries` > `.entry` > `.entry-card` | 3 cards de entrada da home; **título ACIMA da imagem**; glow verde via `drop-shadow`, `translateY(-4px)` no hover | `<EntryCards>` |
| `.home-title` > `.home-h1` + `ul.home-nums` | H1 centrado + 4 números com contador animado | `<HomeTitle>` + `<StatCounter>` |
| `.benefits` > `.ben-row` > `.ben` | 5 caixas centradas, ícone 56px, chanfro 14px | `<BenefitStrip>` |
| `.pp` > `.pp-row` > `.pp-i` | variante horizontal: 4 itens, ícone 30px à esquerda, divisor vertical | `<ProductPoints>` |
| `.sec.light` / `.sec.dark` + `.wrap.prose` | **o bloco genérico de conteúdo** — o mais frequente do site | `<SectionProse>` |
| `.sec.split` > `.split-in` + `.split-img` | 2 colunas `1.05fr .95fr`; modificadores `.auto` (imagem sticky `top:130px`), `.inl`, `.tbl`, `.fp` (contain sobre branco), `.on-dark` | `<SectionSplit>` |
| `.cards.c1/.c2/.c3/.c4` > `.scard` | grid de cards com imagem 16/10 + `.scard-b`; `c1` vira card horizontal 5fr/7fr | `<CardGrid>` + `<StoryCard>` |
| `.cards.icards` > `.ic` | 3 cards só de ícone + título + texto, `border-top: 3px` verde | `<IconCards>` |
| `ul.tiles` | grid `auto-fill minmax(250px,1fr)`, blocos pretos 88px que **invertem para verde** no hover | `<TileLinks>` |
| `.sec.plats` > `.plat-cols` > `ul.plat-grid` > `a.plat` | 3 colunas por família; cada card é grid `132px 1fr` com imagem sobre branco | `<PlatformColumns>` + `<PlatformCard>` |
| `ul.logos.seals` / `ul.logos.certs` | grid de 7, caixas brancas 132px/110px, `object-fit: contain` | `<LogoWall>` |
| `ol.journey` > `li` + `.jn` + `.jt` + `ul.jl` | 5 fases em grid de 5 colunas, número verde, bullets quadrados verdes | `<Journey>` |
| `ol.process` | 3 colunas, número gigante peso 800, régua verde + quadradinho; no mobile vira timeline vertical | `<ProcessGrid>` |
| `ul.inds` > `a.ind` | grid de 5 colunas; foto 16/9 + ícone 46px **sobreposto** (`margin-top: -40px`) | `<IndustryGrid>` + `<IndustryCard>` |
| `.sec.parent` > `.parent-in` + `ul.parent-facts` | grid `.9fr 1.1fr` + 3 fatos | `<ParentBlock>` |
| `.sec.events` > `ul.ev-list` > `li.ev` | grid `200px 1.3fr 1.5fr auto`: logo em caixa branca, info, `<dl class="ev-facts">`, botão | `<EventList>` |
| `.sec.follow` > `.follow-in` | grid `1.1fr .9fr` + `ul.social.big` | `<FollowBlock>` |
| `.sec.light.faq` > `.faq-grid` > `details.qa` | 2 colunas de `<details>`; `.pm` é o +/− (dois pseudo-elementos, um rotaciona) | `<FaqGrid>` + `<FaqItem>` |
| `.final` | CTA final: imagem de fundo `opacity:.45` + gradiente, `min-height: 520px` | `<FinalCta>` |
| `.nums` / `.svc-nums` | faixa de 4 números | `<NumberStrip>` |
| `.table-wrap` + `table` | tabela; **no mobile ≤600px vira cards** via `td[data-label]::before` | `<SpecTable>` |
| `.spec-tiles` > `.st` | tiles de especificação, `border-left: 4px` verde | `<SpecTiles>` |
| `.gal` > `.gal-i` | galeria 3 colunas 4/3 | `<Gallery>` |
| `.roi` / `.roi-form` / `.roi-out` / `.roi-kpis` / `.roi-bars` | calculadora de ROI | `<RoiCalculator>` |
| `.show` / `.show-in` | faixa **verde sólida** com CTA preto | `<ShowBanner>` |
| `ul.checks` | lista com marcador quadrado chanfrado | `<CheckList>` |
| `a.go` / `p.go-row` | link-CTA com borda inferior verde | `<GoLink>` |
| `.btn.pri` / `.btn.sec-d` / `.btn.sec-c` / `.hdr-cta` | botões: primário verde, secundário outline sobre escuro/claro | `<Button variant>` |

### Micro

`.eyebrow` (kicker com traço verde) · `.lime` (span verde) · `.arr` (seta) · `.pn` (lockup) · `.ico` / `.ind-ico` / `.ic-i` (wrappers de ícone) · `.nb` (nowrap) · `.hp` (honeypot off-screen) · `.pc-icon` (ícone Privacy Choices 30×14)

---

## 6. JavaScript (todo inline, ~2,5 KB no total)

Nenhum framework. 11 scripts inline únicos + 1 externo (`cloudflare-email-decode.min.js`, injetado pela Cloudflare).

| Arquivo | Páginas | O que faz |
|---|---|---|
| `inline-01.js` | 81 | `documentElement.classList.add("js")` — gate do reveal |
| `inline-02.js` | 81 | lê `navigator.globalPrivacyControl` → `data-gpc="1"` |
| `inline-05.js` | 81 | **header `.scrolled` + reveal via IntersectionObserver** (`rootMargin: 0 0 -8% 0`, `threshold .08`), stagger `(i%4)*70ms`, fallback `setTimeout(2500)` |
| `inline-06.js` | 81 | mega menu: fecha os outros `<details>` no toggle; fecha tudo em clique fora |
| `inline-03.js` | 1 (home) | contador dos `.home-nums .cnt` (easing cúbico, 1400ms, `toLocaleString('en-US')`) |
| `inline-04.js` | 1 (home) | troca o vídeo para a versão SD se `innerWidth <= 900`; respeita reduced-motion; `.play().catch()` |
| `inline-09.js` | 1 (contact) | submit do form de contato → `POST` JSON |
| `inline-08.js` | 9 | form de catálogo + **validação de e-mail corporativo** (blocklist de 50 domínios free) |
| `inline-10.js` | 1 | privacy choices (opt-out) |
| `inline-07.js` | 1 | compliance |
| `inline-11.js` | 5 | **calculadora de ROI** (8,7 KB — o maior) |

**Endpoint único dos formulários:** `POST https://trfpanel.trfautomation.com/api/leads`
Payload: `{ email, contactName, company, phone?, message, source, pageUrl }`
Todos os forms têm honeypot `input[name=website]` (`.hp`, posicionado em `left:-9999px`).

---

## 7. SEO / infra observada

- **Site estático puro**: HTML por diretório (`/rota/index.html`), links **relativos** (`../assets/…`), um só CSS, zero JS externo de app. Serve offline sem servidor.
- `?v=202610051729` (data-hora) como cache-buster em mídia; `?v=8c1359c9ca` (hash) no CSS.
- Cada página tem um **par `.md`** (`<link rel="alternate" type="text/markdown" href="index.md">`) + `/llms.txt` na raiz — conteúdo pensado para LLM.
- JSON-LD em todas as 81 páginas (`Organization`, `BreadcrumbList`, `FAQPage`, `Product`, `WebPage`…) — ver `03-javascript/json-ld/`.
- `<meta robots: noindex, nofollow>` + `robots.txt: Disallow: /` → **o site está em pré-lançamento**.
- `og:image` dedicada por página (81 JPGs 1200×630).
- Imagens: `.webp` em 2 larguras (960 / 1920) com `srcset` + `sizes`, `width`/`height` explícitos e `decoding="async"`.
- Vídeo do hero: `.mp4` HD (8,6 MB) + SD (5,9 MB) + poster `.webp` em 2 tamanhos, trocados por JS.
- Fontes auto-hospedadas com `preload`.
