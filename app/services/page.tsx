import type { Metadata } from "next";
import Image from "next/image";
import Kicker from "@/components/Kicker";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential interiors, commercial interiors, office interiors, fit-out solutions, ceiling works and turnkey interior execution — end to end, in Bengaluru.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative flex h-[55vh] min-h-[420px] items-end overflow-hidden bg-charcoal">
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10 lg:px-14">
          <Kicker light className="mb-8">
            What We Do
          </Kicker>
          <h1 className="max-w-2xl font-serif text-[12vw] leading-[0.94] text-ivory sm:text-6xl lg:text-[5.2vw]">
            <RevealText as="span" text="What We Create." />
          </h1>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
          {services.map((service, i) => (
            <div
              key={service.slug}
              id={service.slug}
              className="grid scroll-mt-28 grid-cols-1 gap-10 border-b border-charcoal/10 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28"
            >
              <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                </div>
              </div>
              <div className={`flex flex-col justify-center lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="mb-6 font-serif text-2xl text-gold/70">{service.index}</span>
                <h2 className="font-serif text-4xl leading-tight text-charcoal md:text-5xl">{service.title}</h2>
                <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-charcoal/65">
                  {service.longDescription}
                </p>
                <div className="mt-8">
                  <MagneticButton href="/contact" variant="outline" cursor="Start">
                    Enquire About This
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black py-24 text-center text-ivory md:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            Not sure which service fits your project?
          </h2>
          <p className="mt-5 text-ivory/60">
            Tell us about your space and we&rsquo;ll recommend the right approach.
          </p>
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
