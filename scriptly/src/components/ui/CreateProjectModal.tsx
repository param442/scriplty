import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { FolderPlus, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  const [projectName, setProjectName] = useState("New Project");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setProjectName("New Project");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCreate = () => {
    const trimmedName = projectName.trim() || "Untitled Project";
    const project = {
      id: crypto.randomUUID(),
      name: trimmedName,
      createdAt: new Date().toISOString(),
    };

    onClose();
    navigate("/workspace", {
      state: {
        project,
      },
    });
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[9998] bg-slate-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            key="modal"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 to-indigo-600" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20">
                  <FolderPlus size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Create New Project
                  </h2>
                  <p className="text-xs text-slate-500">
                    Enter a name for your workspace
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="project-name-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Project Name
                  </label>
                  <input
                    id="project-name-input"
                    ref={inputRef}
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCreate();
                      if (e.key === "Escape") onClose();
                    }}
                    placeholder="e.g. E-Commerce Dashboard"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-600/10"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
                  Cancel
                </button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreate}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-600/25 hover:shadow-lg hover:shadow-violet-600/35 transition-all">
                  Create Project
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CreateProjectModal;
