/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "robohash.org",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
