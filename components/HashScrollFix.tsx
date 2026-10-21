"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

const OFFSET = -88;

/**
 * Lenis owns scroll position via its own animation loop, so a plain
 * `element.scrollIntoView()` (what the browser/Next.js does for a hash
 * link) gets silently overridden on the next Lenis frame, which still
 * thinks the target scroll is wherever it last was.
 *
 * Right after a client-side route change, something (Next.js' own router,
 * or a native scroll event firing while Lenis isn't yet mid-animation)
 * can also independently nudge native scroll position and desync Lenis's
 * animation partway through — the fix below verifies where we actually
 * landed once the scroll should have finished, and snaps to the correct
 * spot if a stray scroll won that race.
 */
function scrollToHash(hash: string) {
  if (!hash) return;
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return;

  let findAttempts = 0;
  const maxFindAttempts = 40; // ~2s at 50ms

  function verifyAndCorrect(el: HTMLElement, correctionsLeft: number) {
    const top = el.getBoundingClientRect().top;
    if (Math.abs(top - -OFFSET) <= 4) return; // landed correctly
    if (correctionsLeft <= 0) return;

    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: OFFSET, immediate: true });
    } else {
      el.scrollIntoView({ behavior: "auto", block: "start" });
    }
    setTimeout(() => verifyAndCorrect(el, correctionsLeft - 1), 150);
  }

  function waitForElement() {
    const el = document.getElementById(id);
    if (!el) {
      findAttempts += 1;
      if (findAttempts < maxFindAttempts) setTimeout(waitForElement, 50);
      return;
    }

    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: OFFSET, duration: 1.1 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // The animated scroll above can take a beat, and can occasionally get
    // nudged off target during a fresh route transition — check back once
    // it should have settled and correct it if something else won a race.
    setTimeout(() => verifyAndCorrect(el, 3), 1300);
  }

  waitForElement();
}

export default function HashScrollFix() {
  useEffect(() => {
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }

    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!link) return;
      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }
      if (!url.hash || url.origin !== window.location.origin) return;
      scrollToHash(url.hash);
    }

    function handleHashChange() {
      scrollToHash(window.location.hash);
    }

    document.addEventListener("click", handleClick);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
