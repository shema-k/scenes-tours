# Scenes Tours & Travels

Official website for Scenes Tours and Travels, a youth-led, registered travel company in Kampala, Uganda.

**Live site:** https://shema-k.github.io/scenes-tours/

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home page: rotating hero and quick enquiry, four ways into the catalogue, a travel-desk news section, all trips with region filters and search, destinations, travel services, travel guides, gallery, savings planner, reviews, about/story, team, FAQ and contact |
| `trip.html` | Trip details page, loaded with `?id=queen-elizabeth`, `?id=murchison-falls`, etc. Includes highlights, photos and videos, booking, sharing and a sticky mobile booking bar |
| `admin.html` | Local trip database editor and media checker (not indexed) |

The main page uses tabs for Safaris, Destinations, Services, Travel guides, Gallery, Savings, Reviews, About us and Contact. The team and FAQ panels are kept for deep links (`#team`, `#faq`) and are linked from the About menu.

## Shared files

| File | Purpose |
| --- | --- |
| `data.js` | All trips, dates, prices, places, company story, statistics, services, destinations, travel guides, hero slides, team structure, legal text and the media finder |
| `app.js` | Rendering, tab flow, region filters, search suggestions, place details, private-trip booking, guides dialog, gallery lightbox, savings planner, newsletter, hero rotation, video autoplay |
| `styles.css` | The complete theme: self-hosted fonts, fluid layout from 320 px up, photo bands, cards, guides and dialogs |
| `fonts/` | Self-hosted Inter and Playfair Display files |
| `*.webp` | Optimised photos used by the site, including the team portraits |
| `whatsapp-qr.png` | Scan-to-chat code for the contact section |
| `poster-*.webp`, `preview-*.mp4` | Video posters and lightweight card previews |
| `sitemap.xml`, `robots.txt` | Search engine files |
| `google8d8fb6d974d30f9c.html` | Google Search Console verification |

## The visitor flow

1. **Hero** — a short value proposition, a quick enquiry form and a plan-your-trip card. Background images rotate slowly and respect reduced-motion settings.
2. **Safaris** — four ways into the catalogue (Uganda, East Africa, Beyond East Africa, custom), a news-style travel desk with one lead story and three trip notes, then the full catalogue with region chips and instant search. Every story links to its trip and can be booked directly. Searches for places outside the database still offer a private trip to that place.
3. **Destinations → Services → Travel guides → Gallery** — less detail per block, more ways to explore.
4. **Savings → Reviews → About → Contact** — plan, check feedback, meet the company and start a conversation.

## Adding or changing trips

1. Open `admin.html` in a browser.
2. Add a trip or a new date. It appears on the site in that browser immediately.
3. Copy the export at the bottom of the admin page into `PUBLISHED` in `data.js` to publish it to every visitor.
4. Run the media check on the admin page to confirm every photo and video filename resolves.

Trips in `SEED_TRIPS` use `group: 'Uganda' | 'East Africa' | 'Beyond East Africa'` for the region filter and navigation. Use `kind: 'request'` with `price: null` for a trip that is quoted around the traveller's dates; use `kind: 'dated'` with `start`/`end` for scheduled departures.

## Company content

The story, statistics, services, destination cards, travel-desk stories, travel guides and team structure are defined in `data.js` as `STORY`, `STATS`, `SERVICES`, `WORLD`, `TRIP_NEWS`, `GUIDES`, `HERO_SLIDES`, `WAYS` and `TEAM`. Replace a team photo by dropping a new image in this folder and updating its file name in `TEAM`. Team members without a photo show their initials instead.

## Media and performance

- Photos are WebP. Trip cards and hero videos autoplay muted, loop and use `playsinline`; previews keep the first load light.
- Fonts are self-hosted, so the site makes no third-party font request.
- The Google map loads only after the visitor clicks it.
- Images are lazy-loaded, the hero uses one preloaded background, and the layout avoids horizontal overflow from 320 px to 1440 px and beyond.
- The media finder in `data.js` tries common folders, extensions and letter cases when a file is missing, and shows a branded placeholder instead of a blank box.

## Deployment

The site is plain static HTML, CSS and JavaScript. Push to `main` and GitHub Pages publishes it. Bump `?v=` in `index.html`, `trip.html` and `admin.html` when CSS or JS changes so returning visitors receive the new files.
