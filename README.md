# Amex Bank — Premium Banking Website

A modern, professional, responsive banking platform demo built with HTML, CSS, and JavaScript.

## Features

- **Secure Login Page** with username/password, show/hide password, Remember Me, and validation
- **Account Dashboard** with total balance prominently displayed
- **Checking & Savings Account Cards** with balances, status, and detail views
- **Transaction History** with searchable/filterable realistic sample transactions
- **Account Settings** (notifications, security, preferences, dark mode)
- **Profile** page
- **Fully responsive** design for mobile, tablet, and desktop
- **Mobile-friendly sidebar** navigation
- Smooth animations and transitions
- Premium American banking aesthetic (deep blue + gold accents)

## Demo Credentials

| Field    | Value              |
|----------|--------------------|
| Username | `Geraldfoss29`     |
| Password | `EricaGeraldfoss1` |

**Account Owner:** Gerald Foss  
**Total Balance:** $22,049,000.00  
- Checking: $12,049,000.00 (On Hold)  
- Savings: $10,000,000.00 (On Hold)

## How to Run Locally

### Option 1: Open directly in browser
1. Download or clone this folder.
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).

> Note: Some browsers restrict certain features when opening files via `file://`. For the best experience use a local server (Option 2).

### Option 2: Local development server (recommended)

**Using Python (built-in):**
```bash
cd amex-bank
python3 -m http.server 8080
```
Then open: http://localhost:8080

**Using Node.js (npx):**
```bash
cd amex-bank
npx serve .
```

**Using VS Code / Cursor:**
- Install the “Live Server” extension
- Right-click `index.html` → “Open with Live Server”

## Project Structure

```
amex-bank/
├── index.html        # Login page
├── dashboard.html    # Main dashboard (all sections)
├── styles.css        # Complete styling
├── script.js         # Login, navigation, filters, auth
└── README.md         # This file
```

## Deploying

This is a static site — no backend required.

### Netlify
1. Drag the `amex-bank` folder onto [netlify.com/drop](https://app.netlify.com/drop)  
   **or** connect a Git repository and set the publish directory to the project root.

### Vercel
```bash
npx vercel
```

### GitHub Pages
1. Push the folder to a GitHub repository.
2. Settings → Pages → Deploy from branch (root or `/docs`).

### Any static host
Upload the four files (`index.html`, `dashboard.html`, `styles.css`, `script.js`) to any web host or CDN.

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge) and mobile browsers (iOS Safari, Chrome Android).

## Notes

- Authentication is client-side only (for demo purposes). In production a real backend would be required.
- Account status is set to “On Hold” as specified.
- Dark mode preference is saved in `localStorage`.
- “Remember Me” uses `localStorage`; otherwise `sessionStorage`.

---

© 2026 Amex Bank Demo. For demonstration purposes only.
