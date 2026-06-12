import { MetadataRoute } from 'next';
import { db as prisma } from "@/lib/db";

const BASE_URL = 'https://www.terailawassociation.org.np';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const staticRoutes = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/membership`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/publications`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  try {
    // Dynamic Events
    const events = await prisma.event.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true }
    });
    
    const eventRoutes = events.map(event => ({
      url: `${BASE_URL}/events/${event.slug}`,
      lastModified: event.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Dynamic Publications
    const publications = await prisma.publication.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true }
    });

    const publicationRoutes = publications.map(pub => ({
      url: `${BASE_URL}/publications/${pub.slug}`,
      lastModified: pub.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

    return [...staticRoutes, ...eventRoutes, ...publicationRoutes];
  } catch (error) {
    console.error("Sitemap generation failed due to database error.", error);
    return staticRoutes;
  }
}
