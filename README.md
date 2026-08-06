# Beyond Burnups: promotional website

Static promotional site for *Beyond Burnups* by Nicolas Brown, built to
deploy on Cloudflare Pages with zero configuration. Plain HTML/CSS/JS,
no build step, no framework, no backend.

## File structure

```
/
├── index.html                    Homepage
├── buy.html                      Buy the Book
├── when-will-it-be-done.html     Chapter page: single-team Monte Carlo
├── feature-monte-carlo.html      Chapter page: Epic/Feature Monte Carlo
├── multi-team-monte-carlo.html   Chapter page: Multi-team Monte Carlo
├── contact.html                  Contact page
├── 404.html                      Custom not-found page
├── css/style.css                 All styles
├── js/main.js                    Mobile nav toggle + footer year
├── images/                       Add your real images here (see below)
│   ├── favicon.svg               Included, the curve mark, used as-is
│   └── charts/                   Chart GIFs for the three topic pages
├── robots.txt
├── sitemap.xml
├── _headers                      Cloudflare Pages security/caching headers
└── wrangler.toml                 Only needed for CLI deploys, see below
```

Every page currently shows a labelled grey placeholder wherever a real
image is missing, so the site looks intentional even before you've added
your photos, nothing looks broken.

## 1. Add your images

Nothing will break if you skip this, but do it before launch. Drop these
files into `/images/` with these exact names:

| File | Where it's used | Recommended size |
|---|---|---|
| `images/cover.jpg` | Book cover, homepage hero | Portrait, ~600×900px (2:3 ratio) |
| `images/author-photo.jpg` | Author photo, homepage | Square, 500×500px or larger |
| `images/og-image.jpg` | Social share preview (all pages) | 1200×630px |
| `images/charts/when-will-it-be-done.gif` | "When Will It Be Done?" page | Already added |
| `images/charts/feature-monte-carlo.gif` | "Epic/Feature Monte Carlo" page | Already added |
| `images/charts/multi-team-monte-carlo.gif` | "Multi-team Monte Carlo" page | Already added |

Each `<img>` tag has an HTML comment right above it in the source (search
for `REPLACE`) telling you exactly what goes there.

## 2. Update the placeholder text and links

Search each HTML file for `REPLACE` (all-caps, easy to grep for) to find
everything left to fill in:

- **Purchase links:** every Amazon/Leanpub button across the site
  (homepage hero, the three chapter pages, `buy.html`, and `contact.html`)
  currently points at `https://mybook.to/realworldagility` (Amazon) and
  `https://leanpub.com/realworldagility` (Leanpub). Both are real,
  working links, update them site-wide with a find-and-replace across
  the `.html` files whenever the real listing URLs are ready.
- **Retailer cards:** `buy.html` has an Amazon card, a Leanpub card, and
  a "coming soon" card. Duplicate the card markup for any further
  retailer or format (audiobook, regional store) as they go live.
- **Contact details:** `contact.html` uses the author's real email and
  GitHub. Update these if you'd rather route enquiries elsewhere, and add
  any social links you want listed (there's a comment marking where).
- **Marketing copy and author bio:** already written from the book's own
  introduction and "About the author" chapter. Edit directly in
  `index.html` if you want to adjust tone or length.

```bash
grep -rn "REPLACE" --include="*.html" .
```

## 3. Preview locally

No build step, so any static file server works:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or whatever port it prints).

## 4. Deploy on Cloudflare Pages

1. Push this folder to a new GitHub repository.
2. In the [Cloudflare dashboard](https://dash.cloudflare.com), go to
   **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/`
5. Click **Save and Deploy**. Cloudflare will give you a
   `*.pages.dev` URL immediately, no environment variables or secrets
   are needed anywhere in this project.
6. To use **beyondburnups.com**, move the domain onto Cloudflare's free
   plan first (registration stays with your registrar, e.g. IONOS, this
   just changes which nameservers answer DNS queries):
   - In the Cloudflare dashboard, **Add a site**, enter `beyondburnups.com`,
     pick the **Free** plan. Cloudflare scans your existing DNS records.
   - Cloudflare gives you two nameservers (something like
     `xxx.ns.cloudflare.com`). At your registrar (IONOS: **Domains & SSL
     → your domain → DNS → Nameservers → Edit**), replace the existing
     nameservers with those two and save.
   - Wait for Cloudflare to email you that the domain is active, usually
     minutes, sometimes a few hours.
   - Back in the Pages project, go to **Custom domains → Set up a custom
     domain**, enter `beyondburnups.com`. Since the zone is now on
     Cloudflare, the DNS record is created automatically and SSL issues
     within a few minutes.
   - Optionally repeat for `www.beyondburnups.com`, or add a redirect
     rule from www to the root domain in Cloudflare's dashboard.

Every step above is free: Cloudflare's plan, Pages hosting, and SSL. The
only cost is the domain registration you already have with IONOS.

From then on, every push to your main branch redeploys automatically.

### Optional: deploying from the command line instead

If you'd rather deploy from your terminal than connect a repo, the
included `wrangler.toml` supports that:

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy .
```

This isn't required for the dashboard/Git method above, it's only there
as an alternative.

## Notes

- **No environment variables, API keys, or secrets** are used anywhere in
  this project.
- `_headers` sets a few sensible security headers and long cache times
  for CSS/JS/images; Cloudflare Pages picks this file up automatically.
- Fonts (Newsreader, IBM Plex Sans, IBM Plex Mono) load from Google Fonts
  via a `<link>` tag, no local font files or build step needed.
