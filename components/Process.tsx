"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/data/process";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import Kicker from "./Kicker";
import RevealText from "./RevealText";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const [distance, setDistance] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (!isDesktop) return;

    function measure() {
      if (trackRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    }
    measure();
    // Re-measure once more after layout/fonts settle, then keep in sync with viewport size.
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden bg-ivory"
      style={isDesktop ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={
          isDesktop
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : "flex min-h-[100svh] flex-col justify-center py-24"
        }
      >
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-14">
          <Kicker className="mb-6">Our Process</Kicker>
          <h2 className="font-serif text-[11vw] leading-[0.94] text-charcoal sm:text-6xl md:text-[4.4vw]">
            <RevealText as="span" text="From Vision to Reality." />
          </h2>
        </div>

        <motion.div
          ref={trackRef}
          style={isDesktop ? { x } : undefined}
          className="mt-16 flex w-max flex-col gap-16 px-6 md:mt-20 md:flex-row md:items-center md:gap-0 md:px-14"
        >
          <motion.div
            style={{ scaleX: isDesktop ? lineScale : 1 }}
            className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px origin-left bg-charcoal/15 md:block"
          />

          {processSteps.map((step, i) => (
            <div
              key={step.index}
              className="relative flex w-full flex-col gap-6 md:w-[420px] md:px-14 lg:w-[480px]"
            >
              <div className="flex items-center gap-6">
                <span className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                </span>
                <span className="font-serif text-2xl text-charcoal/30">{step.index}</span>
              </div>
              <h3 className="font-serif text-4xl text-charcoal md:text-5xl">{step.title}</h3>
              <p className="max-w-xs text-[15px] leading-relaxed text-charcoal/60">{step.description}</p>
              {i < processSteps.length - 1 && (
                <span className="absolute -right-4 top-2 hidden text-2xl text-gold/50 md:block">—</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
