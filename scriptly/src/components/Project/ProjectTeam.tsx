import { motion } from "motion/react";
import { ArrowUpRight, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ProjectTeamMember = {
  id: string;
  name: string;
  role: string;
  badge: string;
  initials: string;
  badgeClass: string;
};

type ProjectTeamProps = {
  members: ProjectTeamMember[];
  onMemberClick?: (member: ProjectTeamMember) => void;
};

const ProjectTeam = ({ members, onMemberClick }: ProjectTeamProps) => {
  return (
    <Card className="rounded-2xl border-slate-200/80 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users size={20} />
          Team Members
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{
              opacity: 0,
              x: -8,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.25,
              delay: index * 0.05,
            }}
            whileHover={{
              x: 3,
            }}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-transparent
              px-2
              py-2.5
              transition-colors
              hover:border-slate-200
              hover:bg-slate-50
            ">
            {/* Avatar */}

            <Avatar className="h-11 w-11 shrink-0">
              <AvatarFallback
                className="
                  bg-slate-100
                  font-semibold
                  text-slate-700
                ">
                {member.initials}
              </AvatarFallback>
            </Avatar>

            {/* Member information */}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {member.name}
                </p>

                <Badge variant="outline" className={member.badgeClass}>
                  {member.badge}
                </Badge>
              </div>

              <p className="mt-0.5 truncate text-sm text-slate-500">
                {member.role}
              </p>
            </div>

            {/* Open member */}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onMemberClick?.(member)}
              className="
                h-9
                w-9
                shrink-0
                text-blue-600
                hover:bg-blue-50
                hover:text-blue-700
              ">
              <ArrowUpRight size={18} />
            </Button>
          </motion.div>
        ))}

        {members.length === 0 && (
          <div className="flex min-h-32 items-center justify-center text-sm text-slate-400">
            No team members yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectTeam;
