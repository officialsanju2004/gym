# Gym Supplements Website (React + Express)

Multi-page gym supplements showcase. Home, Supplements (filter / search / sort), product pages (`/supplements/:slug`), About, Contact. Old `/equipment/...` links redirect to `/supplements`. "Buy Now" and the floating button open WhatsApp; both contact forms email the owner's Gmail through the Express API.

## Status — read first
- Backend validation, rate limiting and error handling were tested locally. **Gmail delivery has NOT been tested** — it needs your credentials. Follow "Test email delivery" below before launch.
- No product photos are bundled. Until you add them, a designed placeholder shows (no broken images).
- Product details are **sample data** (flagged in the UI). Prices are "Request a quote". Replace with the real label info (nutrition facts, ingredients, pack sizes) in `client/src/data/products.js`.
- Check the claims on the Home page ("Genuine products", "Transparent labels") are true for your business, and that your supplements meet the labelling and licensing rules where you sell (e.g. FSSAI in India).
- The UI has not been checked in a real browser/device matrix yet. Run the checklist below.

## Quick start
```bash
# 1. API
cd server && cp .env.example .env     # fill in values
npm install && npm run dev            # http://localhost:5000

# 2. Frontend (new terminal)
cd client && cp .env.example .env     # set VITE_WHATSAPP_NUMBER
npm install && npm run dev            # http://localhost:5173  (/api is proxied to :5000)
```

## Replace placeholders before deploying
| What | Where |
|---|---|
| Brand name, tagline, story, phone/email/hours/address, testimonials | `client/src/config/site.js` |
| WhatsApp number (digits only, e.g. `919876543210`) | `client/.env` → `VITE_WHATSAPP_NUMBER` |
| Products, prices, verified label details | `client/src/data/products.js` |
| Product photos | `client/public/images/products/<slug>.jpg` and optional `<slug>-2.jpg` |
| Production URL for canonical/OG | `client/.env` → `VITE_SITE_URL`; update `public/robots.txt` and add a sitemap |

Contact details left empty in `site.js` are simply hidden — nothing is invented. Testimonials render only when you add real ones.

## Gmail setup
1. Use a Google account with **2-Step Verification** on.
2. Create an **App Password**: Google Account → Security → 2-Step Verification → App passwords.
3. In `server/.env`: `GMAIL_USER` = that Gmail address, `GMAIL_APP_PASSWORD` = the 16-character app password (spaces are stripped automatically), `CONTACT_RECEIVER` = inbox that should receive enquiries.
4. Never use your normal Gmail password and never commit `.env`.

If App Passwords are unavailable (e.g. some Workspace accounts): ask the admin to enable them, or switch `server/services/emailService.js` to another SMTP provider (Brevo, Resend SMTP, SendGrid) — only the transport block changes.

## Test email delivery
```bash
curl localhost:5000/api/health        # "emailConfigured": true
curl -X POST localhost:5000/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"you@example.com","phone":"+919876543210","subject":"Test","message":"Testing delivery."}'
```
Expect `{"success":true,...}` and an email in `CONTACT_RECEIVER` (check Spam once). Then submit both website forms. Without credentials the API returns 503 and the form tells the visitor to use WhatsApp.

## Deploy
- **API** (Render / Railway / VPS): root `server`, start `npm start`. Set `PORT`, `CLIENT_URL` (your site origin, comma-separate multiple), `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_RECEIVER`.
- **Frontend** (Netlify / Vercel / Cloudflare Pages): root `client`, build `npm run build`, output `dist`. Set `VITE_WHATSAPP_NUMBER`, `VITE_API_URL` (API origin), `VITE_SITE_URL`. SPA fallback is included (`public/_redirects` for Netlify; on Vercel add a rewrite of `/(.*)` to `/index.html`).

## Testing checklist
- [ ] Navbar, footer and mobile menu links work; every route loads when opened directly
- [ ] Category tiles on Home open Supplements with the right filter; filter, search, sort, clear, empty state
- [ ] Each `/supplements/:slug` loads the right product; unknown slug shows 404; `/equipment` redirects
- [ ] Buy Now (cards + details, with variant) opens WhatsApp with that product's name in the message
- [ ] Floating WhatsApp button works on every page and doesn't cover form buttons on mobile
- [ ] Both forms: invalid input blocked, loading state, success message, server-error message, no double submit
- [ ] Email arrives at `CONTACT_RECEIVER`; replying goes to the customer
- [ ] 6th submission within 15 minutes is rate-limited
- [ ] Layout at 360 / 390 / 768 / 1024 / 1440 px, no horizontal scroll
- [ ] Keyboard-only navigation, visible focus, reduced-motion setting respected
- [ ] No console errors
