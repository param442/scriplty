import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import DashboardHero from "@/components/Dashboard/DashboardHero";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import ProjectGrid, { type Project } from "@/components/Dashboard/ProjectGrid";
import EmptyProjects from "@/components/Dashboard/EmptyProjects";
import CreateProjectModal from "@/components/ui/CreateProjectModal";
import SettingsModal from "@/components/Dashboard/SettingsModal";
import { checkAuth, logoutUser, type AuthUser } from "@/lib/utils";
import { getStoredProjectsMeta } from "@/lib/workspace";

const Dashboard = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [emailVerified, setEmailVerified] = useState(false);
  // Verify backend authentication state on mount and load projects
  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const authenticatedUser = await checkAuth();

        if (!authenticatedUser) {
          navigate("/login", { replace: true });
          return;
        }

        setEmailVerified(authenticatedUser.emailVerified ?? false);
        setUser(authenticatedUser);

        // Load stored user projects
        const stored = getStoredProjectsMeta();
        setProjects(stored);
        setLoading(false);
      } catch (err) {
        console.error("Authentication check failed:", err);
        navigate("/login", { replace: true });
      }
    };

    verifyAuthentication();
  }, [navigate]);

  const handleCreateProject = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const handleOpenProject = (id: string) => {
    const target = projects?.find((p) => p.id === id);
    navigate("/workspace", {
      state: {
        project: {
          id,
          name: target?.name || "Workspace Project",
        },
      },
    });
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 rounded-full border-2 border-violet-200 border-t-violet-600"
        />
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm font-medium text-slate-500">
          Verifying authentication & loading workspace...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-violet-50/30">
      <DashboardNavbar
        user={user}
        onCreateProject={handleCreateProject}
        onOpenSettings={handleOpenSettings}
        onLogout={handleLogout}
        IsEmailVerified={emailVerified}
      />
      <main className="mx-auto max-w-7xl space-y-10 px-6 py-8">
        {projects && projects.length > 0 ? (
          <>
            <DashboardHero
              userName={user?.name || "Developer"}
              projectCount={projects.length}
              onCreateProject={handleCreateProject}
            />
            <ProjectGrid
              projects={projects}
              onCreateProject={handleCreateProject}
              onOpenProject={handleOpenProject}
            />
          </>
        ) : (
          <EmptyProjects
            userName={user?.name || "Developer"}
            onCreateProject={handleCreateProject}
          />
        )}
      </main>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Dashboard;
