export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  let data = {};
  try { data = req.body || {}; } catch(e) {}
  const url = (data.url || '').trim();
  if (!/^https:\/\//i.test(url)) {
    res.status(400).json({ error: 'Invalid upstream URL' });
    return;
  }
  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: data.headers || {},
      body: typeof data.body === 'string' ? data.body : JSON.stringify(data.body || {}),
    });
    const text = await upstream.text();
    let json;
    try { json = JSON.parse(text); } catch(e) { json = { raw: text }; }
    res.status(upstream.status).json(json);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
