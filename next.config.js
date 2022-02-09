/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:3000/api/",
    NEXTAUTH_SECRET: "TELMOUNIVERSITY123",
  },
};

module.exports = nextConfig;
