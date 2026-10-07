import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './styles/index.css';

/**
 * O vite-react-ssg usa estas rotas de duas formas:
 *  - `npm run dev`   -> app normal no navegador
 *  - `npm run build` -> pre-renderiza cada rota em um HTML estatico
 */
export const createRoot = ViteReactSSG({ routes });
