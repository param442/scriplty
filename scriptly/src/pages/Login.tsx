import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import { ArrowRight, Mail, Lock } from "lucide-react";

const inputClass =
  "w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-violet-400 focus:bg-white hover:border-slate-300 transition-all";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-violet-600 font-semibold hover:underline underline-offset-2">
            Sign up for free
          </Link>
        </>
      }
      sideTitle="Welcome back to Scriptly"
      sideDescription="Pick up where you left off and keep collaborating with your team in real time."
      sideHighlights={[
        "Real-time sync across all devices",
        "Live cursors & presence indicators",
        "50+ languages supported",
      ]}>
      <SocialAuthButtons />

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">
            Email address
          </label>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <button
              type="button"
              className="text-xs font-medium text-violet-600 hover:text-violet-700 hover:underline underline-offset-2">
              Forgot password?
            </button>
          </div>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            className="size-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500/30 cursor-pointer"
          />
          <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
            Remember me for 30 days
          </span>
        </label>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/40 hover:scale-[1.01] transition-all">
          Sign in
          <ArrowRight className="size-4 ml-1" />
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
