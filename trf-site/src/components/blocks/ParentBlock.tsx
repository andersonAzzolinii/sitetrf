import type { Block } from '../../content/types';
import { Spans, RichBody } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Button } from '../primitives/Button';
import { GoLink } from '../primitives/GoLink';
import { BrandT } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'parent' }>;

/** TRF + Torfresma: duas colunas, 3 fatos chanfrados, com o "T" da marca atras. */
export function ParentBlock({ eyebrow, h2, id, cta, body, facts, outLink }: Props) {
  return (
    <section className="sec parent">
      <div className="wrap parent-in">
        <BrandT variant="parent" />

        <div className="rv">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={id}>
            <Spans spans={h2} />
          </h2>
          {/* sem wrapper .btns: no original o botao fica solto no bloco */}
          {cta && (
            <Button variant={cta.variant} to={cta.to} href={cta.href} arrow={cta.arrow}>
              {cta.label}
            </Button>
          )}
        </div>

        <div className="rv parent-txt">
          <RichBody body={body} />
          <ul className="parent-facts">
            {facts.map((f, i) => (
              <li key={i}>
                <b>{f.title}</b>
                <Spans spans={f.text} />
              </li>
            ))}
          </ul>
          {outLink && (
            <p className="go-row">
              <GoLink to={outLink.to} href={outLink.href}>
                {outLink.label}
              </GoLink>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
