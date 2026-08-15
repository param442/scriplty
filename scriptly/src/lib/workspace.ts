export interface ProjectFile {
  id: string;
  name: string;
  language: string;
  content: string;
  isUnsaved?: boolean;
}

export interface WorkspaceProject {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  files: ProjectFile[];
}

export const getLanguageFromFilename = (filename: string): string => {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  switch (ext) {
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "html":
    case "htm":
      return "html";
    case "css":
    case "scss":
    case "less":
      return "css";
    case "json":
      return "json";
    case "md":
    case "markdown":
      return "markdown";
    case "py":
      return "python";
    case "sql":
      return "sql";
    case "sh":
    case "bash":
      return "bash";
    default:
      return "plaintext";
  }
};

export const getDefaultFiles = (): ProjectFile[] => [
  {
    id: "file-index-js",
    name: "index.js",
    language: "javascript",
    content: `// Scriplty Code Workspace
// Write your JavaScript code here and click "Run" to see the live console output!

function greet(name) {
  return \`Hello \${name}! Welcome to Scriplty IDE.\`;
}

console.log(greet("Developer"));

// Sample array operations
const numbers = [10, 20, 30, 40, 50];
const doubled = numbers.map(num => num * 2);
console.log("Doubled values:", doubled);

// Calculate total
const sum = numbers.reduce((acc, current) => acc + current, 0);
console.log("Sum of numbers:", sum);
`,
  },
  {
    id: "file-styles-css",
    name: "styles.css",
    language: "css",
    content: `/* Modern Scriplty Stylesheet */
:root {
  --primary-color: #7c3aed;
  --bg-dark: #0f172a;
  --text-light: #f8fafc;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: var(--bg-dark);
  color: var(--text-light);
  margin: 0;
  padding: 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
`,
  },
  {
    id: "file-index-html",
    name: "index.html",
    language: "html",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scriplty App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>🚀 Welcome to Scriplty Code Editor</h1>
    <p>Build, test, and collaborate on your web applications directly in the browser.</p>
  </div>
  <script src="index.js"></script>
</body>
</html>
`,
  },
  {
    id: "file-readme-md",
    name: "README.md",
    language: "markdown",
    content: `# Scriplty Workspace

Welcome to your Scriplty workspace!

## Features
- 📁 **File Explorer**: Create, open, rename, and delete files easily.
- ⚡ **Live Runner**: Click **Run** in the top bar to execute your JavaScript code instantly in the output console.
- 🎨 **Multi-Tab Editor**: Open multiple files simultaneously and switch between them smoothly.
- 💾 **Local Storage Persistence**: All code changes are saved automatically.
`,
  },
];

const STORAGE_KEY_PREFIX = "scriplty_project_";
const PROJECTS_LIST_KEY = "scriplty_projects_meta";

export const loadProject = (
  projectId: string,
  fallbackName?: string,
): WorkspaceProject => {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${projectId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.files) && parsed.files.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load project from localStorage:", e);
  }

  const newProject: WorkspaceProject = {
    id: projectId || crypto.randomUUID(),
    name: fallbackName || "Untitled Project",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: getDefaultFiles(),
  };

  saveProject(newProject);
  return newProject;
};

export const saveProject = (project: WorkspaceProject): void => {
  try {
    const updated = {
      ...project,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${project.id}`,
      JSON.stringify(updated),
    );

    // Update projects metadata list for Dashboard
    const projectsListRaw = localStorage.getItem(PROJECTS_LIST_KEY);
    let projectsList: {
      id: string;
      name: string;
      description: string;
      updatedAt: string;
    }[] = projectsListRaw ? JSON.parse(projectsListRaw) : [];

    const existingIndex = projectsList.findIndex((p) => p.id === project.id);
    const metaItem = {
      id: project.id,
      name: project.name,
      description:
        project.description ||
        `${project.files.length} files • Modified recently`,
      updatedAt: "Just now",
    };

    if (existingIndex >= 0) {
      projectsList[existingIndex] = metaItem;
    } else {
      projectsList.unshift(metaItem);
    }

    localStorage.setItem(PROJECTS_LIST_KEY, JSON.stringify(projectsList));
  } catch (e) {
    console.error("Failed to save project to localStorage:", e);
  }
};

export const getStoredProjectsMeta = () => {
  try {
    const raw = localStorage.getItem(PROJECTS_LIST_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to fetch stored projects metadata:", e);
  }
  return [];
};
