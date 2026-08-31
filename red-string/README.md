# Red String Theory — Quick Start

Open `index.html` in a browser (or run a local server — see below) to try it.
Login: **STARLIGHT** / **ILOVEYOU** (change these in `script.js`, top of file).

## 1. Add your photos
Drop image files into `/images` and name them (or rename in code) to match
the `image:` paths in the `memories` array at the top of `script.js`,
e.g. `images/photo1.jpg`. Any number of photos works — the red string
and layout adjust automatically. Portrait-ish photos (roughly 4:5) look best.

## 2. Edit the messages
Still in `script.js`, each entry in `memories` has:
- `text` — the caption
- `date` — optional small handwritten date
- `note` — optional tiny annotation like "favorite ♥"
- `frame` — `"cream"`, `"rose"`, or `"tape"` (mix these up for a handmade feel)
- `flower` — an emoji shown as a tiny decoration (leave `""` for none)

## 3. Add music
Place an MP3 at `audio/our-song.mp3` (use your own legally obtained audio).
Volume defaults to 20%, set via `CONFIG.VOLUME` in `script.js`.

## 4. Change the login
Edit `CONFIG.USERNAME` and `CONFIG.PASSWORD` near the top of `script.js`.
Note: this is a decorative, client-side login only — not real security.

## 5. Deploy for free
Easiest options:
- **Netlify Drop** (app.netlify.com/drop) — drag the folder in, done.
- **GitHub Pages** — push the folder to a repo, enable Pages in settings.
- **Vercel** — `vercel` CLI or drag-and-drop import from a repo.

## 6. Browser autoplay
Browsers block audio from playing automatically. Music starts right after
she logs in (that click counts as user interaction), so it should work.
If a browser still blocks it, the floating "♫ our soundtrack" button in the
corner starts it manually — the site works perfectly without music too.

## 7. Ideas for later
- Swap the Google Fonts for ones you like even more.
- Add a real date under each photo.
- Add 2–3 more memories — the red string layout scales to any number.
- Replace the flower emoji with your own small SVGs/pressed-flower PNGs
  if you want an even more handcrafted look.
