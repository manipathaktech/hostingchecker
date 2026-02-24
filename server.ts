import express from "express";
import { createServer as createViteServer } from "vite";
import dns from "dns";
import axios from "axios";
import whois from "whois-json";
import RSSParser from "rss-parser";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("cache.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS lookup_cache (
    domain TEXT PRIMARY KEY,
    data TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const parser = new RSSParser();

  app.use(express.json());

  // API Routes
  app.get("/api/lookup", async (req, res) => {
    const domain = req.query.domain as string;
    if (!domain) return res.status(400).json({ error: "Domain is required" });

    // Clean domain
    let cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];

    // Check cache (1 hour)
    const cached = db.prepare("SELECT data FROM lookup_cache WHERE domain = ? AND timestamp > datetime('now', '-1 hour')").get(cleanDomain) as { data: string } | undefined;
    if (cached) {
      return res.json(JSON.parse(cached.data));
    }

    try {
      const results: any = { domain: cleanDomain };

      // 1. DNS Lookup
      const resolveDns = (type: any) => new Promise((resolve) => {
        dns.resolve(cleanDomain, type, (err, addresses) => {
          if (err) resolve([]);
          else resolve(addresses);
        });
      });

      const [aRecords, nsRecords, mxRecords, txtRecords] = await Promise.all([
        resolveDns("A"),
        resolveDns("NS"),
        resolveDns("MX"),
        resolveDns("TXT")
      ]);

      results.dns = {
        a: aRecords,
        ns: nsRecords,
        mx: mxRecords,
        txt: txtRecords
      };

      const ip = (aRecords as string[])[0];
      results.ip = ip;

      // 2. Geolocation (IP-API free tier)
      if (ip) {
        try {
          const geoRes = await axios.get(`http://ip-api.com/json/${ip}`);
          results.geo = geoRes.data;
        } catch (e) {
          results.geo = null;
        }
      }

      // 3. WHOIS
      try {
        const whoisData = await whois(cleanDomain);
        results.whois = whoisData;
      } catch (e) {
        results.whois = null;
      }

      // 4. Headers & Tech Detection
      try {
        const headRes = await axios.get(`http://${cleanDomain}`, { 
          timeout: 5000,
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });
        results.headers = headRes.headers;
        results.server = headRes.headers['server'] || 'Unknown';
        
        // Simple CMS detection
        const body = headRes.data.toLowerCase();
        if (body.includes('wp-content')) results.cms = 'WordPress';
        else if (body.includes('shopify')) results.cms = 'Shopify';
        else if (body.includes('squarespace')) results.cms = 'Squarespace';
        else if (body.includes('wix.com')) results.cms = 'Wix';
        else results.cms = 'Custom / Unknown';

        // SSL Info (Simplified - just check if https works)
        try {
          await axios.get(`https://${cleanDomain}`, { timeout: 3000 });
          results.ssl = "Active / Valid";
        } catch (e) {
          results.ssl = "Inactive / Error";
        }

      } catch (e) {
        results.headers = null;
        results.server = 'Unknown';
        results.cms = 'Unknown';
        results.ssl = 'Unknown';
      }

      // Cache result
      db.prepare("INSERT OR REPLACE INTO lookup_cache (domain, data, timestamp) VALUES (?, ?, CURRENT_TIMESTAMP)").run(cleanDomain, JSON.stringify(results));

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to lookup domain" });
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      const feed = await parser.parseURL("https://webseotrends.com/feed/");
      res.json(feed.items.slice(0, 6));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
