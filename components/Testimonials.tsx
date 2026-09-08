"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import Kicker from "./Kicker";
import RevealText from "./RevealText";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <Kicker light className="mb-8">
          Client Stories
        </Kicker>
        <h2 className="mb-16 font-serif text-[10vw] leading-[0.96] sm:text-6xl lg:text-[4.2vw]">
          <RevealText as="span" text="Spaces people" className="block" />
          <RevealText as="span" text="love to live in." delay={0.1} className="block text-gold" />
        </h2>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="font-serif text-7xl leading-none text-gold/40 md:text-8xl">&ldquo;</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="max-w-2xl font-serif text-2xl leading-snug text-ivory/95 md:text-4xl">
                  {testimonial.quote}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-gold" />
                  <div>
                    <p className="text-sm font-medium text-ivory">{testimonial.name}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-ivory/45">{testimonial.project}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className="group relative h-1 w-10 overflow-hidden bg-ivory/20"
                >
                  {active === i && (
                    <motion.span
                      layoutId="testimonial-progress"
                      className="absolute inset-0 bg-gold"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="relative hidden aspect-[3/4] overflow-hidden lg:col-span-4 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {testimonial.image && (
                  <Image src={testimonial.image} alt={testimonial.project} fill sizes="400px" className="object-cover" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
