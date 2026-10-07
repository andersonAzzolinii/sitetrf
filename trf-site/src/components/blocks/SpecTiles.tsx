import type { Block } from '../../content/types';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'specTiles' }>;

/** Tiles de especificacao com a barra verde de 4px a esquerda. */
export function SpecTiles({ theme, items }: Props) {
  return (
    <section className={`sec ${theme}`}>
      {theme === 'dark' && <Circuit />}
      <div className="wrap prose">
        <div className="spec-tiles">
          {items.map((it, i) => (
            <div className="st rv" key={i}>
              <p className="st-v">{it.value}</p>
              <p className="st-l">{it.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
