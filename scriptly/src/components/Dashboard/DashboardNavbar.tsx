import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Bell, Code2, Search, Settings, UserCircle2 } from "lucide-react";
import NewProjectButton from "../ui/NewProjectButton";
import { type AuthUser } from "@/lib/utils";
import { resendVerificationEmail } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

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
  onOpenSettings,
  onLogout,
  IsEmailVerified,
  onOpenMessages,
}: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className=" sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl">
        {/* Left */}
        <div className="flex items-center gap-6 sm:gap-10">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg">
              <Code2 size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">Scriptly</h1>
              <p className="hidden sm:block text-xs text-slate-500">
                Collaborative Coding
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 w-80">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search projects..."
              className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <NewProjectButton onClick={onCreateProject} />

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50">
            <Bell size={20} className="text-slate-600" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenSettings}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50">
            <Settings size={20} className="text-slate-600" />
          </motion.button>
          <motion.button
            onClick={onOpenMessages}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50">
            <MessageSquare size={20} className="text-slate-600" />
          </motion.button>
          {!IsEmailVerified && (
            <motion.section
              onClick={() => {
                resendVerificationEmail(user?.email || "");
                // call the API to resend the verification email
              }}
              className=" cursor-pointer border-slate-200 bg-white hover:bg-slate-50">
              <Badge variant="destructive">Verify Email</Badge>
            </motion.section>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/settings/account")}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50">
            <UserCircle2 size={34} className="text-violet-600" />

            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name || "Developer"}
              </p>

              <p className="text-xs text-slate-500">Developer</p>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
            Logout
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardNavbar;
