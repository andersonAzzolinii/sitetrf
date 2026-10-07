import type { Block } from '../../content/types';
import { Spans, RichBody } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';

type Props = Extract<Block, { type: 'faq' }>;

/**
 * FAQ em 2 colunas de <details>. O +/- e o .pm: um quadrado chanfrado de 7px
 * com dois pseudo-elementos verdes, um deles rotacionando 90deg -> 0.
 */
export function FaqGrid({ eyebrow, h2, id, items }: Props) {
  return (
    <section className="sec light faq">
      <div className="wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id}>{h2}</h2>
        <div className="faq-grid">
          {items.map((it, i) => (
            <details className="qa" key={i}>
              <summary>
                <span className="q">
                  <Spans spans={it.q} />
                </span>
                <span className="pm" aria-hidden="true" />
              </summary>
              <div className="ans">
                <RichBody body={it.a} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
