import { Link } from 'react-router-dom';
import { Arrow } from './Arrow';

/** Link-CTA de texto com borda inferior verde (a.go no original). */
export function GoLink({ to, href, children }: { to?: string; href?: string; children: React.ReactNode }) {
  const inner = (
    <>
      {children}
      <Arrow />
    </>
  );
  if (to) {
    return (
      <Link className="go" to={to}>
        {inner}
      </Link>
    );
  }
  return (
    <a className="go" href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
}
