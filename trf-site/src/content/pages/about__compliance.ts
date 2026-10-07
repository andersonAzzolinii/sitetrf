import type { Page } from '../types';

/* GERADO por scripts/extract-content.mjs — nao editar a mao. */
export const page_about__compliance: Page = {
  route: "/about/compliance/",
  title: "Integrity and Compliance | TRF Industrial Automation",
  description: "The Integrity and Compliance Policy that applies to TRF Industrial Automation, and the confidential ombudsman channel to report a concern.",
  ogImage: "/assets/og/about-compliance.jpg",
  breadcrumbs: [
    {
      label: "Home",
      to: "/"
    },
    {
      label: "About",
      to: "/about/"
    },
    {
      label: "Compliance"
    }
  ],
  blocks: [
    {
      type: "hero",
      variant: "compact",
      eyebrow: "About / Compliance",
      h1: [
        "Integrity and compliance: Our policy and how ",
        {
          k: "lime",
          t: "to report a concern."
        }
      ],
      solution: [
        "The published policy and a confidential channel to report concerns, with or without identification."
      ],
      img: {
        base: "trf-plant-compliance",
        single: false,
        alt: "",
        sizes: "100vw",
        width: 1920,
        height: 1080,
        eager: true
      }
    },
    {
      type: "prose",
      theme: "light",
      h2: [
        "What does the integrity and compliance policy cover?"
      ],
      id: "what-does-the-integrity-and-compliance-policy-cover",
      body: [
        {
          k: "p",
          spans: [
            "The policy is organized in the commitments below. The full text is in the published document."
          ]
        },
        {
          k: "checks",
          items: [
            [
              {
                k: "b",
                t: "Code of conduct."
              },
              " Ethical and transparent behavior; respect, dignity and fairness for everyone; no harassment or coercion; compliance with internal rules, laws and regulations; protection of confidential information, the brand and personal data; respect for the environment; and the duty to report any indication of a violation through the official channels."
            ],
            [
              {
                k: "b",
                t: "Information security and industrial property."
              },
              " Everyone who interacts with the company is responsible for protecting internal information and the materials shared through its systems."
            ],
            [
              {
                k: "b",
                t: "Privacy and data protection."
              },
              " Personal information of customers, employees, suppliers, service providers and partners is treated with care and in accordance with the applicable data protection law."
            ],
            [
              {
                k: "b",
                t: "Respect for people and equal opportunities."
              },
              " No form of prejudice is tolerated; internationally recognized human rights are respected; child labor, forced labor and slavery are not tolerated anywhere in the chain of operations, suppliers, partners and customers."
            ],
            [
              {
                k: "b",
                t: "Fighting corruption and bribery."
              },
              " No bribes, kickbacks or facilitation payments, directly or indirectly, in line with the Brazilian anti-corruption law, the U.S. Foreign Corrupt Practices Act (FCPA) and the UK Bribery Act."
            ],
            [
              {
                k: "b",
                t: "Conflict of interest, gifts and presents."
              },
              " Employees act in harmony with the company's interests; gifts, presents or hospitality in exchange for personal benefit or favoritism are prohibited."
            ],
            [
              {
                k: "b",
                t: "Relationship with third parties."
              },
              " Partners and suppliers are expected to act with ethics, social and environmental responsibility and in compliance with anti-corruption laws."
            ],
            [
              {
                k: "b",
                t: "Sustainable development."
              },
              " Environmental, social and governance (ESG) practices, compliance with environmental legislation and priority to products and services with low environmental impact, aligned with the United Nations Sustainable Development Goals."
            ]
          ]
        },
        {
          k: "go",
          label: "Read the Integrity and Compliance Policy (PDF)",
          to: "/assets/docs/TRF-Integrity-and-Compliance-Policy-Rev01.pdf/"
        }
      ]
    },
    {
      type: "prose",
      theme: "dark",
      h2: [
        "How do I report a concern?"
      ],
      id: "how-do-i-report-a-concern",
      body: [
        {
          k: "p",
          spans: [
            "Use the ombudsman channel below. Any employee, customer, supplier, partner or other stakeholder can report a situation that indicates a violation or potential violation of ethical principles, policies, laws and regulations, discrimination, health and safety issues, working conditions or any other improper conduct. Under the policy, reports are confidential and may be anonymous, and the Integrity and Ethics Committee handles issues related to integrity, ethics and compliance."
          ]
        },
        {
          k: "p",
          spans: [
            "Customers with a machine that needs attention should use the ",
            {
              k: "a",
              t: "Parts and Service",
              to: "/parts-and-service/"
            },
            " page. This channel is only for compliance concerns."
          ]
        }
      ]
    },
    {
      type: "roi",
      variant: "ombudsman",
      eyebrow: "Ombudsman channel",
      h2: [
        "Report a concern"
      ],
      id: "omb-h",
      intro: [
        "This channel is confidential. You may identify yourself or report anonymously: name and email are optional. Reports go to the Integrity and Ethics Committee. You can also write directly to ",
        {
          k: "a",
          t: "ouvidoria@torfresma.com",
          href: "mailto:ouvidoria@torfresma.com"
        },
        "."
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
