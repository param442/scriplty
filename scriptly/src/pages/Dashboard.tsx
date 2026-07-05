import { useEffect, useState } from "react";
import { motion } from "motion/react";
import DashboardHero from "@/components/Dashboard/DashboardHero";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import ProjectGrid, { type Project } from "@/components/Dashboard/ProjectGrid";
import EmptyProjects from "@/components/Dashboard/EmptyProjects";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const response = await api.get("/projects");
        // setProjects(response.data);

        setTimeout(() => {
          setProjects([]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error(err);
        setProjects([]);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = () => {
    console.log("Create Project");
  };

  const handleOpenProject = (id: string) => {
    console.log(id);
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
          Loading your workspace...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-violet-50/30">
      <DashboardNavbar />

      <main className="mx-auto max-w-7xl space-y-10 px-6 py-8">
        {projects && projects.length > 0 ? (
          <>
            <DashboardHero
              userName="Param"
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
            userName="Param"
            onCreateProject={handleCreateProject}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
