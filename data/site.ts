export const siteConfig = {
  name: "Tavaastra Ventures",
  tagline: "Crafting Spaces. Creating Stories.",
  description:
    "Tavaastra Ventures is a Bengaluru-based interior design and fit-out studio crafting thoughtful, timeless interiors for homes, businesses and spaces that deserve to be experienced.",
  url: "https://www.tavaastraventures.com",
  phone: "8147329656",
  phoneDisplay: "+91 81473 29656",
  email: "hello@tavaastraventures.com",
  location: "Bengaluru, Karnataka",
  instagramHandle: "@tavaastra_ventures",
  instagramUrl: "https://instagram.com/tavaastra_ventures",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 95, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "+", label: "Years of Experience" },
  { value: 24, suffix: "", label: "Design Experts" },
];

export const differentiators = [
  {
    title: "Creative Vision",
    description: "Every project begins with understanding your story.",
  },
  {
    title: "Attention To Detail",
    description: "From materials to lighting, every detail matters.",
  },
  {
    title: "End-To-End Execution",
    description: "One team from concept to completion.",
  },
  {
    title: "Expert Craftsmanship",
    description: "Quality execution backed by skilled professionals.",
  },
  {
    title: "Personalized Design",
    description: "No two clients or spaces are the same.",
  },
];

export const materials = [
  { key: "wood", label: "Timber", image: "/images/materials/wood.svg" },
  { key: "stone", label: "Stone", image: "/images/materials/stone.svg" },
  { key: "fabric", label: "Fabric", image: "/images/materials/fabric.svg" },
  { key: "metal", label: "Metal", image: "/images/materials/metal.svg" },
  { key: "lighting", label: "Lighting", image: "/images/materials/lighting.svg" },
  { key: "concrete", label: "Concrete", image: "/images/materials/concrete.svg" },
  { key: "brass", label: "Brass", image: "/images/materials/brass.svg" },
  { key: "linen", label: "Linen", image: "/images/materials/linen.svg" },
];

export const instagramPosts = Array.from({ length: 8 }).map((_, i) => ({
  image: `/images/instagram/insta-${i + 1}.svg`,
  href: siteConfig.instagramUrl,
}));
