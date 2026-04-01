import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/api/'], // Ensure the future CMS and APIs are not crawled
    },
    sitemap: 'https://sandeepreddy.dev/sitemap.xml',
  };
}
