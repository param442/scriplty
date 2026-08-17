import { useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AboutSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" className="mb-6 -ml-4 hover:bg-slate-100 transition-colors" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl shadow-md text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">About Scriptly</h1>
              <p className="text-sm text-slate-500 mt-1">
                Information about the application.
              </p>
            </div>
          </div>
          <Separator className="my-6 bg-slate-100" />
          
          <div className="space-y-4 max-w-xl text-sm text-slate-600">
            <p>
              <strong>Scriptly</strong> is a collaborative coding platform designed to help developers build and share ideas seamlessly.
            </p>
            <p>
              Version: 1.0.0 (Beta)
            </p>
            <p>
              Built with React, Tailwind CSS, and shadcn/ui.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSettings;
