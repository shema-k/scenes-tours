/* TRIP DATABASE. Every trip, price, date and place on the site is read from here (plus anything added in admin.html).
   To publish trips added in admin.html to ALL visitors, paste the exported JSON into PUBLISHED below. */
const SITE = {
  name: 'Scenes Tours & Travels',
  tagline: 'See the world',
  phones: [
    { label: '0700 907 617', tel: '0700907617', wa: '256700907617' },
    { label: '0784 066 320', tel: '0784066320', wa: '256784066320' }
  ],
  email: 'bookingscenestravel@gmail.com',
  address: 'Next to Lynn Modern Apartments, Kikoni-Makerere, Kampala, Uganda',
  map: 'https://www.google.com/maps?q=Lynn+Apartments+kikoni+Kampala&hl=en&z=14&output=embed',
  social: [
    { name: 'TikTok', url: 'https://www.tiktok.com/@scenes.travel' },
    { name: 'Instagram', url: 'https://www.instagram.com/scenestours' },
    { name: 'Twitter', url: 'https://twitter.com/scenestours' }
  ]
};

/* kind: 'dated' (uses start/end) | 'yearround' | 'request' | 'tbc' */
const SEED_TRIPS = [
  {
    id: 'queen-elizabeth', type: 'Safari', title: 'Queen Elizabeth Safari', region: 'Western Uganda',
    duration: '3 days / 2 nights', kind: 'dated', start: '2026-08-28', end: '2026-08-30',
    price: { single: 250000, double: 450000 }, deposit: 50000, saveNote: 'Save 175K over 2 months to join.',
    pickup: 'Oryx Lugogo and Rubis Kansanga',
    summary: 'Game loops with elephants, lions and buffaloes, the Kazinga Channel boat cruise, and campfires under the African sky.',
    desc: 'A 3-day, 2-night journey through one of Uganda\'s most spectacular wildlife destinations: savanna game drives, a boat cruise on the Kazinga Channel, campfires, music on board and lodging under the stars.',
    media: { type: 'video', src: 'hotsprings.mp4', poster: 'queen_elizabeth_safari.png' },
    highlights: ['Campfires under the stars in the wild savanna', 'Music on board', 'Boat cruise on the Kazinga Channel'],
    includes: ['Accommodation', 'Feeding', 'Park entrance fees', 'Boat cruise', 'Transport'],
    locations: ['Amabere Caves', 'Kazinga Channel', 'Mubuku Irrigation Scheme', 'Kiwa Hot Springs'],
    activities: ['Campfires', 'Music on board', 'Boat cruising', 'Wildlife viewing', 'Road trip', 'Bird watching', 'Sunset at the national park'],
    gallery: [
      { src: 'sunset.jpeg', cap: 'Sunset experience' }, { src: 'queen_elizabeth_safari.png', cap: 'Safari experience' },
      { src: 'lakeview.jpeg', cap: 'Lake view' }, { src: 'crater.jpeg', cap: 'Crater lakes' },
      { src: 'hills.jpeg', cap: 'Hills at Queen Elizabeth' }, { src: 'gorilla.jpeg', cap: 'Animals at Queen Elizabeth' }
    ],
    videos: ['hotsprings.mp4', 'Animals.mp4', 'Tourists(1).mp4']
  },
  {
    id: 'diani-beach', type: 'Beach', title: 'Diani Beach Holiday', region: 'Diani Beach, Kenya',
    duration: 'To be communicated', kind: 'tbc', price: null,
    summary: 'Cool ocean breeze, sun-soaked beaches, snorkeling and premium beachfront hotels on the Kenyan coast.',
    desc: 'Experience the cool ocean breeze, beautiful sun-soaked beaches, historic Fort Jesus walks, snorkeling adventures, and premium beachfront hotel accommodation in Kenya.',
    media: { type: 'video', src: 'beachview.mp4', poster: '' },
    highlights: ['Sun-soaked beaches', 'Fort Jesus walks', 'Snorkeling adventures', 'Beachfront hotels'],
    videos: ['beachview.mp4', 'Camelwalk(1).mp4', 'Masai.mp4']
  },
  {
    id: 'rwanda-adventures', type: 'Regional', title: 'Rwanda Adventures and Safari Packages', region: 'Rwanda',
    duration: 'Flexible', kind: 'yearround', price: null,
    summary: 'Mountain gorillas, volcanoes, luxury lodges and Kigali city trips, as private or group tours.',
    desc: 'Explore Rwanda\'s mountain gorillas, volcanoes, luxury lodges and breathtaking landscapes. We organize private and group tours throughout the year with customizable itineraries.',
    media: { type: 'image', src: 'rwanda.jpeg' },
    highlights: ['Gorilla trekking', 'Volcanoes National Park', 'Lake Kivu', 'Group trips in Kigali'],
    gallery: [
      { src: 'rwanda.jpeg', cap: 'Group trips in Kigali' }, { src: 'rwanda2.jpeg', cap: 'Kigali city monument' },
      { src: 'rwanda3.jpeg', cap: 'Kigali Convention Centre' }, { src: 'rwanda4.jpeg', cap: 'Kigali city' },
      { src: 'rwanda5.jpeg', cap: 'Research team' }, { src: 'rwanda6.jpeg', cap: 'Adventure awaits' },
      { src: 'rwanda7.jpeg', cap: 'Golden hour' }
    ],
    videos: ['rwanda8.mp4']
  },
  {
    id: 'custom-trips', type: 'Custom', title: 'Custom Made Trips Across Uganda', region: 'Uganda and East Africa',
    duration: 'Your choice', kind: 'request', price: null,
    summary: 'Journeys designed around your interests and budget, to any destination in Uganda.',
    desc: 'Tailor-made trips across Uganda and East Africa, designed around your budget, interests and travel dreams. Tell us your vision and we handle the logistics.',
    media: { type: 'image', src: 'custom1.jpg' },
    highlights: ['Epic safaris', 'Luxury retreats', 'Cultural immersion', 'Mountain hikes', 'Water adventures', 'Night safaris', 'Community encounters'],
    gallery: [
      { src: 'custom1.jpg', cap: 'Epic safaris' }, { src: 'custom2.jpg', cap: 'Luxury retreats' },
      { src: 'custom3.jpg', cap: 'Cultural immersion' }, { src: 'custom4.jpg', cap: 'Mountain hikes' },
      { src: 'custom5.jpg', cap: 'Water adventures' }, { src: 'custom6.jpg', cap: 'Night safaris' },
      { src: 'custom7.jpg', cap: 'Community encounters' }
    ],
    videos: ['Zebra(2).mp4']
  }
];

const PLACES = ['Queen Elizabeth National Park', 'Kazinga Channel', 'Kiwa Hot Springs', 'Amabere Caves', 'Mubuku Irrigation Scheme', 'Diani Beach, Kenya', 'Mombasa', 'Fort Jesus', 'Kigali', 'Volcanoes National Park', 'Lake Kivu', 'Kampala'];

const LEGAL = {
  'Privacy Policy': '<p>We respect your privacy. Information you share through booking or enquiry forms is used only to process your request, contact you, and support your travel plans. We do not sell your personal details to third parties.</p><p>We may store your name, phone number, email address and travel preferences to improve our service and follow up on booking requests. By using this site, you consent to this data being used for travel coordination and customer support.</p>',
  'Terms of Service': '<p>By using this website and booking any of our travel packages, you agree to our terms. All bookings are subject to availability and confirmation. Deposits are non-refundable unless otherwise stated.</p><p>Scenes Tours and Travels may modify itineraries because of weather, safety or other operational factors. We are not liable for personal injury, loss or damage to property during tours beyond our control.</p><p>Full terms are available on request at our head office.</p>'
};

/* Records exported from admin.html go here so every visitor sees them. */
const PUBLISHED = { trips: [], dates: {} };

const DB = {
  KEY: 'stt_db_v1',
  load() { try { const x = JSON.parse(localStorage.getItem(this.KEY)); return { trips: x.trips || [], dates: x.dates || {} }; } catch { return { trips: [], dates: {} }; } },
  save(x) { try { localStorage.setItem(this.KEY, JSON.stringify(x)); return true; } catch { return false; } },
  /* Every trip, with all of its departure dates sorted (seed + published + added in admin). */
  trips() {
    const local = this.load();
    return SEED_TRIPS.concat(PUBLISHED.trips, local.trips).map(t => {
      const deps = t.start ? [{ start: t.start, end: t.end || t.start }] : [];
      [].concat(PUBLISHED.dates[t.id] || [], local.dates[t.id] || []).forEach(x => deps.push(x));
      deps.sort((a, b) => a.start.localeCompare(b.start));
      return Object.assign({}, t, { deps, kind: deps.length && t.kind !== 'yearround' ? 'dated' : t.kind });
    });
  },
  /* Every place name known to the database. */
  places() { return [...new Set([...PLACES, ...TRIPS.flatMap(t => [t.region, ...(t.locations || [])])])]; },
  /* Search index: one entry per distinct label, with the trips it belongs to. */
  terms() {
    const m = new Map();
    const add = (label, kind, id) => { if (!label) return; const k = (label + kind).toLowerCase(); if (!m.has(k)) m.set(k, { label, kind, ids: new Set() }); m.get(k).ids.add(id); };
    TRIPS.forEach(t => {
      add(t.title, 'Trip', t.id); add(t.region, 'Destination', t.id); add(t.type, 'Type', t.id);
      (t.locations || []).forEach(x => add(x, 'Place', t.id)); (t.activities || []).forEach(x => add(x, 'Activity', t.id));
      (t.highlights || []).forEach(x => add(x, 'Highlight', t.id)); (t.includes || []).forEach(x => add(x, 'Included', t.id));
    });
    return [...m.values()].map(e => ({ label: e.label, kind: e.kind, ids: [...e.ids] }));
  }
};
const TRIPS = DB.trips();
