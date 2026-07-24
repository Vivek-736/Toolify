"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Copy, ThumbsUp, ThumbsDown, Check, ChevronDown } from "lucide-react";
import { useUser } from "@clerk/nextjs";

// Mock data matching the design
const MOCK_MESSAGES = [
  {
    id: "m1",
    role: "user",
    content: "Summarize this video https://youtu.be/dQw4w9WgXcQ",
    time: "10:24 AM",
  },
  {
    id: "m2",
    role: "assistant",
    content: `**Here's a concise summary of the video:**\n\nThe video introduces the key features of Next.js 15, including improved performance, simplified data fetching, enhanced caching, and better developer experience. It also covers new APIs, routing improvements, and best practices for upgrading from previous versions.\n\n**Key Takeaways**\n- Next.js 15 focuses on performance and DX improvements.\n- New caching and data fetching APIs.\n- Better support for React Server Components.\n- Simplified routing and error handling.\n- Easier upgrades with codemods and migration tools.`,
    time: "10:24 AM",
    toolInvocations: [
      { title: "Searching the web for video information..." },
      { title: "Reading transcript..." }
    ]
  }
];

export function MessageList() {
  const { user } = useUser();

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 custom-scrollbar scroll-smooth">
      <div className="max-w-3xl mx-auto space-y-8 flex flex-col pb-8">
        {MOCK_MESSAGES.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-full",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 mr-4 shadow-sm">
                <span className="text-white font-bold text-sm">T</span>
              </div>
            )}
            
            <div className={cn(
              "max-w-[85%] md:max-w-[75%] flex flex-col",
              message.role === "user" ? "items-end" : "items-start"
            )}>
              {message.toolInvocations && (
                <div className="mb-4 space-y-2">
                  {message.toolInvocations.map((tool, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-500 text-sm cursor-pointer hover:text-slate-700 transition">
                      <span>{tool.title}</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              )}

              <div
                className={cn(
                  "px-5 py-4 rounded-2xl relative group",
                  message.role === "user"
                    ? "bg-blue-50/80 text-slate-800 rounded-tr-sm border border-blue-100/50"
                    : "bg-white text-slate-800 rounded-tl-sm border border-slate-200 shadow-sm"
                )}
              >
                {/* Markdown parsing placeholder - just replacing newlines and basic bold for now */}
                <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
                  {message.content.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-slate-900">{part}</strong> : part
                  )}
                </div>
              </div>

              {/* Message Footer */}
              <div className={cn(
                "flex items-center gap-2 mt-2",
                message.role === "user" ? "text-slate-400" : "text-slate-400"
              )}>
                {message.role === "user" ? (
                  <>
                    <span className="text-xs">{message.time}</span>
                    <Check className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded-md transition text-slate-400 hover:text-slate-600">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-100 rounded-md transition text-slate-400 hover:text-slate-600">
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-100 rounded-md transition text-slate-400 hover:text-slate-600">
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}