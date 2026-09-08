"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { projectCategories, projects } from "@/data/projects";

export default function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-charcoal/10 pb-8">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`relative text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
              filter === cat ? "text-charcoal" : "text-charcoal/40 hover:text-charcoal/70"
            }`}
          >
            {cat}
            {filter === cat && (
              <motion.span layoutId="project-filter-underline" className="absolute -bottom-[9px] left-0 right-0 h-px bg-gold" />
            )}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/projects/${project.slug}`}
                data-cursor="View Project"
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5">
                  <motion.div className="h-full w-full" whileHover={{ scale: 1.06 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    <Image
                      src={project.cover}
                      alt={`${project.name}, ${project.category.toLowerCase()} interior in ${project.location}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs uppercase tracking-[0.18em] text-ivory/80">{project.category} Interior</p>
                  </div>
                  <span className="absolute right-5 top-5 rounded-full bg-ivory/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-charcoal opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {project.year}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl text-charcoal transition-colors group-hover:text-gold md:text-2xl">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-charcoal/50">{project.location}</p>
                  </div>
                  <span className="whitespace-nowrap pt-1 text-xs uppercase tracking-[0.14em] text-charcoal/40">
                    {project.category}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-charcoal/50">No projects in this category yet.</p>
      )}
    </div>
  );
}
