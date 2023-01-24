/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  env: {
    REACT_APP_PUSHER_APP_ID: "1542831",
    REACT_APP_PUSHER_KEY: "a725a567ca186a3a7dea",
    REACT_APP_PUSHER_SECRET: "a0fb12e17608561b5bb0",
    REACT_APP_PUSHER_CLUSTER: "eu",
  },
};

module.exports = nextConfig;
