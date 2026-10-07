import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from './components/chrome/SiteHeader';
import { SiteFooter } from './components/chrome/SiteFooter';
import { useReveal } from './lib/hooks';

/** Chrome comum a todas as rotas. */
export default function Layout() {
  const { pathname } = useLocation();
  useReveal([pathname]);

  /* volta ao topo ao trocar de rota, como numa navegacao normal */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}
