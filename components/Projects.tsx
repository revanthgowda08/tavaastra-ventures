import Kicker from "./Kicker";
import RevealText from "./RevealText";
import ProjectGrid from "./ProjectGrid";
import MagneticButton from "./MagneticButton";

export default function Projects() {
  return (
    <section id="projects" className="bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Kicker className="mb-8">Selected Work</Kicker>
            <h2 className="font-serif text-[11vw] leading-[0.94] text-charcoal sm:text-6xl lg:text-[4.4vw]">
              <RevealText as="span" text="Spaces We’ve" className="block" />
              <RevealText as="span" text="Transformed." delay={0.1} className="block" />
            </h2>
          </div>
          <MagneticButton href="/projects" variant="outline" cursor="Explore">
            View All Projects
          </MagneticButton>
        </div>

        <ProjectGrid />
      </div>
    </section>
  );
}
