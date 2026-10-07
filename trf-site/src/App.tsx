import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SiteHeader } from './components/chrome/SiteHeader';
import { SiteFooter } from './components/chrome/SiteFooter';
import { useReveal } from './lib/hooks';
import { PAGES } from './content/pages';
import { home } from './content/pages/home';
import { Seo } from './lib/Seo';
import { BlockRenderer } from './lib/BlockRenderer';
import StandardPage from './pages/StandardPage';
import NotFound from './pages/NotFound';
import KitchenSink from './pages/KitchenSink';

function Home() {
  return (
    <>
      <Seo page={home} />
      <main>
        <BlockRenderer blocks={home.blocks} />
      </main>
    </>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  useReveal([pathname]);

  /* volta ao topo ao trocar de rota, como numa navegacao normal */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {PAGES.filter((p) => p.route !== '/').map((p) => (
          <Route key={p.route} path={p.route} element={<StandardPage page={p} />} />
        ))}
        <Route path="/_kitchen-sink" element={<KitchenSink />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
