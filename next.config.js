/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Makes production builds faster
  images: {
    domains: [
      'slyroze.com',           // Your domain
      'assets.coingecko.com',  // Example for token logos
      'ipfs.io',               // Example for NFTs on IPFS
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
  webpack: (config, { isServer }) => {
    // Fixes for ethers and other web3 libraries referencing node modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        crypto: false,
        http: false,
        https: false,
        stream: false,
        os: false,
        path: false,
        zlib: false,
        assert: false,
        url: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
