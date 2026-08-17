import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useState } from "react";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const conversations = [
  {
    id: "1",
    name: "Alex Johnson",
    lastMessage: "Can you check the latest update?",
    time: "10:42 AM",
  },
  {
    id: "2",
    name: "Sarah Williams",
    lastMessage: "Looks good!",
    time: "9:15 AM",
  },
  {
    id: "3",
    name: "Mike Chen",
    lastMessage: "I'll take a look.",
    time: "Yesterday",
  },
];

const messages = [
  {
    id: "1",
    sender: "Alex Johnson",
    text: "Hey, how's the project going?",
    mine: false,
  },
  {
    id: "2",
    sender: "You",
    text: "It's going well. I'm working on the new feature now.",
    mine: true,
  },
  {
    id: "3",
    sender: "Alex Johnson",
    text: "Nice! Let me know if you need anything.",
    mine: false,
  },
];

const ChatSidebar = ({ isOpen, onClose }: ChatSidebarProps) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const activeConversation = conversations.find(
    (chat) => chat.id === activeChat,
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    console.log("Sending:", message);

    setMessage("");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
        {!activeChat ? (
          <>
            <SheetHeader className="border-b px-6 py-5">
              <SheetTitle>Messages</SheetTitle>
              <SheetDescription>Your recent conversations</SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className="flex w-full items-start gap-3 border-b p-4 text-left transition-colors hover:bg-muted">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {chat.name.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{chat.name}</span>

                      <span className="shrink-0 text-xs text-muted-foreground">
                        {chat.time}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {chat.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Active Chat Header */}
            <SheetHeader className="border-b px-6 py-5">
              <button
                onClick={() => setActiveChat(null)}
                className="mb-2 w-fit text-sm text-muted-foreground hover:text-foreground">
                ← Back
              </button>

              <SheetTitle>{activeConversation?.name}</SheetTitle>

              <SheetDescription>Active conversation</SheetDescription>
            </SheetHeader>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.mine ? "justify-end" : "justify-start"
                  }`}>
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                      msg.mine
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex gap-2 border-t p-4">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />

              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Send
              </button>
            </form>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ChatSidebar;
