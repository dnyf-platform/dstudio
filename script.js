script.js

const app = document.getElementById("app");

const STORAGE_KEY = "dstudio-projects";

let state = {
    projects: [],
    currentProject: null
};

/* =========================
   STORAGE
========================= */

function saveProjects(){
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.projects)
    );
}

function loadProjects(){
    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved){
        state.projects = JSON.parse(saved);
    }else{
        createStarterProject();
    }
}

/* =========================
   STARTER PROJECT
========================= */

function createStarterProject(){

    const project = {
        id: Date.now(),
        name: "Welcome Project",
        files: {
            html: `<!DOCTYPE html>
<html>
<head>
<title>DStudio</title>
</head>
<body>

<h1>Hello DStudio 🚀</h1>
<button id="btn">Click</button>

<script src="script.js"></script>

</body>
</html>`,

            css: `body{
    font-family:sans-serif;
    padding:40px;
    background:#f5f5f5;
}`,

            js: `document.getElementById("btn")
.addEventListener("click",()=>{
    alert("DStudio Running!");
});`
        }
    };

    state.projects.push(project);

    saveProjects();
}

/* =========================
   DASHBOARD
========================= */

function renderDashboard(){

    app.innerHTML = `
        <div class="dashboard">

            <div class="hero">
                <div class="logo gradient">
                    <svg viewBox="0 0 24 24">
                        <use href="#icon-code"></use>
                    </svg>
                    DStudio
                </div>

                <p class="subtitle">
                    Lightweight mobile-first browser IDE for HTML, CSS and JavaScript projects.
                </p>
            </div>

            <div class="grid">

                ${state.projects.map(project=>`

                    <div class="card" data-id="${project.id}">
                        <svg viewBox="0 0 24 24">
                            <use href="#icon-folder"></use>
                        </svg>

                        <h3>${project.name}</h3>

                        <p>Open project workspace</p>
                    </div>

                `).join("")}

                <div class="card" id="newProject">
                    <svg viewBox="0 0 24 24">
                        <use href="#icon-plus"></use>
                    </svg>

                    <h3>New Project</h3>

                    <p>Create a fresh workspace</p>
                </div>

            </div>

        </div>
    `;

    bindDashboardEvents();
}

function bindDashboardEvents(){

    document.querySelectorAll(".card[data-id]")
    .forEach(card=>{

        card.addEventListener("click",()=>{

            const id = Number(card.dataset.id);

            openProject(id);

        });

    });

    document
    .getElementById("newProject")
    .addEventListener("click",createProject);
}

/* =========================
   CREATE PROJECT
========================= */

function createProject(){

    const name = prompt("Project name");

    if(!name) return;

    const project = {
        id: Date.now(),
        name,
        files:{
            html:"",
            css:"",
            js:""
        }
    };

    state.projects.push(project);

    saveProjects();

    renderDashboard();
}

/* =========================
   OPEN PROJECT
========================= */

function openProject(id){

    const project = state.projects.find(p=>p.id===id);

    if(!project) return;

    state.currentProject = project;

    renderEditor();
}

/* =========================
   EDITOR
========================= */

function renderEditor(){

    const project = state.currentProject;

    app.innerHTML = `
        <div class="editor">

            <div class="topbar">

                <div class="left-controls">
                    <button class="btn secondary" id="backBtn">
                        Back
                    </button>

                    <strong>${project.name}</strong>
                </div>

                <div class="right-controls">

                    <button class="btn secondary" id="saveBtn">
                        Save
                    </button>

                    <button class="btn" id="runBtn">
                        Run
                    </button>

                </div>

            </div>

            <div class="workspace">

                <div class="panel">

<textarea id="editor">
<!-- HTML -->
${project.files.html}

/* CSS */
${project.files.css}

/* JavaScript */
${project.files.js}
</textarea>

                </div>

                <div class="panel">
                    <iframe id="preview"></iframe>
                </div>

            </div>

            <div class="console" id="console"></div>

        </div>
    `;

    bindEditorEvents();

    runPreview();
}

/* =========================
   EVENTS
========================= */

function bindEditorEvents(){

    document
    .getElementById("backBtn")
    .addEventListener("click",()=>{

        renderDashboard();

    });

    document
    .getElementById("saveBtn")
    .addEventListener("click",saveCurrentProject);

    document
    .getElementById("runBtn")
    .addEventListener("click",runPreview);
}

/* =========================
   SAVE
========================= */

function saveCurrentProject(){

    const project = state.currentProject;

    const editor = document
    .getElementById("editor")
    .value;

    const htmlMatch = editor.match(/<!-- HTML -->([\s\S]*?)\/\* CSS \*\//);
    const cssMatch = editor.match(/\/\* CSS \*\/([\s\S]*?)\/\* JavaScript \*\//);
    const jsMatch = editor.match(/\/\* JavaScript \*\/([\s\S]*)/);

    project.files.html = htmlMatch ? htmlMatch[1].trim() : "";
    project.files.css = cssMatch ? cssMatch[1].trim() : "";
    project.files.js = jsMatch ? jsMatch[1].trim() : "";

    saveProjects();

    log("Project saved successfully.");
}

/* =========================
   RUN
========================= */

function runPreview(){

    saveCurrentProject();

    const project = state.currentProject;

    const iframe = document.getElementById("preview");

    iframe.srcdoc = `
<!DOCTYPE html>
<html>
<head>
<style>
${project.files.css}
</style>
</head>

<body>

${project.files.html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"")}

<script>
${project.files.js}
<\/script>

</body>
</html>
`;

    log("Preview rendered.");
}

/* =========================
   CONSOLE
========================= */

function log(message){

    const consoleEl = document.getElementById("console");

    const div = document.createElement("div");

    div.className = "log";

    div.textContent = "> " + message;

    consoleEl.prepend(div);
}

/* =========================
   INIT
========================= */

loadProjects();

renderDashboard();
