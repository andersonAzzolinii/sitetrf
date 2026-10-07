import { cloneElement } from 'react';
import { ICONS } from '../icons/icons';

/**
 * Ornamentos de fundo. No original toda `sec dark` carrega o `.circuit`
 * (trilhas de PCB verdes no canto superior direito), e o hero carrega o "T"
 * da marca. Sao decorativos: aria-hidden e pointer-events:none pelo CSS.
 */
export function Circuit() {
  return <span className="circuit" aria-hidden="true" />;
}

/**
 * O "T" da marca, em contorno verde, sangrando para fora da secao.
 *
 * A classe vai no PROPRIO <svg>, como no original. Com um <span> em volta o
 * wrapper nao herda a proporcao do viewBox e fica quase o dobro da altura.
 */
export function BrandT({ variant }: { variant: 'hero' | 'final' | 'parent' }) {
  const svg = ICONS['brand-t'];
  if (!svg) return null;
  return cloneElement(svg, {
    className: `${variant}-t`,
    'aria-hidden': 'true',
    focusable: 'false',
  } as Partial<typeof svg.props>);
}
