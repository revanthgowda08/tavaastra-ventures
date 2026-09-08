"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
};

// The outer element is the IntersectionObserver target and must stay
// visually stable — animating clip-path/transform directly on the observed
// node hides it from its own observer (its clipped/scaled box no longer
// geometrically intersects), so it only carries the trigger. The actual
// clip-path and scale animations live on children, which pick up the
// "hidden" -> "visible" transition via variant propagation.
const trigger: Variants = { hidden: {}, visible: {} };

const clipVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: (delay: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const scaleVariants: Variants = {
  hidden: { scale: 1.25 },
  visible: (delay: number) => ({
    scale: 1,
    transition: { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function RevealImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
  delay = 0,
}: Props) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={trigger}
    >
      <motion.div className="h-full w-full" custom={delay} variants={clipVariants}>
        <motion.div className="h-full w-full" custom={delay} variants={scaleVariants}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
