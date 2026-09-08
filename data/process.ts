export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    description: "Understanding the client, space and requirements.",
  },
  {
    index: "02",
    title: "Design",
    description: "Creating concepts, layouts and visual direction.",
  },
  {
    index: "03",
    title: "Plan",
    description: "Finalizing materials, timelines and execution.",
  },
  {
    index: "04",
    title: "Build",
    description: "Bringing the design to life with skilled execution.",
  },
  {
    index: "05",
    title: "Deliver",
    description: "Finishing every detail and handing over a space ready to experience.",
  },
];
