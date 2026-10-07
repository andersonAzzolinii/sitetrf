import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { ICONS } from '../icons/icons';

type Props = Extract<Block, { type: 'benefits' }>;

/** A faixa de 5 caixas chanfradas com icone de 56px. */
export function BenefitStrip({ label, items }: Props) {
  return (
    <section className="benefits" aria-label={label}>
      <div className="wrap ben-row">
        {items.map((it, i) => (
          <div className="ben rv" key={i}>
            <span className="ico">{ICONS[it.icon]}</span>
            <div>
              <p className="ben-h">
                <Spans spans={it.title} />
              </p>
              <p className="ben-p">
                <Spans spans={it.text} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
