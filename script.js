/* ============================================
   DStudio - Main Application JavaScript
   ============================================ */

// App State
const appState = {
    view: 'dashboard', // 'dashboard' or 'editor'
    projects: [],
    currentProject: null,
    files: [],
    activeFile: null,
    consoleOutput: [],
    showPreview: false,
};

// Helper: Create SVG Icon
function createIcon(iconName) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    
    const use = document.createElementNS('http://www.w3.org/1999/xlink', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#icon-${iconName}`);
    svg.appendChild(use);
    
    return svg;
}

// Initialize App
function init() {
    createSampleProject();
    renderDashboard();
}

// Create Sample Project
function createSampleProject() {
    const sampleProject = {
        id: 1,
        name: 'Welcome Project',
        type: 'html-css-js',
        created: new Date(),
        files: [
            {
                id: 1,
                name: 'index.html',
                type: 'html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DStudio Welcome</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🚀 Welcome to DStudio</h1>
        <p>Edit HTML, CSS, and JavaScript to build amazing projects</p>
        <button id="clickBtn">Click Me!</button>
        <div id="output"></div>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`
            },
            {
                id: 2,
                name: 'style.css',
                type: 'css',
                content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 500px;
}

h1 {
    color: #667eea;
    margin-bottom: 20px;
    font-size: 28px;
}

p {
    color: #666;
    margin-bottom: 30px;
    font-size: 16px;
}

button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

#output {
    margin-top: 20px;
    padding: 15px;
    background: #f5f5f5;
    border-radius: 8px;
    display: none;
    color: #333;
    font-weight: 600;
}`
            },
            {
                id: 3,
                name: 'script.js',
                type: 'javascript',
                content: `const btn = document.getElementById('clickBtn');
const output = document.getElementById('output');

let clickCount = 0;

btn.addEventListener('click', function() {
    clickCount++;
    output.style.display = 'block';
    output.textContent = \`You clicked the button \${clickCount} time\${clickCount !== 1 ? 's' : ''}!\`;
});`
            }
        ]
    };

    appState.projects.push(sampleProject);
    appState.currentProject = sampleProject;
    appState.files = sampleProject.files;
    appState.activeFile = sampleProject.files[0];
}

// Render Dashboard
function renderDashboard() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="dashboard">
            <div class="dashboard-header">
                <div class="logo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <use xlink:href="#icon-code"></use>
                    </svg>
                    <span>DStudio</span>
                </div>
            </div>

            <div class="dashboard-content">
                <div class="dashboard-hero">
                    <h1 class="dashboard-title">Build the Web, Your Way</h1>
                    <p class="dashboard-subtitle">Professional code editor for creating stunning web applications</p>
                </div>

                <div class="projects-grid">
                    ${appState.projects.map(project => `
                        <div class="project-card" onclick="openProject(${project.id})">
                            <div class="project-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <use xlink:href="#icon-folder"></use>
                                </svg>
                            </div>
                            <div class="project-name">${project.name}</div>
                            <div class="project-type">${project.type}</div>
                        </div>
                    `).join('')}

                    <div class="new-project-card" onclick="createNewProject()">
                        <div class="new-project-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <use xlink:href="#icon-plus"></use>
                            </svg>
                            <span>New Project</span>
                        </div>
                    </div>
                </div>

                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <use xlink:href="#icon-code"></use>
                            </svg>
                        </div>
                        <div class="feature-title">Live Editor</div>
                        <div class="feature-desc">Write HTML, CSS, JavaScript</div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <use xlink:href="#icon-eye"></use>
                            </svg>
                        </div>
                        <div class="feature-title">Real-time Preview</div>
                        <div class="feature-desc">See changes instantly</div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <use xlink:href="#icon-terminal"></use>
                            </svg>
                        </div>
                        <div class="feature-title">Built-in Console</div>
                        <div class="feature-desc">Debug your code</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Open Project (Switch to Editor)
function openProject(projectId) {
    const project = appState.projects.find(p => p.id === projectId);
    if (project) {
        appState.currentProject = project;
        appState.files = project.files;
        appState.activeFile = project.files[0];
        appState.view = 'editor';
        appState.showPreview = false;
        appState.consoleOutput = [];
        renderEditor();
    }
}

// Create New Project
function createNewProject() {
    const newProject = {
        id: Date.now(),
        name: `Project ${appState.projects.length + 1}`,
        type: 'html-css-js',
        created: new Date(),
        files: [
            {
                id: 1,
                name: 'index.html',
                type: 'html',
                content: '<!DOCTYPE html>\n<html>\n<head><title>New Project</title></head>\n<body><h1>Hello World!</h1></body>\n</html>'
            }
        ]
    };
    appState.projects.push(newProject);
    openProject(newProject.id);
}

// Render Editor
function renderEditor() {
    const app = document.getElementById('app');
    const previewHtml = appState.showPreview ? 'visible' : 'hidden';
    
    app.innerHTML = `
        <div class="editor">
            <div class="editor-header">
                <button class="back-btn" onclick="backToDashboard()">← Back</button>
                
                <div class="editor-tabs">
                    ${appState.files.map(file => `
                        <div class="editor-tab ${appState.activeFile?.id === file.id ? 'active' : ''}" onclick="selectFile(${file.id})">
                            ${file.name}
                            <span class="close-btn" onclick="deleteFile(event, ${file.id})">×</span>
                        </div>
                    `).join('')}
                    <button class="btn" onclick="addNewFile()" style="background: rgba(102, 126, 234, 0.1); color: #667eea; border: 1px solid rgba(102, 126, 234, 0.2);">+ Add</button>
                </div>

                <div class="editor-controls">
                    <button class="btn" onclick="runCode()">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Run
                    </button>
                    <button class="btn secondary" onclick="saveFile()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <use xlink:href="#icon-save"></use>
                        </svg>
                        Save
                    </button>
                    <button class="btn secondary" onclick="togglePreview()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <use xlink:href="#icon-eye"></use>
                        </svg>
                        ${appState.showPreview ? 'Hide' : 'Show'}
                    </button>
                </div>
            </div>

            <div class="editor-workspace">
                <div class="editor-sidebar">
                    <div class="sidebar-section-title">📁 Files</div>
                    ${appState.files.map(file => `
                        <div class="file-item ${appState.activeFile?.id === file.id ? 'active' : ''}" onclick="selectFile(${file.id})">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <use xlink:href="#icon-file"></use>
                            </svg>
                            ${file.name}
                        </div>
                    `).join('')}
                </div>

                <div class="editor-main">
                    <div class="editor-code">
                        <textarea id="codeEditor" placeholder="Write your code..." spellcheck="false">${appState.activeFile?.content || ''}</textarea>
                    </div>
                    <div class="editor-console">
                        ${appState.consoleOutput.map(line => `
                            <div class="console-line ${line.type}">
                                <span class="console-line-type">[${line.type.toUpperCase()}]</span>
                                <span>${line.message}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${appState.showPreview ? '<div class="preview-pane"><iframe id="preview-iframe" title="preview"></iframe></div>' : ''}
            </div>
        </div>
    `;

    // Bind editor input
    const editor = document.getElementById('codeEditor');
    if (editor) {
        editor.addEventListener('input', (e) => {
            updateFileContent(e.target.value);
        });
    }
}

// Select File
function selectFile(fileId) {
    const file = appState.files.find(f => f.id === fileId);
    if (file) {
        appState.activeFile = file;
        renderEditor();
    }
}

// Add New File
function addNewFile() {
    const types = ['html', 'css', 'javascript'];
    const type = types[Math.floor(Math.random() * types.length)];
    const extensions = { html: '.html', css: '.css', javascript: '.js' };
    
    const newFile = {
        id: Date.now(),
        name: `file${extensions[type]}`,
        type,
        content: ''
    };
    
    appState.files.push(newFile);
    appState.activeFile = newFile;
    renderEditor();
}

// Delete File
function deleteFile(event, fileId) {
    event.stopPropagation();
    if (appState.files.length > 1) {
        appState.files = appState.files.filter(f => f.id !== fileId);
        appState.activeFile = appState.files[0];
        renderEditor();
    }
}

// Update File Content
function updateFileContent(content) {
    if (appState.activeFile) {
        appState.activeFile.content = content;
        const file = appState.files.find(f => f.id === appState.activeFile.id);
        if (file) {
            file.content = content;
        }
    }
}

// Save File
function saveFile() {
    const editor = document.getElementById('codeEditor');
    if (editor) {
        updateFileContent(editor.value);
        addConsoleOutput('save', `✅ Saved ${appState.activeFile.name}`);
        renderEditor();
    }
}

// Run Code
function runCode() {
    const htmlFile = appState.files.find(f => f.type === 'html');
    const cssFile = appState.files.find(f => f.type === 'css');
    const jsFile = appState.files.find(f => f.type === 'javascript');

    if (htmlFile) {
        const iframeContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${cssFile ? cssFile.content : ''}</style>
            </head>
            <body>
                ${htmlFile.content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')}
                <script>
                    ${jsFile ? jsFile.content : ''}
                <\/script>
            </body>
            </html>
        `;

        const iframe = document.getElementById('preview-iframe');
        if (iframe) {
            iframe.srcdoc = iframeContent;
            addConsoleOutput('success', '✅ Code executed successfully!');
            renderEditor();
        }
    }
}

// Toggle Preview
function togglePreview() {
    appState.showPreview = !appState.showPreview;
    if (appState.showPreview) {
        renderEditor();
        // Run code when preview is shown
        setTimeout(runCode, 100);
    } else {
        renderEditor();
    }
}

// Back to Dashboard
function backToDashboard() {
    appState.view = 'dashboard';
    renderDashboard();
}

// Add Console Output
function addConsoleOutput(type, message) {
    appState.consoleOutput.push({ type, message });
    if (appState.consoleOutput.length > 20) {
        appState.consoleOutput.shift();
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (appState.view === 'editor') {
            saveFile();
        }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        if (appState.view === 'editor') {
            const editor = document.getElementById('codeEditor');
            if (editor) {
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const selectedText = editor.value.substring(start, end);
                // Simple comment toggle for JS/HTML
                const commented = selectedText.split('\n').map(line => `// ${line}`).join('\n');
                editor.value = editor.value.substring(0, start) + commented + editor.value.substring(end);
            }
        }
    }
});

// Start App
init();
