import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/workspace",
    Component: Workspace,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
