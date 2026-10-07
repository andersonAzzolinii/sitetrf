import { home } from '../content/pages/home';
import { BlockRenderer } from '../lib/BlockRenderer';

export default function Home() {
  return (
    <main>
      <BlockRenderer blocks={home.blocks} />
    </main>
  );
}
