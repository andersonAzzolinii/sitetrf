import type { Page } from '../content/types';
import { BlockRenderer } from '../lib/BlockRenderer';
import { Breadcrumbs } from '../components/chrome/Breadcrumbs';
import { Seo } from '../lib/Seo';

/** Serve as 83 paginas internas: todas sao a mesma estrutura de blocos. */
export default function StandardPage({ page }: { page: Page }) {
  return (
    <>
      <Seo page={page} />
      <Breadcrumbs items={page.breadcrumbs} />
      <main>
        <BlockRenderer blocks={page.blocks} />
      </main>
    </>
  );
}
