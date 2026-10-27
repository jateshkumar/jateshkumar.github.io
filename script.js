const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Status bar clock in Karachi time, so remote clients can see my local hour
const localTime = document.getElementById('local-time');
const karachiTime = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit' });
const tick = () => { localTime.textContent = karachiTime.format(new Date()); };
tick();
setInterval(tick, 30000);

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

  // Count hero stats up from zero the first time they appear
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      counter.unobserve(entry.target);
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - (1 - t) ** 3)) + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });

  if (!reduceMotion) document.querySelectorAll('[data-count]').forEach((el) => counter.observe(el));

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

// Background: my app icons drifting slowly up behind the page
const bgApps = document.querySelector('.bg-apps');
const appIcons = ['purevpn', 'puredome', 'zofeur', 'orko', 'merigari'];

if (!reduceMotion) {
  for (let n = 0; n < 10; n += 1) {
    const img = document.createElement('img');
    img.src = `assets/apps/${appIcons[n % appIcons.length]}-icon.png`;
    img.alt = '';
    img.style.setProperty('--x', `${(n * 10 + Math.random() * 6).toFixed(1)}%`);
    img.style.setProperty('--s', `${Math.round(36 + Math.random() * 44)}px`);
    img.style.setProperty('--d', `${Math.round(30 + Math.random() * 25)}s`);
    img.style.setProperty('--r', `${Math.round(Math.random() * 60 - 30)}deg`);
    img.style.animationDelay = `${(-Math.random() * 50).toFixed(1)}s`;
    bgApps.append(img);
  }
}

// "Live on the App Store" ticker: duplicate the items so the loop is seamless
const track = document.querySelector('.marquee-track');

if (!reduceMotion) {
  [...track.children].forEach((item) => {
    const copy = item.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    copy.tabIndex = -1;
    track.append(copy);
  });
  track.classList.add('animate');
}

// Release pipeline that plays in the terminal under the code window
const termBody = document.querySelector('.code-term-body');
const releases = [
  { app: 'Zofeur' },
  { app: 'PureVPN', macOS: true },
  { app: 'ORKO Network' },
  { app: 'PureDome', macOS: true },
  { app: 'Meri Gari' },
];

const pipelineLines = ({ app, macOS }) => [
  ['cmd', `$ fastlane release app:"${app}"`],
  ['step', '\u25B8 Archiving build... done'],
  ['step', '\u25B8 Running XCTest suite... passed'],
  ...(macOS ? [['step', '\u25B8 Notarizing macOS PKG... accepted']] : []),
  ['step', '\u25B8 Uploading to App Store Connect... done'],
  ['ok', `\u2713 ${app} is Ready for Distribution`],
];

const printLine = ([kind, text]) => {
  const line = document.createElement('div');
  line.className = `t-${kind}`;
  line.textContent = text;
  termBody.append(line);
};

const runPipeline = (n = 0) => {
  // Wait while the tab is hidden instead of printing lines nobody sees
  if (document.hidden) {
    document.addEventListener('visibilitychange', () => runPipeline(n), { once: true });
    return;
  }
  termBody.textContent = '';
  const lines = pipelineLines(releases[n % releases.length]);
  lines.forEach((line, k) => setTimeout(() => printLine(line), k * 650));
  setTimeout(() => runPipeline(n + 1), lines.length * 650 + 2600);
};

// Type out the hero code window, then start the pipeline
const code = document.querySelector('.code-window code');

if (code && code.offsetParent && reduceMotion) {
  pipelineLines(releases[0]).forEach(printLine);
}

if (code && code.offsetParent && !reduceMotion) {
  // Lock the height so the hero doesn't shift while the text grows
  code.parentElement.style.minHeight = `${code.parentElement.offsetHeight}px`;

  const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
  const chunks = [];
  while (walker.nextNode()) {
    chunks.push({ node: walker.currentNode, text: walker.currentNode.textContent });
    walker.currentNode.textContent = '';
  }

  let i = 0;
  let j = 0;
  const type = () => {
    if (i >= chunks.length) {
      runPipeline();
      return;
    }
    const { node, text } = chunks[i];
    j += 1;
    node.textContent = text.slice(0, j);
    const ch = text[j - 1];
    if (j >= text.length) { i += 1; j = 0; }
    setTimeout(type, ch === '\n' ? 90 : 12);
  };
  setTimeout(type, 500);
}

// Cursor spotlight on the grid, and a glow inside the card under the pointer
if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
  const glowCards = '.card, .service, .case, .review, .skill-group, .freelance';
  document.addEventListener('pointermove', (e) => {
    document.body.style.setProperty('--mx', `${e.clientX}px`);
    document.body.style.setProperty('--my', `${e.clientY}px`);
    const card = e.target.closest(glowCards);
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - r.left}px`);
    card.style.setProperty('--y', `${e.clientY - r.top}px`);
  });
}

// Command palette: Cmd/Ctrl+K or "/" to jump around the page
const palette = document.getElementById('cmdk');
const paletteInput = palette.querySelector('input');
const paletteList = palette.querySelector('.cmdk-list');
const email = 'jateshkumarmaheshwari@gmail.com';

const toast = (message) => {
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = message;
  document.body.append(el);
  setTimeout(() => el.remove(), 2200);
};

const goTo = (hash) => () => document.querySelector(hash).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
const openTab = (url) => () => window.open(url, '_blank', 'noopener');

const commands = [
  { group: 'Go to', label: 'What I do', hint: '#services', run: goTo('#services') },
  { group: 'Go to', label: 'Apps', hint: '#apps', run: goTo('#apps') },
  { group: 'Go to', label: 'Impact', hint: '#impact', run: goTo('#impact') },
  { group: 'Go to', label: 'Experience', hint: '#experience', run: goTo('#experience') },
  { group: 'Go to', label: 'Recommendations and reviews', hint: '#testimonials', run: goTo('#testimonials') },
  { group: 'Go to', label: 'Skills', hint: '#skills', run: goTo('#skills') },
  { group: 'Go to', label: 'Contact', hint: '#contact', run: goTo('#contact') },
  { group: 'Actions', label: 'Book a 30-min call', hint: 'calendly', run: openTab('https://calendly.com/jateshkumarmaheshwari/30min') },
  { group: 'Actions', label: 'Open terminal', hint: '`', run: () => openTerm() },
  { group: 'Actions', label: 'View resume (web page)', hint: 'resume.html', run: openTab('resume.html') },
  {
    group: 'Actions',
    label: 'Download resume (PDF)',
    hint: 'pdf',
    run: () => {
      const a = document.createElement('a');
      a.href = 'assets/Jatesh-Kumar-Resume.pdf';
      a.download = 'Jatesh-Kumar-Resume.pdf';
      a.click();
    },
  },
  {
    group: 'Actions',
    label: 'Copy email address',
    hint: 'clipboard',
    run: async () => {
      try {
        await navigator.clipboard.writeText(email);
        toast('Email copied to clipboard');
      } catch {
        window.location.href = `mailto:${email}`;
      }
    },
  },
  { group: 'Actions', label: 'Send an email', hint: 'mailto', run: () => { window.location.href = `mailto:${email}`; } },
  { group: 'Profiles', label: 'LinkedIn', hint: 'jkmaheshwari', run: openTab('https://www.linkedin.com/in/jkmaheshwari') },
  { group: 'Profiles', label: 'GitHub', hint: 'jateshkumar', run: openTab('https://github.com/jateshkumar') },
  { group: 'Profiles', label: 'Upwork', hint: 'hire me', run: openTab('https://www.upwork.com/freelancers/~01549cd75e5e4d42bc') },
  { group: 'Profiles', label: 'Freelancer.com', hint: 'jateshkumar', run: openTab('https://www.freelancer.pk/u/jateshkumar') },
];

let matches = commands;
let active = 0;

const renderPalette = () => {
  const q = paletteInput.value.trim().toLowerCase();
  matches = commands.filter((c) => `${c.group} ${c.label} ${c.hint}`.toLowerCase().includes(q));
  active = Math.min(active, Math.max(matches.length - 1, 0));
  paletteList.innerHTML = '';

  if (!matches.length) {
    paletteList.innerHTML = '<li class="cmdk-empty">No matching commands</li>';
    paletteInput.removeAttribute('aria-activedescendant');
    return;
  }

  let group = '';
  matches.forEach((c, idx) => {
    if (c.group !== group) {
      group = c.group;
      const heading = document.createElement('li');
      heading.className = 'cmdk-group';
      heading.setAttribute('role', 'presentation');
      heading.textContent = group;
      paletteList.append(heading);
    }
    const li = document.createElement('li');
    li.id = `cmdk-opt-${idx}`;
    li.className = 'cmdk-item';
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', String(idx === active));
    li.innerHTML = `<span></span><small></small>`;
    li.firstChild.textContent = c.label;
    li.lastChild.textContent = c.hint;
    li.addEventListener('click', () => runCommand(idx));
    li.addEventListener('pointermove', () => {
      if (active !== idx) { active = idx; renderPalette(); }
    });
    paletteList.append(li);
  });

  paletteInput.setAttribute('aria-activedescendant', `cmdk-opt-${active}`);
  document.getElementById(`cmdk-opt-${active}`).scrollIntoView({ block: 'nearest' });
};

const openPalette = () => {
  if (palette.open) return;
  closeMenu();
  paletteInput.value = '';
  active = 0;
  renderPalette();
  palette.showModal();
  paletteInput.focus();
};

const runCommand = (idx) => {
  const command = matches[idx];
  if (!command) return;
  palette.close();
  command.run();
};

document.querySelectorAll('[aria-controls="cmdk"]').forEach((btn) => btn.addEventListener('click', openPalette));

document.addEventListener('keydown', (e) => {
  const typing = e.target instanceof Element && e.target.closest('input, textarea');
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (palette.open) palette.close(); else openPalette();
  } else if (e.key === '/' && !typing && !palette.open) {
    e.preventDefault();
    openPalette();
  }
});

paletteInput.addEventListener('input', () => { active = 0; renderPalette(); });

paletteInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (!matches.length) return;
    active = (active + (e.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length;
    renderPalette();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    runCommand(active);
  }
});

// Clicking the dimmed backdrop closes the palette
palette.addEventListener('click', (e) => {
  if (e.target === palette) palette.close();
});

// Interactive terminal: press ` (or use the status bar button) and type "help"
const term = document.getElementById('term');
const termOut = term.querySelector('.term-out');
const termForm = term.querySelector('.term-line');
const termInput = term.querySelector('input');
const calendly = 'https://calendly.com/jateshkumarmaheshwari/30min';

const apps = {
  purevpn: { name: 'PureVPN', platforms: 'iOS, macOS', url: 'https://apps.apple.com/us/app/purevpn-secure-vpn-for-iphone/id594506418' },
  puredome: { name: 'PureDome', platforms: 'iOS, macOS', url: 'https://apps.apple.com/us/app/puredome-zero-trust-security/id1601389848' },
  zofeur: { name: 'Zofeur', platforms: 'iOS', url: 'https://apps.apple.com/us/app/zofeur-hire-a-safe-driver/id1520275979' },
  orko: { name: 'ORKO Network', platforms: 'iOS', url: 'https://apps.apple.com/us/app/orko-network/id1588216570' },
  merigari: { name: 'Meri Gari', platforms: 'iOS', url: 'https://apps.apple.com/pk/app/meri-gari/id1631521260' },
};

const termCommands = {
  help: () => [
    'Available commands:',
    '  whoami          who I am',
    '  ls apps         apps I have shipped',
    '  open <app>      open an app on the App Store (e.g. open zofeur)',
    '  experience      where I have worked',
    '  skills          what I work with',
    '  resume          view my resume',
    '  contact         how to reach me',
    '  book            book a 30-min call',
    '  clear           clear the screen',
    '  exit            close the terminal',
  ],
  whoami: () => [
    'Jatesh Kumar',
    'Senior iOS & macOS Engineer · Deputy Manager, Team Lead',
    'Karachi, Pakistan · open to remote roles and freelance projects',
  ],
  ls: (args) => {
    if (args[0] && args[0] !== 'apps') return [`ls: ${args[0]}: No such file or directory. Try "ls apps".`];
    return Object.entries(apps).map(([key, app]) => `  ${key.padEnd(10)} ${app.name.padEnd(14)} ${app.platforms}`);
  },
  open: (args) => {
    const app = apps[(args[0] || '').toLowerCase()];
    if (!app) return [`open: unknown app "${args[0] || ''}". Run "ls apps" to see the list.`];
    window.open(app.url, '_blank', 'noopener');
    return [`Opening ${app.name} on the App Store...`];
  },
  experience: () => [
    '* Sep 2026 – now      Deputy Manager, AI/ML Automation · Ideas Private Limited',
    '* Mar 2023 – Sep 2026 Senior Engineer, iOS/macOS · PureSquare (Disrupt.com)',
    '* Feb 2021 – Mar 2023 iOS Engineer · Next Generation Innovation (NextGenI)',
  ],
  skills: () => [
    'languages     Swift, Objective-C',
    'ui            SwiftUI, UIKit, AppKit',
    'concurrency   Swift Concurrency, Actors, GCD, Combine',
    'architecture  MVVM, Clean Architecture, Dependency Injection, Feature Flags',
    'release       Fastlane, Azure DevOps, GitHub Actions, notarization, PKG',
    'testing       XCTest, TDD, Firebase Crashlytics, Instruments',
  ],
  resume: () => {
    window.open('resume.html', '_blank', 'noopener');
    return ['Opening resume.html... (PDF: assets/Jatesh-Kumar-Resume.pdf)'];
  },
  contact: () => [
    'email      jateshkumarmaheshwari@gmail.com',
    'linkedin   linkedin.com/in/jkmaheshwari',
    'github     github.com/jateshkumar',
    'calendly   calendly.com/jateshkumarmaheshwari/30min',
  ],
  book: () => {
    window.open(calendly, '_blank', 'noopener');
    return ['Opening Calendly...'];
  },
  sudo: (args) => {
    if (args.join(' ').toLowerCase() !== 'hire jatesh') return ['sudo: try "sudo hire jatesh"'];
    window.open(calendly, '_blank', 'noopener');
    return ['[sudo] password for recruiter: ********', 'Access granted. Opening Calendly to book a call...'];
  },
  clear: () => {
    termOut.textContent = '';
    return [];
  },
  exit: () => {
    term.close();
    return [];
  },
};

const termHistory = [];
let historyIndex = 0;

const termPrint = (lines, className = '') => {
  lines.forEach((text) => {
    const line = document.createElement('div');
    if (className) line.className = className;
    line.textContent = text;
    termOut.append(line);
  });
  termOut.scrollTop = termOut.scrollHeight;
};

const openTerm = () => {
  if (term.open) return;
  closeMenu();
  if (palette.open) palette.close();
  if (!termOut.childElementCount) {
    termPrint(['Welcome to jateshkumar.dev. Type "help" to see what you can do.']);
  }
  term.showModal();
  termInput.focus();
};

termForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = termInput.value.trim();
  termInput.value = '';
  termPrint([`jatesh@mac:~$ ${raw}`], 't-cmd');
  if (!raw) return;

  termHistory.push(raw);
  historyIndex = termHistory.length;
  const [name, ...args] = raw.split(/\s+/);
  const command = termCommands[name.toLowerCase()];
  if (command) termPrint(command(args));
  else termPrint([`zsh: command not found: ${name}. Type "help".`], 't-err');
});

termInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    historyIndex = Math.max(0, Math.min(termHistory.length, historyIndex + (e.key === 'ArrowUp' ? -1 : 1)));
    termInput.value = termHistory[historyIndex] || '';
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const match = Object.keys(termCommands).find((c) => c.startsWith(termInput.value.toLowerCase()));
    if (termInput.value && match) termInput.value = match;
  }
});

document.querySelectorAll('[aria-controls="term"]').forEach((btn) => btn.addEventListener('click', openTerm));
term.querySelector('.term-close').addEventListener('click', () => term.close());
term.addEventListener('click', (e) => {
  if (e.target === term) term.close();
});

document.addEventListener('keydown', (e) => {
  const typing = e.target instanceof Element && e.target.closest('input, textarea');
  if (e.key === '`' && !typing && !term.open) {
    e.preventDefault();
    openTerm();
  }
});

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
