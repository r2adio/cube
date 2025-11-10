import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // to allow cross-origin requests from localhost
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
};

export default nextConfig;
