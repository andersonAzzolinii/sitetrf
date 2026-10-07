import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Button } from '../primitives/Button';

type Props = Extract<Block, { type: 'showBanner' }>;

/** Faixa verde solida com CTA preto. */
export function ShowBanner({ eyebrow, title, cta }: Props) {
  return (
    <section className="sec show">
      <div className="wrap show-in">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <p className="show-t">
            <Spans spans={title} />
          </p>
        </div>
        <Button variant={cta.variant ?? 'pri'} to={cta.to} href={cta.href} arrow={cta.arrow}>
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
