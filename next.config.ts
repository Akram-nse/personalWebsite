import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The portfolio moved to the site root and the inspo page was retired.
  // Keep previously shared links working.
  async redirects() {
    return [
      { source: "/portfolio", destination: "/", permanent: true },
      { source: "/inspo", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
