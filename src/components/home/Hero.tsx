"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  Globe,
  MessageSquare,
  FileText,
  Send,
  Settings,
  Sparkles,
  Star,
} from "lucide-react";

export function Hero() {
  const { user } = useUser();

  return (
    <section className="relative overflow-hidden py-12 md:py-10 mt-28 bg-white">
      {/* Background Soft Blue Gradient Blobs */}
      <div className="pointer-events-none absolute -top-20 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 -z-10 h-[400px] w-[400px] rounded-full bg-blue-50/60 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1.5 text-xs font-semibold text-blue-600 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Your all-in-one AI assistant</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.1]">
              One Chat. <br />
              <span className="text-blue-600">Every Answer.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg text-slate-600 leading-relaxed font-normal">
              Toolify thinks, searches, and summarizes for you. <br />
              The right tool. Every time.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="cursor-pointer gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition">
                    <MessageSquare className="h-5 w-5" />
                    Start Chat
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button size="lg" className="cursor-pointer gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition">
                    <MessageSquare className="h-5 w-5" />
                    Start Chat
                  </Button>
                </Link>
              )}

              <a href="https://github.com/Vivek-736" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="cursor-pointer gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="User" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-xs font-semibold text-slate-600">Loved by developers</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic UI Mockup Card */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-500/10">
              <div className="flex gap-4">
                {/* Mini Sidebar inside mockup */}
                <div className="flex flex-col items-center gap-5 border-r border-slate-100 pr-3 pt-1">
                  <Image src="/favicon.png" alt="Logo" width={28} height={28} className="h-7 w-7 rounded-lg" />
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:text-slate-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:text-slate-600">
                    <Settings className="h-4 w-4" />
                  </div>
                </div>

                {/* Main Chat Content */}
                <div className="flex-1 space-y-4 pt-1">
                  {/* User Message */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-medium text-slate-400">You</div>
                    <div className="rounded-2xl rounded-tr-xs bg-slate-100 px-4 py-2.5 text-xs font-medium text-slate-800">
                      Summarize this video <span className="text-blue-600 underline">https://youtu.be/dQw4w9WgXcQ</span>
                    </div>
                  </div>

                  {/* Toolify Agent Response */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <Image src="/favicon.png" alt="Toolify" width={16} height={16} className="h-4 w-4 rounded-xs" />
                      <span className="text-[11px] font-bold text-slate-900">Toolify</span>
                    </div>

                    {/* Tool Execution Box */}
                    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-2">
                          <Globe className="h-3.5 w-3.5 text-slate-500" />
                          Searching the web...
                        </span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-slate-500" />
                          Reading transcript...
                        </span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                    </div>

                    {/* Response Card */}
                    <div className="rounded-xl border border-slate-100 bg-white p-3.5 text-xs text-slate-700 shadow-xs space-y-2">
                      <p className="font-medium text-slate-900">Here&apos;s a concise summary of the video.</p>
                      <div className="space-y-1.5 pt-1">
                        <div className="h-2 w-full rounded-full bg-slate-100" />
                        <div className="h-2 w-4/5 rounded-full bg-slate-100" />
                        <div className="h-2 w-3/5 rounded-full bg-slate-100" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Mock Input */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-400">
                      <span>Ask anything...</span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                        <Send className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}