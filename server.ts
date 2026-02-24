import express from "express";
import { createServer as createViteServer } from "vite";
import dns from "dns";
import axios from "axios";
import whois from "whois-json";
import RSSParser from "rss-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory cache for serverless environments
const cache = new Map<string, { data: any, timestamp: number }>();

export const app = express();
const parser = new RSSParser();

app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", environment: process.env.NODE_ENV });
});

app.get("/api/lookup", async (req, res) => {
    const domain = req.query.domain as string;
    if (!domain) return res.status(400).json({ error: "Domain is required" });

    // Clean domain
    let cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];

    // Check cache (1 hour)
    const cached = cache.get(cleanDomain);
    if (cached && Date.now() - cached.timestamp < 3600000) {
      return res.json(cached.data);
    }

    let results: any = null;
    try {
      results = { domain: cleanDomain };

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

      // 3. WHOIS with timeout
      try {
        const whoisPromise = whois(cleanDomain);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('WHOIS timeout')), 3000)
        );
        const whoisData = await Promise.race([whoisPromise, timeoutPromise]) as any;
        results.whois = whoisData && Object.keys(whoisData).length > 0 ? whoisData : null;
      } catch (e: any) {
        console.warn(`WHOIS lookup failed for ${cleanDomain}:`, e.message);
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
      cache.set(cleanDomain, { data: results, timestamp: Date.now() });

      res.json(results);
    } catch (error: any) {
      console.error(`Lookup error for ${cleanDomain}:`, error);
      res.status(500).json({ 
        error: "Failed to lookup domain", 
        details: error.message,
        phase: results ? "processing" : "initialization"
      });
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

async function startServer() {
  const PORT = 3000;

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

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  startServer();
}
