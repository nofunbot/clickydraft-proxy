export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing `url` query param' });
  }

  try {
    console.log(`Fetching: ${targetUrl}`);

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': '*/*'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || 'text/plain';
    const body = await response.text();

    res.setHeader('Content-Type', contentType);
    res.status(200).send(body);
  } catch (error) {
    console.error(`Proxy error for ${targetUrl}:`, error);
    res.status(500).json({
      error: 'fetch failed',
      details: error.mes
