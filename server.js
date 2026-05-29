import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.jsx': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=UTF-8',
  '.md': 'text/markdown; charset=UTF-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (
        net.family === 'IPv4' &&
        !net.internal
      ) {
        return net.address;
      }
    }
  }

  return '127.0.0.1';
}

function sendResponse(
  res,
  statusCode,
  content,
  contentType = 'text/plain'
) {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':
      'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-cache'
  });

  res.end(content);
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath);

  const cleanPath =
    decoded === '/'
      ? '/index.html'
      : decoded;

  return path.normalize(
    path.join(__dirname, cleanPath)
  );
}

const server = http.createServer(
  (req, res) => {
    try {
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url}`
      );

      // Handle CORS preflight
      if (req.method === 'OPTIONS') {
        res.writeHead(204, {
          'Access-Control-Allow-Origin':
            '*',
          'Access-Control-Allow-Methods':
            'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers':
            'Content-Type'
        });

        return res.end();
      }

      // Reject invalid methods
      const allowedMethods = [
        'GET',
        'HEAD'
      ];

      if (
        !allowedMethods.includes(req.method)
      ) {
        return sendResponse(
          res,
          405,
          'Method Not Allowed'
        );
      }

      let filePath = safePath(req.url);

      // Prevent directory traversal
      if (
        !filePath.startsWith(__dirname)
      ) {
        return sendResponse(
          res,
          403,
          '403 Forbidden'
        );
      }

      // Auto fallback to index.html
      if (
        !path.extname(filePath)
      ) {
        filePath = path.join(
          filePath,
          'index.html'
        );
      }

      fs.stat(filePath, (err, stats) => {
        if (
          err ||
          !stats.isFile()
        ) {
          // SPA fallback
          const fallbackPath =
            path.join(
              __dirname,
              'index.html'
            );

          return fs.readFile(
            fallbackPath,
            (fallbackErr, fallbackData) => {
              if (fallbackErr) {
                console.error(
                  'Fallback Error:',
                  fallbackErr
                );

                return sendResponse(
                  res,
                  500,
                  '500 Internal Server Error'
                );
              }

              return sendResponse(
                res,
                200,
                fallbackData,
                'text/html; charset=UTF-8'
              );
            }
          );
        }

        fs.readFile(
          filePath,
          (readErr, data) => {
            if (readErr) {
              console.error(
                'Read Error:',
                readErr
              );

              return sendResponse(
                res,
                500,
                '500 Internal Server Error'
              );
            }

            const ext =
              path.extname(filePath)
                .toLowerCase();

            const mimeType =
              MIME_TYPES[ext] ||
              'application/octet-stream';

            const cacheControl =
              ext === '.html'
                ? 'no-cache'
                : 'public, max-age=3600';

            res.writeHead(200, {
              'Content-Type':
                mimeType,
              'Cache-Control':
                cacheControl,
              'Access-Control-Allow-Origin':
                '*',
              'X-Content-Type-Options':
                'nosniff'
            });

            if (
              req.method === 'HEAD'
            ) {
              return res.end();
            }

            res.end(data);
          }
        );
      });
    } catch (error) {
      console.error(
        'Fatal Server Error:',
        error
      );

      return sendResponse(
        res,
        500,
        '500 Internal Server Error'
      );
    }
  }
);

server.listen(PORT, HOST, () => {
  const localIP = getLocalIP();

  console.clear();

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║     ██████╗ ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗                  ║
║     ██╔══██╗██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗                 ║
║     ██║  ██║███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║                 ║
║     ██║  ██║╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║                 ║
║     ██████╔╝███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝                 ║
║     ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝                  ║
║                                                                              ║
║                ⚡ ADVANCED WEB DEVELOPMENT ENVIRONMENT ⚡                    ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   🌐 LOCAL ACCESS                                                            ║
║   ├── http://localhost:${PORT}
║   └── http://127.0.0.1:${PORT}
║                                                                              ║
║   📡 NETWORK ACCESS                                                          ║
║   └── http://${localIP}:${PORT}
║                                                                              ║
║   🧠 SERVER ENGINE                                                           ║
║   ├── Runtime        : Node.js                                               ║
║   ├── Architecture   : SPA Static Engine                                     ║
║   ├── Status         : ONLINE                                                ║
║   ├── Security       : Path Shield Active                                    ║
║   ├── CORS           : Enabled                                               ║
║   └── Cache Layer    : Optimized                                             ║
║                                                                              ║
║   🚀 CORE FEATURES                                                           ║
║   ├── Live HTML/CSS/JS Execution                                             ║
║   ├── Real-Time Preview Sandbox                                              ║
║   ├── File Explorer System                                                   ║
║   ├── Smart MIME Detection                                                   ║
║   ├── Mobile Device Compatible                                               ║
║   ├── Error Recovery Pipeline                                                ║
║   └── Production Ready Routing                                               ║
║                                                                              ║
║   ⚙️  COMMANDS                                                               ║
║   ├── Ctrl + C    → Stop Server                                              ║
║   ├── Refresh UI  → Reload Workspace                                         ║
║   └── Edit Files  → Auto Deploy Preview                                      ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

        ██████╗ ███████╗██╗   ██╗
        ██╔══██╗██╔════╝██║   ██║
        ██║  ██║█████╗  ██║   ██║
        ██║  ██║██╔══╝  ╚██╗ ██╔╝
        ██████╔╝███████╗ ╚████╔╝
        ╚═════╝ ╚══════╝  ╚═══╝

              ⚡ DStudio Engine Ready ⚡

`);
});

function shutdown(signal) {
  console.log(
    `\n⚠️ ${signal} received. Shutting down...`
  );

  server.close(() => {
    console.log(
      '✅ DStudio server stopped cleanly.'
    );

    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      '❌ Force shutdown.'
    );

    process.exit(1);
  }, 5000);
}

process.on('SIGINT', () =>
  shutdown('SIGINT')
);

process.on('SIGTERM', () =>
  shutdown('SIGTERM')
);

process.on(
  'uncaughtException',
  (err) => {
    console.error(
      '❌ Uncaught Exception:',
      err
    );
  }
);

process.on(
  'unhandledRejection',
  (reason) => {
    console.error(
      '❌ Unhandled Rejection:',
      reason
    );
  }
);
