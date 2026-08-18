import { BookOpen, Copy, FileCode2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectReadmeProps = {
  content?: string;
};

const defaultReadme = `# Scriptly

Scriptly is a real-time collaborative code editor that
allows developers to write, share, and code together.

## Features

- Real-time code editing
- Syntax highlighting
- Live collaboration
- Shareable rooms
- Secure authentication
- Team communication

## Tech Stack

- Frontend: React + TypeScript
- Styling: Tailwind CSS + shadcn/ui
- Backend: Node.js
- Database: PostgreSQL
- Real-time: WebSocket`;

const ProjectReadme = ({ content = defaultReadme }: ProjectReadmeProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error("Failed to copy README:", error);
    }
  };

  return (
    <Card className="h-full rounded-2xl border-slate-200/80 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen size={20} className="text-slate-600" />
          README
        </CardTitle>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-9 w-9 text-slate-400 hover:text-slate-700">
          <Copy size={17} />
        </Button>
      </CardHeader>

      <CardContent>
        <div
          className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-slate-950
          ">
          {/* Code header */}

          <div className="flex h-10 items-center justify-between border-b border-white/10 px-3">
            <div className="flex items-center gap-2">
              <FileCode2 size={15} className="text-slate-400" />

              <span className="text-xs font-medium text-slate-400">
                README.md
              </span>
            </div>

            <span className="text-[10px] text-slate-500">Markdown</span>
          </div>

          {/* README */}

          <pre
            className="
              max-h-[420px]
              overflow-auto
              p-4
              font-mono
              text-xs
              leading-6
              text-slate-300
              sm:p-5
              sm:text-sm
            ">
            <code>{content}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectReadme;
