/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
  images: {
    domains: ['picsum.photos', 'firebasestorage.googleapis.com']
  }
}

module.exports = nextConfig
