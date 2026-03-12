"use client";

import { useMemo, useState } from "react";

type Plan = {
  title: string;
  subtitle: string;
  packageName: string;
  packageDescription: string;
  maturity: string;
  confidence: string;
  projectedReach: string;
  projectedEngagement: string;
  projectedRoi: string;
  budgetAdvice: string;
  channelMix: string[];
  pre: string[];
  during: string[];
  post: string[];
  services: { name: string; subtitle: string; enabled: boolean }[];
};

const initialPlan: Plan = {
  title: "Welcome, Caner",
  subtitle: "What do you want to activate today?",
  packageName: "Full Activation Package",
  packageDescription:
    "AI-guided omnichannel recommendation for launch and HCP engagement.",
  maturity: "Moderate",
  confidence: "80%",
  projectedReach: "210K HCPs",
  projectedEngagement: "18% – 25%",
  projectedRoi: "3.1x – 4.0x",
  budgetAdvice: "Balanced plan for strong HCP engagement with core services enabled.",
  channelMix: [
    "7-email web cadence",
    "Fully featured web experience",
    "Advanced TV / Programmatic",
    "Evidence search / competitor visibility",
  ],
  pre: ["Teaser email", "Disease awareness hub", "Paid media burst"],
  during: ["HCP launch email", "Web hub", "LinkedIn / programmatic"],
  post: ["Follow-up email series", "Retargeting", "Content hub expansion"],
  services: [
    { name: "Marketing Automation", subtitle: "EMMA", enabled: true },
    {
      name: "Paid Media",
      subtitle: "Media, Programmatic, Advanced TV",
      enabled: true,
    },
    {
      name: "Search & GEO",
      subtitle: "Discoverability and evidence visibility",
      enabled: true,
    },
    {
      name: "Web Experiences",
      subtitle: "Roche.com, local web, campaign hubs",
      enabled: true,
    },
    { name: "Content Production", subtitle: "The Lab", enabled: true },
    {
      name: "Messaging",
      subtitle: "WhatsApp / mobile messaging",
      enabled: false,
    },
  ],
};

function RocheLogo() {
  return (
    <svg width="56" height="32" viewBox="0 0 56 32" fill="none" aria-hidden="true">
      <path
        d="M13 2H43L54 16L43 30H13L2 16L13 2Z"
        stroke="#0B5BD3"
        strokeWidth="2"
      />
      <text
        x="28"
        y="20"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#0B5BD3"
        fontFamily="Arial, sans-serif"
      >
        Roche
      </text>
    </svg>
  );
}

function RailIcon({ active = false, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
        active
          ? "border-blue-200 bg-blue-50 text-[#0B5BD3]"
          : "border-slate-200 bg-white text-slate-500"
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState(
    "I'm launching Product X in Germany with 500k CHF budget and want strong HCP engagement."
  );
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const serviceCount = useMemo(
    () => plan.services.filter((service) => service.enabled).length,
    [plan.services]
  );

  async function handleGeneratePlan() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Plan generation failed");
      }

      const data = (await response.json()) as Plan;
      setPlan(data);
    } catch (err) {
      console.error(err);
      setError("Plan could not be generated. Showing the last available recommendation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8FB] text-slate-800">
      <div className="border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <RocheLogo />
            <div className="hidden h-7 w-px bg-slate-200 md:block" />
            <div>
              <p className="text-sm font-semibold text-[#0B5BD3]">
                RODA (Roche Omnichannel Decision and Activation)
              </p>
              <p className="text-xs text-slate-500">
                Intelligent omnichannel campaign planning
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden text-sm text-slate-500 md:block">
              Help us improve
            </button>
            <button className="hidden text-sm text-slate-500 md:block">
              Favorites
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-[#0B5BD3]">
              CY
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <aside className="hidden min-h-[calc(100vh-73px)] w-[76px] border-r border-slate-200 bg-[#F8F9FC] md:flex md:flex-col md:items-center md:gap-4 md:px-3 md:py-8">
          <RailIcon>
            <span className="text-lg">▥</span>
          </RailIcon>
          <RailIcon active>
            <span className="text-lg">⌂</span>
          </RailIcon>
          <RailIcon>
            <span className="text-lg">▣</span>
          </RailIcon>
          <RailIcon>
            <span className="text-lg">⌕</span>
          </RailIcon>
        </aside>

        <section className="mx-auto w-full max-w-[1320px] px-6 py-10 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-5xl font-semibold tracking-tight text-slate-900">
              {plan.title}
            </h1>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[#0B5BD3]">
              {plan.subtitle}
            </h2>

            <div className="mt-10 rounded-[28px] border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full flex-1 rounded-full border border-slate-200 px-5 py-4 text-base outline-none placeholder:text-slate-400 focus:border-[#0B5BD3]"
                  placeholder="Detail what your project is about"
                />
                <button
                  onClick={handleGeneratePlan}
                  disabled={loading}
                  className="rounded-full bg-[#0B5BD3] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0948a8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Generate Plan"}
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {[
                "Assemble an asset",
                "Brief the Lab/Agency",
                "Create a visual brief",
                "Draft a PLS",
                "Find content",
              ].map((item) => (
                <button
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#0B5BD3]"
                >
                  {item}
                </button>
              ))}
            </div>

            {error ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="mt-12 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-slate-900">
                    AI Strategy Recommendation
                  </h3>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B5BD3]">
                    AI Recommended
                  </span>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-[#FAFBFE] p-5">
                  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-3xl font-semibold text-slate-900">
                        {plan.packageName}
                      </p>
                      <p className="mt-1 text-sm text-[#0B5BD3]">
                        {plan.packageDescription}
                      </p>
                    </div>

                    <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
                      Maturity: {plan.maturity}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Channel Mix
                      </p>
                      <div className="space-y-3">
                        {plan.channelMix.map((item) => (
                          <div
                            key={item}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Project Results
                      </p>
                      <div className="space-y-3">
                        {[
                          ["Projected reach", plan.projectedReach],
                          ["Expected engagement", plan.projectedEngagement],
                          ["Estimated ROI", plan.projectedRoi],
                          ["Confidence score", plan.confidence],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                          >
                            <span className="font-semibold text-slate-900">{label}:</span>{" "}
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
                      {plan.budgetAdvice}
                    </div>

                    <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                      AI Advice
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-slate-900">
                  Projected Results
                </h3>

                <div className="mt-5">
                  <p className="text-5xl font-semibold text-slate-900">
                    {plan.projectedReach.split(" ")[0]}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {plan.projectedReach.replace(plan.projectedReach.split(" ")[0], "").trim() ||
                      "Projected audience reach"}
                  </p>
                </div>

                <div className="mt-6 rounded-3xl bg-[#F3F6FD] p-5">
                  <div className="flex h-44 items-end gap-3">
                    {[18, 28, 42, 62, 86].map((height, index) => (
                      <div
                        key={index}
                        className={`w-full rounded-t-2xl ${
                          index < 3 ? "bg-blue-200" : index === 3 ? "bg-blue-400" : "bg-[#0B5BD3]"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    ["Expected engagement", plan.projectedEngagement],
                    ["Estimated ROI", plan.projectedRoi],
                    ["Enabled services", `${serviceCount} services`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-slate-200 bg-[#FAFBFE] px-4 py-3 text-sm text-slate-700"
                    >
                      <span className="font-semibold text-slate-900">{label}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-slate-900">
                  Journey Orchestration
                </h3>
                <a className="text-sm font-semibold text-[#0B5BD3]" href="#">
                  → Projects
                </a>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {[
                  { title: "Pre", items: plan.pre },
                  { title: "During", items: plan.during },
                  { title: "Post", items: plan.post },
                ].map((phase) => (
                  <div
                    key={phase.title}
                    className="rounded-3xl border border-slate-200 bg-[#FAFBFE] p-5"
                  >
                    <h4 className="text-3xl font-semibold text-slate-900">
                      {phase.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-500">
                      Recommended activation flow for this phase.
                    </p>

                    <div className="mt-5 space-y-3">
                      {phase.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-slate-900">
                  Our apps, at your service
                </h3>
                <a className="text-sm font-semibold text-[#0B5BD3]" href="#">
                  → Apps
                </a>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {plan.services.map((service) => (
                  <div
                    key={service.name}
                    className="rounded-3xl border border-slate-200 bg-[#FAFBFE] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">
                          {service.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {service.subtitle}
                        </p>
                      </div>

                      <div
                        className={`mt-1 h-6 w-11 rounded-full p-1 ${
                          service.enabled ? "bg-[#0B5BD3]" : "bg-slate-300"
                        }`}
                      >
                        <div
                          className={`h-4 w-4 rounded-full bg-white transition ${
                            service.enabled ? "ml-auto" : "ml-0"
                          }`}
                        />
                      </div>
                    </div>

                    <p className="mt-5 text-sm text-slate-600">
                      {service.enabled
                        ? "Recommended for this activation scenario."
                        : "Optional for this campaign based on business need."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}