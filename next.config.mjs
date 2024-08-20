/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
  images: {
      domains: ['file.digilogbook.ir'], // Add the domain of the external image source here
  },
}

export default nextConfig;
