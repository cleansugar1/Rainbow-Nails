// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links  = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
}

// Highlight today's hours (Hawaii time) on the Visit page
const rows = document.querySelectorAll('.hours tr[data-day]');
if (rows.length) {
  const day = new Date(new Date().toLocaleString('en-US', { timeZone: 'Pacific/Honolulu' })).getDay();
  rows.forEach(r => { if (Number(r.dataset.day) === day) r.classList.add('today'); });
}

// Footer year
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// Gallery: open photos in a viewer instead of a new page
const box = document.querySelector('.lightbox');
if (box && typeof box.showModal === 'function') {
  const img = box.querySelector('img');
  const cap = box.querySelector('.lightbox-caption');
  document.querySelectorAll('a.g-tile').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = a.querySelector('img');
      img.src = a.href; img.alt = t.alt; cap.textContent = t.alt;
      box.showModal();
    });
  });
  box.querySelector('.lightbox-close').addEventListener('click', () => box.close());
  box.addEventListener('click', e => { if (e.target === box) box.close(); });
}
