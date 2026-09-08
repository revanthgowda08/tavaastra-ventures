"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { processSteps } from "@/data/process";
import Kicker from "./Kicker";
import RevealText from "./RevealText";

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const line = lineRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.7,
            },
          }
        );
      }

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden bg-ivory">
      <div className="flex h-auto min-h-[100svh] flex-col justify-center py-24 md:h-[100svh] md:py-0">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-14">
          <Kicker className="mb-6">Our Process</Kicker>
          <h2 className="font-serif text-[11vw] leading-[0.94] text-charcoal sm:text-6xl md:text-[4.4vw]">
            <RevealText as="span" text="From Vision to Reality." />
          </h2>
        </div>

        <div
          ref={trackRef}
          className="mt-16 flex w-max flex-col gap-16 px-6 md:mt-20 md:flex-row md:items-center md:gap-0 md:px-14"
        >
          <div ref={lineRef} className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px origin-left bg-charcoal/15 md:block" />

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
        </div>
      </div>
    </section>
  );
}
