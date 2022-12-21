/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;
