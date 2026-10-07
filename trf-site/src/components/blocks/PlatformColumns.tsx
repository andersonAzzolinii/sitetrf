import { Link } from 'react-router-dom';
import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Picture } from '../primitives/Picture';
import { Button } from '../primitives/Button';
import { Arrow } from '../primitives/Arrow';
import { PN } from '../primitives/PN';

type Props = Extract<Block, { type: 'platformColumns' }>;

/** As 9 plataformas em 3 colunas por familia. */
export function PlatformColumns({ eyebrow, h2, id, intro, columns, cta }: Props) {
  return (
    <section className="sec plats">
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {h2 && (
              <h2 id={id}>
                <Spans spans={h2} />
              </h2>
            )}
          </div>
          {intro && (
            <p>
              <Spans spans={intro} />
            </p>
          )}
        </div>

        <div className="plat-cols">
          {columns.map((col) => (
            <div className="plat-col" key={col.family}>
              <h3 className="plat-h">
                <Link to={col.to}>
                  {col.family}
                  <span className="plat-n-ct">{col.count}</span>
                </Link>
              </h3>
              <ul className="plat-grid">
                {col.cards.map((c) => (
                  <li className="rv" key={c.to}>
                    <Link className="plat" to={c.to}>
                      <span className="plat-img">
                        <Picture sizes="140px" {...c.img} />
                      </span>
                      <span className="plat-b">
                        <span className="plat-k">{c.kicker}</span>
                        <span className="plat-n">
                          <PN platform={c.platform} />
                        </span>
                        <span className="plat-p">
                          <Spans spans={c.text} />
                        </span>
                        <span className="plat-go">
                          See <PN platform={c.platform} />
                          <Arrow />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {cta && (
          <div className="btns plat-cta">
            <Button variant={cta.variant} to={cta.to} href={cta.href} arrow={cta.arrow}>
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
