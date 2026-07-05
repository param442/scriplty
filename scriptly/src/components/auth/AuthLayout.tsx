import { Link } from "react-router";
import { ArrowLeft, Code2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import TypewriterCode from "./TypewriterCode";

type AuthLayoutProps = {
  title: string;
  subtitle: ReactNode;
  sideTitle: string;
  sideDescription: string;
  sideHighlights: string[];
  children: ReactNode;
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const fadeSlideIn = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const AuthLayout = ({
  title,
  subtitle,
  sideTitle,
  sideDescription,
  sideHighlights,
  children,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-800 items-center justify-center p-12 overflow-hidden">
        <motion.div
          className="absolute top-10 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          animate={{ y: [0, -24, 0], x: [0, 16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <motion.div
          className="relative max-w-lg space-y-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible">
          <motion.div variants={fadeSlideIn}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <div className="flex items-center justify-center size-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
                <Code2 className="size-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">Scriptly</span>
            </Link>
          </motion.div>

          <motion.div className="space-y-4" variants={fadeSlideIn}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-violet-100 text-xs font-medium uppercase tracking-wider">
              <Sparkles className="size-3.5" />
              Collaborative coding
            </div>

            <h2 className="text-4xl xl:text-5xl font-bold leading-tight text-white">
              {sideTitle}
            </h2>

            <p className="text-violet-100/90 text-lg leading-relaxed">
              {sideDescription}
            </p>
          </motion.div>

          <motion.ul className="space-y-3" variants={staggerContainer}>
            {sideHighlights.map((item) => (
              <motion.li
                key={item}
                variants={fadeSlideIn}
                className="flex items-center gap-3 text-white/90 text-sm">
                <span className="flex items-center justify-center size-6 rounded-full bg-emerald-400/20 border border-emerald-300/30 text-emerald-300 text-xs font-bold">
                  ✓
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <TypewriterCode />
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 sm:py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-violet-50/70 -z-20" />

        <motion.div
          className="absolute top-0 right-0 w-80 h-80 bg-violet-300/20 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-300/15 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div
          className="w-full max-w-md space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible">
          <motion.div variants={fadeSlideUp}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 transition-colors group">
              <motion.div whileHover={{ x: -3 }}>
                <ArrowLeft className="size-4" />
              </motion.div>
              Back to home
            </Link>
          </motion.div>

          <motion.div variants={fadeSlideUp} className="lg:hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-900">
              <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                <Code2 className="size-4" />
              </div>
              <span className="font-bold text-lg">Scriptly</span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeSlideUp}
            whileHover={{ y: -2 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="relative">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-500/40 via-indigo-500/20 to-transparent blur-sm" />

            <div className="relative rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-xl shadow-violet-500/10 p-8 sm:p-10 space-y-7">
              <motion.div
                className="space-y-2 text-center sm:text-left"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25,
                  duration: 0.45,
                }}>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {title}
                </h1>

                <p className="text-sm sm:text-base text-slate-500">
                  {subtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                }}>
                {children}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
