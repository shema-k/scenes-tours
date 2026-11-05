/* TRIP DATABASE. Every trip, price, date and place on the site is read from here (plus anything added in admin.html).
   To publish trips added in admin.html to ALL visitors, paste the exported JSON into PUBLISHED below. */
const SITE = {
  name: 'Scenes Tours & Travels',
  tagline: 'See the world',
  phones: [
    { label: '0700 907 617', tel: '0700907617', wa: '256700907617' },
    { label: '0784 066 320', tel: '0784066320', wa: '256784066320' }
  ],
  email: 'bookingscenestravels@gmail.com',
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
    media: { type: 'video', src: 'hotsprings.mp4', poster: 'poster-hotsprings.webp', preview: 'preview-hotsprings.mp4' },
    highlights: ['Campfires under the stars in the wild savanna', 'Music on board', 'Boat cruise on the Kazinga Channel'],
    includes: ['Accommodation', 'Feeding', 'Park entrance fees', 'Boat cruise', 'Transport'],
    locations: ['Amabere Caves', 'Kazinga Channel', 'Mubuku Irrigation Scheme', 'Kiwa Hot Springs'],
    activities: ['Campfires', 'Music on board', 'Boat cruising', 'Wildlife viewing', 'Road trip', 'Bird watching', 'Sunset at the national park'],
    gallery: [
      { src: 'sunset.webp', cap: 'Sunset experience' }, { src: 'queen-elizabeth.webp', cap: 'Safari experience' },
      { src: 'lakeview.webp', cap: 'Lake view' }, { src: 'crater.webp', cap: 'Crater lakes' },
      { src: 'hills.webp', cap: 'Hills at Queen Elizabeth' }, { src: 'gorilla.webp', cap: 'Animals at Queen Elizabeth' }
    ],
    videos: ['hotsprings.mp4', 'Animals.mp4', 'Tourists(1).mp4']
  },
  {
    id: 'diani-beach', type: 'Beach', title: 'Diani Beach Holiday', region: 'Diani Beach, Kenya',
    duration: 'To be communicated', kind: 'tbc', price: null,
    summary: 'Cool ocean breeze, sun-soaked beaches, snorkeling and premium beachfront hotels on the Kenyan coast.',
    desc: 'Experience the cool ocean breeze, beautiful sun-soaked beaches, historic Fort Jesus walks, snorkeling adventures, and premium beachfront hotel accommodation in Kenya.',
    media: { type: 'video', src: 'beachview.mp4', poster: 'poster-beachview.webp', preview: 'preview-beachview.mp4' },
    highlights: ['Sun-soaked beaches', 'Fort Jesus walks', 'Snorkeling adventures', 'Beachfront hotels'],
    videos: ['beachview.mp4', 'Camelwalk(1).mp4', 'Masai.mp4']
  },
  {
    id: 'rwanda-adventures', type: 'Regional', title: 'Rwanda Adventures and Safari Packages', region: 'Rwanda',
    duration: 'Flexible', kind: 'yearround', price: null,
    summary: 'Mountain gorillas, volcanoes, luxury lodges and Kigali city trips, as private or group tours.',
    desc: 'Explore Rwanda\'s mountain gorillas, volcanoes, luxury lodges and breathtaking landscapes. We organize private and group tours throughout the year with customizable itineraries.',
    media: { type: 'image', src: 'rwanda.webp' },
    highlights: ['Gorilla trekking', 'Volcanoes National Park', 'Lake Kivu', 'Group trips in Kigali'],
    gallery: [
      { src: 'rwanda.webp', cap: 'Group trips in Kigali' }, { src: 'rwanda2.webp', cap: 'Kigali city monument' },
      { src: 'rwanda3.webp', cap: 'Kigali Convention Centre' }, { src: 'rwanda4.webp', cap: 'Kigali city' },
      { src: 'rwanda5.webp', cap: 'Research team' }, { src: 'rwanda6.webp', cap: 'Adventure awaits' },
      { src: 'rwanda7.webp', cap: 'Golden hour' }
    ],
    videos: ['rwanda8.mp4']
  },
  {
    id: 'custom-trips', type: 'Custom', title: 'Custom Made Trips Across Uganda', region: 'Uganda and East Africa',
    duration: 'Your choice', kind: 'request', price: null,
    summary: 'Journeys designed around your interests and budget, to any destination in Uganda.',
    desc: 'Tailor-made trips across Uganda and East Africa, designed around your budget, interests and travel dreams. Tell us your vision and we handle the logistics.',
    media: { type: 'image', src: 'custom1.webp' },
    highlights: ['Epic safaris', 'Luxury retreats', 'Cultural immersion', 'Mountain hikes', 'Water adventures', 'Night safaris', 'Community encounters'],
    gallery: [
      { src: 'custom1.webp', cap: 'Epic safaris' }, { src: 'custom2.webp', cap: 'Luxury retreats' },
      { src: 'custom3.webp', cap: 'Cultural immersion' }, { src: 'custom4.webp', cap: 'Mountain hikes' },
      { src: 'custom5.webp', cap: 'Water adventures' }, { src: 'custom6.webp', cap: 'Night safaris' },
      { src: 'custom7.webp', cap: 'Community encounters' }
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

/* Media finder: if a file is not where the site expects it, try other likely folders, extensions and letter-cases. */
function mediaCandidates(src, alts = []) {
  const out = [], add = p => { if (p && !out.includes(p)) out.push(p); };
  let learned = ''; try { learned = localStorage.getItem('stt_mdir') || ''; } catch {}
  const dirs = ['images/', 'img/', 'assets/', 'media/', 'photos/', 'videos/', 'pictures/', 'uploads/'];
  add(src);
  [src, ...alts].forEach(base => {
    const m = base.match(/^(.*\/)?([^/]+?)(\.[A-Za-z0-9]+)?$/); if (!m) return;
    const stem = m[2], ext = m[3] || '', video = /^\.(mp4|webm|mov|m4v)$/i.test(ext);
    const others = video ? ['.mp4', '.MP4', '.webm', '.mov'] : ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];
    add(base); add(learned + stem + ext);
    dirs.forEach(d => add(d + stem + ext));
    others.forEach(e => add(stem + e));
    others.forEach(e => add(learned + stem + e));
    [stem.toLowerCase(), stem[0].toUpperCase() + stem.slice(1)].forEach(s => { add(s + ext); others.forEach(e => add(s + e)); });
    ['images/', 'photos/'].forEach(d => others.forEach(e => add(d + stem + e)));
  });
  return out.slice(0, 48);
}

/* ---------- Company details (from the 2026 brochure). Edit here and the whole site updates. ---------- */
const STORY = [
  'Scenes Tours & Travels started as a simple passion for travel and a desire to make it more affordable. As young people, we found travel costs high, so we began organizing our own trips and discovered that, with proper planning, travel could be more accessible than we thought.',
  'This inspired us to create Scenes Tours & Travels and help others experience the beauty of travel without unnecessary financial barriers.',
  'Today, with over five years of experience, we have organized group, family, school and customized trips both within Uganda and beyond.',
  'We continue to grow, innovate and contribute to Uganda\'s tourism industry through activities such as our Traveler\'s Savings Account, with a commitment to making travel safe, affordable and memorable. For every achievement, we give glory to God.'
];
const STATS = [
  { n: 5, suf: '+', l: 'Years of experience' }, { n: 7, l: 'Core travel services' },
  { n: 50000, pre: 'UGX ', l: 'Starts a savings account' }, { n: 4, l: 'Trip types: group, family, school, custom' }
];
const SERVICES = [
  { t: 'Customized Travel Packages', d: 'We tailor packages around your budget, interests and schedule.' },
  { t: 'Scenes Traveler\'s Savings Account', d: 'Save small, save often, travel big. Save as little as UGX 50,000 for your next trip.' },
  { t: 'Student and Group Trips', d: 'We handle logistics to provide affordable adventures for squads.' },
  { t: 'Safari and Wildlife Tours', d: 'Get close up with nature at its purest form and create unforgettable memories.' },
  { t: 'Cultural and Historical Tours', d: 'Discover Africa\'s richest heritage up close, guided by locals who know the stories behind the places.' },
  { t: 'Accommodation and Travel Booking', d: 'From cozy lodges to top-tier hotels, we compare and book the best stays within your budget.' },
  { t: 'Transport and Transfers', d: 'Reliable rides from pickup to your destination. We arrange safe, comfortable transport.' }
];
/* The four destination cards use photos already in the site folder. */
const WORLD = [
  { t: 'Beaches and Coastlines', img: 'poster-beachview.webp', d: 'Zanzibar turquoise water, sandbanks, beaches, L. Victoria, Nakuru, Malawi, R. Nile, and many more.' },
  { t: 'Wildlife and Safari', img: 'queen-elizabeth.webp', d: 'In national parks, zoos and sanctuaries in Uganda, East Africa and beyond.' },
  { t: 'Explore Major Cities', img: 'rwanda3.webp', d: 'Kampala, Mombasa, Arusha, Entebbe, Dar es Salaam and more.' },
  { t: 'Culture and Heritage', img: 'custom3.webp', d: 'Explore African culture, food, dances, songs and dressing of all African tribes.' }
];
/* Trips already completed (no dates on record). Add dates later through admin.html if you wish. */
const PAST_TRIPS = ['Rwanda Get-Away', 'Global Citizen Ft Doja Cat', 'Campus Connect 1st Edition', 'Open Game Park Package', 'Campus Connect 2nd Edition'];
/* Organisation chart. Put each person's photo in the site folder with the file name shown, and type their name in `name`. */
const TEAM = {
  lead: { title: 'Managing Director', photo: '', name: '', bio: 'Provides strategic leadership and overall direction of the company, sets annual targets, builds partnerships and represents Scenes Tours & Travels to clients, regulators and industry partners.' },
  deputy: { title: 'Deputy Managing Director', photo: 'team-deputy.webp', name: '', bio: 'Second in command. Deputizes for the Managing Director, supervises the department heads and oversees day-to-day operations so company plans and trip standards are delivered.' },
  depts: [
    { name: 'Operations and Tour Delivery',
      head: { title: 'Operations Manager', photo: '', name: '', bio: 'Plans and coordinates itineraries, transport, suppliers, lodging and schedules so every departure runs smoothly and on time.' },
      members: [
        { title: 'Tour Guides', photos: ['team-guide1.webp', 'team-guide2.webp'], name: '', bio: 'Lead groups on the ground, interpret each destination and keep travelers informed, comfortable and safe.' }] },
    { name: 'Finance and Administration',
      head: { title: 'Company Accountant', photo: '', name: '', bio: 'Oversees budgeting, trip costing, payments, Traveler\'s Savings Account records and statutory filings.' },
      members: [] },
    { name: 'Legal, Safety and Compliance',
      head: { title: 'Legal and Safety Compliance Officer', photo: '', name: '', bio: 'Ensures licensing, contracts, insurance, risk assessments and traveler-safety procedures meet legal and industry standards.' },
      members: [] },
    { name: 'Marketing and Communications',
      head: { title: 'Public Relations Officer', photo: '', name: '', bio: 'Manages the company\'s reputation, media relations, partnerships and community engagement.' },
      members: [
        { title: 'Media Team', photo: '', name: '', bio: 'Captures and publishes photo, video and social content that documents every trip and promotes our packages.' }] }
  ]
};
