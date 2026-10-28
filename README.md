# jateshkumar.github.io

Personal portfolio for Jatesh Kumar, Staff iOS & macOS Engineer | Deputy Manager. Static HTML, CSS, and JavaScript, no build step. Live at https://jateshkumar.github.io, served by GitHub Pages from `main`.

> This README is public (GitHub Pages publishes every file in the repo). Keep private notes, drafts, and the phone number out of it.

## Project rules

- Static site only: `index.html`, `style.css`, `script.js`. Ask before adding a framework or build step.
- Keep copy factual and in the first person. Use only verified metrics (from the resume, App Store, or Jatesh).
- Don't add the phone number or a photo without asking.
- Don't commit notes, drafts, or context files. Everything in the repo is public.
- Title everywhere is "Staff iOS & macOS Engineer | Deputy Manager". The current role is shown as "Deputy Manager (Staff Engineer), AI/ML Automation". Don't use "Team Lead" (except inside someone else's own job title).
- Recommendations and client reviews are quoted word for word. Only obvious typos are fixed (and Farhaj's "Jitesh" is shown as "[Jatesh]").
- Keep this README in sync with the site.
- Commits go straight to `main`. Ask Jatesh before pushing.

## Files

- `index.html`: the main page. Sections: hero (code window, release-pipeline terminal, stats, "LIVE NOW" app ticker), Services, Apps (iOS and macOS), Impact, Experience, What people say (LinkedIn recommendations and freelance reviews), Skills, Contact.
- `style.css`: dark "editor" theme. Colors and widths are CSS variables at the top (`--max: 1320px`, `--gutter`). From 1200px up, each section has a sticky heading column on the left; Services, Impact, and Testimonials sit on full-width bands.
- `script.js`: menu, scroll reveal, count-up stats, scroll-spy, typing code window, pipeline loop, floating app-icon background, cursor spotlight, ⌘K command palette (`commands`), `` ` `` terminal (`termCommands`), Karachi clock in the status bar, Google Forms submission.
- `resume.html`: web and printable resume (prints to 2 pages). Keep it in sync with the PDF.
- `zofeur.html`: Zofeur case study (built from scratch as a trainee, shipped solo, the $700 Google Maps lesson, $27K → $3K monthly Maps bill).
- `404.html`, `robots.txt`, `sitemap.xml` (update `<lastmod>` after big content changes).
- `assets/Jatesh-Kumar-Resume.pdf`: downloadable resume.
- `assets/favicon.svg`, `assets/apple-touch-icon.png`: icons.
- `assets/og-image.png`: 1200x630 link preview for LinkedIn, Slack, etc.
- `assets/apps/`: App Store icons and screenshots (`<app>-icon.png`, `<app>-1.webp` to `-3.webp`).

## Status

### Done

- Resume download fixed (the PDF was in the repo root but linked from `assets/`).
- Logo changed to `jateshkumar.dev`.
- Techie UI: code window, pipeline terminal, ⌘K palette, interactive terminal, status bar, cursor spotlight, card glow, floating app icons, live-apps ticker. All animation respects reduced motion.
- Services section with a freelance note and a Calendly "Book a 30-min call" button.
- Apps: five iOS apps with screenshots and ratings, plus PureVPN and PureDome for Mac (linked to their download pages).
- Impact section with three case summaries; full Zofeur case study page.
- Experience lists every bullet from the resume, including the trainee line.
- Six LinkedIn recommendations in full (three columns of two) and five freelance reviews, with Upwork and Freelancer links.
- Contact form posts to a Google Form.
- Title changed to Staff iOS & macOS Engineer | Deputy Manager everywhere, including the preview image.
- Wide editorial layout with handwritten notes so the page doesn't look like a narrow centered template.
- SEO: Open Graph and Twitter tags, JSON-LD, sitemap, robots, 404 page. Lighthouse scored 100 in all four categories (before the wide layout).

### Left (needs Jatesh)

1. Set the GitHub profile website field to https://jateshkumar.github.io/.
2. Update the resume PDF: new title, and remove the phone number if it should stay private. Then replace `assets/Jatesh-Kumar-Resume.pdf`.
3. Confirm the published metrics are OK under any NDA (100K+ users, 87% → 96% crash-free, $27K → $3K, −18%).
4. Update the LinkedIn headline, then re-run LinkedIn Post Inspector on the site URL so the new preview shows.
5. Click-check the Upwork link (it blocks automated checks).
6. Optional: delete the "Claude test" response in the Google Form.

### Ideas (need input from Jatesh)

- A second case study (PureVPN crash-free work, macOS notarization pipeline, or the Swift Concurrency migration). Rough notes are enough.
- Zofeur details: the order of the $700 slip and the $27K bill, and the App Store rejection reasons.
- Visitor analytics (GoatCounter or Cloudflare Web Analytics) to see recruiter visits and resume downloads.
- Custom domain `jateshkumar.dev` to match the logo.
- A LinkedIn post based on the Zofeur story.

### Next technical checks

- Re-run Lighthouse and a phone check on the wide layout.
- Bring `resume.html` and `zofeur.html` up to the wide layout so all pages match.

## Contact form

GitHub Pages only serves static files, so the form posts to a Google Form ("Contact ME") in the background. Responses appear in the form's **Responses** tab (or a linked Google Sheet).

- **Email alerts:** in the Google Form, open **Responses → ⋮ → Get email notifications for new responses**.
- **Field mapping:** each input's `name` in `index.html` is a Google Form field ID (`entry.817197740` = Name, `entry.535239536` = Email, `entry.797285554` = Message).
- **Changing the form:** if you replace the form or recreate a question, open **⋮ → Get pre-filled link** in the form editor, fill in test values, and copy the new form ID and `entry.` numbers from the link into the `<form action>` and input names.
- Google doesn't let the page read its reply, so the page shows a success message whenever the request leaves the browser. The email link beside the form is the fallback.

## Updating content

- **Apps:** edit the `<article class="card">` blocks in the Apps section. Ratings are copied by hand from the App Store, so refresh them now and then.
- **Services, Impact, and Reviews:** edit the `.service`, `.case`, and `.review` blocks. Keep reviews and recommendations word for word.
- **Experience and skills:** edit the `<li>` items in the Experience timeline and the `.chips` groups in Skills.
- **Section layout:** each section is a `.section-head` (prompt, heading, one-line `.section-meta`) and a `.section-body`. Add `band` to a section's classes for a full-width background.
- **Handwritten notes:** `.hand-note` elements; they're hidden below 900px.
- **Colors and widths:** change the CSS variables at the top of `style.css`.
- **Resume:** replace `assets/Jatesh-Kumar-Resume.pdf` with a new file of the same name, and update `resume.html` to match.
- **Terminal and command palette:** commands live in `script.js` (`termCommands` for the `` ` `` terminal, `commands` for the ⌘K palette).

## Previewing locally

Run `python3 -m http.server 8765` in the repo folder and open http://localhost:8765.
