import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createAuthClient } from "better-auth/react";
import { redirect } from "react-router";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified: boolean;
};

const FRONTEND_URL =
  import.meta.env.VITE_FRONTEND_URL ?? "http://localhost:5173";

export const authClient = createAuthClient({
  baseURL: FRONTEND_URL,
  fetchOptions: {
    credentials: "include",
  },
});

const signUpWithEmail = async (
  name: string,
  email: string,
  password: string,
) => {
  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
  });

  if (error) {
    alert(error);
    throw new Error(error.message);
  }

  return data;
};

const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const logoutUser = async () => {
  const { error } = await authClient.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

const checkAuth = async (): Promise<AuthUser | null> => {
  try {
    const { data, error } = await authClient.getSession();

    if (error || !data) {
      return null;
    }

    return data.user;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return null;
  }
};

const signInWithGoogle = async () => {
  const { error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: `${FRONTEND_URL}/dashboard`,
  });

  if (error) {
    console.error("Google login error:", error);
  }
};

const signInWithGithub = async () => {
  const { error } = await authClient.signIn.social({
    provider: "github",
    callbackURL: `${FRONTEND_URL}/dashboard`,
  });

  if (error) {
    console.error("GitHub login error:", error);
  }
};

// Loader for protected routes: if no active session, send to /login
const protectedLoader = async () => {
  const user = await checkAuth();

  if (!user) {
    throw redirect("/login");
  }

  return user;
};

// Loader for homepage and guest pages: if active session exists, send to /dashboard
const guestOnlyLoader = async () => {
  const user = await checkAuth();

  if (user) {
    throw redirect("/dashboard");
  }

  return null;
};

// resend verification email function
const resendVerificationEmail = async (email: string) => {
  const { error } = await authClient.sendVerificationEmail({
    email,
    callbackURL: "/verify-email",
  });

  if (error) {
    console.error("Error sending verification email:", error);
    return;
  }

  toast.success("Verification email sent!");
};

const verifyEmail = async (token: string) => {
  const { error } = await authClient.verifyEmail({
    query: {
      token,
      callbackURL: "/dashboard",
    },
  });

  if (error) {
    console.error("Error verifying email:", error);
    return { success: false, token: null };
  }
  return { success: true, token };
};
export {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithGithub,
  logoutUser,
  checkAuth,
  protectedLoader,
  guestOnlyLoader,
  resendVerificationEmail,
  verifyEmail,
};
