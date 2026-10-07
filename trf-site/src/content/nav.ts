import type { Link } from './types';

/* ---------------------------------------------------------------------------
   Navegacao. Extraido 1:1 do header/footer do original.
   O "TRF" nos nomes de plataforma vem como { pn: 'Cobot' } para o componente
   <PN> renderizar o lockup em vez de texto cru.
   --------------------------------------------------------------------------- */

export interface MegaLink extends Link {
  /** nome da plataforma: renderiza <PN platform="..."/> em vez do label */
  pn?: string;
}

export interface MegaColumn {
  title: string;
  links: MegaLink[];
}

export interface NavGroup {
  label: string;
  /** sem columns = link direto, sem mega menu */
  to: string;
  columns?: MegaColumn[];
  /** o botao verde no pe do mega menu */
  hub?: Link;
}

export const NAV: NavGroup[] = [
  {
    label: 'Robotic Palletizing',
    to: '/robotic-palletizing/',
    hub: { label: 'All Robotic Palletizing', to: '/robotic-palletizing/' },
    columns: [
      {
        title: 'Platforms',
        links: [
          { label: 'Cobot', pn: 'Cobot', to: '/robotic-palletizing/cobot-palletizer/' },
          { label: 'Compact', pn: 'Compact', to: '/robotic-palletizing/compact-palletizer/' },
          { label: 'Speed', pn: 'Speed', to: '/robotic-palletizing/high-speed-palletizer/' },
          { label: 'Subzero', pn: 'Subzero', to: '/robotic-palletizing/subzero-palletizer/' },
          { label: 'Custom Palletizer', to: '/robotic-palletizing/custom-palletizer/' },
        ],
      },
      {
        title: 'By Product',
        links: [
          { label: 'Bags', to: '/robotic-palletizing/bag-palletizer/' },
          { label: 'Boxes', to: '/robotic-palletizing/box-palletizer/' },
          { label: 'Cases', to: '/robotic-palletizing/case-palletizer/' },
          { label: 'Trays and Crates', to: '/robotic-palletizing/tray-palletizer/' },
          { label: 'Buckets and Pails', to: '/robotic-palletizing/bucket-palletizer/' },
          { label: 'Cartons', to: '/robotic-palletizing/carton-palletizer/' },
          { label: 'Bundles', to: '/robotic-palletizing/bundle-palletizer/' },
        ],
      },
    ],
  },
  {
    label: 'Case Packing',
    to: '/case-packing/',
    hub: { label: 'All Case Packing', to: '/case-packing/' },
    columns: [
      {
        title: 'Platforms',
        links: [
          { label: 'Rapidpack', pn: 'Rapidpack', to: '/case-packing/robotic-case-packer/' },
          { label: 'Onepack', pn: 'Onepack', to: '/case-packing/integrated-case-packer/' },
          { label: 'Droppack', pn: 'Droppack', to: '/case-packing/drop-packer/' },
        ],
      },
      {
        title: 'By Product',
        links: [
          { label: 'Pouches', to: '/case-packing/pouch-case-packer/' },
          { label: 'Pillow Bags', to: '/case-packing/pillow-bag-case-packer/' },
          { label: 'Flow Wrap Packs', to: '/case-packing/flow-wrap-case-packer/' },
          { label: 'Thermoformed Packages', to: '/case-packing/thermoformed-package-case-packer/' },
          { label: 'Trays', to: '/case-packing/tray-packer/' },
          { label: 'Cartons', to: '/case-packing/carton-case-packer/' },
          { label: 'Cups and Tubs', to: '/case-packing/cup-and-tub-case-packer/' },
          { label: 'Bags', to: '/case-packing/bag-case-packer/' },
        ],
      },
    ],
  },
  {
    label: 'Conveyor Systems',
    to: '/conveyor-systems/',
    hub: { label: 'All Conveyor Systems', to: '/conveyor-systems/' },
    columns: [
      {
        title: 'Platforms',
        links: [
          { label: 'Intraflow', pn: 'Intraflow', to: '/conveyor-systems/case-conveyor-intralogistics/' },
          { label: 'Cleanflow', pn: 'Cleanflow', to: '/conveyor-systems/hygienic-food-conveyor/' },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    to: '/industries/',
    hub: { label: 'All Industries', to: '/industries/' },
    columns: [
      {
        title: 'Food and Beverage',
        links: [
          { label: 'Food Processing', to: '/industries/food-processing/' },
          { label: 'Protein Processing', to: '/industries/protein-processing/' },
          { label: 'Frozen Food and Ice Cream', to: '/industries/frozen-food-and-ice-cream/' },
          { label: 'Bakery and Snacks', to: '/industries/bakery-and-snacks/' },
          { label: 'Confectionery', to: '/industries/confectionery/' },
          { label: 'Dairy and Cheese', to: '/industries/dairy-and-cheese/' },
          { label: 'Pet Food', to: '/industries/pet-food/' },
        ],
      },
      {
        title: 'Consumer and Industrial',
        links: [
          { label: 'Pharmaceutical', to: '/industries/pharmaceutical/' },
          { label: 'Personal Care and Cosmetics', to: '/industries/personal-care-and-cosmetics/' },
          { label: 'Chemicals', to: '/industries/chemicals/' },
          { label: 'Household and Cleaning', to: '/industries/household-and-cleaning-products/' },
          { label: 'Paper and Packaging', to: '/industries/paper-and-packaging/' },
          { label: 'Consumer Packaged Goods', to: '/industries/consumer-packaged-goods/' },
          { label: 'Co-Packers', to: '/industries/co-packers/' },
          { label: 'E-Commerce and Distribution', to: '/industries/e-commerce-and-distribution/' },
        ],
      },
    ],
  },
  {
    label: 'Parts & Service',
    to: '/parts-and-service/',
  },
  {
    label: 'Resources',
    to: '/resources/',
    hub: { label: 'All Resources', to: '/resources/' },
    columns: [
      {
        title: 'Resources',
        links: [
          { label: 'Blog', to: '/resources/blog/' },
          { label: 'Case Studies', to: '/resources/case-studies/' },
          { label: 'Trade Shows and Events', to: '/resources/trade-shows-and-events/' },
          { label: 'ROI Calculator', to: '/tools/palletizing-roi-calculator/' },
        ],
      },
    ],
  },
  {
    label: 'About',
    to: '/about/',
    hub: { label: 'All About', to: '/about/' },
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'About', to: '/about/' },
          { label: 'Careers', to: '/about/careers/' },
          { label: 'Compliance', to: '/about/compliance/' },
          { label: 'Contact', to: '/contact/' },
        ],
      },
    ],
  },
];

/* ---- rodape ------------------------------------------------------------- */

export interface FooterGroup {
  title: string;
  links: Link[];
  /** bloco extra abaixo, separado por uma linha (o .foot-grp do original) */
  group?: Link[];
}

export const FOOTER: FooterGroup[] = [
  {
    title: 'Solutions',
    links: [
      { label: 'Robotic Palletizing', to: '/robotic-palletizing/' },
      { label: 'Case Packing', to: '/case-packing/' },
      { label: 'Conveyor Systems', to: '/conveyor-systems/' },
      { label: 'Payback Calculator', to: '/tools/palletizing-roi-calculator/' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'All Industries', to: '/industries/' },
      { label: 'Food Processing', to: '/industries/food-processing/' },
      { label: 'Protein Processing', to: '/industries/protein-processing/' },
      { label: 'Consumer Packaged Goods', to: '/industries/consumer-packaged-goods/' },
      { label: 'Co-Packers', to: '/industries/co-packers/' },
    ],
  },
  {
    title: 'Customers',
    links: [
      { label: 'Parts & Service', to: '/parts-and-service/' },
      { label: 'Case Studies', to: '/resources/case-studies/' },
      { label: 'Resources', to: '/resources/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about/' },
      { label: 'Careers', to: '/about/careers/' },
      { label: 'Contact', to: '/contact/' },
    ],
    group: [
      { label: 'Compliance', to: '/about/compliance/' },
      { label: 'Privacy Policy', to: '/privacy-policy/' },
      { label: 'Terms of Use', to: '/terms-of-use/' },
      { label: 'Your Privacy Choices', to: '/privacy-choices/' },
    ],
  },
];

export const LEGAL_LINKS: Link[] = [
  { label: 'Privacy Policy', to: '/privacy-policy/' },
  { label: 'Terms of Use', to: '/terms-of-use/' },
  { label: 'Your Privacy Choices', to: '/privacy-choices/' },
  { label: 'Do Not Sell or Share My Personal Information', to: '/privacy-choices/' },
  { label: 'Accessibility', to: '/privacy-policy/#accessibility' },
];
