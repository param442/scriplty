import { motion } from "motion/react";
import { ArrowRight, Clock3, FolderKanban, Plus } from "lucide-react";

export type Project = {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
};

type ProjectGridProps = {
  projects: Project[];
  onCreateProject?: () => void;
  onOpenProject?: (id: string) => void;
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

const ProjectGrid = ({
  projects,
  onCreateProject,
  onOpenProject,
}: ProjectGridProps) => {
  if (projects.length === 0) {
    return (
      <section className="py-8 sm:py-16">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-16">
        <FolderKanban className="mx-auto mb-6 h-14 w-14 text-violet-600" />

          <h2 className="text-3xl font-bold text-slate-900">No Projects Yet</h2>

          <p className="mt-3 text-slate-500">
            Create your first collaborative coding project.
          </p>

          <button
            onClick={onCreateProject}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-white">
            <Plus size={18} />
            Create Project
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-10">
      <div className="absolute left-1/2 top-0 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Your Projects</h2>

            <p className="mt-2 text-slate-500">
              Manage and continue working on your projects.
            </p>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{
                y: -8,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
              }}
              onClick={() => onOpenProject?.(project.id)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-violet-400 hover:shadow-xl hover:shadow-violet-200/40">
              <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-3">
                <FolderKanban className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold transition-colors group-hover:text-violet-600">
                {project.name}
              </h3>

              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
                {project.description}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock3 size={15} />
                  {project.updatedAt}
                </div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                  <ArrowRight size={18} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectGrid;
