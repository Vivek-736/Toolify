import React from "react";
import { Sidebar } from "@/components/chat/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-white">
            <Sidebar />

            <main className="flex-1 flex flex-col relative">
                {children}
            </main>
        </div>
    );
}