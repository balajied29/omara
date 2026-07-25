import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (roughly 40–50% smaller than JPEG at matching quality),
    // WebP as the fallback for older mobile browsers.
    formats: ["image/avif", "image/webp"],
    // 60 is for full-bleed decorative photography sitting behind a gradient
    // scrim — the loss is invisible there and saves real bytes on mobile.
    qualities: [60, 75],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
