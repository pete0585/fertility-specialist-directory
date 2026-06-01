# Fertility Specialist Directory

A modern, SEO-optimized directory of fertility specialists, reproductive endocrinologists (REIs), and fertility-adjacent providers across the US. Built with Next.js 14, Tailwind CSS, Supabase, and Stripe.

**Domain:** fertilityspecialistdirectory.com  
**Repo:** pete0585/fertility-specialist-directory  
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Supabase, Stripe  
**Design:** Warm cream + deep teal + warm gold — clinical-but-human

---

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` — from Supabase project settings
- `STRIPE_SECRET_KEY` + `STRIPE_PUBLISHABLE_KEY` + `STRIPE_WEBHOOK_SECRET` — from Stripe dashboard
- `STRIPE_PRICE_ID_PREMIUM` / `STRIPE_PRICE_ID_FEATURED` / `STRIPE_PRICE_ID_CLINIC` — create these in Stripe (Annual subscriptions: $299, $499, $799)
- `RESEND_API_KEY` + `RESEND_FROM_EMAIL` — from Resend (use mail subdomain)
- `ADMIN_SECRET` — random string, used for admin panel password

### 3. Apply Supabase migration

In the Supabase project (`fbuqrnzofktepkzyfmhy` — Directories project):

```bash
# Via Supabase CLI
supabase db push

# Or manually: paste supabase/migrations/001_initial_schema.sql into Supabase SQL editor
```

### 4. Seed initial data

```bash
# Load 5 sample listings (for local dev)
npm run seed

# Pull real REI specialists from NPI (top 10 states, ~500 listings)
npm run seed npi-top

# Pull all REIs from all 50 states (~1,200-1,500 listings)
npm run seed npi
```

### 5. Run dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Supabase Setup

1. **Project:** Use the shared Directories project (`fbuqrnzofktepkzyfmhy`). All tables are prefixed with `fertility_specialist_`.
2. **Apply migration:** Run `supabase/migrations/001_initial_schema.sql`
3. **Stripe Stripe products:** Create 3 products in Stripe for the 3 tiers. Add price IDs to env vars.

Tables created:
- `fertility_specialist_listings` — main directory table
- `fertility_specialist_claims` — token-based claim verification
- `fertility_specialist_payments` — payment audit log
- `fertility_specialist_reviews` — patient reviews (moderated)
- `fertility_specialist_city_pages` — SEO city page metadata
- `fertility_specialist_inbound_emails` — inbound Resend webhook emails

---

## Vercel Deployment

### 1. Create GitHub repo

```bash
gh repo create pete0585/fertility-specialist-directory --private --push --source=.
```

### 2. Connect to Vercel

Go to [vercel.com/new](https://vercel.com/new), import `pete0585/fertility-specialist-directory`.

Framework: Next.js (auto-detected)

### 3. Set environment variables in Vercel

In the Vercel project → Settings → Environment Variables, add all variables from `.env.example`.

Do NOT put env vars in `vercel.json` — they go in the dashboard only.

### 4. Configure custom domain

In Vercel → Domains → Add `fertilityspecialistdirectory.com`. Add the DNS records shown to Namecheap.

### 5. Configure Stripe webhook

In Stripe Dashboard → Webhooks → Add endpoint:
- URL: `https://fertilityspecialistdirectory.com/api/webhooks/stripe`
- Events: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`

Copy the signing secret into `STRIPE_WEBHOOK_SECRET` in Vercel.

### 6. Configure Resend inbound (optional)

In Resend → Domains → Add `mail.fertilityspecialistdirectory.com` subdomain. Add DNS records to Namecheap. Set webhook URL to `https://www.fertilityspecialistdirectory.com/api/inbound-email`.

### 7. Configure Google Search Console

Add and verify `fertilityspecialistdirectory.com` in GSC. Submit sitemap: `https://fertilityspecialistdirectory.com/sitemap.xml`.

---

## Pricing Tiers

| Tier | Price | Stripe Price ID |
|------|-------|-----------------|
| Free / Unclaimed | $0 | — |
| Premium | $299/year | `STRIPE_PRICE_ID_PREMIUM` |
| Featured | $499/year | `STRIPE_PRICE_ID_FEATURED` |
| Clinic | $799/year | `STRIPE_PRICE_ID_CLINIC` |

---

## Admin Panel

Access at `/admin`. Password is `ADMIN_SECRET` env var.

Actions:
- Approve / reject listing submissions
- View all paid listings
- View pending claims

---

## Data Sources

1. **NPI Registry** — Primary seed. All REI specialists nationwide via taxonomy `207VE0102X`. Free, no auth required.
2. **DataForSEO** — Enrichment layer. Run the data-seeder agent after launch for city-by-city growth.
3. **Self-submit form** — `/submit` page for practitioners not in seed data.

---

## SEO Structure

- `/listings/[slug]` — Individual provider pages (MedicalBusiness + Physician JSON-LD)
- `/categories/[slug]` — Specialty landing pages (ItemList JSON-LD)
- `/listings` — Browse page with filters
- `/sitemap.xml` — Auto-generated, submit to GSC

---

## Development Notes

- Server components by default; client components (`'use client'`) only for interactive UI
- All Supabase writes use service role key via `createServiceClient()`
- Admin auth uses a simple cookie + env var check (no Supabase Auth)
- Claim flow uses custom token system (not Supabase Auth magic links)
- Never display SART IVF success rate data — always link to sartcorsonline.com
