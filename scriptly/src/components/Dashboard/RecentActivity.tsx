import { motion } from "motion/react";
import {
  ChevronRight,
  Code2,
  GitCommit,
  MessageCircle,
  Plus,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

type ActivityItem = {
  id: number;
  type: "commit" | "pull-request" | "message" | "code";
  user: string;
  initials: string;
  action: string;
  project: string;
  time: string;
};

const RecentActivity = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: "commit",
      user: "Amanpreet Kaur",
      initials: "AK",
      action: "committed 3 changes to main",
      project: "Scriptly Web App",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "pull-request",
      user: "Rohit Sharma",
      initials: "RS",
      action: "created a new pull request",
      project: "Task Manager",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "message",
      user: "Simran Kaur",
      initials: "SK",
      action: "sent a message in #ui-design",
      project: "Scriptly Web App",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "code",
      user: "Harpreet Singh",
      initials: "HS",
      action: "pushed 2 commits to develop",
      project: "E-Commerce Platform",
      time: "2 hours ago",
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
        delay: 0.22,
        ease: "easeOut",
      }}>
      <Card className="border-slate-200/80 bg-white shadow-sm">
        {/* Header */}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[15px] font-bold">
                Recent Activity
              </CardTitle>

              <p className="mt-1 text-xs text-slate-500">
                Latest updates from your team
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

        {/* Activity list */}
        <CardContent className="pt-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="divide-y divide-slate-100">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
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
                  x: 3,
                }}
                className="group flex items-center gap-3 py-4">
                {/* Avatar */}
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-slate-100 text-xs font-semibold text-slate-600">
                    {activity.initials}
                  </AvatarFallback>
                </Avatar>

                {/* Activity icon */}
                <ActivityIcon type={activity.type} />

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {activity.user}
                    </span>{" "}
                    {activity.action}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="max-w-[180px] truncate rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                      {activity.project}
                    </Badge>

                    <span className="text-[10px] text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={16}
                  className="shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ActivityIcon = ({ type }: { type: ActivityItem["type"] }) => {
  const config = {
    commit: {
      icon: <GitCommit size={14} />,
      className: "bg-violet-50 text-violet-600",
    },

    "pull-request": {
      icon: <Plus size={14} />,
      className: "bg-emerald-50 text-emerald-600",
    },

    message: {
      icon: <MessageCircle size={14} />,
      className: "bg-blue-50 text-blue-600",
    },

    code: {
      icon: <Code2 size={14} />,
      className: "bg-orange-50 text-orange-600",
    },
  };

  const current = config[type];

  return (
    <div
      className={`-ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-white ${current.className}`}>
      {current.icon}
    </div>
  );
};

export default RecentActivity;
