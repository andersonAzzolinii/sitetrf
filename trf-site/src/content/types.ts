/* ---------------------------------------------------------------------------
   O contrato de dados do site. Cada pagina e uma lista de blocos; cada bloco
   e um componente React. Ver PLANO-RECONSTRUCAO.md secao 4.1
   --------------------------------------------------------------------------- */

export type Theme = 'light' | 'dark';

export interface Img {
  /** nome base sem sufixo de largura nem extensao: "trf-home-hub-palletizing" */
  base: string;
  alt: string;
  sizes?: string;
  width?: number;
  height?: number;
  /** true = arquivo unico, sem variantes -960/-1920 */
  single?: boolean;
  /** extensao, quando nao for webp (ha diagramas em svg) */
  ext?: string;
  /** true = carrega com prioridade (acima da dobra) */
  eager?: boolean;
}

export interface Link {
  label: string;
  to?: string;
  href?: string;
}

export interface Cta extends Omit<Link, 'label'> {
  /** texto do botao; aceita Spans para o lockup <PN/> */
  label: string | Span[];
  variant?: 'pri' | 'sec-d' | 'sec-c';
  arrow?: boolean;
}

/* ---- texto formatado ----------------------------------------------------- */

export type Span =
  | string
  /* `spans` preserva conteudo rico dentro do negrito (o lockup <PN/>),
     pelo mesmo motivo do link abaixo */
  | { k: 'b'; t: string; spans?: Span[] }
  /* `spans` carrega conteudo rico dentro do link (tipicamente o lockup
     <PN/>): sem ele, um <a> dentro de <th> perderia o `text-transform:none`
     do .pn e viraria TRFCLEANFLOW */
  | { k: 'a'; t: string; spans?: Span[]; to?: string; href?: string }
  | { k: 'lime'; t: string }
  | { k: 'nb'; t: string }
  | { k: 'pn'; platform?: string };

/** Celula de tabela: texto e, quando houver, uma lista dentro do <td>. */
export interface TableCell {
  spans: Span[];
  list?: Span[][];
}

export type Rich =
  | { k: 'p'; spans: Span[] }
  | { k: 'ul'; items: Span[][] }
  | { k: 'ol'; items: Span[][] }
  | { k: 'checks'; items: Span[][] }
  | { k: 'h3'; spans: Span[]; id?: string }
  | { k: 'img'; img: Img }
  | { k: 'go'; label: string; to?: string; href?: string }
  | { k: 'ctas'; ctas: Cta[] }
  /* Sub-blocos que vivem DENTRO de um .prose, intercalados com os paragrafos.
     Precisam estar no Rich para manter a ordem do original — promove-los a
     blocos de secao separados perderia o texto ao redor. */
  | { k: 'table'; head: Span[][]; rows: TableCell[][]; spec?: boolean }
  | { k: 'cards'; cols: 1 | 2 | 3 | 4; cards: StoryCard[] }
  | { k: 'icards'; cards: IconItem[] }
  | { k: 'tiles'; links: Link[] }
  | { k: 'inds'; items: IndustryCard[] }
  | { k: 'journey'; phases: Phase[] }
  | { k: 'process'; steps: Step[] }
  | { k: 'specTiles'; items: { value: string; label: string }[] }
  | { k: 'gal'; images: Img[] }
  | { k: 'logos'; seals: Logo[]; certsLabel?: string; certs?: Logo[] };

/* ---- pecas reutilizadas pelos blocos ------------------------------------- */

export interface IconItem {
  icon: string;
  title: Span[];
  text: Span[];
}

export interface StatNum {
  /** numero a animar; ausente = valor estatico tipo "Global" */
  countTo?: number;
  value: string;
  suffix?: string;
  /** aceita Spans porque alguns rotulos trazem o lockup <PN/> */
  label: string | Span[];
}

export interface EntryCard {
  title: string;
  to: string;
  img: Img;
}

export interface StoryCard {
  title: Span[];
  text?: Span[];
  to?: string;
  href?: string;
  img?: Img;
  logo?: { src: string; alt: string };
  /** o .scard-x: bloco extra abaixo do card, com lista e texto */
  extra?: Rich[];
}

export interface Phase {
  n: string;
  title: Span[];
  items: Span[][];
}

export interface Step {
  n: string;
  title: Span[];
  text?: Span[];
}

export interface PlatformCard {
  kicker: string;
  platform: string;
  text: Span[];
  to: string;
  img: Img;
}

export interface PlatformColumn {
  family: string;
  to: string;
  count: string;
  cards: PlatformCard[];
}

export interface IndustryCard {
  title: string;
  text: string;
  to: string;
  icon: string;
  img: Img;
}

export interface Logo {
  src: string;
  alt: string;
  href?: string;
}

export interface EventItem {
  logo: { src: string; alt: string };
  title: string;
  text: string;
  facts: { label: string; value: string }[];
  cta: Cta;
}

export interface Social {
  network: 'linkedin' | 'youtube' | 'facebook' | 'instagram';
  href: string;
  label: string;
}

/* ---- os blocos ----------------------------------------------------------- */

export type Block =
  | {
      type: 'hero';
      variant: 'home' | 'image' | 'compact';
      eyebrow?: string | Span[];
      kicker?: string;
      h1?: Span[];
      sign?: Span[];
      solution?: Span[];
      lead?: Span[];
      ctas?: Cta[];
      img?: Img;
      entries?: EntryCard[];
    }
  | { type: 'homeTitle'; h1: Span[]; nums: StatNum[] }
  | { type: 'benefits'; label?: string; items: IconItem[] }
  | { type: 'productPoints'; items: IconItem[] }
  | { type: 'numberStrip'; variant?: 'svc'; items: StatNum[] }
  | {
      type: 'prose';
      theme: Theme;
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      intro?: Span[];
      body?: Rich[];
    }
  | {
      type: 'split';
      theme: Theme;
      sticky?: boolean;
      imgMode?: 'cover' | 'contain-white' | 'contain-dark' | 'inline';
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      body: Rich[];
      img: Img;
      /** conteudo do .tbl-tail: um segundo wrap, abaixo do split, com a tabela */
      tail?: Rich[];
    }
  | {
      type: 'cardGrid';
      theme: Theme;
      cols: 1 | 2 | 3 | 4;
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      intro?: Span[];
      cards: StoryCard[];
    }
  | {
      type: 'iconCards';
      theme: Theme;
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      cards: IconItem[];
    }
  | {
      type: 'tiles';
      theme: Theme;
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      intro?: Span[];
      links: Link[];
    }
  | {
      type: 'platformColumns';
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      intro?: Span[];
      columns: PlatformColumn[];
      cta?: Cta;
    }
  | {
      type: 'industryGrid';
      theme: Theme;
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      intro?: Span[];
      items: IndustryCard[];
    }
  | {
      type: 'logoWall';
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      intro?: Span[];
      seals: Logo[];
      certsLabel?: string;
      certs?: Logo[];
    }
  | {
      type: 'journey';
      theme: Theme;
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      intro?: Span[];
      phases: Phase[];
    }
  | {
      type: 'process';
      theme: Theme;
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      steps: Step[];
    }
  | { type: 'specTiles'; theme: Theme; items: { value: string; label: string }[] }
  | { type: 'specTable'; theme: Theme; head: Span[][]; rows: TableCell[][] }
  | { type: 'gallery'; theme: Theme; images: Img[] }
  | {
      type: 'parent';
      eyebrow?: string | Span[];
      h2: Span[];
      id?: string;
      cta?: Cta;
      body: Rich[];
      facts: { title: string; text: Span[] }[];
      outLink?: Link;
    }
  | { type: 'events'; eyebrow?: string | Span[]; h2: Span[]; id?: string; events: EventItem[] }
  | {
      type: 'follow';
      eyebrow?: string | Span[];
      h2: Span[];
      id?: string;
      lead: Span[];
      socials: Social[];
    }
  | {
      type: 'faq';
      eyebrow?: string | Span[];
      h2: string;
      id?: string;
      items: { q: Span[]; a: Rich[] }[];
    }
  | {
      type: 'final';
      eyebrow?: string | Span[];
      h2: Span[];
      id?: string;
      lead?: Span[];
      ctas: Cta[];
      bgImg?: Img;
    }
  | { type: 'showBanner'; eyebrow?: string | Span[]; title: Span[]; cta: Cta }
  | {
      type: 'roi';
      variant: 'calculator' | 'catalog' | 'contact' | 'optOut' | 'ombudsman';
      product?: string;
      eyebrow?: string | Span[];
      h2?: Span[];
      id?: string;
      intro?: Span[];
    };

/* ---- pagina -------------------------------------------------------------- */

/** Item de breadcrumb. `spans` guarda o lockup quando o rotulo o contem:
    a fonte display tem metricas proprias e muda a altura da linha. */
export interface Crumb {
  label: string;
  spans?: Span[];
  to?: string;
}

export interface Page {
  route: string;
  title: string;
  description: string;
  ogImage: string;
  breadcrumbs?: Crumb[];
  jsonLd?: object[];
  blocks: Block[];
}
