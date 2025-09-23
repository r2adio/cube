import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.d\.ts$/,
      loader: "ignore-loader",
    });
    return config;
  },
  // to allow cross-origin requests from localhost
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
};

export default nextConfig;
