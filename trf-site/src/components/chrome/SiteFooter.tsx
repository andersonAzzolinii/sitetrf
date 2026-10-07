import { Link } from 'react-router-dom';
import { FOOTER, LEGAL_LINKS } from '../../content/nav';
import { SITE, SOCIALS, NEXT_EVENT } from '../../content/site';
import { PN } from '../primitives/PN';
import { SocialList } from './SocialList';
import { ICONS } from '../icons/icons';

export function SiteFooter() {
  return (
    <footer className="site">
      <div className="foot">
        <div>
          <img className="foot-logo" src={SITE.logo} alt={SITE.logoAlt} width={870} height={158} />
          <p className="tag">{SITE.tagline}</p>
          <Link className="foot-event" to={NEXT_EVENT.to}>
            {NEXT_EVENT.label}
          </Link>
          <p>
            {SITE.address}
            <br />
            <a href={SITE.phoneHref} style={{ display: 'inline' }}>
              {SITE.phone}
            </a>
            <br />
            {SITE.serving}
          </p>
          <SocialList socials={SOCIALS} />
        </div>

        {FOOTER.map((g) => (
          <div key={g.title}>
            <p className="h">{g.title}</p>
            {g.links.map((l) => (
              <Link key={l.label + l.to} to={l.to!}>
                {l.label}
              </Link>
            ))}
            {g.group && (
              <div className="foot-grp">
                {g.group.map((l) => (
                  <Link key={l.label + l.to} to={l.to!}>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="legal">
        <span>
          &copy; {SITE.year} <PN /> {SITE.copyright}
        </span>

        <span className="legal-links">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.label} to={l.to!}>
              {l.label}
              {l.label === 'Your Privacy Choices' && (
                <span className="pc-icon">{ICONS['privacy-choices']}</span>
              )}
            </Link>
          ))}
        </span>

        {SITE.developedBy && (
          <span>
            <span className="dev">
              Developed by{' '}
              <a href={SITE.developedBy.href} target="_blank" rel="noopener noreferrer">
                {SITE.developedBy.label}
              </a>
            </span>
          </span>
        )}
      </div>
    </footer>
  );
}
