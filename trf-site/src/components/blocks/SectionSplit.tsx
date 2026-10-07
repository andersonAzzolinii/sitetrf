import type { Block } from '../../content/types';
import { Spans, RichBody } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Picture } from '../primitives/Picture';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'split' }>;

const IMG_CLASS: Record<string, string> = {
  cover: '',
  'contain-white': 'fp',
  'contain-dark': 'on-dark',
  inline: 'inl',
};

/** Texto + imagem lado a lado (1.05fr .95fr), com a cantoneira verde em L. */
export function SectionSplit({ theme, sticky, imgMode = 'cover', eyebrow, h2, id, body, img, tail }: Props) {
  const mod = IMG_CLASS[imgMode] ?? '';
  return (
    <section className={`sec ${theme} split${sticky ? ' auto' : ''}${mod === 'inl' ? ' inl' : ''}`}>
      {theme === 'dark' && <Circuit />}
      <div className="wrap split-in">
        <div className="prose rv">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {h2 && (
            <h2 id={id}>
              <Spans spans={h2} />
            </h2>
          )}
          <RichBody body={body} />
        </div>
        {/* a variante .inl envolve a imagem num .split-col proprio */}
        {mod === 'inl' ? (
          <div className="split-col">
            <div className="split-img rv">
              <Picture sizes="(max-width: 1100px) 100vw, 620px" {...img} />
            </div>
          </div>
        ) : (
          <div className={['split-img', mod, 'rv'].filter(Boolean).join(' ')}>
            <Picture sizes="(max-width: 1100px) 100vw, 620px" {...img} />
          </div>
        )}
      </div>
      {tail && (
        <div className="wrap prose tbl-tail">
          <RichBody body={tail} />
        </div>
      )}
    </section>
  );
}
