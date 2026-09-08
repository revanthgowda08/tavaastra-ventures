"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";
import Kicker from "./Kicker";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });

  const imgX = useTransform(smx, [-1, 1], [-18, 18]);
  const imgY = useTransform(smy, [-1, 1], [-14, 14]);
  const gridX = useTransform(smx, [-1, 1], [8, -8]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-black"
    >
      <motion.div style={{ scale, x: imgX, y: imgY }} className="absolute inset-[-4%]">
        <Image
          src="/images/hero/hero-main.svg"
          alt="A cinematic view of a Tavaastra Ventures interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />

      {/* architectural grid overlay */}
      <motion.div
        style={{ x: gridX }}
        className="pointer-events-none absolute inset-0 hidden opacity-[0.14] sm:block"
      >
        <div className="mx-auto grid h-full max-w-[1600px] grid-cols-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-r border-ivory/40 last:border-r-0" />
          ))}
        </div>
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 w-full px-6 pb-16 md:px-10 md:pb-24 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Kicker light className="mb-8">
              Interior Design &amp; Fit-Out Studio — Bengaluru
            </Kicker>
          </motion.div>

          <h1 className="max-w-4xl font-serif text-[13vw] leading-[0.94] text-ivory sm:text-[9vw] md:text-[7.2vw] lg:text-[6.4vw]">
            <RevealText as="span" text="Crafting Spaces." delay={0.55} className="block" />
            <RevealText as="span" text="Creating Stories." delay={0.75} className="block text-gold" />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col gap-10 md:mt-10 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-base leading-relaxed text-ivory/75 md:text-lg">
              Tavaastra Ventures creates thoughtful, timeless interiors for homes,
              businesses and spaces that deserve to be experienced.
            </p>

            <div className="flex flex-wrap gap-4">
              <MagneticButton href="/projects" variant="solid" className="bg-ivory !text-charcoal hover:!bg-gold" cursor="View">
                View Our Projects
              </MagneticButton>
              <MagneticButton href="/contact" variant="outline" className="!border-ivory/40 !text-ivory hover:!border-ivory" cursor="Start">
                Start A Project
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">Scroll</span>
        <span className="h-12 w-px overflow-hidden bg-ivory/20">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="block h-full w-full bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}
