/* ─── SCRIPT: Mohammed Farzan Khan Portfolio ─── */

'use strict';

// ─── NAV: SCROLL BEHAVIOUR ────────────────────────────────
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ─── NAV: HAMBURGER ───────────────────────────────────────
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// ─── FADE-IN OBSERVER ─────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

// ─── ACTIVE NAV LINK ON SCROLL ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

// ─── MODAL ────────────────────────────────────────────────
const modal = document.getElementById('case-study-modal');

function openModal() {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close-btn').focus();
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('btn-case-study').focus();
}

// Keyboard: Escape closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

// Make openModal/closeModal global for onclick attributes
window.openModal  = openModal;
window.closeModal = closeModal;

// ─── CONTACT FORM ─────────────────────────────────────────
const contactForm  = document.getElementById('contact-form');
const formStatus   = document.getElementById('form-status');
const submitBtn    = document.getElementById('contact-submit');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name    = document.getElementById('contact-name-input').value.trim();
  const email   = document.getElementById('contact-email-input').value.trim();
  const subject = document.getElementById('contact-subject-input').value.trim();
  const message = document.getElementById('contact-message-input').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate send (replace with your backend / Formspree / EmailJS endpoint)
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending...';

  setTimeout(() => {
    showStatus('Thanks for reaching out! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Send Message';
  }, 1200);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className   = 'form-note ' + type;
  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className   = 'form-note';
  }, 5000);
}

// ─── FOOTER YEAR ──────────────────────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ─── SMOOTH SCROLL OFFSET (fixed nav) ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const offsetTop = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});
