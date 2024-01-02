// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ], // Add other domains as needed
  },
};

module.exports = nextConfig;
