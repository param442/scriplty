import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import DashboardHero from "@/components/Dashboard/DashboardHero";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import ProjectGrid, { type Project } from "@/components/Dashboard/ProjectGrid";
import EmptyProjects from "@/components/Dashboard/EmptyProjects";
import CreateProjectModal from "@/components/ui/CreateProjectModal";
import { checkAuth, logoutUser, type AuthUser } from "@/lib/utils";

const Dashboard = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  // Verify backend authentication state on mount
  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const authenticatedUser = await checkAuth();

        if (!authenticatedUser) {
          // If not authenticated, redirect to login page
          navigate("/login", { replace: true });
          return;
        }

        setUser(authenticatedUser);

        // Fetch user projects
        setTimeout(() => {
          setProjects([]);
          setLoading(false);
        }, 400);
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

  const handleOpenProject = (id: string) => {
    console.log("Opening project:", id);
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
        onLogout={handleLogout}
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
    </div>
  );
};

export default Dashboard;
