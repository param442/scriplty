import { motion } from "motion/react";
import { ChevronRight, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Project = {
  id: string;
  name: string;
  description: string;
  members: number;
  status: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
  onClick: () => void;
};

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const iconStyles = [
    "bg-violet-100 text-violet-600",
    "bg-emerald-100 text-emerald-600",
    "bg-blue-100 text-blue-600",
    "bg-orange-100 text-orange-600",
  ];

  const statusVariant =
    project.status === "Active"
      ? "default"
      : project.status === "Completed"
        ? "secondary"
        : project.status === "In Progress"
          ? "outline"
          : "outline";

  return (
    <motion.div
      whileHover={{
        x: 3,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}>
      <Button
        variant="ghost"
        onClick={onClick}
        className="group flex h-auto w-full items-center justify-start gap-3 rounded-xl p-2 text-left hover:bg-slate-50">
        {/* Project Icon */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
            iconStyles[index % iconStyles.length]
          }`}>
          {project.name.charAt(0).toUpperCase()}
        </div>

        {/* Project Information */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800">
            {project.name}
          </p>

          <p className="truncate text-xs text-slate-500">
            {project.description}
          </p>
        </div>

        {/* Members */}
        <div className="hidden items-center gap-1 text-xs text-slate-500 sm:flex">
          <Users size={13} />

          <span>{project.members}</span>
        </div>

        {/* Status */}
        <Badge
          variant={statusVariant}
          className={
            project.status === "Active"
              ? "border-0 bg-emerald-50 text-emerald-600 hover:bg-emerald-50"
              : project.status === "In Progress"
                ? "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-50"
                : project.status === "On Hold"
                  ? "border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-50"
                  : "border-0 bg-slate-100 text-slate-500 hover:bg-slate-100"
          }>
          <span
            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
              project.status === "Active"
                ? "bg-emerald-500"
                : project.status === "In Progress"
                  ? "bg-blue-500"
                  : project.status === "On Hold"
                    ? "bg-orange-400"
                    : "bg-slate-400"
            }`}
          />

          {project.status}
        </Badge>

        {/* Arrow */}
        <ChevronRight
          size={16}
          className="shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-500"
        />
      </Button>
    </motion.div>
  );
};

export default ProjectCard;
