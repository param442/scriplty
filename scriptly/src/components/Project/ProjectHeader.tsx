import { motion } from "motion/react";
import { BriefcaseBusiness, CalendarDays, Code2, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProjectHeaderProps = {
  name: string;
  description: string;
  type: string;
  createdAt: string;
  createdBy: string;
  onOpenWorkspace: () => void;
};

const ProjectHeader = ({
  name,
  description,
  type,
  createdAt,
  createdBy,
  onOpenWorkspace,
}: ProjectHeaderProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl border-slate-200/80 shadow-sm">
      <CardContent className="flex flex-col gap-6 p-[clamp(1rem,2vmin,2rem)] lg:flex-row lg:items-center lg:justify-between">
        {/* Project information */}

        <div className="flex min-w-0 items-center gap-4 sm:gap-5">
          <motion.div
            whileHover={{
              scale: 1.04,
              rotate: -2,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              flex
              h-[clamp(68px,9vmin,100px)]
              w-[clamp(68px,9vmin,100px)]
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-blue-950
              to-indigo-700
              text-yellow-400
              shadow-lg
            ">
            <Code2 size={42} strokeWidth={2} />
          </motion.div>

          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {name}
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {description}
            </p>

            <Badge
              variant="secondary"
              className="mt-3 border-0 bg-indigo-50 text-indigo-700">
              {type}
            </Badge>
          </div>
        </div>

        {/* Project metadata */}

        <div className="flex flex-col gap-5 lg:min-w-[350px]">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-start gap-2.5">
              <CalendarDays
                size={18}
                className="mt-0.5 shrink-0 text-slate-500"
              />

              <div>
                <p className="text-xs text-slate-400">Created on</p>

                <p className="text-sm font-medium text-slate-900">
                  {createdAt}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users size={18} className="mt-0.5 shrink-0 text-slate-500" />

              <div>
                <p className="text-xs text-slate-400">Created by</p>

                <p className="text-sm font-medium text-slate-900">
                  {createdBy}
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={onOpenWorkspace}
            className="
              h-11
              w-full
              rounded-xl
              bg-blue-600
              text-white
              shadow-sm
              transition-all
              hover:bg-blue-700
              hover:shadow-md
            ">
            <BriefcaseBusiness size={18} />
            Go to Workplace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectHeader;
