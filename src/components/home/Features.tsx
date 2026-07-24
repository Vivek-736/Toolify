import { Brain, Globe, Play } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Automatic Tool Selection",
    description: "LangGraph decides the best tool for your request.",
  },
  {
    icon: Globe,
    title: "Web Search",
    description: "Get real-time information using Tavily.",
  },
  {
    icon: Play,
    title: "YouTube Summaries",
    description: "Summarize long videos in seconds.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
            FEATURES
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Powerful tools. One assistant.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Toolify automatically picks the right tool to get the job done.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xs transition duration-200 hover:shadow-md"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}