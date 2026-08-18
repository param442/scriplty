import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import "./index.css";

import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import Projects from "./pages/ProjectPage";
import ProjectDetails from "./pages/ProjectDetails";
import Messages from "./pages/Messages";

import AccountSettings from "./pages/settings/AccountSettings";
import AboutSettings from "./pages/settings/AboutSettings";
import PreferencesSettings from "./pages/settings/PreferencesSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import BillingSettings from "./pages/settings/BillingSettings";

import VerifyEmail from "./pages/VerifyEmail";

import { protectedLoader, guestOnlyLoader } from "./lib/utils";

import { Toaster } from "@/components/ui/sonner";

/* =========================================================
   PROTECTED LAYOUT
========================================================= */

const ProtectedLayout = () => {
  return <Outlet />;
};

/* =========================================================
   ROUTER
========================================================= */

const router = createBrowserRouter([
  /* =======================================================
     PUBLIC ROUTES
  ======================================================= */

  {
    path: "/",
    loader: guestOnlyLoader,
    Component: App,
  },

  {
    path: "/login",
    loader: guestOnlyLoader,
    Component: Login,
  },

  {
    path: "/signup",
    loader: guestOnlyLoader,
    Component: SignUp,
  },

  {
    path: "/verify-email",
    Component: VerifyEmail,
  },

  /* =======================================================
     PROTECTED ROUTES
     
     Everything inside this route requires authentication.
  ======================================================= */

  {
    loader: protectedLoader,
    Component: ProtectedLayout,

    children: [
      /* ================================================
         DASHBOARD
      ================================================ */

      {
        path: "/dashboard",
        Component: Dashboard,
      },

      /* ================================================
         PROJECTS
      ================================================ */

      {
        path: "/projects",
        Component: Projects,
      },

      /* ================================================
         INDIVIDUAL PROJECT
         
         /projects/scriptly
         /projects/abc123
      ================================================ */

      {
        path: "/projects/:id",
        Component: ProjectDetails,
      },

      /* ================================================
         WORKSPACE
      ================================================ */

      {
        path: "/workspace",
        Component: Workspace,
      },

      /* ================================================
         MESSAGES
      ================================================ */

      {
        path: "/messages",
        Component: Messages,
      },

      /* ================================================
         SETTINGS
      ================================================ */

      {
        path: "/settings/account",
        Component: AccountSettings,
      },

      {
        path: "/settings/preferences",
        Component: PreferencesSettings,
      },

      {
        path: "/settings/security",
        Component: SecuritySettings,
      },

      {
        path: "/settings/notifications",
        Component: NotificationSettings,
      },

      {
        path: "/settings/billing",
        Component: BillingSettings,
      },

      {
        path: "/settings/about",
        Component: AboutSettings,
      },
    ],
  },
]);

/* =========================================================
   APP
========================================================= */

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>,
);
