import { motion } from "motion/react";
import {
  Code2,
  FolderKanban,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import type { AuthUser } from "@/lib/utils";

import DashboardStatCard from "./DashboardStatCard";

type DashboardHeroProps = {
  user: AuthUser | null;
  projectCount: number;
  onCreateProject: () => void;
};

const DashboardHero = ({ user, projectCount }: DashboardHeroProps) => {
  const firstName = user?.name?.split(" ")[0] || "Developer";

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
        duration: 0.5,
        ease: "easeOut",
      }}>
      <Card className="relative overflow-hidden border-indigo-100 bg-gradient-to-br from-white via-indigo-50/40 to-violet-50/60 shadow-sm">
        <div className="relative p-6 sm:p-7">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-400/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl" />

          {/* Main content */}
          <div className="relative z-10">
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.1,
              }}>
              <p className="text-sm font-medium text-indigo-600">
                Your workspace
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-[27px]">
                Welcome back, {firstName} 👋
              </h1>

              <p className="mt-1 max-w-lg text-sm text-slate-500">
                Here's what's happening with your projects and team today.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
              {[
                {
                  icon: <FolderKanban size={22} />,
                  value: projectCount,
                  label: "Total Projects",
                },
                {
                  icon: <Users size={22} />,
                  value: "14",
                  label: "Team Members",
                },
                {
                  icon: <MessageSquare size={22} />,
                  value: "28",
                  label: "Messages",
                },
                {
                  icon: <TrendingUp size={22} />,
                  value: "92%",
                  label: "Productivity",
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 15,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}>
                  <DashboardStatCard
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Code Window */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute right-7 top-7 hidden h-[175px] w-[285px] rounded-2xl bg-[#101b33] p-5 shadow-2xl xl:block">
            {/* Window controls */}
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>

            {/* Code lines */}
            <div className="mt-6 space-y-3">
              <CodeLine width={72} color="bg-orange-400" delay={0.55} />

              <CodeLine width={145} color="bg-indigo-400" delay={0.65} />

              <CodeLine width={92} color="bg-yellow-400" delay={0.75} />

              <CodeLine width={175} color="bg-slate-500" delay={0.85} />

              <CodeLine width={115} color="bg-purple-400" delay={0.95} />
            </div>

            {/* Floating icon */}
            <motion.div
              animate={{
                y: [-3, 3, -3],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -right-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-xl">
              <Code2 size={29} />
            </motion.div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

const CodeLine = ({
  width,
  color,
  delay,
}: {
  width: number;
  color: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{
        width: 0,
        opacity: 0,
      }}
      animate={{
        width,
        opacity: 1,
      }}
      transition={{
        duration: 0.45,
        delay,
        ease: "easeOut",
      }}
      className={`h-2 rounded-full ${color}`}
    />
  );
};

export default DashboardHero;
