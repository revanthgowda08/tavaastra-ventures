import type { Metadata } from "next";
import Image from "next/image";
import Kicker from "@/components/Kicker";
import RevealText from "@/components/RevealText";
import RevealImage from "@/components/RevealImage";
import MagneticButton from "@/components/MagneticButton";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tavaastra Ventures is a Bengaluru-based interior design studio built on precision, craft and a belief that every space should tell a story.",
};

const values = [
  { title: "Honesty in Materials", description: "We let materials speak for themselves — nothing faux, nothing hidden." },
  { title: "Precision", description: "Every drawing, detail and junction is resolved before a single wall is touched." },
  { title: "Collaboration", description: "The best spaces come from a genuine dialogue between client and designer." },
  { title: "Longevity", description: "We design for how a space will feel in ten years, not just on handover day." },
];

const team = [
  { name: "Founding Principal", role: "Design Direction & Client Relations" },
  { name: "Head of Interiors", role: "Concept & Space Planning" },
  { name: "Execution Lead", role: "Site & Fit-Out Management" },
  { name: "Materials & Detailing", role: "Sourcing & Craft Coordination" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image src="/images/about/about-hero.svg" alt="Tavaastra Ventures studio" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10 lg:px-14">
          <Kicker light className="mb-8">
            About Tavaastra Ventures
          </Kicker>
          <h1 className="max-w-3xl font-serif text-[12vw] leading-[0.94] text-ivory sm:text-6xl lg:text-[5.6vw]">
            <RevealText as="span" text="We create spaces" className="block" />
            <RevealText as="span" text="with meaning." delay={0.1} className="block text-gold" />
          </h1>
        </div>
      </section>

      <section className="bg-ivory py-28 md:py-40">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-12 lg:gap-10 lg:px-14">
          <div className="lg:col-span-5">
            <Kicker className="mb-8">Our Philosophy</Kicker>
            <h2 className="font-serif text-4xl leading-[1.05] text-charcoal md:text-5xl">
              We don&rsquo;t just design interiors. We craft spaces that tell stories.
            </h2>
            <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-charcoal/65">
              <p>
                Tavaastra Ventures began with a simple observation: most interior
                projects in Bengaluru were being treated as transactions —
                measured in square feet and material costs, rarely in how a
                space would actually feel to live or work in.
              </p>
              <p>
                We set out to build a studio that treats design and execution
                as one continuous discipline, led by people who understand
                both the creative and the constructional sides of a project
                equally well.
              </p>
              <p>
                Today, that same philosophy shapes every home, office and
                commercial space we take on — regardless of scale.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <RevealImage src="/images/about/about-01.svg" alt="Detail from a Tavaastra Ventures project" className="aspect-[3/4]" />
              <RevealImage src="/images/about/about-02.svg" alt="Detail from a Tavaastra Ventures project" className="mt-12 aspect-[3/4]" delay={0.15} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-28 text-ivory md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <Kicker light className="mb-6">
                Our Approach
              </Kicker>
              <h3 className="font-serif text-3xl leading-tight md:text-4xl">
                Design and execution, as one continuous process.
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/60">
                Most studios hand a design off to a separate contractor. We
                don&rsquo;t. Our design and site teams work from the same brief,
                the same materials palette and the same standards from day
                one — so what gets built matches what was promised.
              </p>
            </div>
            <div>
              <Kicker light className="mb-6">
                Vision &amp; Mission
              </Kicker>
              <h3 className="font-serif text-3xl leading-tight md:text-4xl">
                To become India&rsquo;s most trusted name in crafted interiors.
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/60">
                Our mission is to deliver spaces that are as functional as
                they are beautiful — designed with intention, executed with
                precision, and built to be lived in for decades, not just
                photographed on handover day.
              </p>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-x-8 gap-y-0 border-t border-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="border-b border-ivory/10 py-10 lg:border-r lg:pr-6 lg:last:border-r-0">
                <span className="mb-6 block font-serif text-lg text-gold/70">0{i + 1}</span>
                <h4 className="mb-3 font-serif text-xl">{v.title}</h4>
                <p className="text-sm leading-relaxed text-ivory/55">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
          <div className="mb-16 max-w-2xl">
            <Kicker className="mb-8">Our Team</Kicker>
            <h2 className="font-serif text-5xl leading-[0.98] text-charcoal md:text-6xl">
              The people behind every space.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="relative mb-5 aspect-[3/4] overflow-hidden bg-charcoal/5">
                  <Image src="/images/about/about-03.svg" alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h4 className="font-serif text-xl text-charcoal">{member.name}</h4>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-charcoal/45">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-center text-ivory md:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            Ready to start your own story?
          </h2>
          <p className="mt-5 text-ivory/60">
            Tell us about your space — we&rsquo;d love to hear your vision.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact" variant="solid" className="bg-gold !text-charcoal hover:!bg-ivory" cursor="Start">
              Start Your Project
            </MagneticButton>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.16em] text-ivory/40">
            {siteConfig.phoneDisplay} · {siteConfig.location}
          </p>
        </div>
      </section>
    </>
  );
}
