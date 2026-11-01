/* =============================================
   RIFKI ZAKARIA PORTFOLIO - JAVASCRIPT
   ============================================= */

'use strict';

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;

  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (currentScroll > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Change icon
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== TYPEWRITER EFFECT =====
const texts = [
  'Data Analyst',
  'Business Intelligence Developer',
  'Dashboard Builder',
  'Web Developer',
  'Google Apps Script Developer',
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeWriter() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typewriterEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    typewriterEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  const speed = isDeleting ? 60 : 90;
  setTimeout(typeWriter, speed);
}

typeWriter();

// ===== AOS (Animate On Scroll) - Lightweight custom implementation =====
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-aos-delay') || 0);
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, delay);
        // Unobserve after animation
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ===== PROJECT FILTER =====
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ===== CERTIFICATE MODAL =====
function openCertModal(src, title, type) {
  const modal = document.getElementById('certModal');
  const modalContent = document.getElementById('certModalContent');
  const modalTitle = document.getElementById('certModalTitle');
  const downloadBtn = document.getElementById('certDownloadBtn');

  modalTitle.textContent = title;
  downloadBtn.href = src;

  // Clear previous content
  modalContent.innerHTML = '';

  if (type === 'pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    modalContent.appendChild(iframe);
  } else if (type === 'img') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = title;
    modalContent.appendChild(img);
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal(event) {
  const modal = document.getElementById('certModal');

  // If event exists, only close if clicking overlay (not modal box)
  if (event) {
    if (event.target !== modal) return;
  }

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCertModal();
  }
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const btn = this.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> &nbsp; Mengirim...';
  btn.disabled = true;

  // Simulate sending (replace with actual backend/EmailJS integration)
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> &nbsp; Pesan Terkirim!';
    btn.style.background = 'linear-gradient(135deg, #43D9AD, #38c8a0)';
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      this.reset();
    }, 3000);
  }, 1500);
});

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ===== ACTIVE NAV LINK on Scroll =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');
  const scrollPos = window.pageYOffset + navbar.offsetHeight + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinksAll.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--primary)';
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== CURSOR GLOW (Optional, subtle) =====
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(108,99,255,0.06), transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ===== NUMBER COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseFloat(text);
        const suffix = text.replace(num.toString(), '');
        
        if (!isNaN(num)) {
          let current = 0;
          const increment = num / 40;
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            el.textContent = (Number.isInteger(num) ? Math.floor(current) : current.toFixed(1)) + suffix;
          }, 40);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initProjectFilter();
  initCursorGlow();
  animateCounters();

  // Add CSS animation keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
});
