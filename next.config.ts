import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // <-- Change this line
  images: {
    unoptimized: true,
  },
};

export default nextConfig;