import { useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Paintbrush } from "lucide-react";

const PreferencesSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50/50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" className="mb-6 -ml-4 hover:bg-pink-100 hover:text-pink-700 transition-colors" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-pink-100 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-md text-white">
              <Paintbrush className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Preferences</h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your theme, language, and display settings.
              </p>
            </div>
          </div>
          <Separator className="my-6 bg-pink-100" />
          
          <div className="space-y-6 max-w-xl text-sm text-slate-600">
            <p>Preferences configuration coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings;
