import { UserButton } from "@clerk/nextjs";
import { ChevronDown, Share, LayoutPanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  title?: string;
}

export function ChatHeader({ title = "New Chat" }: ChatHeaderProps) {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-slate-500 hover:text-slate-700">
          <LayoutPanelLeft className="h-5 w-5" />
        </button>
        
        <button className="flex items-center gap-1.5 text-lg font-semibold text-slate-800 hover:bg-slate-50 px-2 py-1 rounded-md transition">
          {title}
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 h-9 rounded-full px-4 text-slate-600 border-slate-200">
          <Share className="h-4 w-4" />
          Share
        </Button>
        <UserButton appearance={{
          elements: {
            avatarBox: "h-8 w-8"
          }
        }} />
      </div>
    </header>
  );
}