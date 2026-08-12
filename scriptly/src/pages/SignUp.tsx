import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import { ArrowRight, Mail, Lock, User, Loader2 } from "lucide-react";
import { signUpWithEmail } from "@/lib/utils";

const inputClass =
  "w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-violet-400 focus:bg-white hover:border-slate-300 transition-all";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const signUpResponse = await signUpWithEmail(name, email, password);
      console.log("SignUp response:", signUpResponse);
      navigate("/dashboard");
    } catch (err) {
      console.error("SignUp error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-violet-600 font-semibold hover:underline underline-offset-2">
            Sign in
          </Link>
        </>
      }
      sideTitle="Start coding together today"
      sideDescription="Create your free account and invite your team to collaborate in real time — no setup required."
      sideHighlights={[
        "Free forever for small teams",
        "No credit card required",
        "Instant workspace setup",
      ]}>
      <SocialAuthButtons />

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-slate-700">
            Full name
          </label>
          <div className="relative group">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-slate-700">
            Email address
          </label>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className={inputClass}
            />
          </div>
          <p className="text-xs text-slate-400 pl-1">
            Use 8+ characters with a mix of letters and numbers
          </p>
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            required
            defaultChecked
            className="size-4 mt-0.5 rounded border-slate-300 text-violet-600 focus:ring-violet-500/30 cursor-pointer"
          />
          <span className="text-sm text-slate-600 leading-snug group-hover:text-slate-800 transition-colors">
            I agree to the{" "}
            <span className="text-violet-600 font-medium hover:underline underline-offset-2">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-violet-600 font-medium hover:underline underline-offset-2">
              Privacy Policy
            </span>
          </span>
        </label>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/40 hover:scale-[1.01] transition-all cursor-pointer">
          {loading ? (
            <Loader2 className="size-5 animate-spin mx-auto" />
          ) : (
            <>
              Create account
              <ArrowRight className="size-4 ml-1" />
            </>
          )}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
