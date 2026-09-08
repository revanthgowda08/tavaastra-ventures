"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  cursor?: string;
  onClick?: () => void;
};

export default function MagneticButton({
  href,
  children,
  className = "",
  variant = "solid",
  cursor = "View",
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 150, damping: 12, mass: 0.3 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.45);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    variant === "solid"
      ? "bg-charcoal text-ivory hover:bg-black"
      : "border border-charcoal/30 text-charcoal hover:border-charcoal";

  return (
    <motion.span
      style={{ x: sx, y: sy }}
      className="inline-block"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
        data-cursor={cursor}
        className={`group relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${base} ${className}`}
      >
        {children}
      </Link>
    </motion.span>
  );
}
