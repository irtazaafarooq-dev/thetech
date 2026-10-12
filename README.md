# The Tech: homepage redesign

Pitch redesign of thetech.plus's homepage. Next.js 15 (App Router, static), Lenis, GSAP reveals.

    npm install
    npm run dev        # http://localhost:5520

- Every button points at the existing site and Whop store (`lib/site.ts → LINKS`), so this page can
  replace the current homepage without touching checkout, /apply, /outlooks or /orb.
- `lib/replay.ts`: the scripted NQ session for the scroll-driven "bar replay" (illustrative, for education).
- `components/SessionClock.tsx`: live countdown to the 9:30 ET open, shown in the visitor's time and Sydney time.
- Hidden from search engines while it's a pitch: `HIDE_FROM_SEARCH` in `lib/site.ts` and `next.config.mjs`.
