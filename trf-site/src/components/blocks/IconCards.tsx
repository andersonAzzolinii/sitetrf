import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { ICONS } from '../icons/icons';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'iconCards' }>;

/** 3 cards com icone, titulo e texto, borda verde de 3px no topo. */
export function IconCards({ theme, eyebrow, h2, id, cards }: Props) {
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
      </div>
    </section>
  );
}
