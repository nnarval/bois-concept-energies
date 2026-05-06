import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const host = '127.0.0.1';
const preferredPort = Number(process.env.PORT || 5177);

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/babel; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webp': 'image/webp',
};

function send(res, status, body, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'content-type': contentType });
  res.end(body);
}

function getFilePath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://${host}`).pathname);
  const cleanPath = normalize(pathname).replace(/^([/\\])+/, '');
  const fullPath = resolve(join(root, cleanPath || 'ui_kits/website/index.html'));
  if (fullPath !== root && !fullPath.startsWith(root + sep)) return null;
  return fullPath;
}

const server = createServer((req, res) => {
  const fullPath = getFilePath(req.url || '/');
  if (!fullPath) return send(res, 403, 'Forbidden');

  let filePath = fullPath;
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    return send(res, 404, 'Not found');
  }

  res.writeHead(200, {
    'content-type': types[extname(filePath).toLowerCase()] || 'application/octet-stream',
    'cache-control': 'no-store',
  });
  createReadStream(filePath).pipe(res);
});

server.on('error', (error) => {
  console.error(error.message);
  process.exit(1);
});

server.listen(preferredPort, host, () => {
  console.log(`Foyer & Flamme is available at http://${host}:${preferredPort}/ui_kits/website/index.html`);
});
