import { useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AboutSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" className="mb-6 -ml-4" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div>
            <h1 className="text-2xl font-semibold">About Scriptly</h1>
            <p className="text-sm text-slate-500 mt-1">
              Information about the application.
            </p>
          </div>
          <Separator className="my-6" />
          
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
