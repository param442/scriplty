import { useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MessageSquare, Send, Search, UserCircle2 } from "lucide-react";

const MessagesSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50/50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Button variant="ghost" className="mb-6 -ml-4 hover:bg-sky-100 hover:text-sky-700 transition-colors" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-sky-100 overflow-hidden flex h-[600px]">
          {/* Sidebar */}
          <div className="w-80 border-r border-sky-100 flex flex-col bg-slate-50/50">
            <div className="p-4 border-b border-sky-100">
              <h2 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-sky-600" />
                Messages
              </h2>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input placeholder="Search messages..." className="pl-9 bg-white border-sky-100" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Chat Item 1 */}
              <div className="p-4 flex items-center gap-3 cursor-pointer bg-sky-50 border-l-4 border-sky-500">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                  <UserCircle2 size={24} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-800 text-sm">Design Team</span>
                    <span className="text-xs text-slate-400">10:42 AM</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">Alice: The new mockups look great!</p>
                </div>
              </div>

              {/* Chat Item 2 */}
              <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100 border-l-4 border-transparent transition-colors">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                  <UserCircle2 size={24} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-slate-700 text-sm">Bob Smith</span>
                    <span className="text-xs text-slate-400">Yesterday</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">Are we still on for the 3 PM meeting?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col bg-white">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 shadow-sm z-10">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                <UserCircle2 size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Design Team</h3>
                <p className="text-xs text-slate-500">3 Members</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <UserCircle2 size={20} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-sm text-slate-700">Alice</span>
                    <span className="text-xs text-slate-400">10:30 AM</span>
                  </div>
                  <div className="mt-1 bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-600 inline-block">
                    Hey team, I just uploaded the new mockups for the dashboard.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0">
                  <UserCircle2 size={20} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-sm text-slate-700">Charlie</span>
                    <span className="text-xs text-slate-400">10:35 AM</span>
                  </div>
                  <div className="mt-1 bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-600 inline-block">
                    Looks awesome! I'll start implementing the changes today.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 flex-row-reverse">
                <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-white shrink-0">
                  <UserCircle2 size={20} />
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-400">10:42 AM</span>
                    <span className="font-medium text-sm text-slate-700">You</span>
                  </div>
                  <div className="mt-1 bg-sky-500 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm inline-block">
                    Great work Alice! Let me know if you need any API changes Charlie.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="flex gap-2">
                <Input placeholder="Type a message..." className="flex-1 bg-slate-50 border-slate-200 focus-visible:ring-sky-500" />
                <Button className="bg-sky-500 hover:bg-sky-600 text-white shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesSettings;
