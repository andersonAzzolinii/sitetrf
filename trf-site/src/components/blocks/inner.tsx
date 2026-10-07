import { Link } from 'react-router-dom';
import type {
  Span,
  TableCell,
  IconItem,
  IndustryCard,
  Img,
  Link as L,
  Logo,
  Phase,
  Step,
  StoryCard,
} from '../../content/types';
import { Spans, RichBody } from '../../lib/Rich';
import { Picture } from '../primitives/Picture';
import { Arrow } from '../primitives/Arrow';
import { PN } from '../primitives/PN';
import { ICONS } from '../icons/icons';

/* ---------------------------------------------------------------------------
   Os "mioolos" das grades. Cada um pode aparecer solto como bloco de secao
   ou intercalado no corpo de um .prose — por isso vivem aqui, sem <section>.
   --------------------------------------------------------------------------- */

export function Cards({ cols, cards }: { cols: 1 | 2 | 3 | 4; cards: StoryCard[] }) {
  return (
    <div className={`cards c${cols}`}>
      {cards.map((c, i) => (
        <article className="scard rv" key={i}>
          <CardBody card={c} />
        </article>
      ))}
    </div>
  );
}

function CardBody({ card }: { card: StoryCard }) {
  const inner = (
    <>
      {card.img && (
        <div className="scard-img">
          <Picture {...card.img} />
        </div>
      )}
      <div className="scard-b">
        <div>
          {card.logo && (
            <img
              className="case-logo"
              src={card.logo.src}
              alt={card.logo.alt}
              loading="lazy"
              width={200}
              height={48}
            />
          )}
          <h3>
            <Spans spans={card.title} />
          </h3>
          {card.text && (
            <p>
              <Spans spans={card.text} />
            </p>
          )}
        </div>
        {/* a seta so existe quando o card leva a algum lugar */}
        {(card.to || card.href) && <Arrow />}
      </div>
      {card.extra && (
        <div className="scard-x">
          <RichBody body={card.extra} />
        </div>
      )}
    </>
  );

  if (card.to)
    return (
      <Link className="card-link" to={card.to}>
        {inner}
      </Link>
    );
  if (card.href)
    return (
      <a className="card-link" href={card.href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  /* sem destino o original mantem o wrapper como <div>, nao solta o conteudo */
  return <div className="card-link">{inner}</div>;
}

export function ICards({ cards }: { cards: IconItem[] }) {
  return (
    <div className="cards icards">
      {cards.map((c, i) => (
        <div className="ic rv" key={i}>
          <span className="ic-i">{ICONS[c.icon]}</span>
          <h3>
            <Spans spans={c.title} />
          </h3>
          <p>
            <Spans spans={c.text} />
          </p>
        </div>
      ))}
    </div>
  );
}

export function Tiles({ links }: { links: L[] }) {
  return (
    <ul className="tiles">
      {links.map((l, i) => (
        <li key={i}>
          {l.to ? (
            <Link to={l.to}>
              {l.label}
              <Arrow />
            </Link>
          ) : (
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
              <Arrow />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Inds({ items }: { items: IndustryCard[] }) {
  return (
    <ul className="inds">
      {items.map((it) => (
        <li className="rv" key={it.to}>
          <Link className="ind" to={it.to}>
            <span className="ind-ph">
              <Picture sizes="(max-width: 760px) 50vw, 300px" {...it.img} />
            </span>
            <span className="ind-in">
              <span className="ind-ico">{ICONS[it.icon]}</span>
              <span className="ind-t">{it.title}</span>
              <span className="ind-p">{it.text}</span>
              <span className="ind-go">
                View industry
                <Arrow />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function JourneyList({ phases }: { phases: Phase[] }) {
  return (
    <ol className="journey">
      {phases.map((p, i) => (
        <li className="rv" key={i}>
          <span className="jn">{p.n}</span>
          <p className="jt">
            <Spans spans={p.title} />
          </p>
          <ul className="jl">
            {p.items.map((it, j) => (
              <li key={j}>
                <Spans spans={it} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export function Process({ steps }: { steps: Step[] }) {
  return (
    <ol className="process">
      {steps.map((s, i) => (
        <li key={i}>
          <span className="n">{s.n}</span>
          <span className="t">
            <Spans spans={s.title} />
          </span>
          {s.text && (
            <span className="d">
              <Spans spans={s.text} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export function STiles({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="spec-tiles">
      {items.map((it, i) => (
        <div className="st rv" key={i}>
          <p className="st-v">{it.value}</p>
          <p className="st-l">{it.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Table({
  head,
  rows,
  spec,
}: {
  head: Span[][];
  rows: TableCell[][];
  spec?: boolean;
}) {
  /* o rotulo de cada td vai para data-label: abaixo de 600px a tabela vira
     cards e o CSS imprime esse rotulo num ::before */
  const labelOf = (i: number) =>
    (head[i] ?? [])
      .map((s) => {
        if (typeof s === 'string') return s;
        if (s.k === 'pn') return 'TRF' + (s.platform ?? '');
        return s.t;
      })
      .join('');
  return (
    <div className={spec ? 'table-wrap spec' : 'table-wrap'}>
      <table>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i}>
                <Spans spans={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} data-label={labelOf(j)}>
                  <Spans spans={c.spans} />
                  {c.list && (
                    <ul>
                      {c.list.map((li, k) => (
                        <li key={k}>
                          <Spans spans={li} />
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Gal({ images }: { images: Img[] }) {
  return (
    <div className="gal">
      {images.map((img, i) => (
        <figure className="gal-i" key={i}>
          <Picture sizes="(max-width: 700px) 50vw, 400px" {...img} />
        </figure>
      ))}
    </div>
  );
}

export function Logos({
  seals,
  certsLabel,
  certs,
}: {
  seals: Logo[];
  certsLabel?: string;
  certs?: Logo[];
}) {
  return (
    <>
      <ul className="logos seals">
        {seals.map((l) => (
          <LogoItem key={l.src} logo={l} />
        ))}
      </ul>
      {certs?.length ? (
        <>
          {certsLabel && <p className="certs-h">{certsLabel}</p>}
          <ul className="logos certs">
            {certs.map((l) => (
              <LogoItem key={l.src} logo={l} />
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}

function LogoItem({ logo }: { logo: Logo }) {
  const img = <img src={logo.src} alt={logo.alt} loading="lazy" />;
  return (
    <li className="rv">
      {logo.href ? (
        <a href={logo.href} target="_blank" rel="noopener noreferrer">
          {img}
        </a>
      ) : (
        img
      )}
    </li>
  );
}

export { PN };
