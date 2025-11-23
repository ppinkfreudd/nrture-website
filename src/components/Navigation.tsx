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
  description?: string;
  columns?: number;
  splitAfter?: number;
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
    label: "Product",
    href: "#elara",
    menu: {
      sections: [
        {
          title: "Solutions",
          columns: 3,
          links: [
            {
              label: "Elara — AI Social Reputation Manager",
              href: "#solution",
              description:
                "Elara replies to every review 24×7 and helps strengthen reputation.",
            },
            {
              label: "Emotion-to-Spend Intelligence Report",
              href: "#intelligence",
              description:
                "Your monthly report revealing drivers that shape guest spend.",
            },
            {
              label: "Peer Benchmarking Report",
              href: "#intelligence",
              description:
                "A comparison against selected peers' reputation.",
            },
            {
              label: "Social Reputation Dashboard",
              href: "#intelligence",
              description:
                "A real-time visual view of reputation trends and operational hotspots.",
            },
            {
              label: "Conversational AI — Ask Elara Anything",
              href: "#intelligence",
              description:
                "Speak and and receive instant insights, explanations, comparisons and recommended actions.",
            },
            {
              label: "Strategic + Enterprise Intelligence",
              href: "#intelligence",
              description:
                "Portfolio-level analytics, training recommendations and monthly strategic debriefs through our bespoke consulting services.",
            },
            {
              label: "Destination & Region-wide Intelligence",
              href: "#toronto",
              description:
                "Cities, councils and tourism offices receive regional sentiment and visitor-journey insights.",
            },
          ],
        },
      ],
    },
  },
  {
    label: "Solutions",
    href: "#solutions",
    menu: {
      sections: [
        {
          title: "Experience Businesses",
          description: "Reputation intelligence for venues that serve, host, move, and entertain visitors.",
          splitAfter: 4,
          links: [
            {
              label: "Eat & Drink",
              href: "#solutions-food",
              description: "Restaurants, cafés, bars, breweries, and airport F&B brands.",
            },
            {
              label: "Stay",
              href: "#solutions-hospitality",
              description: "Hotels, short stays, resorts, hostels, and holiday parks.",
            },
            {
              label: "Explore",
              href: "#solutions-attractions",
              description: "Attractions, museums, wildlife parks, tours, and events.",
            },
            {
              label: "Shop",
              href: "#solutions-retail",
              description: "Retail, markets, airport stores, and duty free programs.",
            },
            {
              label: "Travel",
              href: "#solutions-airport",
              description: "Airports, lounges, cruises, ferries, and multimodal hubs.",
            },
            {
              label: "Wellness",
              href: "#solutions-wellness",
              description: "Spas, retreats, and wellness centres meeting elevated guest expectations.",
            },
            {
              label: "Local Culture",
              href: "#solutions-culture",
              description: "Indigenous experiences, regional storytelling, and heritage attractions.",
            },
          ],
        },
        {
          title: "Visitor Economy",
          description:
            "Destination-wide sentiment for tourism brands, cities, and councils. Tools that help destinations stay ahead of issues.",
          links: [
            {
              label: "Tourism & City Brands",
              href: "#solutions-government",
              description: "Monitor hotels, attractions, and transport sentiment in one feed to protect regional reputation 24×7.",
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
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "About Us",
  },
];

export function Navigation() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
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
    setIsMobileMenuOpen(false);
    setExpandedMobileItem(null);
    if (hasMenu) {
      cancelClose();
      setActiveMenu(label);
    } else {
      setActiveMenu(null);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setExpandedMobileItem(null);
  };

  const handleMobileItemToggle = (item: NavItem) => {
    if (!item.menu) {
      setIsMobileMenuOpen(false);
      setExpandedMobileItem(null);
      return;
    }

    setExpandedMobileItem((prev) => (prev === item.label ? null : item.label));
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
        className="absolute left-1/2 top-full z-40 mt-3 w-[min(1100px,calc(100vw-3rem))] -translate-x-1/2 rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_40px_120px_rgba(15,23,42,0.18)]"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="flex flex-col gap-6">
          <div className={`grid gap-6 ${gridColsClass}`}>
            {item.menu.sections.map((section, index) => {
              let groups: MenuLink[][];
              if (section.columns) {
                const chunkSize = Math.ceil(section.links.length / section.columns);
                groups = [];
                for (let i = 0; i < section.links.length; i += chunkSize) {
                  groups.push(section.links.slice(i, i + chunkSize));
                }
              } else if (section.splitAfter) {
                groups = [
                  section.links.slice(0, section.splitAfter),
                  section.links.slice(section.splitAfter),
                ].filter((group) => group.length > 0);
              } else {
                groups = [section.links];
              }

              const columnCount = groups.length;
              const desktopGridClass =
                columnCount >= 3 ? "md:grid-cols-3" : columnCount === 2 ? "md:grid-cols-2" : "";
              const mobileGridClass =
                columnCount >= 3 ? "sm:grid-cols-3" : columnCount === 2 ? "sm:grid-cols-2" : "";

              return (
                <div
                  key={`${section.title || "section"}-${index}`}
                  className="space-y-3 border-t border-neutral-200 pt-4 first:border-none first:pt-0 md:border-t-0 md:border-l md:border-neutral-200 md:pl-6 md:pt-0 md:first:border-l-0 md:first:pl-0"
                >

                  {section.title && (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{section.title}</p>
                      {section.description && <p className="text-xs text-neutral-400">{section.description}</p>}
                    </div>
                  )}

                  <div className={`grid gap-4 ${desktopGridClass}`}>
                    {groups.map((group, groupIndex) => (
                      <ul
                        key={`${section.title || "section"}-${index}-${groupIndex}`}
                        className="space-y-2 text-sm text-neutral-600"
                      >
                        {group.map((link) => (
                          <li key={link.label}>
                            <a href={link.href} className="group inline-flex flex-col gap-1">
                              <span className="font-semibold text-neutral-900 group-hover:text-brand-600">{link.label}</span>
                              {link.description && (
                                <span className="text-xs text-neutral-500">
                                  ↳ {link.description}
                                </span>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              );
            })}
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

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const originalOverflow = document.body.style.overflow;
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 bg-transparent px-3 py-3 sm:top-4 sm:px-4">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[999px] bg-gradient-to-r from-[#D46BFF] via-[#F9B4F1] to-[#4B8BFF] p-[1px] shadow-[0_18px_55px_rgba(15,23,42,0.22)]">
          <div className="flex w-full items-center justify-between gap-2 rounded-[999px] border border-white/40 bg-white/70 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-2xl sm:gap-5 sm:px-6 sm:py-3 md:gap-6 md:px-7">
            <a href="/" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 rounded-full p-1 -m-1">
              <img src={logo} alt="nrtureAI logo" className="h-8 w-auto sm:h-10 md:h-12" />
            </a>

            <nav className="relative hidden items-center gap-5 text-sm font-semibold text-neutral-900 xl:flex xl:flex-1 xl:justify-center">
              {navItems.map((item) => {
                const isActive = activeMenu === item.label;
                const hasMenu = Boolean(item.menu);
                const isDisabled = !hasMenu && !item.href;
                const linkClasses = [
                  "inline-flex items-center gap-2 rounded-full px-3 py-2 transition focus:outline-none",
                  isDisabled
                    ? "cursor-default text-neutral-400 hover:text-neutral-400"
                    : "hover:text-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-300",
                ].join(" ");

                return (
                  <div key={item.label} onMouseEnter={() => handleOpen(item.label, hasMenu)} onMouseLeave={scheduleClose}>
                    <a
                      href={item.href}
                      className={linkClasses}
                      onFocus={() => handleOpen(item.label, hasMenu)}
                      tabIndex={isDisabled ? -1 : undefined}
                      aria-disabled={isDisabled || undefined}
                    >
                      {item.label}
                      {hasMenu && <span aria-hidden="true" className="text-xs text-neutral-500">{isActive ? "-" : "+"}</span>}
                    </a>
                    {hasMenu && isActive && renderMenu(item)}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 sm:gap-3 sm:text-sm">
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white/70 text-neutral-900 transition hover:border-neutral-500 hover:text-neutral-700 xl:hidden"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
              >
                <span className="sr-only">Toggle menu</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5 4h4a1 1 0 0 1 1 1v4H6a1 1 0 0 1-1-1V4Z" />
                  <path d="M11 4h4a1 1 0 0 1 1 1v4h-4a1 1 0 0 1-1-1V4Z" />
                  <path d="M5 11h4a1 1 0 0 1 1 1v4H6a1 1 0 0 1-1-1v-4Z" />
                  <path d="M11 11h4a1 1 0 0 1 1 1v4h-4a1 1 0 0 1-1-1v-4Z" />
                </svg>
              </button>
              <a
                href="https://elara.nrture.ai/book-a-demo/"
                className="hidden rounded-full border border-neutral-300 px-3 py-1.5 transition hover:border-neutral-500 hover:text-neutral-700 sm:inline-flex sm:px-4 sm:py-2"
              >
                Request a demo
              </a>
              <a
                href="https://elara.nrture.ai/"
                className="rounded-full bg-neutral-900 px-4 py-1.5 text-white shadow-sm transition hover:bg-neutral-700 sm:px-5 sm:py-2"
              >
                Login
              </a>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div
            id="mobile-nav"
            className="mt-3 h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] overscroll-contain rounded-[32px] border border-neutral-200 bg-white px-4 py-5 text-neutral-900 xl:hidden overflow-hidden"
          >
            <div className="h-full space-y-5 overflow-y-auto pr-2">
              <div className="space-y-4">
                {navItems.map((item) => {
                  const hasMenu = Boolean(item.menu);
                  const isExpanded = expandedMobileItem === item.label;

                  if (hasMenu && item.menu) {
                    return (
                      <div key={item.label} className="space-y-3">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                          onClick={() => handleMobileItemToggle(item)}
                        >
                          <span>{item.label}</span>
                          <span className="text-xs text-neutral-500">{isExpanded ? "-" : "+"}</span>
                        </button>

                        {isExpanded && (
                          <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-700">
                            {item.menu.sections.map((section, index) => {
                              let groups: MenuLink[][];
                              if (section.columns) {
                                const chunkSize = Math.ceil(section.links.length / section.columns);
                                groups = [];
                                for (let i = 0; i < section.links.length; i += chunkSize) {
                                  groups.push(section.links.slice(i, i + chunkSize));
                                }
                              } else if (section.splitAfter) {
                                groups = [
                                  section.links.slice(0, section.splitAfter),
                                  section.links.slice(section.splitAfter),
                                ].filter((group) => group.length > 0);
                              } else {
                                groups = [section.links];
                              }

                              const mobileGridClass =
                                groups.length >= 3 ? "sm:grid-cols-3" : groups.length === 2 ? "sm:grid-cols-2" : "";

                              return (
                                <div key={`${section.title || "section"}-${index}`} className="space-y-2">
                                  {section.title && (
                                    <div className="space-y-1">
                                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{section.title}</p>
                                      {section.description && (
                                        <p className="text-xs text-neutral-400">{section.description}</p>
                                      )}
                                    </div>
                                  )}

                                  <div className={`grid gap-1.5 ${mobileGridClass}`}>
                                    {groups.map((group, groupIndex) => (
                                      <ul
                                        key={`${section.title || "section"}-${index}-${groupIndex}`}
                                        className="space-y-1.5"
                                      >
                                        {group.map((link) => (
                                          <li key={link.label}>
                                            <a
                                              href={link.href}
                                              className="block rounded-xl px-2 py-1.5 text-neutral-800 transition hover:bg-white"
                                              onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setExpandedMobileItem(null);
                                              }}
                                            >
                                              <span className="font-semibold">{link.label}</span>
                                              {link.description && (
                                                <span className="mt-1 block text-xs text-neutral-500">↳ {link.description}</span>
                                              )}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={item.label} className="space-y-3">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>{item.label}</span>
                          <span className="text-xs text-neutral-400">›</span>
                        </a>
                      ) : (
                        <div className="flex w-full items-center justify-between rounded-2xl bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-400">
                          <span>{item.label}</span>
                          <span className="text-xs">Coming soon</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="#book-demo"
                  className="rounded-full border border-neutral-300 px-4 py-2 text-center text-sm font-semibold text-neutral-900 transition hover:border-neutral-500 hover:text-neutral-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Request a demo
                </a>
                <a
                  href="/login"
                  className="rounded-full bg-neutral-900 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
