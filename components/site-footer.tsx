import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-zinc-500">
          Planning numbers only. Final pricing still depends on local labor, access, materials, and site conditions.
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-zinc-600 transition-colors hover:text-zinc-950">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
