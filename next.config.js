/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/feed/General",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
