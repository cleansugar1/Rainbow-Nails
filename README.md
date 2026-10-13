# Rainbow Nails — Website

Retro rainbow + Hawaiʻi website for Rainbow Nails, 1148 Koko Head Ave, Kaimukī, Honolulu.
Plain HTML/CSS/JS with no build step, ready for GitHub + Vercel.

## Pages
- `index.html`: Home (Lēʻahi rainbow hero, quick info, services, photos, Mahalo band)
- `services.html`: Full service menu, without prices
- `gallery.html`: 10 nail photos that open full-size when tapped
- `about.html`: About the salon
- `contact.html`: Visit page with tap-to-call, hours, parking and a Google Map
- `book.html`: Request an appointment (services, time estimate, calendar, start times)
- `404.html`: Not-found page (Vercel uses it automatically)

## Files
| File | Purpose |
|---|---|
| `style.css` | All styles; colors and fonts are set at the top in `:root` |
| `nav.js` | Mobile menu, today's hours, footer year, gallery photo viewer |
| `book.js` | The appointment request form |
| `gallery-1.jpg` … `gallery-10.jpg` | Gallery photos |
| `favicon*.png`, `favicon.ico`, `apple-touch-icon.png` | Browser tab and phone icons |
| `og-image.png` | Preview image shown when the link is shared |
| `vercel.json` | Clean URLs (`/services` instead of `/services.html`) |

### Logo files (for print, social media, signs)
| File | Use |
|---|---|
| `logo-main.png` | Main logo (transparent background) |
| `logo-main-dark.png` | Main logo on dark plum |
| `logo-icon.png` | Square icon |
| `logo-profile.png` | Round profile picture for Instagram and Google |
| `logo-badge.png` | Round badge for stickers, cards and window decals |

For large signs or professional printing, have a designer redraw the logos as vector files.

---

## Deploying to GitHub + Vercel

**Important:** `index.html` must sit at the top level of the repository, not inside a folder.
When uploading, open the `rainbow-nails-site` folder and upload **everything inside it**.

### Step 1: Push to GitHub
1. Create a new repository at github.com (e.g. `rainbow-nails`)
2. Either use **Add file → Upload files** and drag in everything inside this folder, or from a terminal in this folder:
```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rainbow-nails.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project** and import the repo
3. Leave the settings as they are (Framework Preset: **Other**, no build command)
4. Click **Deploy**

If you see Vercel's "404: NOT_FOUND" page, the files are inside a subfolder. Either move them to the top of the repo, or set **Settings → Build and Deployment → Root Directory** to that folder and redeploy.

### Step 3: Custom domain (optional)
In Vercel, go to **Settings → Domains**, add your domain, and follow the DNS instructions.

---

## Connecting the appointment form (Formspree)

Until this is done, the form tells customers to call instead.

1. Create a free account at [formspree.io](https://formspree.io)
2. Click **+ New Form**, name it "Appointment requests", and set the email that should receive requests
3. Copy the form's endpoint. It looks like `https://formspree.io/f/abcdwxyz`, and the part after `/f/` is your form ID
4. In `book.html`, find `YOUR_FORM_ID` and replace it with your form ID
5. Commit the change. Vercel redeploys on its own
6. Send a test request, then confirm your email the first time Formspree asks

Each request email includes the name, phone, optional email, the services picked, the estimated time, the preferred day and start time, and any notes.

**Get alerts on your phone:** turn on notifications for that email inbox (or just for emails from Formspree) in your phone's mail app.

### Changing service times
Each service in `book.html` has its length in two places:
```html
<input type="checkbox" value="Gel manicure" data-min="45" /> … <span class="dur">45 min</span>
```
`data-min` is what the time slots use; the `dur` text is what customers see. Update both.

Opening hours for the form (9 am to 7 pm, start times every 30 minutes, up to 2 months ahead) are at the top of `book.js`.

---

## Customization checklist
- [ ] Connect Formspree (above)
- [ ] Confirm the service lengths in `book.html` with the owners
- [ ] **About story:** the copy marked `<!-- EDIT -->` in `about.html` is a draft; confirm it with the owners
- [ ] **About photo:** swap `gallery-2.jpg` in `about.html` for a salon photo if you have one
- [ ] **Services:** double-check `services.html` against the current menu
- [ ] **Hours:** if they change, update `contact.html`, the footer on every page, the home page info strip, and `book.js`

## Notes
- Every "Call" button dials `tel:+18087351751`. On phones, a "Call to book" bar stays at the bottom of the screen.
- The rainbow on the home page draws itself in when the page loads. Visitors who turn on "reduce motion" see it finished.
- The map is a standard Google Maps embed and needs no API key.
- Fonts (Shrikhand and Figtree) load from Google Fonts.
