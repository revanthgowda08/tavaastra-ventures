"use client";

import { motion } from "framer-motion";
import { differentiators } from "@/data/site";
import Kicker from "./Kicker";
import RevealText from "./RevealText";

export default function WhyTavaastra() {
  return (
    <section className="bg-charcoal py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="mb-20 max-w-3xl">
          <Kicker light className="mb-8">
            Why Tavaastra
          </Kicker>
          <h2 className="font-serif text-[10vw] leading-[1] sm:text-6xl lg:text-[4.2vw]">
            <RevealText as="span" text="Designed with purpose." className="block" />
            <RevealText as="span" text="Built with precision." delay={0.1} className="block text-gold" />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-0 border-t border-ivory/10 sm:grid-cols-2 lg:grid-cols-5">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: (i % 5) * 0.08 }}
              className="group border-b border-ivory/10 py-10 lg:border-r lg:pr-6 lg:last:border-r-0"
            >
              <span className="mb-6 block font-serif text-lg text-gold/70">0{i + 1}</span>
              <h3 className="mb-3 font-serif text-2xl leading-tight">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ivory/55">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
