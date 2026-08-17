import { useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell } from "lucide-react";

const NotificationSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50/50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" className="mb-6 -ml-4 hover:bg-amber-100 hover:text-amber-700 transition-colors" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-amber-100 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-md text-white">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Notification Settings</h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your email and push notification preferences.
              </p>
            </div>
          </div>
          <Separator className="my-6 bg-amber-100" />
          
          <div className="space-y-6 max-w-xl text-sm text-slate-600">
            <p>Notifications configuration coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
