export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Office"
  | "Retail"
  | "Hospitality";

export type Project = {
  slug: string;
  name: string;
  location: string;
  category: ProjectCategory;
  year: string;
  client: string;
  area: string;
  duration: string;
  cover: string;
  gallery: string[];
  story: string[];
  materials: string[];
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "the-linden-residence",
    name: "The Linden Residence",
    location: "Bengaluru",
    category: "Residential",
    year: "2025",
    client: "Private Residence",
    area: "3,400 sq.ft.",
    duration: "7 months",
    cover: "/images/projects/the-linden-residence-cover.svg",
    gallery: [
      "/images/projects/the-linden-residence-detail-1.svg",
      "/images/projects/the-linden-residence-detail-2.svg",
      "/images/projects/the-linden-residence-detail-3.svg",
    ],
    story: [
      "A family of four wanted a home that felt calm after years in a busier, more ornamented apartment. We stripped the plan back to its essentials — clean sightlines, warm materials, and light that moves through the day.",
      "Every room was designed around a specific ritual: morning coffee by the east-facing window, a reading nook that catches the last light, a kitchen built for slow weekend mornings.",
    ],
    materials: ["White oak veneer", "Honed limestone", "Bouclé upholstery", "Brushed brass hardware"],
    outcome:
      "A residence that feels larger than its footprint — quiet, materially rich, and entirely built around how this family actually lives.",
  },
  {
    slug: "kaveri-heights-penthouse",
    name: "Kaveri Heights Penthouse",
    location: "Bengaluru",
    category: "Residential",
    year: "2024",
    client: "Private Residence",
    area: "5,200 sq.ft.",
    duration: "9 months",
    cover: "/images/projects/kaveri-heights-penthouse-cover.svg",
    gallery: [
      "/images/projects/kaveri-heights-penthouse-detail-1.svg",
      "/images/projects/kaveri-heights-penthouse-detail-2.svg",
      "/images/projects/kaveri-heights-penthouse-detail-3.svg",
    ],
    story: [
      "A double-height penthouse with sweeping city views, designed to feel like a private retreat rather than a showcase. Dark timber, warm stone and a restrained palette let the view do the talking.",
      "A sculptural staircase became the spatial anchor of the home, connecting the entertaining floor below to a quieter, more private level above.",
    ],
    materials: ["Smoked oak", "Fluted travertine", "Blackened steel", "Hand-loomed rugs"],
    outcome: "A residence that reads as one continuous gesture — from entry to skyline.",
  },
  {
    slug: "sterling-corporate-hq",
    name: "Sterling Corporate HQ",
    location: "Bengaluru",
    category: "Office",
    year: "2025",
    client: "Sterling Group",
    area: "22,000 sq.ft.",
    duration: "11 months",
    cover: "/images/projects/sterling-corporate-hq-cover.svg",
    gallery: [
      "/images/projects/sterling-corporate-hq-detail-1.svg",
      "/images/projects/sterling-corporate-hq-detail-2.svg",
      "/images/projects/sterling-corporate-hq-detail-3.svg",
    ],
    story: [
      "Sterling Group needed a headquarters that could host clients, support focused work, and reflect a company built on precision engineering — without feeling corporate or cold.",
      "We organised the floor plate around a central materials-led atrium, with focus pods, collaboration lounges and a boardroom finished in the same palette as the lobby.",
    ],
    materials: ["Micro-cement", "Powder-coated steel", "Wool felt panelling", "Warm oak"],
    outcome: "A headquarters that has become a recruiting tool in its own right.",
  },
  {
    slug: "atelier-workspace",
    name: "Atelier Workspace",
    location: "Bengaluru",
    category: "Office",
    year: "2024",
    client: "Design Collective",
    area: "6,800 sq.ft.",
    duration: "5 months",
    cover: "/images/projects/atelier-workspace-cover.svg",
    gallery: [
      "/images/projects/atelier-workspace-detail-1.svg",
      "/images/projects/atelier-workspace-detail-2.svg",
      "/images/projects/atelier-workspace-detail-3.svg",
    ],
    story: [
      "A creative studio outgrowing its first home. The brief was simple: more room to make things, without losing the intimacy of a small team.",
      "Raw concrete, exposed services and warm lighting create a workspace that feels more like an atelier than an office.",
    ],
    materials: ["Polished concrete", "Reclaimed timber", "Blackened steel shelving"],
    outcome: "A workspace the team designed their own products inside of, within weeks of moving in.",
  },
  {
    slug: "maison-noir-boutique",
    name: "Maison Noir Boutique",
    location: "Bengaluru",
    category: "Retail",
    year: "2024",
    client: "Maison Noir",
    area: "1,900 sq.ft.",
    duration: "4 months",
    cover: "/images/projects/maison-noir-boutique-cover.svg",
    gallery: [
      "/images/projects/maison-noir-boutique-detail-1.svg",
      "/images/projects/maison-noir-boutique-detail-2.svg",
      "/images/projects/maison-noir-boutique-detail-3.svg",
    ],
    story: [
      "A fashion label's first flagship store, designed to feel like a private atelier rather than a conventional retail floor.",
      "Dark plaster walls and sculptural lighting put the product at the centre, while a back-of-house fitting suite mirrors the brand's quiet confidence.",
    ],
    materials: ["Venetian plaster", "Cast bronze fixtures", "Smoked mirror"],
    outcome: "Footfall converted to appointments within the first quarter of opening.",
  },
  {
    slug: "whitefield-family-home",
    name: "Whitefield Family Home",
    location: "Bengaluru",
    category: "Residential",
    year: "2023",
    client: "Private Residence",
    area: "2,600 sq.ft.",
    duration: "6 months",
    cover: "/images/projects/whitefield-family-home-cover.svg",
    gallery: [
      "/images/projects/whitefield-family-home-detail-1.svg",
      "/images/projects/whitefield-family-home-detail-2.svg",
      "/images/projects/whitefield-family-home-detail-3.svg",
    ],
    story: [
      "A multi-generational household needed shared spaces that worked for three different rhythms of daily life, without any one generation's needs dominating the plan.",
      "A central courtyard-facing living space became common ground, with quieter private wings on either side.",
    ],
    materials: ["Teak", "Kota stone", "Handwoven textiles"],
    outcome: "A home where three generations each found a room that felt entirely their own.",
  },
  {
    slug: "the-canvas-cafe",
    name: "The Canvas Café",
    location: "Bengaluru",
    category: "Hospitality",
    year: "2023",
    client: "Canvas F&B",
    area: "2,100 sq.ft.",
    duration: "4 months",
    cover: "/images/projects/the-canvas-cafe-cover.svg",
    gallery: [
      "/images/projects/the-canvas-cafe-detail-1.svg",
      "/images/projects/the-canvas-cafe-detail-2.svg",
      "/images/projects/the-canvas-cafe-detail-3.svg",
    ],
    story: [
      "A neighbourhood café designed to feel like an extension of the street it sits on — warm, unpretentious, built to be lived in daily.",
      "Custom banquettes, low lighting and a material palette drawn from the surrounding architecture ground the space in its context.",
    ],
    materials: ["Terracotta", "Cane webbing", "Brass detailing"],
    outcome: "Now the neighbourhood's daily meeting point, at capacity most mornings.",
  },
  {
    slug: "orchid-boutique-hotel-lobby",
    name: "Orchid Boutique Hotel Lobby",
    location: "Bengaluru",
    category: "Hospitality",
    year: "2022",
    client: "Orchid Hospitality",
    area: "4,500 sq.ft.",
    duration: "8 months",
    cover: "/images/projects/orchid-boutique-hotel-lobby-cover.svg",
    gallery: [
      "/images/projects/orchid-boutique-hotel-lobby-detail-1.svg",
      "/images/projects/orchid-boutique-hotel-lobby-detail-2.svg",
      "/images/projects/orchid-boutique-hotel-lobby-detail-3.svg",
    ],
    story: [
      "A hotel arrival sequence redesigned to slow guests down the moment they step through the door — layered lighting, a sculptural staircase, and materials chosen to age beautifully.",
    ],
    materials: ["Travertine", "Brushed brass", "Hand-knotted rugs"],
    outcome: "A lobby that has become the hotel's most photographed space.",
  },
  {
    slug: "indiranagar-loft",
    name: "Indiranagar Loft",
    location: "Bengaluru",
    category: "Residential",
    year: "2022",
    client: "Private Residence",
    area: "1,800 sq.ft.",
    duration: "4 months",
    cover: "/images/projects/indiranagar-loft-cover.svg",
    gallery: [
      "/images/projects/indiranagar-loft-detail-1.svg",
      "/images/projects/indiranagar-loft-detail-2.svg",
      "/images/projects/indiranagar-loft-detail-3.svg",
    ],
    story: [
      "A compact loft for a young professional, designed to feel expansive through material restraint rather than square footage.",
    ],
    materials: ["Micro-cement", "Ash wood", "Linen upholstery"],
    outcome: "A 1,800 sq.ft. home that reads as double its actual size.",
  },
  {
    slug: "vertex-tech-office",
    name: "Vertex Tech Office",
    location: "Bengaluru",
    category: "Office",
    year: "2023",
    client: "Vertex Technologies",
    area: "14,500 sq.ft.",
    duration: "7 months",
    cover: "/images/projects/vertex-tech-office-cover.svg",
    gallery: [
      "/images/projects/vertex-tech-office-detail-1.svg",
      "/images/projects/vertex-tech-office-detail-2.svg",
      "/images/projects/vertex-tech-office-detail-3.svg",
    ],
    story: [
      "A fast-growing engineering team needed a floor that could flex between deep-focus work and cross-team collaboration without either compromising the other.",
    ],
    materials: ["Exposed ceiling grid", "Acoustic felt", "Warm oak veneer"],
    outcome: "Employee survey satisfaction with the physical workspace rose from 61% to 92%.",
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Residential",
  "Commercial",
  "Office",
  "Retail",
  "Hospitality",
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
