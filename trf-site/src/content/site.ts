import type { Social } from './types';

/* ---------------------------------------------------------------------------
   Dados globais: marca, NAP, redes, evento atual.
   --------------------------------------------------------------------------- */

export const SITE = {
  name: 'TRF Industrial Automation',
  tagline: 'Keep your production running.',
  logo: '/assets/trf-logo-header.svg',
  logoAlt: 'TRF Industrial Automation',

  /* NAP — name, address, phone */
  address: '14840 W 107th St, Lenexa, KS 66215, United States',
  phone: '(913) 242-8019',
  phoneHref: 'tel:+19132428019',
  serving: 'Serving the United States',

  copyright: 'Industrial Automation. All rights reserved. All trademarks are the property of their respective owners.',
  year: 2026,

  /* Credito da agencia. No original: "Developed by Atlantic Digital".
     Deixado vazio — preencha com o seu ou mantenha vazio para nao exibir. */
  developedBy: null as { label: string; href: string } | null,
} as const;

export const SOCIALS: Social[] = [
  {
    network: 'linkedin',
    href: 'https://www.linkedin.com/company/torfresma-usa',
    label: 'TRF on LinkedIn',
  },
  { network: 'youtube', href: 'https://www.youtube.com/@torfresmausa', label: 'TRF on YouTube' },
  { network: 'facebook', href: 'https://www.facebook.com/torfresma/', label: 'TRF on Facebook' },
  { network: 'instagram', href: 'https://www.instagram.com/torfresma/', label: 'TRF on Instagram' },
];

/** O evento em destaque no rodape e na home. */
export const NEXT_EVENT = {
  label: 'Next event: PACK EXPO International',
  to: '/resources/trade-shows-and-events/pack-expo-international-2026/',
  name: 'PACK EXPO International 2026',
  date: 'October 18 to 21, 2026',
  location: 'McCormick Place, Chicago, IL',
  booth: 'N-5660',
};
