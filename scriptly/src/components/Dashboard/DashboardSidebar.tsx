import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  Code2,
  Folder,
  Home,
  MessageCircle,
  Plus,
  Settings,
  UserPlus,
} from "lucide-react";

import type { AuthUser } from "@/lib/utils";

type SidebarProject = {
  id: string;
  name: string;
};

type DashboardSidebarProps = {
  user: AuthUser | null;
  projects: SidebarProject[];
  onOpenProject: (id: string) => void;
  onCreateProject: () => void;
  MessageHandler: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  onOpenProjects: () => void;
};

const DashboardSidebar = ({
  user,
  projects,
  onOpenProject,
  onCreateProject,
  MessageHandler,
  onOpenSettings,
  onOpenProjects,
}: DashboardSidebarProps) => {
  return (
    <motion.aside
      initial={{
        x: -40,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="fixed inset-y-0 left-0 z-40 hidden w-[245px] flex-col bg-[#07172b] text-white lg:flex">
      {/* ================================================= */}
      {/* LOGO */}
      {/* ================================================= */}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex h-[82px] items-center px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
            <Code2 size={31} strokeWidth={2.5} className="text-[#ffdb2a]" />
          </div>

          <div className="text-left">
            <h1 className="text-[24px] font-bold tracking-tight">Scriptly</h1>

            <p className="text-[10px] text-slate-400">Collaborative Coding</p>
          </div>
        </div>
      </motion.button>

      {/* ================================================= */}
      {/* NAVIGATION */}
      {/* ================================================= */}

      <nav className="flex-1 px-4">
        <SidebarItem icon={<Home size={20} />} label="Dashboard" active />

        <SidebarItem
          onClick={onOpenProjects}
          icon={<Folder size={20} />}
          label="Projects"
        />

        <SidebarItem icon={<BriefcaseBusiness size={20} />} label="Workplace" />

        <SidebarItem icon={<UserPlus size={20} />} label="Invites" />

        <SidebarItem
          icon={<MessageCircle size={20} />}
          label="Messages"
          badge={3}
          onClick={MessageHandler}
        />

        <SidebarItem
          icon={<Settings size={20} />}
          label="Settings"
          onClick={onOpenSettings}
        />

        {/* ================================================= */}
        {/* YOUR PROJECTS */}
        {/* ================================================= */}

        <div className="mt-8">
          <div className="flex items-center justify-between px-3">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-500">
              YOUR PROJECTS
            </p>

            <button
              onClick={onCreateProject}
              className="text-slate-500 transition hover:text-white">
              <Plus size={15} />
            </button>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            }}
            className="mt-3 space-y-1">
            {projects.length > 0 ? (
              projects.slice(0, 6).map((project, index) => (
                <motion.button
                  key={project.id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -10,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                    },
                  }}
                  whileHover={{
                    x: 4,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() => onOpenProject(project.id)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left">
                  <ProjectIcon name={project.name} index={index} />

                  <span className="truncate text-sm text-slate-300">
                    {project.name}
                  </span>
                </motion.button>
              ))
            ) : (
              <p className="px-3 py-2 text-xs text-slate-500">
                No projects yet
              </p>
            )}

            {/* New Project */}
            <motion.button
              whileHover={{
                x: 4,
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={onCreateProject}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-dashed border-slate-600">
                <Plus size={16} />
              </div>
              New Project
            </motion.button>
          </motion.div>
        </div>
      </nav>

      {/* ================================================= */}
      {/* BOTTOM USER */}
      {/* ================================================= */}

      <div className="border-t border-white/10 p-4">
        <motion.div
          whileHover={{
            y: -2,
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
          className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/5 p-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white">
            {getInitials(user?.name)}
          </div>

          {/* User info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {user?.name || "Developer"}
            </p>

            <p className="truncate text-xs text-slate-400">
              {user?.email || ""}
            </p>
          </div>

          {/* Status */}
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </motion.div>
      </div>
    </motion.aside>
  );
};

/* =========================================================== */
/* SIDEBAR ITEM */
/* =========================================================== */

const SidebarItem = ({
  icon,
  label,
  active = false,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      initial={{
        opacity: 0,
        x: -10,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      whileHover={{
        x: active ? 0 : 4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={`mb-1 flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left transition ${
        active
          ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-900/20"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}>
      <span className="flex h-5 w-5 items-center justify-center">{icon}</span>

      <span className="flex-1 text-sm font-medium">{label}</span>

      {badge !== undefined && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-1.5 text-[10px] font-semibold">
          {badge}
        </span>
      )}
    </motion.button>
  );
};

/* =========================================================== */
/* PROJECT ICON */
/* =========================================================== */

const ProjectIcon = ({ name, index }: { name: string; index: number }) => {
  const styles = [
    "bg-violet-500/15 text-violet-300",
    "bg-emerald-500/15 text-emerald-300",
    "bg-blue-500/15 text-blue-300",
    "bg-orange-500/15 text-orange-300",
  ];

  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
        styles[index % styles.length]
      }`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

/* =========================================================== */
/* INITIALS */
/* =========================================================== */

const getInitials = (name?: string | null) => {
  if (!name) return "D";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

export default DashboardSidebar;
