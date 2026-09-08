import Image from "next/image";
import Kicker from "./Kicker";
import RevealText from "./RevealText";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-black py-28 text-ivory md:py-40">
      <div className="absolute inset-0 opacity-30">
        <Image src="/images/testimonials/backdrop.svg" alt="" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-12 lg:gap-8 lg:px-14">
        <div className="lg:col-span-6">
          <Kicker light className="mb-8">
            Start A Conversation
          </Kicker>
          <h2 className="font-serif text-[11vw] leading-[0.94] sm:text-6xl lg:text-[4.6vw]">
            <RevealText as="span" text="Let’s create" className="block" />
            <RevealText as="span" text="your next space." delay={0.1} className="block text-gold" />
          </h2>

          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ivory/60 md:text-base">
            Whether you&rsquo;re designing your dream home, building a new
            workspace or transforming an existing environment, we&rsquo;d love
            to hear your vision.
          </p>

          <div className="mt-14 flex flex-col gap-6 border-t border-ivory/10 pt-10 text-sm sm:flex-row sm:gap-16">
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.16em] text-ivory/40">Phone</p>
              <a href={`tel:+91${siteConfig.phone}`} className="font-serif text-xl text-ivory hover:text-gold">
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.16em] text-ivory/40">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="font-serif text-xl text-ivory hover:text-gold">
                {siteConfig.email}
              </a>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.16em] text-ivory/40">Studio</p>
              <p className="font-serif text-xl text-ivory">{siteConfig.location}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
