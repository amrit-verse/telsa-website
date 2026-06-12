import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/about',
        '/membership',
        '/events',
        '/publications',
        '/gallery',
        '/contact',
      ],
      disallow: [
        '/dashboard/',
        '/api/auth/',
        '/*?*' // Block search query parameters to prevent duplicate indexing
      ],
    },
    sitemap: 'https://www.terailawassociation.org.np/sitemap.xml',
  };
}
