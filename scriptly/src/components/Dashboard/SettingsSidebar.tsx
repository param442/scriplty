import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { UserCircle2, Info, Paintbrush, ShieldCheck, Bell, CreditCard, MessageSquare } from "lucide-react";

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsSidebar = ({ isOpen, onClose }: SettingsSidebarProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-50 flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-slate-200 bg-white">
          <SheetTitle className="text-xl font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Settings
          </SheetTitle>
          <SheetDescription className="text-slate-500">
            Manage your account and preferences.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-left px-4 py-6 hover:bg-violet-50 hover:shadow-sm group transition-all"
            onClick={() => handleNavigate("/settings/account")}
          >
            <div className="mr-4 p-2 rounded-lg bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <UserCircle2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-700 group-hover:text-violet-700">Account</span>
              <span className="text-xs text-slate-500 font-normal">Profile and personal details</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left px-4 py-6 hover:bg-pink-50 hover:shadow-sm group transition-all"
            onClick={() => handleNavigate("/settings/preferences")}
          >
            <div className="mr-4 p-2 rounded-lg bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors">
              <Paintbrush className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-700 group-hover:text-pink-700">Preferences</span>
              <span className="text-xs text-slate-500 font-normal">Theme and appearance</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left px-4 py-6 hover:bg-emerald-50 hover:shadow-sm group transition-all"
            onClick={() => handleNavigate("/settings/security")}
          >
            <div className="mr-4 p-2 rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-700 group-hover:text-emerald-700">Security</span>
              <span className="text-xs text-slate-500 font-normal">Password and sessions</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left px-4 py-6 hover:bg-sky-50 hover:shadow-sm group transition-all"
            onClick={() => handleNavigate("/settings/messages")}
          >
            <div className="mr-4 p-2 rounded-lg bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-700 group-hover:text-sky-700">Messages</span>
              <span className="text-xs text-slate-500 font-normal">Team chats and direct messages</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left px-4 py-6 hover:bg-amber-50 hover:shadow-sm group transition-all"
            onClick={() => handleNavigate("/settings/notifications")}
          >
            <div className="mr-4 p-2 rounded-lg bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-700 group-hover:text-amber-700">Notifications</span>
              <span className="text-xs text-slate-500 font-normal">Email and alerts</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left px-4 py-6 hover:bg-blue-50 hover:shadow-sm group transition-all"
            onClick={() => handleNavigate("/settings/billing")}
          >
            <div className="mr-4 p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-700 group-hover:text-blue-700">Billing</span>
              <span className="text-xs text-slate-500 font-normal">Plans and payment</span>
            </div>
          </Button>

          <div className="my-2 border-t border-slate-200"></div>

          <Button
            variant="ghost"
            className="w-full justify-start text-left px-4 py-6 hover:bg-slate-100 hover:shadow-sm group transition-all"
            onClick={() => handleNavigate("/settings/about")}
          >
            <div className="mr-4 p-2 rounded-lg bg-slate-200 text-slate-600 group-hover:bg-slate-600 group-hover:text-white transition-colors">
              <Info className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-slate-700 group-hover:text-slate-900">About</span>
              <span className="text-xs text-slate-500 font-normal">App version and info</span>
            </div>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsSidebar;
