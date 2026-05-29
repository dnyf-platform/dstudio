#!/bin/bash

# DStudio GitHub Pages Complete Setup Script
# This script will set up everything needed to deploy DStudio

set -e  # Exit on error

echo "🚀 Starting DStudio GitHub Pages Setup..."
echo ""

# Get the dstudio directory
DSTUDIO_DIR="$HOME/dstudio"

# Create directory if it doesn't exist
if [ ! -d "$DSTUDIO_DIR" ]; then
    echo "📁 Creating dstudio directory..."
    mkdir -p "$DSTUDIO_DIR"
fi

cd "$DSTUDIO_DIR"
echo "📍 Working in: $(pwd)"
echo ""

# Step 1: Create clean package.json
echo "📝 Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "dstudio",
  "version": "1.0.0",
  "description": "DStudio - Professional Code Editor & Development Environment",
  "homepage": "https://dnyf-platform.github.io/dstudio",
  "scripts": {
    "start": "node server.js",
    "deploy": "gh-pages -d .",
    "build": "echo 'DStudio is ready'"
  },
  "devDependencies": {
    "gh-pages": "^5.0.0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
EOF
echo "✅ package.json created"
echo ""

# Step 2: Create manifest.json
echo "📝 Creating manifest.json..."
cat > manifest.json << 'EOF'
{
  "name": "DStudio - Code Editor & Development Environment",
  "short_name": "DStudio",
  "description": "Professional code editor for building web projects",
  "start_url": "/dstudio",
  "scope": "/dstudio",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#0a0e27",
  "icons": [
    {
      "src": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'%3E%3Crect fill='%23667eea' width='192' height='192'/%3E%3Ctext x='96' y='96' dominant-baseline='middle' text-anchor='middle' font-size='120' font-weight='bold' fill='white' font-family='Arial'%3ED%3C/text%3E%3C/svg%3E",
      "sizes": "192x192",
      "type": "image/svg+xml"
    }
  ]
}
EOF
echo "✅ manifest.json created"
echo ""

# Step 3: Create GitHub Pages config files
echo "📝 Creating GitHub Pages configuration..."
cat > _config.yml << 'EOF'
exclude: [node_modules, package-lock.json]
include: [".nojekyll"]
EOF

touch .nojekyll
echo "✅ GitHub Pages config created"
echo ""

# Step 4: Update .gitignore
echo "📝 Updating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment
.env
.env.local

# Build
dist/
build/

# GitHub Pages
gh-pages/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp
EOF
echo "✅ .gitignore created"
echo ""

# Step 5: Create server.js
echo "📝 Creating server.js..."
cat > server.js << 'EOF'
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else {
      const mimeType = ext === '.html' ? 'text/html' : 'text/plain';
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 DStudio running at http://localhost:${PORT}`);
});
EOF
echo "✅ server.js created"
echo ""

# Step 6: Create .github/workflows/deploy.yml
echo "📝 Creating GitHub Actions workflow..."
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install --legacy-peer-deps
      
      - name: Deploy to GitHub Pages
        run: npm run deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
EOF
echo "✅ GitHub Actions workflow created"
echo ""

# Step 7: Create LICENSE
echo "📝 Creating LICENSE..."
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2024 DStudio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
EOF
echo "✅ LICENSE created"
echo ""

# Step 8: Check if index.html exists, if not create a simple one
if [ ! -f "index.html" ]; then
    echo "📝 Creating index.html..."
    # Create a simple placeholder that will be replaced
    echo "<!-- index.html will be created in next step -->" > index.html
    echo "✅ index.html placeholder created"
else
    echo "✅ index.html already exists"
fi
echo ""

# Step 9: Install dependencies
echo "📦 Installing dependencies..."
npm cache clean --force 2>/dev/null || true
npm install --legacy-peer-deps
echo "✅ Dependencies installed"
echo ""

# Step 10: Check git status
echo "📋 Checking git status..."
git status
echo ""

# Step 11: Commit changes
echo "📝 Committing changes to git..."
git add .
git commit -m "Setup DStudio with GitHub Pages deployment" || echo "No changes to commit or already committed"
echo ""

# Step 12: Push to main
echo "🚀 Pushing to main branch..."
git push origin main
echo "✅ Pushed to GitHub"
echo ""

# Step 13: Install gh-pages if not already installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
fi
echo ""

# Step 14: Deploy
echo "🚀 Deploying to GitHub Pages..."
npm run deploy
echo ""

echo "════════════════════════════════════════════════"
echo "✅ DStudio Setup Complete!"
echo "════════════════════════════════════════════════"
echo ""
echo "🌐 Your app is live at:"
echo "   https://dnyf-platform.github.io/dstudio"
echo ""
echo "📁 GitHub Repository:"
echo "   https://github.com/dnyf-platform/dstudio"
echo ""
echo "⚙️ GitHub Pages Settings:"
echo "   https://github.com/dnyf-platform/dstudio/settings/pages"
echo ""
echo "🤖 Check Deployment:"
echo "   https://github.com/dnyf-platform/dstudio/actions"
echo ""
echo "Wait 1-2 minutes for GitHub Pages to build, then visit the URL above!"
echo ""
