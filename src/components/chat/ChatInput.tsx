"use client";

import React, { useState } from "react";
import { Plus, Globe, Sparkles, Mic, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ChatInput() {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setValue("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6">
      <form 
        onSubmit={handleSubmit}
        className="relative flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all"
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything..."
          className="w-full max-h-48 min-h-[56px] resize-none bg-transparent px-4 py-4 text-slate-800 focus:outline-none custom-scrollbar rounded-t-2xl"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          {/* Left Actions */}
          <div className="flex items-center gap-1.5">
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100">
              <Plus className="h-5 w-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100">
              <Globe className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100">
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100">
              <Mic className="h-5 w-5" />
            </Button>
            <Button 
              type="submit" 
              disabled={!value.trim()}
              className={cn(
                "h-9 w-9 rounded-full p-0 flex items-center justify-center transition-all",
                value.trim() 
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20" 
                  : "bg-slate-100 text-slate-400"
              )}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>
      <div className="text-center mt-3">
        <p className="text-[11px] text-slate-400">
          Toolify can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}