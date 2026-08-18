import { useMemo, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Check,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  Smile,
} from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/* =========================================================
   TYPES
========================================================= */

type MessageUser = {
  id: string;
  name: string;
  role: string;
  initials: string;
  status: "online" | "away" | "offline";
  lastMessage: string;
  time: string;
  unread: number;
  type: "user" | "group" | "me";
  members?: number;
};

type ChatMessage = {
  id: number;
  sender: "me" | "user";
  senderId?: string;
  text: string;
  time: string;
};

/* =========================================================
   USERS
========================================================= */

const users: MessageUser[] = [
  {
    id: "team",
    name: "Team Chat",
    role: "Scriptly Team",
    initials: "TC",
    status: "online",
    lastMessage: "Amanpreet: I'll push the changes soon.",
    time: "2m",
    unread: 3,
    type: "group",
    members: 5,
  },
  {
    id: "aman",
    name: "Amanpreet Kaur",
    role: "Developer",
    initials: "AK",
    status: "online",
    lastMessage: "I'll push the changes soon.",
    time: "2m",
    unread: 2,
    type: "user",
  },
  {
    id: "rohit",
    name: "Rohit Sharma",
    role: "Developer",
    initials: "RS",
    status: "online",
    lastMessage: "Can you check the PR?",
    time: "18m",
    unread: 1,
    type: "user",
  },
  {
    id: "simran",
    name: "Simran Kaur",
    role: "UI/UX Designer",
    initials: "SK",
    status: "away",
    lastMessage: "The new design is ready.",
    time: "1h",
    unread: 0,
    type: "user",
  },
  {
    id: "harpreet",
    name: "Harpreet Singh",
    role: "QA Engineer",
    initials: "HS",
    status: "offline",
    lastMessage: "Everything looks good.",
    time: "3h",
    unread: 0,
    type: "user",
  },
  {
    id: "me",
    name: "Me",
    role: "Param Singh",
    initials: "PS",
    status: "online",
    lastMessage: "Notes and saved messages",
    time: "",
    unread: 0,
    type: "me",
  },
];

/* =========================================================
   INITIAL CONVERSATIONS
========================================================= */

const initialConversations: Record<string, ChatMessage[]> = {
  team: [
    {
      id: 1,
      sender: "user",
      senderId: "aman",
      text: "Hey everyone, how is the dashboard coming along?",
      time: "10:20 AM",
    },
    {
      id: 2,
      sender: "user",
      senderId: "simran",
      text: "The new UI looks really good.",
      time: "10:23 AM",
    },
    {
      id: 3,
      sender: "me",
      text: "I'm finishing the responsive layout now.",
      time: "10:25 AM",
    },
    {
      id: 4,
      sender: "user",
      senderId: "harpreet",
      text: "Perfect. I'll push the changes soon.",
      time: "10:28 AM",
    },
  ],

  aman: [
    {
      id: 1,
      sender: "user",
      text: "Hey! Did you get a chance to check the latest changes?",
      time: "10:32 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "Yeah, everything looks good so far.",
      time: "10:34 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "Perfect. I'll push the remaining changes soon.",
      time: "10:35 AM",
    },
  ],

  rohit: [
    {
      id: 1,
      sender: "user",
      text: "Can you check the PR when you get a chance?",
      time: "9:48 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "Sure, I'll take a look.",
      time: "9:52 AM",
    },
  ],

  simran: [
    {
      id: 1,
      sender: "user",
      text: "The new dashboard design is ready.",
      time: "8:40 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "Looks great. I really like the new spacing.",
      time: "8:46 AM",
    },
  ],

  harpreet: [
    {
      id: 1,
      sender: "user",
      text: "Everything looks good from QA.",
      time: "Yesterday",
    },
  ],

  me: [
    {
      id: 1,
      sender: "me",
      text: "Remember to finish the Scriptly dashboard.",
      time: "Today",
    },
    {
      id: 2,
      sender: "me",
      text: "Connect messages to the backend.",
      time: "Today",
    },
  ],
};

/* =========================================================
   COMPONENT
========================================================= */

const Messages = () => {
  const navigate = useNavigate();

  const [activeUserId, setActiveUserId] = useState("team");

  const [showChat, setShowChat] = useState(false);

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");

  const [conversations, setConversations] = useState(initialConversations);

  /* =======================================================
     ACTIVE USER
  ======================================================= */

  const activeUser = users.find((user) => user.id === activeUserId) ?? users[0];

  const activeMessages = conversations[activeUserId] ?? [];

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });
  }, [search]);

  /* =======================================================
     SELECT USER
  ======================================================= */

  const handleSelectUser = (userId: string) => {
    setActiveUserId(userId);
    setShowChat(true);
  };

  /* =======================================================
     MOBILE BACK
  ======================================================= */

  const handleBackToUsers = () => {
    setShowChat(false);
  };

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: "me",
      senderId: "me",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setConversations((current) => ({
      ...current,
      [activeUserId]: [...(current[activeUserId] ?? []), newMessage],
    }));

    setMessage("");
  };

  /* =======================================================
     MESSAGE KEYBOARD
     
     IMPORTANT:
     - Space works normally.
     - Enter sends.
     - Shift + Enter creates a new line.
  ======================================================= */

  const handleMessageKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }

    // DO NOT preventDefault for Space.
  };

  /* =======================================================
     USER LIST
  ======================================================= */

  const UserList = () => {
    return (
      <div className="flex h-full min-h-0 min-w-full flex-col">
        {/* HEADER */}

        <div className="shrink-0 border-b border-slate-100 px-4 pb-2.5 pt-4 sm:px-5 sm:pb-3 sm:pt-5">
          <div className="mb-2.5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Conversations
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                {users.length - 1} team members
              </p>
            </div>

            <Button variant="ghost" size="icon" className="text-slate-400">
              <MoreHorizontal size={19} />
            </Button>
          </div>

          {/* SEARCH */}

          <div className="relative w-full">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <Input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search people..."
              className="h-10 w-full border-slate-200 bg-slate-50 pl-9 pr-3 shadow-none focus-visible:ring-2 focus-visible:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* USER LIST */}

        <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-3">
          {filteredUsers.map((user) => {
            const isActive = user.id === activeUserId;

            return (
              <motion.button
                key={user.id}
                type="button"
                onClick={() => handleSelectUser(user.id)}
                whileTap={{
                  scale: 0.985,
                }}
                className={`relative mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors sm:p-3.5 ${
                  isActive ? "bg-indigo-50" : "hover:bg-slate-50"
                }`}>
                {/* ACTIVE BAR */}

                {isActive && (
                  <motion.div
                    layoutId="active-user"
                    className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-indigo-600"
                  />
                )}

                {/* AVATAR */}

                <div className="relative shrink-0">
                  <Avatar className="h-11 w-11 sm:h-12 sm:w-12">
                    <AvatarFallback
                      className={
                        isActive
                          ? "bg-indigo-100 font-semibold text-indigo-700"
                          : "bg-slate-100 font-semibold text-slate-600"
                      }>
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>

                  {user.type === "group" && (
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-white">
                      <MessageSquare size={10} />
                    </span>
                  )}

                  {user.type === "user" && (
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        user.status === "online"
                          ? "bg-emerald-500"
                          : user.status === "away"
                            ? "bg-amber-400"
                            : "bg-slate-300"
                      }`}
                    />
                  )}
                </div>

                {/* INFO */}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-sm ${
                        isActive
                          ? "font-semibold text-indigo-700"
                          : "font-medium text-slate-800"
                      }`}>
                      {user.name}
                    </p>

                    {user.time && (
                      <span className="shrink-0 text-[10px] text-slate-400">
                        {user.time}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex min-w-0 items-center justify-between gap-2">
                    <p className="min-w-0 truncate text-xs text-slate-500">
                      {user.type === "group"
                        ? `${user.members} members`
                        : user.type === "me"
                          ? "Personal notes"
                          : user.lastMessage}
                    </p>

                    {user.unread > 0 && (
                      <Badge className="h-5 min-w-5 shrink-0 rounded-full bg-indigo-600 px-1.5 text-[9px] text-white hover:bg-indigo-600">
                        {user.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}

          {filteredUsers.length === 0 && (
            <div className="px-4 py-10 text-center">
              <Search size={24} className="mx-auto mb-2 text-slate-300" />

              <p className="text-sm font-medium text-slate-600">
                No conversations found
              </p>

              <p className="mt-1 text-xs text-slate-400">Try another name</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* =======================================================
     CHAT WINDOW
  ======================================================= */

  const ChatWindow = () => {
    return (
      <div className="flex h-full min-h-0 min-w-full flex-col">
        {/* CHAT HEADER */}

        <div className="flex h-[clamp(60px,7vmin,72px)] w-full shrink-0 items-center justify-between border-b border-slate-100 px-[2vmin]">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {/* MOBILE BACK */}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleBackToUsers}
              className="shrink-0 md:hidden">
              <ArrowLeft size={19} className="text-slate-600" />
            </Button>

            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className="bg-indigo-100 font-semibold text-indigo-700">
                {activeUser.initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-slate-900">
                {activeUser.name}
              </h2>

              <div className="mt-0.5 flex items-center gap-1.5">
                {activeUser.type === "group" ? (
                  <span className="text-xs text-slate-500">
                    {activeUser.members} members
                  </span>
                ) : activeUser.type === "me" ? (
                  <span className="text-xs text-slate-500">Personal notes</span>
                ) : (
                  <>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        activeUser.status === "online"
                          ? "bg-emerald-500"
                          : activeUser.status === "away"
                            ? "bg-amber-400"
                            : "bg-slate-300"
                      }`}
                    />

                    <span className="text-xs text-slate-500">
                      {activeUser.status === "online"
                        ? "Online"
                        : activeUser.status === "away"
                          ? "Away"
                          : "Offline"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0">
            <MoreHorizontal size={19} className="text-slate-500" />
          </Button>
        </div>

        {/* MESSAGES */}

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-slate-50/60 px-[2vmin] py-[1.5vmin]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeUserId}
              initial={{
                opacity: 0,
                x: 8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="space-y-4">
              {activeMessages.map((chatMessage) => {
                const isMe = chatMessage.sender === "me";

                const sender = chatMessage.senderId
                  ? users.find((user) => user.id === chatMessage.senderId)
                  : activeUser;

                const showGroupIdentity = activeUser.type === "group" && !isMe;

                return (
                  <div
                    key={chatMessage.id}
                    className={`flex w-full ${
                      isMe ? "justify-end" : "justify-start"
                    }`}>
                    <div
                      className={`flex max-w-[88%] items-end gap-2 sm:max-w-[70%] ${
                        isMe ? "flex-row-reverse" : "flex-row"
                      }`}>
                      {/* Sender avatar — only shown in Team Chat */}
                      {showGroupIdentity ? (
                        <Avatar className="mb-5 h-8 w-8 shrink-0">
                          <AvatarFallback className="bg-indigo-100 text-[10px] font-semibold text-indigo-700">
                            {sender?.initials ?? "?"}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 shrink-0" />
                      )}

                      <div
                        className={`flex min-w-0 flex-col ${
                          isMe ? "items-end" : "items-start"
                        }`}>
                        {/* Sender name — only shown in Team Chat */}
                        {showGroupIdentity && sender && (
                          <span className="mb-1 px-1 text-[11px] font-semibold text-slate-600">
                            {sender.name}
                          </span>
                        )}

                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:px-4 ${
                            isMe
                              ? "rounded-br-md bg-indigo-600 text-white"
                              : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                          }`}>
                          {chatMessage.text}
                        </div>

                        <div className="mt-1 flex items-center gap-1 px-1 text-[10px] text-slate-400">
                          <span>{chatMessage.time}</span>

                          {isMe && <Check size={11} />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {activeMessages.length === 0 && (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
                      <MessageSquare size={22} className="text-indigo-500" />
                    </div>

                    <p className="text-sm font-medium text-slate-700">
                      No messages yet
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Start the conversation
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =================================================
            MESSAGE COMPOSER
        ================================================= */}

        <div className="w-full shrink-0 border-t border-slate-100 bg-white px-[2vmin] py-[1.25vmin]">
          <div className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
            {/* ATTACHMENT */}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hidden shrink-0 text-slate-400 sm:flex">
              <Paperclip size={18} />
            </Button>

            {/* MESSAGE INPUT */}

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleMessageKeyDown}
              rows={1}
              placeholder={
                activeUser.type === "group"
                  ? "Message the team..."
                  : activeUser.type === "me"
                    ? "Write a note..."
                    : `Message ${activeUser.name.split(" ")[0]}...`
              }
              className="min-h-11 max-h-28 min-w-0 flex-1 resize-none overflow-y-auto border-0 bg-transparent px-2 py-2.5 text-sm leading-5 text-slate-900 outline-none placeholder:text-slate-400 focus:outline-none"
            />

            {/* EMOJI */}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hidden shrink-0 text-slate-400 sm:flex">
              <Smile size={18} />
            </Button>

            {/* SEND */}

            <Button
              type="button"
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="h-11 shrink-0 gap-2 rounded-xl bg-indigo-600 px-3 text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4">
              <Send size={17} />

              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#f8f9fc] text-slate-900">
      {/* TOP HEADER */}
      <header className="relative z-20 flex h-14 shrink-0 items-center border-b border-slate-200/80 bg-white sm:h-16">
        <div className="relative flex h-full w-full items-center px-[2vmin]">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="h-10 gap-2 px-2 text-slate-700 hover:bg-slate-100">
            <ArrowLeft size={19} />
            <span className="text-sm hidden sm:inline font-medium sm:text-base">
              Dashboard
            </span>
          </Button>

          <div className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
              <MessageSquare size={18} />
            </div>
            <span className="text-base font-bold text-slate-900 sm:text-lg">
              Messages
            </span>
          </div>
        </div>
      </header>

      {/* MESSAGE APP */}
      <main className="min-h-0 w-full flex-1">
        <div
          className="
            mx-auto flex h-full w-full max-w-[1650px]
            overflow-hidden bg-white
            sm:h-[calc(100dvh-4rem)]
            sm:w-[calc(100vw-2vmin)]
            sm:max-w-[calc(100vw-2vmin)]
            sm:rounded-2xl sm:border sm:border-slate-200/80 sm:shadow-sm
          ">
          {/* CONVERSATIONS */}
          <aside
            className={`h-full w-full shrink-0 border-r border-slate-200 bg-white md:flex md:w-[clamp(320px,30vmin,440px)] ${
              showChat ? "hidden" : "flex"
            }`}>
            {UserList()}
          </aside>

          {/* CHAT */}
          <section
            className={`min-h-0 min-w-0 flex-1 bg-white ${
              showChat ? "flex" : "hidden md:flex"
            }`}>
            {ChatWindow()}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Messages;
