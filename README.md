# Invitation Demo

This is a small static invitation demo inspired by the sample you provided.

Files added:

- `index.html` — main page
- `styles.css` — styling
- `script.js` — guest name parsing, countdown, RSVP handling (localStorage)

How to run locally (full stack)

From this folder (`/Users/ashishdash/test`) you can run the Express server which will serve the static frontend and provide the `/api/rsvp` endpoint.

1) Install dependencies and start the server

```bash
cd /Users/ashishdash/test
npm install
npm start
```

2) Open the site in your browser

```bash
# then open in browser:
http://localhost:5000/index.html?to=Guest&demo=true
```

Notes:

- The server serves the static files and listens on port `5000` by default.
- If you prefer to serve the frontend separately (python or `http-server`) you can still use the API running on port 5000 — the frontend will attempt to POST to `http://localhost:5000/api/rsvp` when it detects a different origin.

Python alternative (no Node/npm required):

```bash
# from the project root
python3 -m pip install -r requirements.txt --user
# start server on default port 5000
python3 py_server.py
# or to change port (e.g. 5001):
PORT=5001 python3 py_server.py
```

Open `http://localhost:5000/index.html?to=Guest&demo=true` (or change port if you set `PORT`).

Usage

- Add `?to=YourName` to the URL to show a personalized greeting.
- Add `&demo=true` to enable a demo accent color.
- Click `RSVP` to open a modal. RSVPs are saved to `localStorage` in the browser (demo only).

Next steps you might want me to do

- Add real images and a gallery
- Add a server endpoint to collect RSVPs
- Deploy to Netlify/Vercel with a custom domain

If you want I can wire this to a more robust backend (database, authentication, or Google Sheets integration) and add admin pages for RSVP management.
