type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Elara Overview", href: "#solution" },
      { label: "Emotion-to-Spend Intelligence", href: "#intelligence" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Food & Beverage", href: "#solutions-food" },
      { label: "Airport", href: "#solutions-airport" },
      { label: "Visitor Economy", href: "#solutions-government" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/nrtureai", external: true },
      { label: "YouTube", href: "https://www.youtube.com/@nrtureai", external: true },
      { label: "X", href: "https://twitter.com/nrtureai", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Security", href: "#security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white" id="contact">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-0 sm:px-6">
        <div className="grid gap-6 text-sm text-neutral-600 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <p className="font-semibold text-neutral-900">{section.title}</p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition hover:text-neutral-900"
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
