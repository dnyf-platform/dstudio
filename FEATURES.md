# DStudio - Complete Features Guide

## 📋 Table of Contents

1. [Dashboard](#dashboard)
2. [Code Editor](#code-editor)
3. [File Management](#file-management)
4. [Preview System](#preview-system)
5. [Project Management](#project-management)
6. [Advanced Features](#advanced-features)
7. [Keyboard Shortcuts](#keyboard-shortcuts)

---

## Dashboard

### Overview
The dashboard is your starting point for managing all your projects. It provides a visual, card-based interface for quick project access and creation.

### Features

#### Project Cards
- **Visual Display**: Each project shows as a card with:
  - Project icon
  - Project name
  - Project type
  - Creation date
  
- **Quick Access**: Click any project card to open it in the editor

#### New Project Creation
- Click the "New Project" button
- Automatically creates a blank HTML template
- Instantly opens in the editor
- All changes auto-save locally

#### Project Information
- **Type**: HTML/CSS/JS, Frontend, Backend
- **Created Date**: When the project was created
- **File Count**: Number of files in project
- **Last Modified**: Track project updates

### Dashboard Customization

Future versions will include:
- [ ] Project search and filtering
- [ ] Sort by date, name, or type
- [ ] Project templates
- [ ] Recent projects list
- [ ] Favorites/starred projects

---

## Code Editor

### Main Editor Features

#### Syntax-Aware Editing
- Full HTML, CSS, and JavaScript support
- Line numbers for easy navigation
- Word wrap for long lines
- Code folding for complex sections

#### Editing Capabilities
- **Auto-indent**: Automatic indentation on new lines
- **Comment Toggle**: Quickly comment/uncomment code
- **Multi-line Edit**: Edit multiple selections simultaneously
- **Find and Replace**: Search within file content

#### Performance
- Handles files up to 10MB
- Smooth scrolling with thousands of lines
- Efficient memory usage
- Fast rendering and updates

### Editor Settings

#### Font Customization
```javascript
// Editable in future versions
fontFamily: 'Monaco' | 'Menlo' | 'Ubuntu Mono'
fontSize: 12 | 14 | 16 | 18 // pixels
lineHeight: 1.4 | 1.5 | 1.6 | 1.8
```

#### Theme Options (Upcoming)
- Dark Theme (Default)
- Light Theme
- High Contrast
- Custom Color Schemes

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+A` | Select All |
| `Ctrl+C` | Copy |
| `Ctrl+V` | Paste |
| `Ctrl+X` | Cut |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+/` | Toggle Comment |
| `Ctrl+S` | Save |
| `Ctrl+F` | Find |
| `Ctrl+H` | Replace |
| `Tab` | Indent |
| `Shift+Tab` | Unindent |
| `Alt+Up` | Move Line Up |
| `Alt+Down` | Move Line Down |

---

## File Management

### Adding Files

#### Methods
1. **Click "+ Add File"** button in the tab bar
2. **Keyboard Shortcut**: `Ctrl+N` (future)
3. **Right-click** in file explorer (future)

#### File Types Supported
- `.html` - HTML files
- `.css` - CSS stylesheets
- `.js` - JavaScript files
- `.json` - JSON configuration files
- `.md` - Markdown documentation

#### Default Templates
When creating a new file, you can choose from:
- Empty file
- HTML template
- CSS boilerplate
- JavaScript scaffold

### File Operations

#### Renaming Files
1. Right-click file in explorer
2. Select "Rename"
3. Enter new name
4. Press Enter to confirm

#### Deleting Files
1. Click × button on file tab
2. Confirm deletion (prevents accidental loss)
3. File is immediately removed

#### Duplicating Files
1. Right-click file in explorer
2. Select "Duplicate"
3. New copy created with "_copy" suffix

### File Organization

#### File Explorer
- Hierarchical view of all project files
- Quick access to any file
- Visual file type indicators
- Drag-and-drop support (coming soon)

#### Folder Structure
```
Project/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
├── utils/
│   └── helpers.js
└── config.json
```

---

## Preview System

### Real-time Preview

#### How It Works
1. **Code Injection**: Your HTML, CSS, and JavaScript are combined
2. **Sandbox Isolation**: Code runs in a secure iframe
3. **Live Update**: Changes reflect in real-time
4. **Error Handling**: Displays errors in console

#### Supported Features
- ✅ HTML rendering
- ✅ CSS styling (external and inline)
- ✅ JavaScript execution
- ✅ DOM manipulation
- ✅ Event listeners
- ✅ Local storage access
- ✅ Canvas and Web APIs
- ❌ External API calls (requires CORS)
- ❌ Service workers (limited)

### Preview Controls

#### Toggle Preview
- Click "Show Preview" to display split-screen
- Click "Hide Preview" to maximize editor
- Responsive layout adapts to screen size

#### Refresh Preview
- Click "Run" to refresh preview
- Auto-refresh on save (future option)
- Manual refresh for complex updates

### Console Output

#### Features
- **Success Messages**: Green text for successful operations
- **Save Confirmations**: Track file saves
- **Error Messages**: Red text for errors
- **Custom Logging**: `console.log()` output
- **Warnings**: JavaScript warnings and notices

#### Console Methods
```javascript
console.log('message')      // Standard log
console.error('error')      // Error message
console.warn('warning')     // Warning message
console.info('info')        // Info message
console.clear()             // Clear console
```

---

## Project Management

### Project Types

#### HTML/CSS/JS Projects
- Standard web projects
- Full HTML, CSS, JavaScript support
- Perfect for learning and small sites
- Quick preview and testing

**Best for:**
- Personal portfolios
- Landing pages
- Small web applications
- Learning web development

#### Frontend Projects
- Structured for React/Vue/Angular
- Component-based organization
- npm package support (future)
- Build tool integration (future)

**Best for:**
- Single Page Applications (SPAs)
- Component libraries
- Progressive enhancement
- Advanced JavaScript

#### Backend Projects
- Server-side code support
- API simulation (future)
- Database integration (future)
- Deployment tools (future)

**Best for:**
- Full-stack applications
- API development
- Server configuration
- Database design

### Project Settings

#### Project Configuration
```json
{
  "name": "My Project",
  "type": "html-css-js",
  "created": "2024-01-01",
  "description": "Project description",
  "tags": ["web", "learning"],
  "public": false
}
```

#### Metadata
- **Creation Date**: Auto-generated
- **Last Modified**: Updated on changes
- **File Count**: Total files in project
- **Total Size**: Combined file sizes

### Project Actions

#### Export
- Download entire project as ZIP
- Includes all files and structure
- Ready to deploy anywhere
- Portable format

#### Backup
- Auto-backup to browser storage
- Manual backup export option
- Cloud backup (coming soon)
- Version history (coming soon)

#### Share
- Generate shareable link (coming soon)
- Embed project on websites (coming soon)
- Collaborative editing (coming soon)
- Public/private settings (coming soon)

---

## Advanced Features

### LocalStorage Integration

#### Automatic Saving
```javascript
// Projects are automatically saved to browser storage
// Each project is stored with:
// - project_${id}
// - project_${id}_files
// - project_${id}_metadata
```

#### Storage Management
- Typical browser limit: 5-50MB
- Check used storage in settings (future)
- Clear cache option available
- Export for backup before clearing

### Import/Export

#### Export Format
```
project.zip
├── index.html
├── style.css
├── script.js
└── project.json
```

#### Import Options
- Drag-and-drop ZIP files
- File upload dialog
- Copy-paste code (future)
- URL import (future)

### DevTools Integration

#### Browser DevTools Access
1. Open DStudio in browser
2. Press F12 for DevTools
3. Switch to preview iframe
4. Full debugging capabilities

#### Debugging Features
- DOM inspection
- CSS debugging
- JavaScript console
- Network monitoring
- Performance profiling

### Performance Optimization

#### Tips for Better Performance
1. **Minimize file sizes**
   - Use minified libraries
   - Compress images
   - Remove unused code

2. **Optimize JavaScript**
   - Avoid memory leaks
   - Use efficient algorithms
   - Lazy load resources

3. **Optimize CSS**
   - Use media queries
   - Avoid deep nesting
   - Use CSS Grid/Flexbox

4. **Resource Management**
   - Limit external requests
   - Cache assets locally
   - Use service workers (experimental)

---

## Keyboard Shortcuts Reference

### Editor Navigation
| Shortcut | Action |
|----------|--------|
| `Ctrl+Home` | Go to start of file |
| `Ctrl+End` | Go to end of file |
| `Ctrl+G` | Go to line |
| `Ctrl+↑` | Go to previous error |
| `Ctrl+↓` | Go to next error |

### File Management
| Shortcut | Action |
|----------|--------|
| `Ctrl+N` | New file |
| `Ctrl+O` | Open file |
| `Ctrl+S` | Save file |
| `Ctrl+W` | Close tab |
| `Ctrl+Tab` | Next tab |
| `Ctrl+Shift+Tab` | Previous tab |

### Editing
| Shortcut | Action |
|----------|--------|
| `Ctrl+/` | Toggle comment |
| `Alt+↑` | Move line up |
| `Alt+↓` | Move line down |
| `Ctrl+D` | Duplicate line |
| `Ctrl+K,C` | Comment block |
| `Ctrl+K,U` | Uncomment block |

### Preview
| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Run code |
| `F5` | Refresh preview |
| `Ctrl+Shift+I` | Open DevTools |

---

## Troubleshooting

### Common Issues

#### Preview Not Showing
- **Solution**: Click "Show Preview" button
- **Alternative**: Click "Run" to execute code
- **Check**: Ensure HTML file exists

#### Code Not Saving
- **Solution**: Click "Save" button
- **Check**: Browser storage available
- **Alternative**: Export project backup

#### Console Errors
- **Solution**: Check DevTools (F12)
- **Fix**: Review error messages
- **Reference**: MDN Web Docs

---

## Future Features Roadmap

### Version 1.1
- [ ] Code beautifier/formatter
- [ ] Multiple themes
- [ ] Advanced search
- [ ] Code snippets library
- [ ] Language support

### Version 1.2
- [ ] Git integration
- [ ] Collaborative editing
- [ ] Project templates
- [ ] Package manager (npm/yarn)
- [ ] Build tools

### Version 2.0
- [ ] Backend support
- [ ] Database integration
- [ ] Deployment tools
- [ ] Team features
- [ ] Advanced debugging

---

## Tips & Best Practices

### Code Organization
- Keep files organized in folders
- Use meaningful file names
- Separate concerns (HTML, CSS, JS)
- Use comments for clarity

### Performance
- Minify production code
- Optimize images
- Lazy load resources
- Monitor bundle size

### Security
- Never hardcode secrets
- Use HTTPS for external requests
- Validate user inputs
- Escape HTML content

### Accessibility
- Use semantic HTML
- Add alt text to images
- Ensure keyboard navigation
- Test with screen readers

---

## Support & Resources

- 📚 **Documentation**: https://dstudio.app/docs
- 🐛 **Report Issues**: https://github.com/dstudio/issues
- 💬 **Get Help**: https://discord.gg/dstudio
- 📧 **Contact Us**: support@dstudio.app

---

**Last Updated**: January 2024
**Version**: 1.0.0
