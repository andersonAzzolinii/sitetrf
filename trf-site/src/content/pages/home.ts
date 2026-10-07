import type { Page } from '../types';

/* ---------------------------------------------------------------------------
   A home. E a unica pagina com layout proprio: 12 blocos, varios exclusivos
   dela. As outras 83 saem do arquetipo padrao.
   Textos 1:1 do original.
   --------------------------------------------------------------------------- */

export const home: Page = {
  route: '/',
  title: 'TRF Industrial Automation | End-of-Line Automation',
  description:
    'TRF Industrial Automation designs, installs and supports robotic palletizing, case packing and conveyors in the United States. Talk to a Sales Engineer.',
  ogImage: '/assets/og/home.jpg',

  blocks: [
    /* ---- 1. hero com video ------------------------------------------- */
    {
      type: 'hero',
      variant: 'home',
      kicker: 'Your End-of-Line Automation Partner',
      sign: [
        { k: 'pn' },
        ' Industrial Automation is Torfresma in the United States, the name the group uses in this market. ',
        { k: 'pn' },
        ' designs, installs and supports ',
        { k: 'nb', t: 'robotic palletizing' },
        ', case packing and conveyor systems for food, CPG and other production lines across the United States.',
      ],
      entries: [
        {
          title: 'Robotic Palletizing',
          to: '/robotic-palletizing/',
          img: {
            base: 'trf-home-hub-palletizing',
            alt: 'Robotic palletizing cell stacking cases onto a pallet.',
            width: 800,
            height: 800,
            eager: true,
          },
        },
        {
          title: 'Case Packing',
          to: '/case-packing/',
          img: {
            base: 'trf-home-hub-case-packing',
            alt: 'Case packing machine loading products into shipping cases.',
            width: 800,
            height: 800,
            eager: true,
          },
        },
        {
          title: 'Conveyor Systems',
          to: '/conveyor-systems/',
          img: {
            base: 'trf-home-hub-conveyor-systems',
            alt: 'Conveyor system moving cases between packaging and palletizing.',
            width: 800,
            height: 800,
            eager: true,
          },
        },
      ],
    },

    /* ---- 2. H1 + numeros --------------------------------------------- */
    {
      type: 'homeTitle',
      h1: ['End-of-line automation engineered to keep ', { k: 'lime', t: 'your production running.' }],
      nums: [
        { countTo: 30, value: '30', suffix: '+', label: 'years of Torfresma engineering experience' },
        { countTo: 350, value: '350', suffix: '+', label: 'companies served by the Torfresma group' },
        {
          countTo: 2000,
          value: '2,000',
          suffix: '+',
          label: 'industrial lines designed and installed by the group',
        },
        { value: 'Global', label: 'presence' },
      ],
    },

    /* ---- 3. faixa de beneficios --------------------------------------- */
    {
      type: 'benefits',
      label: 'Why TRF',
      items: [
        {
          icon: 'custom-engineering',
          title: ['Custom engineering'],
          text: ['Solutions designed around your line.'],
        },
        {
          icon: 'custom-engineering-2',
          title: ['Turnkey integration'],
          text: ['From concept to full production.'],
        },
        {
          icon: 'turnkey-integration',
          title: ['High reliability'],
          text: ['Built for continuous operation.'],
        },
        {
          icon: 'high-reliability',
          title: ['U.S. market focus'],
          text: ['Support across the United States.'],
        },
        {
          icon: 'u-s-market-focus',
          title: ['Lifecycle support'],
          text: ['Backed by ', { k: 'pn', platform: 'Care' }, '.'],
        },
      ],
    },

    /* ---- 4. case studies ---------------------------------------------- */
    {
      type: 'cardGrid',
      theme: 'light',
      cols: 3,
      h2: ['See what ', { k: 'pn' }, ' built for manufacturers like you'],
      intro: [
        'Three ',
        { k: 'pn' },
        ' installations, at Custom Foods, Lodge Cast Iron and Avon. Open the one closest to your line to see the application and the equipment installed.',
      ],
      cards: [
        {
          title: ['Custom Foods'],
          text: ['Robotic palletizing in a below-freezing environment in De Soto, Kansas.'],
          to: '/resources/case-studies/custom-foods/',
          logo: { src: '/assets/logos/client-custom-foods.png', alt: 'Custom Foods logo' },
          img: {
            base: 'case-custom-foods-line',
            alt: 'Robotic palletizing cell working in a cold production environment.',
            width: 800,
            height: 600,
          },
        },
        {
          title: ['Lodge Cast Iron'],
          text: ['Ergonomic case packing and robotic palletizing delivered in a single project.'],
          to: '/resources/case-studies/lodge-cast-iron/',
          logo: { src: '/assets/logos/client-lodge-cast-iron.svg', alt: 'Lodge Cast Iron logo' },
          img: {
            base: 'case-lodge-robot-line',
            alt: 'Case packing station and robotic palletizer in one project.',
            width: 800,
            height: 600,
          },
        },
        {
          title: ['Avon'],
          text: ['One material flow from conveying through case handling to vertical transport.'],
          to: '/resources/case-studies/avon/',
          logo: { src: '/assets/logos/client-avon.svg', alt: 'Avon logo' },
          img: {
            base: 'case-avon-success',
            alt: 'Conveying and case handling feeding vertical transport.',
            width: 800,
            height: 600,
          },
        },
      ],
    },

    /* ---- 5. as 9 plataformas ------------------------------------------ */
    {
      type: 'platformColumns',
      eyebrow: [{ k: 'pn' }, ' platforms'],
      h2: ['Find the right platform for your end of line'],
      intro: [
        'Nine engineered platforms cover robotic palletizing, case packing and conveying. Start from your line speed, your load and your floor space, and a ',
        { k: 'pn' },
        ' Sales Engineer confirms the fit with your application data.',
      ],
      cta: { label: 'Talk with our Sales Engineer', to: '/contact/', variant: 'pri', arrow: true },
      columns: [
        {
          family: 'Robotic Palletizing',
          to: '/robotic-palletizing/',
          count: '4 platforms',
          cards: [
            {
              kicker: 'Collaborative palletizing',
              platform: 'Cobot',
              text: ['About 1 to 10 cases per minute, loads up to about 22 lb.'],
              to: '/robotic-palletizing/cobot-palletizer/',
              img: { base: 'trf-w-cobot', alt: '', width: 400, height: 400 },
            },
            {
              kicker: 'Compact robotic palletizing',
              platform: 'Compact',
              text: ['About 5 to 15 cases per minute, loads up to about 44 lb.'],
              to: '/robotic-palletizing/compact-palletizer/',
              img: { base: 'trf-w-compact', alt: '', width: 400, height: 400 },
            },
            {
              kicker: 'High-speed palletizing',
              platform: 'Speed',
              text: ['About 10 to 35 cases per minute, loads up to about 66 lb.'],
              to: '/robotic-palletizing/high-speed-palletizer/',
              img: { base: 'trf-w-speed', alt: '', width: 400, height: 400 },
            },
            {
              kicker: 'Palletizing below freezing',
              platform: 'Subzero',
              text: ['Built for freezers and cold rooms.'],
              to: '/robotic-palletizing/subzero-palletizer/',
              img: { base: 'trf-w-subzero', alt: '', width: 400, height: 400 },
            },
          ],
        },
        {
          family: 'Case Packing',
          to: '/case-packing/',
          count: '3 platforms',
          cards: [
            {
              kicker: 'Robotic case packing',
              platform: 'Rapidpack',
              text: ['High-mix lines and delicate or irregular products.'],
              to: '/case-packing/robotic-case-packer/',
              img: { base: 'trf-w-rapidpack', alt: '', width: 400, height: 400 },
            },
            {
              kicker: 'Integrated case packing',
              platform: 'Onepack',
              text: ['Erects, packs and seals the case in one machine.'],
              to: '/case-packing/integrated-case-packer/',
              img: { base: 'trf-w-onepack', alt: '', width: 400, height: 400 },
            },
            {
              kicker: 'Drop packing',
              platform: 'Droppack',
              text: ['Controlled gravity loading for repetitive flexible packages.'],
              to: '/case-packing/drop-packer/',
              img: { base: 'trf-w-droppack', alt: '', width: 400, height: 400 },
            },
          ],
        },
        {
          family: 'Conveyor Systems',
          to: '/conveyor-systems/',
          count: '2 platforms',
          cards: [
            {
              kicker: 'Case conveying and intralogistics',
              platform: 'Intraflow',
              text: ['Moves, accumulates and routes cases to the pallet.'],
              to: '/conveyor-systems/case-conveyor-intralogistics/',
              img: { base: 'trf-w-intraflow', alt: '', width: 400, height: 400 },
            },
            {
              kicker: 'Hygienic food conveying',
              platform: 'Cleanflow',
              text: ['Sanitary conveying for exposed food.'],
              to: '/conveyor-systems/hygienic-food-conveyor/',
              img: { base: 'trf-w-cleanflow', alt: '', width: 400, height: 400 },
            },
          ],
        },
      ],
    },

    /* ---- 6. parceiros e certificacoes ---------------------------------- */
    {
      type: 'logoWall',
      h2: ['Technology partners behind ', { k: 'pn' }, ' systems'],
      intro: [
        { k: 'pn' },
        ' builds its palletizing cells, case packers and conveyor lines with robots, controls and conveying components from these brands, so your maintenance team works with equipment it already knows. ',
        { k: 'pn' },
        ' is also a PMMI member, its industrial control panels are UL Listed, and it is EcoVadis Committed (March 2026).',
      ],
      seals: [
        {
          src: '/assets/logos/abb-value-provider.png',
          alt: 'ABB Value Provider',
          href: 'https://www.abb.com/global/en/channel-partners/partner-details/g13344374',
        },
        {
          src: '/assets/logos/fanuc-authorized-system-integrator.png',
          alt: 'FANUC Authorized System Integrator',
        },
        {
          src: '/assets/logos/kuka-official-system-partner.png',
          alt: 'KUKA Official System Partner',
          href: 'https://my.kuka.com/s/case-studies?c__caseid=a1gQF00000D4enNYAR&language=en_US',
        },
        {
          src: '/assets/logos/rockwell-gold-oem-partner.png',
          alt: 'Rockwell Automation Gold OEM Partner',
          href: 'https://www.rockwellautomation.com/en-us/sales/partner-details.html?id=317fa07b-c113-7351-1ef3-8d45de1fd6a0',
        },
        {
          src: '/assets/logos/interroll-rolling-on.png',
          alt: 'Interroll Rolling On',
          href: 'https://rollingoninterroll.com/en/global-partner-network/explore/latin-am/brazil/torfresma-industrial.html',
        },
        { src: '/assets/logos/Siemens-logo.svg', alt: 'Siemens' },
        { src: '/assets/logos/Intralox_logo.svg', alt: 'Intralox' },
      ],
      certsLabel: 'Certifications and memberships',
      certs: [
        {
          src: '/assets/logos/pmmi-member.png',
          alt: 'PMMI member',
          href: 'https://www.prosource.org/company/torfresma-usa-llc-trf-industrial-automation',
        },
        {
          src: '/assets/logos/ul-listed.png',
          alt: 'UL Listed industrial control panels',
          href: 'https://productiq.ulprospector.com/en/profile/4690882/nitw.e526406?term=NITW&page=183',
        },
        {
          src: '/assets/logos/ecovadis-committed-2026.png',
          alt: 'EcoVadis Committed sustainability rating, March 2026',
        },
      ],
    },

    /* ---- 7. a jornada do projeto em 5 fases ---------------------------- */
    {
      type: 'journey',
      theme: 'dark',
      h2: ['How an end-of-line automation project runs with ', { k: 'pn' }],
      intro: [
        'One ',
        { k: 'pn' },
        ' team looks after every phase, from the first application review to the day the line runs: project management, engineering and build, testing at the ',
        { k: 'pn' },
        ' facility, installation, training and support.',
      ],
      phases: [
        {
          n: '01',
          title: ['Application review and validation'],
          items: [
            ['Sales engineering reviews your application'],
            ['Products and platforms matched to the job'],
            ['Rates confirmed against your line'],
            ['Layout validated for your floor space'],
          ],
        },
        {
          n: '02',
          title: ['Quote and project kickoff'],
          items: [
            ['Quote built on the validated application'],
            ['Kickoff and project meetings with your team'],
            ['Approvals before the build starts'],
          ],
        },
        {
          n: '03',
          title: ['Project management, engineering and build'],
          items: [
            ['A project manager coordinating the schedule'],
            ['Engineering and design of the system'],
            ['Manufacturing and assembly'],
          ],
        },
        {
          n: '04',
          title: ['FAT, installation, startup and SAT'],
          items: [
            ['FAT (Factory Acceptance Test): your equipment is tested at the ', { k: 'pn' }, ' facility'],
            ['Installation and startup by ', { k: 'pn' }],
            ['SAT (Site Acceptance Test) at your plant'],
          ],
        },
        {
          n: '05',
          title: ['Training, handover and ongoing support'],
          items: [
            ['Operator and maintenance training'],
            ['Handover to your team'],
            ['Technical support after startup'],
            ['Preventive maintenance (PM) program with ', { k: 'pn', platform: 'Care' }],
          ],
        },
      ],
    },

    /* ---- 8. um parceiro para todo o fim de linha ----------------------- */
    {
      type: 'split',
      theme: 'light',
      imgMode: 'contain-white',
      h2: ['One partner for the whole end of line, from product to pallet'],
      img: {
        base: 'trf-full-partner-end-of-line',
        alt: 'Diagram of the end of line, from product to case to pallet.',
        width: 960,
        height: 540,
      },
      body: [
        {
          k: 'p',
          spans: [
            'The end of the line starts at the product. The product goes into the case, and the case goes onto the pallet, so ',
            { k: 'pn' },
            ' plans the whole journey as one system.',
          ],
        },
        {
          k: 'p',
          spans: [
            'End-of-line problems often come from the gaps between machines, not from a single machine: a case packer that outruns the conveyor, an accumulation zone that cannot absorb a pallet change, or three suppliers who each point to another when the line stops. ',
            { k: 'pn' },
            ' addresses those gaps by delivering ',
            { k: 'a', t: 'case packing', to: '/case-packing/' },
            ', ',
            { k: 'a', t: 'conveying', to: '/conveyor-systems/' },
            ' and ',
            { k: 'a', t: 'robotic palletizing', to: '/robotic-palletizing/' },
            ' as one engineered system: one project, one engineering team and one partner for the scope ',
            { k: 'pn' },
            ' delivers.',
          ],
        },
        {
          k: 'p',
          spans: [
            { k: 'pn' },
            ' manages engineering, manufacturing, controls, assembly, integration and commissioning within one coordinated delivery model. The plant can also start with a single platform, such as a ',
            { k: 'pn', platform: 'Cobot' },
            ' replacing manual palletizing on one line, and add a case packer and conveyors later without starting over with a new supplier or a new controls philosophy.',
          ],
        },
      ],
    },

    /* ---- 9. as 15 industrias ------------------------------------------- */
    {
      type: 'industryGrid',
      theme: 'dark',
      h2: ['Industries ', { k: 'pn' }, ' serves'],
      intro: [
        { k: 'pn' },
        ' platforms are not tied to one vertical. Each ',
        { k: 'a', t: 'industry page', to: '/industries/' },
        ' shows which ',
        { k: 'pn' },
        ' platforms fit that industry and the products those plants typically pack and palletize.',
      ],
      items: [
        {
          title: 'Food processing',
          text: 'Take packaged food from case packing to a shipping-ready pallet with one engineered end of line.',
          to: '/industries/food-processing/',
          icon: 'food-processing',
          img: { base: 'trf-ind-food-960', alt: '', single: true },
        },
        {
          title: 'Protein processing',
          text: 'Convey, case pack and palletize packaged protein products with systems engineered for the end of the line.',
          to: '/industries/protein-processing/',
          icon: 'protein-processing',
          img: { base: 'trf-ind-protein-960', alt: '', single: true },
        },
        {
          title: 'Frozen food and ice cream',
          text: 'Automate IQF bags, frozen meals and ice cream from case packing to the pallet, including below-freezing applications.',
          to: '/industries/frozen-food-and-ice-cream/',
          icon: 'frozen-food-and-ice-cream',
          img: { base: 'trf-ind-frozen-960', alt: '', single: true },
        },
        {
          title: 'Bakery and snacks',
          text: 'Pack delicate baked goods and snacks into cases and onto pallets with less manual labor, using the platform matched to your speed and mix.',
          to: '/industries/bakery-and-snacks/',
          icon: 'bakery-and-snacks',
          img: { base: 'trf-ind-bakery-960', alt: '', single: true },
        },
        {
          title: 'Confectionery',
          text: 'Keep high-mix candy and chocolate lines moving from case packing to the pallet and protect the product.',
          to: '/industries/confectionery/',
          icon: 'confectionery',
          img: { base: 'trf-ind-confectionery-960', alt: '', single: true },
        },
        {
          title: 'Dairy and cheese',
          text: 'Move dairy products from the filler to the pallet with hygienic conveying, case packing and palletizing that fit your sanitation schedule.',
          to: '/industries/dairy-and-cheese/',
          icon: 'dairy-and-cheese',
          img: { base: 'trf-ind-dairy-960', alt: '', single: true },
        },
        {
          title: 'Pet food',
          text: 'Handle bags, pouches and cases in pet food plants from case packing to the pallet.',
          to: '/industries/pet-food/',
          icon: 'pet-food',
          img: { base: 'trf-ind-pet-960', alt: '', single: true },
        },
        {
          title: 'Pharmaceutical',
          text: 'Automate lower-speed, high-mix lines that change products often, from case packing to the pallet.',
          to: '/industries/pharmaceutical/',
          icon: 'pharmaceutical',
          img: { base: 'trf-ind-pharma-960', alt: '', single: true },
        },
        {
          title: 'Personal care and cosmetics',
          text: 'Keep high-mix cosmetics lines flexible from case packing to the pallet.',
          to: '/industries/personal-care-and-cosmetics/',
          icon: 'personal-care-and-cosmetics',
          img: { base: 'trf-ind-personal-care-960', alt: '', single: true },
        },
        {
          title: 'Chemicals',
          text: 'Take heavy manual handling out of the end of the line with the palletizing platform matched to case weight, rate and layout.',
          to: '/industries/chemicals/',
          icon: 'chemicals',
          img: { base: 'trf-ind-chemicals-960', alt: '', single: true },
        },
        {
          title: 'Household and cleaning products',
          text: 'Handle heavy cases, high SKU counts and stable pallets in household products plants.',
          to: '/industries/household-and-cleaning-products/',
          icon: 'household-and-cleaning-products',
          img: { base: 'trf-ind-household-960', alt: '', single: true },
        },
        {
          title: 'Paper and packaging',
          text: 'Handle bundles, cases and cartons at the end of the converting line with one engineered system.',
          to: '/industries/paper-and-packaging/',
          icon: 'paper-and-packaging',
          img: { base: 'trf-ind-paper-960', alt: '', single: true },
        },
        {
          title: 'Consumer packaged goods (CPG)',
          text: 'Automate case packing, conveying and palletizing across your consumer goods portfolio with platforms that follow your product plan.',
          to: '/industries/consumer-packaged-goods/',
          icon: 'consumer-packaged-goods-cpg',
          img: { base: 'trf-ind-cpg-960', alt: '', single: true },
        },
        {
          title: 'Co-packers',
          text: "Flexible case packing, conveying and palletizing that follows every customer's product, case and pallet pattern, run after run.",
          to: '/industries/co-packers/',
          icon: 'co-packers',
          img: { base: 'trf-ind-copackers-960', alt: '', single: true },
        },
        {
          title: 'E-commerce and distribution',
          text: 'Take manual lifting out of pallet building in distribution centers and keep outbound flow moving, with a platform matched to your case mix.',
          to: '/industries/e-commerce-and-distribution/',
          icon: 'e-commerce-and-distribution',
          img: { base: 'trf-ind-ecommerce-960', alt: '', single: true },
        },
      ],
    },

    /* ---- 10. TRF e Torfresma ------------------------------------------- */
    {
      type: 'parent',
      eyebrow: [{ k: 'pn' }, ' and Torfresma'],
      h2: ['One U.S. team. ', { k: 'lime', t: 'Decades of engineering behind it.' }],
      cta: { label: ['About ', { k: 'pn' }], to: '/about/', variant: 'sec-d', arrow: true },
      body: [
        {
          k: 'p',
          spans: [
            { k: 'pn' },
            ' Industrial Automation is Torfresma in the United States, the name the group uses in this market. ',
            { k: 'pn' },
            ' carries more than 30 years of Torfresma engineering experience in industrial automation into every palletizer, case packer and conveyor.',
          ],
        },
        {
          k: 'p',
          spans: [
            { k: 'pn' },
            ' is the company you work with. ',
            { k: 'pn' },
            ' sells, installs and supports the equipment in the United States, with its own field technicians, from the first application review to lifecycle support with ',
            { k: 'pn', platform: 'Care' },
            '.',
          ],
        },
      ],
      facts: [
        {
          title: 'Torfresma',
          text: [
            'The group behind the ',
            { k: 'pn' },
            ' platforms, with more than 30 years of engineering experience.',
          ],
        },
        {
          title: 'TRF',
          text: ['Sales, installation and support for manufacturers across the United States.'],
        },
        {
          title: 'Together',
          text: ['One accountable team from application review to the life of the equipment.'],
        },
      ],
      outLink: {
        label: 'Want to know more about Torfresma in Brazil? Visit torfresma.com',
        href: 'https://www.torfresma.com/',
      },
    },

    /* ---- 11. eventos --------------------------------------------------- */
    {
      type: 'events',
      eyebrow: 'Events',
      h2: ['Upcoming trade shows'],
      events: [
        {
          logo: {
            src: '/assets/logos/pack-expo-international-logo.png',
            alt: 'PACK EXPO International logo',
          },
          title: 'PACK EXPO International 2026',
          text: 'Palletizing, case packing and conveying discussed as one end-of-line system.',
          facts: [
            { label: 'Date', value: 'October 18 to 21, 2026' },
            { label: 'Location', value: 'McCormick Place, Chicago, IL' },
            { label: 'Booth', value: 'N-5660' },
          ],
          cta: {
            label: 'Plan your visit',
            href: 'https://www.torfresma.com/customer/packexpo',
            variant: 'pri',
            arrow: true,
          },
        },
      ],
    },

    /* ---- 12. redes sociais --------------------------------------------- */
    {
      type: 'follow',
      eyebrow: ['Follow ', { k: 'pn' }],
      h2: ['See ', { k: 'pn' }, ' systems running on the plant floor'],
      lead: [
        'Installations, application videos and show news, on the channels manufacturers already follow.',
      ],
      socials: [],
    },
  ],
};
