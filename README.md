# Scenes Tours & Travels

Official website for Scenes Tours and Travels, a travel agency in Kampala, Uganda.

**Live site:** https://shema-k.github.io/scenes-tours/

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home page: hero, active trips, savings planner, services, destinations, photo mosaic, trip history, about/story, team structure, contact |
| `trip.html` | Trip details page, loaded with `?id=queen-elizabeth`, `?id=diani-beach`, etc. |
| `admin.html` | Local trip database editor and media checker (not indexed) |

## Shared files

| File | Purpose |
| --- | --- |
| `data.js` | All trips, dates, prices, places, legal text, company story, services, destinations, team structure and the media finder |
| `app.js` | Rendering, filters, search suggestions, booking dialog, savings planner, team/story sections, media loading |
| `styles.css` | The complete theme (self-hosted fonts, responsive layout, photo bands) |
| `fonts/` | Self-hosted Inter and Playfair Display files |
| `*.webp` | Optimised photos used by the site, including the team portraits |
| `whatsapp-qr.png` | Scan-to-chat code for the contact section |
| `poster-*.webp`, `preview-*.mp4` | Lightweight card previews; full videos load only on request |
| `sitemap.xml`, `robots.txt` | Search engine files |
| `google8d8fb6d974d30f9c.html` | Google Search Console verification |

## Adding or changing trips

1. Open `admin.html` in a browser.
2. Add a trip or a new date. It appears on the site in that browser immediately.
3. Copy the export at the bottom of the admin page into `PUBLISHED` in `data.js` to publish it to every visitor.
4. Run the media check on the admin page to confirm every photo and video filename resolves.

## Company content

The story, statistics, services, destination cards, previous trips and team structure are all defined in `data.js` as `STORY`, `STATS`, `SERVICES`, `WORLD`, `PAST_TRIPS` and `TEAM`. Replace a team photo by dropping a new image in this folder and updating its file name in `TEAM`. Team members without a photo show their initials instead.

## Media and performance

- Photos are WebP. Card videos use a short `preview-*.mp4`; full videos load only when a visitor hovers, presses play, or opens the trip page.
- Fonts are self-hosted, so the site makes no third-party font request.
- The Google map loads only after the visitor clicks it.
- The media finder in `data.js` tries common folders, extensions and letter cases when a file is missing, and shows a branded placeholder instead of a blank box.

## Deployment

The site is plain static HTML, CSS and JavaScript. Push to `main` and GitHub Pages publishes it.
