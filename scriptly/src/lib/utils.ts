import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createAuthClient } from "better-auth/react";

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
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

export const authClient = createAuthClient({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
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

export {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithGithub,
  logoutUser,
  checkAuth,
};
