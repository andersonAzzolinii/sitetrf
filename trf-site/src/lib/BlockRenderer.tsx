import type { Block } from '../content/types';
import { Hero } from '../components/blocks/Hero';
import { HomeTitle } from '../components/blocks/HomeTitle';
import { BenefitStrip } from '../components/blocks/BenefitStrip';
import { ProductPoints } from '../components/blocks/ProductPoints';
import { CardGrid } from '../components/blocks/CardGrid';
import { PlatformColumns } from '../components/blocks/PlatformColumns';
import { LogoWall } from '../components/blocks/LogoWall';
import { Journey } from '../components/blocks/Journey';
import { SectionSplit } from '../components/blocks/SectionSplit';
import { IndustryGrid } from '../components/blocks/IndustryGrid';
import { ParentBlock } from '../components/blocks/ParentBlock';
import { EventList } from '../components/blocks/EventList';
import { FollowBlock } from '../components/blocks/FollowBlock';
import { SectionProse } from '../components/blocks/SectionProse';
import { FaqGrid } from '../components/blocks/FaqGrid';
import { FinalCta } from '../components/blocks/FinalCta';
import { TileLinks } from '../components/blocks/TileLinks';
import { IconCards } from '../components/blocks/IconCards';
import { SpecTiles } from '../components/blocks/SpecTiles';
import { SpecTable } from '../components/blocks/SpecTable';
import { Gallery } from '../components/blocks/Gallery';
import { NumberStrip } from '../components/blocks/NumberStrip';
import { ProcessGrid } from '../components/blocks/ProcessGrid';
import { ShowBanner } from '../components/blocks/ShowBanner';
import { RoiBlock } from '../components/blocks/RoiBlock';


/* eslint-disable @typescript-eslint/no-explicit-any */
const MAP: Record<string, React.FC<any>> = {
  hero: Hero,
  homeTitle: HomeTitle,
  benefits: BenefitStrip,
  productPoints: ProductPoints,
  cardGrid: CardGrid,
  platformColumns: PlatformColumns,
  logoWall: LogoWall,
  journey: Journey,
  split: SectionSplit,
  industryGrid: IndustryGrid,
  parent: ParentBlock,
  events: EventList,
  follow: FollowBlock,
  prose: SectionProse,
  faq: FaqGrid,
  final: FinalCta,
  tiles: TileLinks,
  iconCards: IconCards,
  specTiles: SpecTiles,
  specTable: SpecTable,
  gallery: Gallery,
  numberStrip: NumberStrip,
  process: ProcessGrid,
  showBanner: ShowBanner,
  roi: RoiBlock,
};

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        const C = MAP[b.type];
        if (!C) {
          if (import.meta.env.DEV) console.warn('[BlockRenderer] bloco sem componente:', b.type);
          return null;
        }
        return <C key={i} {...(b as any)} />;
      })}
    </>
  );
}
