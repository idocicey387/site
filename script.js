// ============================================
// TOTALBET DIGITAL — script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── BURGER MENU ──
  const burger = document.querySelector('.burger');
  const body = document.body;

  if (burger) {
    burger.addEventListener('click', () => {
      body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', body.classList.contains('menu-open'));
    });

    // Close on link click
    document.querySelectorAll('.menu-links a').forEach(link => {
      link.addEventListener('click', () => {
        body.classList.remove('menu-open');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') body.classList.remove('menu-open');
    });
  }

  // ── ACTIVE NAV LINK ──
  const current = window.location.pathname;
  document.querySelectorAll('.menu-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '/' && href === '/') ||
        (current !== '/' && href !== '/' && current.startsWith(href))) {
      link.classList.add('active');
    }
  });

  // ── SCROLL ANIMATIONS ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── NAV SCROLL EFFECT ──
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 40
        ? 'rgba(10,10,10,0.96)'
        : 'rgba(10,10,10,0.8)';
    }, { passive: true });
  }

  // ── CONTACT FORM ──
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent ✓';
      btn.disabled = true;
      btn.style.background = '#1c1c1c';
      btn.style.color = '#c8f135';
    });
  }

  // ── ACCORDION ──
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ── STAGGER CARD ANIMATIONS ──
  document.querySelectorAll('.cards-grid .card, .solutions-grid .solution-card, .tech-grid .tech-item, .news-grid .news-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.06}s`;
    card.classList.add('fade-up');
    observer.observe(card);
  });

});
