import type { Block } from '../../content/types';
import { SOCIALS } from '../../content/site';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { SocialList } from '../chrome/SocialList';

type Props = Extract<Block, { type: 'follow' }>;

export function FollowBlock({ eyebrow, h2, id, lead, socials }: Props) {
  const list = socials?.length ? socials : SOCIALS;
  return (
    <section className="sec dark follow">
      <div className="wrap follow-in rv">
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 id={id}>
            <Spans spans={h2} />
          </h2>
          <p>
            <Spans spans={lead} />
          </p>
        </div>
        <SocialList socials={list} variant="big" />
      </div>
    </section>
  );
}
