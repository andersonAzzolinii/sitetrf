import type { Img } from '../../content/types';

/**
 * Imagem com srcset 960/1920, como no original.
 *
 * Passe `base` sem sufixo nem extensao ("trf-home-hub-palletizing") e o
 * componente monta as duas larguras. `width`/`height` vao explicitos para
 * reservar o espaco e evitar CLS — o original faz isso em toda imagem.
 */
export function Picture({
  base,
  alt,
  sizes,
  width,
  height,
  className,
  eager = false,
  single = false,
  ext = 'webp',
}: Img & { className?: string }) {
  const src = single ? `/assets/media/${base}.${ext}` : `/assets/media/${base}-1920.${ext}`;
  const srcSet = single
    ? undefined
    : `/assets/media/${base}-960.${ext} 960w, /assets/media/${base}-1920.${ext} 1920w`;
  /* O `sizes` decide QUAL arquivo o browser baixa. O valor extraido da pagina
     original tem prioridade; o default so vale quando nao houve um. */
  const sizesAttr = sizes ?? '(max-width: 900px) 100vw, 900px';

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={single ? undefined : sizesAttr}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...(eager ? { fetchPriority: 'high' as const } : {})}
    />
  );
}
