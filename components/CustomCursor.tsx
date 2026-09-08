"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const mql = window.matchMedia(FINE_POINTER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const enabled = useSyncExternalStore(subscribeFinePointer, getFinePointerSnapshot, getFinePointerServerSnapshot);

  useEffect(() => {
    if (!enabled) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    function onMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      setHasMoved(true);
    }

    function tick() {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    }

    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (target) {
        setLabel(target.dataset.cursor || "");
        setActive(true);
      } else {
        setActive(false);
        setLabel("");
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      className="cursor-ring flex items-center justify-center rounded-full bg-ivory transition-[width,height,opacity] duration-300 ease-out"
      style={{
        width: active ? 96 : 10,
        height: active ? 96 : 10,
        opacity: hasMoved ? 1 : 0,
      }}
    >
      <span
        className="font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-black transition-opacity duration-200"
        style={{ opacity: active && label ? 1 : 0 }}
      >
        {label}
      </span>
    </div>
  );
}
