/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
  env: {
    NEXT_PUBLIC_BFF_URL: process.env.NEXT_PUBLIC_BFF_URL,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    NEXT_PUBLIC_TENANT_NAME: process.env.NEXT_PUBLIC_TENANT_NAME,
    NEXT_PUBLIC_SIDEBAR_COLOR: process.env.NEXT_PUBLIC_SIDEBAR_COLOR,
    NEXT_PUBLIC_ACCENT_COLOR: process.env.NEXT_PUBLIC_ACCENT_COLOR,
  },
};
module.exports = nextConfig;
