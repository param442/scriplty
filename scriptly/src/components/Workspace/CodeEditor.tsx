import React, { useState, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { Copy, Check, Code, FileCode2 } from "lucide-react";
import type { ProjectFile } from "@/lib/workspace";
import type * as monaco from "monaco-editor";

interface CodeEditorProps {
  file: ProjectFile | null;
  onContentChange: (content: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ file, onContentChange }) => {
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;

    // Track cursor position changes in Monaco
    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({
        line: e.position.lineNumber,
        col: e.position.column,
      });
    });
  };

  const handleCopy = () => {
    if (!file) return;
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!file) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-950 p-8 text-center text-slate-500">
        <FileCode2 size={48} className="mb-4 text-slate-700" />
        <h3 className="text-lg font-semibold text-slate-400">
          No file selected
        </h3>
        <p className="text-sm text-slate-600 mt-1 max-w-sm">
          Select a file from the explorer sidebar or create a new file to start
          coding.
        </p>
      </div>
    );
  }

  // Map workspace languages to Monaco language IDs
  const getMonacoLanguage = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "js":
      case "javascript":
        return "javascript";
      case "ts":
      case "typescript":
        return "typescript";
      case "html":
        return "html";
      case "css":
        return "css";
      case "json":
        return "json";
      case "markdown":
      case "md":
        return "markdown";
      case "python":
      case "py":
        return "python";
      case "sql":
        return "sql";
      default:
        return "plaintext";
    }
  };

  return (
    <div className="flex flex-1 min-h-0 min-w-0 flex-col h-full w-full bg-slate-950 overflow-hidden font-mono">
      {/* Editor Sub-Header Bar */}
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-900/40 px-4 text-xs select-none">
        <div className="flex items-center gap-2 text-slate-400">
          <Code size={14} className="text-violet-400" />
          <span className="font-sans font-medium text-slate-200">
            {file.name}
          </span>
          <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-violet-300 font-mono uppercase">
            {file.language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Copy Code"
            className="flex items-center gap-1.5 rounded bg-slate-800/60 px-2.5 py-1 font-sans text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Code Editor Instance */}
      <div className="flex-1 min-h-0 min-w-0 w-full h-full overflow-hidden bg-slate-950">
        <Editor
          height="100%"
          width="100%"
          language={getMonacoLanguage(file.language)}
          value={file.content}
          theme="vs-dark"
          onChange={(val) => onContentChange(val || "")}
          onMount={handleEditorMount}
          options={{
            fontSize: 13,
            fontFamily:
              "'Fira Code', 'JetBrains Mono', 'Menlo', 'Monaco', monospace",
            fontLigatures: true,
            minimap: { enabled: true },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
            lineNumbers: "on",
            smoothScrolling: true,
            cursorBlinking: "smooth",
            tabSize: 2,
            wordWrap: "on",
            renderLineHighlight: "all",
            bracketPairColorization: { enabled: true },
            formatOnType: true,
            formatOnPaste: true,
          }}
        />
      </div>

      {/* Editor Status Bar */}
      <div className="flex h-6 shrink-0 items-center justify-between border-t border-slate-800/80 bg-slate-900/80 px-4 text-[11px] font-sans text-slate-400 select-none">
        <div className="flex items-center gap-4">
          <span className="text-violet-400 font-medium">
            {file.language.toUpperCase()}
          </span>
          <span>UTF-8</span>
          <span>Spaces: 2</span>
        </div>

        <div className="flex items-center gap-4">
          <span>
            Ln {cursorPos.line}, Col {cursorPos.col}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Saved
          </span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
