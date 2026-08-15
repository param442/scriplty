import React from "react";
import { X } from "lucide-react";
import type { ProjectFile } from "@/lib/workspace";
import { getFileIcon } from "./FileExplorer";

interface EditorTabsProps {
  openFiles: ProjectFile[];
  activeFileId: string;
  onSelectTab: (fileId: string) => void;
  onCloseTab: (fileId: string, e: React.MouseEvent) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  openFiles,
  activeFileId,
  onSelectTab,
  onCloseTab,
}) => {
  if (openFiles.length === 0) return null;

  return (
    <div className="flex h-10 w-full overflow-x-auto border-b border-slate-800 bg-slate-950/80 text-xs select-none scrollbar-none">
      {openFiles.map((file) => {
        const isActive = file.id === activeFileId;

        return (
          <div
            key={file.id}
            onClick={() => onSelectTab(file.id)}
            className={`group relative flex items-center gap-2 border-r border-slate-800/80 px-3 py-2 cursor-pointer transition-colors max-w-[180px] shrink-0 ${
              isActive
                ? "bg-slate-900 text-white font-semibold"
                : "bg-slate-950 text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
            }`}>
            {/* Active Tab Top Indicator */}
            {isActive && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-violet-500" />
            )}

            {getFileIcon(file.name)}
            <span className="truncate flex-1">{file.name}</span>

            {/* Unsaved indicator dot or close button */}
            <button
              onClick={(e) => onCloseTab(file.id, e)}
              className="rounded p-0.5 text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-colors opacity-70 group-hover:opacity-100">
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EditorTabs;
