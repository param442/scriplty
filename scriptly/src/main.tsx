import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import { protectedLoader, guestOnlyLoader } from "./lib/utils";
import { Toaster } from "@/components/ui/sonner";
import VerifyEmail from "./pages/VerifyEmail";
const router = createBrowserRouter([
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
  {
    // protected routes
    loader: protectedLoader,
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/workspace",
        Component: Workspace,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />,
    <Toaster />
  </>,
);
