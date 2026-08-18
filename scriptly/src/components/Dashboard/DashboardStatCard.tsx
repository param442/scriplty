import { motion } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";

type DashboardStatCardProps = {
  icon: React.ReactNode;
  value: string | number;
  label: string;
};

const DashboardStatCard = ({ icon, value, label }: DashboardStatCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.99,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}>
      <Card className="border-slate-200/80 bg-white/90 shadow-sm transition-shadow duration-200 hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <motion.div
              whileHover={{
                rotate: 5,
                scale: 1.08,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              {icon}
            </motion.div>

            {/* Content */}
            <div className="min-w-0">
              <motion.p
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.25,
                }}
                className="text-2xl font-bold tracking-tight text-slate-900">
                {value}
              </motion.p>

              <p className="truncate text-xs font-medium text-slate-500">
                {label}
              </p>
            </div>
          </div>

          {/* Accent */}
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: "24px",
            }}
            transition={{
              duration: 0.4,
              delay: 0.4,
            }}
            className="mt-3 h-0.5 rounded-full bg-indigo-500/40"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardStatCard;
