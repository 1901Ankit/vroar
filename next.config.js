/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    domains: [
      "16.16.4.205",

      "vroar.s3.eu-north-1.amazonaws.com/vroar_images",
      "vroar.s3.eu-north-1.amazonaws.com",

      "vroar-bucket.s3.us-west-1.amazonaws.com",
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
