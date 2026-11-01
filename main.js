'use strict';

/* ================================================================
   RIFKI ZAKARIA PORTFOLIO — JAVASCRIPT
   ================================================================ */

// ── Helpers ──────────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── Navbar scroll behavior ────────────────────────────────────────
const header = $('#site-header');
const btt    = $('#btt');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  btt.classList.toggle('visible', y > 600);
}, { passive: true });

btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Burger / mobile menu ──────────────────────────────────────────
const burger  = $('#burgerBtn');
const navMenu = $('#navMenu');

burger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  // Animate burger spans
  const [s1, s2] = $$('span', burger);
  if (isOpen) {
    s1.style.transform = 'translateY(7px) rotate(45deg)';
    s2.style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    s1.style.transform = s2.style.transform = '';
  }
});

$$('.nav-link', navMenu).forEach(a =>
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
    $$('span', burger).forEach(s => (s.style.transform = ''));
  })
);

// ── Project filter ────────────────────────────────────────────────
const filterTabs = $$('.filter-tab');
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;

    $$('.proj-card').forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ── Intersection Observer: reveal animations ──────────────────────
function setupReveal(selector, threshold = 0.12, staggerParent = false) {
  const els = $$(selector);
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = staggerParent
        ? [...el.parentElement.children].indexOf(el) * 80
        : 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

setupReveal('[data-reveal]', 0.1, true);
setupReveal('.exp-item', 0.1);
setupReveal('.cert-row', 0.05);

// ── Active nav link on scroll ─────────────────────────────────────
const sections = $$('section[id]');
const navLinks  = $$('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(a => {
      const active = a.getAttribute('href') === `#${id}`;
      a.style.color = active ? 'var(--ink)' : '';
      a.style.background = active ? 'var(--paper-2)' : '';
    });
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ── Smooth scroll for all anchor links ───────────────────────────
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#' || !href) return;
    const target = $(href);
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

// ── Modal ─────────────────────────────────────────────────────────
const modalOverlay = $('#modal-overlay');
const modalTitle   = $('#modal-title');
const modalBody    = $('#modal-body');
const modalDl      = $('#modal-download');
const modalClose   = $('#modalCloseBtn');

function openModal(src, title, type) {
  modalTitle.textContent = title;
  modalDl.href = src;
  modalBody.innerHTML = '';

  if (type === 'pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    modalBody.appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = src;
    img.alt = title;
    modalBody.appendChild(img);
  }

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Expose globally (used by onclick in HTML)
window.openModal = openModal;

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  // Short delay before clearing content to avoid flash
  setTimeout(() => { modalBody.innerHTML = ''; }, 250);
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── Skills grid stagger (stack-pills) ────────────────────────────
const pillsContainer = $('.stack-pills');
if (pillsContainer) {
  const pillObs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    $$('.pill', pillsContainer).forEach((pill, i) => {
      setTimeout(() => {
        pill.style.opacity = '1';
        pill.style.transform = 'translateY(0)';
      }, i * 40);
    });
    pillObs.unobserve(pillsContainer);
  }, { threshold: 0.2 });

  $$('.pill', pillsContainer).forEach(p => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(8px)';
    p.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  });

  pillObs.observe(pillsContainer);
}

// ── Contact form ──────────────────────────────────────────────────
const form = $('#contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    const orig = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> &nbsp;Mengirim...';
    btn.disabled = true;

    // Simulate send (replace with real backend / EmailJS)
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> &nbsp;Terkirim!';
      btn.style.background = '#16a34a';

      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }, 1500);
  });
}

// ── Subtle cursor spot (desktop only) ────────────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  const spot = document.createElement('div');
  Object.assign(spot.style, {
    position: 'fixed',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '0',
    transform: 'translate(-50%,-50%)',
    background: 'radial-gradient(circle, rgba(26,86,219,0.04) 0%, transparent 70%)',
    transition: 'left 0.18s ease, top 0.18s ease',
    willChange: 'left, top',
  });
  document.body.appendChild(spot);

  document.addEventListener('mousemove', e => {
    spot.style.left = e.clientX + 'px';
    spot.style.top  = e.clientY + 'px';
  }, { passive: true });
}

// ── Bento stats entrance ──────────────────────────────────────────
const statBigs = $$('.stat-big');
if (statBigs.length) {
  const statObs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    statBigs.forEach((el, i) => {
      const raw   = el.textContent.trim();
      const num   = parseFloat(raw);
      const extra = raw.replace(String(num), '');
      if (isNaN(num)) return;
      let cur = 0;
      const steps = 40;
      const inc = num / steps;
      let frame = 0;
      const tick = () => {
        frame++;
        cur = Math.min(cur + inc, num);
        el.innerHTML = (Number.isInteger(num) ? Math.floor(cur) : cur.toFixed(0)) + extra;
        if (frame < steps) setTimeout(() => requestAnimationFrame(tick), 18);
      };
      setTimeout(() => requestAnimationFrame(tick), i * 120);
    });
    statObs.unobserve(entries[0].target);
  }, { threshold: 0.5 });
  statObs.observe($('.bento-stats') || statBigs[0]);
}
