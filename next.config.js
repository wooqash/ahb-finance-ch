const path = require('path');

module.exports = {
    i18n: {
      locales: ['en', 'de-CH', 'pl'],
      defaultLocale: 'de-CH',
      localeDetection: false,
    },
    images: {
      // loader: 'cloudinary',
      // path: 'https://res.cloudinary.com/zwds/image/upload/v1624333815/',
      domains: ['res.cloudinary.com']
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
}