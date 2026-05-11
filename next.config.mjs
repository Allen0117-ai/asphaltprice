/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "asphaltprice.com"
          }
        ],
        destination: "https://www.asphaltprice.com/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
