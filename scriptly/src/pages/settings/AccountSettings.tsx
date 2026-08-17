import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { checkAuth, type AuthUser } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AccountSettings = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const authUser = await checkAuth();
      if (!authUser) {
        navigate("/login");
      } else {
        setUser(authUser);
      }
    };
    init();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50/50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" className="mb-6 -ml-4 hover:bg-violet-100 hover:text-violet-700 transition-colors" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-violet-100 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl shadow-md text-white">
              <ArrowLeft className="h-6 w-6 hidden" /> {/* Placeholder icon size */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent">Account Profile</h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your public profile and personal details.
              </p>
            </div>
          </div>
          <Separator className="my-6 bg-violet-100" />
          
          <div className="space-y-6 max-w-xl">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user?.name || ""} placeholder="Your name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={user?.email || ""} placeholder="Your email address" readOnly className="bg-slate-50 text-slate-500" />
              <p className="text-xs text-slate-500">Your email address is used for login and cannot be changed here.</p>
            </div>

            <div className="pt-4">
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all border-0">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
