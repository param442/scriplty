import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { UserCircle2, Info } from "lucide-react";

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
          <SheetTitle className="text-xl font-semibold">Settings</SheetTitle>
          <SheetDescription className="text-slate-500">
            Navigate to specific settings pages.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-left px-4 py-6 hover:bg-white hover:shadow-sm"
            onClick={() => handleNavigate("/settings/account")}
          >
            <UserCircle2 className="mr-3 h-5 w-5 text-violet-600" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Account</span>
              <span className="text-xs text-slate-500 font-normal">Profile and personal details</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left px-4 py-6 hover:bg-white hover:shadow-sm"
            onClick={() => handleNavigate("/settings/about")}
          >
            <Info className="mr-3 h-5 w-5 text-violet-600" />
            <div className="flex flex-col items-start">
              <span className="font-medium">About</span>
              <span className="text-xs text-slate-500 font-normal">App version and info</span>
            </div>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsSidebar;
