import { motion, useScroll, useTransform } from "motion/react";
import { type ReactNode } from "react";

type ScrollRevealHeadingProps = {
  children: ReactNode;
  className?: string;
};

const ScrollRevealHeading = ({
  children,
  className = "",
}: ScrollRevealHeadingProps) => {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 60, 200], [0.32, 0.72, 1]);
  const scale = useTransform(scrollY, [0, 200], [0.94, 1]);
  const y = useTransform(scrollY, [0, 200], [16, 0]);
  const blur = useTransform(scrollY, [0, 60, 200], [10, 4, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.h1 style={{ opacity, scale, y, filter }} className={className}>
      {children}
    </motion.h1>
  );
};

type PopWordProps = {
  word: string;
  index: number;
  className?: string;
};

export const PopWord = ({ word, index, className = "" }: PopWordProps) => (
  <motion.span
    initial={{ opacity: 0, y: 40, rotateX: -40, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
    transition={{
      delay: 0.15 + index * 0.08,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    }}
    className={`inline-block mr-[0.28em] origin-bottom ${className}`}
    style={{ perspective: 700 }}>
    {word}
  </motion.span>
);

export default ScrollRevealHeading;
