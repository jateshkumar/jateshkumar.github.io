# jateshkumar.github.io

Personal portfolio for Jatesh Kumar. Static HTML, CSS, and JavaScript, no build step.

## Files

- `index.html`: page content and structure
- `style.css`: dark theme and layout
- `script.js`: mobile menu, year in footer, contact form submission
- `assets/Jatesh-Kumar-Resume.pdf`: downloadable resume

## Replacing the old site

1. Open the repo on GitHub and delete the old files, keeping the `.git` history.
2. Upload these files: `index.html`, `style.css`, `script.js`, `README.md`, and the `assets/` folder.
3. Commit the changes to the `main` branch.

## Turning on GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to *Deploy from a branch*.
3. Set **Branch** to `main` and the folder to `/ (root)`, then click **Save**.
4. After about a minute, the site is live at `https://jateshkumar.github.io`.

## Setting up the contact form

GitHub Pages only serves static files, so the form needs a third-party service to receive messages. This site uses [Formspree](https://formspree.io):

1. Create a free account at formspree.io and create a new form. Set the notification email to your inbox.
2. Copy the form endpoint, which looks like `https://formspree.io/f/abcd1234`.
3. In `index.html`, replace `YOUR_FORM_ID` in the `<form action="...">` attribute with your form ID.
4. Commit the change. Until this is done, submissions will fail and the page will show an error message.

## Updating content

- **Apps:** edit the `<article class="card">` blocks in the Apps section.
- **Experience and skills:** edit the `<li>` items in the Experience timeline and the `.chips` groups in Skills.
- **Colors:** change the CSS variables at the top of `style.css`.
- **Resume:** replace `assets/Jatesh-Kumar-Resume.pdf` with a new file of the same name.
