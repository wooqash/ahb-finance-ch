const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "de-CH", "pl"],
    defaultLocale: "de-CH",
    localeDetection: false,
  },
  images: {
    // loader: 'cloudinary',
    // path: 'https://res.cloudinary.com/zwds/image/upload/v1624333815/',
    domains: ["res.cloudinary.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/pl/coming-soon',
  //       destination: '/pl/strona-w-budowie',
  //       locale: false
  //     },
  //     {
  //       source: '/coming-soon',
  //       destination: '/kommt-bald',
  //       locale: false
  //     },
  //     {
  //       source: '/en/coming-soon',
  //       destination: '/en/coming-soon',
  //       locale: false
  //     },
  //   ]
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/coming-soon',
  //       permanent: true,
  //     },
  //   ]
  // },
};
