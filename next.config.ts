

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fallbacks untuk browser environment
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        pg: false,
        'pg-hstore': false,
      };
    }
    return config;
  },
  // External packages yang tidak di-bundle untuk client
  experimental: {
    serverComponentsExternalPackages: ['pg', 'pg-hstore', 'pg-pool']
  }
};

module.exports = nextConfig;