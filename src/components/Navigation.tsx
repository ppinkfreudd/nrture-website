import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

type MenuLink = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

type MenuSection = {
  title: string;
  links: MenuLink[];
};

type NavItem = {
  label: string;
  href?: string;
  menu?: {
    sections: MenuSection[];
    footerNote?: string;
  };
};

const navItems: NavItem[] = [
  {
    label: "Solutions",
    href: "#solution",
    menu: {
      sections: [
        {
          title: "Airports",
          links: [
            {
              label: "24×7 Social Reputation Command",
              href: "#solutions-airport",
              description: "Unify lounges, terminals, and concessionaires under one review inbox with instant routing and board-ready benchmarks.",
            },
            {
              label: "Escalation Playbooks",
              href: "#solutions-airport",
              description: "Flag safety, ADA, and housekeeping incidents to duty managers with screenshots, sentiment, and recovery scripts.",
            },
            {
              label: "Peer Benchmarking",
              href: "#intelligence",
              description: "See how outlets stack up against peer airports and share Emotion-to-Spend deltas with the C-suite.",
            },
          ],
        },
        {
          title: "Food & Beverage",
          links: [
            {
              label: "Brand-true Reply Automation",
              href: "#solutions-food",
              description: "Draft and dispatch empathetic responses for every concept in minutes, not days—across Google, Tripadvisor, and surveys.",
            },
            {
              label: "Menu & Shift Intelligence",
              href: "#solutions-food",
              description: "Spot cold tacos, slow checkouts, or praise-worthy baristas before they hit revenue thanks to outlet-level insights.",
            },
            {
              label: "Launch Partner Program",
              href: "#book-demo",
              description: "Activate the ACI launch offer with personalised onboarding and a 36-month price lock for your portfolio.",
            },
          ],
        },
        {
          title: "Visitor Economy",
          links: [
            {
              label: "Tourism & City Brands",
              href: "#solutions-government",
              description: "Monitor hotels, attractions, and transport sentiment in one feed to protect city reputation 24×7.",
            },
            {
              label: "Emotion-to-Spend Briefings",
              href: "#intelligence",
              description: "Surface storylines that sway traveller spend and share monthly outlooks with stakeholders and boards.",
            },
            {
              label: "Stakeholder Escalations",
              href: "#solutions-government",
              description: "Route critical reviews straight to venue partners with context, severity, and recommended action.",
            },
          ],
        },
      ],
    },
  },
  {
    label: "Product",
    href: "#solution",
    menu: {
      sections: [
        {
          title: "Platform",
          links: [
            {
              label: "Elara Overview",
              href: "#solution",
              description: "Turn every review, image, and survey into a routed task with measurable ROI impact.",
            },
            {
              label: "Emotion-to-Spend Intelligence",
              href: "#intelligence",
              description: "Quarterly briefings that explain how feelings convert to spend across outlets and terminals.",
            },
            {
              label: "AI Agent Crew",
              href: "#intelligence",
              description: "Eight specialised agents that observe, infer, and reflect on social feedback around the clock.",
            },
          ],
        },
        {
          title: "Experience",
          links: [
            {
              label: "Playground & Demos",
              href: "#book-demo",
              description: "Get hands-on with Elara’s response studio or book a guided lap at Booth 212.",
            },
            {
              label: "Launch Partner Offer",
              href: "#talk-to-us",
              description: "Unlock founding partner pricing, personalised onboarding, and historical back-fill.",
            },
            {
              label: "Security & Compliance",
              href: "#security",
              description: "SOC-ready infrastructure, audit trails, and data residency controls for public venues.",
            },
          ],
        },
      ],
    },
  },
  {
    label: "Intelligence",
    href: "#intelligence",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export function Navigation() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = window.setTimeout(() => setActiveMenu(null), 160);
  };

  const handleOpen = (label: string, hasMenu: boolean) => {
    if (hasMenu) {
      cancelClose();
      setActiveMenu(label);
    } else {
      setActiveMenu(null);
    }
  };

  const renderMenu = (item: NavItem) => {
    if (!item.menu) return null;

    const gridColsClass =
      item.menu.sections.length === 1
        ? "md:grid-cols-1"
        : item.menu.sections.length === 2
          ? "md:grid-cols-2"
          : "md:grid-cols-3";

    return (
      <div
        className="absolute left-1/2 top-full z-40 mt-3 w-[min(860px,calc(100vw-3rem))] -translate-x-1/2 rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-md"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="flex flex-col gap-6">
          <div className={`grid gap-6 ${gridColsClass}`}>
            {item.menu.sections.map((section) => (
              <div key={section.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{section.title}</p>
                <ul className="space-y-3 text-sm text-neutral-600">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="group inline-flex flex-col gap-1">
                        <span className="font-semibold text-neutral-900 group-hover:text-brand-600">{link.label}</span>
                        {link.description && <span className="text-xs text-neutral-500">{link.description}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {item.menu.footerNote && (
            <p className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {item.menu.footerNote}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-10 px-6 py-5">
        <div className="flex items-center gap-3">
          <img src={logo} alt="nrtureAI logo" className="h-12 w-auto" />
        </div>

        <nav className="relative hidden items-center gap-8 text-sm font-medium text-black md:flex">
          {navItems.map((item) => {
            const isActive = activeMenu === item.label;
            const hasMenu = Boolean(item.menu);

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleOpen(item.label, hasMenu)}
                onMouseLeave={scheduleClose}
              >
                <a
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-neutral-800 transition hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
                  onFocus={() => handleOpen(item.label, hasMenu)}
                >
                  {item.label}
                  {hasMenu && <span aria-hidden="true" className="text-xs text-neutral-400">{isActive ? "-" : "+"}</span>}
                </a>
                {hasMenu && isActive && renderMenu(item)}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#book-demo"
            className="hidden rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:border-brand-500 hover:text-brand-600 md:inline-flex"
          >
            Playground
          </a>
          <a
            href="#talk-to-us"
            className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
          >
            Talk to Sales
          </a>
        </div>
      </div>
    </header>
  );
}
