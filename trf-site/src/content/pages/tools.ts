import type { Page } from '../types';

/* GERADO por scripts/extract-content.mjs — nao editar a mao. */
export const page_tools: Page = {
  route: "/tools/",
  title: "Palletizing Planning Tools | TRF Industrial Automation",
  description: "Palletizing planning tools from TRF: estimate payback with the ROI calculator, gather the right line data and build your capital request.",
  ogImage: "/assets/og/tools.jpg",
  breadcrumbs: [
    {
      label: "Home",
      to: "/"
    },
    {
      label: "Tools"
    }
  ],
  blocks: [
    {
      type: "hero",
      variant: "image",
      eyebrow: "Tools",
      h1: [
        "Palletizing planning tools to estimate payback and ",
        {
          k: "lime",
          t: "build your capital request."
        }
      ],
      solution: [
        "One calculator and a cost guide for building the business case for palletizing."
      ],
      lead: [
        "The palletizing planning tools from ",
        {
          k: "pn"
        },
        " Industrial Automation are free resources that help manufacturers estimate palletizing payback, gather the right line data and build a capital request before a quote exists."
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
        base: "trfonepack-detail",
        single: false,
        alt: "Screenshot of the TRF palletizing ROI calculator.",
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
        "Palletizing planning tools at a glance"
      ],
      id: "palletizing-planning-tools-at-a-glance",
      body: [
        {
          k: "table",
          head: [
            [
              "Resource"
            ],
            [
              "What it answers"
            ],
            [
              "Best for"
            ]
          ],
          rows: [
            [
              {
                spans: [
                  {
                    k: "a",
                    t: "Palletizing ROI calculator",
                    to: "/tools/palletizing-roi-calculator/"
                  }
                ]
              },
              {
                spans: [
                  "What is the estimated payback of a robotic palletizer with my labor, shifts and investment?"
                ]
              },
              {
                spans: [
                  "Finance, plant management and operations"
                ]
              }
            ],
            [
              {
                spans: [
                  {
                    k: "a",
                    t: "Robotic palletizer cost guide",
                    to: "/robotic-palletizing/robotic-palletizer-cost/"
                  }
                ]
              },
              {
                spans: [
                  "What drives the cost of a palletizing system, and what are the list prices?"
                ]
              },
              {
                spans: [
                  "Procurement, finance and engineering"
                ]
              }
            ],
            [
              {
                spans: [
                  {
                    k: "a",
                    t: "Robotic palletizing platforms",
                    to: "/robotic-palletizing/"
                  }
                ]
              },
              {
                spans: [
                  "Which platform fits my rate, unit weight and floor space?"
                ]
              },
              {
                spans: [
                  "Engineering and operations"
                ]
              }
            ],
            [
              {
                spans: [
                  {
                    k: "a",
                    t: "Case studies",
                    to: "/resources/case-studies/"
                  }
                ]
              },
              {
                spans: [
                  "How have ",
                  {
                    k: "pn"
                  },
                  " customers automated the end of the line?"
                ]
              },
              {
                spans: [
                  "Plant management and engineering"
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
        "How does the palletizing ROI calculator estimate payback?"
      ],
      id: "how-does-the-palletizing-roi-calculator-estimate-payback",
      body: [
        {
          k: "p",
          spans: [
            "The ",
            {
              k: "a",
              t: "palletizing ROI calculator",
              to: "/tools/palletizing-roi-calculator/"
            },
            " divides the system cost, including 20 years of maintenance, by the annual labor cost of manual palletizing minus the annual electricity of the robot. The labor cost comes from the people who palletize on each shift, hours per shift, shifts per day, days per week and an hourly labor rate. The rate starts from a reference production wage for your state, based on public U.S. Bureau of Labor Statistics data, and you can edit it."
          ]
        },
        {
          k: "p",
          spans: [
            "Electricity uses public U.S. Energy Information Administration state rates with a 20 kW reference draw, and maintenance is 5% of the investment per year. The result is an initial planning estimate, not a quote, and a ",
            {
              k: "pn"
            },
            " Sales Engineer completes it with the costs of your project. The same calculator appears on the ",
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
            " and ",
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
            " pages, with that platform already selected."
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
        "The robotic palletizer cost guide"
      ],
      id: "the-robotic-palletizer-cost-guide",
      body: [
        {
          k: "p",
          spans: [
            "The ",
            {
              k: "a",
              t: "robotic palletizer cost guide",
              to: "/robotic-palletizing/robotic-palletizer-cost/"
            },
            " is the written companion to the calculator. It explains what moves the investment, from platform tier and payload to end-of-arm tooling, pallet patterns, conveyors, pallet handling, controls, integration, installation and training, and it lists the reference prices of the three standard platforms. Use the guide for the narrative of your capital request and the calculator for the numbers inside it."
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
      type: "prose",
      theme: "dark",
      h2: [
        "What data do you need before estimating palletizer payback?"
      ],
      id: "what-data-do-you-need-before-estimating-palletizer-payback",
      body: [
        {
          k: "p",
          spans: [
            "Most of the inputs already exist in your production and payroll systems."
          ]
        },
        {
          k: "table",
          head: [
            [
              "Data group"
            ],
            [
              "What to collect"
            ],
            [
              "Why it matters"
            ]
          ],
          rows: [
            [
              {
                spans: [
                  "Production"
                ]
              },
              {
                spans: [
                  "Shifts per day, hours per shift, days per week, average and peak cases per minute"
                ]
              },
              {
                spans: [
                  "Sets annual operating hours and the platform range"
                ]
              }
            ],
            [
              {
                spans: [
                  "Labor"
                ]
              },
              {
                spans: [
                  "People dedicated to palletizing per shift and your loaded cost per hour"
                ]
              },
              {
                spans: [
                  "Drives the labor cost the palletizer replaces"
                ]
              }
            ],
            [
              {
                spans: [
                  "Product"
                ]
              },
              {
                spans: [
                  "Unit type, dimensions, weight and number of SKUs"
                ]
              },
              {
                spans: [
                  "Decides tooling and platform fit"
                ]
              }
            ],
            [
              {
                spans: [
                  "Pallet"
                ]
              },
              {
                spans: [
                  "Pallet type and size, patterns, load height and slip sheet use"
                ]
              },
              {
                spans: [
                  "Affects cycle time and tooling"
                ]
              }
            ],
            [
              {
                spans: [
                  "Plant"
                ]
              },
              {
                spans: [
                  "Floor space, layout drawing, ceiling height, forklift flow and operating temperature"
                ]
              },
              {
                spans: [
                  "Determines footprint and any special construction"
                ]
              }
            ],
            [
              {
                spans: [
                  "Financial"
                ]
              },
              {
                spans: [
                  "Payback hurdle, budget range and approval calendar"
                ]
              },
              {
                spans: [
                  "Frames how the request is presented"
                ]
              }
            ]
          ]
        },
        {
          k: "p",
          spans: [
            "If part of the list is missing, start anyway. Unit weight, rate per line, shifts and a photo of the available area are enough for a first screening conversation."
          ]
        }
      ]
    },
    {
      type: "split",
      theme: "light",
      sticky: true,
      imgMode: "cover",
      h2: [
        "How do you build a capital request for palletizing automation?"
      ],
      id: "how-do-you-build-a-capital-request-for-palletizing-automation",
      body: [
        {
          k: "p",
          spans: [
            "A capital request is stronger when it presents the problem, the options, the full installed cost and the payback method. Cover these six things:"
          ]
        },
        {
          k: "ol",
          items: [
            [
              {
                k: "b",
                t: "The problem in operational terms:"
              },
              " operators per shift, repetitive lifting, rate limits and the effect on shipping."
            ],
            [
              {
                k: "b",
                t: "The options considered:"
              },
              " keeping the process manual, a collaborative cell, a compact industrial cell, a high-performance platform or a ",
              {
                k: "a",
                t: "custom palletizer",
                to: "/robotic-palletizing/custom-palletizer/"
              },
              "."
            ],
            [
              {
                k: "b",
                t: "The full installed cost:"
              },
              " system, tooling, conveyors, pallet handling, controls, integration, installation and training, not equipment price alone."
            ],
            [
              {
                k: "b",
                t: "The payback method, not just the result:"
              },
              " the formula, the labor source and the inputs you used."
            ],
            [
              {
                k: "b",
                t: "The benefits outside the payback:"
              },
              " ergonomics, capacity, consistency between shifts and SKU flexibility, labeled as benefits that were not priced."
            ],
            [
              {
                k: "b",
                t: "The implementation and support plan:"
              },
              " project stages, the installation window and support after startup."
            ]
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
      type: "faq",
      eyebrow: "Questions",
      h2: "Frequently asked questions",
      id: "frequently-asked-questions",
      items: [
        {
          q: [
            "Is the Palletizing ROI Calculator Free to Use?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "Yes. The calculator is free, and the preview appears as you type. A work email unlocks the full breakdown, and ",
                {
                  k: "pn"
                },
                " uses your email and inputs to follow up on your project."
              ]
            }
          ]
        },
        {
          q: [
            "How Accurate Is a Payback Estimate Made Before a Quote?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "It is an initial planning figure. It becomes sharper with your own inputs, above all your loaded labor rate, the number of people who really leave the task and an investment that includes installation and integration. Costs such as other utilities, financing, taxes and layout changes are not in the estimate, so a ",
                {
                  k: "pn"
                },
                " Sales Engineer completes it."
              ]
            }
          ]
        },
        {
          q: [
            "Can I Estimate Payback for Case Packing or Conveyor Projects?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "The calculator is built for palletizing, and the same labor logic applies to case packing. For a ",
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
                },
                " project, talk with a ",
                {
                  k: "pn"
                },
                " Sales Engineer about your products, rates and layout, and the engineer will build the estimate with you."
              ]
            }
          ]
        },
        {
          q: [
            "What Is the Next Step After I Run the Numbers?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "Contact a ",
                {
                  k: "pn"
                },
                " Sales Engineer with your product weight, rate per line, shifts and a sketch of the available area. The engineer confirms the platform, defines the scope and prepares a quote with the full installed cost for your line, replacing the reference values in the estimate with validated ones."
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
        "Start with the numbers, then talk with our Sales Engineer"
      ],
      id: "start-with-the-numbers-then-talk-with-our-sales-engineer",
      body: [
        {
          k: "p",
          spans: [
            "If you are early in the process, run the ",
            {
              k: "a",
              t: "palletizing ROI calculator",
              to: "/tools/palletizing-roi-calculator/"
            },
            " and read the ",
            {
              k: "a",
              t: "robotic palletizer cost guide",
              to: "/robotic-palletizing/robotic-palletizer-cost/"
            },
            ". If you already have a quote, use the same tools to check it: compare installed scope, not equipment price, and test payback with your own labor data."
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
        base: "trf-w-compact",
        single: false,
        alt: "TRFCompact robotic case palletizer",
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
        },
        {
          label: "Calculate your payback",
          variant: "sec-d",
          arrow: false,
          to: "/tools/palletizing-roi-calculator/"
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
