import Image from "next/image";
import { instagramPosts, siteConfig } from "@/data/site";
import Kicker from "./Kicker";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";

export default function Instagram() {
  return (
    <section className="bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Kicker className="mb-8">{siteConfig.instagramHandle}</Kicker>
            <h2 className="font-serif text-[11vw] leading-[0.94] text-charcoal sm:text-6xl lg:text-[4.4vw]">
              <RevealText as="span" text="Follow the process." />
            </h2>
          </div>
          <MagneticButton href={siteConfig.instagramUrl} variant="outline" cursor="Follow">
            Follow Us On Instagram
          </MagneticButton>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {instagramPosts.map((post, i) => (
            <a
              key={i}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="Instagram"
              className={`group relative block overflow-hidden ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <Image
                src={post.image}
                alt="Tavaastra Ventures Instagram post"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/40">
                <svg
                  className="h-7 w-7 scale-75 text-ivory opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
