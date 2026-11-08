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
    id: 'queen-elizabeth', type: 'Safari', group: 'Uganda', feature: 'queen-elizabeth.webp', title: 'Queen Elizabeth Safari', region: 'Western Uganda',
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
    videos: ['preview-hotsprings.mp4', 'preview-animals.mp4', 'preview-tourists.mp4']
  },
  {
    id: 'diani-beach', type: 'Beach', group: 'East Africa', feature: 'world-beach.webp', title: 'Diani Beach Holiday', region: 'Diani Beach, Kenya',
    duration: 'To be communicated', kind: 'tbc', price: null,
    summary: 'Cool ocean breeze, sun-soaked beaches, snorkeling and premium beachfront hotels on the Kenyan coast.',
    desc: 'Experience the cool ocean breeze, beautiful sun-soaked beaches, historic Fort Jesus walks, snorkeling adventures, and premium beachfront hotel accommodation in Kenya.',
    media: { type: 'video', src: 'beachview.mp4', poster: 'poster-beachview.webp', preview: 'preview-beachview.mp4' },
    highlights: ['Sun-soaked beaches', 'Fort Jesus walks', 'Snorkeling adventures', 'Beachfront hotels'],
    videos: ['preview-beachview.mp4', 'preview-camelwalk.mp4', 'preview-masai.mp4']
  },
  {
    id: 'rwanda-adventures', type: 'Regional', group: 'East Africa', feature: 'rwanda.webp', title: 'Rwanda Adventures and Safari Packages', region: 'Rwanda',
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
    videos: ['preview-rwanda8.mp4']
  },
  {
    id: 'custom-trips', type: 'Custom', group: 'Uganda', title: 'Custom Made Trips Across Uganda', region: 'Uganda and East Africa',
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
    videos: ['preview-zebra.mp4']
  },
  {
    id: 'murchison-falls', type: 'Safari', group: 'Uganda', title: 'Murchison Falls Safari', region: 'North-Western Uganda',
    duration: '3 days / 2 nights', kind: 'request', price: null,
    summary: 'The Nile forcing itself through a rock gorge, a launch cruise to the falls and big-game plains on the northern bank.',
    desc: 'Stand at the top of the world\'s most powerful waterfall, cruise the Nile to its base and explore the savanna plains where elephants, giraffes, lions and buffaloes roam. A compact, high-impact safari from Kampala.',
    media: { type: 'image', src: 'custom4.webp' },
    highlights: ['Top of the falls walk', 'Nile launch cruise', 'Northern-bank game drives', 'Ziwa rhino tracking on request'],
    includes: ['Transport from Kampala', 'Park entrance fees', 'Launch cruise', 'Accommodation', 'Meals', 'Guide'],
    locations: ['Murchison Falls', 'River Nile', 'Lake Albert', 'Ziwa Rhino Sanctuary'],
    activities: ['Game drives', 'Boat cruise', 'Waterfall walk', 'Bird watching', 'Photography'],
    gallery: [
      { src: 'custom4.webp', cap: 'The falls and the Nile' }, { src: 'sunset.webp', cap: 'Sunset on the savanna' },
      { src: 'queen-elizabeth.webp', cap: 'Wildlife on the plains' }, { src: 'hills.webp', cap: 'Uganda\'s open plains' }
    ]
  },
  {
    id: 'bwindi-gorillas', type: 'Safari', group: 'Uganda', title: 'Bwindi Gorilla Trekking', region: 'South-Western Uganda',
    duration: '3 to 4 days', kind: 'request', price: null,
    summary: 'One hour with a mountain gorilla family in an ancient rainforest, plus Lake Bunyonyi and community walks.',
    desc: 'Track mountain gorillas through the misty Bwindi Impenetrable Forest with a ranger guide, then unwind on the terraced shores of Lake Bunyonyi. We help with permits, lodging and the long drive from Kampala.',
    media: { type: 'image', src: 'gorilla.webp' },
    highlights: ['Mountain gorilla trekking', 'Bwindi rainforest trails', 'Lake Bunyonyi', 'Community and coffee walks'],
    includes: ['Gorilla permit arrangement', 'Transport', 'Accommodation', 'Meals', 'Park ranger fees'],
    locations: ['Bwindi Impenetrable Forest', 'Lake Bunyonyi', 'Kabale'],
    activities: ['Gorilla trekking', 'Forest walks', 'Canoeing', 'Community visits', 'Bird watching'],
    gallery: [
      { src: 'gorilla.webp', cap: 'Mountain gorilla in Bwindi' }, { src: 'lakeview.webp', cap: 'Lake Bunyonyi' },
      { src: 'hills.webp', cap: 'Terraced hills' }, { src: 'custom3.webp', cap: 'Community encounters' }
    ]
  },
  {
    id: 'lake-bunyonyi', type: 'Nature', group: 'Uganda', title: 'Lake Bunyonyi Escape', region: 'South-Western Uganda',
    duration: '3 days / 2 nights', kind: 'request', price: null,
    summary: '29 islands, dugout canoes, terraced hills and quiet lakeside lodges — Uganda at its most peaceful.',
    desc: 'Slow down on one of Africa\'s most beautiful lakes. Paddle between islands, visit hill communities, hike to viewpoints and sleep beside the water.',
    media: { type: 'image', src: 'lakeview.webp' },
    highlights: ['Island boat rides', 'Lakeside lodges', 'Hill viewpoints', 'Community visits'],
    includes: ['Transport', 'Accommodation', 'Meals', 'Boat rides', 'Local guide'],
    locations: ['Lake Bunyonyi', 'Kabale', 'Bwindi foothills'],
    activities: ['Canoeing', 'Hiking', 'Swimming', 'Bird watching', 'Relaxing'],
    gallery: [
      { src: 'lakeview.webp', cap: 'Lake Bunyonyi' }, { src: 'hills.webp', cap: 'Terraced hills' },
      { src: 'sunset.webp', cap: 'Golden hour on the lake' }
    ]
  },
  {
    id: 'jinja-nile', type: 'Adventure', group: 'Uganda', title: 'Jinja and the Source of the Nile', region: 'Eastern Uganda',
    duration: '2 days / 1 night', kind: 'request', price: null,
    summary: 'Rafting, tubing, quad bikes and the spot where the world\'s longest river begins.',
    desc: 'A short, high-energy escape from Kampala: white-water rafting on the Nile, a boat ride to the Source of the Nile and a night in Jinja\'s leafy riverside.',
    media: { type: 'image', src: 'custom5.webp' },
    highlights: ['White-water rafting', 'Source of the Nile', 'Nile boat ride', 'Jinja town and markets'],
    includes: ['Transport', 'Accommodation', 'Meals', 'Rafting or boat activity', 'Guide'],
    locations: ['Jinja', 'Source of the Nile', 'Busoga'],
    activities: ['Rafting', 'Tubing', 'Quad biking', 'Boat rides', 'Market walks'],
    gallery: [
      { src: 'custom5.webp', cap: 'Water adventures on the Nile' }, { src: 'custom2.webp', cap: 'A riverside stay' },
      { src: 'hills.webp', cap: 'Busoga hills' }
    ]
  },
  {
    id: 'kidepo-valley', type: 'Safari', group: 'Uganda', title: 'Kidepo Valley Wilderness', region: 'North-Eastern Uganda',
    duration: '4 days / 3 nights', kind: 'request', price: null,
    summary: 'Remote savanna, lions, cheetahs and ostriches in Uganda\'s most untouched national park.',
    desc: 'For travellers who want to go further: Kidepo\'s wide valleys and rocky outcrops feel like another country. Long drives, true wilderness and very few other vehicles.',
    media: { type: 'image', src: 'sunset.webp' },
    highlights: ['Remote game drives', 'Lion and cheetah country', 'Karamojong culture', 'Big skies'],
    includes: ['Transport', 'Park fees', 'Accommodation', 'Meals', 'Guide'],
    locations: ['Kidepo Valley', 'Karamoja', 'Moroto'],
    activities: ['Game drives', 'Cultural visits', 'Hiking', 'Photography', 'Bird watching'],
    gallery: [
      { src: 'sunset.webp', cap: 'Kidepo sunsets' }, { src: 'queen-elizabeth.webp', cap: 'Wildlife on the plains' },
      { src: 'hills.webp', cap: 'The valley' }
    ]
  },
  {
    id: 'zanzibar', type: 'Beach', group: 'East Africa', title: 'Zanzibar Island Holiday', region: 'Zanzibar, Tanzania',
    duration: '5 days / 4 nights', kind: 'request', price: null,
    summary: 'Turquoise water, spice tours, dhow cruises and the white sand of Nungwi and Paje.',
    desc: 'Fly out to the Indian Ocean for a relaxed beach stay with a spice-farm visit, a dhow sunset cruise and time in Stone Town.',
    media: { type: 'image', src: 'world-beach.webp' },
    highlights: ['Nungwi and Paje beaches', 'Stone Town', 'Spice tour', 'Sunset dhow cruise'],
    includes: ['Flight booking', 'Airport transfers', 'Beach hotel', 'Breakfast', 'Selected activities'],
    locations: ['Zanzibar', 'Stone Town', 'Nungwi', 'Paje'],
    activities: ['Swimming', 'Snorkeling', 'Dhow cruise', 'Spice tour', 'City walk'],
    gallery: [
      { src: 'world-beach.webp', cap: 'Indian Ocean beaches' }, { src: 'poster-beachview.webp', cap: 'Beach time' },
      { src: 'sunset.webp', cap: 'Sunset over the ocean' }
    ]
  },
  {
    id: 'masai-mara', type: 'Safari', group: 'East Africa', title: 'Masai Mara Migration Safari', region: 'Masai Mara, Kenya',
    duration: '4 days / 3 nights', kind: 'request', price: null,
    summary: 'Kenya\'s great savanna, big cats and — in season — the wildebeest migration river crossings.',
    desc: 'Cross into Kenya for classic Mara scenery, full-day game drives and Maasai community visits, timed around the migration when conditions allow.',
    media: { type: 'image', src: 'world-wildlife.webp' },
    highlights: ['Big-cat game drives', 'Migration river crossings (seasonal)', 'Maasai village visit', 'Mara river camps'],
    includes: ['Cross-border transport', 'Park fees', 'Accommodation', 'Meals', 'Guide'],
    locations: ['Masai Mara', 'Narok', 'Mara River'],
    activities: ['Game drives', 'Cultural visits', 'Photography', 'Balloon safari on request'],
    gallery: [
      { src: 'world-wildlife.webp', cap: 'Mara wildlife' }, { src: 'sunset.webp', cap: 'Mara sunset' },
      { src: 'queen-elizabeth.webp', cap: 'On safari' }
    ]
  },
  {
    id: 'kilimanjaro', type: 'Adventure', group: 'East Africa', title: 'Kilimanjaro Trek', region: 'Kilimanjaro, Tanzania',
    duration: '7 to 9 days', kind: 'request', price: null,
    summary: 'Africa\'s highest mountain, climbed slowly through rainforest, moorland and alpine desert.',
    desc: 'We arrange guided Kilimanjaro treks on the route that suits your fitness and acclimatisation, with porters, mountain huts or camps and a rest day afterwards.',
    media: { type: 'image', src: 'hills.webp' },
    highlights: ['Uhuru Peak sunrise', 'Rainforest and moorland', 'Professional mountain crew', 'Rest day in Arusha'],
    includes: ['Park fees', 'Mountain crew and porters', 'Huts or tents', 'Meals on the mountain', 'Transfers'],
    locations: ['Kilimanjaro', 'Arusha', 'Moshi'],
    activities: ['Trekking', 'Summit climb', 'Wildlife spotting', 'Photography'],
    gallery: [
      { src: 'hills.webp', cap: 'Mountain trails' }, { src: 'sunset.webp', cap: 'High-altitude sunsets' },
      { src: 'crater.webp', cap: 'Volcanic landscape' }
    ]
  },
  {
    id: 'dubai-stopover', type: 'City', group: 'Beyond East Africa', title: 'Dubai City and Desert Stopover', region: 'Dubai, UAE',
    duration: '4 days / 3 nights', kind: 'request', price: null,
    summary: 'A modern-city stopover with a desert safari, old Dubai and easy connections onward.',
    desc: 'Add a Dubai stopover to your East African trip: skyline views, the old creek and souks, a desert dune safari and time to shop or rest before flying home.',
    media: { type: 'image', src: 'world-cities.webp' },
    highlights: ['Desert dune safari', 'Old Dubai and the creek', 'Dubai Mall and Burj Khalifa area', 'Airport transfers'],
    includes: ['Hotel booking', 'Airport transfers', 'Desert safari', 'City tour', 'Breakfast'],
    locations: ['Dubai', 'Abu Dhabi on request'],
    activities: ['City tour', 'Desert safari', 'Shopping', 'Dhow dinner cruise'],
    gallery: [
      { src: 'world-cities.webp', cap: 'City skylines' }, { src: 'sunset.webp', cap: 'Desert sunset' }
    ]
  },
  {
    id: 'cape-town', type: 'City', group: 'Beyond East Africa', title: 'Cape Town and the Cape Coast', region: 'Cape Town, South Africa',
    duration: '6 days / 5 nights', kind: 'request', price: null,
    summary: 'Table Mountain, the Cape Peninsula, wine country and Atlantic beaches.',
    desc: 'A longer international escape combining Cape Town\'s mountains and markets with the Cape Peninsula drive, penguins at Boulders and a day in the winelands.',
    media: { type: 'image', src: 'world-beach.webp' },
    highlights: ['Table Mountain', 'Cape Peninsula drive', 'Boulders penguins', 'Winelands day trip'],
    includes: ['Flight booking', 'Hotel', 'Airport transfers', 'Selected tours', 'Breakfast'],
    locations: ['Cape Town', 'Cape Peninsula', 'Stellenbosch'],
    activities: ['Mountain cableway', 'Coastal drive', 'Wine tasting', 'Beach time', 'City walks'],
    gallery: [
      { src: 'world-cities.webp', cap: 'Cape Town' }, { src: 'hills.webp', cap: 'Mountain views' },
      { src: 'sunset.webp', cap: 'Evening on the coast' }
    ]
  }
];

const PLACES = ['Queen Elizabeth National Park', 'Kazinga Channel', 'Kiwa Hot Springs', 'Amabere Caves', 'Mubuku Irrigation Scheme', 'Diani Beach, Kenya', 'Mombasa', 'Fort Jesus', 'Kigali', 'Volcanoes National Park', 'Lake Kivu', 'Kampala',
  'Murchison Falls', 'Kibale Forest', 'Bwindi Impenetrable Forest', 'Lake Victoria', 'Jinja and Busoga', 'Fort Portal', 'Kasese', 'Mbale and Sipi Falls', 'Karamoja', 'Lake Bunyonyi', 'Lake Mburo', 'Mgahinga Gorilla Park', 'Kidepo Valley', 'Entebbe', 'Lake George',
  'Serengeti', 'Masai Mara', 'Zanzibar', 'Nairobi', 'Dar es Salaam', 'Arusha', 'Kilimanjaro', 'Gorilla trekking', 'White water rafting', 'Source of the Nile'];

const LEGAL = {
  'Privacy Policy': '<p>We respect your privacy. Information you share through booking or enquiry forms is used only to process your request, contact you, and support your travel plans. We do not sell your personal details to third parties.</p><p>We may store your name, phone number, email address and travel preferences to improve our service and follow up on booking requests. By using this site, you consent to this data being used for travel coordination and customer support.</p>',
  'Terms of Service': '<p>By using this website and booking any of our travel packages, you agree to our terms. All bookings are subject to availability and confirmation. Deposits are non-refundable unless otherwise stated.</p><p>Scenes Tours and Travels may modify itineraries because of weather, safety or other operational factors. We are not liable for personal injury, loss or damage to property during tours beyond our control.</p><p>Full terms are available on request at our head office.</p>'
};

/* Records exported from admin.html go here so every visitor sees them. */
const PUBLISHED = { trips: [], dates: {}, reviews: [] };
/* Real customer reviews go here (or add them in admin.html). Example: { name: 'Name', from: 'Kampala', trip: 'queen-elizabeth', rating: 5, text: 'Their words.', date: 'Aug 2026' } */
const REVIEWS = [];

const DB = {
  KEY: 'stt_db_v1',
  load() { try { const x = JSON.parse(localStorage.getItem(this.KEY)); return { trips: x.trips || [], dates: x.dates || {}, reviews: x.reviews || [] }; } catch { return { trips: [], dates: {}, reviews: [] }; } },
  /* Customer feedback: published reviews plus any added in admin.html. Each: { name, from, trip (trip id), rating 1-5, text, date } */
  reviews() { return REVIEWS.concat(PUBLISHED.reviews || [], this.load().reviews).filter(r => r && r.text && r.rating); },
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
    const others = video ? ['.mp4', '.MP4', '.webm', '.mov'] : ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG'];
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
  { t: 'Custom and private trips', d: 'A route, pace and budget built around you — not a fixed group departure.', cta: 'Plan a private trip' },
  { t: 'Safari and wildlife tours', d: 'Game drives, boat cruises and gorilla permits in Uganda, Kenya, Tanzania and Rwanda.', cta: 'Ask about a safari' },
  { t: 'Beach and coast holidays', d: 'Diani, Zanzibar and the Indian Ocean, with flights, transfers and hotels arranged.', cta: 'Plan a beach trip' },
  { t: 'Car hire and airport transfers', d: 'Self-drive or chauffeured 4x4s, saloons and vans for city runs and upcountry roads.', cta: 'Request a vehicle' },
  { t: 'Flight booking', d: 'Regional and international tickets, plus help with connections, baggage and changes.', cta: 'Ask about flights' },
  { t: 'Accommodation booking', d: 'Lodges, hotels and camps compared and booked to match your budget and route.', cta: 'Find a place to stay' },
  { t: 'School and group trips', d: 'Transport, meals, activities and safety planning for schools, churches and teams.', cta: 'Plan a group trip' },
  { t: 'Corporate retreats', d: 'Team days, conferences and reward trips with one coordinator handling the details.', cta: 'Plan a retreat' },
  { t: 'Scenes Traveler\'s Savings Account', d: 'Save from UGX 50,000 and turn small, regular amounts into your next adventure.', cta: 'Start saving' },
  { t: 'Travel documentation support', d: 'Guidance on passports, visas, insurance and the paperwork your trip needs.', cta: 'Ask a question' }
];

/* Hero background rotation (text stays fixed for a stable headline) */
const HERO_SLIDES = ['sunset.webp', 'queen-elizabeth.webp', 'lakeview.webp'];

/* Four quick ways into the catalogue, shown above the packages */
const WAYS = [
  { t: 'Uganda safaris', d: 'Queen Elizabeth, Murchison, Bwindi, Kidepo and the lakes.', filter: 'Uganda' },
  { t: 'East Africa', d: 'Kenya, Rwanda, Tanzania and the Indian Ocean coast.', filter: 'East Africa' },
  { t: 'Beyond East Africa', d: 'Dubai, Cape Town and longer international escapes.', filter: 'Beyond East Africa' },
  { t: 'Custom and private', d: 'Tell us where you want to go and we build it around you.', filter: 'custom' }
];

/* Travel journal. Each guide opens in a dialog; the CTA starts a private-trip enquiry. */
const GUIDES = [
  {
    id: 'best-time-uganda', title: 'When is the best time to visit Uganda?', date: 'Nov 2026', read: '4 min read',
    img: 'queen-elizabeth.webp', place: 'Queen Elizabeth National Park',
    excerpt: 'Dry-season game viewing, green-season waterfalls and what each month actually feels like on the road.',
    body: [
      'Uganda is a year-round destination, but the experience changes with the rains. The drier months from December to February and June to September are easiest for game drives, gorilla trekking and long road trips. Tracks are firmer, parks are busy and the savanna is shorter, which makes animals easier to spot.',
      'The green seasons bring fewer travellers, lower lodge rates and dramatic skies. Waterfalls are fuller, the forests are lush and birding is excellent. Expect short afternoon downpours and allow extra time on murram roads, especially in the west.',
      'Gorilla permits are limited every day of the year, so the best time is often simply the date you can secure a permit. Tell us your window and we will build the route around it.'
    ]
  },
  {
    id: 'gorilla-trekking', title: 'Gorilla trekking in Bwindi: what to expect', date: 'Oct 2026', read: '5 min read',
    img: 'gorilla.webp', place: 'Bwindi Impenetrable Forest',
    excerpt: 'Permits, fitness, what to wear and the moment you come face to face with a mountain gorilla family.',
    body: [
      'A gorilla trek starts early at the park headquarters, where rangers assign groups and brief visitors. Treks can last from one to six hours depending on where the family slept the night before. Porters are available and worth hiring.',
      'You will walk through dense, often muddy forest. Long trousers, sturdy boots, garden gloves and a light rain jacket make a real difference. When you reach the family, you leave bags behind, keep your voice low and spend one hour with them.',
      'Permits are the main cost and should be booked well ahead. We arrange permits, transport, lodging and a guide so the day itself is simple. Add Lake Bunyonyi afterwards for a quieter finish.'
    ]
  },
  {
    id: 'safari-cost', title: 'How much does a Uganda safari cost?', date: 'Sep 2026', read: '4 min read',
    img: 'custom4.webp', place: 'Murchison Falls',
    excerpt: 'What drives the price — parks, lodges, transport and group size — and where you can save without losing the experience.',
    body: [
      'A safari price is mostly park fees, accommodation, transport and guide time. Group size matters: sharing a 4x4 and a guide across four travellers usually costs less per person than a private trip for two.',
      'Lodges are the biggest swing. A comfortable mid-range camp, a budget guesthouse and a luxury lodge can differ several times over for the same view. We quote each option clearly so you can choose.',
      'Our scheduled Queen Elizabeth Safari starts at UGX 250,000 single and UGX 450,000 double, with a UGX 50,000 seat deposit. Custom trips are quoted after we agree the route, dates and standard of lodging.'
    ]
  },
  {
    id: 'packing-safari', title: 'Packing for a 3-day safari', date: 'Aug 2026', read: '3 min read',
    img: 'hills.webp', place: 'Queen Elizabeth National Park',
    excerpt: 'A simple, light packing list for game drives, boat cruises and campfires — plus what to leave at home.',
    body: [
      'Bring neutral-coloured clothes, a warm layer for early game drives, a hat, sunglasses, sunscreen and insect repellent. Closed shoes are better than sandals for walks and rough ground.',
      'Pack a small day bag for the vehicle: water, snacks, a camera, spare batteries and any medication. A light rain jacket is useful even in the dry season.',
      'Leave hard suitcases at home if you can. Soft bags fit more easily in a safari vehicle, and you will not need more than three days of clothes for a short trip.'
    ]
  },
  {
    id: 'diani-guide', title: 'Diani Beach: sun, sand and Fort Jesus', date: 'Jul 2026', read: '4 min read',
    img: 'world-beach.webp', place: 'Diani Beach, Kenya',
    excerpt: 'How to combine a Kenyan beach stay with Mombasa history, snorkeling and a smooth transfer from the airport.',
    body: [
      'Diani is a long, white-sand beach south of Mombasa. The reef keeps the water calm, which makes it good for swimming and snorkeling, and the beach is lined with hotels, cafes and small tour operators.',
      'Give yourself at least one day in Mombasa for Fort Jesus and the old town. The fort tells the story of the Swahili coast and is an easy, worthwhile break from the beach.',
      'We can book flights, airport transfers and beachfront hotels, then add a safari or a few days in Nairobi if you want a combined trip. Prices depend on season and hotel choice, so ask for a quote.'
    ]
  },
  {
    id: 'rwanda-or-uganda', title: 'Rwanda or Uganda for gorillas?', date: 'Jun 2026', read: '5 min read',
    img: 'rwanda.webp', place: 'Volcanoes National Park',
    excerpt: 'Permit prices, travel time, lodges and the feel of each gorilla destination — a practical comparison.',
    body: [
      'Both Rwanda and Uganda offer genuine mountain-gorilla trekking in the Virunga and Bwindi forests. Rwanda is quicker to reach from Kigali, with short transfers and a wide range of lodges. Uganda usually costs less for permits and can be combined with a longer safari.',
      'Rwanda suits travellers with limited time or a higher budget. Uganda suits travellers who want a broader trip — Bwindi, Queen Elizabeth, Lake Bunyonyi and Kampala can all fit into one route.',
      'Whichever you choose, permits sell out. Send us your dates and we will check availability, then build the rest of the trip around the permit day.'
    ]
  }
];
/* The travel desk. Each story points at a real trip and can be booked from the card. */
const TRIP_NEWS = [
  {
    trip: 'queen-elizabeth', kicker: 'On safari · Uganda',
    headline: 'A safari that begins on the water',
    note: 'Game drives across the savanna, a slow boat down the Kazinga Channel and campfires after dark. Our three-day Queen Elizabeth escape is built around the moments between the sightings.'
  },
  {
    trip: 'murchison-falls', kicker: 'River and falls · Uganda',
    headline: 'Where the Nile turns into thunder',
    note: 'The river squeezes through a seven-metre gorge, then a launch cruise takes you to the foot of the falls. A compact three-day safari with big-game plains on the northern bank.'
  },
  {
    trip: 'rwanda-adventures', kicker: 'Gorillas · East Africa',
    headline: 'Gorillas, volcanoes and a weekend in Kigali',
    note: 'Trek into Volcanoes National Park, then trade the trail for Kigali\'s galleries, markets and coffee bars. A flexible Rwanda itinerary that works for private groups.'
  },
  {
    trip: 'zanzibar', kicker: 'Island time · Tanzania',
    headline: 'The Indian Ocean, at your own pace',
    note: 'White sand at Nungwi and Paje, a spice farm, a dhow at sunset and Stone Town\'s lanes — a five-day reset with room to do nothing at all.'
  },
  {
    trip: 'cape-town', kicker: 'City and coast · South Africa',
    headline: 'Table Mountain, penguins and the Cape winelands',
    note: 'A six-day route that pairs Cape Town\'s markets and mountains with the coastal drive, Boulders Beach and a slow afternoon in Stellenbosch.'
  }
];
const WORLD = [
  { t: 'Beaches and Coastlines', img: 'world-beach.webp', d: 'Zanzibar turquoise water, sandbanks, beaches, L. Victoria, Nakuru, Malawi, R. Nile, and many more.' },
  { t: 'Wildlife and Safari', img: 'world-wildlife.webp', d: 'In national parks, zoos and sanctuaries in Uganda, East Africa and beyond.' },
  { t: 'Explore Major Cities', img: 'world-cities.webp', d: 'Kampala, Mombasa, Arusha, Entebbe, Dar es Salaam and more.' },
  { t: 'Culture and Heritage', img: 'world-culture.webp', d: 'Explore African culture, food, dances, songs and dressing of all African tribes.' }
];
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

const FAQ = [
  { q: 'Who is Scenes Tours & Travels?', a: 'We are a youth-led, registered Ugandan tour company based in Kampala. With over five years of experience, we have organized group, family, school and customized trips within Uganda and beyond.' },
  { q: 'How do I book a trip?', a: 'Choose a trip, press Book now and send your details on WhatsApp. Our team replies to confirm your seat. You can also call 0700 907 617 or 0784 066 320, or visit our office in Kampala.' },
  { q: 'How much is the deposit?', a: 'Seats on our Queen Elizabeth Safari are reserved with a UGX 50,000 deposit, and you can save towards the remaining amount over about two months. Deposits are non-refundable unless otherwise stated in our Terms of Service.' },
  { q: 'What is included in the Queen Elizabeth Safari?', a: 'Accommodation, feeding, park entrance fees, the boat cruise and transport. Pickup is at Oryx Lugogo and Rubis Kansanga.' },
  { q: 'Can I save towards a trip?', a: 'Yes. The Scenes Traveler\'s Savings Account lets you start with as little as UGX 50,000 and save at your own pace towards your next adventure. Terms and conditions apply.' },
  { q: 'Can you organize a trip for my school, family or group?', a: 'Yes. We handle the logistics for student, school, family and group trips so the adventure stays affordable for the whole squad.' },
  { q: 'Can a trip be tailored to my budget?', a: 'Yes. Tell us your budget, interests and dates and we tailor a package around them, including lodging, transport and activities.' },
  { q: 'Can the itinerary change?', a: 'Itineraries may be adjusted because of weather, safety or other operational factors. Full terms are available on request at our head office.' }
];
