import type { Block } from '../../content/types';
import { Table } from './inner';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'specTable' }>;

/** Tabela como secao inteira. O miolo e o mesmo usado dentro do .prose. */
export function SpecTable({ theme, head, rows }: Props) {
  return (
    <section className={`sec ${theme}`}>
      {theme === 'dark' && <Circuit />}
      <div className="wrap prose">
        <Table head={head} rows={rows} />
      </div>
    </section>
  );
}
