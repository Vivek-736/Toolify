"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSubmit, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 192)}px`; // Max height 48 (192px)
    }
  }, [value]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!value.trim() || disabled) return;
    
    onSubmit(value);
    setValue("");
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6">
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "relative flex flex-col bg-white border rounded-2xl shadow-sm transition-all",
          disabled ? "border-slate-100 opacity-80" : "border-slate-200 focus-within:ring-2 focus-within:ring-blue-100"
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={disabled ? "Toolify is thinking..." : "Ask anything..."}
          disabled={disabled}
          className="w-full min-h-[56px] resize-none bg-transparent px-4 py-4 text-slate-800 focus:outline-none custom-scrollbar rounded-t-2xl disabled:cursor-not-allowed"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        
        <div className="flex items-center justify-end px-3 pb-3 pt-1">
          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button 
              type="submit" 
              disabled={!value.trim() || disabled}
              className={cn(
                "h-9 w-9 rounded-full p-0 flex items-center justify-center transition-all",
                value.trim() && !disabled
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