export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing `url` query param" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://clickydraft.com/',
        'Origin': 'https://clickydraft.com',
      },
    });

    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType || "application/json");

    const body = await response.text();
    res.status(response.status).send(body);
  } catch (error) {
    console.error("Proxy fetch error:", error);
    res.status(500).json({
      error: "fetch failed",
      details: error.message || String(error),
    });
  }
}
