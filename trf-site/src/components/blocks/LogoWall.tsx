import type { Block, Logo } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';

type Props = Extract<Block, { type: 'logoWall' }>;

export function LogoWall({ eyebrow, h2, id, intro, seals, certsLabel, certs }: Props) {
  return (
    <section className="sec light partners">
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
      </div>
    </section>
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
