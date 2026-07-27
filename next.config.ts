import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const contentSecurityPolicy = `
  default-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  object-src 'none';
  script-src 'self' 'unsafe-inline' ${
    isProduction ? "" : "'unsafe-eval'"
  };
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://cdn.sanity.io;
  font-src 'self' data:;
  media-src 'self' blob: https://cdn.sanity.io;
  connect-src
    'self'
    https://*.sanity.io
    https://*.api.sanity.io
    https://*.apicdn.sanity.io
    wss://*.sanity.io;
  worker-src 'self' blob:;
  manifest-src 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const studioContentSecurityPolicy = `
  default-src 'self' https://*.sanity.io;
  base-uri 'self';
  form-action 'self' https://*.sanity.io;
  frame-ancestors 'self';
  object-src 'none';
  script-src
    'self'
    'unsafe-inline'
    'unsafe-eval'
    https://*.sanity.io;
  style-src
    'self'
    'unsafe-inline'
    https://*.sanity.io;
  img-src
    'self'
    blob:
    data:
    https://cdn.sanity.io
    https://*.sanity.io;
  font-src
    'self'
    data:
    https://*.sanity.io;
  media-src
    'self'
    blob:
    data:
    https://cdn.sanity.io
    https://*.sanity.io;
  connect-src
    'self'
    https://*.sanity.io
    https://*.api.sanity.io
    https://*.apicdn.sanity.io
    wss://*.sanity.io;
  frame-src
    'self'
    https://*.sanity.io;
  worker-src
    'self'
    blob:;
  manifest-src 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",
    ].join(", "),
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-site",
  },
];

const productionSecurityHeaders = isProduction
  ? [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ]
  : [];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],

    formats: ["image/avif", "image/webp"],

    qualities: [75, 86, 90, 92],

    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  poweredByHeader: false,

  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [
          ...securityHeaders,
          ...productionSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: studioContentSecurityPolicy,
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/((?!studio(?:/|$)).*)",
        headers: [
          ...securityHeaders,
          ...productionSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;