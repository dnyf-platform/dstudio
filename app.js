class DStudioApp {
    constructor() {
        this.state = {
            projectId: null,
            projectName: "My Studio",
            files: [],
            activeFileId: null,
            view: "dashboard",
            consoleLogs: []
        };
        this.autoSaveTimer = null;
        this.init();
    }

    async init() {
        this.loadTheme();
        await this.loadProjectFromStorage();
        if (!this.state.files.length) this.createSampleProject();
        this.renderDashboard();
        this.addConsoleMessage("📱 DStudio · Run opens full‑screen WebView");
        this.setupAndroidBackHandler();
    }

    setupAndroidBackHandler() {
        if (window.history && window.history.pushState) {
            window.history.pushState(null, null, window.location.href);
            window.addEventListener('popstate', () => {
                if (this.state.view === "editor") {
                    this.goBackDashboard();
                    window.history.pushState(null, null, window.location.href);
                } else {
                    if (confirm('Exit DStudio?')) window.close();
                }
            });
        }
    }

    loadTheme() {
        const theme = StorageManager.load("dstudio-theme") || "dark";
        if (theme === "light") {
            document.body.style.setProperty('--bg', '#f8fafc');
            document.body.style.setProperty('--panel', '#ffffff');
            document.body.style.setProperty('--text', '#0f172a');
        } else {
            document.body.style.setProperty('--bg', '#0a0e27');
            document.body.style.setProperty('--panel', '#11162f');
            document.body.style.setProperty('--text', '#f1f5f9');
        }
    }

    async loadProjectFromStorage() {
        const saved = StorageManager.load("dstudio_full_project");
        if (saved?.files) {
            this.state.files = saved.files;
            this.state.activeFileId = saved.activeFileId || (saved.files[0]?.id || null);
            this.state.projectName = saved.projectName || "Android Project";
        }
    }

    saveFullProject() {
        const toStore = {
            projectId: this.state.projectId,
            projectName: this.state.projectName,
            files: this.state.files,
            activeFileId: this.state.activeFileId,
            version: 2
        };
        StorageManager.save("dstudio_full_project", toStore);
        this.addConsoleMessage("💾 Project saved");
    }

    createSampleProject() {
        this.state.projectId = Date.now();
        this.state.projectName = "AndroidIDE";
        this.state.files = [
            this.createFileObj("index.html", "html", `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>DStudio App</title></head><body><div class='app'><h1>📱 Smart IDE</h1><p>Click Run → full‑screen WebView</p><button id='btn'>Tap Me</button></div></body></html>`),
            this.createFileObj("style.css", "css", `body{background:#0f172a; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; font-family:sans-serif; color:white;} .app{text-align:center;} button{background:#667eea; border:none; padding:12px 24px; border-radius:40px; color:white; font-weight:bold;}`),
            this.createFileObj("app.js", "js", `document.getElementById('btn')?.addEventListener('click',()=>alert('Hello from WebView!'))\nconsole.log("Smart IDE ready");`)
        ];
        this.state.activeFileId = this.state.files[0].id;
        this.saveFullProject();
        this.addConsoleMessage("✨ Sample Android project created");
    }

    createFileObj(name, type, content = "") {
        return { id: Date.now() + Math.random() * 10000, name, type, content };
    }

    addConsoleMessage(msg) {
        this.state.consoleLogs.unshift({ msg, time: new Date().toLocaleTimeString() });
        if (this.state.consoleLogs.length > 30) this.state.consoleLogs.pop();
        if (this.state.view === "editor") this.updateConsoleUI();
        console.log(`[DStudio] ${msg}`);
    }

    updateConsoleUI() {
        const container = document.getElementById("consoleMessages");
        if (!container) return;
        if (!this.state.consoleLogs.length) {
            container.innerHTML = '<div class="console-line">⏺ Console ready — Run to see output</div>';
            return;
        }
        container.innerHTML = this.state.consoleLogs.map(l => `<div class="console-line">⏵ [${l.time}] ${l.msg}</div>`).join('');
        container.scrollTop = 0;
    }

    renderDashboard() {
        this.state.view = "dashboard";
        const appDiv = document.getElementById("app");
        appDiv.innerHTML = `
            <div class="dashboard">
                <div class="hero">
                    <div class="logo">🤖 DStudio · Android IDE</div>
                    <p class="subtitle">Multi-file editor · Run opens full‑screen WebView</p>
                </div>
                <div class="grid">
                    <div class="card" id="openEditorBtn"><div class="card-icon">✏️</div><h3>Open Editor</h3><p>Code HTML/CSS/JS</p></div>
                    <div class="card" id="newProjectBtn"><div class="card-icon">📁</div><h3>New Project</h3><p>Reset workspace</p></div>
                    <div class="card" id="importFilesBtn"><div class="card-icon">📂</div><h3>Import Files</h3><p>From device storage</p></div>
                    <div class="card" id="settingsBtn"><div class="card-icon">⚙️</div><h3>Settings</h3><p>Theme & reset</p></div>
                </div>
            </div>
        `;
        document.getElementById("openEditorBtn")?.addEventListener("click", () => this.openEditor());
        document.getElementById("newProjectBtn")?.addEventListener("click", () => this.confirmNewProject());
        document.getElementById("importFilesBtn")?.addEventListener("click", () => this.importFilesFromDevice());
        document.getElementById("settingsBtn")?.addEventListener("click", () => this.showSettingsDialog());
    }

    confirmNewProject() {
        if (confirm("⚠️ Create new project? Unsaved changes will be lost.")) {
            this.state.files = [];
            this.createSampleProject();
            this.saveFullProject();
            this.openEditor();
        }
    }

    importFilesFromDevice() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = '.html,.css,.js,.txt';
        input.onchange = async (e) => {
            const files = Array.from(e.target.files);
            for (const file of files) {
                const content = await file.text();
                const ext = file.name.split('.').pop().toLowerCase();
                let type = 'text';
                if (ext === 'html') type = 'html';
                else if (ext === 'css') type = 'css';
                else if (ext === 'js') type = 'js';
                const newFile = this.createFileObj(file.name, type, content);
                this.state.files.push(newFile);
            }
            if (files.length) this.state.activeFileId = this.state.files[this.state.files.length-1].id;
            this.saveFullProject();
            if (this.state.view === "editor") this.renderFileList();
            else this.openEditor();
            this.addConsoleMessage(`📥 Imported ${files.length} files`);
        };
        input.click();
    }

    showSettingsDialog() {
        const isLight = StorageManager.load("dstudio-theme") === "light";
        const choice = confirm(`Theme: ${isLight ? "Light" : "Dark"}\nOK → Switch theme\nCancel → Reset all data`);
        if (choice) {
            const newTheme = isLight ? "dark" : "light";
            StorageManager.save("dstudio-theme", newTheme);
            this.loadTheme();
            this.addConsoleMessage(`🎨 Theme → ${newTheme}`);
            alert(`Theme changed to ${newTheme}`);
        } else {
            if (confirm("⚠️ RESET everything? This will delete all code.")) {
                StorageManager.remove("dstudio_full_project");
                this.state.files = [];
                this.createSampleProject();
                this.saveFullProject();
                alert("Workspace reset. Reloading...");
                location.reload();
            }
        }
    }

    openEditor() {
        this.state.view = "editor";
        this.renderFullEditor();
    }

    renderFullEditor() {
        const appDiv = document.getElementById("app");
        const activeFile = this.state.files.find(f => f.id === this.state.activeFileId) || this.state.files[0];
        if (!activeFile && this.state.files.length) this.state.activeFileId = this.state.files[0].id;

        appDiv.innerHTML = `
            <div class="editor-container">
                <div class="topbar">
                    <div class="logo-small">✍️ DStudio</div>
                    <div class="actions-group">
                        <button class="btn" id="runWebViewBtn">▶ Run (WebView)</button>
                        <button class="btn btn-outline" id="saveBtn">💾 Save</button>
                    </div>
                </div>
                <div class="main-workbench">
                    <div class="file-sidebar">
                        <div class="sidebar-header">
                            <span>📄 FILES</span>
                            <button id="addFileBtn" style="background:#4f46e5; border:none; border-radius:20px; padding:4px 12px;">+ New</button>
                        </div>
                        <div class="file-list" id="fileList"></div>
                    </div>
                    <div class="editor-preview-split">
                        <div class="editor-area">
                            <textarea id="codeEditor" class="editor-textarea" spellcheck="false"></textarea>
                        </div>
                        <div class="preview-area">
                            <div style="background:#0c1022; padding:12px; text-align:center; color:#9ca3af;">
                                ⚡ Click <strong>Run (WebView)</strong> to preview your website in full screen.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="console-panel" id="consoleMessages"></div>
                <div class="bottom-nav">
                    <button class="nav-btn" id="navFiles"><span class="nav-icon">📁</span><span>Files</span></button>
                    <button class="nav-btn" id="navConsole"><span class="nav-icon">📟</span><span>Console</span></button>
                </div>
            </div>
        `;

        this.renderFileList();
        if (activeFile) document.getElementById("codeEditor").value = activeFile.content;
        this.updateConsoleUI();

        document.getElementById("runWebViewBtn")?.addEventListener("click", () => this.openWebView());
        document.getElementById("saveBtn")?.addEventListener("click", () => { this.saveFullProject(); alert("Saved"); });
        document.getElementById("addFileBtn")?.addEventListener("click", () => this.promptNewFile());
        document.getElementById("navFiles")?.addEventListener("click", () => document.querySelector(".file-sidebar")?.scrollIntoView({behavior:"smooth"}));
        document.getElementById("navConsole")?.addEventListener("click", () => document.querySelector(".console-panel")?.scrollIntoView({behavior:"smooth"}));

        const editor = document.getElementById("codeEditor");
        editor?.addEventListener("input", () => {
            const active = this.state.files.find(f => f.id === this.state.activeFileId);
            if (active) active.content = editor.value;
            if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);
            this.autoSaveTimer = setTimeout(() => this.saveFullProject(), 700);
        });
    }

    renderFileList() {
        const container = document.getElementById("fileList");
        if (!container) return;
        container.innerHTML = "";
        this.state.files.forEach(file => {
            const div = document.createElement("div");
            div.className = `file-item ${this.state.activeFileId === file.id ? "active" : ""}`;
            div.innerHTML = `
                <span class="file-name">📄 ${file.name}</span>
                <div class="file-actions">
                    <button class="icon-btn rename" data-id="${file.id}">✏️</button>
                    <button class="icon-btn delete" data-id="${file.id}">🗑️</button>
                </div>
            `;
            div.addEventListener("click", (e) => {
                if (!e.target.classList.contains("icon-btn")) this.switchFile(file.id);
            });
            container.appendChild(div);
        });
        document.querySelectorAll(".rename").forEach(btn => btn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.renameFile(Number(btn.dataset.id));
        }));
        document.querySelectorAll(".delete").forEach(btn => btn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.deleteFile(Number(btn.dataset.id));
        }));
    }

    switchFile(id) {
        this.state.activeFileId = id;
        const active = this.state.files.find(f => f.id === id);
        const editor = document.getElementById("codeEditor");
        if (editor && active) editor.value = active.content;
        this.renderFileList();
        this.addConsoleMessage(`Opened ${active?.name}`);
    }

    renameFile(id) {
        const file = this.state.files.find(f => f.id === id);
        if (!file) return;
        const newName = prompt("New file name:", file.name);
        if (newName?.trim()) {
            file.name = newName.trim();
            this.saveFullProject();
            this.renderFileList();
        }
    }

    deleteFile(id) {
        if (this.state.files.length <= 1) { alert("Cannot delete last file"); return; }
        if (confirm(`Delete ${this.state.files.find(f=>f.id===id)?.name}?`)) {
            this.state.files = this.state.files.filter(f => f.id !== id);
            if (this.state.activeFileId === id) this.state.activeFileId = this.state.files[0]?.id;
            this.saveFullProject();
            this.renderFileList();
            const active = this.state.files.find(f => f.id === this.state.activeFileId);
            const editor = document.getElementById("codeEditor");
            if (editor && active) editor.value = active.content;
        }
    }

    promptNewFile() {
        let name = prompt("File name (e.g., script.js):", "new.js");
        if (!name) return;
        if (!name.includes('.')) name += '.txt';
        const ext = name.split('.').pop().toLowerCase();
        const type = ['html','css','js'].includes(ext) ? ext : 'text';
        const newFile = this.createFileObj(name, type, ext === 'js' ? '// code here' : ext === 'css' ? '/* styles */' : '<!-- content -->');
        this.state.files.push(newFile);
        this.state.activeFileId = newFile.id;
        this.saveFullProject();
        this.renderFileList();
        const editor = document.getElementById("codeEditor");
        if (editor) editor.value = newFile.content;
        this.addConsoleMessage(`➕ Added ${name}`);
    }

    generateFullHTML() {
        const htmlFile = this.state.files.find(f => f.name === "index.html")?.content || "<h1>No index.html</h1>";
        const cssFile = this.state.files.find(f => f.name === "style.css")?.content || "";
        const jsFile = this.state.files.find(f => f.name === "app.js")?.content || "";
        return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
            <style>${cssFile}</style>
        </head>
        <body>
            ${htmlFile}
            <script>${jsFile}<\/script>
        </body>
        </html>`;
    }

    openWebView() {
        // Save current state before opening
        this.saveFullProject();
        const fullHTML = this.generateFullHTML();
        // Store in sessionStorage for webview.html
        sessionStorage.setItem('dstudio_webview_html', fullHTML);
        // Open webview.html in a new tab (full‑screen WebView)
        window.open('webview.html', '_blank');
        this.addConsoleMessage("🔍 Opened full‑screen WebView preview");
    }

    goBackDashboard() {
        this.saveFullProject();
        this.renderDashboard();
    }
}
