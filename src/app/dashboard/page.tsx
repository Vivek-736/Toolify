import Image from "next/image";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { Globe, PlaySquare, Sparkles, MessageSquare } from "lucide-react";
import { ChatContainer } from "@/components/chat/ChatContainer";

const SUGGESTIONS = [
  {
    icon: Globe,
    title: "Search the web",
    description: "Get real-time information from the web.",
    color: "text-blue-600",
    bgColor: "bg-blue-100/50"
  },
  {
    icon: PlaySquare,
    title: "Summarize videos",
    description: "Summarize YouTube videos in seconds.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100/50"
  },
  {
    icon: Sparkles,
    title: "Smart tools",
    description: "Toolify chooses the best tool automatically.",
    color: "text-purple-600",
    bgColor: "bg-purple-100/50"
  },
  {
    icon: MessageSquare,
    title: "One assistant",
    description: "Everything in one place. One simple chat.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100/50"
  }
];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-10">
        {SUGGESTIONS.map((item, index) => (
          <div 
            key={index}
            className="bg-white border border-slate-200 rounded-2xl p-5 text-left hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className={`h-10 w-10 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
          </div>
        ))}
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