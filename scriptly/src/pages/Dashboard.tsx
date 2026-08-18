import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import DashboardHero from "@/components/Dashboard/DashboardHero";
import ProjectGrid from "@/components/Dashboard/ProjectGrid";
import ActivityOverview from "@/components/Dashboard/ActivityOverview";
import TeamChat from "@/components/Dashboard/TeamChat";
import RecentActivity from "@/components/Dashboard/RecentActivity";
import Workspaces from "@/components/Dashboard/Workspace";

import CreateProjectModal from "@/components/ui/CreateProjectModal";
import SettingsSidebar from "@/components/Dashboard/SettingsSidebar";

import { checkAuth, logoutUser, type AuthUser } from "@/lib/utils";

import { getStoredProjectsMeta } from "@/lib/workspace";

export type DashboardProject = {
  id: string;
  name: string;
  description?: string;
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUser | null>(null);

  const [projects, setProjects] = useState<DashboardProject[]>([]);

  const [loading, setLoading] = useState(true);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  /*
   * =======================================================
   * AUTHENTICATION + PROJECTS
   * =======================================================
   */

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const authenticatedUser = await checkAuth();

        // Enable this once authentication is ready.

        if (!authenticatedUser) {
          navigate("/login", {
            replace: true,
          });
          return;
        }

        setUser(authenticatedUser);

        const storedProjects = getStoredProjectsMeta();

        setProjects((storedProjects || []) as DashboardProject[]);
      } catch (error) {
        console.error("Dashboard authentication failed:", error);

        navigate("/login", {
          replace: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  /*
   * =======================================================
   * HANDLERS
   * =======================================================
   */

  const handleCreateProject = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const handleOpenProject = (id: string) => {
    const target = projects.find((project) => project.id === id);

    navigate("/workspace", {
      state: {
        project: {
          id,
          name: target?.name || "Workspace Project",
        },
      },
    });
  };
  const handleOpenProjects = () => {
    navigate("/projects");
  };

  const handleOpenWorkplace = () => {
    navigate("/workplace");
  };
  const MessageHandler = () => {
    navigate("/messages");
  };

  const handleLogout = () => {
    logoutUser();

    navigate("/login", {
      replace: true,
    });
  };

  /*
   * =======================================================
   * LOADING
   * =======================================================
   */

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-10 w-10 rounded-full border-2 border-violet-200 border-t-violet-600"
        />

        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-sm font-medium text-slate-500">
          Loading your dashboard...
        </motion.p>
      </div>
    );
  }

  /*
   * =======================================================
   * DASHBOARD
   * =======================================================
   */

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8f9fc] text-slate-900">
      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <DashboardSidebar
        user={user}
        projects={projects}
        onOpenProject={handleOpenProject}
        onOpenProjects={handleOpenProjects}
        onCreateProject={handleCreateProject}
        MessageHandler={MessageHandler}
        onOpenSettings={handleOpenSettings}
        onLogout={handleLogout}
      />

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="min-h-screen w-full lg:ml-[245px] lg:w-auto">
        {/* ================================================= */}
        {/* NAVBAR */}
        {/* ================================================= */}

        <DashboardNavbar
          user={user}
          onCreateProject={handleCreateProject}
          onOpenMessages={MessageHandler}
          onOpenSettings={handleOpenSettings}
          onLogout={handleLogout}
          IsEmailVerified={user?.emailVerified || false}
        />

        {/* ================================================= */}
        {/* PAGE CONTENT */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto w-full max-w-[1350px] space-y-5 px-3 py-4 sm:px-5 lg:px-6 lg:py-5">
          {/* ================================================= */}
          {/* HERO */}
          {/* ================================================= */}

          <DashboardHero
            user={user}
            projectCount={projects.length}
            onCreateProject={handleCreateProject}
          />

          {/* ================================================= */}
          {/* MAIN DASHBOARD GRID */}
          {/* ================================================= */}

          <div className="mx-auto grid w-full grid-cols-1 gap-5 xl:grid-cols-[1.55fr_0.9fr]">
            {/* ================================================= */}
            {/* PROJECTS */}
            {/* ================================================= */}

            <div className="w-full min-w-0">
              <ProjectGrid
                projects={projects}
                onOpenProject={handleOpenProject}
                onCreateProject={handleCreateProject}
              />
            </div>

            {/* ================================================= */}
            {/* ACTIVITY */}
            {/* ================================================= */}

            <div className="w-full min-w-0">
              <ActivityOverview />
            </div>

            {/* ================================================= */}
            {/* TEAM & CHAT */}
            {/* ================================================= */}

            <div className="w-full min-w-0 xl:col-span-2">
              <TeamChat onOpenChat={MessageHandler} />
            </div>
          </div>

          {/* ================================================= */}
          {/* BOTTOM SECTION */}
          {/* ================================================= */}

          <div className="mx-auto grid w-full grid-cols-1 gap-5 lg:grid-cols-[1.6fr_0.8fr]">
            {/* Recent Activity */}

            <div className="w-full min-w-0">
              <RecentActivity />
            </div>

            {/* Workspaces */}

            <div className="w-full min-w-0">
              <Workspaces onOpenWorkspace={handleOpenWorkplace} />
            </div>
          </div>
        </motion.div>
      </main>

      {/* ================================================= */}
      {/* CREATE PROJECT MODAL */}
      {/* ================================================= */}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* ================================================= */}
      {/* SETTINGS */}
      {/* ================================================= */}

      <SettingsSidebar
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
