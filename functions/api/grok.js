export async function onRequest(context) {
  const req = context.request;
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  let data = {};
  try { data = await req.json(); } catch(e) {}
  const key = (data.key || '').trim();
  if (!key) {
    return new Response(JSON.stringify({ error: 'Missing API key' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
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
    return new Response(JSON.stringify(json), {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
