import { Link } from 'react-router-dom';
import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Arrow } from '../primitives/Arrow';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'tiles' }>;

/** Blocos de link que invertem para verde no hover. */
export function TileLinks({ theme, eyebrow, h2, id, intro, links }: Props) {
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
      </div>
    </section>
  );
}
