import type { Block } from '../../content/types';
import { Picture } from '../primitives/Picture';
import { Circuit } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'gallery' }>;

export function Gallery({ theme, images }: Props) {
  return (
    <section className={`sec ${theme}`}>
      {theme === 'dark' && <Circuit />}
      <div className="wrap prose">
        <div className="gal">
          {images.map((img, i) => (
            <figure className="gal-i" key={i}>
              <Picture sizes="(max-width: 700px) 50vw, 400px" {...img} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
