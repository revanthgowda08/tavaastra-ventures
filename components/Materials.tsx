"use client";

import { useEffect, useRef, useState } from "react";
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
      <motion.div style={{ y }} className="pointer-events-none absolute inset-[-8%]">
        <Image src={item.image} alt={`${item.label} material detail`} fill sizes="380px" className="object-cover" draggable={false} />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <p className="font-serif text-2xl text-ivory">{item.label}</p>
      </div>
    </div>
  );
}

export default function Materials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // React's synthetic onWheel is bound passively, so preventDefault() inside
    // it is silently ignored (and logs a warning) — this needs a real
    // non-passive native listener to be able to block page scroll selectively.
    function handleWheel(e: WheelEvent) {
      if (!el) return;
      // Let a genuinely horizontal gesture (trackpad/shift+wheel) pass through
      // untouched; convert a plain vertical wheel into horizontal scroll so a
      // mouse user can drive the gallery too.
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) return; // let the page scroll past the ends

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    const state = dragState.current;
    if (!state.active || !el) return;
    const delta = e.clientX - state.startX;
    if (Math.abs(delta) > 3) state.moved = true;
    el.scrollLeft = state.startScroll - delta;
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (dragState.current.active && el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    dragState.current.active = false;
    setDragging(false);
  }

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
        data-lenis-prevent
        data-cursor="Drag"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        className={`no-scrollbar flex gap-6 overflow-x-auto px-6 pb-4 md:gap-8 md:px-10 lg:px-14 ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {materials.map((item, i) => (
          <MaterialCard key={item.key} item={item} index={i} scrollerRef={scrollerRef} />
        ))}
      </div>
    </section>
  );
}
