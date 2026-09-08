export type Testimonial = {
  quote: string;
  name: string;
  project: string;
  image?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Tavaastra didn't just design our home — they understood how we live before they drew a single line. Every room feels considered.",
    name: "Ananya & Rohit Kumar",
    project: "The Linden Residence, Bengaluru",
    image: "/images/projects/the-linden-residence-detail-2.svg",
  },
  {
    quote:
      "We gave them a brief and a deadline. They gave us a headquarters our clients comment on before we've even said a word.",
    name: "Vikram Sterling",
    project: "Sterling Corporate HQ, Bengaluru",
    image: "/images/projects/sterling-corporate-hq-detail-1.svg",
  },
  {
    quote:
      "What stood out was the precision — nothing was left to chance, from the first sketch to the final light fitting.",
    name: "Meera Iyer",
    project: "Kaveri Heights Penthouse, Bengaluru",
    image: "/images/projects/kaveri-heights-penthouse-detail-3.svg",
  },
  {
    quote:
      "A team that manages design and execution as one process, not two handoffs. That alone changed how our fit-out felt from start to finish.",
    name: "Arjun Nair",
    project: "Vertex Tech Office, Bengaluru",
    image: "/images/projects/vertex-tech-office-detail-2.svg",
  },
];
