import express from "express";
import cors from "cors";

import { grabBanner } from "./scanners/grabBanner.js";
import { testXSS } from "./scanners/vulnProbing.js";
import { dirDiscovery } from "./scanners/dirDiscovery.js";
import { checkSSL } from "./scanners/sslCheck.js";
import { scanPort } from "./scanners/portScan.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/scan", async (req, res) => {
  const { url } = req.body;
  try {
    const headers = await grabBanner(url);
    const xss = await testXSS(url);
    const dirs = await dirDiscovery(url);
    const domain = new URL(url).hostname;
    const ssl = await checkSSL(domain);
    const ports = [
      await scanPort(domain, 80),
      await scanPort(domain, 443)
    ];
    res.json({ headers, xss, dirs, ssl, ports });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () =>
  console.log("backend on http://localhost:5000")
);
