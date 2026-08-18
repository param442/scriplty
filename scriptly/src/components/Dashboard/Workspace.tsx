import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  ChevronRight,
  FolderKanban,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type WorkspacesProps = {
  onOpenWorkspace: () => void;
};

type Workspace = {
  id: string;
  name: string;
  members: number;
  projects: number;
  initials: string;
};

const Workspaces = ({ onOpenWorkspace }: WorkspacesProps) => {
  const workspaces: Workspace[] = [
    {
      id: "scriptly",
      name: "Scriptly Inc.",
      members: 12,
      projects: 8,
      initials: "SI",
    },
    {
      id: "personal",
      name: "Personal Workspace",
      members: 2,
      projects: 3,
      initials: "PW",
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: 0.28,
        ease: "easeOut",
      }}>
      <Card className="h-full border-slate-200/80 bg-white shadow-sm">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[15px] font-bold">
                Your Workspaces
              </CardTitle>

              <p className="mt-1 text-xs text-slate-500">
                Manage your teams and projects
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
              View all
            </Button>
          </div>
        </CardHeader>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <CardContent className="pt-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="space-y-2">
            {workspaces.map((workspace) => (
              <motion.div
                key={workspace.id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 12,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                whileHover={{
                  y: -2,
                }}
                className="group rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-indigo-100 hover:bg-indigo-50/30">
                <div className="flex items-center gap-3">
                  {/* Workspace avatar */}
                  <Avatar className="h-11 w-11 rounded-xl">
                    <AvatarFallback className="rounded-xl bg-indigo-100 text-xs font-bold text-indigo-600">
                      {workspace.initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Workspace info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {workspace.name}
                    </p>

                    <div className="mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[10px] text-slate-500">
                        <Users size={11} />
                        {workspace.members} members
                      </span>

                      <span className="flex items-center gap-1 text-[10px] text-slate-500">
                        <FolderKanban size={11} />
                        {workspace.projects} projects
                      </span>
                    </div>
                  </div>

                  {/* Open */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onOpenWorkspace}
                    className="h-8 shrink-0 rounded-lg border-slate-200 bg-white px-3 text-xs text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
                    Open
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ================================================= */}
          {/* WORKPLACE BUTTON */}
          {/* ================================================= */}

          <motion.div
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="mt-4">
            <Button
              onClick={onOpenWorkspace}
              className="h-11 w-full rounded-xl bg-indigo-50 text-indigo-600 shadow-none hover:bg-indigo-100 hover:text-indigo-700">
              <BriefcaseBusiness size={17} />
              Go to Workplace
              <ChevronRight size={16} className="ml-auto" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Workspaces;
