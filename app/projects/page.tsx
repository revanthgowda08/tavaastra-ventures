import type { Metadata } from "next";
import Kicker from "@/components/Kicker";
import RevealText from "@/components/RevealText";
import ProjectGrid from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A portfolio of residential, commercial, office, retail and hospitality interiors designed and executed by Tavaastra Ventures in Bengaluru.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative flex h-[55vh] min-h-[420px] items-end overflow-hidden bg-charcoal">
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10 lg:px-14">
          <Kicker light className="mb-8">
            Portfolio
          </Kicker>
          <h1 className="max-w-2xl font-serif text-[12vw] leading-[0.94] text-ivory sm:text-6xl lg:text-[5.2vw]">
            <RevealText as="span" text="Spaces We’ve" className="block" />
            <RevealText as="span" text="Transformed." delay={0.1} className="block text-gold" />
          </h1>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
          <ProjectGrid />
        </div>
      </section>
    </>
  );
}
