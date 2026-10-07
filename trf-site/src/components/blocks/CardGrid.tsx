import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Cards } from './inner';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'cardGrid' }>;

/** Grade de cards como secao inteira. O miolo e o mesmo usado dentro do .prose. */
export function CardGrid({ theme, cols, eyebrow, h2, id, intro, cards }: Props) {
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
        <Cards cols={cols} cards={cards} />
      </div>
    </section>
  );
}
