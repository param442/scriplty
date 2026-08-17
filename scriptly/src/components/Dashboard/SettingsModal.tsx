import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { type AuthUser } from "@/lib/utils";
import { UserCircle2, Info } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser | null;
}

const SettingsModal = ({ isOpen, onClose, user }: SettingsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 h-[80vh] flex flex-col overflow-hidden bg-slate-50">
        <DialogHeader className="px-6 py-4 border-b border-slate-200 bg-white">
          <DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
          <DialogDescription className="sr-only">
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          <Tabs defaultValue="account" className="flex-1 flex w-full">
            {/* Sidebar */}
            <div className="w-64 bg-slate-100/50 border-r border-slate-200 flex-shrink-0 flex flex-col py-4">
              <TabsList className="flex flex-col h-auto bg-transparent items-stretch p-2 space-y-1">
                <TabsTrigger
                  value="account"
                  className="justify-start px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-violet-700"
                >
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="justify-start px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-violet-700"
                >
                  <Info className="mr-2 h-4 w-4" />
                  About
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-white p-8">
              <TabsContent value="account" className="m-0 space-y-6 outline-none">
                <div>
                  <h3 className="text-lg font-medium">Account Profile</h3>
                  <p className="text-sm text-slate-500">
                    Manage your public profile and personal details.
                  </p>
                </div>
                <Separator />
                
                <div className="space-y-4 max-w-xl">
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
              </TabsContent>

              <TabsContent value="about" className="m-0 space-y-6 outline-none">
                <div>
                  <h3 className="text-lg font-medium">About Scriptly</h3>
                  <p className="text-sm text-slate-500">
                    Information about the application.
                  </p>
                </div>
                <Separator />
                
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
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
