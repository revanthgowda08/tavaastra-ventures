import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Locally generated placeholder artwork is SVG until real photography is
    // supplied — safe to allow since all sources are our own static assets.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
