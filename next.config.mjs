const getConfig = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */

  const nextConfig = {
    ...defaultConfig,
    reactStrictMode: false,
    webpack: (config) => {
      config.resolve.fallback = {
        "mongodb-client-encryption": false,
        aws4: false
      };

      return config;
    },
    async headers() {
      return [
        {
          source: "/api/(.*)",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*"
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PATCH, DELETE"
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization"
            }
          ]
        }
      ];
    },
    async redirects() {
      return [
        {
          source: "/categories",
          destination: "/categories/sitemap.xml",
          permanent: true
        },
        {
          source: "/categories/pages",
          destination:
            "/categories/pages/sitemap.xml",
          permanent: true
        },
        {
          source: "/categories/pages/subpages",
          destination:
            "/categories/pages/subpages/sitemap.xml",
          permanent: true
        },
        {
          source: "/dynamic",
          destination: "/dynamic/sitemap.xml",
          permanent: true
        },
        {
          source: "/services",
          destination: "/services/sitemap.xml",
          permanent: true
        },
        {
          source: "/anniversary/1/2",
          destination: "/anniversary-decorations",
          permanent: true
        },
        {
          source: "/baby-shower/1/4",
          destination: "/baby-shower-decorations",
          permanent: true
        },
        {
          source: "/birthday/1/1",
          destination: "/birthday-decorations",
          permanent: true
        },
        {
          source: "/canopy/1/5",
          destination: "/canopy-decorations",
          permanent: true
        },
        {
          source: "/first-night/1/7",
          destination: "/first-night-decorations",
          permanent: true
        },
        {
          source: "/car-boot-surprise/1/8",
          destination:
            "/surprise-car-decorations",
          permanent: true
        },
        {
          source: "/welcome/1/3",
          destination:
            "/baby-welcome-decorations",
          permanent: true
        },
        {
          source: "/kids-party/1/6",
          destination: "/kids-theme-decoration",
          permanent: true
        },
        {
          source: "/proposal/1/10",
          destination: "/proposal-decorations",
          permanent: true
        },
        {
          source: "/bachelor-party/1/9",
          destination:
            "/bachelorette-decorations",
          permanent: true
        },
        {
          source: "/about-us",
          destination: "/pages/about-us",
          permanent: true
        },
        {
          source: "/cancellation-and-return",
          destination: "/pages/return-and-refund",
          permanent: true
        },
        {
          source: "/terms-and-conditions",
          destination:
            "/pages/terms-and-condition",
          permanent: true
        },
        {
          source: "/privacy-policy",
          destination: "/pages/privacy-policy",
          permanent: true
        },
        {
          source: "/shipping-and-return",
          destination: "/pages/shipping-policy",
          permanent: true
        },
        {
          source: "/cart/details",
          destination: "/cart",
          permanent: true
        },
        {
          source: "/welcome/1/3",
          destination:
            "/newborn-welcome-decoration",
          permanent: true
        },
        {
          source: "/baby-welcome-decorations",
          destination:
            "/newborn-welcome-decoration",
          permanent: true
        }
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname:
            "balloondekor-images.s3.ap-south-1.amazonaws.com",
          port: ""
        },
        {
          protocol: "https",
          hostname: "github.com",
          pathname: "/**",
          port: ""
        }
      ]
    }
  };
  return nextConfig;
};

export default getConfig;
