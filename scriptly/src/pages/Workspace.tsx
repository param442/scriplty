import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Code2, Play, Share2, Users, Save } from "lucide-react";
import FileExplorer from "@/components/Workspace/FileExplorer";
import EditorTabs from "@/components/Workspace/EditorTabs";
import CodeEditor from "@/components/Workspace/CodeEditor";
import ConsolePanel, { type ConsoleLog } from "@/components/Workspace/ConsolePanel";
import {
  loadProject,
  saveProject,
  getLanguageFromFilename,
  type WorkspaceProject,
  type ProjectFile,
} from "@/lib/workspace";

const Workspace: React.FC = () => {
  const navigate = useNavigate();

  // Get project state passed from navigation history or load default
  const historyState = useMemo(() => {
    const state = window.history.state as
      | { usr?: { project?: { id?: string; name?: string } } }
      | undefined;
    return state?.usr?.project;
  }, []);

  const projectId = historyState?.id || "default-workspace";
  const projectName = historyState?.name || "My Workspace";

  const [project, setProject] = useState<WorkspaceProject>(() =>
    loadProject(projectId, projectName)
  );

  const [openFileIds, setOpenFileIds] = useState<string[]>(() => {
    return project.files.length > 0 ? [project.files[0].id] : [];
  });

  const [activeFileId, setActiveFileId] = useState<string>(() => {
    return project.files.length > 0 ? project.files[0].id : "";
  });

  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(true);
  const [saveNotification, setSaveNotification] = useState<boolean>(false);

  // Auto-save project changes
  const saveProjectState = useCallback((updatedProject: WorkspaceProject) => {
    setProject(updatedProject);
    saveProject(updatedProject);
  }, []);

  // Currently active file object
  const activeFile = useMemo(() => {
    return project.files.find((f) => f.id === activeFileId) || null;
  }, [project.files, activeFileId]);

  // Open files objects for tab bar
  const openFiles = useMemo(() => {
    return openFileIds
      .map((id) => project.files.find((f) => f.id === id))
      .filter((f): f is ProjectFile => Boolean(f));
  }, [project.files, openFileIds]);

  // Handle clicking a file in Explorer
  const handleSelectFile = (fileId: string) => {
    setActiveFileId(fileId);
    if (!openFileIds.includes(fileId)) {
      setOpenFileIds((prev) => [...prev, fileId]);
    }
  };

  // Handle creating a new file
  const handleCreateFile = (filename: string) => {
    const fileExt = filename.includes(".") ? filename : `${filename}.js`;
    const newFile: ProjectFile = {
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: fileExt,
      language: getLanguageFromFilename(fileExt),
      content: fileExt.endsWith(".html")
        ? `<div>Hello from ${fileExt}!</div>`
        : fileExt.endsWith(".css")
        ? `/* Styles for ${fileExt} */`
        : `// ${fileExt}\nconsole.log("Running ${fileExt}");\n`,
    };

    const updatedFiles = [...project.files, newFile];
    const updatedProject = { ...project, files: updatedFiles };
    saveProjectState(updatedProject);

    setOpenFileIds((prev) => [...prev, newFile.id]);
    setActiveFileId(newFile.id);
  };

  // Handle deleting a file
  const handleDeleteFile = (fileId: string) => {
    if (project.files.length <= 1) return;

    const updatedFiles = project.files.filter((f) => f.id !== fileId);
    const updatedProject = { ...project, files: updatedFiles };
    saveProjectState(updatedProject);

    setOpenFileIds((prev) => prev.filter((id) => id !== fileId));

    if (activeFileId === fileId) {
      const remainingOpen = openFileIds.filter((id) => id !== fileId);
      if (remainingOpen.length > 0) {
        setActiveFileId(remainingOpen[remainingOpen.length - 1]);
      } else if (updatedFiles.length > 0) {
        setActiveFileId(updatedFiles[0].id);
        setOpenFileIds([updatedFiles[0].id]);
      }
    }
  };

  // Handle renaming a file
  const handleRenameFile = (fileId: string, newName: string) => {
    const updatedFiles = project.files.map((file) => {
      if (file.id === fileId) {
        return {
          ...file,
          name: newName,
          language: getLanguageFromFilename(newName),
        };
      }
      return file;
    });

    saveProjectState({ ...project, files: updatedFiles });
  };

  // Handle closing a tab
  const handleCloseTab = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedTabs = openFileIds.filter((id) => id !== fileId);
    setOpenFileIds(updatedTabs);

    if (activeFileId === fileId && updatedTabs.length > 0) {
      setActiveFileId(updatedTabs[updatedTabs.length - 1]);
    }
  };

  // Handle content edits in CodeEditor
  const handleContentChange = (newContent: string) => {
    if (!activeFileId) return;

    const updatedFiles = project.files.map((file) => {
      if (file.id === activeFileId) {
        return { ...file, content: newContent };
      }
      return file;
    });

    saveProjectState({ ...project, files: updatedFiles });
  };

  // Manual save trigger notification
  const handleManualSave = () => {
    saveProject(project);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 2000);
  };

  // Execute active JavaScript file and capture output logs
  const handleRunCode = () => {
    setIsConsoleOpen(true);
    const now = new Date().toLocaleTimeString();

    if (!activeFile) {
      setConsoleLogs((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "error",
          message: "No active file selected to run.",
          timestamp: now,
        },
      ]);
      return;
    }

    if (activeFile.language !== "javascript" && activeFile.language !== "typescript") {
      setConsoleLogs((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "info",
          message: `Executing ${activeFile.name} [${activeFile.language}]...`,
          timestamp: now,
        },
        {
          id: crypto.randomUUID(),
          type: "success",
          message: `Preview ready for ${activeFile.name} (${activeFile.content.length} bytes)`,
          timestamp: now,
        },
      ]);
      return;
    }

    const capturedLogs: ConsoleLog[] = [
      {
        id: crypto.randomUUID(),
        type: "info",
        message: `--- Running ${activeFile.name} ---`,
        timestamp: now,
      },
    ];

    try {
      // Safe custom console capture
      const customConsole = {
        log: (...args: unknown[]) => {
          capturedLogs.push({
            id: crypto.randomUUID(),
            type: "log",
            message: args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" "),
            timestamp: new Date().toLocaleTimeString(),
          });
        },
        warn: (...args: unknown[]) => {
          capturedLogs.push({
            id: crypto.randomUUID(),
            type: "warn",
            message: args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" "),
            timestamp: new Date().toLocaleTimeString(),
          });
        },
        error: (...args: unknown[]) => {
          capturedLogs.push({
            id: crypto.randomUUID(),
            type: "error",
            message: args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" "),
            timestamp: new Date().toLocaleTimeString(),
          });
        },
      };

      // Execute code in scoped function wrapper
      const runFn = new Function("console", activeFile.content);
      const result = runFn(customConsole);

      if (result !== undefined) {
        capturedLogs.push({
          id: crypto.randomUUID(),
          type: "success",
          message: `Result: ${typeof result === "object" ? JSON.stringify(result) : result}`,
          timestamp: new Date().toLocaleTimeString(),
        });
      }

      capturedLogs.push({
        id: crypto.randomUUID(),
        type: "success",
        message: `Execution completed successfully.`,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.stack || err.message : String(err);
      capturedLogs.push({
        id: crypto.randomUUID(),
        type: "error",
        message: `Runtime Error: ${errorMessage}`,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    setConsoleLogs((prev) => [...prev, ...capturedLogs]);
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-slate-100 select-none">
      {/* Top IDE Header Navbar */}
      <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 backdrop-blur shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            Dashboard
          </button>

          <div className="h-4 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white shadow-md shadow-violet-600/30">
              <Code2 size={16} />
            </div>
            <h1 className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
              {project.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleManualSave}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Save size={14} className={saveNotification ? "text-emerald-400" : ""} />
            <span>{saveNotification ? "Saved!" : "Save"}</span>
          </button>

          <button className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
            <Users size={14} />
            Invite
          </button>

          <button className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
            <Share2 size={14} />
            Share
          </button>

          <button
            onClick={handleRunCode}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/30 active:scale-95">
            <Play size={14} className="fill-white" />
            Run Code
          </button>
        </div>
      </header>

      {/* Code Editor Main Body Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar File Explorer */}
        <FileExplorer
          files={project.files}
          activeFileId={activeFileId}
          onSelectFile={handleSelectFile}
          onCreateFile={handleCreateFile}
          onDeleteFile={handleDeleteFile}
          onRenameFile={handleRenameFile}
        />

        {/* Main Code Editing & Console Area */}
        <main className="flex flex-1 flex-col overflow-hidden bg-slate-950">
          {/* Top Tabs */}
          <EditorTabs
            openFiles={openFiles}
            activeFileId={activeFileId}
            onSelectTab={setActiveFileId}
            onCloseTab={handleCloseTab}
          />

          {/* Central Code Editor */}
          <CodeEditor file={activeFile} onContentChange={handleContentChange} />

          {/* Bottom Console / Output Panel */}
          <ConsolePanel
            logs={consoleLogs}
            isOpen={isConsoleOpen}
            onToggle={() => setIsConsoleOpen((prev) => !prev)}
            onClear={() => setConsoleLogs([])}
            onRun={handleRunCode}
          />
        </main>
      </div>
    </div>
  );
};

export default Workspace;
