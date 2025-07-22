export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing `url` query param" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ClickyDraftProxy/1.0'
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
      details: error.message,
    });
  }
}
