/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com", "ethplorer.io"],
  },
};

module.exports = nextConfig;
