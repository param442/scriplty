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
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" className="mb-6 -ml-4" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div>
            <h1 className="text-2xl font-semibold">Account Profile</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your public profile and personal details.
            </p>
          </div>
          <Separator className="my-6" />
          
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
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
