import type { Span } from '../../content/types';
import { Spans } from '../../lib/Rich';

/** Kicker com o traco verde de 22x2px (vem do ::before no CSS). */
export function Eyebrow({ children }: { children?: string | Span[] | React.ReactNode }) {
  if (children == null) return null;
  return (
    <p className="eyebrow">
      {Array.isArray(children) ? <Spans spans={children as Span[]} /> : children}
    </p>
  );
}
