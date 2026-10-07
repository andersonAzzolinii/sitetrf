import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV, type NavGroup } from '../../content/nav';
import { SITE } from '../../content/site';
import { PN } from '../primitives/PN';
import { useScrolled } from '../../lib/hooks';

/**
 * Header sticky com mega menu.
 *
 * Mantem <details>/<summary> como o original: acessivel por teclado de graca,
 * funciona sem JS, e no mobile basta CSS (position:static + barra verde).
 * O JS so faz o que o inline-06.js fazia: fechar os outros ao abrir um, e
 * fechar tudo no clique fora.
 */
export function SiteHeader() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  /* fecha o mega e o menu mobile ao trocar de rota */
  useEffect(() => {
    setOpen(false);
    navRef.current?.querySelectorAll('details[open]').forEach((d) => {
      (d as HTMLDetailsElement).open = false;
    });
  }, [pathname]);

  /* clique fora fecha todos os <details> abertos */
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest?.('nav.main')) {
        navRef.current?.querySelectorAll('details[open]').forEach((d) => {
          (d as HTMLDetailsElement).open = false;
        });
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  /* Esc fecha o mega aberto */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      navRef.current?.querySelectorAll('details[open]').forEach((d) => {
        (d as HTMLDetailsElement).open = false;
      });
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* abrir um fecha os outros */
  const onToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const d = e.currentTarget;
    if (!d.open) return;
    navRef.current?.querySelectorAll('details').forEach((o) => {
      if (o !== d) (o as HTMLDetailsElement).open = false;
    });
  };

  const cls = ['site', scrolled && 'scrolled', open && 'open'].filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <div className="bar">
        <Link className="logo" to="/">
          <img src={SITE.logo} alt={SITE.logoAlt} width={870} height={158} />
        </Link>

        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav className="main" id="main-nav" ref={navRef} aria-label="Main">
          {NAV.map((g) => (
            <NavItem key={g.label} group={g} pathname={pathname} onToggle={onToggle} />
          ))}
        </nav>

        <Link className="hdr-cta" to="/contact/">
          Talk with our Sales Engineer
        </Link>
      </div>
    </header>
  );
}

function NavItem({
  group,
  pathname,
  onToggle,
}: {
  group: NavGroup;
  pathname: string;
  onToggle: (e: React.SyntheticEvent<HTMLDetailsElement>) => void;
}) {
  if (!group.columns) {
    return (
      <Link
        className="navlink"
        to={group.to}
        {...(pathname === group.to ? { 'aria-current': 'page' as const } : {})}
      >
        {group.label}
      </Link>
    );
  }

  return (
    <details onToggle={onToggle}>
      <summary>{group.label}</summary>
      <div className="mega">
        {group.columns.map((col, i) => (
          <div className="col" key={col.title}>
            <p className="h">{col.title}</p>
            {col.links.map((l) => (
              <Link key={l.to} to={l.to!}>
                {l.pn ? <PN platform={l.pn} /> : l.label}
              </Link>
            ))}
            {/* o botao verde fica na ultima coluna, como no original */}
            {group.hub && i === group.columns!.length - 1 && (
              <Link className="hub" to={group.hub.to!}>
                {group.hub.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </details>
  );
}
