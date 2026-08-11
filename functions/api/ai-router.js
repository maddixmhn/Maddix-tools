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
  const url = (data.url || '').trim();
  if (!/^https:\/\//i.test(url)) {
    return new Response(JSON.stringify({ error: 'Invalid upstream URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
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
