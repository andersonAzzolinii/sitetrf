import type { Page } from '../types';

/* GERADO por scripts/extract-content.mjs — nao editar a mao. */
export const page_privacy_choices: Page = {
  route: "/privacy-choices/",
  title: "Your Privacy Choices | TRF Industrial Automation",
  description: "Opt out of the sale or sharing of personal information and submit a privacy request to TRF Industrial Automation. Global Privacy Control is honored.",
  ogImage: "/assets/og/privacy-choices.jpg",
  breadcrumbs: [
    {
      label: "Home",
      to: "/"
    },
    {
      label: "Your Privacy Choices"
    }
  ],
  blocks: [
    {
      type: "hero",
      variant: "compact",
      eyebrow: "Your Privacy Choices",
      h1: [
        "Your privacy ",
        {
          k: "lime",
          t: "choices."
        }
      ],
      solution: [
        "Opt out, access, correct or delete your personal information."
      ],
      img: {
        base: "trf-plant-privacy-choices",
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
      variant: "optOut",
      eyebrow: "Privacy request",
      h2: [
        "Submit your privacy request"
      ],
      id: "pr-h",
      intro: [
        "Use this form to opt out or to ask for access, correction or deletion. ",
        {
          k: "pn"
        },
        " uses the information only to verify and answer your request."
      ]
    },
    {
      type: "prose",
      theme: "light",
      h2: [
        "Do not sell or share my personal information"
      ],
      id: "do-not-sell-or-share-my-personal-information",
      body: [
        {
          k: "p",
          spans: [
            {
              k: "pn"
            },
            " Industrial Automation does not sell personal information and does not share personal information for cross-context behavioral advertising. You can still record an opt-out request at any time with the form on this page, and ",
            {
              k: "pn"
            },
            " will apply it to any future processing tied to your email address."
          ]
        }
      ]
    },
    {
      type: "prose",
      theme: "dark",
      h2: [
        "Global privacy control"
      ],
      id: "global-privacy-control",
      body: [
        {
          k: "p",
          spans: [
            "If your browser or extension sends a Global Privacy Control (GPC) signal, trfautomation.com treats it as a valid request to opt out of the sale or sharing of personal information for that browser, without any further action from you."
          ]
        }
      ]
    },
    {
      type: "prose",
      theme: "light",
      h2: [
        "Access, correction and deletion requests"
      ],
      id: "access-correction-and-deletion-requests",
      body: [
        {
          k: "p",
          spans: [
            "You can also use the form on this page to ask ",
            {
              k: "pn"
            },
            " to tell you what personal information it holds about you, to correct it, or to delete it. ",
            {
              k: "pn"
            },
            " verifies each request by matching the email address you provide with the information on file and responds within 45 days. There is no fee, and ",
            {
              k: "pn"
            },
            " does not discriminate against anyone for exercising these rights."
          ]
        }
      ]
    },
    {
      type: "prose",
      theme: "dark",
      h2: [
        "Authorized agents"
      ],
      id: "authorized-agents",
      body: [
        {
          k: "p",
          spans: [
            "An authorized agent can submit a request on your behalf. ",
            {
              k: "pn"
            },
            " may ask for written permission signed by you and may ask you to confirm your identity directly before acting on the request."
          ]
        }
      ]
    },
    {
      type: "prose",
      theme: "light",
      h2: [
        "Other ways to reach ",
        {
          k: "pn"
        }
      ],
      id: "other-ways-to-reach-trf",
      body: [
        {
          k: "p",
          spans: [
            "You can also call ",
            {
              k: "pn"
            },
            " Industrial Automation at (913) 242-8019 or write to 14840 W 107th St, Lenexa, KS 66215, United States. Details on how ",
            {
              k: "pn"
            },
            " collects and uses information are in the ",
            {
              k: "a",
              t: "Privacy Policy",
              to: "/privacy-policy/"
            },
            ", and the terms that govern this website are in the ",
            {
              k: "a",
              t: "Terms of Use",
              to: "/terms-of-use/"
            },
            "."
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
