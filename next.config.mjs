/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/bloom-bot",
        destination: "/garden-lab/bloom-bot-ai",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
