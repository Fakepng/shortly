/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "platform-lookaside.fbsbx.com",
      "avatars.githubusercontent.com",
      "cdn.discordapp.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
