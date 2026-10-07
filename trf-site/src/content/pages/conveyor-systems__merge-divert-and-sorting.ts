import type { Page } from '../types';

/* GERADO por scripts/extract-content.mjs — nao editar a mao. */
export const page_conveyor_systems__merge_divert_and_sorting: Page = {
  route: "/conveyor-systems/merge-divert-and-sorting/",
  title: "Merge and Divert Conveyors and Sorting Systems | TRF",
  description: "Merge and divert conveyors from TRF route cases from several lines to the right palletizer or lane, with sorting and reject. Talk with our Sales Engineer.",
  ogImage: "/assets/og/conveyor-systems-merge-divert-and-sorting.jpg",
  breadcrumbs: [
    {
      label: "Home",
      to: "/"
    },
    {
      label: "Conveyor Systems",
      to: "/conveyor-systems/"
    },
    {
      label: "Merge, Divert and Sorting"
    }
  ],
  blocks: [
    {
      type: "hero",
      variant: "image",
      eyebrow: "Conveyor Systems / Merge, Divert and Sorting",
      h1: [
        "Merge and divert conveyors for ",
        {
          k: "lime",
          t: "case routing."
        }
      ],
      solution: [
        "Routing modules that combine lines, send each case to its destination and remove nonconforming units."
      ],
      lead: [
        "Merge and divert conveyors are the routing part of a conveyor line: a merge combines cases from several lines onto one path, a divert sends a case to another lane, sorting directs each case to its destination and a reject station removes nonconforming units. ",
        {
          k: "pn"
        },
        " Industrial Automation engineers these modules inside ",
        {
          k: "pn",
          platform: "Intraflow"
        },
        ", always as part of a complete line."
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
        base: "trfintraflow-application",
        single: false,
        alt: "Merge and divert modules routing cases from two packaging lines to a shared palletizing area on a TRFIntraflow line.",
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
        "Key facts about merge, divert and sorting"
      ],
      id: "key-facts-about-merge-divert-and-sorting",
      body: [
        {
          k: "table",
          head: [
            [
              "Item"
            ],
            [
              "Routing modules"
            ]
          ],
          rows: [
            [
              {
                spans: [
                  "What it is"
                ]
              },
              {
                spans: [
                  "The Routing module family of ",
                  {
                    k: "pn",
                    platform: "Intraflow"
                  },
                  ", engineered into a complete conveyor system"
                ]
              }
            ],
            [
              {
                spans: [
                  "Standard modules"
                ]
              },
              {
                spans: [
                  "Merge, divert, sorting and reject station"
                ]
              }
            ],
            [
              {
                spans: [
                  "Items handled"
                ]
              },
              {
                spans: [
                  "Cases, cartons, trays, totes and other packaged units"
                ]
              }
            ],
            [
              {
                spans: [
                  "Where it runs"
                ]
              },
              {
                spans: [
                  "Between secondary packaging, case packing, palletizing and warehouse interfaces"
                ]
              }
            ],
            [
              {
                spans: [
                  "Main job"
                ]
              },
              {
                spans: [
                  "Bring several lines together, send each case to the right destination and remove nonconforming units"
                ]
              }
            ],
            [
              {
                spans: [
                  "Identification"
                ]
              },
              {
                spans: [
                  "Barcode and vision interfaces where the project requires them"
                ]
              }
            ],
            [
              {
                spans: [
                  "Throughput"
                ]
              },
              {
                spans: [
                  "No catalog speed figure; routing rates are defined per project around your line rates"
                ]
              }
            ],
            [
              {
                spans: [
                  "How it is supplied"
                ]
              },
              {
                spans: [
                  "Always inside an engineered system integrated into the line, never as loose components"
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
        "What is the difference between a merge, a divert and a sorting conveyor?"
      ],
      id: "what-is-the-difference-between-a-merge-a-divert-and-a-sorting-conveyor",
      body: [
        {
          k: "p",
          spans: [
            "A merge combines cases from two or more conveyors onto one path, a divert moves a case from the main path to another lane, and a sorting conveyor sends each case to an assigned destination based on product data, usually read from a barcode or by vision. A reject station, the fourth routing module, takes out cases that fail a check."
          ]
        },
        {
          k: "p",
          spans: [
            "In ",
            {
              k: "pn",
              platform: "Intraflow"
            },
            ", these four functions form the Routing family of standard modules, and they are useful only when the other families support them: a merge needs spacing, a sort needs identification and a divert needs somewhere for the case to go."
          ]
        },
        {
          k: "p",
          spans: [
            "A conveyor routing system therefore has two layers. The physical layer is the hardware that joins two streams, moves a case sideways or pulls it off the line. The information layer is the sensors, the PLC and the data that tell the hardware what to do with each case. ",
            {
              k: "pn"
            },
            " engineers both layers together, because a routing decision made without reliable information sends cases to the wrong place, and reliable information is of no use without hardware that acts on it at line rate."
          ]
        }
      ],
      img: {
        base: "trfintraflow-frame-5",
        single: false,
        alt: "TRFIntraflow conveyors merging cases, aerial view",
        sizes: "(max-width: 900px) 100vw, 33vw",
        width: 1600,
        height: 1000
      }
    },
    {
      type: "split",
      theme: "light",
      sticky: true,
      imgMode: "inline",
      h2: [
        "How does a conveyor merge combine several lines into one?"
      ],
      id: "how-does-a-conveyor-merge-combine-several-lines-into-one",
      body: [
        {
          k: "p",
          spans: [
            "A conveyor merge combines cases from two or more conveyors onto one path, so several packaging lines can share the equipment downstream, most often one palletizing area. It is the module that makes multi-line consolidation possible."
          ]
        },
        {
          k: "p",
          spans: [
            "A good merge is not just a place where two conveyors meet. If cases from both lines arrive at the same moment, they collide or jam. If one line always wins priority, the other backs up and its case packer stops. The merge is engineered with the modules around it: ",
            {
              k: "a",
              t: "accumulation and flow control",
              to: "/conveyor-systems/accumulation-and-flow-control/"
            },
            " holds cases from each line, metering releases them at a controlled rate and gapping creates the space the merge needs. Control logic decides how the lines take turns, for example alternating, weighted toward the busier line or based on which palletizer position needs product."
          ]
        },
        {
          k: "p",
          spans: [
            "Merging matters most when a plant wants to centralize palletizing. A ",
            {
              k: "a",
              t: "TRFSpeed high-speed palletizer",
              spans: [
                {
                  k: "pn",
                  platform: "Speed"
                },
                " high-speed palletizer"
              ],
              to: "/robotic-palletizing/high-speed-palletizer/"
            },
            " serving several lines needs one steady, well-spaced stream, and the merge, with its buffers and metering, is what produces it."
          ]
        }
      ],
      img: {
        base: "trf-w-intraflow",
        single: false,
        alt: "Divert module moving a case from the main conveyor to a side lane on a TRFIntraflow line.",
        sizes: "(max-width: 900px) 100vw, 900px",
        width: 1200,
        height: 900
      }
    },
    {
      type: "split",
      theme: "dark",
      sticky: true,
      imgMode: "cover",
      h2: [
        "When does a conveyor line need a divert?"
      ],
      id: "when-does-a-conveyor-line-need-a-divert",
      body: [
        {
          k: "p",
          spans: [
            "A conveyor line needs a divert wherever one stream must split into two or more. The reasons vary by plant and are defined with you during the application review:"
          ]
        },
        {
          k: "ul",
          items: [
            [
              "A second palletizing position, so a line keeps running when one palletizer or pallet position is busy."
            ],
            [
              "A manual station, for cases that need hand handling, sampling or repacking."
            ],
            [
              "A separate destination by SKU, customer or shipping route."
            ],
            [
              "A reject lane, where cases that fail a check leave the main flow."
            ],
            [
              "Balancing between two palletizers or two packing cells, so neither waits while the other is overloaded."
            ]
          ]
        },
        {
          k: "p",
          spans: [
            "A divert has to act on a single case without catching the next one, which is why it depends on gapping and on sensors that confirm the case position. The mechanism is selected for the case size, weight and packaging and the rate of the line during engineering. A lane that is full must be known to the control system, so it can choose another path or slow the flow."
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
      theme: "light",
      sticky: true,
      imgMode: "cover",
      h2: [
        "How does a conveyor sorting system identify each case?"
      ],
      id: "how-does-a-conveyor-sorting-system-identify-each-case",
      body: [
        {
          k: "p",
          spans: [
            "A conveyor sorting system identifies each case with a barcode reader or a vision interface and then directs it to its assigned destination. Where a divert follows a simple rule, sorting follows information carried by the case itself:"
          ]
        },
        {
          k: "ol",
          items: [
            [
              {
                k: "b",
                t: "Spacing."
              },
              " Gapping separates the cases so each one can be read individually."
            ],
            [
              {
                k: "b",
                t: "Identification."
              },
              " A barcode reader or vision interface reads the label or recognizes the case."
            ],
            [
              {
                k: "b",
                t: "Decision."
              },
              " The PLC compares the data with the routing rules of the plant, which may come from a warehouse management system where the project requires it."
            ],
            [
              {
                k: "b",
                t: "Action."
              },
              " Diverts send the case to its lane, and the count per lane is tracked."
            ],
            [
              {
                k: "b",
                t: "Exception."
              },
              " A case that cannot be read or does not match any rule goes to the reject station instead of being guessed at."
            ]
          ]
        },
        {
          k: "p",
          spans: [
            "Sorting helps keep SKUs from mixing on the pallet. When several lines feed a shared palletizer, each pallet must hold the correct product, and sorting is the step that sends the right case to the right pallet position."
          ]
        }
      ],
      img: {
        base: "conveyor-line-parcel-flow",
        single: false,
        alt: "Case conveyor system moving cases through a distribution flow",
        sizes: "(max-width: 900px) 100vw, 33vw",
        width: 1600,
        height: 1000
      }
    },
    {
      type: "split",
      theme: "dark",
      sticky: true,
      imgMode: "inline",
      h2: [
        "What does a reject station do on a conveyor line?"
      ],
      id: "what-does-a-reject-station-do-on-a-conveyor-line",
      body: [
        {
          k: "p",
          spans: [
            "A reject station removes cases that fail a check before they reach the palletizer or the warehouse, such as a case with an unreadable or mismatched code, a case that does not meet the expected profile or a case flagged by an upstream inspection device. A nonconforming case on a pallet can force rework, so removing it before palletizing keeps the pallet clean."
          ]
        },
        {
          k: "p",
          spans: [
            "The reject station is placed downstream of the reader or inspection device, with enough spacing to act on one case and a lane that leads to a location an operator can reach. It is connected to the control system, so the line can record rejected cases where the project requires it."
          ]
        },
        {
          k: "p",
          spans: [
            "Merge, divert, sorting and reject modules belong to ",
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
            ". For exposed food or hygienic zones, see ",
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
            "; both platforms are compared on the ",
            {
              k: "a",
              t: "conveyor systems page",
              to: "/conveyor-systems/"
            },
            ". Extended to case packing and palletizing, the same approach becomes ",
            {
              k: "a",
              t: "end-of-line integration",
              to: "/conveyor-systems/end-of-line-integration/"
            },
            "."
          ]
        }
      ],
      img: {
        base: "trfintraflow-application",
        single: false,
        alt: "Sorting and reject modules distributing cases from several lines to palletizing positions in a plant.",
        sizes: "(max-width: 900px) 100vw, 900px",
        width: 1600,
        height: 900
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
            "Can Several Packaging Lines Share One Palletizer?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "Yes. Merge modules bring the lines onto one path, with buffers and metering that give each line its turn, so a stop on one line does not have to stop the others, and sorting helps keep SKUs from mixing on the pallet. The sharing logic is engineered together with the palletizer interface: ",
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
                " is built to consolidate the flow of several lines, and a ",
                {
                  k: "a",
                  t: "custom palletizer",
                  to: "/robotic-palletizing/custom-palletizer/"
                },
                " covers layouts beyond the standard platforms."
              ]
            }
          ]
        },
        {
          q: [
            "Does Sorting Require a Warehouse Management System?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "No. Sorting can run on the product data read from the case and on rules held in the conveyor PLC. Where the plant uses a warehouse management system, ",
                {
                  k: "pn",
                  platform: "Intraflow"
                },
                " includes WMS and warehouse interfaces, so the routing rules can come from the plant's logistics system. That interface is defined during project engineering with the plant's IT team."
              ]
            }
          ]
        },
        {
          q: [
            "Can a Conveyor System Integrate With My Palletizer and Case Packer?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "Yes. Routing modules carry each case from the machine that packs it, such as ",
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
                " or ",
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
                ", to the palletizer or position that receives it, through defined interfaces. Signals such as lane full, palletizer ready and case rejected are engineered once, in a single control concept."
              ]
            }
          ]
        },
        {
          q: [
            "Which Industries Use Merge and Divert Conveyors?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "Plants with several packaging lines or many SKUs use them the most, including ",
                {
                  k: "a",
                  t: "food processing",
                  to: "/industries/food-processing/"
                },
                ", ",
                {
                  k: "a",
                  t: "protein processing",
                  to: "/industries/protein-processing/"
                },
                ", ",
                {
                  k: "a",
                  t: "personal care",
                  to: "/industries/personal-care-and-cosmetics/"
                },
                ", ",
                {
                  k: "a",
                  t: "CPG",
                  to: "/industries/consumer-packaged-goods/"
                },
                ", ",
                {
                  k: "a",
                  t: "beverage",
                  to: "/industries/beverage/"
                },
                " and ",
                {
                  k: "a",
                  t: "pet food",
                  to: "/industries/pet-food/"
                },
                " manufacturers."
              ]
            }
          ]
        },
        {
          q: [
            "What Information Is Needed to Design a Routing System?"
          ],
          a: [
            {
              k: "p",
              spans: [
                "Layout drawings, line rates, case dimensions and weights, the number of lines and destinations, the way cases are identified and the equipment the conveyors must connect to. A list of your SKUs and the routing rules you use today is often the most useful document to start with. The application review turns this into the module arrangement and the control logic."
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
        "Talk with our Sales Engineer about merge and divert conveyors"
      ],
      id: "talk-with-our-sales-engineer-about-merge-and-divert-conveyors",
      body: [
        {
          k: "p",
          spans: [
            "If several lines must reach one palletizing area, if SKUs must be routed to different lanes, or if cases are still sorted by hand, the next step is a flow review. Share your layout, line rates, case data and the routing rules you use today, and a ",
            {
              k: "pn"
            },
            " Sales Engineer will outline the merge, divert, sorting and reject modules your line needs, engineered as part of a complete ",
            {
              k: "pn",
              platform: "Intraflow"
            },
            " system. Start on the ",
            {
              k: "a",
              t: "contact page",
              to: "/contact/"
            },
            "."
          ]
        },
        {
          k: "ctas",
          ctas: [
            {
              label: "Talk with our Sales Engineer",
              variant: "pri",
              arrow: true,
              to: "/contact/"
            }
          ]
        }
      ],
      img: {
        base: "conveyor-line-distribution-center",
        single: false,
        alt: "Conveyor lines, merges and curves in a distribution center",
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
