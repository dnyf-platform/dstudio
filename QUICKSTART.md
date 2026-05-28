# 🚀 DStudio - Quick Start Guide

## 5-Minute Setup

### Step 1: Prerequisites Check (30 seconds)
```bash
# Check if Node.js is installed
node --version    # Should be v14 or higher
npm --version     # Should be v6 or higher
```

**Don't have Node.js?** Download from [nodejs.org](https://nodejs.org)

### Step 2: Get DStudio (1 minute)
```bash
# Option A: Clone from GitHub
git clone https://github.com/yourusername/dstudio.git
cd dstudio

# Option B: Download ZIP
# Visit GitHub → Code → Download ZIP
# Extract and navigate to folder
```

### Step 3: Install & Run (2 minutes)
```bash
# Install dependencies
npm install

# Start the server
npm start

# 🎉 Done! Open http://localhost:3000 in your browser
```

### Step 4: Create Your First Project (1 minute)
1. Open http://localhost:3000
2. Click "New Project"
3. Edit the code and see it update in real-time!

---

## First Project: Build a Simple Portfolio

### 1. Create Project
- Click "New Project" on dashboard
- Editor opens automatically

### 2. Edit HTML
Click on `index.html` tab and replace content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <h1>My Portfolio</h1>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <section id="home" class="hero">
        <h2>Welcome to My Portfolio</h2>
        <p>I create beautiful websites</p>
        <button onclick="greet()">Get Started</button>
    </section>

    <section id="projects" class="projects">
        <h2>My Projects</h2>
        <div class="project-card">
            <h3>Project 1</h3>
            <p>Description of project</p>
        </div>
    </section>

    <footer id="contact">
        <p>&copy; 2024 My Portfolio. All rights reserved.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

### 3. Edit CSS
Click on `style.css` tab and replace content:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
}

.navbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
}

.navbar ul {
    list-style: none;
    display: flex;
    gap: 2rem;
}

.navbar a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

.navbar a:hover {
    opacity: 0.8;
}

.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 10rem 2rem;
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.hero h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.3rem;
    margin-bottom: 2rem;
}

.hero button {
    padding: 1rem 2rem;
    font-size: 1rem;
    background: white;
    color: #667eea;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.3s, box-shadow 0.3s;
}

.hero button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.projects {
    padding: 5rem 2rem;
    background: #f4f4f4;
}

.projects h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2rem;
}

.project-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
}

.project-card h3 {
    color: #667eea;
    margin-bottom: 1rem;
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 3rem;
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 1rem;
    }

    .navbar ul {
        flex-direction: column;
        gap: 0.5rem;
    }

    .hero h2 {
        font-size: 2rem;
    }

    .projects h2 {
        font-size: 1.5rem;
    }
}
```

### 4. Edit JavaScript
Click on `script.js` tab and replace content:

```javascript
// Simple greeting function
function greet() {
    const name = prompt('What is your name?');
    if (name) {
        alert(`Hello ${name}! Welcome to my portfolio!`);
    }
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Log when page loads
window.addEventListener('load', () => {
    console.log('✨ Welcome to my portfolio!');
});
```

### 5. Preview Your Work
1. Click **"Show Preview"** button
2. Click **"Run"** to execute your code
3. See your portfolio come to life!

---

## Tips for Success

### 💡 Best Practices
- **Save Often**: Click Save button or press Ctrl+S
- **Test Frequently**: Preview as you code
- **Keep it Simple**: Start small, add features gradually
- **Use Comments**: Explain your code for future reference

### 🎯 Common Mistakes to Avoid
- ❌ Forgetting to save changes
- ❌ Mixing file types in wrong files
- ❌ Not testing on mobile devices
- ❌ Using relative paths for images
- ❌ Heavy JavaScript blocking rendering

### ✅ Quick Checklist
- [ ] All files saved
- [ ] Preview looks correct
- [ ] No console errors (F12)
- [ ] Mobile responsive
- [ ] Links work properly
- [ ] Images load correctly

---

## Common Commands

### File Operations
```javascript
// Create new file structure
const newProject = {
    files: [
        { name: 'index.html', type: 'html', content: '' },
        { name: 'style.css', type: 'css', content: '' },
        { name: 'script.js', type: 'javascript', content: '' }
    ]
};

// Access file content
const htmlFile = files.find(f => f.type === 'html');
console.log(htmlFile.content);
```

### JavaScript Debugging
```javascript
// Useful debugging techniques
console.log('Value:', variable);           // Log values
console.table(arrayOfObjects);             // Table view
console.time('label');                     // Start timer
console.timeEnd('label');                  // End timer
console.error('Error message');            // Log errors
console.warn('Warning message');           // Log warnings

// Breakpoints
debugger; // Execution pauses here
```

---

## Getting Help

### Documentation
- **Full Docs**: Open README.md
- **Features Guide**: Open FEATURES.md
- **Contributing**: Open CONTRIBUTING.md

### Online Resources
- **HTML/CSS/JS**: [MDN Web Docs](https://developer.mozilla.org)
- **Tutorials**: [W3Schools](https://www.w3schools.com)
- **Best Practices**: [CSS-Tricks](https://css-tricks.com)

### Support
- 🐛 **Report Bug**: Open GitHub Issue
- 💬 **Ask Question**: Start Discussion
- 📧 **Email**: support@dstudio.app

---

## Next Steps

### Learn & Build
1. ✅ Complete this quick start
2. 📚 Read FEATURES.md for advanced options
3. 🎨 Build your own projects
4. 📤 Export and share your work

### Explore Features
- [ ] Multi-file projects
- [ ] Project export
- [ ] Browser DevTools integration
- [ ] Mobile preview

### Advanced Topics
- [ ] Responsive design
- [ ] CSS Grid & Flexbox
- [ ] JavaScript frameworks
- [ ] API integration

---

## Project Ideas

### Beginner Level
1. **Personal Card** - Name, photo, links
2. **Simple Blog** - Blog post layout
3. **Coming Soon** - Landing page
4. **To-Do List** - JavaScript interaction

### Intermediate Level
1. **Portfolio Website** - Multi-page layout
2. **Calculator App** - Math operations
3. **Weather Widget** - API integration
4. **Photo Gallery** - Image showcase

### Advanced Level
1. **Social Network** - Complex interactions
2. **Project Management** - Task management
3. **E-commerce Site** - Product listing
4. **Real-time Chat** - WebSocket support

---

## Keyboard Shortcuts Cheatsheet

### Essential
| Key | Action |
|-----|--------|
| `Ctrl+S` | Save |
| `Ctrl+/` | Comment |
| `Tab` | Indent |
| `Shift+Tab` | Unindent |

### Navigation
| Key | Action |
|-----|--------|
| `Ctrl+Tab` | Next Tab |
| `Ctrl+Shift+Tab` | Previous Tab |
| `Ctrl+Home` | Start of File |
| `Ctrl+End` | End of File |

### Editing
| Key | Action |
|-----|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+X` | Cut |
| `Ctrl+C` | Copy |
| `Ctrl+V` | Paste |

---

## Troubleshooting Quick Fix

### Server won't start?
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try different port
PORT=8000 npm start
```

### Code not updating?
```javascript
// Hard refresh browser
Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

// Or click Run button again
// JavaScript changes might need manual refresh
```

### Files disappeared?
```javascript
// DStudio saves to browser storage
// Check browser storage:
// Settings → Storage → Local Storage
// or access: localStorage
```

---

## System Requirements

### Minimum
- **Processor**: Dual-core 1.5GHz
- **RAM**: 2GB
- **Storage**: 100MB
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+

### Recommended
- **Processor**: Quad-core 2.5GHz
- **RAM**: 8GB
- **Storage**: 500MB SSD
- **Browser**: Latest Chrome, Firefox, or Safari

---

## What's Next?

You've completed the quick start! Now:

1. **Explore** the dashboard - Create multiple projects
2. **Experiment** with code - Try different features
3. **Learn** JavaScript - Build interactive projects
4. **Share** your work - Export and show friends
5. **Contribute** - Help improve DStudio!

---

## Quick Links

- 🏠 [Dashboard](http://localhost:3000)
- 📖 [Full README](README.md)
- ⭐ [Features Guide](FEATURES.md)
- 🤝 [Contributing Guide](CONTRIBUTING.md)
- 📜 [License](LICENSE)

---

**Happy Coding! 🎉**

Got stuck? Check the troubleshooting section or reach out to support@dstudio.app

Version: 1.0.0 | Last Updated: January 2024
