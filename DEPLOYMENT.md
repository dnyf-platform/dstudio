# DStudio - Deployment & Hosting Guide

## 🚀 Deployment Options

DStudio can be deployed to various hosting platforms. Choose based on your needs and budget.

---

## Option 1: Vercel (Recommended for Beginners)

### Pros
- ✅ Free tier available
- ✅ Easy Git integration
- ✅ Automatic deployments
- ✅ Great performance
- ✅ Custom domains
- ✅ HTTPS included

### Cons
- Limited serverless functions (free tier)

### Steps

#### 1. Push to GitHub
```bash
# Create GitHub repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/dstudio.git
git push -u origin main
```

#### 2. Deploy to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework**: Node.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `./`
5. Click "Deploy"

#### 3. Custom Domain (Optional)
1. Go to Project Settings
2. Domains tab
3. Add your domain
4. Follow DNS instructions

#### Vercel Environment Setup
```bash
# Create vercel.json
{
  "name": "dstudio",
  "version": 2,
  "public": true,
  "env": {
    "NODE_ENV": {
      "default": "production"
    }
  },
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/.*",
      "dest": "/"
    }
  ]
}
```

---

## Option 2: Netlify

### Pros
- ✅ Free tier with generous limits
- ✅ Amazing UX
- ✅ Built-in CI/CD
- ✅ Form handling
- ✅ Serverless functions
- ✅ Branch deployments

### Cons
- Function pricing can add up

### Steps

#### 1. Connect GitHub
1. Visit [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Authorize GitHub
4. Select repository

#### 2. Configure Build
- **Build Command**: `npm run build`
- **Publish Directory**: `./`
- **Node Version**: 18.x

#### 3. Deploy
- Click "Deploy"
- Wait for build completion
- Get your live URL

#### Netlify Configuration
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "/"
  
[context.production]
  command = "npm run build"

[context.develop]
  command = "npm start"

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"

[[redirects]]
  from = "/*"
  to = "/"
  status = 200
```

---

## Option 3: GitHub Pages

### Pros
- ✅ Completely free
- ✅ Easy setup
- ✅ Custom domain support
- ✅ Built-in HTTPS

### Cons
- ❌ No server-side rendering
- ❌ Static sites only
- ❌ Limited backend support

### Steps

#### 1. Update package.json
```json
{
  "homepage": "https://YOUR-USERNAME.github.io/dstudio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d ."
  },
  "devDependencies": {
    "gh-pages": "^5.0.0"
  }
}
```

#### 2. Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### 3. Deploy
```bash
npm run deploy
```

#### 4. Enable GitHub Pages
1. Go to Settings → Pages
2. Select "Deploy from a branch"
3. Select `gh-pages` branch
4. Save

---

## Option 4: Docker Deployment

### Pros
- ✅ Consistent environment
- ✅ Easy scaling
- ✅ Works anywhere
- ✅ Production-ready

### Cons
- ❌ More complex setup
- ❌ Requires Docker knowledge

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  dstudio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    volumes:
      - ./data:/app/data
```

### Build and Run
```bash
# Build image
docker build -t dstudio:latest .

# Run container
docker run -p 3000:3000 dstudio:latest

# Using docker-compose
docker-compose up -d
```

---

## Option 5: AWS (Advanced)

### Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize application
eb init -p node.js-18 dstudio

# Create environment
eb create dstudio-env

# Deploy
eb deploy

# Open in browser
eb open
```

### Lambda + API Gateway
```javascript
// handler.js
exports.handler = async (event) => {
  if (event.path === '/') {
    return {
      statusCode: 200,
      headers: {'Content-Type': 'text/html'},
      body: fs.readFileSync('index.html', 'utf-8')
    };
  }
  return { statusCode: 404 };
};
```

---

## Option 6: DigitalOcean App Platform

### Pros
- ✅ Easy deployment
- ✅ Competitive pricing
- ✅ Good performance
- ✅ Global CDN
- ✅ One-click deployments

### Steps

#### 1. Create App
1. Visit [digitalocean.com](https://digitalocean.com)
2. Create new app
3. Connect GitHub repository
4. Select branch to deploy

#### 2. Configure
```yaml
name: dstudio
services:
- name: api
  github:
    repo: YOUR-USERNAME/dstudio
    branch: main
  build_command: npm install
  run_command: npm start
  http_port: 3000
```

#### 3. Deploy
1. Configure environment variables
2. Click "Deploy"
3. Monitor deployment logs

---

## Option 7: Heroku (Deprecated Alternative)

> **Note**: Heroku free tier ended in November 2022. Consider other options.

### Alternative: Heroku Paid Plan
```bash
# Login to Heroku
heroku login

# Create app
heroku create dstudio-app

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

## Performance Optimization for Production

### 1. Enable Gzip Compression
```javascript
// server.js
const compression = require('compression');
app.use(compression());
```

### 2. Set Cache Headers
```javascript
// server.js
app.use((req, res, next) => {
  if (req.path.endsWith('.html')) {
    res.set('Cache-Control', 'no-cache');
  } else {
    res.set('Cache-Control', 'public, max-age=31536000');
  }
  next();
});
```

### 3. Minify Assets
```bash
# Install minify tools
npm install -D terser cssnano

# Minify JavaScript
terser input.js -o input.min.js

# Minify CSS
cssnano input.css -o input.min.css
```

### 4. Use CDN
```html
<!-- Serve static files from CDN -->
<script src="https://cdn.example.com/dstudio.js"></script>
<link rel="stylesheet" href="https://cdn.example.com/dstudio.css">
```

### 5. Enable HTTP/2
Most modern hosting providers support HTTP/2. Check your provider's settings.

---

## SSL/HTTPS Setup

### Self-Signed Certificate (Development)
```bash
# Generate certificate
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# Use in server
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(443);
```

### Production Certificate
- Use Let's Encrypt (free)
- Use Certbot for automatic renewal
- Most hosting providers include HTTPS

---

## Environment Variables

### Create .env file
```bash
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://dstudio.app
DEBUG=false
```

### Load in application
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
```

### Never commit .env
```bash
# .gitignore
.env
.env.local
.env.*.local
```

---

## Database Setup (Future Feature)

### MongoDB Connection
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### PostgreSQL Connection
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

---

## Monitoring & Logging

### PM2 Process Manager
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name "dstudio"

# Monitor
pm2 monit

# Logs
pm2 logs dstudio
```

### Application Monitoring
```javascript
// Monitor errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Send to monitoring service
});

// Monitor performance
const monitoring = setInterval(() => {
  const usage = process.memoryUsage();
  console.log('Memory:', usage.heapUsed / 1024 / 1024, 'MB');
}, 60000);
```

---

## Security Best Practices

### 1. Security Headers
```javascript
const helmet = require('helmet');
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

### 2. CORS Configuration
```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));
```

### 3. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
```

### 4. Input Validation
```javascript
const validator = require('validator');

app.post('/api/save', (req, res) => {
  if (!validator.isLength(req.body.filename, { min: 1, max: 255 })) {
    return res.status(400).json({ error: 'Invalid filename' });
  }
  // Process valid input
});
```

---

## Backup & Recovery

### Backup Strategy
```bash
# Regular backups
0 2 * * * /usr/bin/mysqldump -u user -p password database > /backup/db-$(date +%Y%m%d).sql

# GitHub backup (auto)
# Set up automatic commits

# Cloud backup
# Use S3, Azure Blob, or Google Cloud Storage
```

### Disaster Recovery
1. **Automated Backups**: Daily backups
2. **Git History**: Version control backup
3. **Database Snapshots**: Regular database backups
4. **Redundancy**: Multi-region deployment

---

## Troubleshooting Deployment

### Common Issues

#### Build Fails
```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version
```

#### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

#### Deployment Size Too Large
```bash
# Check size
du -sh .

# Optimize
# - Remove node_modules (rebuild on deploy)
# - Remove build artifacts
# - Compress assets
# - Use .gitignore effectively
```

#### Memory Issues
```bash
# Increase Node heap
NODE_OPTIONS=--max-old-space-size=4096 npm start

# Monitor usage
top -p $(pgrep node)
```

---

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Deploy to Vercel
        run: npm run deploy
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## Scaling Considerations

### Horizontal Scaling
- Load balancer (nginx, HAProxy)
- Multiple app instances
- Shared database
- Session management

### Vertical Scaling
- Increase server resources
- Optimize code
- Cache aggressively
- Monitor bottlenecks

---

## Cost Estimation

| Platform | Free Tier | Paid Tier | Notes |
|----------|-----------|-----------|-------|
| Vercel | 100GB/month | $20+/month | Best for startups |
| Netlify | 100GB/month | $19+/month | Good performance |
| GitHub Pages | Unlimited | Free | Static only |
| DigitalOcean | - | $5/month | Great value |
| AWS | 12 months free | $1+/month | Complex pricing |
| Heroku | - | $7+/month | Discontinued free tier |

---

## Next Steps After Deployment

1. ✅ Set up monitoring
2. ✅ Configure backups
3. ✅ Enable analytics
4. ✅ Set up error tracking
5. ✅ Monitor performance
6. ✅ Plan scaling strategy

---

## Support & Resources

- 📚 [Vercel Docs](https://vercel.com/docs)
- 📚 [Netlify Docs](https://docs.netlify.com)
- 📚 [DigitalOcean Docs](https://docs.digitalocean.com)
- 🐛 [Report Issues](https://github.com/dstudio/issues)
- 💬 [Get Help](https://discord.gg/dstudio)

---

**Version**: 1.0.0 | Last Updated: January 2024
