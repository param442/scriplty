import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  FileCode2,
  FolderGit2,
  Grid2X2,
  List,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import CreateProjectModal from "@/components/ui/CreateProjectModal";
import { getStoredProjectsMeta } from "@/lib/workspace";

/* =========================================================
   TYPES
========================================================= */

type Project = {
  id: string;
  name: string;
  description?: string;
  files: number;
  modified: string;
  members: string[];
};

type StoredProject = {
  id: string;
  name: string;
  description?: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
  onOpen: () => void;
};

type ProjectListItemProps = {
  project: Project;
  index: number;
  onOpen: () => void;
};

type EmptyProjectsProps = {
  search: string;
  onCreate: () => void;
};

/* =========================================================
   PROJECT PAGE
========================================================= */

const ProjectPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");

  const [view, setView] = useState<"grid" | "list">("grid");

  const [isCreateProjectOpen, setIsCreateProjectOpen] =
    useState<boolean>(false);

  /* =======================================================
     LOAD PROJECTS
  ======================================================= */

  const projects = useMemo<Project[]>(() => {
    const storedProjects = (getStoredProjectsMeta() || []) as StoredProject[];

    return storedProjects.map(
      (project: StoredProject, index: number): Project => ({
        id: project.id,
        name: project.name,
        description: project.description,

        // Temporary UI data.
        // Replace these with real backend values later.
        files: [4, 4, 5, 8, 6, 3][index % 6],

        modified: ["2h ago", "1d ago", "3d ago", "5h ago"][index % 4],

        members: [["PS", "AK", "RS"], ["PS", "AK"], ["PS", "SK"], ["PS"]][
          index % 4
        ],
      }),
    );
  }, []);

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredProjects = useMemo<Project[]>(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return projects;
    }

    return projects.filter((project: Project) => {
      const name = project.name?.toLowerCase() || "";

      const description = project.description?.toLowerCase() || "";

      return name.includes(query) || description.includes(query);
    });
  }, [projects, search]);

  /* =======================================================
     OPEN PROJECT
  ======================================================= */

  const handleOpenProject = (project: Project): void => {
    navigate(`/projects/${project.id}`, {
      state: {
        project,
      },
    });
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8f9fc] text-slate-900">
      <main
        className="
          mx-auto
          w-full
          max-w-[1500px]
          px-[2vmin]
          py-[2.5vmin]
          sm:px-[2.5vmin]
          lg:px-[3vmin]
        ">
        {/* =================================================
            BACK TO DASHBOARD
        ================================================= */}

        <motion.button
          type="button"
          initial={{
            opacity: 0,
            x: -8,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          onClick={() => navigate("/dashboard")}
          className="
            mb-[1.5vmin]
            flex
            items-center
            gap-2
            rounded-lg
            px-2
            py-1.5
            text-sm
            font-medium
            text-slate-500
            transition-all
            hover:bg-white
            hover:text-slate-900
            hover:shadow-sm
          ">
          <ArrowLeft size={17} />

          <span>Back to Dashboard</span>
        </motion.button>

        {/* =================================================
            PAGE HEADER
        ================================================= */}

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
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          ">
          {/* TITLE */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-violet-100
                text-violet-600
              ">
              <FolderGit2 size={22} />
            </div>

            <div>
              <h1
                className="
                  text-[clamp(1.7rem,2.8vmin,2.4rem)]
                  font-bold
                  tracking-tight
                  text-slate-900
                ">
                Projects
              </h1>

              <p className="text-sm text-slate-500">
                Manage and access all your projects.
              </p>
            </div>
          </div>

          {/* NEW PROJECT */}

          <Button
            type="button"
            onClick={() => setIsCreateProjectOpen(true)}
            className="
              h-10
              rounded-xl
              bg-indigo-600
              px-4
              text-sm
              font-semibold
              text-white
              shadow-sm
              hover:bg-indigo-700
            ">
            <Plus size={17} />
            New Project
          </Button>
        </motion.div>

        {/* =================================================
            MAIN CONTAINER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.05,
          }}
          className="
            mt-[2.5vmin]
            rounded-2xl
            border
            border-slate-200/80
            bg-white
            p-[1.5vmin]
            shadow-sm
          ">
          {/* =================================================
              TOOLBAR
          ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-3
              lg:flex-row
              lg:items-center
              lg:justify-between
            ">
            {/* SEARCH */}

            <div className="relative w-full lg:max-w-[450px]">
              <Search
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <Input
                type="search"
                value={search}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(event.target.value)
                }
                placeholder="Search projects..."
                className="
                  h-10
                  rounded-xl
                  border-slate-200
                  bg-slate-50
                  pl-9
                  pr-4
                  text-sm
                  shadow-none
                  focus-visible:bg-white
                  focus-visible:ring-2
                  focus-visible:ring-violet-500/20
                "
              />
            </div>

            {/* CONTROLS */}

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              {/* SORT */}

              <Button
                type="button"
                variant="outline"
                className="
                  h-10
                  rounded-xl
                  border-slate-200
                  bg-white
                  px-3
                  text-xs
                  font-normal
                  text-slate-600
                  sm:text-sm
                ">
                <span className="hidden sm:inline">Sort:</span>

                <span className="font-medium text-slate-900">Recent</span>

                <Clock3 size={14} className="text-slate-400" />
              </Button>

              {/* VIEW SWITCH */}

              <div
                className="
                  flex
                  h-10
                  items-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-1
                ">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setView("grid")}
                  className={`
                    h-8
                    w-8
                    rounded-lg
                    ${
                      view === "grid"
                        ? "bg-violet-50 text-violet-600"
                        : "text-slate-400"
                    }
                  `}>
                  <Grid2X2 size={16} />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setView("list")}
                  className={`
                    h-8
                    w-8
                    rounded-lg
                    ${
                      view === "list"
                        ? "bg-violet-50 text-violet-600"
                        : "text-slate-400"
                    }
                  `}>
                  <List size={17} />
                </Button>
              </div>
            </div>
          </div>

          {/* =================================================
              COUNT
          ================================================= */}

          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
            </p>
          </div>

          {/* =================================================
              PROJECTS
          ================================================= */}

          {filteredProjects.length > 0 ? (
            view === "grid" ? (
              <div
                className="
                  mt-3
                  grid
                  grid-cols-1
                  gap-[1.2vmin]
                  sm:grid-cols-2
                  xl:grid-cols-3
                  2xl:grid-cols-4
                ">
                {filteredProjects.map((project: Project, index: number) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onOpen={() => handleOpenProject(project)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                {filteredProjects.map((project: Project, index: number) => (
                  <ProjectListItem
                    key={project.id}
                    project={project}
                    index={index}
                    onOpen={() => handleOpenProject(project)}
                  />
                ))}
              </div>
            )
          ) : (
            <EmptyProjects
              search={search}
              onCreate={() => setIsCreateProjectOpen(true)}
            />
          )}

          {/* =================================================
              FOOTER
          ================================================= */}

          {filteredProjects.length > 0 && (
            <div className="mt-5 flex justify-center">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-violet-50
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-slate-500
                ">
                <Sparkles size={13} className="text-violet-500" />
                Build and collaborate with your team.
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* =================================================
          CREATE PROJECT MODAL
      ================================================= */}

      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
      />
    </div>
  );
};

/* =========================================================
   PROJECT CARD
========================================================= */

const ProjectCard = ({ project, index, onOpen }: ProjectCardProps) => {
  const avatarColors: string[] = [
    "bg-violet-100 text-violet-700",
    "bg-sky-100 text-sky-700",
    "bg-emerald-100 text-emerald-700",
  ];

  return (
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
        duration: 0.3,
        delay: index * 0.035,
      }}
      whileHover={{
        y: -3,
      }}
      className="h-full">
      <Card
        onClick={onOpen}
        className="
          group
          flex
          h-full
          min-h-[245px]
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-xl
          border-slate-200/80
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:border-violet-200
          hover:shadow-md
        ">
        {/* CARD HEADER */}

        <CardHeader className="p-4 pb-2.5">
          <div className="flex items-start justify-between">
            {/* PROJECT ICON */}

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-violet-500
                to-indigo-600
                text-white
                shadow-sm
                transition-transform
                group-hover:scale-105
              ">
              <FolderGit2 size={21} />
            </div>

            {/* BADGE */}

            <Badge
              variant="secondary"
              className="
                rounded-full
                bg-violet-50
                px-2.5
                py-0.5
                text-[10px]
                font-medium
                text-violet-600
              ">
              Project
            </Badge>
          </div>

          {/* NAME */}

          <h2 className="mt-3 truncate text-lg font-bold text-slate-900">
            {project.name}
          </h2>

          {/* DESCRIPTION */}

          <p className="mt-1 line-clamp-2 min-h-[38px] text-xs leading-5 text-slate-500 sm:text-sm">
            {project.description ||
              "Collaborative development project for your team."}
          </p>
        </CardHeader>

        {/* CARD CONTENT */}

        <CardContent className="mt-auto px-4 pb-4">
          {/* METADATA */}

          <div
            className="
              flex
              items-center
              gap-2
              border-t
              border-slate-100
              py-3
              text-[11px]
              text-slate-500
            ">
            <div className="flex items-center gap-1.5">
              <FileCode2 size={13} className="text-slate-400" />
              {project.files} files
            </div>

            <span className="text-slate-300">•</span>

            <div className="flex items-center gap-1.5">
              <Clock3 size={13} className="text-slate-400" />

              {project.modified}
            </div>
          </div>

          {/* MEMBERS */}

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-slate-100
              pt-3
            ">
            <div className="flex items-center">
              {(project.members || [])
                .slice(0, 3)
                .map((member: string, memberIndex: number) => (
                  <div
                    key={`${member}-${memberIndex}`}
                    className={`
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-white
                        text-[9px]
                        font-bold
                        ${avatarColors[memberIndex % avatarColors.length]}
                        ${memberIndex > 0 ? "-ml-2" : ""}
                      `}>
                    {member}
                  </div>
                ))}

              {(project.members || []).length > 3 && (
                <span className="ml-2 text-[10px] font-medium text-slate-500">
                  +{project.members.length - 3}
                </span>
              )}
            </div>

            {/* OPEN */}

            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                text-violet-600
                transition-all
                group-hover:border-violet-200
                group-hover:bg-violet-50
              ">
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* =========================================================
   LIST ITEM
========================================================= */

const ProjectListItem = ({ project, index, onOpen }: ProjectListItemProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.03,
      }}>
      <Card
        onClick={onOpen}
        className="
          group
          cursor-pointer
          rounded-xl
          border-slate-200
          bg-white
          shadow-sm
          transition
          hover:border-violet-200
          hover:shadow-md
        ">
        <CardContent className="flex items-center gap-3 p-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-violet-500
              to-indigo-600
              text-white
            ">
            <FolderGit2 size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm font-semibold">{project.name}</h2>

              <Badge
                variant="secondary"
                className="
                  hidden
                  bg-violet-50
                  text-[10px]
                  text-violet-600
                  sm:inline-flex
                ">
                Project
              </Badge>
            </div>

            <p className="mt-0.5 truncate text-xs text-slate-500">
              {project.description || "Collaborative development project."}
            </p>
          </div>

          <div className="hidden items-center gap-4 text-xs text-slate-400 md:flex">
            <span>{project.files} files</span>

            <span>{project.modified}</span>
          </div>

          <ArrowRight
            size={17}
            className="
              shrink-0
              text-slate-400
              transition
              group-hover:translate-x-1
              group-hover:text-violet-600
            "
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* =========================================================
   EMPTY PROJECTS
========================================================= */

const EmptyProjects = ({ search, onCreate }: EmptyProjectsProps) => {
  return (
    <div
      className="
        mt-6
        flex
        min-h-[260px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-200
        bg-slate-50/50
        text-center
      ">
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-violet-100
          text-violet-600
        ">
        <FolderGit2 size={22} />
      </div>

      <h2 className="mt-3 text-sm font-semibold text-slate-800">
        {search ? "No projects found" : "No projects yet"}
      </h2>

      <p className="mt-1 max-w-sm px-4 text-xs text-slate-500 sm:text-sm">
        {search
          ? "Try another project name or description."
          : "Create your first project and start collaborating."}
      </p>

      {!search && (
        <Button
          type="button"
          onClick={onCreate}
          className="
            mt-4
            h-9
            rounded-lg
            bg-indigo-600
            text-sm
            hover:bg-indigo-700
          ">
          <Plus size={16} />
          New Project
        </Button>
      )}
    </div>
  );
};

export default ProjectPage;
