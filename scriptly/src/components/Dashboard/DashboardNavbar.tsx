import { motion } from "motion/react";
import { useNavigate } from "react-router";

import { Bell, Code2, MessageSquare, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import NewProjectButton from "../ui/NewProjectButton";

import { type AuthUser, resendVerificationEmail } from "@/lib/utils";

type NavbarProps = {
  user: AuthUser | null;
  onCreateProject: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  IsEmailVerified: boolean;
  onOpenMessages: () => void;
};

const DashboardNavbar = ({
  user,
  onCreateProject,
  onLogout,
  IsEmailVerified,
  onOpenMessages,
}: NavbarProps) => {
  const navigate = useNavigate();

  const getInitials = (name?: string | null) => {
    if (!name) return "D";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <motion.header
      initial={{
        y: -25,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="flex h-[64px] w-full items-center justify-between px-3 sm:px-5 lg:mx-auto lg:h-[72px] lg:max-w-[1350px] lg:px-7">
        {/* ================================================= */}
        {/* LEFT */}
        {/* ================================================= */}

        <div className="flex min-w-0 items-center gap-5">
          {/* Mobile Logo */}
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md">
              <Code2 size={22} />
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold text-slate-900">Scriptly</h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Collaborative Coding
              </p>
            </div>
          </motion.button>

          {/* Search */}
          <div className="relative hidden w-[360px] lg:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <Input
              type="text"
              placeholder="Search projects, teams..."
              className="h-11 border-slate-200 bg-slate-50 pl-10 pr-14 text-sm shadow-none transition focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-500/10"
            />

            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-400 shadow-sm">
              ⌘ K
            </kbd>
          </div>
        </div>

        {/* ================================================= */}
        {/* RIGHT */}
        {/* ================================================= */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* New Project */}
          <div className="hidden sm:block">
            <NewProjectButton onClick={onCreateProject} />
          </div>

          {/* Notifications */}
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="relative">
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-xl border-slate-200 bg-white">
              <Bell size={20} className="text-slate-600" />
            </Button>

            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px]">
              3
            </Badge>
          </motion.div>

          {/* Messages */}
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={onOpenMessages}
              className="h-11 w-11 rounded-xl border-slate-200 bg-white">
              <MessageSquare size={20} className="text-slate-600" />
            </Button>

            <Badge className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[9px] text-white hover:bg-indigo-600">
              3
            </Badge>
          </motion.div>

          {/* Email Verification */}
          {!IsEmailVerified && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="hidden md:block">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => resendVerificationEmail(user?.email || "")}
                className="h-9">
                Verify Email
              </Button>
            </motion.div>
          )}

          {/* User Account */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}>
            <Button
              variant="outline"
              onClick={() => navigate("/settings/account")}
              className="h-11 gap-3 rounded-xl border-slate-200 bg-white px-2.5 sm:px-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-violet-100 text-sm font-semibold text-violet-700">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>

              <div className="hidden text-left md:block">
                <p className="max-w-[120px] truncate text-sm font-semibold text-slate-800">
                  {user?.name || "Developer"}
                </p>

                <p className="text-xs text-slate-500">Developer</p>
              </div>
            </Button>
          </motion.div>

          {/* Logout */}
          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="hidden md:block">
            <Button
              variant="outline"
              onClick={onLogout}
              className="h-11 rounded-xl border-red-200 bg-white px-4 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700">
              Logout
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardNavbar;
