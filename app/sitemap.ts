import type { MetadataRoute } from 'next';
import { HIDE_FROM_SEARCH, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (HIDE_FROM_SEARCH) return [];
  return [{ url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }];
}
