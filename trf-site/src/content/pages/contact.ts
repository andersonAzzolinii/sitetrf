import type { Page } from '../types';

/* GERADO por scripts/extract-content.mjs — nao editar a mao. */
export const page_contact: Page = {
  route: "/contact/",
  title: "Contact TRF Industrial Automation | Sales Engineer",
  description: "Contact TRF Industrial Automation: tell us about your line and a Sales Engineer will schedule a conversation about palletizing, case packing or conveying.",
  ogImage: "/assets/og/contact.jpg",
  breadcrumbs: [
    {
      label: "Home",
      to: "/"
    },
    {
      label: "Contact"
    }
  ],
  blocks: [
    {
      type: "hero",
      variant: "compact",
      eyebrow: "Contact",
      h1: [
        "Talk with a ",
        {
          k: "pn"
        },
        " Sales Engineer ",
        {
          k: "lime",
          t: "about your line."
        }
      ],
      solution: [
        "Tell us about your line, and a Sales Engineer prepares the right conversation for your project."
      ],
      img: {
        base: "trf-plant-contact",
        single: false,
        alt: "",
        sizes: "100vw",
        width: 1920,
        height: 1080,
        eager: true
      }
    },
    {
      type: "roi",
      variant: "contact",
      intro: [
        "A ",
        {
          k: "pn"
        },
        " Sales Engineer will contact you shortly to schedule a conversation about your line. If you prefer to talk now, call ",
        {
          k: "a",
          t: "(913) 242-8019",
          href: "tel:+19132428019"
        },
        "."
      ]
    },
    {
      type: "prose",
      theme: "light",
      h2: [
        "What happens after you send the form?"
      ],
      id: "what-happens-after-you-send-the-form",
      body: [
        {
          k: "p",
          spans: [
            "A ",
            {
              k: "pn"
            },
            " Sales Engineer reviews your answers and contacts you to schedule a conversation about your line. The more concrete the description, the faster the answer: \"we palletize 24 lb cases at about 12 per minute on two shifts\" moves a conversation further than \"we need a palletizer\"."
          ]
        },
        {
          k: "table",
          head: [
            [
              "Item"
            ],
            [
              "Detail"
            ]
          ],
          rows: [
            [
              {
                spans: [
                  "Phone"
                ]
              },
              {
                spans: [
                  {
                    k: "a",
                    t: "(913) 242-8019",
                    href: "tel:+19132428019"
                  }
                ]
              }
            ],
            [
              {
                spans: [
                  "Address"
                ]
              },
              {
                spans: [
                  "14840 W 107th St, Lenexa, KS 66215, United States"
                ]
              }
            ],
            [
              {
                spans: [
                  "Coverage"
                ]
              },
              {
                spans: [
                  "Serving the United States"
                ]
              }
            ],
            [
              {
                spans: [
                  "New projects"
                ]
              },
              {
                spans: [
                  "Form on this page, or by phone"
                ]
              }
            ],
            [
              {
                spans: [
                  "Existing ",
                  {
                    k: "pn"
                  },
                  " equipment"
                ]
              },
              {
                spans: [
                  {
                    k: "a",
                    t: "Parts and Service",
                    to: "/parts-and-service/"
                  }
                ]
              }
            ],
            [
              {
                spans: [
                  "Payback estimate before a quote"
                ]
              },
              {
                spans: [
                  {
                    k: "a",
                    t: "Palletizing payback calculator",
                    to: "/tools/palletizing-roi-calculator/"
                  }
                ]
              }
            ],
            [
              {
                spans: [
                  "Compare platforms first"
                ]
              },
              {
                spans: [
                  {
                    k: "a",
                    t: "Robotic palletizing",
                    to: "/robotic-palletizing/"
                  },
                  ", ",
                  {
                    k: "a",
                    t: "case packing",
                    to: "/case-packing/"
                  },
                  " or ",
                  {
                    k: "a",
                    t: "conveyor systems",
                    to: "/conveyor-systems/"
                  }
                ]
              }
            ],
            [
              {
                spans: [
                  "Meet ",
                  {
                    k: "pn"
                  },
                  " in person"
                ]
              },
              {
                spans: [
                  {
                    k: "a",
                    t: "PACK EXPO International 2026",
                    to: "/resources/trade-shows-and-events/pack-expo-international-2026/"
                  },
                  ", October 18 to 21, 2026, Chicago, booth N-5660"
                ]
              }
            ],
            [
              {
                spans: [
                  "Press or media"
                ]
              },
              {
                spans: [
                  "Use the form and select \"Something else\""
                ]
              }
            ]
          ]
        }
      ]
    },
    {
      type: "final",
      eyebrow: "Next step",
      h2: [
        "Keep your production ",
        {
          k: "lime",
          t: "running."
        }
      ],
      lead: [
        "Tell us about your products, rates and floor space. A ",
        {
          k: "pn"
        },
        " Sales Engineer answers with the platform, the layout and the next step for your line."
      ],
      ctas: [
        {
          label: "Talk with our Sales Engineer",
          variant: "pri",
          arrow: true,
          to: "/contact/"
        }
      ],
      bgImg: {
        base: "trfspeed-application-1920",
        single: true,
        alt: "",
        width: 1920,
        height: 1080
      }
    }
  ]
};
