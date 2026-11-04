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
  return `<h3>${esc(t.title)}</h3><p>${esc(t.summary)}</p><dl>${rows.map(([a, b]) => `<dt>${a}</dt><dd>${esc(b)}</dd>`).join('')}</dl>`
    + (t.includes ? `<p class="inc"><b>Includes:</b> ${t.includes.map(esc).join(', ')}</p>` : '')
    + (chips && ups.length ? `<p class="deps"><b>Pick a date:</b> ${ups.map(d => `<button type="button" class="chip" data-date="${d.start}">${range(d)}</button>`).join('')}</p>` : '');
}
const priceText = t => t.price ? `${fmt(t.price.single)} single, ${fmt(t.price.double)} double` : (t.kind === 'tbc' ? 'Fee to be communicated' : 'Quoted per trip');
const plansFor = t => t.price
  ? [`Single traveller (${fmt(t.price.single)})`, `Double / couple (${fmt(t.price.double)})`, 'Group / custom size']
  : ['Solo traveller', 'Couple', 'Small group (3 to 6)', 'Large group (7+)'];
const mediaHTML = (m, alt, list) => m.type === 'video'
  ? `<video src="${m.src}" ${m.poster ? `poster="${m.poster}"` : ''} ${list ? `data-list="${list.join(',')}"` : 'loop'} muted autoplay playsinline preload="metadata" aria-label="${esc(alt)}"></video>`
  : `<img src="${m.src}" alt="${esc(alt)}" loading="lazy">`;

function cardHTML(t, i = 0) {
  const s = status(t);
  return `<article class="card rv" style="--i:${i % 4}" data-type="${t.type}">
    <a class="card-media" href="trip.html?id=${t.id}">${mediaHTML(t.media, t.title, t.videos)}<span class="badge badge-${s.key}">${t.type}</span></a>
    <div class="card-body">
      <h3><a href="trip.html?id=${t.id}">${esc(t.title)}</a></h3>
      <p class="meta">${esc(t.region)} &middot; ${esc(t.duration)}</p>
      <p>${esc(t.summary)}</p>
      <p class="when ${s.key}">${esc(s.label)}</p>
      <p class="price">${priceText(t)}</p>
      <div class="actions"><button class="btn btn-primary" data-book="${t.id}">Book now</button><a class="btn btn-ghost" href="trip.html?id=${t.id}">Trip details</a></div>
    </div></article>`;
}

const ICONS = {
  TikTok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69A4.83 4.83 0 0 1 16 4.1V15.5A6.5 6.5 0 1 1 9.5 9c.17 0 .34.01.5.03v3.2a3.3 3.3 0 1 0 2.8 3.27V0h3.2a4.84 4.84 0 0 0 3.59 4.59v2.1z"/></svg>',
  Instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  Twitter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>'
};

/* ---------- Shared header, footer and dialogs ---------- */
function injectChrome() {
  const home = location.pathname.split('/').pop() !== 'trip.html' ? '' : 'index.html';
  $('#site-header').innerHTML = `<div class="wrap bar">
    <a class="brand" href="index.html"><img src="logo.png" alt="Scenes Tours logo" width="46" height="46"><span>${SITE.name}</span></a>
    <button class="menu" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
    <nav id="nav"><a href="${home}#trips">Trips</a><a href="${home}#save">Save for a trip</a><a href="${home}#about">About</a><a href="${home}#contact">Contact</a>
    <button class="btn btn-primary" data-book="">Book a trip</button></nav></div>`;
  const phones = SITE.phones.map(p => `<a href="tel:${p.tel}">${p.label}</a>`).join(' / ');
  $('#site-footer').innerHTML = `<div class="wrap foot">
    <div><h3>Scenes<span> Tours &amp; Travels</span></h3><p>Seamless travel journeys and safaris across East Africa. ${SITE.tagline}.</p>
      <p class="social">${SITE.social.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">${ICONS[s.name]}</a>`).join('')}</p></div>
    <div><h4>Trips</h4><ul>${TRIPS.map(t => `<li><a href="trip.html?id=${t.id}">${esc(t.title)}</a></li>`).join('')}</ul></div>
    <div><h4>Head office</h4><ul><li>${SITE.address}</li><li>${phones}</li><li><a href="mailto:${SITE.email}">${SITE.email}</a></li></ul></div>
    <div class="legal wrap"><span>&copy; ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span>
      <span><button data-legal="Privacy Policy">Privacy Policy</button><button data-legal="Terms of Service">Terms of Service</button></span></div></div>`;
  document.body.insertAdjacentHTML('beforeend', `
  <dialog id="book" aria-labelledby="book-h"><div class="dlg-head"><h3 id="book-h">Book your seat</h3><button class="x" data-close aria-label="Close">&times;</button></div>
    <form id="book-form" novalidate>
      <label>Full name<input name="name" autocomplete="name" required></label>
      <div class="row"><label>Phone (WhatsApp)<input name="phone" type="tel" autocomplete="tel" placeholder="07XX XXX XXX" required></label>
      <label>Destination<select name="trip" required>${TRIPS.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join('')}</select></label></div>
      <div class="row"><label>Package<select name="plan" required></select></label><label>Preferred date<input name="date" type="date" required></label></div>
      <div id="trip-info" class="tinfo" aria-live="polite"></div>
      <label>Special requests<input name="note" placeholder="e.g. vegetarian, extra room"></label>
      <p class="err" role="alert" hidden></p>
      <button class="btn btn-primary wide" type="submit">Continue on WhatsApp</button>
    </form>
    <div id="book-done" hidden><h4>Your request is ready</h4><p>WhatsApp opened with your details. Press <strong>Send</strong> there. You can also send the same request to our second agent.</p>
      <p class="actions" id="wa-links"></p></div></dialog>
  <dialog id="legal"><div class="dlg-head"><h3></h3><button class="x" data-close aria-label="Close">&times;</button></div><div class="legal-body"></div></dialog>
  <dialog id="lightbox"><button class="x" data-close aria-label="Close">&times;</button><img alt=""><p></p></dialog>`);

  document.body.insertAdjacentHTML('beforeend', `<div class="fab"><button class="up" aria-label="Back to top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 15l-6-6-6 6"/></svg></button>
    <a class="wa" href="https://wa.me/${SITE.phones[0].wa}?text=${encodeURIComponent('Hello Scenes Tours, I would like to know more about your trips.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0 0 3.2 17.3L2 22l4.8-1.2A11 11 0 1 0 20.5 3.5zM12 20a9 9 0 0 1-4.6-1.3l-.3-.2-2.8.7.7-2.7-.2-.3A9 9 0 1 1 12 20zm5-6.7c-.3-.1-1.600-.8-1.900-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6 0a7.400 7.400 0 0 1-3.700-3.200c-.3-.5.3-.5.800-1.500a.5.5 0 0 0 0-.5l-.9-2c-.2-.5-.5-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.200 5.200 5.200 0 0 0 1.100 2.800 11.900 11.900 0 0 0 4.600 4c1.700.7 2.400.8 3.200.7a2.700 2.700 0 0 0 1.800-1.300 2.200 2.200 0 0 0 .2-1.300c-.1-.1-.3-.2-.6-.3z"/></svg></a></div>`);
  $('.up').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  addEventListener('scroll', () => $('.up').classList.toggle('show', scrollY > 600), { passive: true });
  $('.menu').onclick = e => { const o = $('#nav').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); };
  $('#nav').addEventListener('click', e => { if (e.target.closest('a')) $('#nav').classList.remove('open'); });
  const header = $('#site-header');
  addEventListener('scroll', () => header.classList.toggle('stuck', scrollY > 8), { passive: true });
}

/* ---------- Dialogs and booking ---------- */
function setupDialogs() {
  $$('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); }));
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-book]'); if (b) { e.preventDefault(); openBooking(b.dataset.book); }
    const l = e.target.closest('[data-legal]'); if (l) { const d = $('#legal'); $('h3', d).textContent = l.dataset.legal; $('.legal-body', d).innerHTML = LEGAL[l.dataset.legal]; d.showModal(); }
  });
  const form = $('#book-form'), tripSel = form.trip;
  const fillPlans = () => { form.plan.innerHTML = plansFor(byId(tripSel.value)).map(p => `<option>${esc(p)}</option>`).join(''); $('#trip-info').innerHTML = tripInfoHTML(byId(tripSel.value), true); };
  form.addEventListener('click', e => { const c = e.target.closest('[data-date]'); if (c) form.date.value = c.dataset.date; });
  tripSel.addEventListener('change', fillPlans);
  window.openBooking = id => {
    const t = byId(id) || TRIPS[0];
    tripSel.value = t.id; fillPlans();
    const min = new Date().toISOString().slice(0, 10);
    form.date.min = min; form.date.value = status(t).dep ? status(t).dep.start : '';
    $('#book-done').hidden = true; form.hidden = false; $('.err', form).hidden = true;
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
    const text = `*NEW BOOKING REQUEST*\n\nName: ${f.get('name')}\nPhone: ${phone}\nDestination: ${t.title}\nPackage: ${f.get('plan')}\nTravel date: ${f.get('date')}\nComments: ${f.get('note') || 'None'}`;
    const link = p => `https://wa.me/${p.wa}?text=${encodeURIComponent(text)}`;
    window.open(link(SITE.phones[0]), '_blank');
    $('#wa-links').innerHTML = SITE.phones.map((p, i) => `<a class="btn ${i ? 'btn-ghost' : 'btn-primary'}" target="_blank" rel="noopener" href="${link(p)}">${i ? 'Also send to' : 'Open again:'} ${p.label}</a>`).join('');
    form.hidden = true; $('#book-done').hidden = false; form.reset();
  });
}

/* ---------- Home page ---------- */
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

  // Trip grid with search + type filter
  const grid = $('#trip-grid'), chips = $('#chips'), search = $('#search');
  let type = 'All';
  chips.innerHTML = ['All', ...new Set(TRIPS.map(t => t.type))].map(c => `<button class="chip" aria-pressed="${c === 'All'}">${c}</button>`).join('');
  const render = () => {
    const q = search.value.trim().toLowerCase();
    const list = TRIPS.filter(t => (type === 'All' || t.type === type) && (!q || [t.title, t.region, t.summary, t.type, ...(t.locations || []), ...(t.activities || []), ...(t.highlights || []), ...(t.includes || [])].join(' ').toLowerCase().includes(q)));
    grid.innerHTML = list.length ? list.map(cardHTML).join('') : `<p class="empty">No trips match "${esc(q)}".${suggest(q)[0] ? ` Did you mean <button class="link" data-q="${esc(suggest(q)[0].label)}">${esc(suggest(q)[0].label)}</button>?` : ''} Or <a href="#contact">ask us for a custom trip</a>.</p>`;
  };
  const q0 = new URLSearchParams(location.search).get('q'); if (q0) search.value = q0;
  grid.addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (b) { search.value = b.dataset.q; render(); done(); } });
  autosuggest(search, item => { if (item.kind === 'Trip') location.href = 'trip.html?id=' + item.ids[0]; else { search.value = item.label; render(); done(); } });
  chips.addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; type = c.textContent; $$('.chip', chips).forEach(x => x.setAttribute('aria-pressed', x === c)); render(); done(); });
  search.addEventListener('input', () => { render(); done(); });
  const strip = DB.places().map(p => `<span>${p}</span>`).join(''); $('#places').innerHTML = strip; $('#places2').innerHTML = strip;
  render(); done();

  // Trip history: every departure in the database that has already happened
  const past = TRIPS.flatMap(t => (t.deps || []).filter(d => new Date(d.end + 'T23:59:59') < new Date()).map(d => ({ t, d }))).sort((a, b) => b.d.start.localeCompare(a.d.start));
  $('#history').hidden = !past.length;
  $('#history-list').innerHTML = past.map(({ t, d }, i) => `<a class="hist rv" style="--i:${i % 4}" href="trip.html?id=${t.id}"><b>${esc(t.title)}</b><span>${range(d)}</span><small>${esc(t.region)} &middot; completed</small></a>`).join('');

  // Savings planner
  const priced = TRIPS.filter(t => t.price);
  const f = $('#plan'), st = store.get('plan', { trip: priced[0].id, seats: 'single', months: 2, saved: 0 });
  f.trip.innerHTML = priced.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join('');
  f.trip.value = st.trip; f.seats.value = st.seats; f.months.value = st.months; f.saved.value = st.saved || '';
  const calc = () => {
    const t = byId(f.trip.value), goal = t.price[f.seats.value], months = +f.months.value;
    const saved = Math.min(Math.max(+f.saved.value || 0, 0), goal), left = goal - saved;
    pinfo.innerHTML = tripInfoHTML(t);
    store.set('plan', { trip: t.id, seats: f.seats.value, months, saved });
    $('#months-out').textContent = months + (months === 1 ? ' month' : ' months');
    $('#per-month').textContent = fmt(Math.ceil(left / months / 1000) * 1000);
    $('#per-week').textContent = fmt(Math.ceil(left / (months * 4.33) / 500) * 500);
    $('#goal').textContent = fmt(goal);
    $('#bar').style.width = Math.round(saved / goal * 100) + '%';
    $('#pct').textContent = Math.round(saved / goal * 100) + '% saved';
  };
  const pinfo = $('#plan-info');
  f.addEventListener('input', calc); f.addEventListener('submit', e => e.preventDefault()); calc();
}

/* ---------- Trip detail page ---------- */
function detail() {
  const t = byId(new URLSearchParams(location.search).get('id'));
  const main = $('#trip');
  if (!t) { main.innerHTML = '<div class="wrap empty"><h1>Trip not found</h1><p><a href="index.html#trips">See all trips</a></p></div>'; return; }
  document.title = `${t.title} | ${SITE.name}`;
  $('meta[name=description]').content = t.summary;
  const s = status(t);
  const list = (h, a) => a && a.length ? `<section><h2>${h}</h2><ul class="ticks">${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>` : '';
  main.innerHTML = `
  <section class="t-hero"><div class="t-media">${mediaHTML(t.media, t.title)}</div>
    <div class="wrap"><p class="crumb"><a href="index.html#trips">All trips</a> / ${t.type}</p><h1>${esc(t.title)}</h1><p>${esc(t.desc)}</p></div></section>
  <div class="wrap t-grid"><div>
    ${list('Highlights', t.highlights)}${list('Where we go', t.locations)}${list('Activities', t.activities)}${list('Cost includes', t.includes)}
    ${t.gallery ? `<section><h2>Gallery</h2><div class="gallery">${t.gallery.map((g, i) => `<button data-i="${i}"><img src="${g.src}" alt="${esc(g.cap)}" loading="lazy"><span>${esc(g.cap)}</span></button>`).join('')}</div></section>` : ''}
    ${t.videos ? `<section><h2>Watch</h2><div class="videos">${t.videos.map(v => `<video src="${v}" controls muted playsinline preload="none"></video>`).join('')}</div></section>` : ''}
  </div>
  <aside class="side"><p class="k">${esc(t.region)}</p><p class="price">${priceText(t)}</p>
    <dl><dt>Duration</dt><dd>${esc(t.duration)}</dd><dt>Dates</dt><dd>${esc(s.label)}${(t.deps || []).length > 1 ? '<br><small>All dates: ' + t.deps.map(range).join('; ') + '</small>' : ''}</dd>${t.pickup ? `<dt>Pickup</dt><dd>${esc(t.pickup)}</dd>` : ''}${t.deposit ? `<dt>Seat deposit</dt><dd>${fmt(t.deposit)}</dd>` : ''}</dl>
    ${t.saveNote ? `<p class="note">${esc(t.saveNote)} <a href="index.html#save">Try the savings planner</a></p>` : ''}
    <button class="btn btn-primary wide" data-book="${t.id}">${t.kind === 'request' ? 'Start planning' : 'Book this trip'}</button></aside></div>
  <section class="more wrap"><div class="more-head"><h2>More trips</h2><input id="search2" type="search" placeholder="Search all trips and places" aria-label="Search trips"></div><div class="grid">${TRIPS.filter(x => x.id !== t.id).map(cardHTML).join('')}</div></section>`;

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
    const list = v.dataset.list.split(','); let n = 0;
    v.addEventListener('ended', () => { n = (n + 1) % list.length; v.src = list[n]; v.play().catch(() => {}); });
  });
}
const done = () => { reveal(); playlists(); };

document.addEventListener('DOMContentLoaded', () => {
  injectChrome(); setupDialogs();
  if ($('#trip-grid')) home();
  if ($('#trip')) detail();
  done();
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
  return DB.terms().map(t => { const s = score(q, t.label); return { ...t, s: s && s + (hist.includes(t.label.toLowerCase()) ? 12 : 0) }; }).filter(t => t.s > 0)
    .sort((a, b) => b.s - a.s || order[a.kind] - order[b.kind]).filter(t => !seen.has(t.label.toLowerCase()) && seen.add(t.label.toLowerCase())).slice(0, 8);
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
  const pick = it => { store.set('recent', [it.label, ...recent().filter(x => x !== it.label)].slice(0, 5)); list.hidden = true; input.setAttribute('aria-expanded', 'false'); onPick(it); };
  input.addEventListener('input', draw); input.addEventListener('focus', draw);
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (list.hidden) draw(); act = (act + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; mark(); }
    else if (e.key === 'Enter' && act >= 0) { e.preventDefault(); pick(items[act]); }
    else if (e.key === 'Escape') { list.hidden = true; input.setAttribute('aria-expanded', 'false'); }
  });
  list.addEventListener('mousedown', e => { const li = e.target.closest('[data-i]'); if (li) { e.preventDefault(); pick(items[+li.dataset.i]); } });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) { list.hidden = true; input.setAttribute('aria-expanded', 'false'); } });
}
