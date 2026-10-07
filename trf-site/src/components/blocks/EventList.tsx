import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Button } from '../primitives/Button';

type Props = Extract<Block, { type: 'events' }>;

export function EventList({ eyebrow, h2, id, events }: Props) {
  return (
    <section className="sec light events">
      <div className="wrap">
        <div className="rv">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 id={id}>
            <Spans spans={h2} />
          </h2>
        </div>
        <ul className="ev-list">
          {events.map((e, i) => (
            <li className="ev rv" key={i}>
              <div className="ev-logo">
                <img src={e.logo.src} alt={e.logo.alt} loading="lazy" width={220} height={256} />
              </div>
              <div className="ev-info">
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
              <dl className="ev-facts">
                {e.facts.map((f, j) => (
                  <div key={j}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Button variant={e.cta.variant} to={e.cta.to} href={e.cta.href} arrow={e.cta.arrow}>
                {e.cta.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
