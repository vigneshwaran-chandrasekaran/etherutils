/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com", "ethplorer.io", "images.cryptocompare.com"],
  },
};

module.exports = nextConfig;
