import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectChatProps = {
  memberCount: number;
  onOpenChat: () => void;
};

const ProjectChat = ({ memberCount, onOpenChat }: ProjectChatProps) => {
  return (
    <Card className="h-full rounded-2xl border-slate-200/80 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare size={20} />
          Chat Room
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col">
        <p className="text-sm leading-6 text-slate-600">
          Discuss ideas, share updates and communicate with your team.
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {memberCount} team members are in this project.
        </p>

        <motion.div
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6">
          <Button
            type="button"
            onClick={onOpenChat}
            className="
              h-11
              w-full
              rounded-xl
              bg-blue-600
              text-white
              shadow-sm
              transition-all
              hover:bg-blue-700
              hover:shadow-md
            ">
            <MessageSquare size={18} />
            Open Chat Room
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ProjectChat;
