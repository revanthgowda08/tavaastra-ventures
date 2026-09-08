"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { stats } from "@/data/site";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="border-y border-charcoal/10 bg-ivory py-20 md:py-28">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-12 px-6 md:grid-cols-4 md:px-10 lg:px-14">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="text-center"
          >
            <p className="font-serif text-5xl text-charcoal sm:text-6xl lg:text-7xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-charcoal/50">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
