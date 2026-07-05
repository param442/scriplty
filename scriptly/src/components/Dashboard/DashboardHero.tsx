import { motion } from "motion/react";
import { FolderKanban, Plus } from "lucide-react";
import ScrollRevealHeading, { PopWord } from "./ScrollRevealHeading";

type DashboardHeroProps = {
  userName: string;
  projectCount: number;
  onCreateProject?: () => void;
};

const DashboardHero = ({
  userName,
  projectCount,
  onCreateProject,
}: DashboardHeroProps) => {
  const headingWords = ["Hi,", userName];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
      <motion.div
        className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
        animate={{ x: [0, 12, 0], y: [0, -16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl"
        animate={{ x: [0, -10, 0], y: [0, 14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-3">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
            👋 Welcome Back
          </motion.span>

          <ScrollRevealHeading className="text-4xl font-bold tracking-tight sm:text-5xl">
            {headingWords.map((word, i) => (
              <PopWord
                key={word}
                word={word}
                index={i}
                className={
                  i === 1
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
                    : "text-slate-900"
                }
              />
            ))}
          </ScrollRevealHeading>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="max-w-xl text-slate-500">
            Manage your coding projects, collaborate with your team, and keep
            everything organized in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
              <FolderKanban className="h-5 w-5 text-violet-600" />
              <span className="text-sm font-medium text-slate-700">
                {projectCount} Project{projectCount !== 1 ? "s" : ""}
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCreateProject}
            className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-400/40">
            <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            <span className="font-semibold">Create New Project</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardHero;
