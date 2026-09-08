"use client";

import { motion, type Variants } from "framer-motion";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export default function RevealText({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.045,
  once = true,
}: Props) {
  const words = text.split(" ");
  const Tag = motion[as] as typeof motion.div;

  // The container (not the moving words) is what the viewport observer
  // watches — a word mid-animation sits translated out of its own
  // overflow-hidden wrapper, so observing the word itself would never
  // report as "in view". Variants propagate the trigger down to children.
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };

  const child: Variants = {
    hidden: { y: "110%", rotate: 4 },
    visible: {
      y: "0%",
      rotate: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      variants={container}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pr-[0.28em] last:pr-0">
          <motion.span className="inline-block will-change-transform" variants={child} aria-hidden>
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
