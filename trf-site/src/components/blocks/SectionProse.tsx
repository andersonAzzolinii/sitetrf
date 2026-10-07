import type { Block } from '../../content/types';
import { Spans, RichBody } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'prose' }>;

/** O bloco mais usado do site: titulo + texto corrido numa secao clara ou escura. */
export function SectionProse({ theme, eyebrow, h2, id, intro, body }: Props) {
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
        {intro && (
          <p>
            <Spans spans={intro} />
          </p>
        )}
        <RichBody body={body} />
      </div>
    </section>
  );
}
