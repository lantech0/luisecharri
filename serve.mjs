import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 3000;
const ROOT = path.join(process.cwd(), 'public');
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.svg':'image/svg+xml', '.xml':'application/xml', '.txt':'text/plain', '.pdf':'application/pdf' };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  if (!path.extname(p)) p += '.html';
  const file = path.normalize(path.join(ROOT, p));
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
