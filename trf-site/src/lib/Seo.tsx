import { useEffect } from 'react';
import type { Page } from '../content/types';

const ORIGIN = import.meta.env.VITE_SITE_ORIGIN ?? 'https://example.com';

/**
 * Title, description, canonical, Open Graph e JSON-LD por pagina.
 *
 * Em dev isto roda no cliente; no build o vite-react-ssg pre-renderiza e as
 * tags saem ja no HTML estatico.
 */
export function Seo({ page }: { page: Page }) {
  useEffect(() => {
    document.title = page.title;

    const meta = (sel: string, attr: string, key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(sel);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = value;
    };

    meta('meta[name="description"]', 'name', 'description', page.description);
    meta('meta[property="og:title"]', 'property', 'og:title', page.title);
    meta('meta[property="og:description"]', 'property', 'og:description', page.description);
    meta('meta[property="og:type"]', 'property', 'og:type', 'website');
    meta('meta[property="og:url"]', 'property', 'og:url', ORIGIN + page.route);
    if (page.ogImage) {
      meta('meta[property="og:image"]', 'property', 'og:image', ORIGIN + page.ogImage);
      meta('meta[name="twitter:image"]', 'name', 'twitter:image', ORIGIN + page.ogImage);
    }
    meta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = ORIGIN + page.route;
  }, [page]);

  return null;
}
