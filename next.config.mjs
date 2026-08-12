/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests"
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
];

const nextConfig = {
  typedRoutes: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/asphalt-driveway-estimate",
        destination: "https://www.asphaltprice.com/asphalt-driveway-cost-calculator",
        permanent: true
      },
      {
        source: "/blacktop-driveway-cost-estimator",
        destination: "https://www.asphaltprice.com/asphalt-driveway-cost-calculator",
        permanent: true
      },
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
