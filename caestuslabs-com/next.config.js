/** @type {import('next').NextConfig} */ // deploy
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable trailing slashes for cleaner URLs
  trailingSlash: false,
}

module.exports = nextConfig
