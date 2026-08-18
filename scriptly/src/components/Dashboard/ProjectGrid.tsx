import { motion } from "motion/react";
import { Plus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

// import { Badge } from "@/components/ui/badge";

import type { DashboardProject } from "@/pages/Dashboard";

import ProjectCard from "./ProjectCard";

type ProjectGridProps = {
  projects: DashboardProject[];
  onOpenProject: (id: string) => void;
  onCreateProject: () => void;
};

type DisplayProject = {
  id: string;
  name: string;
  description: string;
  members: number;
  status: string;
};

const ProjectGrid = ({
  projects,
  onOpenProject,
  onCreateProject,
}: ProjectGridProps) => {
  /*
   * Demo projects for dashboard preview.
   *
   * Later you can replace this with
   * projects coming directly from your backend.
   */
  const displayProjects: DisplayProject[] = [
    {
      id: "scriptly",
      name: "Scriptly Web App",
      description: "Collaborative code editor",
      members: 5,
      status: "Active",
    },
    {
      id: "ecommerce",
      name: "E-Commerce Platform",
      description: "Full stack application",
      members: 4,
      status: "In Progress",
    },
    {
      id: "task-manager",
      name: "Task Manager",
      description: "Task management application",
      members: 3,
      status: "On Hold",
    },
    {
      id: "ai-chat",
      name: "AI Chat Interface",
      description: "AI powered chat application",
      members: 2,
      status: "Active",
    },
    {
      id: "portfolio",
      name: "Portfolio Website",
      description: "Personal portfolio website",
      members: 1,
      status: "Completed",
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
                Recent Projects
              </CardTitle>

              <p className="mt-1 text-xs text-slate-500">
                Your latest active projects
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
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
                  staggerChildren: 0.07,
                },
              },
            }}
            className="space-y-1">
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.id}
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
                  x: 4,
                }}
                transition={{
                  duration: 0.2,
                }}>
                <ProjectCard
                  project={project}
                  index={index}
                  onClick={() => {
                    /*
                     * Find the actual project from
                     * your stored projects.
                     */
                    const actualProject = projects.find(
                      (item) => item.name === project.name,
                    );

                    if (actualProject) {
                      onOpenProject(actualProject.id);
                    }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* ================================================= */}
          {/* CREATE PROJECT */}
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
              onClick={onCreateProject}
              variant="outline"
              className="h-10 w-full border-indigo-200 text-sm font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
              <Plus size={17} />
              New Project
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectGrid;
