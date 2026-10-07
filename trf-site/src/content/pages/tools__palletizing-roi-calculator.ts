import type { Page } from '../types';

/* GERADO por scripts/extract-content.mjs — nao editar a mao. */
export const page_tools__palletizing_roi_calculator: Page = {
  route: "/tools/palletizing-roi-calculator/",
  title: "Palletizer ROI Calculator | TRF Industrial Automation",
  description: "Palletizer ROI calculator: estimate the payback of a robotic palletizer from your shifts, labor, state labor rates and investment.",
  ogImage: "/assets/og/tools-palletizing-roi-calculator.jpg",
  breadcrumbs: [
    {
      label: "Home",
      to: "/"
    },
    {
      label: "Tools",
      to: "/tools/"
    },
    {
      label: "Palletizing ROI Calculator"
    }
  ],
  blocks: [
    {
      type: "hero",
      variant: "image",
      eyebrow: "Tools / Palletizing ROI Calculator",
      h1: [
        "Robotic palletizer ROI ",
        {
          k: "lime",
          t: "calculator."
        }
      ],
      solution: [
        "Estimate payback from your labor, shifts and investment before you talk with our Sales Engineer."
      ],
      lead: [
        "The palletizer ROI calculator from ",
        {
          k: "pn"
        },
        " Industrial Automation is a free tool that estimates the payback of a robotic palletizer from the labor of manual palletizing, your shift pattern and the investment you want to test."
      ],
      ctas: [
        {
          label: "Calculate your payback",
          variant: "pri",
          arrow: true,
          href: "#roi"
        },
        {
          label: "Talk with our Sales Engineer",
          variant: "sec-d",
          arrow: false,
          to: "/contact/"
        }
      ],
      img: {
        base: "trfcobot-detail",
        single: false,
        alt: "Screenshot of the TRF palletizing ROI calculator filled in with sample values.",
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
      type: "roi",
      variant: "calculator",
      eyebrow: "Payback calculator",
      h2: [
        "Robot system value calculator"
      ],
      id: "roi-h",
      intro: [
        "Discover the potential cost savings of robotic palletizing over a 20-year system life. Enter your line data to see the preview; your work email unlocks the full breakdown."
      ]
    },
    {
      type: "prose",
      theme: "light",
      h2: [
        "Palletizer ROI calculator key facts"
      ],
      id: "palletizer-roi-calculator-key-facts",
      body: [
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
                  "What it estimates"
                ]
              },
              {
                spans: [
                  "An initial payback estimate for a robotic palletizer"
                ]
              }
            ],
            [
              {
                spans: [
                  "Labor reference"
                ]
              },
              {
                spans: [
                  "Reference production wages by state from public U.S. Bureau of Labor Statistics data, base wage without payroll costs, editable"
                ]
              }
            ],
            [
              {
                spans: [
                  "Method"
                ]
              },
              {
                spans: [
                  "The method of the A3 (Association for Advancing Automation) Robot System Value Calculator, in six steps below; electricity uses public U.S. Energy Information Administration state rates"
                ]
              }
            ],
            [
              {
                spans: [
                  "Scale of automation"
                ]
              },
              {
                spans: [
                  "The system price and the electricity scale with the number of people per shift doing the work today, as set out in steps 2 and 3 below"
                ]
              }
            ],
            [
              {
                spans: [
                  "Not included"
                ]
              },
              {
                spans: [
                  "Installation, other utilities, integration with your line, financing, taxes and layout changes"
                ]
              }
            ],
            [
              {
                spans: [
                  "Access"
                ]
              },
              {
                spans: [
                  "Free; the preview is immediate and a work email shows the full breakdown"
                ]
              }
            ]
          ]
        }
      ]
    },
    {
      type: "prose",
      theme: "dark",
      h2: [
        "What do you enter in the calculator?"
      ],
      id: "what-do-you-enter-in-the-calculator",
      body: [
        {
          k: "p",
          spans: [
            "Every input is visible and editable."
          ]
        },
        {
          k: "table",
          head: [
            [
              "Input"
            ],
            [
              "What it means"
            ],
            [
              "Where to find it"
            ]
          ],
          rows: [
            [
              {
                spans: [
                  "Platform"
                ]
              },
              {
                spans: [
                  {
                    k: "pn",
                    platform: "Cobot"
                  },
                  ", ",
                  {
                    k: "pn",
                    platform: "Compact"
                  },
                  " or ",
                  {
                    k: "pn",
                    platform: "Speed"
                  },
                  ", which loads the reference list price, or Custom, where you enter your own system cost"
                ]
              },
              {
                spans: [
                  "Your shortlist, quote or budget"
                ]
              }
            ],
            [
              {
                spans: [
                  "Location"
                ]
              },
              {
                spans: [
                  "The state where the plant operates; fills the electricity rate and a reference hourly labor rate"
                ]
              },
              {
                spans: [
                  "Plant address"
                ]
              }
            ],
            [
              {
                spans: [
                  "Hourly labor rate per person"
                ]
              },
              {
                spans: [
                  "The average production wage for your location; override it with your actual rate"
                ]
              },
              {
                spans: [
                  "Payroll"
                ]
              }
            ],
            [
              {
                spans: [
                  "People per shift"
                ]
              },
              {
                spans: [
                  "People currently performing this work on each shift; also sets the scale of automation"
                ]
              },
              {
                spans: [
                  "Shift staffing"
                ]
              }
            ],
            [
              {
                spans: [
                  "Hours, shifts and days"
                ]
              },
              {
                spans: [
                  "Hours per shift, number of shifts and days per week the palletizing area runs"
                ]
              },
              {
                spans: [
                  "Production schedule"
                ]
              }
            ],
            [
              {
                spans: [
                  "Work email"
                ]
              },
              {
                spans: [
                  "Needed for the full breakdown and to let ",
                  {
                    k: "pn"
                  },
                  " follow up on your project"
                ]
              },
              {
                spans: [
                  "Your company email"
                ]
              }
            ]
          ]
        },
        {
          k: "p",
          spans: [
            "Choosing a platform loads its reference list price, EX Works Lenexa, Kansas, installation not included:"
          ]
        },
        {
          k: "table",
          head: [
            [
              "Platform"
            ],
            [
              "Reference list price"
            ]
          ],
          rows: [
            [
              {
                spans: [
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
                  " Dual"
                ]
              },
              {
                spans: [
                  "US$ 120,000"
                ]
              }
            ],
            [
              {
                spans: [
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
                  " Dual"
                ]
              },
              {
                spans: [
                  "US$ 180,000"
                ]
              }
            ],
            [
              {
                spans: [
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
                  " 100"
                ]
              },
              {
                spans: [
                  "US$ 350,000"
                ]
              }
            ]
          ]
        },
        {
          k: "p",
          spans: [
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
            " and a ",
            {
              k: "a",
              t: "custom palletizer",
              to: "/robotic-palletizing/custom-palletizer/"
            },
            " are quoted per application, so choose Custom and enter your quote or budget."
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
        "How does the calculator estimate payback?"
      ],
      id: "how-does-the-calculator-estimate-payback",
      body: [
        {
          k: "p",
          spans: [
            "The calculator follows the method of the A3 (Association for Advancing Automation) Robot System Value Calculator and compares the labor cost of manual palletizing with the cost of owning and operating a robotic system over a 20-year period, the period used by the A3 method:"
          ]
        },
        {
          k: "ol",
          items: [
            [
              {
                k: "b",
                t: "Manual labor per year"
              },
              " = people per shift × hours per shift × number of shifts × days per week × 52 weeks × hourly labor rate."
            ],
            [
              {
                k: "b",
                t: "Adjusted system price"
              },
              " = reference price × the scale of automation for your workforce (1 to 2 workers per shift: 1x; 3 to 4: 1.5x; 5 to 6: 1.95x; 7 to 9: 2.5x; 10 or more: 3.3x)."
            ],
            [
              {
                k: "b",
                t: "Electricity per year"
              },
              " = annual operating hours × your location's electricity rate × a 20 kW reference draw × an electricity multiplier of 1x (1 to 2 workers), 2x (3 to 4), 3x (5 to 6), 4x (7 to 9) or 5x (10 or more)."
            ],
            [
              {
                k: "b",
                t: "Total system cost"
              },
              " = adjusted system price + maintenance at 5% of that price per year for 20 years."
            ],
            [
              {
                k: "b",
                t: "Break-even, in years"
              },
              " = total system cost ÷ (manual labor per year minus electricity per year)."
            ],
            [
              {
                k: "b",
                t: "20-year labor savings"
              },
              " = manual labor over 20 years minus the robotic system over 20 years (total system cost plus 20 years of electricity)."
            ]
          ]
        },
        {
          k: "p",
          spans: [
            "The method is simple and undiscounted, so anyone can rebuild it in a spreadsheet and carry the annual figures into a net present value model."
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
      theme: "dark",
      sticky: true,
      imgMode: "cover",
      h2: [
        "Which inputs move robotic palletizer payback the most?"
      ],
      id: "which-inputs-move-robotic-palletizer-payback-the-most",
      body: [
        {
          k: "p",
          spans: [
            "Test these four inputs one at a time:"
          ]
        },
        {
          k: "ul",
          items: [
            [
              {
                k: "b",
                t: "Shifts."
              },
              " The investment is paid once while the labor savings repeat on every shift, so payback falls as shifts increase."
            ],
            [
              {
                k: "b",
                t: "People per shift."
              },
              " Count only the people who would leave the task. A realistic figure protects the credibility of your request."
            ],
            [
              {
                k: "b",
                t: "Labor rate."
              },
              " The location reference is an average production wage. Replace it with your actual rate when you know it."
            ],
            [
              {
                k: "b",
                t: "System cost."
              },
              " A reference list price without installation and integration makes payback look shorter than it will be; use Custom to test your quote."
            ]
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
      type: "faq",
      eyebrow: "Questions",
      h2: "Frequently asked questions",
      id: "frequently-asked-questions",
      items: [
        {
          q: [
            "What Is the Typical Payback Period for a Robotic Palletizer?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "There is no single typical figure. Payback depends on the labor hours the palletizer replaces, shifts per day, local labor cost and the cost of the system you buy. The calculator applies the method on this page to your inputs, and a ",
                {
                  k: "pn"
                },
                " Sales Engineer completes the estimate with the installed scope of your project."
              ]
            }
          ]
        },
        {
          q: [
            "Where Does the Reference Labor Rate Come From?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "The reference hourly rate for each state is a production wage from public U.S. Bureau of Labor Statistics data, a base wage without payroll costs. It fills in when you select your state, and you can edit it at any time. Use your own loaded rate, including benefits, when you present the estimate to finance."
              ]
            }
          ]
        },
        {
          q: [
            "Is the Calculator Result a Quote?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "No. The result is an initial planning estimate built from your inputs and reference data. Your final price and payback come from a quote, which a ",
                {
                  k: "pn"
                },
                " Sales Engineer prepares after validating the platform, tooling, pallet patterns, conveyors, installation and integration for your line."
              ]
            }
          ]
        },
        {
          q: [
            "Can I Use This Calculator for a Case Packer?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "The calculator is built for palletizing, and its platform list covers ",
                {
                  k: "pn",
                  platform: "Cobot"
                },
                ", ",
                {
                  k: "pn",
                  platform: "Compact"
                },
                " and ",
                {
                  k: "pn",
                  platform: "Speed"
                },
                ". The labor logic is similar for case packing: the manual labor removed, compared with the cost of the system. For ",
                {
                  k: "pn",
                  platform: "Rapidpack"
                },
                ", ",
                {
                  k: "pn",
                  platform: "Onepack"
                },
                " or ",
                {
                  k: "pn",
                  platform: "Droppack"
                },
                ", talk with a ",
                {
                  k: "pn"
                },
                " Sales Engineer about your products and rates on the ",
                {
                  k: "a",
                  t: "case packing",
                  to: "/case-packing/"
                },
                " page."
              ]
            }
          ]
        },
        {
          q: [
            "Why Does the Calculator Ask for a Work Email?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "The preview appears as you type. The work email unlocks the full breakdown and lets ",
                {
                  k: "pn"
                },
                " follow up with a Sales Engineer who starts from your numbers instead of a blank page. Personal email domains are not accepted. ",
                {
                  k: "pn"
                },
                " uses your email and inputs to send the estimate and follow up about your project, as described in the ",
                {
                  k: "a",
                  t: "Privacy Policy",
                  to: "/privacy-policy/"
                },
                "."
              ]
            }
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
        "Calculate your payback, then talk with our Sales Engineer"
      ],
      id: "calculate-your-payback-then-talk-with-our-sales-engineer",
      body: [
        {
          k: "p",
          spans: [
            "Run the calculator with your own staffing, shifts and state, test two or three investment levels and keep the scenario your finance team would recognize as realistic. Keep the ",
            {
              k: "a",
              t: "robotic palletizer cost guide",
              to: "/robotic-palletizing/robotic-palletizer-cost/"
            },
            " open next to the result, and see the ",
            {
              k: "a",
              t: "tools page",
              to: "/tools/"
            },
            " for the data checklist."
          ]
        },
        {
          k: "ctas",
          ctas: [
            {
              label: "Calculate My Payback",
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
        base: "trf-w-cleanflow",
        single: false,
        alt: "TRFCleanflow hygienic food conveyor",
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
