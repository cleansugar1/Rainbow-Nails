# Rainbow Nails — Website

A retro, rainbow-striped static website for Rainbow Nails, 1148 Koko Head Ave, Kaimukī, Honolulu.
Plain HTML/CSS/JS with no build step, ready for GitHub + Vercel.

## Pages
- `index.html`: Home (hero, quick info, services overview)
- `services.html`: Full service menu, without prices
- `gallery.html`: Nail photo grid (placeholders for now)
- `about.html`: About the salon
- `contact.html`: Visit page with tap-to-call, hours, parking and a Google Map
- `404.html`: Not-found page (Vercel uses it automatically)

## Files
| File | Purpose |
|---|---|
| `style.css` | All styles; colors and fonts are set at the top in `:root` |
| `nav.js` | Mobile menu, highlights today's hours, footer year |
| `logo-mark.svg` | Rainbow logo mark used in the nav and favicon |
| `favicon*.png`, `favicon.ico`, `apple-touch-icon.png` | Browser and phone icons |
| `gallery-*.jpg` | Gallery photos (tap to enlarge) |
| `og-image.png` | Preview image shown when the link is shared |
| `vercel.json` | Clean URLs (`/services` instead of `/services.html`) |

---

## Deploying to GitHub + Vercel

### Step 1: Push to GitHub
1. Create a new repository at github.com (e.g. `rainbow-nails`)
2. In your terminal, from this folder:
```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rainbow-nails.git
git push -u origin main
```
(Or use GitHub's **Add file → Upload files** and drag in everything in this folder.)

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import the `rainbow-nails` repo
4. Leave all settings as they are (Framework Preset: **Other**, no build command)
5. Click **Deploy**

Your site will be live at `https://rainbow-nails.vercel.app` (or similar).

### Step 3: Custom domain (optional)
Go to Vercel → Project Settings → Domains, add your domain, and follow the DNS instructions.

---

## Customization checklist
- [x] **Gallery photos:** 10 photos added (`gallery-1.jpg` … `gallery-10.jpg`). To add more, save the next number and copy a `<a class="g-tile">` line in `gallery.html` with a short description in `alt`
- [ ] **About photo:** add `about-salon.jpg` and follow the comment in `about.html`
- [ ] **About story:** the copy marked `<!-- EDIT -->` in `about.html` is a draft; confirm it with the owners
- [ ] **Services:** double-check the list in `services.html` against the current menu
- [ ] **Hours:** if they change, update `contact.html`, the footer on every page, and the home page info strip
- [ ] **Logo:** to use the salon's own logo, replace `logo-mark.svg` (and regenerate the favicons)

## Notes
- Every "Call" button uses `tel:+18087351751`, so it dials directly on phones. On mobile, a "Call to book" bar stays at the bottom of the screen.
- The map is a standard Google Maps embed and needs no API key.
- Fonts (Shrikhand and Figtree) load from Google Fonts.
