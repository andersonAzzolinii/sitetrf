import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'journey' }>;

/** As 5 fases do projeto, cada uma um card chanfrado com borda verde no topo. */
export function Journey({ theme, eyebrow, h2, id, intro, phases }: Props) {
  return (
    <section className={`sec ${theme}`}>
      {theme === 'dark' && <Circuit />}
      <div className="wrap prose">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {h2 && (
          <h2 id={id}>
            <Spans spans={h2} />
          </h2>
        )}
        {intro && (
          <p>
            <Spans spans={intro} />
          </p>
        )}
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
      </div>
    </section>
  );
}
