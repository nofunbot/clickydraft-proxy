const https = require('https');

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing `url` query param" });
  }

  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/json,application/xhtml+xml",
      },
      agent,
    });

    const contentType = response.headers.get("content-type") || "text/plain";
    const body = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    res.setHeader("Content-Type", contentType);
    res.status(response.status).send(body);
  } catch (err) {
    res.status(500).json({ error: "fetch failed", details: err.message });
  }
}
