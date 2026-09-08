export type Service = {
  index: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
};

export const services: Service[] = [
  {
    index: "01",
    slug: "residential-interiors",
    title: "Residential Interiors",
    description:
      "Homes designed around the people who live in them — from living spaces and bedrooms to complete home transformations.",
    longDescription:
      "We design homes that reflect the people who live in them — thoughtful layouts, considered materials and lighting that changes how a room feels through the day. From single rooms to full-home transformations, every decision starts with how you actually live.",
    image: "/images/services/residential.svg",
  },
  {
    index: "02",
    slug: "commercial-interiors",
    title: "Commercial Interiors",
    description:
      "Functional and inspiring spaces for businesses, retail environments and commercial properties.",
    longDescription:
      "Retail, hospitality and commercial environments built to hold a brand's identity while performing under real-world use — durable materials, considered wayfinding and spaces that invite people in.",
    image: "/images/services/commercial.svg",
  },
  {
    index: "03",
    slug: "office-interiors",
    title: "Office Interiors",
    description:
      "Workspaces designed for productivity, collaboration and culture.",
    longDescription:
      "Workplaces shaped around how teams actually work — focus areas, collaboration zones and materials that carry a company's culture into physical space.",
    image: "/images/services/office.svg",
  },
  {
    index: "04",
    slug: "fit-out-solutions",
    title: "Fit-Out Solutions",
    description:
      "End-to-end execution that transforms concepts into finished spaces.",
    longDescription:
      "Complete fit-out execution — civil work, MEP coordination, carpentry, finishing — managed under one roof so design intent survives all the way to handover.",
    image: "/images/services/fitout.svg",
  },
  {
    index: "05",
    slug: "ceiling-works",
    title: "Ceiling Works",
    description:
      "Thoughtfully designed ceiling solutions that add depth, character and functionality.",
    longDescription:
      "False ceilings, cove lighting and architectural detailing that add depth and rhythm to a space — designed alongside lighting and services, not as an afterthought.",
    image: "/images/services/ceiling.svg",
  },
  {
    index: "06",
    slug: "turnkey-interiors",
    title: "Turnkey Interiors",
    description: "From concept to completion. We manage design, materials, execution and finishing.",
    longDescription:
      "One team, one point of accountability, from the first concept sketch to the final finish — design, procurement, execution and handover managed as a single continuous process.",
    image: "/images/services/turnkey.svg",
  },
];
