export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'Missing `url` query param' });
    }

    console.log("Fetching:", url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': '*/*'
      }
    });

    const contentType = response.headers.get('content-type') || 'text/plain';
    const text = await response.text();

    res.setHeader('Content-Type', contentType);
    res.status(200).send(text);
  } catch (err) {
    console.error('Error during fetch:', err);
    res.status(500).json({
      error: 'fetch failed',
      details: err.message || String(err)
    });
  }
}
