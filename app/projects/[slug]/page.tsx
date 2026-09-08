import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/data/projects";
import Kicker from "@/components/Kicker";
import RevealText from "@/components/RevealText";
import RevealImage from "@/components/RevealImage";
import MagneticButton from "@/components/MagneticButton";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: `${project.name} — a ${project.category.toLowerCase()} interior project by Tavaastra Ventures in ${project.location}, ${project.year}.`,
    openGraph: {
      images: [{ url: project.cover, width: 1600, height: 1100, alt: project.name }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  const meta = [
    { label: "Location", value: project.location },
    { label: "Category", value: project.category },
    { label: "Year", value: project.year },
    { label: "Client", value: project.client },
    { label: "Area", value: project.area },
    { label: "Duration", value: project.duration },
  ];

  return (
    <>
      <section className="relative flex h-[85vh] min-h-[560px] items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image src={project.cover} alt={project.name} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10 lg:px-14">
          <Kicker light className="mb-6">
            {project.category} Interior
          </Kicker>
          <h1 className="max-w-4xl font-serif text-[11vw] leading-[0.94] text-ivory sm:text-6xl lg:text-[5.6vw]">
            <RevealText as="span" text={project.name} />
          </h1>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-2 gap-8 border-b border-charcoal/10 pb-14 sm:grid-cols-3 lg:grid-cols-6">
            {meta.map((item) => (
              <div key={item.label}>
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-charcoal/45">{item.label}</p>
                <p className="font-serif text-lg text-charcoal">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-16 py-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Kicker className="mb-8">The Story</Kicker>
              <h2 className="font-serif text-3xl leading-tight text-charcoal md:text-4xl">
                A space designed around a specific way of living.
              </h2>
            </div>
            <div className="space-y-6 text-[15px] leading-relaxed text-charcoal/65 lg:col-span-6 lg:col-start-7">
              {project.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pb-20 md:grid-cols-3 md:gap-6">
            {project.gallery.map((img, i) => (
              <RevealImage
                key={img}
                src={img}
                alt={`${project.name} — detail ${i + 1}`}
                className={`aspect-[3/4] ${i === 1 ? "md:mt-10" : ""}`}
                delay={i * 0.1}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-16 border-t border-charcoal/10 py-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Kicker className="mb-8">Materials Used</Kicker>
              <ul className="space-y-3">
                {project.materials.map((m) => (
                  <li key={m} className="flex items-center gap-3 font-serif text-xl text-charcoal">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Kicker className="mb-8">The Outcome</Kicker>
              <p className="font-serif text-2xl leading-snug text-charcoal md:text-3xl">{project.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ivory/10 bg-charcoal py-16 text-ivory md:py-20">
        <Link
          href={`/projects/${next.slug}`}
          data-cursor="Next Project"
          className="group mx-auto flex max-w-[1600px] flex-col justify-between gap-6 px-6 md:flex-row md:items-center md:px-10 lg:px-14"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-ivory/40">Next Project</p>
            <h3 className="mt-3 font-serif text-4xl transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">
              {next.name}
            </h3>
          </div>
          <div className="relative h-32 w-48 shrink-0 overflow-hidden">
            <Image src={next.cover} alt={next.name} fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
        </Link>
      </section>

      <section className="bg-black py-20 text-center text-ivory md:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">Have a similar project in mind?</h2>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact" variant="solid" className="bg-gold !text-charcoal hover:!bg-ivory" cursor="Start">
              Start Your Project
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
