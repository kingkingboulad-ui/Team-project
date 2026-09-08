# NurseConnect

A Next.js 14 (App Router) + TypeScript + Tailwind CSS rebuild of the
NurseConnect landing page, transformed from a Figma design.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Project structure

```
app/
  layout.tsx        Root layout, font + metadata
  page.tsx           Landing page (composes all sections below)
  globals.css         Tailwind + shared utility classes (.btn, .eyebrow, ...)
components/
  layout/
    Navbar.tsx
    Footer.tsx
  sections/
    Hero.tsx
    HowItWorks.tsx
    AIMatch.tsx
    MeetNurses.tsx
    CareYouCanTrust.tsx
    Testimonials.tsx
    CTASection.tsx
  ui/
    Button.tsx
data/
  nurses.ts          Nurse profile placeholder data
  testimonials.ts
  content.ts          Steps, trust features, stats
```

## Design tokens

Defined in `tailwind.config.ts`:

- `teal-*` — the deep teal used across the hero, AI-match, and CTA sections
- `navy-*` — the dark navy footer
- `cloud` — the light off-white section background

Swap these hex values if your Figma file uses slightly different shades —
everything in the components references the token names, not raw hex, so a
palette change only needs to happen in one place.

## Next steps

See `PLAN.md` for how this landing page grows into the full app: nurse
directory & profiles, booking flow, AI matching, and family/nurse
dashboards.
