// Generates editorial-style placeholder artwork (duotone gradient + grain + line art)
// as local SVG assets, standing in for photography until real project photos are supplied.
// Swap files under /public/images/** (same names) with real photography at any time —
// the data files in /data/*.ts reference these paths and don't need to change.
import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";

// Brand palette (for reference — used as literal hex values below):
// ivory #F5F2EC, beige #DED6C8, charcoal #181818, black #0B0B0B,
// gold #B89A5A, bronze #8E7345

function grain(id, opacity = 0.05) {
  return `
  <filter id="grain-${id}">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise"/>
    <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${opacity} 0"/>
  </filter>`;
}

function svgWrap(id, w, h, defs, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>${defs}</defs>
  ${body}
  <rect width="${w}" height="${h}" filter="url(#grain-${id})" opacity="0.6"/>
</svg>`;
}

// Base duotone ground: two-tone diagonal gradient from the brand palette
function ground(id, w, h, from, to, angle = 135) {
  return `<linearGradient id="bg-${id}" gradientTransform="rotate(${angle})">
    <stop offset="0%" stop-color="${from}"/>
    <stop offset="100%" stop-color="${to}"/>
  </linearGradient>`;
}

// --- Line-art motifs (architectural, minimal, single-weight stroke) ---
const motifs = {
  sofa: (c) => `
    <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="120" y="420" width="560" height="180" rx="26"/>
      <rect x="140" y="360" width="520" height="110" rx="30"/>
      <rect x="100" y="440" width="60" height="140" rx="20"/>
      <rect x="640" y="440" width="60" height="140" rx="20"/>
      <line x1="120" y1="600" x2="120" y2="640"/>
      <line x1="680" y1="600" x2="680" y2="640"/>
    </g>`,
  chair: (c) => `
    <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M300 200 Q300 120 400 120 Q500 120 500 200 L500 340" />
      <rect x="260" y="340" width="280" height="40" rx="10"/>
      <line x1="280" y1="380" x2="270" y2="520"/>
      <line x1="520" y1="380" x2="530" y2="520"/>
      <line x1="300" y1="380" x2="300" y2="500"/>
      <line x1="500" y1="380" x2="500" y2="500"/>
    </g>`,
  lamp: (c) => `
    <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M340 140 L460 140 L500 280 L300 280 Z"/>
      <line x1="400" y1="280" x2="400" y2="560"/>
      <ellipse cx="400" cy="580" rx="90" ry="18"/>
    </g>`,
  building: (c) => `
    <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="160" y="120" width="480" height="480" />
      <line x1="160" y1="220" x2="640" y2="220"/>
      <line x1="160" y1="320" x2="640" y2="320"/>
      <line x1="160" y1="420" x2="640" y2="420"/>
      <line x1="160" y1="520" x2="640" y2="520"/>
      <line x1="300" y1="120" x2="300" y2="600"/>
      <line x1="440" y1="120" x2="440" y2="600"/>
      <line x1="580" y1="120" x2="580" y2="600"/>
    </g>`,
  plan: (c) => `
    <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="140" y="140" width="520" height="440"/>
      <line x1="140" y1="380" x2="420" y2="380"/>
      <line x1="420" y1="140" x2="420" y2="580"/>
      <rect x="480" y="200" width="120" height="90"/>
      <path d="M220 380 A80 80 0 0 1 300 300"/>
      <path d="M460 380 A70 70 0 0 0 530 450"/>
    </g>`,
  ceiling: (c) => `
    <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="120" y="140" width="560" height="360"/>
      <rect x="200" y="200" width="400" height="240"/>
      <rect x="280" y="260" width="240" height="120"/>
      <circle cx="400" cy="320" r="10" fill="${c}" stroke="none"/>
      <circle cx="250" cy="220" r="6" fill="${c}" stroke="none"/>
      <circle cx="550" cy="220" r="6" fill="${c}" stroke="none"/>
      <circle cx="250" cy="420" r="6" fill="${c}" stroke="none"/>
      <circle cx="550" cy="420" r="6" fill="${c}" stroke="none"/>
    </g>`,
  desk: (c) => `
    <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="140" y="320" width="520" height="24"/>
      <line x1="170" y1="344" x2="170" y2="520"/>
      <line x1="630" y1="344" x2="630" y2="520"/>
      <rect x="320" y="180" width="160" height="120" rx="6"/>
      <line x1="400" y1="300" x2="400" y2="320"/>
      <path d="M280 320 Q280 260 340 260 L360 260"/>
    </g>`,
  window: (c) => `
    <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="180" y="100" width="440" height="500"/>
      <line x1="400" y1="100" x2="400" y2="600"/>
      <line x1="180" y1="350" x2="620" y2="350"/>
      <path d="M180 600 L120 660 M620 600 L680 660"/>
    </g>`,
  texture: (c) => `
    <g fill="none" stroke="${c}" stroke-width="1.4" stroke-linecap="round">
      ${Array.from({ length: 14 })
        .map((_, i) => `<path d="M ${80 + i * 45} 100 Q ${100 + i * 45} 400 ${80 + i * 45} 700" />`)
        .join("")}
    </g>`,
  stair: (c) => `
    <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${Array.from({ length: 6 })
        .map(
          (_, i) =>
            `<path d="M${160 + i * 80} ${560 - i * 70} h80 v-70" />`
        )
        .join("")}
    </g>`,
  vase: (c) => `
    <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M360 160 Q330 260 350 340 Q300 420 320 520 Q330 580 400 580 Q470 580 480 520 Q500 420 450 340 Q470 260 440 160 Z"/>
      <line x1="330" y1="160" x2="470" y2="160"/>
    </g>`,
};

const motifKeys = Object.keys(motifs);

function makeArt({ id, w = 800, h = 700, from, to, angle, motif, stroke, grainOpacity = 0.045 }) {
  const defs = ground(id, w, h, from, to, angle) + grain(id, grainOpacity);
  const rect = `<rect width="${w}" height="${h}" fill="url(#bg-${id})"/>`;
  const art = motifs[motif] ? motifs[motif](stroke) : "";
  const vignette = `<rect width="${w}" height="${h}" fill="black" opacity="0.06"/>`;
  return svgWrap(id, w, h, defs, rect + art + vignette);
}

function save(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
}

const OUT = "public/images";

// Hero — large cinematic charcoal/gold duotone
save(
  `${OUT}/hero/hero-main.svg`,
  makeArt({ id: "hero", w: 1920, h: 1080, from: "#20201d", to: "#0B0B0B", angle: 120, motif: "window", stroke: "#B89A5A33", grainOpacity: 0.05 })
);

// Intro / storytelling
save(
  `${OUT}/intro/intro-01.svg`,
  makeArt({ id: "intro1", w: 1200, h: 1500, from: "#DED6C8", to: "#B89A5A", angle: 140, motif: "sofa", stroke: "#18181822" })
);
save(
  `${OUT}/intro/intro-02.svg`,
  makeArt({ id: "intro2", w: 900, h: 1100, from: "#181818", to: "#3a3630", angle: 100, motif: "vase", stroke: "#F5F2EC33" })
);

// About page
save(`${OUT}/about/about-hero.svg`, makeArt({ id: "abouthero", w: 1920, h: 1000, from: "#1c1b18", to: "#0B0B0B", angle: 110, motif: "building", stroke: "#B89A5A2e" }));
save(`${OUT}/about/about-01.svg`, makeArt({ id: "about1", w: 1000, h: 1300, from: "#DED6C8", to: "#c7bca7", angle: 150, motif: "chair", stroke: "#18181825" }));
save(`${OUT}/about/about-02.svg`, makeArt({ id: "about2", w: 1000, h: 1300, from: "#181818", to: "#2b2823", angle: 90, motif: "plan", stroke: "#B89A5A44" }));
save(`${OUT}/about/about-03.svg`, makeArt({ id: "about3", w: 1000, h: 800, from: "#8E7345", to: "#181818", angle: 130, motif: "lamp", stroke: "#F5F2EC30" }));

// Services (6)
const services = [
  { key: "residential", from: "#DED6C8", to: "#B89A5A", motif: "sofa" },
  { key: "commercial", from: "#181818", to: "#3a352c", motif: "building" },
  { key: "office", from: "#20201d", to: "#8E7345", motif: "desk" },
  { key: "fitout", from: "#0B0B0B", to: "#2c2620", motif: "plan" },
  { key: "ceiling", from: "#DED6C8", to: "#9c8a68", motif: "ceiling" },
  { key: "turnkey", from: "#181818", to: "#B89A5A", motif: "stair" },
];
services.forEach((s, i) => {
  save(
    `${OUT}/services/${s.key}.svg`,
    makeArt({ id: `svc${i}`, w: 1400, h: 1000, from: s.from, to: s.to, angle: 120 + i * 12, motif: s.motif, stroke: i % 2 ? "#F5F2EC33" : "#18181822" })
  );
});

// Projects (10) across categories
const projects = [
  { slug: "the-linden-residence", from: "#DED6C8", to: "#B89A5A", motif: "sofa" },
  { slug: "kaveri-heights-penthouse", from: "#181818", to: "#3a352c", motif: "vase" },
  { slug: "sterling-corporate-hq", from: "#20201d", to: "#8E7345", motif: "building" },
  { slug: "atelier-workspace", from: "#0B0B0B", to: "#2c2620", motif: "desk" },
  { slug: "maison-noir-boutique", from: "#181818", to: "#B89A5A", motif: "window" },
  { slug: "whitefield-family-home", from: "#DED6C8", to: "#c7bca7", motif: "chair" },
  { slug: "the-canvas-cafe", from: "#8E7345", to: "#181818", motif: "lamp" },
  { slug: "orchid-boutique-hotel-lobby", from: "#20201d", to: "#5c4c33", motif: "stair" },
  { slug: "indiranagar-loft", from: "#DED6C8", to: "#9c8a68", motif: "plan" },
  { slug: "vertex-tech-office", from: "#0B0B0B", to: "#3a352c", motif: "ceiling" },
];
projects.forEach((p, i) => {
  ["cover", "detail-1", "detail-2", "detail-3"].forEach((tag, j) => {
    save(
      `${OUT}/projects/${p.slug}-${tag}.svg`,
      makeArt({
        id: `${p.slug}-${tag}`,
        w: tag === "cover" ? 1600 : 1200,
        h: tag === "cover" ? 1100 : 1500,
        from: p.from,
        to: p.to,
        angle: 100 + i * 15 + j * 20,
        motif: motifKeys[(i + j) % motifKeys.length],
        stroke: j % 2 ? "#F5F2EC30" : "#18181822",
      })
    );
  });
});

// Materials (8 close-up textures)
const materials = ["wood", "stone", "fabric", "metal", "lighting", "concrete", "brass", "linen"];
materials.forEach((m, i) => {
  save(
    `${OUT}/materials/${m}.svg`,
    makeArt({
      id: `mat${i}`,
      w: 1000,
      h: 1300,
      from: i % 2 ? "#181818" : "#DED6C8",
      to: i % 2 ? "#8E7345" : "#B89A5A",
      angle: 60 + i * 25,
      motif: "texture",
      stroke: i % 2 ? "#F5F2EC2a" : "#1818181f",
      grainOpacity: 0.08,
    })
  );
});

// Testimonials backdrop
save(`${OUT}/testimonials/backdrop.svg`, makeArt({ id: "testi", w: 1600, h: 1000, from: "#0B0B0B", to: "#2c2620", angle: 125, motif: "window", stroke: "#B89A5A25" }));

// Instagram grid (8)
for (let i = 0; i < 8; i++) {
  save(
    `${OUT}/instagram/insta-${i + 1}.svg`,
    makeArt({
      id: `insta${i}`,
      w: 900,
      h: 900,
      from: i % 3 === 0 ? "#181818" : i % 3 === 1 ? "#DED6C8" : "#8E7345",
      to: i % 2 ? "#B89A5A" : "#0B0B0B",
      angle: 90 + i * 20,
      motif: motifKeys[i % motifKeys.length],
      stroke: i % 2 ? "#F5F2EC2f" : "#18181822",
    })
  );
}

// Open Graph image
save(`${OUT}/og/og-cover.svg`, makeArt({ id: "og", w: 1200, h: 630, from: "#181818", to: "#0B0B0B", angle: 130, motif: "building", stroke: "#B89A5A40" }));

console.log("Generated placeholder artwork.");
