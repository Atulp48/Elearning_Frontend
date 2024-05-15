/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// const nextConfig = {
//   images: {
//     remotePatterns: ["res.cloudinary.com"],
//   },
// };

export default nextConfig;
