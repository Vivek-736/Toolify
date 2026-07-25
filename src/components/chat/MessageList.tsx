"use client";

import { useEffect, useRef } from "react";
import { 
  Check, 
  ChevronDown 
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Message } from "./ChatContainer";

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading = false }: MessageListProps) {
  const { user } = useUser();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 custom-scrollbar scroll-smooth">
      <div className="max-w-3xl mx-auto space-y-8 flex flex-col pb-8">
        {messages.map((message, idx) => (
          <div
            key={idx}
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

              {(message.content || message.role === "user") && (
                <div
                  className={cn(
                    "px-5 py-4 rounded-2xl relative group",
                    message.role === "user"
                      ? "bg-blue-50/80 text-slate-800 rounded-tr-sm border border-blue-100/50"
                      : "bg-white text-slate-800 rounded-tl-sm border border-slate-200 shadow-sm"
                  )}
                >
                  {/* Markdown parsing placeholder - just replacing newlines and basic bold for now */}
                  <div className="text-[15px] leading-relaxed whitespace-pre-wrap wrap-break-word">
                    {typeof message.content === "string" 
                      ? message.content.split('**').map((part, i) => 
                          i % 2 === 1 ? <strong key={i} className="text-slate-900">{part}</strong> : part
                        ) 
                      : JSON.stringify(message.content)
                    }
                  </div>
                </div>
              )}

              {/* Message Footer */}
              <div className={cn(
                "flex items-center gap-2 mt-2 text-slate-400"
              )}>
                {message.role === "user" && (
                  <>
                    <span className="text-xs">Just now</span>
                    <Check className="h-3.5 w-3.5" />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 mr-4 shadow-sm">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div className="max-w-[85%] md:max-w-[75%] flex flex-col items-start">
              <div className="px-5 py-4 rounded-2xl relative group bg-white text-slate-800 rounded-tl-sm border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 h-6 px-1">
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}