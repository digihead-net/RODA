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
  budgetAllocation: { channel: string; amount: number }[];
};

const DEMO_PASSWORD = "rode2026";

const initialPlan: Plan = {
  title: "Welcome, Caner",
  subtitle: "What do you want to execute today?",
  packageName: "Full Execution Package",
  packageDescription:
    "Cross-channel execution blueprint designed for launch readiness, HCP engagement, and orchestrated follow-through.",
  maturity: "Advanced",
  confidence: "84%",
  projectedReach: "240K HCPs",
  projectedEngagement: "19% – 27%",
  projectedRoi: "3.2x – 4.3x",
  budgetAdvice:
    "AI Advice: This execution plan is optimized for launch visibility and continuity. A heavier paid media pulse supports the launch peak, while EMMA, web, search, and WhatsApp outbound maintain engagement across the full execution window.",
  channelMix: [
    "7-email launch cadence",
    "Dedicated campaign web hub",
    "Programmatic and LinkedIn media burst",
    "Search & GEO visibility uplift",
    "WhatsApp outbound reminders",
    "Follow-up content expansion",
  ],
  pre: [
    "2 teaser emails to priority HCP audiences",
    "WhatsApp outbound save-the-date message",
    "Disease awareness web landing page",
    "Paid media teaser burst",
  ],
  during: [
    "3 launch emails across priority segments",
    "Campaign hub go-live with modular content",
    "Programmatic + LinkedIn amplification",
    "Search and GEO visibility push",
  ],
  post: [
    "2 follow-up emails with next-best-content",
    "WhatsApp outbound reminder and re-entry touchpoint",
    "Retargeting burst for engaged audiences",
    "Content hub expansion and optimization review",
  ],
  services: [
    { name: "Marketing Automation", subtitle: "EMMA", enabled: true },
    {
      name: "Paid Media",
      subtitle: "Media, Programmatic, LinkedIn, Advanced TV",
      enabled: true,
    },
    {
      name: "Search & GEO",
      subtitle: "Discoverability, evidence visibility, search optimization",
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
      subtitle: "WhatsApp outbound / mobile messaging",
      enabled: true,
    },
  ],
  budgetAllocation: [
    { channel: "Paid Media", amount: 190000 },
    { channel: "Web", amount: 120000 },
    { channel: "Email", amount: 100000 },
    { channel: "Search", amount: 50000 },
    { channel: "Messaging", amount: 40000 },
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

function RailIcon({
  active = false,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
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

function PasswordGate({
  onUnlock,
}: {
  onUnlock: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (password === DEMO_PASSWORD) {
      setError("");
      onUnlock();
      return;
    }

    setError("Incorrect password.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F8FB] px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <RocheLogo />
          <div>
            <p className="text-sm font-semibold text-[#0B5BD3]">
              RODE
            </p>
            <p className="text-xs text-slate-500">
              Roche Omnichannel Decision and Execution
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-slate-900">Protected Demo</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Enter the demo password to access the execution planning environment.
        </p>

        <div className="mt-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base outline-none focus:border-[#0B5BD3]"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full rounded-full bg-[#0B5BD3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0948a8]"
        >
          Enter Demo
        </button>

        <p className="mt-4 text-xs text-slate-400">
          Demo access only.
        </p>
      </div>
    </main>
  );
}

function ExecuteModal({
  open,
  onClose,
  plan,
}: {
  open: boolean;
  onClose: () => void;
  plan: Plan;
}) {
  if (!open) return null;

  const enabledServices = plan.services.filter((service) => service.enabled);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#0B5BD3]">
              Execution Briefing Preview
            </p>
            <h3 className="mt-1 text-3xl font-semibold text-slate-900">
              Execute This Plan
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This simulates a cross-functional briefing package being routed to
              the relevant execution teams.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-[#FAFBFE] p-5">
            <h4 className="text-lg font-semibold text-slate-900">
              Brief Summary
            </h4>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="font-semibold text-slate-900">Package:</span>{" "}
                {plan.packageName}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="font-semibold text-slate-900">Objective:</span>{" "}
                High-priority omnichannel execution with orchestrated HCP engagement.
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="font-semibold text-slate-900">Projected Reach:</span>{" "}
                {plan.projectedReach}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="font-semibold text-slate-900">Execution Notes:</span>{" "}
                {plan.budgetAdvice}
              </div>
            </div>

            <h4 className="mt-6 text-lg font-semibold text-slate-900">
              What will be sent
            </h4>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                Channel mix and execution sequence
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                Budget allocation by channel
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                Pre / During / Post activation timeline
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                Service handoff summary for production teams
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <h4 className="text-lg font-semibold text-slate-900">
              Target Departments
            </h4>

            <div className="mt-4 space-y-3">
              {enabledServices.map((service) => (
                <div
                  key={service.name}
                  className="rounded-2xl border border-slate-200 bg-[#FAFBFE] px-4 py-3"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {service.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{service.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              Demo behavior: clicking the button below simulates briefing
              dispatch to the execution teams.
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-[#0B5BD3] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0948a8]"
            >
              Send Briefing to Execution Teams
            </button>
          </div>
        </div>
      </div>
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
  const [unlocked, setUnlocked] = useState(false);
  const [showExecuteModal, setShowExecuteModal] = useState(false);

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
      setError(
        "Plan could not be generated. Showing the last available recommendation."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <>
      <main className="min-h-screen bg-[#F7F8FB] text-slate-800">
        <div className="border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <RocheLogo />
              <div className="hidden h-7 w-px bg-slate-200 md:block" />
              <div>
                <p className="text-sm font-semibold text-[#0B5BD3]">
                  RODE (Roche Omnichannel Decision and Execution)
                </p>
                <p className="text-xs text-slate-500">
                  Intelligent omnichannel execution planning
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

              {error ? (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <div className="mt-12 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-slate-900">
                      Strategy Recommendation
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
                              <span className="font-semibold text-slate-900">
                                {label}:
                              </span>{" "}
                              {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-3xl border border-slate-200 bg-white px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        AI Advice
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {plan.budgetAdvice}
                      </p>
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
                      {plan.projectedReach.replace(
                        plan.projectedReach.split(" ")[0],
                        ""
                      ).trim() || "Projected audience reach"}
                    </p>
                  </div>

                  <div className="mt-6 rounded-3xl bg-[#F3F6FD] p-5">
                    <div className="flex h-44 items-end gap-3">
                      {[18, 28, 42, 62, 86].map((height, index) => (
                        <div
                          key={index}
                          className={`w-full rounded-t-2xl ${
                            index < 3
                              ? "bg-blue-200"
                              : index === 3
                              ? "bg-blue-400"
                              : "bg-[#0B5BD3]"
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
                        <span className="font-semibold text-slate-900">
                          {label}:
                        </span>{" "}
                        {value}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-3xl border border-slate-200 bg-[#FAFBFE] p-5">
                    <p className="text-sm font-semibold text-slate-900">
                      Budget Allocation
                    </p>

                    <div className="mt-4 space-y-3">
                      {plan.budgetAllocation.map((item) => (
                        <div key={item.channel}>
                          <div className="mb-1 flex items-center justify-between text-sm text-slate-700">
                            <span>{item.channel}</span>
                            <span>{Math.round(item.amount / 1000)}k CHF</span>
                          </div>

                          <div className="h-3 rounded-full bg-slate-200">
                            <div
                              className="h-3 rounded-full bg-[#0B5BD3]"
                              style={{
                                width: `${Math.min(
                                  (item.amount / 500000) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
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
                        Recommended execution flow for this phase.
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
                          ? "Recommended for this execution scenario."
                          : "Optional for this campaign based on business need."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowExecuteModal(true)}
                  className="rounded-full bg-[#0B5BD3] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#0948a8]"
                >
                  Execute This Plan
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <ExecuteModal
        open={showExecuteModal}
        onClose={() => setShowExecuteModal(false)}
        plan={plan}
      />
    </>
  );
}