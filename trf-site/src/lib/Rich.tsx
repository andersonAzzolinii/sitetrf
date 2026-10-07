import { Link } from 'react-router-dom';
import type { Rich as R, Span } from '../content/types';
import { PN } from '../components/primitives/PN';
import { Picture } from '../components/primitives/Picture';
import { Button } from '../components/primitives/Button';
import { GoLink } from '../components/primitives/GoLink';
import {
  Cards,
  ICards,
  Tiles,
  Inds,
  JourneyList,
  Process,
  STiles,
  Table,
  Gal,
  Logos,
} from '../components/blocks/inner';

/** Renderiza uma sequencia de spans (texto com negrito, link, lockup, lime...). */
export function Spans({ spans }: { spans?: Span[] }) {
  if (!spans) return null;
  return (
    <>
      {spans.map((s, i) => {
        if (typeof s === 'string') return <span key={i}>{s}</span>;
        switch (s.k) {
          case 'b':
            return <strong key={i}>{s.spans ? <Spans spans={s.spans} /> : s.t}</strong>;
          case 'lime':
            return (
              <span className="lime" key={i}>
                {s.t}
              </span>
            );
          case 'nb':
            return (
              <span className="nb" key={i}>
                {s.t}
              </span>
            );
          case 'pn':
            return <PN key={i} platform={s.platform} />;
          case 'a': {
            const inner = s.spans ? <Spans spans={s.spans} /> : s.t;
            return s.to ? (
              <Link to={s.to} key={i}>
                {inner}
              </Link>
            ) : (
              <a href={s.href} key={i} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}

/**
 * Renderiza o corpo de um bloco, NA ORDEM: paragrafos, listas, imagens, CTAs
 * e os sub-blocos (tabela, cards, grades) que no original vivem dentro do
 * mesmo .prose, intercalados com o texto.
 */
export function RichBody({ body }: { body?: R[] }) {
  if (!body) return null;
  return (
    <>
      {body.map((b, i) => {
        switch (b.k) {
          case 'p':
            return (
              <p key={i}>
                <Spans spans={b.spans} />
              </p>
            );
          case 'h3':
            return (
              <h3 key={i} id={b.id}>
                <Spans spans={b.spans} />
              </h3>
            );
          case 'ul':
          case 'checks':
            return (
              <ul key={i} className={b.k === 'checks' ? 'checks' : undefined}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Spans spans={it} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Spans spans={it} />
                  </li>
                ))}
              </ol>
            );
          case 'img':
            return <Picture key={i} {...b.img} />;
          case 'go':
            return (
              <p className="go-row" key={i}>
                <GoLink to={b.to} href={b.href}>
                  {b.label}
                </GoLink>
              </p>
            );
          case 'ctas':
            return (
              <div className="cta-btns" key={i}>
                {b.ctas.map((c, j) => (
                  <Button key={j} variant={c.variant} to={c.to} href={c.href} arrow={c.arrow}>
                    {c.label}
                  </Button>
                ))}
              </div>
            );
          /* sub-blocos intercalados no corpo */
          case 'table':
            return <Table key={i} head={b.head} rows={b.rows} spec={b.spec} />;
          case 'cards':
            return <Cards key={i} cols={b.cols} cards={b.cards} />;
          case 'icards':
            return <ICards key={i} cards={b.cards} />;
          case 'tiles':
            return <Tiles key={i} links={b.links} />;
          case 'inds':
            return <Inds key={i} items={b.items} />;
          case 'journey':
            return <JourneyList key={i} phases={b.phases} />;
          case 'process':
            return <Process key={i} steps={b.steps} />;
          case 'specTiles':
            return <STiles key={i} items={b.items} />;
          case 'gal':
            return <Gal key={i} images={b.images} />;
          case 'logos':
            return (
              <Logos key={i} seals={b.seals} certsLabel={b.certsLabel} certs={b.certs} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

/** Renderiza um rotulo que pode ser texto simples ou uma sequencia de spans. */
export function Label({ value }: { value: string | Span[] }) {
  return Array.isArray(value) ? <Spans spans={value} /> : <>{value}</>;
}
