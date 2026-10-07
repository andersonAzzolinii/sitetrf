import type { Block } from '../../content/types';
import { RoiCalculator } from './RoiCalculator';
import { ContactForm } from './ContactForm';
import { CatalogForm } from './CatalogForm';
import { PrivacyChoices } from './PrivacyChoices';
import { OmbudsmanForm } from './OmbudsmanForm';

type Props = Extract<Block, { type: 'roi' }>;

/** Despacha as 4 variantes do bloco interativo. */
export function RoiBlock({ variant, product, eyebrow, h2, id, intro }: Props) {
  switch (variant) {
    case 'contact':
      return <ContactForm />;
    case 'catalog':
      return <CatalogForm product={product} eyebrow={eyebrow} h2={h2} id={id} intro={intro} />;
    case 'ombudsman':
      return <OmbudsmanForm eyebrow={eyebrow} h2={h2} id={id} intro={intro} />;
    case 'optOut':
      return <PrivacyChoices eyebrow={eyebrow} h2={h2} id={id} intro={intro} />;
    default:
      return (
        <RoiCalculator product={product} eyebrow={eyebrow} h2={h2} id={id} intro={intro} />
      );
  }
}
