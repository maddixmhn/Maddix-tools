#!/usr/bin/env python3
"""Maddix Tools static server (no Node.js required).

Run:
    python server.py
Then open http://localhost:3000
"""
import http.server
import socketserver
import mimetypes
import os
import json
import urllib.request
import urllib.error

PORT = int(os.environ.get("PORT", "3000"))
ROOT = os.path.dirname(os.path.abspath(__file__))
GROK_URL = "https://api.x.ai/v1/chat/completions"

mimetypes.add_type("text/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/svg+xml", ".svg")


def grok_proxy(data):
    key = (data.get("key") or "").strip()
    if not key:
        raise ValueError("Missing API key")
    body = json.dumps({
        "model": data.get("model") or "grok-4.5",
        "messages": data.get("messages") or [],
        "stream": False,
        "temperature": 0.7,
        "max_tokens": 1200,
    }).encode("utf-8")
    req = urllib.request.Request(
        GROK_URL,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + key,
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return resp.status, json.loads(resp.read().decode("utf-8"))


def ai_router_proxy(data):
    url = (data.get("url") or "").strip()
    if not url.lower().startswith("https://"):
        raise ValueError("Invalid upstream URL")
    payload = data.get("body")
    if not isinstance(payload, str):
        payload = json.dumps(data.get("body") or {})
    body = payload.encode("utf-8")
    headers = data.get("headers") or {}
    headers["Content-Length"] = str(len(body))
    req = urllib.request.Request(url, data=body, headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=120) as resp:
        raw = resp.read().decode("utf-8")
        try:
            return resp.status, json.loads(raw)
        except Exception:
            return resp.status, {"raw": raw}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def do_POST(self):
        if self.path.split("?")[0] == "/api/grok":
            length = int(self.headers.get("Content-Length") or 0)
            raw = self.rfile.read(length) if length else b"{}"
            try:
                data = json.loads(raw.decode("utf-8") or "{}")
                status, payload = grok_proxy(data)
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(payload).encode("utf-8"))
            except Exception as e:
                self.send_response(502)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return
        if self.path.split("?")[0] == "/api/ai-router":
            length = int(self.headers.get("Content-Length") or 0)
            raw = self.rfile.read(length) if length else b"{}"
            try:
                data = json.loads(raw.decode("utf-8") or "{}")
                status, payload = ai_router_proxy(data)
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(payload).encode("utf-8"))
            except Exception as e:
                self.send_response(502)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return
        self.send_response(404)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"404 Not Found")


class ThreadedServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    with ThreadedServer(("", PORT), Handler) as httpd:
        print(f"Maddix Tools running at http://localhost:{PORT}")
        print("AI Assistant proxy at /api/grok")
        httpd.serve_forever()
