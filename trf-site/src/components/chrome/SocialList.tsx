import type { Social } from '../../content/types';
import { ICONS } from '../icons/icons';

const ICON_OF: Record<Social['network'], string> = {
  linkedin: 'trf-on-linkedin',
  youtube: 'trf-on-youtube',
  facebook: 'trf-on-facebook',
  instagram: 'trf-on-facebook-2',
};

/**
 * Lista de redes. `variant="big"` e a versao da home: grid 2 colunas,
 * 64px de altura, com o nome da rede ao lado do icone.
 */
export function SocialList({ socials, variant }: { socials: Social[]; variant?: 'big' }) {
  return (
    <ul className={variant === 'big' ? 'social big' : 'social'}>
      {socials.map((s) => (
        <li key={s.network}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
            {ICONS[ICON_OF[s.network]]}
            {variant === 'big' && <span>{s.network}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
