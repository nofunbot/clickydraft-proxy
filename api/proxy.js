const https = require('https');

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing `url` query param" });
  }

  try {
    const agent = new https.Agent({
      rejectUnauthorized: false, // ignore SSL errors
    });

    const response = await fetch(targetUrl, {
      method: 'GET',
      agent,
    });

    const data = await response.text(); // Some responses might not be JSON

    res.setHeader("Content-Type", response.headers.get("content-type") || "text/plain");
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: "fetch failed", details: err.message });
  }
}
