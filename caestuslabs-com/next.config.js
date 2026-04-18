/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable trailing slashes for cleaner URLs
  trailingSlash: false,
}

module.exports = nextConfig
