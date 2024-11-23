/** @type {import('next').NextConfig} */
const nextConfig = {
  //I want to host this as a static site, so update with the required config
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
