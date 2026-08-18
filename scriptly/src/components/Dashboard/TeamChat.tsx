import { motion } from "motion/react";
import { ChevronRight, MessageCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

type TeamChatProps = {
  onOpenChat: () => void;
};

type TeamMember = {
  name: string;
  role: string;
  status: "Online" | "Away" | "Offline";
  avatar: string;
};

const TeamChat = ({ onOpenChat }: TeamChatProps) => {
  const members: TeamMember[] = [
    {
      name: "Param Singh",
      role: "Owner",
      status: "Online",
      avatar: "PS",
    },
    {
      name: "Amanpreet Kaur",
      role: "Developer",
      status: "Online",
      avatar: "AK",
    },
    {
      name: "Rohit Sharma",
      role: "Developer",
      status: "Away",
      avatar: "RS",
    },
    {
      name: "Simran Kaur",
      role: "UI/UX Designer",
      status: "Offline",
      avatar: "SK",
    },
    {
      name: "Harpreet Singh",
      role: "QA Engineer",
      status: "Offline",
      avatar: "HS",
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
        delay: 0.16,
        ease: "easeOut",
      }}>
      <Card className="h-full border-slate-200/80 bg-white shadow-sm">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-[15px] font-bold">
                Team & Chat
              </CardTitle>

              <p className="mt-1 text-xs text-slate-500">Your project team</p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenChat}
              className="h-8 px-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
              Open Chat
            </Button>
          </div>
        </CardHeader>

        {/* ================================================= */}
        {/* TEAM MEMBERS */}
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
            {members.map((member) => (
              <motion.div
                key={member.name}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 12,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                }}
                whileHover={{
                  x: 3,
                  backgroundColor: "rgba(248,250,252,1)",
                }}
                className="flex items-center gap-3 rounded-xl p-2.5">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-slate-100 text-xs font-semibold text-slate-600">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>

                  {/* Online indicator */}
                  <span
                    className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                      member.status === "Online"
                        ? "bg-emerald-500"
                        : member.status === "Away"
                          ? "bg-amber-400"
                          : "bg-slate-300"
                    }`}
                  />
                </div>

                {/* User */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {member.name}
                  </p>

                  <p className="truncate text-[11px] text-slate-500">
                    {member.role}
                  </p>
                </div>

                {/* Status */}
                <Badge
                  variant="outline"
                  className={`hidden rounded-full px-2 py-0.5 text-[9px] font-medium sm:inline-flex ${
                    member.status === "Online"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                      : member.status === "Away"
                        ? "border-amber-200 bg-amber-50 text-amber-600"
                        : "border-slate-200 bg-slate-50 text-slate-400"
                  }`}>
                  {member.status}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* ================================================= */}
          {/* CHAT BUTTON */}
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
              onClick={onOpenChat}
              className="h-11 w-full rounded-xl bg-indigo-50 text-indigo-600 shadow-none hover:bg-indigo-100 hover:text-indigo-700">
              <MessageCircle size={17} />
              Project Room
              <ChevronRight size={16} className="ml-auto" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamChat;
