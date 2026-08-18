import { motion } from "motion/react";
import { Code2, GitCommit, MessageCircle, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type ActivityMetric = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const ActivityOverview = () => {
  const values = [18, 28, 26, 35, 60, 50, 47, 52, 60, 75, 82, 73];

  const metrics: ActivityMetric[] = [
    {
      icon: <Code2 size={16} />,
      value: "124",
      label: "Code Changes",
    },
    {
      icon: <GitCommit size={16} />,
      value: "56",
      label: "Commits",
    },
    {
      icon: <MessageCircle size={16} />,
      value: "28",
      label: "Messages",
    },
    {
      icon: <Users size={16} />,
      value: "12",
      label: "Pull Requests",
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
        delay: 0.08,
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
                Activity Overview
              </CardTitle>

              <p className="mt-1 text-xs text-slate-500">
                Your team's activity this week
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-lg border-slate-200 px-3 text-xs font-medium">
              This Week
            </Button>
          </div>
        </CardHeader>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <CardContent className="pt-0">
          {/* Chart */}
          <div className="relative h-[205px]">
            {/* Y Axis */}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[9px] text-slate-400">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {/* Grid */}
            <div className="absolute inset-0 ml-7 flex flex-col justify-between">
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
                  className="border-t border-dashed border-slate-100"
                />
              ))}
            </div>

            {/* Bars */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.045,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="relative ml-8 flex h-full items-end gap-2 border-b border-slate-200 px-1">
              {values.map((height, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: {
                      height: 0,
                      opacity: 0,
                    },
                    visible: {
                      height: `${height}%`,
                      opacity: 1,
                    },
                  }}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scaleY: 1.04,
                  }}
                  className="relative flex-1 rounded-t-md bg-gradient-to-t from-indigo-500/80 to-violet-400/50">
                  {/* Highlight */}
                  <div className="absolute inset-x-0 top-0 h-1 rounded-full bg-white/30" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* X Axis */}
          <div className="ml-8 mt-2 flex justify-between px-1 text-[9px] text-slate-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* ================================================= */}
          {/* METRICS */}
          {/* ================================================= */}

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.45 + index * 0.07,
                }}
                whileHover={{
                  y: -2,
                }}
                className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center transition-colors hover:bg-indigo-50/50">
                <div className="mb-1 flex justify-center text-indigo-500">
                  {metric.icon}
                </div>

                <p className="text-sm font-bold text-slate-800">
                  {metric.value}
                </p>

                <p className="mt-0.5 truncate text-[9px] font-medium text-slate-500">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActivityOverview;
