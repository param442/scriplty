import { motion } from "motion/react";
import {
  Activity,
  Code2,
  GitBranch,
  GitCommit,
  Layers3,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectOverviewProps = {
  memberCount: number;
  projectType: string;
  status?: "active" | "paused" | "archived";
  language?: string;
  branch?: string;
  commits?: number;
};

const ProjectOverview = ({
  memberCount,
  projectType,
  status = "active",
  language = "TypeScript",
  branch = "main",
  commits = 128,
}: ProjectOverviewProps) => {
  const statusConfig = {
    active: {
      label: "Active",
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    },

    paused: {
      label: "Paused",
      className: "border-amber-200 bg-amber-50 text-amber-700",
      dot: "bg-amber-500",
    },

    archived: {
      label: "Archived",
      className: "border-slate-200 bg-slate-50 text-slate-600",
      dot: "bg-slate-400",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card className="h-full rounded-2xl border-slate-200/80 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity size={20} className="text-indigo-600" />
          Project Overview
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* =================================================
            STATUS
        ================================================= */}

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Status</span>

          <Badge variant="outline" className={currentStatus.className}>
            <span
              className={`mr-1.5 h-1.5 w-1.5 rounded-full ${currentStatus.dot}`}
            />

            {currentStatus.label}
          </Badge>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <OverviewStat
            icon={<Users size={17} />}
            label="Members"
            value={memberCount}
          />

          <OverviewStat
            icon={<GitCommit size={17} />}
            label="Commits"
            value={commits}
          />

          <OverviewStat
            icon={<Code2 size={17} />}
            label="Language"
            value={language}
          />

          <OverviewStat
            icon={<GitBranch size={17} />}
            label="Branch"
            value={branch}
          />
        </div>

        {/* =================================================
            PROJECT TYPE
        ================================================= */}

        <motion.div
          whileHover={{
            y: -1,
          }}
          className="
            mt-4
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-3
          ">
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white
              text-indigo-600
              shadow-sm
            ">
            <Layers3 size={18} />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Project type
            </p>

            <p className="truncate text-sm font-semibold text-slate-800">
              {projectType}
            </p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

/* =========================================================
   STAT
========================================================= */

type OverviewStatProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

const OverviewStat = ({ icon, label, value }: OverviewStatProps) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.15,
      }}
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-3
        transition-colors
        hover:bg-slate-50
      ">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="truncate text-xs">{label}</span>
      </div>

      <p className="mt-2 truncate text-base font-bold text-slate-900">
        {value}
      </p>
    </motion.div>
  );
};

export default ProjectOverview;
