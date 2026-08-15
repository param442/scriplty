import React, { useState, useRef, useEffect } from "react";
import {
  FilePlus,
  FileCode,
  FileText,
  FileJson,
  Code2,
  Trash2,
  Edit2,
  Check,
  X,
  ChevronRight,
  FolderOpen,
} from "lucide-react";
import type { ProjectFile } from "@/lib/workspace";

interface FileExplorerProps {
  files: ProjectFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  onCreateFile: (filename: string) => void;
  onDeleteFile: (fileId: string) => void;
  onRenameFile: (fileId: string, newName: string) => void;
}

export const getFileIcon = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  switch (ext) {
    case "js":
    case "jsx":
      return <FileCode size={16} className="text-yellow-400 shrink-0" />;
    case "ts":
    case "tsx":
      return <FileCode size={16} className="text-blue-400 shrink-0" />;
    case "html":
      return <Code2 size={16} className="text-orange-400 shrink-0" />;
    case "css":
    case "scss":
      return <FileText size={16} className="text-sky-400 shrink-0" />;
    case "json":
      return <FileJson size={16} className="text-amber-400 shrink-0" />;
    case "md":
      return <FileText size={16} className="text-emerald-400 shrink-0" />;
    case "py":
      return <FileCode size={16} className="text-emerald-400 shrink-0" />;
    default:
      return <FileText size={16} className="text-slate-400 shrink-0" />;
  }
};

const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFileId,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editFileName, setEditFileName] = useState("");
  const newFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreating) {
      newFileInputRef.current?.focus();
    }
  }, [isCreating]);

  useEffect(() => {
    if (editingFileId) {
      editFileInputRef.current?.focus();
    }
  }, [editingFileId]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFileName.trim()) {
      onCreateFile(newFileName.trim());
      setNewFileName("");
      setIsCreating(false);
    }
  };

  const handleRenameSubmit = (e: React.FormEvent, fileId: string) => {
    e.preventDefault();
    if (editFileName.trim()) {
      onRenameFile(fileId, editFileName.trim());
      setEditingFileId(null);
    }
  };

  const startEditing = (file: ProjectFile, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFileId(file.id);
    setEditFileName(file.name);
  };

  return (
    <aside className="w-full h-full bg-slate-900/60 flex flex-col select-none overflow-hidden">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs uppercase tracking-wider">
          <FolderOpen size={15} className="text-violet-400" />
          <span>Explorer</span>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          title="Create New File"
          className="flex items-center gap-1 rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <FilePlus size={16} />
        </button>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        <div className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 font-medium">
          <ChevronRight size={14} className="rotate-90 text-slate-500" />
          <span>src</span>
        </div>

        {files.map((file) => {
          const isActive = file.id === activeFileId;
          const isEditing = file.id === editingFileId;

          return (
            <div
              key={file.id}
              onClick={() => onSelectFile(file.id)}
              className={`group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-all ${
                isActive
                  ? "bg-violet-600/20 text-violet-200 border border-violet-500/30"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}>
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {getFileIcon(file.name)}
                {isEditing ? (
                  <form
                    onSubmit={(e) => handleRenameSubmit(e, file.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 flex-1">
                    <input
                      ref={editFileInputRef}
                      type="text"
                      value={editFileName}
                      onChange={(e) => setEditFileName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setEditingFileId(null);
                      }}
                      className="w-full bg-slate-950 border border-violet-500 rounded px-1.5 py-0.5 text-xs text-white outline-none"
                    />
                    <button
                      type="submit"
                      className="text-emerald-400 hover:text-emerald-300">
                      <Check size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingFileId(null)}
                      className="text-slate-400 hover:text-slate-300">
                      <X size={13} />
                    </button>
                  </form>
                ) : (
                  <span className="truncate">{file.name}</span>
                )}
              </div>

              {!isEditing && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => startEditing(file, e)}
                    title="Rename File"
                    className="p-1 text-slate-400 hover:text-slate-200 rounded">
                    <Edit2 size={12} />
                  </button>
                  {files.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFile(file.id);
                      }}
                      title="Delete File"
                      className="p-1 text-slate-400 hover:text-rose-400 rounded">
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Inline Create File Form */}
        {isCreating && (
          <form
            onSubmit={handleCreateSubmit}
            className="flex items-center gap-1 rounded-lg border border-violet-500 bg-slate-950 px-2 py-1.5 text-xs mt-1">
            <FilePlus size={14} className="text-violet-400 shrink-0" />
            <input
              ref={newFileInputRef}
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="filename.js..."
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsCreating(false);
                  setNewFileName("");
                }
              }}
              className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none text-xs"
            />
            <button
              type="submit"
              className="text-emerald-400 hover:text-emerald-300 p-0.5">
              <Check size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setNewFileName("");
              }}
              className="text-slate-400 hover:text-slate-300 p-0.5">
              <X size={14} />
            </button>
          </form>
        )}
      </div>

      {/* Quick Action Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/80">
        <button
          onClick={() => setIsCreating(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-700 bg-slate-800/40 py-1.5 text-xs font-medium text-slate-300 hover:border-violet-500 hover:bg-violet-600/10 hover:text-violet-300 transition-all">
          <FilePlus size={14} />
          New File
        </button>
      </div>
    </aside>
  );
};

export default FileExplorer;
