const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  // },
  // typescript: {
  //   ignoreBuildErrors: process.env.NODE_ENV === 'development',
  // },
    // Other Next.js configuration ...
};

module.exports = withNextIntl(nextConfig);
