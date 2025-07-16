export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing `url` query param" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0', // Helps avoid some bot blocks
      }
    });

    const contentType = response.headers.get('content-type') || 'text/plain';
    const data = await response.text();

    res.setHeader('Content-Type', contentType);
    return res.status(response.status).send(data);

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'fetch failed', details: err.message });
  }
}
