
# Srishti's World ♡

A dreamy, pastel-themed homepage for collecting little surprise websites.

## Features

- Responsive homepage for mobile and desktop
- Website cards loaded from websites.json
- Pastel pink and lavender theme
- Floating stars and gentle animations
- Mobile navigation menu
- Cozy mode toggle
- No backend or database required

## Files

- index.html — Homepage structure
- style.css — Colours, layout and animations
- script.js — Website cards and interactions
- websites.json — List of surprise websites

## Add a new website

1. Publish the new surprise website.
2. Open websites.json.
3. Add a new object inside the array.
4. Add its title, description, URL, icon and theme.
5. Save and commit the changes.

Example:

{
  "title": "Birthday Surprise 🎂",
  "description": "A little birthday surprise.",
  "url": "https://your-birthday-site.example",
  "category": "Special Days",
  "icon": "🎂",
  "theme": "memories"
}

Replace the example URL with your actual published URL.

## Publish on GitHub Pages

1. Open repository Settings.
2. Open Pages.
3. Select the main branch.
4. Select the root folder (/).
5. Save and wait for deployment.

Note: Open the deployed website over HTTP/HTTPS.
Fetching websites.json may not work when index.html is opened directly as a local file.

Made with love by Divy ♡
