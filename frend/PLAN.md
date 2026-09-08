# NurseConnect — Full App Plan

This document sketches how the landing page grows into the full product:
nurse discovery, profiles, booking, and dashboards for both families and
nurses.

## 1. Route map (Next.js App Router)

```
app/
├── page.tsx                     Landing page (done)
├── how-it-works/page.tsx
├── for-nurses/page.tsx          Marketing page to recruit nurses
├── login/page.tsx
├── signup/page.tsx
│
├── nurses/
│   ├── page.tsx                 Browse/search nurses (filters: specialty,
│   │                            location, availability, rating)
│   └── [nurseId]/page.tsx       Nurse profile: bio, credentials, reviews,
│                                availability calendar, "Book Now" CTA
│
├── ai-match/page.tsx            Multi-step questionnaire -> match results
│
├── booking/
│   ├── [nurseId]/page.tsx       Booking flow: date/time, care type, address,
│   │                            payment
│   └── confirmation/[bookingId]/page.tsx
│
├── dashboard/                   Auth-gated, role-based (family vs nurse)
│   ├── layout.tsx               Shared shell: sidebar nav + auth guard
│   ├── page.tsx                 Overview (upcoming visits, quick actions)
│   ├── bookings/page.tsx        Booking history & status
│   ├── messages/page.tsx        Secure messaging with nurse/family
│   ├── payments/page.tsx        Payment methods & invoices
│   └── profile/page.tsx         Account & care-preference settings
│
├── nurse-dashboard/             Separate shell for the nurse-facing side
│   ├── page.tsx                 Today's schedule, new requests
│   ├── requests/page.tsx        Incoming booking requests to accept/decline
│   ├── earnings/page.tsx
│   └── profile/page.tsx         Credentials, specialties, availability
│
└── api/                         Route handlers (or swap for a separate
    ├── nurses/route.ts          backend later)
    ├── bookings/route.ts
    ├── match/route.ts           AI matching endpoint
    └── auth/[...nextauth]/route.ts
```

## 2. Data model (sketch)

```
User        { id, role: "family" | "nurse", name, email, phone, avatarUrl }
NurseProfile{ id, userId, credential, specialties[], bio, hourlyRate,
              ratingAvg, reviewCount, verified: boolean, availability[] }
Booking     { id, familyId, nurseId, careType, startTime, endTime,
              address, status: "pending"|"confirmed"|"completed"|"cancelled",
              price }
Review      { id, bookingId, familyId, nurseId, rating, comment }
Message     { id, bookingId, senderId, body, sentAt }
```

Start with this in a Postgres DB (Prisma is a natural fit with Next.js) or a
managed backend (Supabase/Firebase) if you want to move faster before
building a custom API.

## 3. Suggested build order

1. **Nurse directory** (`/nurses`) — reuse the `nurses` data shape already in
   `data/nurses.ts`, move it behind an API route once there's a real DB.
2. **Nurse profile page** (`/nurses/[id]`) — static-ish page, no auth needed.
3. **Auth** — NextAuth.js (or Clerk/Supabase Auth) with two roles: family and
   nurse. Gate `/dashboard/*` and `/nurse-dashboard/*` via middleware.
4. **Booking flow** — form → review → confirm; store in `Booking` table;
   redirect to confirmation page.
5. **Dashboards** — read the logged-in user's bookings/messages.
6. **AI matching** — a form that posts answers to `/api/match`, which scores
   nurses server-side (start with simple rule-based scoring, swap in an LLM
   or embeddings-based matcher later).
7. **Messaging & payments** — messaging can start as simple polling or a
   provider like Stream/Pusher; payments via Stripe Connect (splits payment
   between platform and nurse).

## 4. Shared conventions

- **Styling**: Tailwind, with the `teal`/`navy`/`cloud` tokens defined in
  `tailwind.config.ts` — reuse these across every new page so the whole app
  stays visually consistent with the landing page.
- **Components**: keep `components/ui` for primitives (Button, Input, Card,
  Badge) and `components/sections` for page-specific composed sections.
  Dashboard-specific pieces can live in `components/dashboard`.
- **Data fetching**: Server Components by default; use Route Handlers under
  `app/api/*` for anything that needs to run on submit (bookings, auth,
  matching). Add a thin `lib/api.ts` client once real endpoints exist.
- **Forms**: keep them simple with native `<form>` + Server Actions where
  possible; reach for `react-hook-form` + `zod` if validation gets complex.

## 5. Immediate next steps

- Swap the Unsplash placeholder photos for real nurse/office photography.
- Wire the hero search form and AI-match CTA to real routes once they exist.
- Add `/nurses` and `/nurses/[id]` next — they unlock "Book Now" from the
  landing page's nurse cards.
