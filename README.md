# Samridhi Ayurved & Nutraceutical — Corporate Website

A complete, production-oriented corporate website for **Samridhi Ayurved & Nutraceutical**,
a sole proprietorship based in Saharanpur, Uttar Pradesh, India, marketing Ayurvedic
and nutraceutical products under the registered Samridhi brand (Trade Mark № 4658771,
Class 5).

Built with **Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
PostgreSQL via Drizzle ORM · Framer Motion · Zod · Lucide**.

---

## 1. Editorial policy (read before editing content)

This site deliberately publishes **only facts corroborated by cited public sources**:

* Product records live in `src/lib/products.ts`. Each record carries `sources`,
  `verificationStatus` (`listing_verified` | `needs_review`) and `published` /
  `indexable` flags. Records marked `needs_review` render an explicit
  under-verification notice, carry no invented details, and are excluded from the
  sitemap and search indexing.
* No prices, margins, MOQs, dosage directions, certifications, testimonials or
  contact details are invented. Marketplace dosage copy is intentionally **not**
  republished — the physical product label is always treated as authoritative.
* To publish a product: add a record to `src/lib/products.ts` with `published:
  true`; set `indexable: true` only when its content is complete and approved.

### Verified source registry

| Fact | Source |
| --- | --- |
| Trade mark № 4658771, Class 5, registered; proprietor Ashish Rohella; address | Trade Marks Registry record via quickcompany.in |
| Marketer name & Saharanpur address per product | 1mg product listings |
| Samortho Syrup — 200/450 ml packs, listed ingredients | 1mg product pages |
| Stolaxum granules — 100 g pack, listed ingredients | 1mg product page |
| Hyperzyme Syrup — 200 ml bottle | 1mg Ayurveda category listing |
| Swas-Sam Cough Syrup — 100/200 ml packs | IndiaMART listing |
| Nature of business (retail/wholesale), proprietorship | IndiaMART supplier profile |

## 2. Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

### Environment variables (`.env`)

```env
# Required
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db

# Canonical origin used for canonical URLs, sitemap, robots.txt, JSON-LD
NEXT_PUBLIC_SITE_URL=https://www.example.com

# Optional — email notifications for enquiries.
# Without these, enquiries are still stored in PostgreSQL; no notification is sent.
CONTACT_EMAIL=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
```

Apply the database schema:

```bash
npx drizzle-kit push
```

## 3. Production build & deployment

```bash
npm run build
npm run start
```

Deployment notes:

1. Provision PostgreSQL and set `DATABASE_URL`.
2. Run `npx drizzle-kit push` once to create the `enquiries`/`products` tables.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain **before** launching so
   canonical tags, the sitemap and JSON-LD point to the right origin.
4. Configure SMTP variables if the company wants email notifications; submissions
   work and are persisted either way. Email delivery must be tested with the real
   credentials before being announced to the client as working.

## 4. Security & form handling

Both enquiry endpoints (`/api/contact`, `/api/distributor-enquiry`) implement:

* JSON-only content-type guard
* server-side **Zod** validation with field-level error responses
* honeypot field + minimum fill-time trap
* per-IP sliding-window rate limiting (5 / 10 min)
* one-way SHA-256 hashing of requester IPs (raw IPs are never stored)
* Drizzle persistence into the `enquiries` table, optional SMTP notification

## 5. Project structure

```
src/
  app/                    # routes: /, /about, /products(+[slug]), /quality,
                          # /contact, /distributor-enquiry, /faq,
                          # /privacy-policy, /terms, /disclaimer, 404,
                          # sitemap.ts, robots.ts, api/*
  components/             # header, footer, forms, explorer, accordion, …
  lib/                    # site config, product catalogue (source of truth),
                          # validation schemas, rate limiter, email, SEO helpers
  db/                     # Drizzle client + schema (enquiries, products-readiness)
```

The `products` DB table mirrors the catalogue shape so a future **admin
dashboard** (authentication, product CRUD, enquiry review) can be added without
restructuring the public site. It is intentionally out of scope until secure
authentication is configured — no fake login ships with this codebase.

## 6. Missing information — client must supply

* Official phone number and business email address (none verified publicly)
* Verified business hours
* Confirm current manufacturing arrangements and whether the company owns or
  contracts manufacturing (listings mention Sonepat (Haryana) and "RSK / RSK Pharma")
* Product label photographs for each SKU (current imagery is AI-generated,
  clearly-captioned illustrative visuals)
* Any certifications/licences to be displayed, with document proofs

## 7. Facts pending client verification

* Whether **Samortho Oil**, **Samliv+ Z Syrup** and **Samdiaba** are currently
  marketed, their formulations and pack sizes (shown as *under review* on the site)
* Whether the "Samortho Syrup & Tablet" bundle on IndiaMART implies a live tablet SKU
* Founding/history narrative, team size, distribution footprint
* GSTIN (IndiaMART shows a masked GST number — not published here)

## 8. External integrations requiring credentials

| Integration | Purpose | Variables | Behaviour when unset |
| --- | --- | --- | --- |
| SMTP email | Notify team of new enquiries | `CONTACT_EMAIL`, `SMTP_*` | Enquiries persist in PostgreSQL only |

## 9. Final pre-launch checklist for the client

1. Approve legal pages (privacy / terms / disclaimer) with company counsel.
2. Supply verified contact details to replace the "coming soon" notices.
3. Replace illustrative imagery with real pack photography.
4. Confirm which `needs_review` products remain active, then complete their records.
5. Test one contact and one distributor submission with production SMTP configured.
