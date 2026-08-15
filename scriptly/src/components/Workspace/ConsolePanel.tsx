import React from "react";
import { Terminal, Trash2, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Play } from "lucide-react";

export interface ConsoleLog {
  id: string;
  type: "log" | "info" | "warn" | "error" | "success";
  message: string;
  timestamp: string;
}

interface ConsolePanelProps {
  logs: ConsoleLog[];
  isOpen: boolean;
  onToggle: () => void;
  onClear: () => void;
  onRun: () => void;
}

const ConsolePanel: React.FC<ConsolePanelProps> = ({
  logs,
  isOpen,
  onToggle,
  onClear,
  onRun,
}) => {
  return (
    <div
      className={`border-t border-slate-800 bg-slate-950 font-mono transition-all duration-200 flex flex-col ${
        isOpen ? "h-56" : "h-9"
      }`}>
      {/* Console Header Bar */}
      <div className="flex h-9 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 text-xs font-sans select-none shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 font-medium text-slate-300 hover:text-white transition-colors">
            <Terminal size={14} className="text-violet-400" />
            <span>Console / Output</span>
            {logs.length > 0 && (
              <span className="rounded-full bg-violet-600/30 px-2 py-0.5 text-[10px] text-violet-300 font-semibold">
                {logs.length}
              </span>
            )}
            {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            title="Run Code"
            className="flex items-center gap-1.5 rounded-md bg-emerald-600/20 px-2.5 py-1 text-xs font-medium text-emerald-300 hover:bg-emerald-600/30 transition-colors border border-emerald-500/30">
            <Play size={13} className="fill-emerald-300" />
            <span>Run</span>
          </button>

          <button
            onClick={onClear}
            title="Clear Console"
            className="flex items-center gap-1 rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Logs View Area */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-3 text-xs space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
          {logs.length === 0 ? (
            <div className="flex h-full items-center justify-center text-slate-600 font-sans italic">
              Console output is empty. Click "Run" to execute your code.
            </div>
          ) : (
            logs.map((log) => {
              let textStyle = "text-slate-300";
              let icon = null;

              if (log.type === "error") {
                textStyle = "text-rose-400";
                icon = <AlertCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />;
              } else if (log.type === "success") {
                textStyle = "text-emerald-400";
                icon = <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />;
              } else if (log.type === "warn") {
                textStyle = "text-amber-300";
              }

              return (
                <div
                  key={log.id}
                  className="flex items-start gap-2 rounded px-2 py-1 bg-slate-900/40 hover:bg-slate-900/80 transition-colors border border-slate-800/40 font-mono">
                  <span className="text-[10px] text-slate-600 font-sans shrink-0 mt-0.5">
                    [{log.timestamp}]
                  </span>
                  {icon}
                  <pre className={`whitespace-pre-wrap break-all ${textStyle}`}>
                    {log.message}
                  </pre>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ConsolePanel;
