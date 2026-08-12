import { motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import CreateProjectModal from "./CreateProjectModal";

type NewProjectButtonProps = {
  onClick?: () => void;
};

const NewProjectButton = ({ onClick }: NewProjectButtonProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setInternalOpen(true);
    }
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/20 cursor-pointer">
        <Plus size={18} />
        New Project
      </motion.button>

      {!onClick && (
        <CreateProjectModal
          isOpen={internalOpen}
          onClose={() => setInternalOpen(false)}
        />
      )}
    </>
  );
};

export default NewProjectButton;

