import type { Page } from '../types';

/* GERADO por scripts/extract-content.mjs — nao editar a mao. */
export const page_resources: Page = {
  route: "/resources/",
  title: "Packaging Automation Resources | TRF Industrial Automation",
  description: "Packaging automation resources from TRF: a robotic palletizer cost article, three case studies, PACK EXPO 2026 and a payback calculator.",
  ogImage: "/assets/og/resources.jpg",
  breadcrumbs: [
    {
      label: "Home",
      to: "/"
    },
    {
      label: "Resources"
    }
  ],
  blocks: [
    {
      type: "hero",
      variant: "image",
      eyebrow: "Resources",
      h1: [
        "Packaging automation resources to research, compare and ",
        {
          k: "lime",
          t: "justify your project."
        }
      ],
      solution: [
        "A cost article, case studies, an event page and a payback calculator for teams planning end-of-line automation."
      ],
      lead: [
        "The packaging automation resources from ",
        {
          k: "pn"
        },
        " Industrial Automation are the cost article, case studies, event page and payback calculator that help plant teams research, compare and justify robotic palletizing, case packing and conveyor projects."
      ],
      ctas: [
        {
          label: "Talk with our Sales Engineer",
          variant: "pri",
          arrow: true,
          to: "/contact/"
        }
      ],
      img: {
        base: "trf-plant-resources",
        single: false,
        alt: "TRF palletizing cell: robot base and control cabinet beside a case conveyor.",
        sizes: "100vw",
        width: 1920,
        height: 1080,
        eager: true
      }
    },
    {
      type: "benefits",
      label: "Why TRF",
      items: [
        {
          icon: "custom-engineering",
          title: [
            "Custom engineering"
          ],
          text: [
            "Solutions designed around your line."
          ]
        },
        {
          icon: "custom-engineering-2",
          title: [
            "Turnkey integration"
          ],
          text: [
            "From concept to full production."
          ]
        },
        {
          icon: "turnkey-integration",
          title: [
            "High reliability"
          ],
          text: [
            "Built for continuous operation."
          ]
        },
        {
          icon: "high-reliability",
          title: [
            "U.S. market focus"
          ],
          text: [
            "Support across the United States."
          ]
        },
        {
          icon: "u-s-market-focus",
          title: [
            "Lifecycle support"
          ],
          text: [
            {
              k: "a",
              t: "Backed by TRFCare.",
              spans: [
                "Backed by ",
                {
                  k: "pn",
                  platform: "Care"
                },
                "."
              ],
              to: "/parts-and-service/#trf-care"
            }
          ]
        }
      ]
    },
    {
      type: "prose",
      theme: "light",
      h2: [
        "Packaging automation resources available today"
      ],
      id: "packaging-automation-resources-available-today",
      body: [
        {
          k: "table",
          head: [
            [
              "Resource"
            ],
            [
              "What it gives your team"
            ],
            [
              "Where to find it"
            ]
          ],
          rows: [
            [
              {
                spans: [
                  "Blog"
                ]
              },
              {
                spans: [
                  "The article How Much Does a Robotic Palletizer Cost?, with the cost drivers, the reference list prices and the payback method"
                ]
              },
              {
                spans: [
                  {
                    k: "a",
                    t: "Packaging automation blog",
                    to: "/resources/blog/"
                  }
                ]
              }
            ],
            [
              {
                spans: [
                  "Case studies"
                ]
              },
              {
                spans: [
                  "Three published installations: Custom Foods, Lodge Cast Iron and Avon"
                ]
              },
              {
                spans: [
                  {
                    k: "a",
                    t: "Case studies",
                    to: "/resources/case-studies/"
                  }
                ]
              }
            ],
            [
              {
                spans: [
                  "Trade shows and events"
                ]
              },
              {
                spans: [
                  "PACK EXPO International 2026, October 18 to 21, 2026, McCormick Place, Chicago, booth N-5660"
                ]
              },
              {
                spans: [
                  {
                    k: "a",
                    t: "Trade shows and events",
                    to: "/resources/trade-shows-and-events/"
                  }
                ]
              }
            ],
            [
              {
                spans: [
                  "Payback calculator"
                ]
              },
              {
                spans: [
                  "An initial payback estimate for a robotic palletizer, built from your own line data"
                ]
              },
              {
                spans: [
                  {
                    k: "a",
                    t: "Palletizing ROI calculator",
                    to: "/tools/palletizing-roi-calculator/"
                  }
                ]
              }
            ],
            [
              {
                spans: [
                  "Platform specifications"
                ]
              },
              {
                spans: [
                  "Ask a ",
                  {
                    k: "pn"
                  },
                  " Sales Engineer for the specifications of the platform you are considering"
                ]
              },
              {
                spans: [
                  {
                    k: "a",
                    t: "Request platform specifications",
                    to: "/resources/downloads/"
                  }
                ]
              }
            ]
          ]
        }
      ]
    },
    {
      type: "split",
      theme: "dark",
      sticky: true,
      imgMode: "cover",
      h2: [
        "How much does a robotic palletizer cost?"
      ],
      id: "how-much-does-a-robotic-palletizer-cost",
      body: [
        {
          k: "p",
          spans: [
            {
              k: "pn"
            },
            " publishes three reference list prices, all EX Works Lenexa, Kansas, installation not included: US$ 120,000 for the ",
            {
              k: "a",
              t: "TRFCobot",
              spans: [
                {
                  k: "pn",
                  platform: "Cobot"
                }
              ],
              to: "/robotic-palletizing/cobot-palletizer/"
            },
            " Dual, US$ 180,000 for the ",
            {
              k: "a",
              t: "TRFCompact",
              spans: [
                {
                  k: "pn",
                  platform: "Compact"
                }
              ],
              to: "/robotic-palletizing/compact-palletizer/"
            },
            " Dual and US$ 350,000 for the ",
            {
              k: "a",
              t: "TRFSpeed",
              spans: [
                {
                  k: "pn",
                  platform: "Speed"
                }
              ],
              to: "/robotic-palletizing/high-speed-palletizer/"
            },
            " 100. Installation, line integration and options are quoted with your application, because four things move the total: line speed, product and case weight, pallet pattern and the layout of your end-of-line area."
          ]
        },
        {
          k: "p",
          spans: [
            "The article ",
            {
              k: "a",
              t: "How Much Does a Robotic Palletizer Cost?",
              to: "/resources/blog/how-much-does-a-robotic-palletizer-cost/"
            },
            " breaks the investment into the items every palletizing project contains, so your team can compare proposals on the same scope. The ",
            {
              k: "a",
              t: "robotic palletizer cost page",
              to: "/robotic-palletizing/robotic-palletizer-cost/"
            },
            " explains the cost drivers next to the payback calculator."
          ]
        }
      ],
      img: {
        base: "trf-w-speed",
        single: false,
        alt: "TRFSpeed high-speed palletizing system",
        sizes: "(max-width: 900px) 100vw, 33vw",
        width: 1600,
        height: 1000
      }
    },
    {
      type: "split",
      theme: "light",
      sticky: true,
      imgMode: "cover",
      h2: [
        "What is the typical payback period for a robotic palletizer?"
      ],
      id: "what-is-the-typical-payback-period-for-a-robotic-palletizer",
      body: [
        {
          k: "p",
          spans: [
            "Payback depends on the labor hours the palletizer replaces, shifts per day, local labor cost and the installed cost of the system. The ",
            {
              k: "a",
              t: "palletizing ROI calculator",
              to: "/tools/palletizing-roi-calculator/"
            },
            " applies that method to your platform, your state, the people per shift on palletizing, hours per shift, shifts per day, days per week and the investment you want to test."
          ]
        },
        {
          k: "p",
          spans: [
            "The result is an initial estimate, not a quote: a ",
            {
              k: "pn"
            },
            " Sales Engineer completes it with your data."
          ]
        }
      ],
      img: {
        base: "trf-w-rapidpack",
        single: false,
        alt: "TRFRapidpack robotic case packer",
        sizes: "(max-width: 900px) 100vw, 33vw",
        width: 1600,
        height: 1000
      }
    },
    {
      type: "split",
      theme: "dark",
      sticky: true,
      imgMode: "cover",
      h2: [
        "Case studies by line constraint"
      ],
      id: "case-studies-by-line-constraint",
      body: [
        {
          k: "p",
          spans: [
            "Each case has its own page with the challenge, the solution and the results the customer reports."
          ]
        },
        {
          k: "ul",
          items: [
            [
              {
                k: "b",
                t: "Palletizing below freezing:"
              },
              " ",
              {
                k: "a",
                t: "Custom Foods",
                to: "/resources/case-studies/custom-foods/"
              },
              ", a robotic palletizing system engineered for cold storage at a food plant in De Soto, Kansas."
            ],
            [
              {
                k: "b",
                t: "Heavy cases packed by hand:"
              },
              " ",
              {
                k: "a",
                t: "Lodge Cast Iron",
                to: "/resources/case-studies/lodge-cast-iron/"
              },
              ", ergonomic manual case packing plus fully automatic robotic palletizing for the Tennessee cookware maker."
            ],
            [
              {
                k: "b",
                t: "Material flow across a wide product mix:"
              },
              " ",
              {
                k: "a",
                t: "Avon",
                to: "/resources/case-studies/avon/"
              },
              ", conveying, case handling and vertical transport engineered as one flow."
            ]
          ]
        }
      ],
      img: {
        base: "case-lodge-robot-line",
        single: false,
        alt: "Robotic palletizer and case handling line at Lodge Cast Iron",
        sizes: "(max-width: 900px) 100vw, 33vw",
        width: 1600,
        height: 1000
      }
    },
    {
      type: "split",
      theme: "light",
      sticky: true,
      imgMode: "cover",
      h2: [
        "Where can you see end-of-line equipment in person?"
      ],
      id: "where-can-you-see-end-of-line-equipment-in-person",
      body: [
        {
          k: "p",
          spans: [
            "At PACK EXPO International 2026, October 18 to 21, 2026, at McCormick Place in Chicago, where ",
            {
              k: "pn"
            },
            " is at booth N-5660. The ",
            {
              k: "a",
              t: "PACK EXPO International 2026 page",
              to: "/resources/trade-shows-and-events/pack-expo-international-2026/"
            },
            " links to ",
            {
              k: "pn"
            },
            "'s own show page, where you plan your visit and request a meeting at the booth."
          ]
        }
      ],
      img: {
        base: "trf-w-cleanflow",
        single: false,
        alt: "TRFCleanflow hygienic food conveyor",
        sizes: "(max-width: 900px) 100vw, 33vw",
        width: 1600,
        height: 1000
      }
    },
    {
      type: "split",
      theme: "dark",
      sticky: true,
      imgMode: "cover",
      h2: [
        "How do you get the specifications of a platform?"
      ],
      id: "how-do-you-get-the-specifications-of-a-platform",
      body: [
        {
          k: "p",
          spans: [
            "Ask a ",
            {
              k: "pn"
            },
            " Sales Engineer for the specifications of the platform you are considering, with your line data at hand. The ",
            {
              k: "a",
              t: "request page",
              to: "/resources/downloads/"
            },
            " lists the platforms:"
          ]
        },
        {
          k: "ul",
          items: [
            [
              {
                k: "b",
                t: "Robotic palletizing:"
              },
              " ",
              {
                k: "a",
                t: "TRFCobot",
                spans: [
                  {
                    k: "pn",
                    platform: "Cobot"
                  }
                ],
                to: "/robotic-palletizing/cobot-palletizer/"
              },
              ", ",
              {
                k: "a",
                t: "TRFCompact",
                spans: [
                  {
                    k: "pn",
                    platform: "Compact"
                  }
                ],
                to: "/robotic-palletizing/compact-palletizer/"
              },
              ", ",
              {
                k: "a",
                t: "TRFSpeed",
                spans: [
                  {
                    k: "pn",
                    platform: "Speed"
                  }
                ],
                to: "/robotic-palletizing/high-speed-palletizer/"
              },
              " and ",
              {
                k: "a",
                t: "TRFSubzero",
                spans: [
                  {
                    k: "pn",
                    platform: "Subzero"
                  }
                ],
                to: "/robotic-palletizing/subzero-palletizer/"
              },
              "."
            ],
            [
              {
                k: "b",
                t: "Case packing:"
              },
              " ",
              {
                k: "a",
                t: "TRFRapidpack",
                spans: [
                  {
                    k: "pn",
                    platform: "Rapidpack"
                  }
                ],
                to: "/case-packing/robotic-case-packer/"
              },
              ", ",
              {
                k: "a",
                t: "TRFOnepack",
                spans: [
                  {
                    k: "pn",
                    platform: "Onepack"
                  }
                ],
                to: "/case-packing/integrated-case-packer/"
              },
              " and ",
              {
                k: "a",
                t: "TRFDroppack",
                spans: [
                  {
                    k: "pn",
                    platform: "Droppack"
                  }
                ],
                to: "/case-packing/drop-packer/"
              },
              "."
            ],
            [
              {
                k: "b",
                t: "Conveyor systems:"
              },
              " ",
              {
                k: "a",
                t: "TRFIntraflow",
                spans: [
                  {
                    k: "pn",
                    platform: "Intraflow"
                  }
                ],
                to: "/conveyor-systems/case-conveyor-intralogistics/"
              },
              " and ",
              {
                k: "a",
                t: "TRFCleanflow",
                spans: [
                  {
                    k: "pn",
                    platform: "Cleanflow"
                  }
                ],
                to: "/conveyor-systems/hygienic-food-conveyor/"
              },
              "."
            ]
          ]
        }
      ],
      img: {
        base: "trfintraflow-application",
        single: false,
        alt: "TRFIntraflow case conveyor system routing cases",
        sizes: "(max-width: 900px) 100vw, 33vw",
        width: 1600,
        height: 1000
      }
    },
    {
      type: "split",
      theme: "light",
      sticky: true,
      imgMode: "cover",
      h2: [
        "Support for ",
        {
          k: "pn"
        },
        " equipment owners"
      ],
      id: "support-for-trf-equipment-owners",
      body: [
        {
          k: "p",
          spans: [
            "If your plant already runs equipment supplied by ",
            {
              k: "pn"
            },
            ", go to the ",
            {
              k: "a",
              t: "Parts and Service page",
              to: "/parts-and-service/"
            },
            " for technical support and spare parts. This resources section is written for teams evaluating a new project."
          ]
        }
      ],
      img: {
        base: "trf-w-compact",
        single: false,
        alt: "TRFCompact robotic case palletizer",
        sizes: "(max-width: 900px) 100vw, 33vw",
        width: 1600,
        height: 1000
      }
    },
    {
      type: "faq",
      eyebrow: "Questions",
      h2: "Frequently asked questions",
      id: "frequently-asked-questions",
      items: [
        {
          q: [
            "How Do You Choose a Palletizing System?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "Choose by line speed, case weight and floor space. ",
                {
                  k: "pn",
                  platform: "Cobot"
                },
                " covers about 1 to 10 cases per minute with cases up to about 22 lb, ",
                {
                  k: "pn",
                  platform: "Compact"
                },
                " about 5 to 15 cases per minute up to about 44 lb, and ",
                {
                  k: "pn",
                  platform: "Speed"
                },
                " about 10 to 35 cases per minute up to about 66 lb. ",
                {
                  k: "pn",
                  platform: "Subzero"
                },
                " covers palletizing areas below 32°F. ",
                {
                  k: "pn"
                },
                " engineering confirms the final capacity for each application."
              ]
            }
          ]
        },
        {
          q: [
            "Can a Palletizer Be Integrated With My Existing Conveyor and Wrapping Line?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "Yes. ",
                {
                  k: "pn"
                },
                " engineers palletizing, case packing and conveying as one end-of-line system, supported from Lenexa, Kansas. ",
                {
                  k: "pn",
                  platform: "Speed"
                },
                " is built to work with conveyors, accumulation, pallet handling, slip sheets, wrapping, labeling and warehouse interfaces, and ",
                {
                  k: "a",
                  t: "end-of-line integration",
                  to: "/conveyor-systems/end-of-line-integration/"
                },
                " puts one partner in charge of the whole flow from case packer to pallet."
              ]
            }
          ]
        },
        {
          q: [
            "Who Makes Robotic Case Palletizers With Local Support in the US?"
          ],
          a: [
            {
              k: "p",
              spans: [
                {
                  k: "pn"
                },
                " designs, builds, installs and supports robotic palletizers for manufacturers across the United States. The family covers ",
                {
                  k: "pn",
                  platform: "Cobot"
                },
                ", ",
                {
                  k: "pn",
                  platform: "Compact"
                },
                ", ",
                {
                  k: "pn",
                  platform: "Speed"
                },
                " and ",
                {
                  k: "pn",
                  platform: "Subzero"
                },
                ", plus a ",
                {
                  k: "a",
                  t: "custom palletizer",
                  to: "/robotic-palletizing/custom-palletizer/"
                },
                " for products or layouts outside the standard ranges. How ",
                {
                  k: "pn"
                },
                " supports its equipment after startup, including spare parts, is described on the ",
                {
                  k: "a",
                  t: "Parts and Service",
                  to: "/parts-and-service/"
                },
                " page."
              ]
            }
          ]
        }
      ]
    },
    {
      type: "split",
      theme: "dark",
      sticky: true,
      imgMode: "cover",
      h2: [
        "Start your project with the right resource"
      ],
      id: "start-your-project-with-the-right-resource",
      body: [
        {
          k: "p",
          spans: [
            "Use the cost article to understand the investment, the calculator to put your own numbers on payback and the case studies to see the application solved in another plant. When your team has its line data ready, a ",
            {
              k: "pn"
            },
            " Sales Engineer validates the fit."
          ]
        },
        {
          k: "ctas",
          ctas: [
            {
              label: "Calculate Your Payback",
              variant: "pri",
              arrow: true,
              to: "/tools/palletizing-roi-calculator/"
            },
            {
              label: "Talk with our Sales Engineer",
              variant: "sec-c",
              arrow: false,
              to: "/contact/"
            }
          ]
        }
      ],
      img: {
        base: "trf-w-cobot",
        single: false,
        alt: "TRFCobot collaborative palletizer",
        sizes: "(max-width: 900px) 100vw, 33vw",
        width: 1600,
        height: 1000
      }
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
