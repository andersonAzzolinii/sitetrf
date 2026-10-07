import { Link } from 'react-router-dom';
import type { Crumb } from '../../content/types';
import { Spans } from '../../lib/Rich';

export function Breadcrumbs({ items }: { items?: Crumb[] }) {
  if (!items?.length) return null;
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          const inner = c.spans ? <Spans spans={c.spans} /> : c.label;
          return (
            <li key={c.label + i}>
              {last || !c.to ? <span aria-current="page">{inner}</span> : <Link to={c.to}>{inner}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
