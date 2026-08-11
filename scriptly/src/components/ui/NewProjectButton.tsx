import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";

const NewProjectButton = () => {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("New Project");
  const navigate = useNavigate();

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
        <Plus size={18} />
        New Project
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="overlay"
                className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />

              <motion.div
                key="modal"
                className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Create Project
                  </h2>

                  <input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-5 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500"
                  />

                  <button
                    onClick={() => {
                      const project = {
                        id: crypto.randomUUID(),
                        name: projectName,
                      };

                      navigate("/workspace", {
                        state: {
                          project,
                        },
                      });

                      setOpen(false);
                    }}
                    className="mt-5 rounded-xl bg-violet-600 px-5 py-2 text-white">
                    Create
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default NewProjectButton;
