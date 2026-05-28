import React, { useState, useEffect, useRef } from 'react';
import { Code2, Play, Save, Plus, Trash2, Eye, Terminal, FileText, Folder, Settings, Share2, Download } from 'lucide-react';

const DStudio = () => {
  const [view, setView] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const editorRef = useRef(null);

  // Initialize with sample project
  useEffect(() => {
    const sampleProject = {
      id: 1,
      name: 'Welcome Project',
      type: 'html-css-js',
      created: new Date(),
      files: [
        { id: 1, name: 'index.html', type: 'html', content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DStudio - Your First App</title>
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
</html>` },
        { id: 2, name: 'style.css', type: 'css', content: `* {
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
}` },
        { id: 3, name: 'script.js', type: 'javascript', content: `const btn = document.getElementById('clickBtn');
const output = document.getElementById('output');

let clickCount = 0;

btn.addEventListener('click', function() {
    clickCount++;
    output.style.display = 'block';
    output.textContent = \`You clicked the button \${clickCount} time\${clickCount !== 1 ? 's' : ''}!\`;
});` }
      ]
    };

    setProjects([sampleProject]);
    setCurrentProject(sampleProject);
    setFiles(sampleProject.files);
    setActiveFile(sampleProject.files[0]);
  }, []);

  const createNewProject = () => {
    const newProject = {
      id: Date.now(),
      name: `Project ${projects.length + 1}`,
      type: 'html-css-js',
      created: new Date(),
      files: [
        { id: 1, name: 'index.html', type: 'html', content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>New Project</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>' }
      ]
    };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
    setFiles(newProject.files);
    setActiveFile(newProject.files[0]);
    setView('editor');
  };

  const updateFileContent = (content) => {
    const updatedFiles = files.map(f => 
      f.id === activeFile.id ? { ...f, content } : f
    );
    setFiles(updatedFiles);
    setActiveFile({ ...activeFile, content });
    setConsoleOutput([...consoleOutput, { type: 'save', message: `Saved ${activeFile.name}` }]);
  };

  const runCode = () => {
    const htmlFile = files.find(f => f.type === 'html');
    const cssFile = files.find(f => f.type === 'css');
    const jsFile = files.find(f => f.type === 'javascript');

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
          </script>
        </body>
        </html>
      `;
      
      const iframe = document.getElementById('preview-iframe');
      if (iframe) {
        iframe.srcdoc = iframeContent;
        setConsoleOutput([...consoleOutput, { type: 'success', message: 'Code executed successfully!' }]);
      }
    }
  };

  const addNewFile = () => {
    const types = ['html', 'css', 'javascript', 'json', 'markdown'];
    const extensions = { html: '.html', css: '.css', javascript: '.js', json: '.json', markdown: '.md' };
    const type = types[Math.floor(Math.random() * types.length)];
    const newFile = {
      id: Date.now(),
      name: `file${extensions[type]}`,
      type,
      content: ''
    };
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    setActiveFile(newFile);
  };

  const deleteFile = (fileId) => {
    if (files.length > 1) {
      const updatedFiles = files.filter(f => f.id !== fileId);
      setFiles(updatedFiles);
      setActiveFile(updatedFiles[0]);
    }
  };

  // Dashboard View
  if (view === 'dashboard') {
    return (
      <div className="dstudio-container">
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          }

          .dstudio-container {
            min-height: 100vh;
            background: #0a0e27;
            color: #e0e0e0;
            overflow-x: hidden;
          }

          /* Background Effects */
          .dstudio-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
          }

          .grid-pattern {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: 
              linear-gradient(rgba(102, 126, 234, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(102, 126, 234, 0.05) 1px, transparent 1px);
            background-size: 50px 50px;
          }

          .gradient-orb-1 {
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            top: -200px;
            right: -200px;
            animation: float 20s ease-in-out infinite;
          }

          .gradient-orb-2 {
            position: absolute;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            bottom: -100px;
            left: -100px;
            animation: float 25s ease-in-out infinite reverse;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(30px); }
          }

          /* Header */
          .dstudio-header {
            padding: 20px 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(10, 14, 39, 0.8);
            border-bottom: 1px solid rgba(102, 126, 234, 0.1);
            backdrop-filter: blur(10px);
            position: relative;
            z-index: 10;
          }

          .dstudio-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .dstudio-logo svg {
            width: 32px;
            height: 32px;
            color: #667eea;
          }

          /* Main Content */
          .dashboard-content {
            padding: 80px 40px;
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
            z-index: 5;
          }

          .dashboard-hero {
            text-align: center;
            margin-bottom: 80px;
            animation: fadeInDown 0.8s ease-out;
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .dashboard-title {
            font-size: 56px;
            font-weight: 800;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.2;
          }

          .dashboard-subtitle {
            font-size: 20px;
            color: #a0a0a0;
            margin-bottom: 40px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
            animation: fadeInUp 0.8s ease-out 0.2s both;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .project-card {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%);
            border: 1px solid rgba(102, 126, 234, 0.2);
            border-radius: 16px;
            padding: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .project-card:hover {
            border-color: rgba(102, 126, 234, 0.5);
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
          }

          .project-card:hover::before {
            opacity: 1;
          }

          .project-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
          }

          .project-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .project-type {
            font-size: 14px;
            color: #667eea;
            margin-bottom: 12px;
          }

          .project-date {
            font-size: 12px;
            color: #707070;
          }

          .new-project-card {
            background: rgba(102, 126, 234, 0.05);
            border: 2px dashed rgba(102, 126, 234, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 200px;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 16px;
          }

          .new-project-card:hover {
            border-color: rgba(102, 126, 234, 0.6);
            background: rgba(102, 126, 234, 0.1);
          }

          .new-project-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            color: #667eea;
            text-align: center;
          }

          .new-project-btn svg {
            width: 48px;
            height: 48px;
          }

          .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin-top: 80px;
            animation: fadeInUp 0.8s ease-out 0.4s both;
          }

          .feature {
            background: rgba(102, 126, 234, 0.05);
            border: 1px solid rgba(102, 126, 234, 0.1);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
          }

          .feature-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
          }

          .feature-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .feature-desc {
            font-size: 14px;
            color: #a0a0a0;
          }

          @media (max-width: 768px) {
            .dstudio-header {
              padding: 16px 20px;
            }

            .dashboard-content {
              padding: 40px 20px;
            }

            .dashboard-title {
              font-size: 36px;
            }

            .projects-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="dstudio-bg">
          <div className="grid-pattern"></div>
          <div className="gradient-orb-1"></div>
          <div className="gradient-orb-2"></div>
        </div>

        <div className="dstudio-header">
          <div className="dstudio-logo">
            <Code2 size={32} />
            <span>DStudio</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={styles.headerBtn}>Documentation</button>
            <button style={styles.headerBtn}>GitHub</button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-hero">
            <h1 className="dashboard-title">Build the Web, Your Way</h1>
            <p className="dashboard-subtitle">
              Professional code editor for creating stunning web applications. Code faster, deploy smarter.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map(project => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => {
                  setCurrentProject(project);
                  setFiles(project.files);
                  setActiveFile(project.files[0]);
                  setView('editor');
                }}
              >
                <div className="project-icon">
                  <Folder size={24} color="white" />
                </div>
                <div className="project-name">{project.name}</div>
                <div className="project-type">{project.type}</div>
                <div className="project-date">{project.created.toLocaleDateString()}</div>
              </div>
            ))}

            <div className="new-project-card" onClick={createNewProject}>
              <div className="new-project-btn">
                <Plus size={32} />
                <span>New Project</span>
              </div>
            </div>
          </div>

          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <Code2 size={24} color="white" />
              </div>
              <div className="feature-title">Live Code Editor</div>
              <div className="feature-desc">Write and edit HTML, CSS, JavaScript with syntax highlighting</div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <Eye size={24} color="white" />
              </div>
              <div className="feature-title">Real-time Preview</div>
              <div className="feature-desc">See your changes instantly as you code</div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <Terminal size={24} color="white" />
              </div>
              <div className="feature-title">Built-in Console</div>
              <div className="feature-desc">Debug and test your code with integrated console output</div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <Download size={24} color="white" />
              </div>
              <div className="feature-title">Export Projects</div>
              <div className="feature-desc">Download your projects as complete packages</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Editor View
  return (
    <div style={styles.editorContainer}>
      <style>{`
        .editor-header {
          background: #0f1527;
          border-bottom: 1px solid rgba(102, 126, 234, 0.1);
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 20;
        }

        .editor-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          flex: 1;
        }

        .editor-tab {
          padding: 8px 16px;
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-bottom: none;
          border-radius: 8px 8px 0 0;
          cursor: pointer;
          font-size: 13px;
          color: #a0a0a0;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .editor-tab.active {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-color: rgba(102, 126, 234, 0.4);
          color: #e0e0e0;
        }

        .editor-tab:hover {
          background: rgba(102, 126, 234, 0.15);
        }

        .editor-tab .close-btn {
          cursor: pointer;
          padding: 0;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .editor-controls {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .editor-btn {
          padding: 8px 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .editor-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }

        .editor-btn.secondary {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .editor-btn.secondary:hover {
          background: rgba(102, 126, 234, 0.15);
        }

        .editor-workspace {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .editor-sidebar {
          width: 250px;
          background: #0a0e27;
          border-right: 1px solid rgba(102, 126, 234, 0.1);
          overflow-y: auto;
          padding: 16px 0;
        }

        .file-explorer-item {
          padding: 8px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a0a0a0;
          font-size: 13px;
          transition: all 0.2s;
          user-select: none;
        }

        .file-explorer-item:hover {
          background: rgba(102, 126, 234, 0.1);
          color: #e0e0e0;
        }

        .file-explorer-item.active {
          background: rgba(102, 126, 234, 0.2);
          color: #667eea;
          border-left: 3px solid #667eea;
          padding-left: 13px;
        }

        .editor-section-title {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          color: #667eea;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 16px;
        }

        .editor-main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .editor-code {
          flex: 1;
          background: #0f1527;
          overflow: hidden;
          position: relative;
        }

        textarea {
          width: 100%;
          height: 100%;
          background: #0f1527;
          color: #e0e0e0;
          border: none;
          padding: 16px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
          line-height: 1.6;
          resize: none;
          outline: none;
        }

        .editor-console {
          background: #0a0e27;
          border-top: 1px solid rgba(102, 126, 234, 0.1);
          padding: 16px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 12px;
          max-height: 150px;
          overflow-y: auto;
          color: #a0a0a0;
        }

        .console-line {
          margin-bottom: 4px;
          display: flex;
          gap: 8px;
        }

        .console-line.save {
          color: #4caf50;
        }

        .console-line.success {
          color: #4caf50;
        }

        .console-line.error {
          color: #f44336;
        }

        .preview-pane {
          flex: 1;
          background: white;
          border-left: 1px solid rgba(102, 126, 234, 0.1);
          overflow: hidden;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        @media (max-width: 768px) {
          .editor-sidebar {
            display: none;
          }

          .editor-workspace {
            flex-direction: column;
          }

          .preview-pane {
            border-left: none;
            border-top: 1px solid rgba(102, 126, 234, 0.1);
          }
        }
      `}</style>

      <div style={styles.editorHeader} className="editor-header">
        <button onClick={() => setView('dashboard')} style={styles.backBtn}>
          ← Back to Dashboard
        </button>
        <div className="editor-tabs">
          {files.map(file => (
            <div
              key={file.id}
              className={`editor-tab ${activeFile?.id === file.id ? 'active' : ''}`}
              onClick={() => setActiveFile(file)}
            >
              {file.name}
              <span 
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(file.id);
                }}
              >
                ×
              </span>
            </div>
          ))}
          <button onClick={addNewFile} style={styles.addFileBtn}>+ Add File</button>
        </div>
        <div className="editor-controls">
          <button onClick={runCode} className="editor-btn">
            <Play size={16} />
            Run
          </button>
          <button onClick={() => updateFileContent(editorRef.current.value)} className="editor-btn secondary">
            <Save size={16} />
            Save
          </button>
          <button onClick={() => setShowPreview(!showPreview)} className="editor-btn secondary">
            <Eye size={16} />
            {showPreview ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="editor-workspace">
        <div className="editor-sidebar">
          <div className="editor-section-title">📁 Project Files</div>
          {files.map(file => (
            <div
              key={file.id}
              className={`file-explorer-item ${activeFile?.id === file.id ? 'active' : ''}`}
              onClick={() => setActiveFile(file)}
            >
              <FileText size={14} />
              {file.name}
            </div>
          ))}
          <div className="editor-section-title" style={{ marginTop: '24px' }}>📊 Statistics</div>
          <div style={{ padding: '8px 16px', fontSize: '12px', color: '#707070' }}>
            <div>Files: {files.length}</div>
            <div>Project: {currentProject?.name}</div>
            <div>Type: {currentProject?.type}</div>
          </div>
        </div>

        <div className="editor-main">
          <div className="editor-code">
            <textarea
              ref={editorRef}
              value={activeFile?.content || ''}
              onChange={(e) => updateFileContent(e.target.value)}
              placeholder="Write your code here..."
            />
          </div>
          <div className="editor-console">
            {consoleOutput.map((line, idx) => (
              <div key={idx} className={`console-line ${line.type}`}>
                <span style={{ minWidth: '60px', color: '#667eea' }}>
                  [{line.type.toUpperCase()}]
                </span>
                <span>{line.message}</span>
              </div>
            ))}
          </div>
        </div>

        {showPreview && (
          <div className="preview-pane">
            <iframe id="preview-iframe" title="preview"></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  editorContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: '#0a0e27',
    color: '#e0e0e0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
  },
  editorHeader: {
    background: '#0f1527',
    borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  backBtn: {
    background: 'rgba(102, 126, 234, 0.1)',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    color: '#667eea',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  },
  addFileBtn: {
    background: 'rgba(102, 126, 234, 0.1)',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    color: '#667eea',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.2s'
  }
};

export default DStudio;
