const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => 'UGX ' + n.toLocaleString('en-US');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const byId = id => TRIPS.find(t => t.id === id);
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const shortDate = d => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/* ---------- Trip status is computed from dates, never hard-coded ---------- */
const nextDep = t => (t.deps || []).find(d => new Date(d.end + 'T23:59:59') >= new Date());
const range = d => d.start === d.end ? shortDate(d.start) : shortDate(d.start) + ' to ' + shortDate(d.end);
function status(t) {
  if (t.kind === 'dated') {
    const n = nextDep(t);
    if (n) return { key: 'open', label: range(n), dep: n };
    return { key: 'past', label: 'Last departure ' + shortDate(t.deps[t.deps.length - 1].start) + '. Next dates soon' };
  }
  return { key: t.kind, label: { yearround: 'Available all year', request: 'Planned around your dates', tbc: 'Dates to be announced' }[t.kind] };
}
function tripInfoHTML(t, chips) {
  const s = status(t);
  const rows = [['Where', t.region], ['Duration', t.duration], ['Dates', s.label], ['Price', priceText(t)], t.deposit && ['Seat deposit', fmt(t.deposit)], t.pickup && ['Pickup', t.pickup]].filter(Boolean);
  const ups = (t.deps || []).filter(d => new Date(d.end + 'T23:59:59') >= new Date());
  return `<h4>${esc(t.title)}</h4><p>${esc(t.summary)}</p><dl>${rows.map(([a, b]) => `<dt>${a}</dt><dd>${esc(b)}</dd>`).join('')}</dl>`
    + (t.includes ? `<p class="inc"><b>Includes:</b> ${t.includes.map(esc).join(', ')}</p>` : '')
    + (chips && ups.length ? `<p class="deps"><b>Pick a date:</b> ${ups.map(d => `<button type="button" class="chip" data-date="${d.start}">${range(d)}</button>`).join('')}</p>` : '');
}
const priceText = t => t.price ? `${fmt(t.price.single)} single, ${fmt(t.price.double)} double` : (t.kind === 'tbc' ? 'Fee to be communicated' : 'Quoted per trip');
const fromPrice = t => t.price ? `From ${fmt(t.price.single)} <small>per person</small>` : (t.kind === 'tbc' ? 'Fee to be announced' : 'Price on request');
const plansFor = t => t.price
  ? [`Single traveller (${fmt(t.price.single)})`, `Double / couple (${fmt(t.price.double)})`, 'Group / custom size']
  : ['Solo traveller', 'Couple', 'Small group (3 to 6)', 'Large group (7+)'];
const mediaHTML = (m, alt) => m.type === 'video'
  ? `<video src="${m.preview || m.src}" ${m.poster ? `poster="${m.poster}"` : ''} autoplay muted loop playsinline preload="auto" aria-label="${esc(alt)}"></video>`
  : `<img src="${m.src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;

const shorten = (s, n = 112) => { s = String(s || '').trim(); return s.length > n ? s.slice(0, n - 1).replace(/[\s,.;:-]+$/, '') + '…' : s; };
function cardHTML(t, i = 0) {
  const s = status(t);
  return `<article class="card rv" style="--i:${i % 4}" data-type="${t.type}">
    <a class="card-media" href="trip.html?id=${t.id}">${mediaHTML(t.media, t.title)}<span class="badge badge-${s.key}">${t.type}</span></a>
    <div class="card-body">
      <p class="kicker">${esc(t.group || t.region)}</p>
      <h3><a href="trip.html?id=${t.id}">${esc(t.title)}</a></h3>
      <p class="meta">${esc(t.region)} &middot; ${esc(t.duration)}</p>
      <p>${esc(shorten(t.summary))}</p>
      <p class="when ${s.key}">${esc(s.label)}</p>
      <p class="price">${fromPrice(t)}</p>
      <div class="actions"><button class="btn btn-primary" data-book="${t.id}">Book now</button><a class="btn btn-ghost" href="trip.html?id=${t.id}">Details</a></div>
    </div></article>`;
}

function featureHTML(t, i = 0) {
  const s = status(t), src = t.feature || t.media.poster || t.media.src;
  return `<a class="feature rv" style="--i:${i}" href="trip.html?id=${t.id}">
    <span class="feature-img"><img src="${src}" alt="${esc(t.title)}" loading="lazy" decoding="async"><span class="badge badge-${s.key}">${t.type}</span></span>
    <span class="feature-body"><span class="kicker">${esc(t.group || t.region)}</span><b>${esc(t.title)}</b>
      <small>${esc(t.duration)} &middot; ${esc(s.label)}</small><span class="feature-cta">View trip &rarr;</span></span></a>`;
}

const ICONS = {
  TikTok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69A4.83 4.83 0 0 1 16 4.1V15.5A6.5 6.5 0 1 1 9.5 9c.17 0 .34.01.5.03v3.2a3.3 3.3 0 1 0 2.8 3.27V0h3.2a4.84 4.84 0 0 0 3.59 4.59v2.1z"/></svg>',
  Instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  Twitter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>'
};

/* ---------- Shared header, footer and dialogs ---------- */
const TRIP_GROUPS = ['Uganda', 'East Africa', 'Beyond East Africa'];
const navTripLinks = () => TRIP_GROUPS.map(g => {
  const list = TRIPS.filter(t => t.group === g);
  return list.length ? `<span class="dd-label">${g}</span>${list.map(t => `<a href="trip.html?id=${t.id}">${esc(t.title)}</a>`).join('')}` : '';
}).join('');
function injectChrome() {
  const home = location.pathname.split('/').pop() !== 'trip.html' ? '' : 'index.html';
  const p0 = SITE.phones[0];
  $('#site-header').innerHTML = `<div class="topbar"><div class="wrap"><span>Youth-led, registered tour company &middot; Kampala, Uganda</span><span class="tb"><a href="${home}#faq">FAQ</a><a href="tel:${p0.tel}">${p0.label}</a><a href="mailto:${SITE.email}">${SITE.email}</a></span></div></div>
  <div class="wrap bar">
    <a class="brand" href="index.html"><img src="logo-180.webp" alt="Scenes Tours logo" width="46" height="46"><span>${SITE.name}</span></a>
    <button class="menu" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
    <nav id="nav" aria-label="Main">
      <div class="dd"><button class="dd-btn" aria-expanded="false" aria-haspopup="true">Safaris<i></i></button><div class="dd-menu trips-menu">${navTripLinks()}<a class="all" href="${home}#trips">View all trips</a></div></div>
      <a href="${home}#world">Destinations</a>
      <div class="dd"><button class="dd-btn" aria-expanded="false" aria-haspopup="true">Services<i></i></button><div class="dd-menu"><a href="${home}#services">All services</a><a href="${home}#services" data-service="Car hire and airport transfers">Car hire and transfers</a><a href="${home}#services" data-service="Flight booking">Flights</a><a href="${home}#save">Traveler's Savings Account</a></div></div>
      <a href="${home}#guides">Travel guides</a><a href="${home}#gallery">Gallery</a>
      <div class="dd"><button class="dd-btn" aria-expanded="false" aria-haspopup="true">About<i></i></button><div class="dd-menu"><a href="${home}#about">Our story</a><a href="${home}#team">Our team</a><a href="${home}#reviews">Reviews</a><a href="${home}#faq">FAQ</a></div></div>
      <a href="${home}#contact">Contact</a>
      <button class="btn btn-primary" data-book="custom-trips">Plan my trip</button></nav></div>`;
  const phones = SITE.phones.map(p => `<a href="tel:${p.tel}">${p.label}</a>`).join(' / ');
  $('#site-footer').innerHTML = `<div class="wrap foot">
    <div><h3>Scenes<span> Tours &amp; Travels</span></h3><p>A youth-led, registered tour company in Kampala, Uganda. Safaris, beach escapes and private trips across East Africa. ${SITE.tagline}.</p>
      <p class="social">${SITE.social.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">${ICONS[s.name]}</a>`).join('')}</p>
      <form id="news" class="news" novalidate><h4>Travel ideas in your inbox</h4><p>New dates, trip notes and honest advice. No spam.</p>
        <div class="news-row"><input type="email" name="email" autocomplete="email" placeholder="Your email address" aria-label="Your email address" required><button class="btn btn-primary" type="submit">Join</button></div>
        <p class="err" role="alert" hidden></p><p class="ok" hidden></p></form></div>
    <div><h4>Popular trips</h4><ul>${TRIPS.slice(0, 6).map(t => `<li><a href="trip.html?id=${t.id}">${esc(t.title)}</a></li>`).join('')}<li><a href="${home}#trips"><b>View all trips</b></a></li></ul></div>
    <div><h4>Explore</h4><ul><li><a href="${home}#world">Destinations</a></li><li><a href="${home}#guides">Travel guides</a></li><li><a href="${home}#gallery">Gallery</a></li><li><a href="${home}#services">Services</a></li><li><a href="${home}#save">Traveler's Savings Account</a></li><li><a href="${home}#reviews">Reviews</a></li><li><a href="${home}#about">About us</a></li><li><a href="${home}#team">Our team</a></li><li><a href="${home}#faq">FAQ</a></li></ul></div>
    <div><h4>Head office</h4><ul><li>${SITE.address}</li><li>${phones}</li><li><a href="mailto:${SITE.email}">${SITE.email}</a></li><li><a href="https://wa.me/${p0.wa}" target="_blank" rel="noopener">Chat on WhatsApp</a></li></ul></div>
    <div class="legal wrap"><span>&copy; ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span>
      <span><button data-legal="Privacy Policy">Privacy Policy</button><button data-legal="Terms of Service">Terms of Service</button></span></div></div>`;
  const news = $('#news');
  if (news) news.addEventListener('submit', e => {
    e.preventDefault();
    const email = String(new FormData(news).get('email') || '').trim();
    const err = $('.err', news), ok = $('.ok', news);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { err.textContent = 'Enter a valid email address.'; err.hidden = false; ok.hidden = true; return; }
    err.hidden = true;
    store.set('newsletter', email);
    ok.textContent = 'Thanks! WhatsApp is opening so we can add you to the list.';
    ok.hidden = false;
    const msg = `Hello Scenes Tours, please add me to your travel list.\n\nEmail: ${email}`;
    window.open(`https://wa.me/${SITE.phones[0].wa}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
  document.body.insertAdjacentHTML('beforeend', `
  <dialog id="detail"><div class="dlg-head"><h3 id="detail-h">Place details</h3><button class="x" data-close aria-label="Close">&times;</button></div>
    <div class="detail-body"></div></dialog>
  <dialog id="book" aria-labelledby="book-h"><div class="dlg-head"><h3 id="book-h">Book your seat</h3><button class="x" data-close aria-label="Close">&times;</button></div>
    <form id="book-form" novalidate>
      <label>Full name<input name="name" autocomplete="name" required></label>
      <div class="row"><label>Phone (WhatsApp)<input name="phone" type="tel" autocomplete="tel" placeholder="07XX XXX XXX" required></label>
      <label>Destination<select name="trip" required>${TRIPS.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join('')}</select></label></div>
      <div class="row" id="custom-fields" hidden><label>Where do you want to go?<input name="destination" placeholder="e.g. Murchison Falls"></label>
        <label>Number of travellers<input name="travellers" inputmode="numeric" placeholder="e.g. 2"></label></div>
      <div class="row" id="custom-fields-2" hidden><label>Estimated budget (UGX, optional)<input name="budget" inputmode="numeric" placeholder="e.g. 500000"></label>
        <label>What catches your eye?<input name="interest" placeholder="e.g. gorillas, rafting, culture"></label></div>
      <div class="row"><label>Package<select name="plan" required></select></label><label>Preferred date<input name="date" type="date" required></label></div>
      <div id="trip-info" class="tinfo" aria-live="polite"></div>
      <label>Special requests<input name="note" placeholder="e.g. vegetarian, extra room"></label>
      <p class="err" role="alert" hidden></p>
      <button class="btn btn-primary wide" type="submit">Continue on WhatsApp</button>
    </form>
    <div id="book-done" hidden><h4>Your request is ready</h4><p>WhatsApp opened with your details. Press <strong>Send</strong> there. You can also send the same request to our second agent.</p>
      <p class="actions" id="wa-links"></p></div></dialog>
  <dialog id="guide" aria-labelledby="guide-h"><div class="dlg-head"><h3 id="guide-h"></h3><button class="x" data-close aria-label="Close">&times;</button></div>
    <div class="guide-body"></div></dialog>
  <dialog id="legal"><div class="dlg-head"><h3></h3><button class="x" data-close aria-label="Close">&times;</button></div><div class="legal-body"></div></dialog>
  <dialog id="pdlg" aria-labelledby="pdlg-h"><div class="dlg-head"><h3 id="pdlg-h"></h3><button class="x" data-close aria-label="Close">&times;</button></div><div class="pbody"></div></dialog>
  <dialog id="lightbox"><button class="x" data-close aria-label="Close">&times;</button><img alt=""><p></p></dialog>`);

  document.body.insertAdjacentHTML('beforeend', `<div class="fab"><button class="up" aria-label="Back to top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 15l-6-6-6 6"/></svg></button>
    <a class="wa" href="https://wa.me/${SITE.phones[0].wa}?text=${encodeURIComponent('Hello Scenes Tours, I would like to know more about your trips.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0 0 3.2 17.3L2 22l4.8-1.2A11 11 0 1 0 20.5 3.5zM12 20a9 9 0 0 1-4.6-1.3l-.3-.2-2.8.7.7-2.7-.2-.3A9 9 0 1 1 12 20zm5-6.7c-.3-.1-1.600-.8-1.900-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6 0a7.400 7.400 0 0 1-3.700-3.200c-.3-.5.3-.5.800-1.500a.5.5 0 0 0 0-.5l-.9-2c-.2-.5-.5-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.200 5.200 5.200 0 0 0 1.100 2.800 11.900 11.900 0 0 0 4.600 4c1.700.7 2.400.8 3.200.7a2.700 2.700 0 0 0 1.800-1.300 2.200 2.200 0 0 0 .2-1.300c-.1-.1-.3-.2-.6-.3z"/></svg></a></div>`);
  $('.up').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  addEventListener('scroll', () => $('.up').classList.toggle('show', scrollY > 600), { passive: true });
  $$('.dd-btn').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); const d = b.parentElement, o = !d.classList.contains('open'); $$('.dd').forEach(x => { x.classList.remove('open'); $('.dd-btn', x).setAttribute('aria-expanded', 'false'); }); if (o) { d.classList.add('open'); b.setAttribute('aria-expanded', 'true'); } }));
  document.addEventListener('click', () => $$('.dd').forEach(x => { x.classList.remove('open'); $('.dd-btn', x).setAttribute('aria-expanded', 'false'); }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.dd').forEach(x => x.classList.remove('open')); });
  document.addEventListener('click', e => { const b = e.target.closest('[data-service]'); if (!b) return; e.preventDefault(); openBooking('custom-trips', { destination: b.dataset.service, custom: true }); });
  $('.menu').onclick = e => { const o = $('#nav').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); };
  $('#nav').addEventListener('click', e => { if (e.target.closest('a')) $('#nav').classList.remove('open'); });
  const header = $('#site-header');
  addEventListener('scroll', () => header.classList.toggle('stuck', scrollY > 8), { passive: true });
}

/* ---------- Place details, then a private-trip booking for that place ---------- */
const PLACE_BLURBS = {
  'Murchison Falls': 'The thunder of the world\'s most powerful waterfall, where the Nile squeezes through a narrow gorge before sweeping into Lake Albert.',
  'Kibale Forest': 'Home to more primates than anywhere in East Africa, including chimpanzees you can track on a guided morning walk.',
  'Bwindi Impenetrable Forest': 'An ancient rainforest and sanctuary of mountain gorillas, plus guided trails, waterfalls and forest communities.',
  'Lake Victoria': 'Africa\'s largest lake, with island-hopping, fishing villages, Ssese Islands and sunset cruises from Entebbe.',
  'Jinja and Busoga': 'The source of the Nile, white-water rafting, tubing, quad biking and gentle walks through Busoga’s green hills.',
  'Fort Portal': 'The gateway to Kibale and the Rwenzori foothills, with crater lakes, tea estates and warm highland air.',
  'Kasese': 'The capital of the Rwenzori Mountains, a fine starting point for mountain trekking and the famous “Mountains of the Moon”.',
  'Mbale and Sipi Falls': 'Sipi’s three waterfalls spread across the foothills of Mount Elgon, perfect for coffee tours and short hikes.',
  'Karamoja': 'Wide-open savanna, cattle culture, Mount Moroto and some of Uganda’s most dramatic golden sunsets.',
  'Lake Bunyonyi': 'Uganda’s most beautiful lake: 29 islands wrapped in terraced hills, dugout rides and quiet lakeside lodges.',
  'Lake Mburo': 'A compact park of rolling hills, zebras, impalas and boat trips on a lake dotted with crocodiles.',
  'Mgahinga Gorilla Park': 'The Virunga foothills, golden monkeys and gorilla tracking in a small, scenic park on Rwanda’s border.',
  'Kidepo Valley': 'Remote, rugged and famous for lions, cheetahs and ostriches — Uganda at its most untouched.',
  'Entebbe': 'Lakeside calm on Lake Victoria, the airport town, botanical gardens and a calm first or last night.',
  'Lake George': 'A hippo-filled lake between Queen Elizabeth and Kibale, best seen by boat at golden hour.',
  'Serengeti': 'Endless plains and the great migration river crossings, the classic plane-safari dream.',
  'Masai Mara': 'Kenya’s great savanna reserve, famous for big cats and the annual wildebeest migration.',
  'Zanzibar': 'Turquoise water, spice tours, dhow cruises and the white sand of Nungwi and Paje.',
  'Nairobi': 'Kenya’s capital: a national park on the city edge, museums, markets and good onward connections.',
  'Dar es Salaam': 'A lively harbour city on the Indian Ocean, markets, ferry rides to Zanzibar and great seafood.',
  'Arusha': 'Tanzania’s safari capital and the gateway to the Serengeti, Ngorongoro and Kilimanjaro.',
  'Kilimanjaro': 'Africa’s highest mountain, with trekking routes through rainforest, moorland and alpine desert.',
  'Gorilla trekking': 'A once-in-a-lifetime hour with a mountain gorilla family in their forest home.',
  'White water rafting': 'Grade 3 to 5 rapids on the Nile at Jinja, with full-day, half-day and family floats.',
  'Source of the Nile': 'Where the world’s longest river begins, at Jinja, with walks, boat rides and rafting nearby.'
};
const placeBlurb = name => PLACE_BLURBS[name] || `We can design a private trip to ${name} around your dates, your group and your budget — guided, transported and looked after from start to finish.`;
const normPlace = s => String(s || '').trim().replace(/\s+/g, ' ').toLowerCase();
function placeMatch(name) { return normPlace(name) && DB.places().find(p => normPlace(p) === normPlace(name)) || DB.places().find(p => normPlace(p).startsWith(normPlace(name)) || normPlace(name).startsWith(normPlace(p))) || ''; }
function openGuide(id) {
  const g = GUIDES.find(x => x.id === id); if (!g) return;
  const dl = $('#guide');
  $('#guide-h').textContent = g.title;
  $('.guide-body', dl).innerHTML = `<p class="kicker">${esc(g.date)} &middot; ${esc(g.read)}</p>
    <img class="guide-hero" src="${g.img}" alt="${esc(g.title)}" loading="lazy" decoding="async">
    <p class="guide-lede">${esc(g.excerpt)}</p>${g.body.map(p => `<p>${esc(p)}</p>`).join('')}
    <div class="actions"><button class="btn btn-primary" id="guide-cta">Plan a trip like this</button><button class="btn btn-ghost" data-close>Close</button></div>`;
  $('#guide-cta', dl).onclick = () => { dl.close(); openBooking('custom-trips', { destination: g.place || g.title, custom: true }); };
  dl.showModal();
}
window.openGuide = openGuide;

function openPlace(name, detail = true) {
  const place = placeMatch(name) || String(name || '').trim().replace(/\s+/g, ' ');
  if (!place) return;
  const dl = $('#detail');
  $('#detail-h').textContent = place;
  $('.detail-body', dl).innerHTML = `<p>${esc(placeBlurb(place))}</p>
    <p class="note">This place is not on a set departure. Choose <b>Book a private trip there</b> and fill in your details — a Scenes guide will shape the route, transport, lodging and timing just for you.</p>
    <div class="actions"><button class="btn btn-primary" id="place-book">Book a private trip to ${esc(place)}</button>
    <a class="btn btn-ghost" href="trip.html?id=custom-trips">See custom trips</a></div>`;
  $('#place-book', dl).onclick = () => { dl.close(); openBooking('custom-trips', { destination: place, custom: true }); };
  dl.showModal();
  store.set('recent', [place, ...recent().filter(x => x !== place)].slice(0, 5));
}
window.openPlace = openPlace;

/* ---------- Dialogs and booking ---------- */
function setupDialogs() {
  $$('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); }));
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-book]'); if (b) { e.preventDefault(); openBooking(b.dataset.book); }
    const l = e.target.closest('[data-legal]'); if (l) { const d = $('#legal'); $('h3', d).textContent = l.dataset.legal; $('.legal-body', d).innerHTML = LEGAL[l.dataset.legal]; d.showModal(); }
  });
  const form = $('#book-form'), tripSel = form.trip;
  const refreshPlans = () => {
    const custom = tripSel.value === 'custom-trips';
    $('#custom-fields').hidden = !custom; $('#custom-fields-2').hidden = !custom;
    const dest = (form.destination && form.destination.value) || (window._customDestination || '');
    const customPlans = ['Private trip — just for us', 'Group / custom size', 'Solo traveller', 'Couple'];
    form.plan.innerHTML = (custom ? customPlans : plansFor(byId(tripSel.value))).map(p => `<option>${esc(p)}</option>`).join('');
    $('#trip-info').innerHTML = tripInfoHTML(byId(tripSel.value), true);
    if (custom && dest) {
      const info = $('#trip-info');
      info.insertAdjacentHTML('afterbegin', `<p class="custom-place">Private trip to <b>${esc(dest)}</b></p>`);
    }
  };
  form.addEventListener('click', e => { const c = e.target.closest('[data-date]'); if (c) form.date.value = c.dataset.date; });
  tripSel.addEventListener('change', refreshPlans);
  window.openBooking = (id, opts = {}) => {
    const t = byId(id) || TRIPS[0];
    const custom = opts.custom || (opts.destination && true) || t.id === 'custom-trips';
    window._customDestination = opts.destination || window._customDestination || '';
    tripSel.value = custom ? 'custom-trips' : t.id; refreshPlans();
    const min = new Date().toISOString().slice(0, 10);
    form.date.min = min; form.date.value = status(byId(tripSel.value)).dep ? status(byId(tripSel.value)).dep.start : '';
    if (custom && window._customDestination && form.destination) form.destination.value = window._customDestination;
    $('#book-done').hidden = true; form.hidden = false; $('.err', form).hidden = true;
    if (opts.date) form.date.value = opts.date;
    if (opts.who != null) form.plan.selectedIndex = Math.min(opts.who, form.plan.options.length - 1);
    $('#book').showModal();
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form), err = $('.err', form);
    const phone = String(f.get('phone')).replace(/[\s-]/g, '');
    const problems = [];
    if (String(f.get('name')).trim().length < 2) problems.push('Enter your full name.');
    if (!/^(\+?256|0)7\d{8}$/.test(phone)) problems.push('Enter a valid Ugandan mobile number, e.g. 0784 066 320.');
    if (!f.get('date')) problems.push('Choose a preferred date.');
    if (problems.length) { err.textContent = problems.join(' '); err.hidden = false; return; }
    const t = byId(f.get('trip'));
    const custom = !$('#custom-fields').hidden;
    const extra = custom ? [
      `Destination: ${f.get('destination') || 'To be discussed'}`,
      `Travellers: ${f.get('travellers') || 'To be discussed'}`,
      `Budget: ${f.get('budget') ? 'UGX ' + f.get('budget') : 'Open'}`,
      `Interest: ${f.get('interest') || 'Open'}`
    ] : [];
    const text = `*NEW BOOKING REQUEST*\n\nName: ${f.get('name')}\nPhone: ${phone}\nDestination: ${t.title}\nPackage: ${f.get('plan')}\nTravel date: ${f.get('date')}\nComments: ${f.get('note') || 'None'}${extra.length ? '\n' + extra.join('\n') : ''}`;
    const link = p => `https://wa.me/${p.wa}?text=${encodeURIComponent(text)}`;
    window.open(link(SITE.phones[0]), '_blank');
    $('#wa-links').innerHTML = SITE.phones.map((p, i) => `<a class="btn ${i ? 'btn-ghost' : 'btn-primary'}" target="_blank" rel="noopener" href="${link(p)}">${i ? 'Also send to' : 'Open again:'} ${p.label}</a>`).join('');
    form.hidden = true; $('#book-done').hidden = false; form.reset();
  });
}

/* ---------- Home page ---------- */
const flatTeam = () => [TEAM.lead, TEAM.deputy, ...TEAM.depts.flatMap(d => [d.head, ...d.members])];
const initials = s => s.split(/\s+/).filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('') || 'ST';
const face = p => p.photos
  ? `<span class="avatar-pair">${p.photos.map(s => `<span class="avatar"><img src="${s}" alt="" loading="lazy" decoding="async"></span>`).join('')}</span>`
  : p.photo
    ? `<span class="avatar"><img src="${p.photo}" alt="" loading="lazy" decoding="async"></span>`
    : `<span class="avatar"><span class="avatar-letter">${initials(p.title)}</span></span>`;
const person = (p, cls = '') => `<button type="button" class="pc ${cls}" data-t="${esc(p.title)}">${face(p)}<span><b>${esc(p.title)}</b>${p.name ? `<em>${esc(p.name)}</em>` : ''}<small>View role</small></span></button>`;
const stars = n => '\u2605'.repeat(n) + '\u2606'.repeat(5 - n);
const reviewCard = r => { const t = byId(r.trip); return `<figure class="rev rv"><div class="stars" role="img" aria-label="${r.rating} out of 5">${stars(r.rating)}</div><blockquote>\u201c${esc(r.text)}\u201d</blockquote><figcaption><b>${esc(r.name)}</b>${r.from ? ', ' + esc(r.from) : ''}<small>${t ? esc(t.title) : ''}${r.date ? ' &middot; ' + esc(r.date) : ''}</small></figcaption></figure>`; };
const cio = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; cio.unobserve(e.target);
  const el = e.target, to = +el.dataset.to, t0 = performance.now();
  const step = now => { const k = Math.min(1, (now - t0) / 1300); el.textContent = (el.dataset.pre || '') + Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString('en-US') + (el.dataset.suf || ''); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step); }), { threshold: .5 }) : null;
function company() {
  $('#svc').innerHTML = SERVICES.map((s, i) => `<article class="svc rv" style="--i:${i % 4}"><i>${i + 1}</i><div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p><button type="button" class="link svc-cta" data-service="${esc(s.t)}">${esc(s.cta || 'Request a quote')} &rarr;</button></div></article>`).join('');
  $('#world-grid').innerHTML = WORLD.map((w, i) => `<article class="wcard rv" style="--i:${i}"><img src="${w.img}" alt="${esc(w.t)}" loading="lazy"><div><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></div></article>`).join('');
  $('#story').innerHTML = STORY.slice(0, 2).map(p => `<p>${esc(p)}</p>`).join('') + `<details class="readmore"><summary>Read our full story</summary>${STORY.slice(2).map(p => `<p>${esc(p)}</p>`).join('')}</details>`;
  $('#stats').innerHTML = STATS.map(s => `<div class="stat rv"><b data-to="${s.n}" data-pre="${s.pre || ''}" data-suf="${s.suf || ''}">${(s.pre || '') + s.n.toLocaleString('en-US') + (s.suf || '')}</b><span>${esc(s.l)}</span></div>`).join('');
  $('#faq-list').innerHTML = FAQ.map((f, i) => `<details class="rv" style="--i:${i % 4}"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');
  $('#faq-list').addEventListener('toggle', e => { if (e.target.open) $$('#faq-list details').forEach(d => { if (d !== e.target) d.open = false; }); }, true);
  $('#org').innerHTML = `<div class="org-top">${person(TEAM.lead, 'lead')}</div><div class="org-top">${person(TEAM.deputy, 'deputy')}</div><div class="org-depts">${TEAM.depts.map(d => `<section class="dept"><h5>${esc(d.name)}</h5>${person(d.head)}${d.members.map(m => person(m, 'sub')).join('')}</section>`).join('')}</div>`;
  $('#org').addEventListener('click', e => { const b = e.target.closest('.pc'); if (!b) return; const p = flatTeam().find(x => x.title === b.dataset.t), dl = $('#pdlg'); $('h3', dl).textContent = p.title; $('.pbody', dl).innerHTML = `<div class="pface">${face(p)}</div>${p.name ? `<p class="pname">${esc(p.name)}</p>` : ''}<p>${esc(p.bio)}</p>`; dl.showModal(); done(); });
  if (cio && !matchMedia('(prefers-reduced-motion: reduce)').matches) $$('.stat b').forEach(b => { b.textContent = (b.dataset.pre || '') + '0' + (b.dataset.suf || ''); cio.observe(b); });
}

function home() {
  // Hero: next departure
  const next = TRIPS.filter(t => status(t).key === 'open').sort((a, b) => status(a).dep.start.localeCompare(status(b).dep.start))[0];
  const box = $('#next');
  if (next) {
    const days = Math.max(0, Math.ceil((new Date(status(next).dep.start + 'T00:00:00') - new Date()) / 864e5));
    box.innerHTML = `<p class="k">Next departure</p><h2>${esc(next.title)}</h2><p class="count"><b>${days}</b> days to go</p>
      <p>${status(next).label}<br>${next.pickup ? 'Pickup: ' + esc(next.pickup) : ''}</p>${next.deposit ? `<p>Reserve a seat with ${fmt(next.deposit)}.</p>` : ''}
      <button class="btn btn-primary wide" data-book="${next.id}">Reserve a seat</button>`;
  } else {
    box.innerHTML = `<p class="k">Next departure</p><h2>New dates are coming</h2><p>Our last departure has left. Tell us when you want to travel and we will plan it around you.</p>
      <button class="btn btn-primary wide" data-book="custom-trips">Plan a trip with us</button>`;
  }

  // Four ways into the catalogue
  $('#ways').innerHTML = WAYS.map((w, i) => `<button type="button" class="way rv" style="--i:${i}" data-way="${esc(w.filter)}"><i>0${i + 1}</i><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p><span>Explore &rarr;</span></button>`).join('');

  // Featured trips: three simple, image-led cards
  const featured = TRIPS.filter(t => t.id !== 'custom-trips').slice(0, 3);
  $('#featured').innerHTML = featured.map(featureHTML).join('');
  $('#view-all').addEventListener('click', () => $('.grid-head').scrollIntoView({ behavior: 'smooth', block: 'start' }));

  // Trip grid with region filter + search
  const grid = $('#trip-grid'), chips = $('#chips'), search = $('#search');
  let region = 'All';
  const regionList = ['All', ...TRIP_GROUPS];
  chips.innerHTML = regionList.map(r => `<button type="button" class="chip" data-region="${esc(r)}" aria-pressed="${r === 'All'}">${r === 'All' ? 'All trips' : esc(r)}</button>`).join('');
  const placeMatches = q => TRIPS.filter(t => [t.title, t.region, t.group, t.summary, t.type, ...(t.locations || []), ...(t.activities || []), ...(t.highlights || []), ...(t.includes || [])].join(' ').toLowerCase().includes(q));
  const render = () => {
    const q = search.value.trim().toLowerCase();
    const list = placeMatches(q).filter(t => region === 'All' || t.group === region);
    const custom = !q || list.length ? '' : (() => {
      const raw = search.value.trim();
      const place = placeMatch(raw) || raw;
      return `<div class="empty custom-empty"><h3>We do not have a set departure to “${esc(place)}”</h3><p>But we can plan a private trip there — we shape the route, transport, lodging and timing just for you.</p><p class="actions"><button class="btn btn-primary" data-place="${esc(place)}">View ${esc(place)} — book a private trip there</button>${region !== 'All' ? ' <button class="btn btn-ghost" type="button" data-region-all>See all regions</button>' : ''}</p></div>`;
    })();
    grid.innerHTML = list.length ? list.map(cardHTML).join('') : custom;
  };
  const setRegion = r => { region = r; $$('.chip', chips).forEach(x => x.setAttribute('aria-pressed', x.dataset.region === r)); render(); done(); };
  const q0 = new URLSearchParams(location.search).get('q'); if (q0) search.value = q0;
  grid.addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (b) { search.value = b.dataset.q; render(); done(); } });
  document.addEventListener('click', e => { const p = e.target.closest('[data-place]'); if (p) { e.preventDefault(); openPlace(p.dataset.place); } });
  document.addEventListener('click', e => { if (e.target.closest('[data-region-all]')) setRegion('All'); });
  autosuggest(search, item => {
    if (['Place', 'Destination'].includes(item.kind) && (!item.ids || !item.ids.length)) { openPlace(item.label); return; }
    if (item.kind === 'Trip') location.href = 'trip.html?id=' + item.ids[0];
    else { search.value = item.label; render(); done(); }
  });
  chips.addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) setRegion(c.dataset.region); });
  $('#ways').addEventListener('click', e => {
    const w = e.target.closest('[data-way]'); if (!w) return;
    if (w.dataset.way === 'custom') { openBooking('custom-trips'); return; }
    setRegion(w.dataset.way);
    $('.grid-head').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  search.addEventListener('input', () => { render(); done(); });
  const strip = DB.places().map(p => `<span>${p}</span>`).join(''); $('#places').innerHTML = strip; $('#places2').innerHTML = strip;
  render(); done();

  // Trip history: every departure in the database that has already happened
  const past = TRIPS.flatMap(t => (t.deps || []).filter(d => new Date(d.end + 'T23:59:59') < new Date()).map(d => ({ t, d }))).sort((a, b) => b.d.start.localeCompare(a.d.start));
  $('#history-list').innerHTML = past.map(({ t, d }) => `<a class="pastpill" href="trip.html?id=${t.id}">${esc(t.title)} <small>${range(d)}</small></a>`).join('') + PAST_TRIPS.map(p => `<span class="pastpill">${esc(p)}</span>`).join('');

}

function homeExtras() {
  // Photo mosaic: pictures from every trip in the database, mixed so each trip appears early
  const shots = TRIPS.flatMap((t, ti) => (t.gallery || []).map((g, gi) => ({ ...g, trip: t.title, k: gi * 10 + ti }))).sort((a, b) => a.k - b.k).slice(0, 16);
  const mosaic = $('#moments');
  if (mosaic) {
    mosaic.innerHTML = shots.map((g, i) => `<button class="shot rv" style="--i:${i % 4}" data-src="${g.src}" data-cap="${esc(g.cap)}"><img src="${g.src}" alt="${esc(g.cap)}" loading="lazy"><span><b>${esc(g.cap)}</b>${esc(g.trip)}</span></button>`).join('');
    mosaic.addEventListener('click', e => { const b = e.target.closest('.shot'); if (!b) return; const lb = $('#lightbox'); $('img', lb).src = b.dataset.src; $('img', lb).alt = b.dataset.cap; $('p', lb).textContent = b.dataset.cap; lb.showModal(); });
  }

  // Travel guides
  const guides = $('#guide-grid');
  if (guides) {
    guides.innerHTML = GUIDES.map((g, i) => `<button type="button" class="guide rv" style="--i:${i % 4}" data-guide="${g.id}">
      <span class="guide-img"><img src="${g.img}" alt="${esc(g.title)}" loading="lazy" decoding="async"></span>
      <span class="guide-body"><span class="kicker">${esc(g.date)} &middot; ${esc(g.read)}</span><b>${esc(g.title)}</b><small>${esc(g.excerpt)}</small><span class="guide-cta">Read guide &rarr;</span></span></button>`).join('');
    guides.addEventListener('click', e => { const b = e.target.closest('[data-guide]'); if (b) openGuide(b.dataset.guide); });
  }

  // Savings planner
  const priced = TRIPS.filter(t => t.price);
  const f = $('#plan'), st = store.get('plan', { trip: priced[0].id, seats: 'single', months: 2, saved: 0 });
  f.trip.innerHTML = priced.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join('');
  f.trip.value = priced.some(t => t.id === st.trip) ? st.trip : priced[0].id;
  f.seats.value = st.seats; f.months.value = st.months; f.saved.value = st.saved || '';
  const calc = () => {
    const t = byId(f.trip.value), goal = t.price[f.seats.value], months = +f.months.value;
    const saved = Math.min(Math.max(+f.saved.value || 0, 0), goal), left = goal - saved;
    pinfo.innerHTML = tripInfoHTML(t);
    const bookBtn = $('#plan [data-book]'); if (bookBtn) { bookBtn.dataset.book = t.id; bookBtn.textContent = 'Reserve a seat'; }
    store.set('plan', { trip: t.id, seats: f.seats.value, months, saved });
    $('#months-out').textContent = months + (months === 1 ? ' month' : ' months');
    $('#per-month').textContent = fmt(Math.ceil(left / months / 1000) * 1000);
    $('#per-week').textContent = fmt(Math.ceil(left / (months * 4.33) / 500) * 500);
    $('#goal').textContent = fmt(goal);
    $('#bar').style.width = Math.round(saved / goal * 100) + '%';
    $('#pct').textContent = Math.round(saved / goal * 100) + '% saved';
  };
  const pinfo = $('#plan-info');
  f.addEventListener('input', calc); f.addEventListener('submit', e => e.preventDefault()); calc();  done();
}


/* ---------- Trip detail page ---------- */
function detail() {
  const t = byId(new URLSearchParams(location.search).get('id'));
  const main = $('#trip');
  if (!t) { main.innerHTML = '<div class="wrap empty"><h1>Trip not found</h1><p><a href="index.html#trips">See all trips</a></p></div>'; return; }
  document.title = `${t.title} | ${SITE.name}`;
  $('meta[name=description]').content = t.summary;
  const s = status(t);
  const pics = [t.media, ...(t.gallery || [])].filter(x => x.src && x.type !== 'video').map(x => x.src);
  const photo = pics[0] || 'sunset.webp', photo2 = pics[1] || pics[0] || 'hills.webp';
  const block = (h, a) => a && a.length ? `<div><h3>${h}</h3><ul class="ticks">${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
  const revs = DB.reviews().filter(r => r.trip === t.id);
  const panels = `<section class="panel" id="overview" data-title="Overview"><div class="lists">${block('Highlights', t.highlights)}${block('Where we go', t.locations)}${block('Activities', t.activities)}${block('Cost includes', t.includes)}</div></section>
    ${t.gallery || t.videos ? `<section class="panel" id="gallery" data-title="Photos and videos" hidden>${t.gallery ? `<div class="gallery">${t.gallery.map((g, i) => `<button data-i="${i}"><img src="${g.src}" alt="${esc(g.cap)}" loading="lazy"><span>${esc(g.cap)}</span></button>`).join('')}</div>` : ''}${t.videos ? `<div class="videos">${t.videos.map(v => `<video src="${v}" controls autoplay muted loop playsinline preload="auto"></video>`).join('')}</div>` : ''}</section>` : ''}
    <section class="panel" id="feedback" data-title="Customer feedback (${revs.length})" hidden>${revs.length ? `<div class="rail-wrap"><button class="rail-btn prev" data-dir="-1" aria-label="Previous">&lsaquo;</button><div class="rail reviews">${revs.map(reviewCard).join('')}</div><button class="rail-btn next" data-dir="1" aria-label="Next">&rsaquo;</button></div>` : '<p class="empty">No reviews for this trip yet.</p>'}<p class="actions"><a class="btn btn-ghost" href="index.html#reviews">Share your experience</a></p></section>`;
  main.innerHTML = `
  <section class="t-hero"><div class="t-media">${mediaHTML(t.media, t.title)}</div>
    <div class="wrap"><p class="crumb"><a href="index.html#trips">All trips</a> / ${t.type}</p><h1>${esc(t.title)}</h1><p>${esc(t.desc)}</p></div></section>
  <section class="bgs v-warm t-body" style="--photo:url('${photo}')"><div class="wrap t-grid"><div>
    <div class="tabs-bar t-tabs"><div class="tabs" id="ttabs" role="tablist"></div></div><div id="tpanels">${panels}</div></div>
  <aside class="side"><p class="k">${esc(t.region)}</p><p class="price">${priceText(t)}</p>
    <dl><dt>Duration</dt><dd>${esc(t.duration)}</dd><dt>Dates</dt><dd>${esc(s.label)}${(t.deps || []).length > 1 ? '<br><small>All dates: ' + t.deps.map(range).join('; ') + '</small>' : ''}</dd>${t.pickup ? `<dt>Pickup</dt><dd>${esc(t.pickup)}</dd>` : ''}${t.deposit ? `<dt>Seat deposit</dt><dd>${fmt(t.deposit)}</dd>` : ''}</dl>
    ${t.saveNote ? `<p class="note">${esc(t.saveNote)} <a href="index.html#save">Try the savings planner</a></p>` : ''}
    <button class="btn btn-primary wide" data-book="${t.id}">${t.kind === 'request' ? 'Start planning' : 'Book this trip'}</button>
    <button class="btn btn-ghost wide" id="share-trip" type="button">Share this trip</button></aside></div></section>
  <section class="more bgs v-night dk" style="--photo:url('${photo2}')"><div class="wrap"><div class="more-head"><h2>More trips</h2><input id="search2" type="search" placeholder="Search all trips and places" aria-label="Search trips"></div><div class="rail-wrap"><button class="rail-btn prev" data-dir="-1" aria-label="Previous trips">&lsaquo;</button><div class="rail">${TRIPS.filter(x => x.id !== t.id).map(cardHTML).join('')}</div><button class="rail-btn next" data-dir="1" aria-label="Next trips">&rsaquo;</button></div></div></section>
  <div class="sticky-book"><div><b>${fromPrice(t)}</b><small>${esc(s.label)}</small></div><button class="btn btn-primary" data-book="${t.id}">${t.kind === 'request' ? 'Start planning' : 'Book now'}</button></div>`;
  document.body.classList.add('has-bookbar');
  $('#share-trip').addEventListener('click', async e => {
    const b = e.currentTarget, data = { title: t.title, text: t.summary, url: location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(location.href); b.textContent = 'Link copied'; }
    } catch { /* cancelled */ }
  });
  const T = initTabs($('#ttabs'), $('#tpanels'), true, null);
  deepLink(T);
  autosuggest($('#search2'), item => { location.href = item.kind === 'Trip' ? 'trip.html?id=' + item.ids[0] : 'index.html?q=' + encodeURIComponent(item.label) + '#trips'; });
  if (t.gallery) {
    const lb = $('#lightbox'); let i = 0;
    const show = n => { i = (n + t.gallery.length) % t.gallery.length; $('img', lb).src = t.gallery[i].src; $('img', lb).alt = t.gallery[i].cap; $('p', lb).textContent = t.gallery[i].cap; };
    $('.gallery').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { show(+b.dataset.i); lb.showModal(); } });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowRight') show(i + 1); if (e.key === 'ArrowLeft') show(i - 1); });
    $('img', lb).addEventListener('click', () => show(i + 1));
  }
}

const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }) : null;
function reveal() { $$('.rv:not(.in)').forEach(el => io ? io.observe(el) : el.classList.add('in')); }
function playlists() { /* videos with several clips play one after another, as on the original site */
  $$('video[data-list]').forEach(v => {
    const list = v.dataset.list.split(','); v._list = list; v._n = 0;
    v.addEventListener('ended', () => { v._n = (v._n + 1) % list.length; v.src = list[v._n]; v.play().catch(() => {}); });
    v.addEventListener('loadedmetadata', () => { v._skips = 0; });
  });
}
/* ---------- Media: every video starts on its own, muted and looping ---------- */
function setupVideos() {
  const arm = v => { if (v.paused) { v.muted = true; v.play().catch(() => {}); } };
  // Cards are re-rendered by search/filter, so new videos are watched too.
  const vio = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) arm(e.target); else e.target.pause();
      }), { threshold: 0.15 })
    : null;
  const watch = () => $$('video:not([controls])').forEach(v => {
    if (v._auto) return; v._auto = true;
    if (vio) vio.observe(v); else arm(v);
  });
  watch();
  new MutationObserver(watch).observe(document.body, { childList: true, subtree: true });
  document.addEventListener('loadedmetadata', e => { if (e.target.tagName === 'VIDEO') arm(e.target); }, true);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') watch(); });
}
function setupHero() {
  const bg = $('#hero-bg'); if (!bg) return;
  bg.innerHTML = HERO_SLIDES.map((src, i) => `<span class="hero-slide${i === 0 ? ' on' : ''}" style="background-image:url('${src}')"></span>`).join('');
  const slides = $$('.hero-slide', bg), dots = $('#hero-dots');
  if (dots) {
    dots.innerHTML = HERO_SLIDES.map((src, i) => `<button type="button" aria-label="Show background ${i + 1}" aria-current="${i === 0}"></button>`).join('');
    const bs = $$('button', dots);
    bs.forEach((b, i) => b.addEventListener('click', () => { go(i); reset(); }));
  }
  let i = 0;
  const go = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('on', k === i));
    if (dots) $$('button', dots).forEach((b, k) => b.setAttribute('aria-current', k === i));
  };
  let timer = null;
  const start = () => { if (!timer && !matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => { if (!document.hidden) go(i + 1); }, 6500); };
  const reset = () => { clearInterval(timer); timer = null; start(); };
  start();
  document.addEventListener('visibilitychange', () => { if (document.hidden) { clearInterval(timer); timer = null; } else start(); });
}

function setupMap() {
  const box = $('#map'); if (!box) return;
  const btn = box.querySelector('[data-map]'); if (!btn) return;
  btn.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = btn.dataset.map;
    f.title = 'Scenes Tours and Travels head office, Kikoni, Kampala';
    f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
    box.replaceChildren(f);
  }, { once: true });
}

const done = () => { reveal(); playlists(); updateRails(); };

document.addEventListener('DOMContentLoaded', () => {
  injectChrome(); setupDialogs(); setupMap(); setupHero();
  const setHH = () => document.documentElement.style.setProperty('--hh', $('#site-header').offsetHeight + 'px');
  setHH(); new ResizeObserver(setHH).observe($('#site-header'));
  if ($('#trip-grid')) { home(); stage(); }
  if ($('#trip')) detail();
  setupVideos(); done();
  // All media paths are checked by admin.html; no background repair probe is
  // needed on every visit, so nothing competes with the main thread after load.
});

/* ---------- Search suggestions: typing + the trip database + what the visitor searched before ---------- */
function lev(a, b) {
  const m = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let k = 1; k <= b.length; k++) m[0][k] = k;
  for (let i = 1; i <= a.length; i++) for (let k = 1; k <= b.length; k++) m[i][k] = Math.min(m[i - 1][k] + 1, m[i][k - 1] + 1, m[i - 1][k - 1] + (a[i - 1] === b[k - 1] ? 0 : 1));
  return m[a.length][b.length];
}
function score(q, label) {
  const l = label.toLowerCase(), words = l.split(/[\s,\/&()+-]+/).filter(Boolean);
  if (l === q) return 100;
  if (l.startsWith(q)) return 90;
  if (words.some(w => w.startsWith(q))) return 80;
  if (l.includes(q)) return 60;
  const qs = q.split(/\s+/);
  if (qs.length > 1 && qs.every(x => l.includes(x))) return 55;
  if (q.length >= 4) { const d = Math.min(...words.flatMap(w => [q.length - 1, q.length, q.length + 1].map(n => lev(q, w.slice(0, n))))); if (d <= (q.length >= 7 ? 2 : 1)) return 40 - d * 5; }
  return 0;
}
const recent = () => store.get('recent', []);
function suggest(raw) {
  const q = raw.trim().toLowerCase(), hist = recent().map(x => x.toLowerCase());
  if (!q) {
    const r = hist.map(h => DB.terms().find(t => t.label.toLowerCase() === h)).filter(Boolean).slice(0, 5).map(x => ({ ...x, recent: true }));
    return r.length ? r : DB.terms().filter(t => t.kind === 'Trip').slice(0, 5).map(x => ({ ...x, popular: true }));
  }
  const order = { Trip: 0, Destination: 1, Place: 2, Type: 3, Activity: 4, Highlight: 5, Included: 6 };
  const seen = new Set();
  // Places and destinations the database knows, even if no trip goes there yet.
  const base = DB.terms().map(t => ({ ...t, ids: [...t.ids] }));
  const covered = new Set(base.map(t => t.label.toLowerCase()));
  PLACES.forEach(p => { if (!covered.has(p.toLowerCase())) base.push({ label: p, kind: 'Place', ids: [] }); });
  const ranked = base.map(t => { const s = score(q, t.label); return { ...t, s: s && s + (hist.includes(t.label.toLowerCase()) ? 12 : 0) }; }).filter(t => t.s > 0)
    .sort((a, b) => b.s - a.s || order[a.kind] - order[b.kind]).filter(t => !seen.has(t.label.toLowerCase()) && seen.add(t.label.toLowerCase()));
  // Anything else the visitor typed is still a place we can take them to.
  const hasExact = ranked.some(t => t.label.toLowerCase() === q);
  const extra = q.length >= 2 && !covered.has(q) && !hasExact ? [{ label: String(q).replace(/\s+/g, ' '), kind: 'Place', ids: [] }] : [];
  return ranked.concat(extra).slice(0, 8);
}
function autosuggest(input, onPick) {
  const wrap = document.createElement('div'), list = document.createElement('ul'); let items = [], act = -1;
  wrap.className = 'ac'; list.className = 'ac-list'; list.id = 'ac-' + Math.random().toString(36).slice(2, 7); list.setAttribute('role', 'listbox'); list.hidden = true;
  input.replaceWith(wrap); wrap.append(input, list);
  input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-controls', list.id); input.setAttribute('aria-expanded', 'false'); input.autocomplete = 'off';
  const hl = l => { const q = input.value.trim(), i = q ? l.toLowerCase().indexOf(q.toLowerCase()) : -1; return i < 0 ? esc(l) : esc(l.slice(0, i)) + '<mark>' + esc(l.slice(i, i + q.length)) + '</mark>' + esc(l.slice(i + q.length)); };
  const open = () => { list.hidden = !items.length; input.setAttribute('aria-expanded', !list.hidden); };
  const draw = () => {
    items = suggest(input.value); act = -1;
    list.innerHTML = (input.value.trim() || !items.length ? '' : `<li class="ac-h" role="presentation">${items[0].popular ? 'Our trips' : 'Recent searches'}</li>`) + items.map((it, i) => `<li role="option" id="${list.id}-${i}" data-i="${i}"><span>${hl(it.label)}</span><em>${it.recent ? 'Recent' : it.popular ? 'Trip' : it.kind}${it.ids.length > 1 ? ' &middot; ' + it.ids.length + ' trips' : ''}</em></li>`).join('');
    open();
  };
  const mark = () => { $$('li[role=option]', list).forEach((li, i) => li.classList.toggle('on', i === act)); input.setAttribute('aria-activedescendant', act >= 0 ? `${list.id}-${act}` : ''); };
  const placeModes = new Set(['Place', 'Destination']);
  const pick = it => {
    store.set('recent', [it.label, ...recent().filter(x => x !== it.label)].slice(0, 5));
    list.hidden = true; input.setAttribute('aria-expanded', 'false');
    if (placeModes.has(it.kind) && (!it.ids || !it.ids.length)) { openPlace(it.label); return; }
    if (placeModes.has(it.kind) && it.ids && it.ids.length >= 1 && DB.places().includes(it.label)) {
      // A listed place with trips: selecting it shows the matching trips.
      input.value = it.label; onPick(it); return;
    }
    onPick(it);
  };
  input.addEventListener('input', draw); input.addEventListener('focus', draw);
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (list.hidden) draw(); act = (act + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; mark(); }
    else if (e.key === 'Enter' && act >= 0) { e.preventDefault(); pick(items[act]); }
    else if (e.key === 'Escape') { list.hidden = true; input.setAttribute('aria-expanded', 'false'); }
  });
  list.addEventListener('mousedown', e => { const li = e.target.closest('[data-i]'); if (li) { e.preventDefault(); pick(items[+li.dataset.i]); } });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) { list.hidden = true; input.setAttribute('aria-expanded', 'false'); } });
}

/* ---------- Self-healing media: find the file wherever it was saved, else show a branded placeholder (never white space) ---------- */
function heal(el) {
  const cur = el.getAttribute('src'); if (!cur || cur.startsWith('data:')) return;
  if (!el._chain || !el._chain.includes(cur)) { el._chain = mediaCandidates(cur, (el.dataset.alt || '').split(',').filter(Boolean)); el._i = 0; }
  const next = el._chain[++el._i];
  if (next) { el.setAttribute('src', next); if (el.tagName === 'VIDEO') { el.load(); el.play().catch(() => {}); } return; }
  placeholder(el);
}
function placeholder(el) {
  if (el.closest('#lightbox')) return;
  if (el.tagName === 'VIDEO' && el._list && (el._skips = (el._skips || 0) + 1) < el._list.length) { /* playlist: skip a missing clip, keep playing the others */
    el._n = (el._n + 1) % el._list.length; el.setAttribute('src', el._list[el._n]); el.load(); el.play().catch(() => {}); return;
  }
  (window.MISSING = window.MISSING || new Set()).add(el._chain ? el._chain[0] : el.getAttribute('src'));
  if (el.tagName === 'VIDEO' && el.poster && !el._poster) { const i = new Image(); i.src = el.poster; i.alt = el.getAttribute('aria-label') || ''; i._poster = 1; el.replaceWith(i); return; }
  const ph = document.createElement('div'), label = el.alt || el.getAttribute('aria-label') || '';
  ph.className = 'ph'; ph.setAttribute('role', 'img'); ph.setAttribute('aria-label', label);
  if (el.closest('.avatar')) { ph.className = 'ph avatar-ph'; ph.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="8" r="4.2"/><path d="M3.5 22c.6-4.8 4-7.6 8.5-7.6s7.900 2.800 8.500 7.600z"/></svg>'; el.replaceWith(ph); return; }
  if (el.closest('.brand')) { ph.classList.add('logo-ph'); ph.textContent = 'ST'; } else ph.innerHTML = `<span>${esc(label)}</span>`;
  el.replaceWith(ph);
}
document.addEventListener('error', e => { if (/^(IMG|VIDEO)$/.test(e.target.tagName)) heal(e.target); }, true);
const learn = e => { const el = e.target; if (el._i > 0) { const m = el.getAttribute('src').match(/^(.*\/)[^/]+$/); try { localStorage.setItem('stt_mdir', m ? m[1] : ''); } catch {} } };
document.addEventListener('load', learn, true); document.addEventListener('loadedmetadata', learn, true);

/* ---------- Tabs: one panel at a time keeps every page short ---------- */
const ALIAS = { history: 'trips', moments: 'gallery', places: 'world', destinations: 'world', top: 'trips' };
function initTabs(tabsEl, panelsEl, hash, anchor, before) {
  const panels = $$(':scope > .panel', panelsEl);
  tabsEl.innerHTML = panels.filter(p => p.dataset.tab !== 'off').map(p => `<button type="button" role="tab" data-id="${p.id}" aria-controls="${p.id}">${esc(p.dataset.title)}</button>`).join('');
  const bar = tabsEl.closest('.tabs-bar') || tabsEl;
  const show = (id, scroll, quiet, instant) => {
    id = ALIAS[id] || id; if (before) before(id);
    const p = panels.find(x => x.id === id) || panels[0];
    panels.forEach(x => { x.hidden = x !== p; });
    $$('button', tabsEl).forEach(b => { const on = b.dataset.id === p.id; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; if (on) tabsEl.scrollTo({ left: b.offsetLeft - (tabsEl.clientWidth - b.offsetWidth) / 2, behavior: instant ? 'instant' : 'smooth' }); });
    if (hash && !quiet) history.replaceState(null, '', location.pathname + location.search + '#' + p.id);
    if (scroll) { const base = anchor ? anchor.offsetTop + anchor.offsetHeight : bar.getBoundingClientRect().top + scrollY; const hh = $('#site-header').offsetHeight - (($('.topbar') || {}).offsetHeight || 0); scrollTo({ top: Math.max(0, base - hh + 1), behavior: instant ? 'instant' : 'smooth' }); }
    done();
  };
  tabsEl.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(b.dataset.id, true); });
  tabsEl.addEventListener('keydown', e => { const bs = $$('button', tabsEl), i = bs.indexOf(document.activeElement); if (i < 0 || !/Arrow(Left|Right)/.test(e.key)) return; const n = bs[(i + (e.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length]; n.focus(); show(n.dataset.id, false); });
  const initial = location.hash.slice(1);
  show(initial || panels[0].id, !!initial, true, true);
  return { show, ids: new Set([...panels.map(p => p.id), ...Object.keys(ALIAS)]) };
}
function deepLink(T) {
  if (!location.hash) return;
  let cancelled = false;
  const cancel = () => { cancelled = true; };
  ['wheel', 'touchstart', 'keydown'].forEach(ev => addEventListener(ev, cancel, { once: true, passive: true }));
  const jump = () => { if (!cancelled) T.show(location.hash.slice(1), true, true, true); };
  requestAnimationFrame(jump);
  [180, 600, 1200].forEach(ms => setTimeout(jump, ms));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(jump).catch(() => {});
}
function updateRails() { $$('.rail-wrap').forEach(w => { const r = $('.rail', w); if (!r.clientWidth) return; const more = r.scrollWidth > r.clientWidth + 4; $$('.rail-btn', w).forEach(b => { b.hidden = !more; }); }); }
document.addEventListener('click', e => { const b = e.target.closest('.rail-btn'); if (!b) return; const r = $('.rail', b.closest('.rail-wrap')); r.scrollBy({ left: +b.dataset.dir * r.clientWidth * .85, behavior: 'smooth' }); });
addEventListener('resize', updateRails);

function stage() {
  // The trips panel is all most visitors need. The other panels (and their
  // feedback form, team, FAQ and destination cards) are built on first use.
  let filled = false;
  const before = id => { if (filled || id === 'trips') return; filled = true; homeExtras(); company(); feedback(); };
  const T = initTabs($('#tabs'), $('#panels'), true, $('#top'), before);
  const norm = p => p.replace(/index\.html$/, '');
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="#"]'); if (!a || a.target === '_blank') return;
    const u = new URL(a.href, location.href); if (norm(u.pathname) !== norm(location.pathname) || !u.hash) return;
    const id = u.hash.slice(1);
    if (T.ids.has(id)) { e.preventDefault(); T.show(id, true); }
  });
  addEventListener('hashchange', () => T.show(location.hash.slice(1), false));
  const q = $('#quick'); q.trip.innerHTML = TRIPS.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join(''); q.date.min = new Date().toISOString().slice(0, 10);
  q.addEventListener('submit', e => { e.preventDefault(); openBooking(q.trip.value, { who: +q.who.value, date: q.date.value }); });
  deepLink(T);
}

/* ---------- Customer feedback: published reviews + a form that sends new feedback to the team on WhatsApp ---------- */
function feedback() {
  const list = DB.reviews(), avg = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
  $('#rev-sum').innerHTML = list.length ? `<b>${avg.toFixed(1)}</b><span class="stars" aria-hidden="true">${stars(Math.round(avg))}</span><small>${list.length} customer review${list.length > 1 ? 's' : ''}</small>` : '<small>No public reviews yet</small>';
  $('#rev-rail').innerHTML = list.length ? list.map(reviewCard).join('') : '<div class="rev-empty"><h3>Your story could be the first</h3><p>Travelled with us? Tell us how it went and your feedback will be featured here once approved.</p></div>';
  const f = $('#fb'); f.trip.innerHTML = TRIPS.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join('') + '<option value="other">Another trip</option>';
  f.addEventListener('submit', e => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(f)), err = $('.err', f), bad = [];
    if (d.name.trim().length < 2) bad.push('Enter your name.');
    if (!d.rating) bad.push('Choose a star rating.');
    if (d.text.trim().length < 10) bad.push('Write a few words about your trip.');
    if (bad.length) { err.textContent = bad.join(' '); err.hidden = false; return; }
    err.hidden = true;
    const t = byId(d.trip), msg = `*CUSTOMER FEEDBACK*\n\nName: ${d.name}\nTrip: ${t ? t.title : 'Another trip'}\nRating: ${stars(+d.rating)} (${d.rating}/5)\nFeedback: ${d.text}`;
    window.open(`https://wa.me/${SITE.phones[0].wa}?text=${encodeURIComponent(msg)}`, '_blank');
    f.innerHTML = '<h3>Thank you!</h3><p>Your feedback opened in WhatsApp. Press <b>Send</b> there and our team will review it for publishing.</p>';
  });
}
