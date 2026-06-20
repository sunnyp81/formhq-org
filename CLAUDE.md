# formhq-org — Project Brain

> Per-repo brain, migrated from central claude-memory 2026-06-20. Canonical project memory now lives here.

## Current state

formhq.org — hub-and-spoke programmatic SEO site for US business formation and commercial insurance. Dual monetisation: affiliate commissions (LLC formation services) + lead gen (insurance quotes via CTA-to-partner).

- **Stack:** Astro 6, React 19 (LeadCaptureForm only), Tailwind CSS 4 (Vite plugin), Cloudflare Pages.
- **Repo:** `sunnyp81/formhq-org`. Local: `C:\Users\sunny\projects\business-formation-site`. Branch: `master`.
- **Domain:** formhq.org (bought Apr 3 2026).
- **Status (Apr 3 2026):** Built, pushed to GitHub. Pending CF Pages connect + domain DNS — verify live status before assuming.
- **Scale target:** 5,200+ pages (50+ business types × 51 states). Architecture scales by adding JSON data entries only — no code changes. Current mock data: 2 business types (Cleaning, Landscaping) × 3 states (TX, CA, FL) = 21 pages.
- **Deploy:** CF Pages — connect Git, build `npm run build`, output `dist`. Point DNS to formhq.org.

## Key facts & warnings

- **Data model:** hybrid — JSON for structured data (`data/`), optional Markdown content collections for unique AI-generated prose (`src/content/business-state/`).
- **Key files:** `data/business-types.json`, `data/states.json`, `data/business-state-data.json` (keyed `business:state`), `data/affiliates/llc-providers.json`, `src/lib/data.ts` (typed loaders, cross-join), `src/lib/seo.ts` (title templates, meta, JSON-LD).
- **Routes:** `/start/[business]/` (business hub), `/start/[business]/[state]/` (~2,550 state spokes), `/insurance/[business]/[state]/` (~2,550 insurance spokes), `/llc/[state]/` (51 LLC spokes).
- No credentials in this repo. Affiliate IDs / form keys live in `G:\My Drive\_SHARED\ai-memory\` — never commit.
- Spec: `G:\My Drive\docs\superpowers\specs\2026-04-03-business-formation-site-design.md`. Plan: `G:\My Drive\docs\superpowers\plans\2026-04-03-business-formation-site.md`.

## History

- 2026-04-03 — Built + pushed. Next: connect CF Pages, point DNS, add remaining 48+ business types and 48 states to JSON, batch-generate AI prose for markdown slots.
