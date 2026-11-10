from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import webbrowser

PORT = 8000
os.chdir(Path(__file__).parent)

url = f"http://localhost:{PORT}"
print(f"Web musik berjalan di {url}")
print("Tekan Ctrl+C untuk menghentikan server.")

try:
    webbrowser.open(url)
except Exception:
    pass

ThreadingHTTPServer(("127.0.0.1", PORT), SimpleHTTPRequestHandler).serve_forever()
