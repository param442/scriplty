import { Link } from "react-router";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import CodePreview from "../assets/img/CodePreview.png";
import {
  ArrowRight,
  Code2,
  Globe,
  MousePointer2,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Real-time Editing",
    description: "Work on code simultaneously with your team — no refresh needed.",
    color: "from-violet-500/20 to-violet-600/5",
    iconColor: "text-violet-500",
  },
  {
    icon: Code2,
    title: "Multi-language Support",
    description: "JavaScript, Python, C++, and more — all in one workspace.",
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-500",
  },
  {
    icon: MousePointer2,
    title: "Live Cursors",
    description: "See exactly where teammates are editing in real time.",
    color: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-500",
  },
  {
    icon: Zap,
    title: "No Setup Needed",
    description: "Open your browser and start coding in seconds.",
    color: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-500",
  },
];

const stats = [
  { value: "10K+", label: "Active developers" },
  { value: "50+", label: "Languages supported" },
  { value: "99.9%", label: "Uptime" },
];

const Homepage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 px-6 sm:px-10 lg:px-16 py-16 lg:py-24 min-h-[85vh]">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-violet-50/60" />
        <div className="absolute top-20 -left-32 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl -z-10" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Left content */}
        <div className="flex-1 max-w-xl lg:max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100/80 border border-violet-200/60 text-violet-700 text-sm font-medium">
            <Sparkles className="size-4" />
            Built for teams who ship fast
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Collaborative Code Editing,{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Simplified.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg">
            Edit your code with your team in real-time. Share, pair, and ship
            together — all from the browser.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="text-base h-12 px-8 rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all">
              <Link to="/signup">
                Get Started
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base h-12 px-8 rounded-xl border-slate-300 hover:bg-slate-50">
              <Link to="/login">View Demo</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-4 border-t border-slate-200/80">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1 flex justify-center lg:justify-end w-full max-w-2xl">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
              <img
                src={CodePreview}
                alt="Scriptly code editor preview"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-lg">
              <span className="relative flex size-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-slate-700">
                3 teammates online
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-violet-400 text-sm font-medium uppercase tracking-wider">
              <Globe className="size-4" />
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Everything you need to{" "}
              <span className="text-violet-400">collaborate</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Powerful tools designed for modern development teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/40 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`size-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to code together?
          </h2>
          <p className="text-violet-100 text-lg">
            Join thousands of developers already using Scriptly to build better
            software, faster.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="h-12 px-8 rounded-xl text-base font-semibold hover:scale-[1.02] transition-transform">
            <Link to="/signup">
              Start for free
              <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-white text-lg">Scriptly</p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Scriptly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
