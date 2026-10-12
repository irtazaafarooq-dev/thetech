const HIDE_FROM_SEARCH = true; // keep in sync with lib/site.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/img/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          ...(HIDE_FROM_SEARCH ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
        ],
      },
    ];
  },
};

export default nextConfig;
