// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fallbacks untuk browser environment
      config.resolve.fallback = {
        // Add your fallbacks here
      };
    }
    return config; // Don't forget to return the modified config
  },
};

export default nextConfig;
