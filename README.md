A small full-stack project that provides a lightweight surface scanner for websites. It collects HTTP headers, checks for reflected XSS, discovers common directories, queries CVE information via Vulners, inspects SSL certificates, and checks basic TCP ports (HTTP/HTTPS).

## Overview

- **Backend:** Node + Express (listens on port `5000`) exposing a POST `/scan` endpoint that accepts JSON with a `url` field and returns aggregated scanner results from `backend/scanners/`.
- **Frontend:** React app built with Vite in the `frontend/` folder that serves as a UI to trigger scans.

## Installation & Run

Open two terminals (one for backend and one for frontend).

1) Backend

```powershell
npm install
node server.js
```

2) Frontend

```powershell
npm install
npm run dev
```

After starting, the backend listens on `http://localhost:5000` and the frontend typically runs on `http://localhost:5173`.

## Backend API

POST `/scan`
- Body (JSON): `{ "url": "https://example.com" }`
- Response (JSON):
  - `headers`: HTTP response headers captured from a GET to the URL
  - `xss`: result of the reflected XSS check (if any)
  - `dirs`: list of discovered directories (status codes 200/401/403)
  - `ssl`: SSL certificate information for the domain
  - `ports`: array with port scan results 


## Scanners (in `backend/scanners`)

- `grabBanner.js`
  - Performs a GET request to the target URL and returns HTTP response headers (5s timeout). Useful to identify the server software (Apache, nginx).

- `vulnProbing.js`
  - Appends a query parameter `?q=<script>alert(1)</script>` and checks whether the payload appears in the response body.
  - Returns an object like `{ vuln: 'XSS', details: 'Payload reflected in response' }` if found, otherwise `null`.

- `dirDiscovery.js`
  - Uses a built-in wordlist of common paths (e.g. `/admin`, `/login`, `/api`) and requests each path, considering 200/401/403 as indicators of existence.
  - Returns an array of `{ dir, status }` for discovered paths.

- `sslCheck.js`
  - Uses the `ssl-checker` package to gather certificate information (expiry, issuer, validity).

- `portScan.js`
  - Basic TCP port checker using `net.Socket` with a 2s timeout to determine if a port is open.
