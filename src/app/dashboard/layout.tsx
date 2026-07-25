import React from "react";
import { 
    Sidebar 
} from "@/components/chat/Sidebar";
import { getChats } from "@/app/actions/chat";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const chats = await getChats();
    
    return (
        <div className="flex h-screen overflow-hidden bg-white">
            <Sidebar initialChats={chats} />

            <main className="flex-1 flex flex-col relative">
                {children}
            </main>
        </div>
    );
}