import { motion } from "motion/react";
import { Code2, FolderPlus, Sparkles } from "lucide-react";
import ScrollRevealHeading, { PopWord } from "./ScrollRevealHeading";

type EmptyProjectsProps = {
  userName: string;
  onCreateProject?: () => void;
};

const features = [
  {
    icon: Code2,
    title: "Real-time Collaboration",
    description:
      "Invite teammates and code together instantly with live updates.",
  },
  {
    icon: FolderPlus,
    title: "Organize Projects",
    description:
      "Keep all your applications, experiments, and ideas organized in one place.",
  },
  {
    icon: Sparkles,
    title: "Cloud Workspace",
    description: "Access your projects securely from anywhere, anytime.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.12,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const EmptyProjects = ({ userName, onCreateProject }: EmptyProjectsProps) => {
  const headingWords = ["Hello,", `${userName}`, "👋"];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-700 p-8 sm:p-12 lg:px-16 lg:py-20 text-white">
      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur">
          <Code2 size={44} />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
          <Sparkles size={16} />
          Welcome to Scriptly
        </motion.span>

        <ScrollRevealHeading className="text-4xl font-bold sm:text-5xl lg:text-6xl">
          {headingWords.map((word, i) => (
            <PopWord
              key={`${word}-${i}`}
              word={word}
              index={i}
              className="text-white"
            />
          ))}
        </ScrollRevealHeading>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-violet-100/80">
          Your workspace is ready, but you haven&apos;t created any projects yet.
          Build your first collaborative coding workspace and start coding with
          your team in real time.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.45 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCreateProject}
          className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-semibold text-violet-700 shadow-xl shadow-black/10">
          <FolderPlus size={22} />
          Create Your First Project
        </motion.button>

        <div className="mt-16 grid w-full gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur transition-shadow hover:bg-white/15 hover:shadow-lg hover:shadow-violet-900/20">
              <div className="mb-3 inline-flex rounded-xl bg-white/10 p-3">
                <feature.icon size={22} />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-violet-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmptyProjects;
