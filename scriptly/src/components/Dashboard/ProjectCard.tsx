import { motion } from "motion/react";
import { ArrowRight, Clock3, FolderKanban, Users } from "lucide-react";

type ProjectCardProps = {
  name: string;
  description: string;
  updatedAt: string;
  members?: number;
  onOpen?: () => void;
};

const ProjectCard = ({
  name,
  description,
  updatedAt,
  members = 1,
  onOpen,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100">
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg">
        <FolderKanban size={26} />
      </div>

      {/* Content */}
      <div className="mt-5 space-y-2">
        <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-violet-600">
          {name}
        </h3>

        <p className="line-clamp-2 text-sm text-slate-500">{description}</p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="space-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Clock3 size={14} />
            Updated {updatedAt}
          </div>

          <div className="flex items-center gap-2">
            <Users size={14} />
            {members} Member{members > 1 ? "s" : ""}
          </div>
        </div>

        <motion.div
          whileHover={{ x: 4 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 transition group-hover:bg-violet-600 group-hover:text-white">
          <ArrowRight size={18} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
