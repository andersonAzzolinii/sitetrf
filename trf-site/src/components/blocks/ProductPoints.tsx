import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { ICONS } from '../icons/icons';

type Props = Extract<Block, { type: 'productPoints' }>;

/** Variante horizontal da faixa: 4 itens, icone 30px a esquerda, divisorias. */
export function ProductPoints({ items }: Props) {
  return (
    <section className="pp">
      <div className="wrap pp-row">
        {items.map((it, i) => (
          <div className="pp-i rv" key={i}>
            <span className="ico">{ICONS[it.icon]}</span>
            <div>
              <p className="pp-h">
                <Spans spans={it.title} />
              </p>
              <p className="pp-p">
                <Spans spans={it.text} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
