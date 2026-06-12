import { MetadataRoute } from 'next'
import { organization } from '@/lib/data/organization'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: organization.name,
    short_name: organization.shortName,
    description: 'Protecting students\' rights and promoting legal literacy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#0F172A',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
    ],
  }
}
