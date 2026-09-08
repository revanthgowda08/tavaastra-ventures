"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, siteConfig } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on navigation. Adjusted during render (rather than
  // in an effect) per https://react.dev/learn/you-might-not-need-an-effect —
  // avoids an extra render pass and a flash of the open menu on the new page.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const dark = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          dark ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(24,24,24,0.08)]" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">
          <Link
            href="/"
            className={`font-serif text-lg tracking-[0.08em] transition-colors duration-300 ${
              open ? "text-charcoal" : dark ? "text-charcoal" : "text-ivory"
            }`}
          >
            TAVAASTRA
            <span className="ml-1 text-gold">VENTURES</span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                  dark ? "text-charcoal/70 hover:text-charcoal" : "text-ivory/80 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className={`hidden rounded-full border px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-300 md:inline-flex ${
                dark
                  ? "border-charcoal/25 text-charcoal hover:bg-charcoal hover:text-ivory"
                  : "border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
              }`}
            >
              Start Your Project
            </Link>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
                className={`h-px w-6 ${open || dark ? "bg-charcoal" : "bg-ivory"}`}
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1 }}
                className={`h-px w-6 ${open || dark ? "bg-charcoal" : "bg-ivory"}`}
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
                className={`h-px w-6 ${open || dark ? "bg-charcoal" : "bg-ivory"}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99] flex flex-col justify-between bg-ivory px-6 pb-10 pt-28 md:px-10"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-b border-charcoal/10 py-4"
                >
                  <Link
                    href={link.href}
                    className="font-serif text-4xl text-charcoal transition-colors hover:text-gold sm:text-6xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col gap-6 text-charcoal/70"
            >
              <Link
                href="/contact"
                className="w-fit rounded-full bg-charcoal px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-ivory"
              >
                Start Your Project
              </Link>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <span>{siteConfig.phoneDisplay}</span>
                <span>{siteConfig.location}</span>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
                  {siteConfig.instagramHandle}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
