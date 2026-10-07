import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Block } from '../../content/types';
import { Spans } from '../../lib/Rich';
import { Picture } from '../primitives/Picture';
import { Button } from '../primitives/Button';
import { Arrow } from '../primitives/Arrow';
import { Eyebrow } from '../primitives/Eyebrow';
import { BrandT } from '../primitives/Ornaments';

type Props = Extract<Block, { type: 'hero' }>;

export function Hero(p: Props) {
  if (p.variant === 'home') return <HeroHome {...p} />;
  return <HeroImage {...p} />;
}

/* ---- hero da home: video full-bleed + 3 cards de entrada --------------- */

function HeroHome({ kicker, sign, entries }: Props) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;

    // abaixo de 900px troca para a versao SD (5,9 MB em vez de 8,6 MB)
    if (window.innerWidth <= 900) {
      const src = v.querySelector('source');
      if (src) {
        src.src = '/assets/video/trf-home-hero-mobile.mp4';
        v.poster = '/assets/media/trf-home-hero-poster-mobile.webp';
        v.load();
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.removeAttribute('autoplay');
      v.pause();
      return;
    }
    v.play()?.catch(() => {});
  }, []);

  return (
    <section className="hero hero-home has-entries">
      <video
        ref={video}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/media/trf-home-hero-poster.webp"
        aria-hidden="true"
      >
        <source src="/assets/video/trf-home-hero.mp4" type="video/mp4" />
      </video>

      <div className="home-shade" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="wrap home-in">
        <p className="home-kicker">{kicker}</p>
      </div>

      <div className="wrap home-low">
        <p className="home-sign">
          <Spans spans={sign} />
        </p>

        {entries && (
          <div className="entries">
            {entries.map((e) => (
              <Link className="entry rv" to={e.to} key={e.to}>
                <span className="entry-card">
                  {/* o titulo vem ANTES da imagem no DOM — e assim no original */}
                  <span className="entry-b">
                    <span className="entry-t">{e.title}</span>
                    <span className="entry-go" aria-hidden="true">
                      <Arrow />
                    </span>
                  </span>
                  <span className="entry-img">
                    <Picture {...e.img} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---- hero padrao das paginas internas ---------------------------------- */

function HeroImage({ variant, eyebrow, h1, solution, lead, ctas, img }: Props) {
  return (
    <section
      className={`hero ${variant === 'compact' ? 'hero-compact ' : ''}${img ? 'has-img' : ''}`.trim()}
    >
      {img && <Picture {...img} className="hero-bg" eager />}
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      {/* o radial so existe no hero com imagem; o compacto nao tem */}
      {variant !== 'compact' && <div className="hero-radial" aria-hidden="true" />}
      <BrandT variant="hero" />

      <div className="wrap hero-in">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {h1 && (
          <h1>
            <Spans spans={h1} />
          </h1>
        )}
        {solution && (
          <p className="solution">
            <Spans spans={solution} />
          </p>
        )}
        {lead && (
          <p className="lead">
            <Spans spans={lead} />
          </p>
        )}
        {ctas && (
          <div className="btns">
            {ctas.map((c, i) => (
              <Button key={i} variant={c.variant} to={c.to} href={c.href} arrow={c.arrow}>
                {c.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
