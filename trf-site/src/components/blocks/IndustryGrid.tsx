import { Link } from 'react-router-dom';
import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Picture } from '../primitives/Picture';
import { Arrow } from '../primitives/Arrow';
import { ICONS } from '../icons/icons';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'industryGrid' }>;

/** Cards de industria: foto 16/9 com o icone sobreposto subindo 40px. */
export function IndustryGrid({ theme, eyebrow, h2, id, intro, items }: Props) {
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
      </div>
    </section>
  );
}
