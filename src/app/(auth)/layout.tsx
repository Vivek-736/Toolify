import React from "react";
import Image from "next/image";
import { MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-dvh overflow-hidden bg-slate-50/50 flex flex-col">
      {/* Background Ambient Fluid Blob at bottom left */}
      <div className="pointer-events-none absolute -bottom-32 -left-32 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-50/40 blur-3xl" />

      {/* Top Left Header Logo */}
      <header className="absolute top-6 left-8 z-20">
        <Link href="/" className="inline-flex items-center gap-2.5 transition hover:opacity-90">
          <Image src="/favicon.png" alt="Toolify Logo" width={32} height={32} className="h-8 w-8 rounded-lg" />
          <span className="text-xl font-bold text-slate-900">Toolify</span>
        </Link>
      </header>

      {/* Main Centered Content Container */}
      <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-12 my-auto flex items-center justify-center">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 w-full">
          {/* Left Column: Welcome & Value Propositions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1.5 text-xs font-semibold text-blue-600">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Your all-in-one AI assistant</span>
            </div>

            <h1 className="text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight sm:text-6xl">
              Welcome back <br />
              to <span className="text-blue-600">Toolify</span>
            </h1>

            <p className="text-lg text-slate-600 font-normal">
              One chat. Every answer.
            </p>

            <div className="space-y-5 pt-2">
              {/* Item 1 */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xs border border-slate-100 text-slate-700">
                  <MessageSquare className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Chat Naturally</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Ask anything. Get everything.</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xs border border-slate-100 text-slate-700">
                  <Sparkles className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Smart Tool Selection</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Toolify chooses the right tool automatically.</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xs border border-slate-100 text-slate-700">
                  <ShieldCheck className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Private & Secure</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Your data is encrypted and always protected.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clerk Auth Card */}
          <div className="lg:col-span-6 flex justify-center">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}