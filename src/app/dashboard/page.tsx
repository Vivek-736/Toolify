import Image from "next/image";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { Globe, PlaySquare, Sparkles, MessageSquare } from "lucide-react";
import { ChatContainer } from "@/components/chat/ChatContainer";

const WelcomeContent = (
  <div className="flex-1 overflow-y-auto px-4 flex flex-col items-center justify-center min-h-0 py-8">
    <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="h-12 w-12 rounded-xl overflow-hidden shadow-md mb-2 shrink-0">
        <Image src="/favicon.png" alt="Toolify Logo" width={48} height={48} className="w-full h-full object-cover" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-3">
          Welcome to Toolify <span className="animate-wave inline-block origin-bottom-right">👋</span>
        </h1>
        <p className="text-slate-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          Your AI assistant that picks the right tools to get things done.
        </p>
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <>
      <ChatHeader title="New Chat" />
      <ChatContainer welcomeContent={WelcomeContent} />
    </>
  );
}