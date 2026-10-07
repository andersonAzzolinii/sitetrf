import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'process' }>;

/** Numeros gigantes em 3 colunas; no mobile vira timeline vertical. */
export function ProcessGrid({ theme, eyebrow, h2, id, steps }: Props) {
  return (
    <section className={`sec ${theme}`}>
      {theme === 'dark' && <Circuit />}
      <div className="wrap prose">
        <Eyebrow>{eyebrow}</Eyebrow>
        {h2 && (
          <h2 id={id}>
            <Spans spans={h2} />
          </h2>
        )}
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
      </div>
    </section>
  );
}
