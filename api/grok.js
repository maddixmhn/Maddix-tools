export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  let data = {};
  try { data = req.body || {}; } catch(e) {}
  const key = (data.key || '').trim();
  if (!key) {
    res.status(400).json({ error: 'Missing API key' });
    return;
  }
  try {
    const upstream = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key,
      },
      body: JSON.stringify({
        model: data.model || 'grok-4.5',
        messages: data.messages || [],
        stream: false,
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });
    const json = await upstream.json();
    res.status(upstream.status).json(json);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
