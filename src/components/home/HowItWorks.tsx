import Link from "next/link";
import { ArrowRight, Brain, MessageSquare, Sparkles, Wrench, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: "1",
    icon: MessageSquare,
    title: "You Ask",
    description: "Type anything naturally in the chat.",
  },
  {
    step: "2",
    icon: Brain,
    title: "Toolify Thinks",
    description: "The AI understands your request.",
  },
  {
    step: "3",
    icon: Wrench,
    title: "Chooses Tools",
    description: "It picks the right tools automatically.",
  },
  {
    step: "4",
    icon: CheckCircle2,
    title: "Returns Answer",
    description: "You get accurate, complete answers instantly.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Simple. Smart. Seamless.
          </h2>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative items-start">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center relative group">
                {/* Circle Icon Container */}
                <div className="relative mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-xs border border-blue-100/50">
                    <Icon className="h-9 w-9" />
                  </div>
                  {/* Step Number Badge */}
                  <span className="absolute -top-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-900 border border-slate-200 shadow-xs">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 max-w-[200px] leading-relaxed">
                  {item.description}
                </p>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-10 translate-x-1/2 z-10 text-slate-300">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 rounded-3xl bg-blue-50/60 border border-blue-100 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-xs">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Ready to supercharge your productivity?
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Stop switching between tools. Let Toolify handle it all.
              </p>
            </div>
          </div>
          <Link href="/dashboard">
            <button className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/20 whitespace-nowrap">
              Start Chat
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}