
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  output: 'export', // enables static export
  images: {
    unoptimized: true, // allows <Image /> to work in static export
  },
});

