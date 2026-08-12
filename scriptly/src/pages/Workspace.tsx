import { useMemo } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Code2, Play, Share2, Users } from "lucide-react";

const Workspace = () => {
  const project = useMemo(() => {
    const state = window.history.state as
      | { usr?: { project?: { name?: string } } }
      | undefined;
    return state?.usr?.project;
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      {/* Top Navbar */}
      <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            Dashboard
          </button>

          <div className="h-4 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white">
              <Code2 size={16} />
            </div>
            <h1 className="text-sm font-semibold text-white">
              {project?.name || "Untitled Workspace"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
            <Users size={14} />
            Invite
          </button>

          <button className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
            <Share2 size={14} />
            Share
          </button>

          <button className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30">
            <Play size={14} />
            Run
          </button>
        </div>
      </header>

      {/* Editor & Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Files
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li className="flex items-center gap-2 rounded-lg bg-violet-600/20 px-3 py-2 text-violet-300 font-medium">
              <span>📄</span> index.ts
            </li>
            <li className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-800/50 transition-colors cursor-pointer">
              <span>📄</span> styles.css
            </li>
            <li className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-800/50 transition-colors cursor-pointer">
              <span>📄</span> package.json
            </li>
          </ul>
        </aside>

        {/* Main Canvas */}
        <main className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-slate-950">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Code2 size={28} />
            </div>

            <h3 className="text-xl font-bold text-white">
              {project?.name || "Workspace Ready"}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Your real-time collaborative workspace is ready. Start writing
              code or invite team members to join.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Workspace;
