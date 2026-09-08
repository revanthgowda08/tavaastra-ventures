"use client";

import RevealText from "./RevealText";
import RevealImage from "./RevealImage";
import Kicker from "./Kicker";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-ivory py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-12 lg:gap-8 lg:px-14">
        <div className="lg:col-span-5">
          <Kicker className="mb-8">Our Philosophy</Kicker>
          <h2 className="font-serif text-[10vw] leading-[0.98] text-charcoal sm:text-6xl lg:text-[3.6vw]">
            <RevealText as="span" text="Every space" className="block" />
            <RevealText as="span" text="has a story." delay={0.1} className="block" />
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 max-w-md space-y-6 text-[15px] leading-relaxed text-charcoal/65 md:text-base"
          >
            <p>
              At Tavaastra Ventures, we believe interiors are more than walls,
              furniture and finishes. They are experiences.
            </p>
            <p>
              We design spaces that reflect people, purpose and personality —
              combining creativity, functionality and precise execution.
            </p>
            <p>
              From homes to commercial environments, we transform ideas into
              spaces built to inspire.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex gap-12 border-t border-charcoal/10 pt-8"
          >
            <div>
              <p className="font-serif text-3xl text-gold">8+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-charcoal/50">Years Crafting Spaces</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-gold">120+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-charcoal/50">Projects Delivered</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:gap-6">
          <RevealImage
            src="/images/intro/intro-01.svg"
            alt="Detail of a Tavaastra Ventures residential interior"
            className="col-span-2 aspect-[4/3] sm:col-span-1 sm:aspect-[3/4]"
            sizes="(max-width: 640px) 100vw, 40vw"
          />
          <RevealImage
            src="/images/intro/intro-02.svg"
            alt="Detail of a curated interior object"
            className="col-span-2 aspect-[4/3] self-end sm:col-span-1 sm:aspect-[3/4]"
            sizes="(max-width: 640px) 100vw, 30vw"
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
