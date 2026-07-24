"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus, PanelLeftClose, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const CHAT_HISTORY = [
  {
    group: "Today",
    chats: [
      { id: "1", title: "YouTube Summary: Next.js 15", time: "10:24 AM", active: true },
      { id: "2", title: "Explain useEffect in React", time: "9:15 AM", active: false },
      { id: "3", title: "Best practices for Next.js apps", time: "Yesterday", active: false },
    ],
  },
  {
    group: "Previous 7 Days",
    chats: [
      { id: "4", title: "Tailwind CSS Grid Layout", time: "May 18", active: false },
      { id: "5", title: "Difference between SQL and NoSQL", time: "May 17", active: false },
    ],
  },
  {
    group: "Previous 30 Days",
    chats: [
      { id: "6", title: "JavaScript Array Methods", time: "May 10", active: false },
    ],
  },
];

export function Sidebar() {
  const { user } = useUser();
  const params = useParams();
  const currentChatId = params?.chatId as string;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "border-r border-slate-200 bg-slate-50/50 flex flex-col h-full transition-all duration-300 relative",
        collapsed ? "w-[72px]" : "w-72"
      )}
    >
      {/* Header */}
      <div className={cn("p-4 flex items-center h-16", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <Image
              src="/favicon.png"
              alt="Toolify Logo"
              width={28}
              height={28}
              className="rounded-md shrink-0"
            />
            <span className="text-xl font-bold text-slate-900 tracking-tight">Toolify</span>
          </Link>
        )}
        
        {collapsed && (
          <Image
            src="/favicon.png"
            alt="Toolify Logo"
            width={28}
            height={28}
            className="rounded-md shrink-0 cursor-pointer hover:opacity-80 transition"
            onClick={() => setCollapsed(false)}
          />
        )}
        
        {!collapsed && (
          <button 
            onClick={() => setCollapsed(true)}
            className="text-slate-400 hover:text-slate-600 transition shrink-0"
            title="Close sidebar"
          >
            <PanelLeftClose className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* New Chat Button */}
      <div className="px-4 pb-4 mt-2">
        <Link href="/dashboard">
          <Button 
            variant="outline" 
            className={cn(
              "bg-white hover:bg-slate-50 border-slate-200 shadow-sm text-slate-700 h-10 transition-all",
              collapsed ? "w-10 p-0 justify-center mx-auto" : "w-full justify-between"
            )}
            title="New Chat (⌘K)"
          >
            {collapsed ? (
              <Plus className="h-4 w-4" />
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="font-medium">New Chat</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                  <span>⌘</span><span>K</span>
                </div>
              </>
            )}
          </Button>
        </Link>
      </div>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar mt-4">
        {CHAT_HISTORY.map((group, i) => (
          <div key={i} className="mb-6 px-3">
            {!collapsed && (
              <h3 className="text-xs font-semibold text-slate-500 px-3 mb-2 uppercase tracking-wider whitespace-nowrap">
                {group.group}
              </h3>
            )}
            <div className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
              {group.chats.map((chat) => {
                const isActive = chat.id === currentChatId;
                return (
                  <Link key={chat.id} href={`/dashboard/${chat.id}`}>
                    <div 
                      title={collapsed ? chat.title : undefined}
                      className={cn(
                        "flex flex-col rounded-lg cursor-pointer transition-colors group relative",
                        isActive 
                          ? "bg-blue-50 text-blue-700" 
                          : "hover:bg-slate-100 text-slate-700",
                        collapsed ? "p-2.5 items-center justify-center mb-1" : "px-3 py-2.5 gap-1"
                      )}
                    >
                      {isActive && (
                        <div className={cn(
                          "absolute bg-blue-600 rounded-r-md",
                          collapsed ? "left-0 top-1.5 bottom-1.5 w-[3px]" : "left-0 top-2 bottom-2 w-1"
                        )} />
                      )}
                      
                      {collapsed ? (
                        <MessageSquare className={cn(
                          "h-5 w-5",
                          isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                        )} />
                      ) : (
                        <div className="flex items-start gap-2.5">
                          <MessageSquare className={cn(
                            "h-4 w-4 mt-0.5 shrink-0",
                            isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                          )} />
                          <div className="flex-1 overflow-hidden">
                            <p className={cn(
                              "text-sm font-medium truncate",
                              isActive ? "text-blue-900" : "text-slate-700"
                            )}>
                              {chat.title}
                            </p>
                            <p className={cn(
                              "text-xs truncate",
                              isActive ? "text-blue-600/70" : "text-slate-400"
                            )}>
                              What are the best practices for...
                            </p>
                          </div>
                          <span className={cn(
                            "text-[10px] whitespace-nowrap mt-1",
                            isActive ? "text-blue-500" : "text-slate-400"
                          )}>
                            {chat.time}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200 bg-white flex justify-center">
        {collapsed ? (
          <div title={user?.fullName || "Account"}>
            <UserButton afterSignOutUrl="/" appearance={{
              elements: {
                avatarBox: "h-9 w-9"
              }
            }} />
          </div>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer border border-slate-100 shadow-sm w-full">
            <UserButton afterSignOutUrl="/" appearance={{
              elements: {
                avatarBox: "h-9 w-9"
              }
            }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate">
                {user?.fullName || "Loading..."}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            <div className="text-slate-400 px-1 shrink-0">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}