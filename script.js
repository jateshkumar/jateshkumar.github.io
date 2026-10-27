// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

links.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Contact form: submits to Formspree via fetch so the user stays on the page
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

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      status.classList.add('ok');
      status.textContent = 'Thanks, your message was sent.';
      form.reset();
    } else {
      throw new Error('Request failed');
    }
  } catch (err) {
    status.classList.add('err');
    status.textContent = 'Something went wrong. Please email me directly.';
  } finally {
    button.disabled = false;
  }
});
