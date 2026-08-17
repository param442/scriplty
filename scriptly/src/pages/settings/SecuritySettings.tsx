import { useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const SecuritySettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50/50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" className="mb-6 -ml-4 hover:bg-emerald-100 hover:text-emerald-700 transition-colors" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-100 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-md text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Security Settings</h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your password, 2FA, and active sessions.
              </p>
            </div>
          </div>
          <Separator className="my-6 bg-emerald-100" />
          
          <div className="space-y-6 max-w-xl text-sm text-slate-600">
            <p>Security configuration coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
