import Link from "next/link";
import { siteConfig } from "@/data/site";

const footerNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const footerServices = [
  "Residential Interiors",
  "Commercial Interiors",
  "Fit-Out Solutions",
  "Ceiling Works",
];

export default function Footer() {
  return (
    <footer className="bg-black text-ivory">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-14 border-b border-ivory/10 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl tracking-[0.06em]">
              TAVAASTRA <span className="text-gold">VENTURES</span>
            </p>
            <p className="mt-4 max-w-xs text-xs uppercase tracking-[0.18em] text-ivory/45">
              {siteConfig.tagline}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/50">
              A Bengaluru-based interior design and fit-out studio crafting
              thoughtful, timeless spaces for homes, businesses and everything
              in between.
            </p>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.16em] text-ivory/40">Navigation</p>
            <ul className="space-y-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ivory/70 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.16em] text-ivory/40">Services</p>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s} className="text-sm text-ivory/70">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 pt-10 sm:flex-row sm:items-center">
          <p className="text-xs text-ivory/40">
            © {new Date().getFullYear()} Tavaastra Ventures. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8 text-xs uppercase tracking-[0.14em] text-ivory/60">
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
              Instagram
            </a>
            <a href={`tel:+91${siteConfig.phone}`} className="hover:text-gold">
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
