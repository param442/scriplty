import { useLocation, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  ExternalLink,
  FileText,
  MessageCircle,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  name: string;
  description?: string;
  files?: number;
  modified?: string;
  members?: string[];
};

type LocationState = {
  project?: Project;
};

const ProjectDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const state = location.state as LocationState | null;

  const project = state?.project;

  /*
   * =========================================================
   * PROJECT DATA
   * =========================================================
   *
   * If the page was opened by clicking a project card,
   * location.state contains the project.
   *
   * If somebody directly visits:
   *
   * /projects/scriptly
   *
   * we still have the id from the URL.
   */

  const projectId = project?.id || id || "unknown";

  const projectName =
    project?.name ||
    (id ? id.charAt(0).toUpperCase() + id.slice(1) : "Project");

  const projectDescription =
    project?.description ||
    "Collaborative development project for building, sharing and working together.";

  const projectFiles = project?.files ?? 4;

  const projectModified = project?.modified || "Recently";

  /*
   * =========================================================
   * TEAM MEMBERS
   * =========================================================
   */

  const teamMembers = [
    {
      id: "param",
      name: "Param Singh",
      role: "Full Stack Developer",
      initials: "PS",
      color: "bg-violet-100 text-violet-700",
      status: "Owner",
    },
    {
      id: "aman",
      name: "Amanpreet Kaur",
      role: "Frontend Developer",
      initials: "AK",
      color: "bg-blue-100 text-blue-700",
      status: "Developer",
    },
    {
      id: "rohit",
      name: "Rohit Sharma",
      role: "Backend Developer",
      initials: "RS",
      color: "bg-emerald-100 text-emerald-700",
      status: "Developer",
    },
    {
      id: "simran",
      name: "Simran Kaur",
      role: "UI/UX Designer",
      initials: "SK",
      color: "bg-orange-100 text-orange-700",
      status: "Designer",
    },
  ];

  /*
   * =========================================================
   * GO TO WORKSPACE
   * =========================================================
   */

  const handleOpenWorkspace = () => {
    navigate("/workspace", {
      state: {
        project: {
          id: projectId,
          name: projectName,
        },
      },
    });
  };

  /*
   * =========================================================
   * OPEN CHAT
   * =========================================================
   */

  const handleOpenChat = () => {
    navigate("/messages", {
      state: {
        project: {
          id: projectId,
          name: projectName,
        },
      },
    });
  };

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8f9fc] text-slate-900">
      <main className="mx-auto w-full max-w-[1500px] px-[2vmin] py-[2vmin]">
        {/* ================================================= */}
        {/* BACK */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="
            mb-[2vmin]
            inline-flex
            items-center
            gap-[0.7vmin]
            rounded-[0.8vmin]
            px-[0.5vmin]
            py-[0.7vmin]
            text-[clamp(0.8rem,1.1vmin,1rem)]
            font-medium
            text-slate-500
            transition
            hover:text-slate-900
          ">
          <ArrowLeft
            size={18}
            className="h-[2.2vmin] w-[2.2vmin] min-h-[16px] min-w-[16px]"
          />
          Back to Projects
        </button>

        {/* ================================================= */}
        {/* PROJECT HEADER */}
        {/* ================================================= */}

        <section
          className="
            overflow-hidden
            rounded-[1.5vmin]
            border
            border-slate-200
            bg-white
            p-[2vmin]
            shadow-sm
          ">
          <div
            className="
              flex
              flex-col
              gap-[2vmin]
              lg:flex-row
              lg:items-center
              lg:justify-between
            ">
            {/* PROJECT INFORMATION */}

            <div className="flex min-w-0 items-center gap-[1.5vmin]">
              {/* ICON */}

              <div
                className="
                  flex
                  h-[7vmin]
                  w-[7vmin]
                  min-h-[52px]
                  min-w-[52px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[1.3vmin]
                  bg-gradient-to-br
                  from-violet-600
                  to-indigo-600
                  text-white
                  shadow-md
                ">
                <Code2 className="h-[3.2vmin] w-[3.2vmin] min-h-[24px] min-w-[24px]" />
              </div>

              {/* NAME */}

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-[0.8vmin]">
                  <h1
                    className="
                      truncate
                      text-[clamp(1.5rem,3vmin,2.6rem)]
                      font-bold
                      tracking-tight
                    ">
                    {projectName}
                  </h1>

                  <span
                    className="
                      rounded-full
                      bg-violet-50
                      px-[1vmin]
                      py-[0.4vmin]
                      text-[clamp(0.65rem,0.9vmin,0.8rem)]
                      font-medium
                      text-violet-600
                    ">
                    Web Application
                  </span>
                </div>

                <p
                  className="
                    mt-[0.5vmin]
                    max-w-[700px]
                    text-[clamp(0.8rem,1.1vmin,1rem)]
                    leading-relaxed
                    text-slate-500
                  ">
                  {projectDescription}
                </p>
              </div>
            </div>

            {/* PROJECT META + WORKSPACE */}

            <div
              className="
                flex
                flex-col
                gap-[1.5vmin]
                sm:flex-row
                sm:items-center
              ">
              {/* CREATED */}

              <div className="hidden items-center gap-[0.8vmin] lg:flex">
                <CalendarDays size={19} className="text-slate-400" />

                <div>
                  <p className="text-[0.75rem] text-slate-400">Modified</p>

                  <p className="text-sm font-medium text-slate-700">
                    {projectModified}
                  </p>
                </div>
              </div>

              {/* WORKSPACE */}

              <Button
                type="button"
                onClick={handleOpenWorkspace}
                className="
                  h-auto
                  rounded-[1vmin]
                  bg-indigo-600
                  px-[1.8vmin]
                  py-[1.1vmin]
                  text-[clamp(0.75rem,1vmin,0.9rem)]
                  font-semibold
                  shadow-sm
                  transition
                  hover:bg-indigo-700
                ">
                <BriefcaseBusiness className="mr-[0.6vmin] h-[2vmin] w-[2vmin]" />
                Go to Workspace
              </Button>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <div
          className="
            mt-[2vmin]
            grid
            grid-cols-1
            gap-[2vmin]
            xl:grid-cols-[1.55fr_0.85fr]
          ">
          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div className="min-w-0 space-y-[2vmin]">
            {/* ================================================= */}
            {/* TEAM MEMBERS */}
            {/* ================================================= */}

            <section
              className="
                rounded-[1.5vmin]
                border
                border-slate-200
                bg-white
                p-[1.7vmin]
                shadow-sm
              ">
              {/* HEADER */}

              <div className="mb-[1.5vmin] flex items-center justify-between">
                <div className="flex items-center gap-[0.8vmin]">
                  <Users className="h-[2.4vmin] w-[2.4vmin] min-h-[19px] min-w-[19px] text-slate-700" />

                  <h2 className="text-[clamp(1rem,1.4vmin,1.2rem)] font-semibold">
                    Team Members
                  </h2>
                </div>

                <span className="text-[clamp(0.7rem,0.9vmin,0.8rem)] text-slate-400">
                  {teamMembers.length} members
                </span>
              </div>

              {/* MEMBERS */}

              <div className="space-y-[0.7vmin]">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="
                      flex
                      items-center
                      gap-[1vmin]
                      rounded-[1vmin]
                      border
                      border-slate-100
                      bg-white
                      p-[1vmin]
                      transition
                      hover:border-slate-200
                      hover:bg-slate-50
                    ">
                    {/* AVATAR */}

                    <div
                      className={`
                        flex
                        h-[4.5vmin]
                        w-[4.5vmin]
                        min-h-[38px]
                        min-w-[38px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-[clamp(0.65rem,0.9vmin,0.8rem)]
                        font-bold
                        ${member.color}
                      `}>
                      {member.initials}
                    </div>

                    {/* INFORMATION */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-[0.7vmin]">
                        <p className="truncate text-[clamp(0.8rem,1.1vmin,1rem)] font-semibold text-slate-800">
                          {member.name}
                        </p>

                        <span
                          className="
                            rounded-full
                            bg-violet-50
                            px-[0.8vmin]
                            py-[0.25vmin]
                            text-[clamp(0.6rem,0.75vmin,0.7rem)]
                            font-medium
                            text-violet-600
                          ">
                          {member.status}
                        </span>
                      </div>

                      <p className="mt-[0.2vmin] truncate text-[clamp(0.65rem,0.85vmin,0.8rem)] text-slate-500">
                        {member.role}
                      </p>
                    </div>

                    {/* OPEN MEMBER */}

                    <button
                      type="button"
                      className="
                        flex
                        h-[4vmin]
                        w-[4vmin]
                        min-h-[32px]
                        min-w-[32px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[0.8vmin]
                        border
                        border-slate-200
                        text-slate-400
                        transition
                        hover:border-violet-200
                        hover:bg-violet-50
                        hover:text-violet-600
                      ">
                      <ExternalLink className="h-[1.8vmin] w-[1.8vmin] min-h-[15px] min-w-[15px]" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* ================================================= */}
            {/* README */}
            {/* ================================================= */}

            <section
              className="
                rounded-[1.5vmin]
                border
                border-slate-200
                bg-white
                p-[1.7vmin]
                shadow-sm
              ">
              <div className="mb-[1.5vmin] flex items-center gap-[0.8vmin]">
                <FileText className="h-[2.4vmin] w-[2.4vmin] min-h-[19px] min-w-[19px] text-slate-700" />

                <h2 className="text-[clamp(1rem,1.4vmin,1.2rem)] font-semibold">
                  README
                </h2>
              </div>

              <div
                className="
                  overflow-x-auto
                  rounded-[1vmin]
                  border
                  border-slate-100
                  bg-slate-50
                  p-[1.5vmin]
                ">
                <pre
                  className="
                    whitespace-pre-wrap
                    font-mono
                    text-[clamp(0.65rem,0.85vmin,0.8rem)]
                    leading-relaxed
                    text-slate-600
                  ">
                  {`# ${projectName}

${projectDescription}

## Features

- Real-time collaborative development
- Team collaboration
- Project workspace
- Live communication
- Secure project access

## Project Information

Files: ${projectFiles}
Last modified: ${projectModified}`}
                </pre>
              </div>
            </section>
          </div>

          {/* ================================================= */}
          {/* RIGHT */}
          {/* ================================================= */}

          <div className="min-w-0 space-y-[2vmin]">
            {/* ================================================= */}
            {/* CHAT */}
            {/* ================================================= */}

            <section
              className="
                rounded-[1.5vmin]
                border
                border-slate-200
                bg-white
                p-[1.7vmin]
                shadow-sm
              ">
              <div
                className="
                  flex
                  h-[4.5vmin]
                  w-[4.5vmin]
                  min-h-[40px]
                  min-w-[40px]
                  items-center
                  justify-center
                  rounded-[1vmin]
                  bg-violet-100
                  text-violet-600
                ">
                <MessageCircle className="h-[2.4vmin] w-[2.4vmin] min-h-[20px] min-w-[20px]" />
              </div>

              <h2 className="mt-[1.2vmin] text-[clamp(1rem,1.5vmin,1.25rem)] font-semibold">
                Chat Room
              </h2>

              <p
                className="
                  mt-[0.6vmin]
                  text-[clamp(0.75rem,0.95vmin,0.9rem)]
                  leading-relaxed
                  text-slate-500
                ">
                Discuss ideas, share updates and communicate with your project
                team.
              </p>

              <Button
                type="button"
                onClick={handleOpenChat}
                className="
                  mt-[1.5vmin]
                  h-auto
                  w-full
                  rounded-[1vmin]
                  bg-indigo-600
                  px-[1vmin]
                  py-[1.1vmin]
                  text-[clamp(0.75rem,1vmin,0.9rem)]
                  hover:bg-indigo-700
                ">
                <MessageCircle className="mr-[0.6vmin] h-[2vmin] w-[2vmin]" />
                Open Chat Room
              </Button>
            </section>

            {/* ================================================= */}
            {/* PROJECT STATS */}
            {/* ================================================= */}

            <section
              className="
                rounded-[1.5vmin]
                border
                border-slate-200
                bg-white
                p-[1.7vmin]
                shadow-sm
              ">
              <h2 className="text-[clamp(1rem,1.4vmin,1.2rem)] font-semibold">
                Project Overview
              </h2>

              <div className="mt-[1.5vmin] grid grid-cols-2 gap-[1vmin]">
                <div className="rounded-[1vmin] bg-slate-50 p-[1.2vmin]">
                  <p className="text-[clamp(0.65rem,0.8vmin,0.75rem)] text-slate-400">
                    Files
                  </p>

                  <p className="mt-[0.4vmin] text-[clamp(1.1rem,1.8vmin,1.5rem)] font-bold text-slate-900">
                    {projectFiles}
                  </p>
                </div>

                <div className="rounded-[1vmin] bg-slate-50 p-[1.2vmin]">
                  <p className="text-[clamp(0.65rem,0.8vmin,0.75rem)] text-slate-400">
                    Members
                  </p>

                  <p className="mt-[0.4vmin] text-[clamp(1.1rem,1.8vmin,1.5rem)] font-bold text-slate-900">
                    {teamMembers.length}
                  </p>
                </div>
              </div>
            </section>

            {/* ================================================= */}
            {/* QUICK ACTIONS */}
            {/* ================================================= */}

            <section
              className="
                rounded-[1.5vmin]
                border
                border-slate-200
                bg-white
                p-[1.7vmin]
                shadow-sm
              ">
              <h2 className="text-[clamp(1rem,1.4vmin,1.2rem)] font-semibold">
                Quick Actions
              </h2>

              <div className="mt-[1.2vmin] space-y-[0.7vmin]">
                <button
                  type="button"
                  onClick={handleOpenWorkspace}
                  className="
                    flex
                    w-full
                    items-center
                    gap-[1vmin]
                    rounded-[1vmin]
                    border
                    border-slate-200
                    p-[1vmin]
                    text-left
                    transition
                    hover:border-indigo-200
                    hover:bg-indigo-50
                  ">
                  <BriefcaseBusiness className="h-[2.2vmin] w-[2.2vmin] min-h-[18px] min-w-[18px] text-indigo-600" />

                  <div>
                    <p className="text-sm font-semibold">Open Workspace</p>

                    <p className="text-xs text-slate-400">Start coding</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleOpenChat}
                  className="
                    flex
                    w-full
                    items-center
                    gap-[1vmin]
                    rounded-[1vmin]
                    border
                    border-slate-200
                    p-[1vmin]
                    text-left
                    transition
                    hover:border-violet-200
                    hover:bg-violet-50
                  ">
                  <MessageCircle className="h-[2.2vmin] w-[2.2vmin] min-h-[18px] min-w-[18px] text-violet-600" />

                  <div>
                    <p className="text-sm font-semibold">Project Chat</p>

                    <p className="text-xs text-slate-400">
                      Talk with your team
                    </p>
                  </div>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
