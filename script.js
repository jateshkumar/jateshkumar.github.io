// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

const closeMenu = () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
};

links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && links.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});

// Reveal cards as they scroll into view
const revealables = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  revealables.forEach((el) => revealer.observe(el));

  // Highlight the nav link for the section on screen
  const navLinks = links.querySelectorAll('a[href^="#"]');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach((section) => spy.observe(section));
} else {
  revealables.forEach((el) => el.classList.add('in'));
}

// Contact form: posts to a Google Form in the background so the visitor stays on the page
const form = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Honeypot: bots fill the hidden field, humans don't
  if (form._gotcha.value) return;

  const button = form.querySelector('button');
  button.disabled = true;
  status.className = 'form-status';
  status.textContent = 'Sending...';

  // Send only the Google Form fields, not the honeypot
  const data = new URLSearchParams();
  new FormData(form).forEach((value, key) => {
    if (key.startsWith('entry.')) data.append(key, value);
  });

  try {
    // Google Forms doesn't allow cross-origin reads, so the response is opaque.
    // The request only rejects on a network failure.
    await fetch(form.action, { method: 'POST', mode: 'no-cors', body: data });
    status.classList.add('ok');
    status.textContent = 'Thanks, your message was sent.';
    form.reset();
  } catch (err) {
    status.classList.add('err');
    status.textContent = 'Something went wrong. Please email me directly.';
  } finally {
    button.disabled = false;
  }
});
