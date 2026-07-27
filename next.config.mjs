/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: "/asphalt-price-per-ton-near-me",
        destination: "https://www.asphaltprice.com/asphalt-prices-by-state",
        permanent: true
      },
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
