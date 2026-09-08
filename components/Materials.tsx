"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { materials } from "@/data/site";
import Kicker from "./Kicker";
import RevealText from "./RevealText";

function MaterialCard({
  item,
  index,
  scrollerRef,
}: {
  item: (typeof materials)[number];
  index: number;
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    container: scrollerRef,
    axis: "x",
  });
  const y = useTransform(scrollXProgress, [0, 1], [index % 2 === 0 ? 30 : -30, index % 2 === 0 ? -30 : 30]);

  return (
    <div
      ref={ref}
      className={`relative h-[420px] w-[300px] shrink-0 overflow-hidden md:h-[520px] md:w-[380px] ${
        index % 2 === 1 ? "mt-14" : ""
      }`}
    >
      <motion.div style={{ y }} className="absolute inset-[-8%]">
        <Image src={item.image} alt={`${item.label} material detail`} fill sizes="380px" className="object-cover" />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <p className="font-serif text-2xl text-ivory">{item.label}</p>
      </div>
    </div>
  );
}

export default function Materials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="overflow-hidden bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker className="mb-8">Materiality</Kicker>
            <h2 className="font-serif text-[11vw] leading-[0.94] text-charcoal sm:text-6xl lg:text-[4.4vw]">
              <RevealText as="span" text="The beauty is" className="block" />
              <RevealText as="span" text="in the details." delay={0.1} className="block" />
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-charcoal/55">
            Every project is composed of decisions made at the smallest scale —
            the grain of wood, the weight of a fabric, the way light hits stone.
          </p>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-6 overflow-x-auto px-6 pb-4 md:gap-8 md:px-10 lg:px-14"
      >
        {materials.map((item, i) => (
          <MaterialCard key={item.key} item={item} index={i} scrollerRef={scrollerRef} />
        ))}
      </div>
    </section>
  );
}
