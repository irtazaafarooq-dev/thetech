import type { MetadataRoute } from 'next';
import { HIDE_FROM_SEARCH, SITE_URL } from '@/lib/site';

// Crawling stays allowed on purpose: Google has to load the page to see its "noindex" tag.
export default function robots(): MetadataRoute.Robots {
  return HIDE_FROM_SEARCH
    ? { rules: { userAgent: '*', allow: '/' } }
    : { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
