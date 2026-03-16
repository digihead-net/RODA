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

type CopilotMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const DEMO_PASSWORD = "rode2026";

const initialPlan: Plan = {
  title: "Welcome, Caner",
  subtitle: "What do you want to achieve today?",
  packageName: "Full Execution Package",
  packageDescription:
    "Cross-channel execution blueprint for launch readiness, HCP engagement, and orchestrated follow-through.",
  maturity: "Advanced",
  confidence: "84%",
  projectedReach: "240K HCPs",
  projectedEngagement: "19% – 27%",
  projectedRoi: "3.2x – 4.3x",
  budgetAdvice:
    "This plan is optimized for launch visibility and continuity. A heavier paid media pulse supports the launch peak, while EMMA, web, search, and WhatsApp outbound maintain engagement across the full execution window.",
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

function getCopilotReply(userPrompt: string, plan: Plan) {
  const text = userPrompt.toLowerCase();

  if (text.includes("risk") || text.includes("riskler") || text.includes("risks")) {
    return `I see four main execution risks in the current plan:

1. Messaging readiness may delay launch if consent or operational flows are not confirmed.
2. Web content production timing looks tight around the launch window.
3. Rep and digital touchpoints are not yet explicitly sequenced in one shared timeline.
4. KPI ownership for optimization is still broad and should be assigned more clearly.

Recommendation:
Lock governance routing first, then confirm the minimum viable channel mix for launch.`;
  }

  if (
    text.includes("budget") ||
    text.includes("bütçe") ||
    text.includes("reallocate") ||
    text.includes("allocation")
  ) {
    return `Based on the current mix, I would keep Paid Media as the strongest launch pulse but slightly rebalance for continuity.

Suggested refinement:
• Paid Media: keep strong for launch burst
• Web: maintain as the campaign destination
• Email / EMMA: protect this investment for sequenced engagement
• Search & GEO: maintain visibility support
• Messaging: use selectively for high-value reminders

Overall view:
This plan is already launch-oriented. I would optimize around orchestration clarity rather than making a drastic budget shift.`;
  }

  if (
    text.includes("scenario") ||
    text.includes("compare") ||
    text.includes("karşılaştır") ||
    text.includes("comparison")
  ) {
    return `Here is the simplest way to frame the scenarios:

Full Execution Package
• Higher reach
• Stronger launch visibility
• Better omnichannel orchestration
• Higher execution dependency

Balanced Engagement Package
• Lower cost pressure
• Easier to operationalize
• Stronger focus on core channels
• Lower upside versus the full package

My recommendation:
Use Full Execution Package for strategic launches, and Balanced Engagement for markets needing speed and simplicity.`;
  }

  if (
    text.includes("apply") ||
    text.includes("next step") ||
    text.includes("what should i do") ||
    text.includes("ne yapmalıyım")
  ) {
    return `My recommended next steps for this plan:

1. Confirm market objective and launch window
2. Validate the core channel mix with affiliate stakeholders
3. Align execution owners across EMMA, media, search, web, and messaging
4. Create a simple pre / during / post operating timeline
5. Launch with the current package and optimize after the first engagement signal

This is the right type of plan for strong HCP engagement with execution continuity.`;
  }

  return `Here is my recommendation based on the current plan:

Package:
${plan.packageName}

Why it fits:
• It supports launch visibility and follow-through
• It uses a broad but realistic omnichannel mix
• It balances activation and continuity across the full execution window

If you want, I can also help with:
• risk review
• scenario comparison
• budget refinement
• next-step recommendations`;
}

function RocheLogo() {
  return (
    <svg width="86" height="44" viewBox="0 0 86 44" fill="none" aria-hidden="true">
      <path
        d="M22 3H64L83 22L64 41H22L3 22L22 3Z"
        stroke="#2463E8"
        strokeWidth="2.2"
      />
      <text
        x="43"
        y="27"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#2463E8"
        fontFamily="Arial, sans-serif"
      >
        Roche
      </text>
    </svg>
  );
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
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
    <main className="flex min-h-screen items-center justify-center bg-[#F4F6FB] px-6">
      <div className="w-full max-w-md rounded-[28px] border border-[#E3E8F2] bg-white p-8 shadow-[0_20px_50px_rgba(26,60,120,0.08)]">
        <div className="mb-6 flex items-center gap-4">
          <RocheLogo />
          <div>
            <p className="text-sm font-semibold text-[#2463E8]">RODE</p>
            <p className="text-xs text-slate-500">
              Roche Omnichannel Decision &amp; Execution
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-[#1D263B]">Protected Demo</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter password to access the RODE demo.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="mt-6 w-full rounded-2xl border border-[#D9E1EF] px-4 py-3 outline-none focus:border-[#2463E8]"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full rounded-full bg-[#2463E8] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1E56D0]"
        >
          Enter Demo
        </button>
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

  const enabledServices = plan.services.filter((s) => s.enabled);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/35 px-4">
      <div className="w-full max-w-4xl rounded-[30px] border border-[#DFE6F2] bg-white p-6 shadow-[0_30px_80px_rgba(30,60,120,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#2463E8]">
              Execution Briefing Preview
            </p>
            <h3 className="mt-1 text-3xl font-semibold text-[#1D263B]">
              Execute This Plan
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              This simulates a briefing package being routed to the relevant
              execution teams across omnichannel services.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-[#DCE4F2] px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[26px] border border-[#E2E8F3] bg-[#FAFCFF] p-5">
            <h4 className="text-lg font-semibold text-[#1D263B]">Brief Summary</h4>

            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-3">
                <span className="font-semibold text-[#1D263B]">Package:</span>{" "}
                {plan.packageName}
              </div>
              <div className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-3">
                <span className="font-semibold text-[#1D263B]">Objective:</span>{" "}
                Cross-functional omnichannel execution with HCP engagement focus.
              </div>
              <div className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-3">
                <span className="font-semibold text-[#1D263B]">Projected Reach:</span>{" "}
                {plan.projectedReach}
              </div>
              <div className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-3 leading-6">
                <span className="font-semibold text-[#1D263B]">AI Advice:</span>{" "}
                {plan.budgetAdvice}
              </div>
            </div>

            <h4 className="mt-6 text-lg font-semibold text-[#1D263B]">
              Included in briefing
            </h4>

            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-3">
                Channel mix and execution sequence
              </div>
              <div className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-3">
                Budget allocation by channel
              </div>
              <div className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-3">
                Pre / During / Post orchestration timeline
              </div>
              <div className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-3">
                Service handoff summary for execution teams
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-[#E2E8F3] bg-white p-5">
            <h4 className="text-lg font-semibold text-[#1D263B]">
              Target Departments
            </h4>

            <div className="mt-4 space-y-3">
              {enabledServices.map((service) => (
                <div
                  key={service.name}
                  className="rounded-2xl border border-[#E2E8F3] bg-[#FAFCFF] px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[#1D263B]">
                    {service.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{service.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              Demo behavior: the button below simulates dispatch to execution teams.
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-[#2F73F0] to-[#2463E8] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(36,99,232,0.25)]"
            >
              Send Briefing to Execution Teams
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideNav() {
  return (
    <aside className="w-[246px] shrink-0 border-r border-[#E3E8F2] bg-[#F8FAFE]">
      <div className="flex items-center justify-between border-b border-[#E3E8F2] px-6 py-5">
        <div className="text-[28px] text-slate-400">☰</div>
        <RocheLogo />
      </div>

      <div className="px-4 py-5">
        <div className="rounded-[18px] bg-gradient-to-br from-[#2E72EF] to-[#2463E8] p-5 text-white shadow-[0_20px_40px_rgba(36,99,232,0.22)]">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-full border border-white/30 bg-white/10 px-2 py-1 text-[11px] font-semibold">
              RODE
            </div>
            <div>
              <p className="text-[16px] font-semibold">Roche Omnichannel</p>
              <p className="mt-1 text-[13px] leading-5 text-white/90">
                Decision &amp; Execution
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3 rounded-2xl bg-[#EAF1FF] px-4 py-3 text-[#1E4FB7]">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2F73F0] text-sm text-white">
              ✓
            </div>
            <span className="font-medium">Campaign Planner</span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-600">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs">
              ▤
            </div>
            <span className="font-medium">Execution Manager</span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-600">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs">
              ⤴
            </div>
            <span className="font-medium">Performance Intelligence</span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-600">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs">
              ✦
            </div>
            <span className="font-medium">Ask RODE</span>
          </div>
        </div>

        <div className="mt-8">
          <p className="px-3 text-[15px] font-medium text-slate-500">Recents</p>

          <div className="mt-3 space-y-3 px-2 text-[15px] text-slate-600">
            <div className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span className="text-slate-400">⊕</span>
              Germany Launch
            </div>
            <div className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span className="text-slate-400">▣</span>
              Oncology Congress
            </div>
            <div className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span className="text-slate-400">▣</span>
              Cardiology Awareness
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-[#E3E8F2] px-5 py-5 text-slate-500">
        <div className="flex items-center gap-3 rounded-xl px-2 py-3">
          <span>◉</span>
          Help us improve
        </div>
        <div className="mt-1 flex items-center gap-3 rounded-xl px-2 py-3">
          <span>☆</span>
          Favorites
        </div>
      </div>
    </aside>
  );
}

function BudgetDonut({ items }: { items: { channel: string; amount: number }[] }) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const pct = (amount: number) => Math.round((amount / total) * 100);

  const [a, b, c, d, e] = items;
  const aPct = pct(a?.amount || 0);
  const bPct = pct(b?.amount || 0);
  const cPct = pct(c?.amount || 0);
  const dPct = pct(d?.amount || 0);
  const ePct = pct(e?.amount || 0);

  return (
    <div className="flex items-center gap-8">
      <div className="relative h-[190px] w-[190px] shrink-0 rounded-full bg-[conic-gradient(#3E7BF0_0%_38%,#79B4F4_38%_62%,#4D95ED_62%_82%,#F2D76B_82%_92%,#F0B763_92%_100%)]">
        <div className="absolute inset-[34px] rounded-full bg-white shadow-inner" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[13px] text-slate-500">Budget</div>
            <div className="text-[20px] font-semibold text-[#1D263B]">
              {Math.round(total / 1000)}k
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-[17px] text-slate-700">
        <div className="flex items-center justify-between gap-8">
          <span>Paid Media</span>
          <span className="font-medium">{aPct}%</span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <span>Web</span>
          <span className="font-medium">{bPct}%</span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <span>Email</span>
          <span className="font-medium">{cPct}%</span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <span>Search</span>
          <span className="font-medium">{dPct}%</span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <span>Messaging</span>
          <span className="font-medium">{ePct}%</span>
        </div>
      </div>
    </div>
  );
}

function ScenarioCard({
  title,
  selected = false,
  subtitle,
  reach,
}: {
  title: string;
  selected?: boolean;
  subtitle: string;
  reach: string;
}) {
  return (
    <div
      className={`rounded-[24px] border p-5 transition-all duration-200 ${
        selected
          ? "border-[#2E72EF] bg-gradient-to-br from-[#2F73F0] to-[#2463E8] text-white shadow-[0_20px_40px_rgba(36,99,232,0.28)]"
          : "border-[#E2E8F3] bg-white text-slate-800 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between">
        <h4 className="max-w-[190px] text-[18px] font-semibold leading-6">
          {title}
        </h4>

        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] ${
            selected
              ? "bg-white/20 text-white"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          {selected ? "✓" : "○"}
        </div>
      </div>

      <p
        className={`mt-4 text-[14px] leading-6 ${
          selected ? "text-white/90" : "text-slate-500"
        }`}
      >
        {subtitle}
      </p>

      <div
        className={`mt-5 text-[14px] font-medium ${
          selected ? "text-white/90" : "text-slate-500"
        }`}
      >
        {reach}
      </div>
    </div>
  );
}

function AskRODEPanel({
  open,
  onClose,
  plan,
}: {
  open: boolean;
  onClose: () => void;
  plan: Plan;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi, I’m Ask RODE. I can help you review this plan, compare scenarios, identify execution risks, and recommend next steps.",
    },
  ]);
  const [thinking, setThinking] = useState(false);

  async function handleSend(customPrompt?: string) {
    const finalPrompt = (customPrompt ?? input).trim();
    if (!finalPrompt) return;

    const userMessage: CopilotMessage = {
      id: Date.now(),
      role: "user",
      content: finalPrompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setThinking(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    const assistantMessage: CopilotMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content: getCopilotReply(finalPrompt, plan),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setThinking(false);
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-full max-w-[430px]">
      <div className="overflow-hidden rounded-[28px] border border-[#DFE6F2] bg-white shadow-[0_30px_80px_rgba(30,60,120,0.20)]">
        <div className="flex items-start justify-between bg-gradient-to-r from-[#1F4CB8] to-[#2463E8] px-5 py-4 text-white">
          <div>
            <div className="text-sm font-semibold">Ask RODE</div>
            <div className="mt-1 text-sm text-white/85">
              Your omnichannel decision &amp; execution copilot
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/20 px-3 py-1 text-sm hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="border-b border-[#E8EDF6] px-4 py-3">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Quick prompts
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "Review execution risks",
              "Compare the two scenarios",
              "Suggest next steps",
              "Review budget allocation",
            ].map((item) => (
              <button
                key={item}
                onClick={() => handleSend(item)}
                className="rounded-full border border-[#DCE4F2] bg-[#F8FAFE] px-3 py-2 text-xs text-slate-600 hover:bg-white"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-[420px] overflow-y-auto px-4 py-4">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[86%] whitespace-pre-line rounded-[20px] px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-[#2463E8] text-white"
                      : "border border-[#E2E8F3] bg-[#F8FAFE] text-slate-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {thinking ? (
              <div className="flex justify-start">
                <div className="max-w-[86%] rounded-[20px] border border-[#E2E8F3] bg-[#F8FAFE] px-4 py-3 text-sm text-slate-500">
                  RODE is thinking...
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="border-t border-[#E8EDF6] p-4">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about risks, budget, scenarios, or next steps..."
              className="flex-1 rounded-2xl border border-[#D9E1EF] px-4 py-3 text-sm outline-none focus:border-[#2463E8]"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button
              onClick={() => handleSend()}
              className="rounded-2xl bg-gradient-to-r from-[#2F73F0] to-[#2463E8] px-5 py-3 text-sm font-semibold text-white"
            >
              Send
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
  const [showCopilot, setShowCopilot] = useState(false);
  const [activeTab, setActiveTab] = useState("planner");

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
      <main className="min-h-screen bg-[#F4F6FB] p-7 text-[#1D263B]">
        <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-[1440px] overflow-hidden rounded-[34px] border border-[#E2E7F0] bg-[#F8FAFE] shadow-[0_30px_80px_rgba(29,38,59,0.08)]">
          <SideNav />

          <section className="flex-1">
            <div className="flex items-center justify-between border-b border-[#E3E8F2] bg-white/70 px-7 py-5 backdrop-blur">
              <div className="text-[20px] font-medium text-slate-700">
                Welcome, <span className="font-semibold text-[#1D263B]">Caner</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowCopilot(true)}
                  className="rounded-full border border-[#DCE4F2] bg-white px-4 py-2 text-sm font-medium text-[#2463E8] hover:bg-[#F7FAFF]"
                >
                  Ask RODE
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E1E7F3] bg-white text-slate-400">
                  ◔
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E1E7F3] bg-white text-slate-400">
                  ⊙
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2F73F0] text-lg font-semibold text-white">
                  CY
                </div>
              </div>
            </div>

            <div className="px-7 py-8">
              <h1 className="text-[52px] font-semibold tracking-tight text-[#1D263B]">
                Welcome, Caner
              </h1>
              <h2 className="mt-2 text-[30px] font-medium text-[#1D263B]">
                What do you want to{" "}
                <span className="text-[#2463E8]">achieve today?</span>
              </h2>

              <div className="mt-8 flex items-center gap-4 rounded-[18px] border border-[#DFE5F0] bg-white px-5 py-4 shadow-sm">
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1 border-none bg-transparent text-[17px] outline-none placeholder:text-slate-400"
                  placeholder="Describe your objective"
                />
                <button
                  onClick={handleGeneratePlan}
                  disabled={loading}
                  className="rounded-2xl bg-gradient-to-r from-[#2F73F0] to-[#2463E8] px-8 py-4 text-[16px] font-medium text-white shadow-[0_12px_24px_rgba(36,99,232,0.22)] disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Generate Plan"}
                </button>
              </div>

              {error ? (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <div className="mt-9 flex gap-10 border-b border-[#E3E8F2] text-[18px]">
                <button
                  onClick={() => setActiveTab("planner")}
                  className={`pb-3 ${
                    activeTab === "planner"
                      ? "border-b-[3px] border-[#2F73F0] text-[#2F73F0]"
                      : "text-slate-400"
                  }`}
                >
                  Campaign Planner
                </button>
                <button
                  onClick={() => setActiveTab("execution")}
                  className={`pb-3 ${
                    activeTab === "execution"
                      ? "border-b-[3px] border-[#2F73F0] text-[#2F73F0]"
                      : "text-slate-400"
                  }`}
                >
                  Execution Manager
                </button>
                <button
                  onClick={() => setActiveTab("performance")}
                  className={`pb-3 ${
                    activeTab === "performance"
                      ? "border-b-[3px] border-[#2F73F0] text-[#2F73F0]"
                      : "text-slate-400"
                  }`}
                >
                  Performance Intelligence
                </button>
              </div>

              {activeTab === "planner" && (
                <>
                  <div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_0.75fr]">
                    <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
                      <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-[22px] font-semibold">
                          Strategy Recommendation
                        </h3>
                        <div className="rounded-full border border-[#D6E3FF] bg-[#EDF4FF] px-4 py-2 text-sm font-medium text-[#2F73F0]">
                          AI Recommended ✓
                        </div>
                      </div>

                      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                        <div>
                          <h4 className="text-[22px] font-semibold">
                            {plan.packageName}
                          </h4>
                          <p className="mt-2 text-[15px] leading-8 text-slate-500">
                            {plan.packageDescription}
                          </p>

                          <div className="mt-5 space-y-4 text-[17px]">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">Projected reach</span>
                              <span className="font-semibold">{plan.projectedReach}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">Expected engagement</span>
                              <span className="font-semibold">{plan.projectedEngagement}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">Estimated ROI</span>
                              <span className="font-semibold">{plan.projectedRoi}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">Services activated</span>
                              <span className="font-semibold">{serviceCount}</span>
                            </div>
                          </div>

                          <div className="mt-7 rounded-[20px] border border-[#E2E8F3] bg-[#FBFCFF] p-5">
                            <div className="flex items-center justify-between gap-4">
                              <h5 className="text-[18px] font-semibold">
                                Why This Recommendation?
                              </h5>
                              <button
                                onClick={() => setShowCopilot(true)}
                                className="rounded-full border border-[#DCE4F2] px-3 py-1 text-xs font-medium text-[#2463E8] hover:bg-white"
                              >
                                Ask RODE
                              </button>
                            </div>

                            <ul className="mt-4 space-y-3 text-[15px] leading-6 text-slate-600">
                              <li>• Germany launch campaigns perform best with strong paid media bursts</li>
                              <li>• EMMA multi-touch journeys increase HCP engagement</li>
                              <li>• WhatsApp outbound improves congress attendance by +18%</li>
                              <li>• Search visibility drives discovery traffic</li>
                            </ul>
                          </div>
                        </div>

                        <div className="rounded-[22px] bg-[#FCFDFF] p-2">
                          <BudgetDonut items={plan.budgetAllocation} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-[18px] font-semibold">Scenario Comparison</h3>
                          <span className="text-slate-300">›</span>
                        </div>

                        <div className="grid gap-3">
                          <ScenarioCard
                            selected
                            title="Full Execution Package"
                            subtitle="Cross-channel execution for launch and orchestrated HCP engagement"
                            reach="240K HCP"
                          />
                          <ScenarioCard
                            title="Balanced Engagement Package"
                            subtitle="Orchestrated HCP engagement with moderated budget distribution"
                            reach="152K HCP"
                          />
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-[18px] font-semibold">RODE Intelligence</h3>
                          <span className="text-slate-300">›</span>
                        </div>

                        <p className="text-[15px] text-slate-500">
                          Based on 184 similar campaigns
                        </p>

                        <div className="mt-5 text-[17px] leading-8 text-slate-700">
                          <p>
                            Best-performing channel mix:
                            <span className="ml-2 font-semibold">
                              Paid Media + EMMA + Web
                            </span>
                          </p>
                        </div>

                        <div className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[#2F73F0] to-[#2463E8] px-4 py-2 text-sm font-medium text-white">
                          ↑ 3.1x average ROI
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-[18px] font-semibold">Export Plan</h3>
                          <span className="text-slate-300">›</span>
                        </div>

                        <button
                          onClick={() => setShowExecuteModal(true)}
                          className="mt-2 w-full rounded-[18px] bg-gradient-to-r from-[#2F73F0] to-[#2463E8] px-6 py-4 text-[18px] font-semibold text-white shadow-[0_16px_28px_rgba(36,99,232,0.22)]"
                        >
                          Execute This Plan
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-4">
                      <h3 className="text-[22px] font-semibold">Journey Orchestration</h3>
                      <div className="h-px flex-1 bg-[#E3E8F2]" />
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                      <div className="rounded-[22px] border border-[#E1E7F2] bg-[#FCFDFF] p-5">
                        <h4 className="text-[18px] font-semibold">Pre</h4>
                        <div className="mt-4 space-y-4 text-[15px] text-slate-600">
                          {plan.pre.map((item) => (
                            <div key={item}>{item}</div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-[#E1E7F2] bg-[#FCFDFF] p-5">
                        <h4 className="text-[18px] font-semibold">During</h4>
                        <div className="mt-4 space-y-4 text-[15px] text-slate-600">
                          {plan.during.map((item) => (
                            <div key={item}>{item}</div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-[#E1E7F2] bg-[#FCFDFF] p-5">
                        <h4 className="text-[18px] font-semibold">Post</h4>
                        <div className="mt-4 space-y-4 text-[15px] text-slate-600">
                          {plan.post.map((item) => (
                            <div key={item}>{item}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "execution" && (
                <div className="mt-6 rounded-[24px] border border-[#E1E7F2] bg-white p-8 shadow-sm">
                  <h3 className="text-[24px] font-semibold">Execution Pipeline</h3>

                  <div className="mt-6 grid gap-4">
                    {[
                      "✔ EMMA Service Brief Sent",
                      "✔ Paid Media Strategy Queue",
                      "✔ Web Experience Intake Created",
                      "✔ Search & GEO Optimization Ticket",
                      "✔ The Lab Content Production Request",
                      "✔ Messaging / WhatsApp Flow Setup",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-[#E2E8F3] bg-[#FCFDFF] px-5 py-4 text-[16px] text-slate-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "performance" && (
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
                    <h3 className="text-[22px] font-semibold">RODE Intelligence</h3>
                    <p className="mt-4 text-[15px] text-slate-500">
                      Based on 184 similar campaigns
                    </p>

                    <div className="mt-6 space-y-3 text-[16px]">
                      <div className="rounded-2xl border border-[#E2E8F3] px-4 py-3">
                        Best performing mix: Paid Media + EMMA + Web
                      </div>
                      <div className="rounded-2xl border border-[#E2E8F3] px-4 py-3">
                        Average ROI: 3.1x
                      </div>
                      <div className="rounded-2xl border border-[#E2E8F3] px-4 py-3">
                        Average HCP reach: 210k
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
                    <h3 className="text-[22px] font-semibold">Predicted Outcomes</h3>

                    <div className="mt-6 space-y-3 text-[16px]">
                      <div className="rounded-2xl border border-[#E2E8F3] px-4 py-3">
                        Reach: 240k HCP
                      </div>
                      <div className="rounded-2xl border border-[#E2E8F3] px-4 py-3">
                        Engagement: 22%
                      </div>
                      <div className="rounded-2xl border border-[#E2E8F3] px-4 py-3">
                        Content consumption: 14k
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <button
          onClick={() => setShowCopilot(true)}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-gradient-to-r from-[#2F73F0] to-[#2463E8] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(36,99,232,0.32)]"
        >
          Ask RODE
        </button>
      </main>

      <ExecuteModal
        open={showExecuteModal}
        onClose={() => setShowExecuteModal(false)}
        plan={plan}
      />

      <AskRODEPanel
        open={showCopilot}
        onClose={() => setShowCopilot(false)}
        plan={plan}
      />
    </>
  );
}