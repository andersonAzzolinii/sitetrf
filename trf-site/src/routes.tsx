import type { RouteRecord } from 'vite-react-ssg';
import { PAGES } from './content/pages';
import Layout from './Layout';
import StandardPage from './pages/StandardPage';
import NotFound from './pages/NotFound';
import KitchenSink from './pages/KitchenSink';

/**
 * As 84 rotas, montadas a partir dos dados.
 *
 * O vite-react-ssg percorre esta lista no build e pre-renderiza cada rota em
 * um HTML proprio — e o que devolve ao site o comportamento estatico do
 * original (title, meta e conteudo ja no HTML, sem depender de JS).
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      ...PAGES.map((page) => ({
        // a home e `index`; as demais entram sem a barra inicial
        ...(page.route === '/'
          ? { index: true as const }
          : { path: page.route.replace(/^\/|\/$/g, '') }),
        element: <StandardPage page={page} />,
      })),
      { path: '_kitchen-sink', element: <KitchenSink /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
