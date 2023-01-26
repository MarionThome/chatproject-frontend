/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  env: {
    REACT_APP_PUSHER_APP_ID: "1542831",
    REACT_APP_PUSHER_KEY: "e9f0119292b8f4083393",
    REACT_APP_PUSHER_SECRET: "8a0e0b8a99140f045c63",
    REACT_APP_PUSHER_CLUSTER: "eu",
  },
};

module.exports = nextConfig;