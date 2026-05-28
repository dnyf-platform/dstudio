import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.jsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();

  // Prevent directory traversal
  const realPath = path.resolve(filePath);
  if (!realPath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Serve static files
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file not found, serve index.html for SPA routing
      if (err.code === 'ENOENT' && req.url !== '/manifest.json') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
          }
          res.writeHead(200, { 
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache'
          });
          res.end(data);
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
      return;
    }

    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
    const cacheControl = ext === '.html' ? 'no-cache' : 'public, max-age=3600';

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Cache-Control': cacheControl,
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║          🚀 DStudio - Code Editor & IDE Started 🚀        ║
║                                                            ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  📍 Server Running at: http://localhost:${PORT}                  ║
║  🌐 Open your browser and navigate to: http://localhost:${PORT} ║
║                                                            ║
║  Features:                                                 ║
║  ✓ Live Code Editor (HTML, CSS, JavaScript)              ║
║  ✓ Real-time Preview                                     ║
║  ✓ Project Management                                    ║
║  ✓ Built-in Console                                      ║
║  ✓ File Explorer                                         ║
║                                                            ║
║  Commands:                                                ║
║  • Press Ctrl+C to stop the server                       ║
║  • Refresh browser for live updates                      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

process.on('SIGTERM', () => {
  console.log('\n✋ Server shutting down...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n✋ Server interrupted...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
