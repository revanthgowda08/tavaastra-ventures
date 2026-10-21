"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import RevealText from "./RevealText";
import Kicker from "./Kicker";

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative bg-charcoal py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Kicker light className="mb-8">
              What We Do
            </Kicker>
            <h2 className="font-serif text-[11vw] leading-[0.94] sm:text-6xl lg:text-[4.4vw]">
              <RevealText as="span" text="What We Create." />
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ivory/55">
            Six disciplines, one continuous process — from the first concept
            sketch to the final handover.
          </p>
        </div>

        <div className="border-t border-ivory/10">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              scroll={false}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              data-cursor="View"
              className="group relative flex flex-col justify-between gap-4 overflow-hidden border-b border-ivory/10 py-8 transition-colors duration-500 sm:flex-row sm:items-center md:py-10"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 -z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: active === i ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image src={service.image} alt="" fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-black/55" />
              </motion.div>

              <div className="relative z-10 flex items-baseline gap-6 sm:gap-10">
                <span className="font-serif text-lg text-gold/80 md:text-xl">{service.index}</span>
                <h3 className="font-serif text-3xl transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">
                  {service.title}
                </h3>
              </div>

              <p className="relative z-10 max-w-sm text-sm leading-relaxed text-ivory/60 transition-colors duration-500 group-hover:text-ivory/90 sm:pl-6 sm:text-right">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
