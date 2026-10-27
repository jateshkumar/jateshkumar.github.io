# jateshkumar.github.io

Personal portfolio for Jatesh Kumar. Static HTML, CSS, and JavaScript, no build step.

## Files

- `index.html`: page content and structure
- `style.css`: dark theme and layout
- `script.js`: mobile menu, year in footer, contact form submission
- `assets/Jatesh-Kumar-Resume.pdf`: downloadable resume
- `assets/favicon.svg`, `assets/apple-touch-icon.png`: browser and home-screen icons
- `assets/apps/`: App Store icons and screenshots for the Apps section (`<app>-icon.png`, `<app>-1.webp` to `-3.webp`)
- `assets/og-image.png`: 1200x630 preview image shown when the link is shared on LinkedIn, Slack, etc.
- `404.html`: page GitHub Pages shows for missing URLs
- `robots.txt`, `sitemap.xml`: search engine hints (update `<lastmod>` in the sitemap after big content changes)

## Replacing the old site

1. Open the repo on GitHub and delete the old files, keeping the `.git` history.
2. Upload these files: `index.html`, `style.css`, `script.js`, `README.md`, and the `assets/` folder.
3. Commit the changes to the `main` branch.

## Turning on GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to *Deploy from a branch*.
3. Set **Branch** to `main` and the folder to `/ (root)`, then click **Save**.
4. After about a minute, the site is live at `https://jateshkumar.github.io`.

## Contact form

GitHub Pages only serves static files, so the form posts to a Google Form ("Contact ME") in the background. Responses appear in the form's **Responses** tab (or a linked Google Sheet).

- **Email alerts:** in the Google Form, open **Responses → ⋮ → Get email notifications for new responses**.
- **Field mapping:** each input's `name` in `index.html` is a Google Form field ID (`entry.817197740` = Name, `entry.535239536` = Email, `entry.797285554` = Message).
- **Changing the form:** if you replace the form or recreate a question, open **⋮ → Get pre-filled link** in the form editor, fill in test values, and copy the new form ID and `entry.` numbers from the link into the `<form action>` and input names.
- Google doesn't let the page read its reply, so the page shows a success message whenever the request leaves the browser. The email link beside the form is the fallback.

## Updating content

- **Apps:** edit the `<article class="card">` blocks in the Apps section. Ratings are copied by hand from the App Store, so refresh them now and then.
- **Services, Impact, and Reviews:** edit the `.service`, `.case`, and `.review` blocks. Reviews are quoted word for word from Upwork and Freelancer.com, so keep them verbatim.
- **Experience and skills:** edit the `<li>` items in the Experience timeline and the `.chips` groups in Skills.
- **Colors:** change the CSS variables at the top of `style.css`.
- **Resume:** replace `assets/Jatesh-Kumar-Resume.pdf` with a new file of the same name.
