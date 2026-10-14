# Notas técnicas — decisões e pendências

## Versões

| Pacote | Versão | Nota |
|---|---|---|
| Vite | 8.x | |
| React | 19.2 | |
| TypeScript | 6.x | |
| react-router-dom | **6.30.6** | ver abaixo |
| vite-react-ssg | 0.9.2 | peer exige router `^6.14.1` |

## Pendência 1 — react-router 6 vs 7 (revisitar na Fase 6)

`npm audit` reporta 2 CVEs moderados em `react-router 6.0.0 – 7.17.0`, **sem fix disponível**
nessa faixa (o fix está em ≥ 7.18):

1. `GHSA-wrjc-x8rr-h8h6` — open redirect via backslash em `<Link>` / `useNavigate`
2. `GHSA-337j-9hxr-rhxg` — arbitrary constructor injection em `deserializeErrors()` na
   hidratação SSR

**Por que seguimos no 6.30.6:** `vite-react-ssg@0.9.2` declara peer `react-router-dom@^6.14.1`.
Instalar o 7.18.4 exige `--legacy-peer-deps` e o plugin importa internals do router, então o
risco de quebrar o build SSG é concreto.

**Por que os CVEs não têm superfície aqui:**
- São 84 rotas **estáticas**, pré-renderizadas em HTML no build. Não há rota dinâmica
  derivada de input do usuário, que é o vetor do open redirect.
- Não há SSR em runtime nem `loader`/`action` com erros serializados — o vetor do
  `deserializeErrors()` não existe. O servidor serve arquivos estáticos.

**O que fazer na Fase 6:** depois que o build SSG das 84 rotas estiver verde, tentar
`react-router-dom@^7.18` com `overrides` no `package.json`. Se o build passar e as rotas
renderizarem, migrar. Se quebrar, manter o 6 — a exposição real continua nula.

```json
// tentativa a fazer na Fase 6
"overrides": { "vite-react-ssg": { "react-router-dom": "^7.18" } }
```

## Decisão 2 — formulários sem backend

Projeto é front-only. O envio de leads é plugável por env:

- `VITE_LEADS_API` **vazio** (default) → modo mock: `console.log` do payload + estado de sucesso.
- `VITE_LEADS_API` setado → `POST` real naquela URL.

O endpoint do site original (`https://trfpanel.trfautomation.com/api/leads`) está registrado
comentado no `.env.example`. **Não apontar para lá em teste**: grava leads reais no CRM da
Torfresma.

Toda a lógica de formulário (validação, blocklist de e-mail free, honeypot, estados de erro e
sucesso) roda no front e é fiel ao original — só a entrega é que é mock.

## Progresso

| Fase | Entrega | Status |
|---|---|---|
| 0 | Fundacao: Vite 8 + React 19 + TS, assets, fontes, tokens | feito |
| 1 | Design system: tipografia, chanfros, botoes, primitivos, 47 icones | feito |
| 2 | Chrome: header + mega menu + footer + breadcrumbs + reveal | feito |
| 3 | Blocos da home | a fazer |

## Ferramentas de QA visual (scripts/)

Dependem de dois servidores no ar:

```
levantamento-trf\servir-espelho.cmd     -> http://localhost:8080  (o original)
npm run dev                             -> http://localhost:5173  (o novo)
```

| Script | Para que serve |
|---|---|
| `visual-diff.mjs` | diff de pixels orig x novo, gera `out/diff/relatorio.html` |
| `measure.mjs` | compara propriedades computadas de seletores nos dois lados |
| `compare.mjs` | metricas do header lado a lado + screenshots |
| `shot.mjs` | screenshot avulso + fontes carregadas + erros de console |
| `extract-icons.mjs` | regenera `src/components/icons/icons.tsx` do levantamento |

No Git Bash, prefixe com `MSYS_NO_PATHCONV=1` — senao o shell converte a rota
`/` em caminho Windows e o Playwright recebe uma URL invalida.

### Duas armadilhas de medicao ja resolvidas

1. **Viewport curta no recorte de elemento.** Se o elemento nao couber na
   viewport, o Playwright rola e compoe a imagem, e a composicao introduz
   deslocamento subpixel. Isso inflava o diff do rodape de 0,35% para 3,72%.
   O script agora usa viewport de 2600px de altura quando ha `--sel`.
2. **Header sticky no recorte.** Ele se sobrepoe a captura em posicao
   diferente nos dois lados. O script esconde `header.site` quando o `--sel`
   nao for o proprio header.

## Fidelidade medida ate agora

`header.site` — identico em 1920/1440/1280/1024: altura, cor de fundo, altura
do logo, largura do nav, fonte e padding dos links, fonte e altura do CTA.

`footer.site` — 0,55% / 1,99% / 0,35% / 2,19% / 1,70% em
1920/1440/1024/600/390. Posicoes de todos os blocos e larguras de texto batem
ao centesimo de pixel. O residual e o credito "Developed by Atlantic Digital",
que foi removido de proposito (ver `SITE.developedBy`).

## Dois ajustes de cascata que o port exigiu

Ao remover os `!important` do original, duas regras perderam a disputa e
precisaram de seletor qualificado:

| Regra | Problema | Solucao |
|---|---|---|
| `.hdr-cta` font-size | `.btn` (importado depois) vencia | `components/buttons.css` passou a ser importado ANTES de `05-chrome.css` |
| `.foot-event` cor verde | `.foot a` (0,1,1) vencia `.foot-event` (0,1,0) | `.foot a.foot-event` |

Tambem descoberto: no original, o `display:inline-block` de `.foot-event`
nunca valeu — `.foot a { display:block }` sempre venceu. O port reproduz o
comportamento efetivo (block), nao o declarado.

## Tour 3D — `/machine-tour/`

Passeio guiado pelo scroll pela fechadora ASM 10453224 (`src/pages/MachineTour.tsx` +
`src/lib/machineTour.ts`). O three.js entra por import dinâmico, só no cliente e só nesta rota
(chunk próprio de ~140 kB gzip); o texto dos cards sai no HTML do SSG.

Modelo: `public/assets/media/machine-10453224.glb` (~5 MB, 381 mil triângulos), gerado do STEP
do SolidWorks:

```bash
pip install cadquery-ocp trimesh numpy
python scripts/step2glb.py 10453224.step machine.json 1.0     # -> machine.glb + bounds por subconjunto
npx @gltf-transform/cli optimize machine.glb machine-10453224.glb \
  --compress quantize --join false --flatten false --instance false --simplify-error 0.0006
```

Cada malha se chama `g{N}_{i}`, onde N é o subconjunto do STEP. O tour usa esses números para
destacar, abrir (portas/painéis) e subir (cabeçote) as partes — se o STEP mudar de estrutura,
revisar `SKIN`, `LIFT`, `TUNNEL` em `machineTour.ts` e os `focus` das paradas. Sem meshopt/Draco
de propósito: quantização é nativa do GLTFLoader e dispensa decoder WASM.
