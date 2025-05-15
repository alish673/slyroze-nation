/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Makes production builds faster
  images: {
    domains: [
      'slyroze.com',        // Your domain
      'assets.coingecko.com', // Example for token logos
      'ipfs.io',              // Example for NFTs on IPFS
    ],
  },
  async redirects() {
    return [
      {
        source: '/nation',
        destination: '/nation',  // Keep this for routing, no .html needed
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
