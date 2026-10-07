import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Button } from '../primitives/Button';
import { Picture } from '../primitives/Picture';
import { BrandT } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'final' }>;

/** CTA final: foto de fundo esmaecida, grid de pontos, radial e o "T" da marca. */
export function FinalCta({ eyebrow, h2, id, lead, ctas, bgImg }: Props) {
  return (
    <section className="final">
      {bgImg && <Picture sizes="100vw" {...bgImg} className="final-bg" />}
      <div className="hero-grid" aria-hidden="true" />
      <div className="final-radial" aria-hidden="true" />
      <BrandT variant="final" />

      <div className="wrap final-in rv">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={id}>
            <Spans spans={h2} />
          </h2>
          {lead && (
            <p className="final-p">
              <Spans spans={lead} />
            </p>
          )}
        </div>
        <div className="btns">
          {ctas.map((c, i) => (
            <Button key={i} variant={c.variant} to={c.to} href={c.href} arrow={c.arrow}>
              {c.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
