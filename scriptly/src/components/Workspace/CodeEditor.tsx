import React, { useState, useRef, useEffect } from "react";
import { Copy, Check, Code, FileCode2 } from "lucide-react";
import type { ProjectFile } from "@/lib/workspace";

interface CodeEditorProps {
  file: ProjectFile | null;
  onContentChange: (content: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ file, onContentChange }) => {
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = file ? file.content.split("\n") : [];
  const lineCount = lines.length || 1;

  // Handle cursor position updates
  const handleCursorUpdate = () => {
    if (!textareaRef.current || !file) return;
    const text = textareaRef.current.value;
    const selStart = textareaRef.current.selectionStart;

    const linesUpToCursor = text.substring(0, selStart).split("\n");
    const line = linesUpToCursor.length;
    const col = linesUpToCursor[linesUpToCursor.length - 1].length + 1;

    setCursorPos({ line, col });
  };

  // Sync line numbers scroll with textarea scroll
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Handle Tab key press for proper indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (!textareaRef.current || !file) return;

      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const value = textareaRef.current.value;

      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onContentChange(newValue);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
          handleCursorUpdate();
        }
      }, 0);
    }
  };

  const handleCopy = () => {
    if (!file) return;
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    handleCursorUpdate();
  }, [file?.id, file?.content]);

  if (!file) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-950 p-8 text-center text-slate-500">
        <FileCode2 size={48} className="mb-4 text-slate-700" />
        <h3 className="text-lg font-semibold text-slate-400">No file selected</h3>
        <p className="text-sm text-slate-600 mt-1 max-w-sm">
          Select a file from the explorer sidebar or create a new file to start coding.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-full bg-slate-950 overflow-hidden font-mono">
      {/* Editor Sub-Header Bar */}
      <div className="flex h-9 items-center justify-between border-b border-slate-800/80 bg-slate-900/40 px-4 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Code size={14} className="text-violet-400" />
          <span className="font-sans font-medium text-slate-200">{file.name}</span>
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

      {/* Main Textarea with Line Numbers */}
      <div className="relative flex flex-1 overflow-hidden bg-slate-950 text-slate-100">
        {/* Line Numbers Column */}
        <div
          ref={lineNumbersRef}
          className="w-12 select-none overflow-hidden border-r border-slate-800/60 bg-slate-900/20 py-3 text-right pr-3 font-mono text-xs text-slate-600 leading-6">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div
              key={i + 1}
              className={i + 1 === cursorPos.line ? "text-violet-400 font-bold" : ""}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={file.content}
          onChange={(e) => onContentChange(e.target.value)}
          onScroll={handleScroll}
          onKeyUp={handleCursorUpdate}
          onClick={handleCursorUpdate}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="flex-1 resize-none bg-transparent p-3 font-mono text-xs text-slate-100 leading-6 outline-none scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent selection:bg-violet-600/40"
        />
      </div>

      {/* Editor Status Bar */}
      <div className="flex h-6 items-center justify-between border-t border-slate-800/80 bg-slate-900/80 px-4 text-[11px] font-sans text-slate-400 select-none">
        <div className="flex items-center gap-4">
          <span className="text-violet-400 font-medium">{file.language.toUpperCase()}</span>
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
