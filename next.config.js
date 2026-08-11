/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === '1' || process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';

const nextConfig = {
  reactStrictMode: true,
  ...(isExport ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
