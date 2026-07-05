import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type CodeSegment = { text: string; color: string };

const CODE_LINES: CodeSegment[][] = [
  [
    { text: "const ", color: "text-violet-400" },
    { text: "team", color: "text-sky-300" },
    { text: " = ", color: "text-slate-400" },
    { text: "await ", color: "text-amber-300" },
    { text: "Scriptly", color: "text-emerald-300" },
    { text: ".", color: "text-slate-400" },
    { text: "connect", color: "text-sky-300" },
    { text: "();", color: "text-slate-400" },
  ],
  [
    { text: "team", color: "text-violet-400" },
    { text: ".", color: "text-slate-400" },
    { text: "collaborate", color: "text-sky-300" },
    { text: "(", color: "text-slate-400" },
    { text: "'real-time'", color: "text-emerald-300" },
    { text: ");", color: "text-slate-400" },
  ],
];

type CharToken = { char: string; color: string; lineIndex: number };

function flattenCode(lines: CodeSegment[][]): CharToken[] {
  const tokens: CharToken[] = [];
  lines.forEach((line, lineIndex) => {
    for (const segment of line) {
      for (const char of segment.text) {
        tokens.push({ char, color: segment.color, lineIndex });
      }
    }
  });
  return tokens;
}

const TYPE_SPEED_MS = 55;
const DELETE_SPEED_MS = 35;
const PAUSE_AT_END_MS = 1800;
const PAUSE_AT_START_MS = 400;

const charVariants = {
  initial: { opacity: 0, y: 10, scale: 0.85, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.85,
    filter: "blur(2px)",
    transition: { duration: 0.1, ease: "easeIn" as const },
  },
};

const TypewriterCode = () => {
  const tokens = useMemo(() => flattenCode(CODE_LINES), []);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const total = tokens.length;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && visibleCount < total) {
      timeoutId = setTimeout(() => setVisibleCount((c) => c + 1), TYPE_SPEED_MS);
    } else if (!isDeleting && visibleCount === total) {
      timeoutId = setTimeout(() => setIsDeleting(true), PAUSE_AT_END_MS);
    } else if (isDeleting && visibleCount > 0) {
      timeoutId = setTimeout(() => setVisibleCount((c) => c - 1), DELETE_SPEED_MS);
    } else if (isDeleting && visibleCount === 0) {
      timeoutId = setTimeout(() => setIsDeleting(false), PAUSE_AT_START_MS);
    }

    return () => clearTimeout(timeoutId);
  }, [visibleCount, isDeleting, tokens.length]);

  const visibleTokens = tokens.slice(0, visibleCount);
  const lastVisible = visibleTokens[visibleTokens.length - 1];
  const cursorLineIndex = lastVisible?.lineIndex ?? 0;

  return (
    <motion.div
      className="relative mt-8"
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}>
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-violet-400/30 to-indigo-400/30 rounded-2xl blur-lg"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl font-mono text-sm leading-relaxed min-h-[108px]">
        <div className="flex items-center gap-2 mb-4">
          <motion.span
            className="size-3 rounded-full bg-red-400/80"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="size-3 rounded-full bg-amber-400/80"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.span
            className="size-3 rounded-full bg-emerald-400/80"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          <span className="ml-2 text-slate-500 text-xs">main.js</span>
        </div>

        <div>
          {CODE_LINES.map((_, lineIndex) => {
            const lineChars = visibleTokens.filter(
              (t) => t.lineIndex === lineIndex
            );
            const isCursorLine = lineIndex === cursorLineIndex;
            const isEmptyLine =
              lineChars.length === 0 && lineIndex === 0 && visibleCount === 0;

            if (lineChars.length === 0 && !isCursorLine && !isEmptyLine) {
              return <p key={lineIndex} className={lineIndex > 0 ? "mt-1" : ""} />;
            }

            return (
              <p key={lineIndex} className={lineIndex > 0 ? "mt-1" : undefined}>
                <AnimatePresence mode="popLayout">
                  {tokens.map((token, index) => {
                    if (token.lineIndex !== lineIndex || index >= visibleCount) {
                      return null;
                    }

                    return (
                      <motion.span
                        key={index}
                        variants={charVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={`inline-block ${token.color}`}>
                        {token.char}
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
                {isCursorLine && (
                  <motion.span
                    className="inline-block w-[2px] h-[1.1em] bg-violet-400 ml-px align-[-2px]"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      times: [0, 0.45, 0.5, 1],
                      ease: "linear",
                    }}
                  />
                )}
              </p>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default TypewriterCode;
