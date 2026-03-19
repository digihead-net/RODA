"use client";

import { useEffect, useMemo, useState } from "react";

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

type TrackerItem = {
  request: string;
  owner: string;
  status: "Submitted" | "In Review" | "In Production" | "Ready";
  dueDate: string;
  lastUpdate: string;
};

type ScenarioKey = "recommended" | "balanced" | "efficiency";
type TabKey = "planner" | "execution" | "performance";

const DEMO_PASSWORD = "rode2026";

const recommendedPlan: Plan = {
  title: "Welcome, Rachel",
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

const balancedPlan: Plan = {
  title: "Welcome, Rachel",
  subtitle: "What do you want to achieve today?",
  packageName: "Balanced Engagement Package",
  packageDescription:
    "Orchestrated HCP engagement with moderated budget distribution, reduced delivery risk, and stronger channel balance across the full journey.",
  maturity: "Intermediate",
  confidence: "86%",
  projectedReach: "185K HCPs",
  projectedEngagement: "18% – 25%",
  projectedRoi: "3.4x – 4.5x",
  budgetAdvice:
    "This option reduces intensity in paid media and redistributes more investment into EMMA and Search to improve efficiency while preserving broad engagement.",
  channelMix: [
    "8-email engagement cadence",
    "Dedicated campaign web hub",
    "More targeted paid media burst",
    "Search & GEO visibility uplift",
    "WhatsApp outbound reminders",
    "Long-tail nurture optimization",
  ],
  pre: [
    "2 teaser emails to priority HCP audiences",
    "Pre-launch nurture email",
    "Disease awareness web landing page",
    "Targeted paid media teaser burst",
  ],
  during: [
    "3 launch emails across priority segments",
    "Campaign hub go-live with modular content",
    "Reduced but targeted media amplification",
    "Search and GEO visibility push",
  ],
  post: [
    "3 follow-up emails with next-best-content",
    "Search-based re-entry path",
    "Retargeting burst for engaged audiences",
    "Content optimization review",
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
    { channel: "Paid Media", amount: 160000 },
    { channel: "Web", amount: 120000 },
    { channel: "Email", amount: 120000 },
    { channel: "Search", amount: 60000 },
    { channel: "Messaging", amount: 40000 },
  ],
};

const efficiencyPlan: Plan = {
  title: "Welcome, Rachel",
  subtitle: "What do you want to achieve today?",
  packageName: "Efficiency Package",
  packageDescription:
    "Lean execution model with tighter channel mix, lower investment intensity, and stronger emphasis on cost-efficient engagement and continuity.",
  maturity: "Intermediate",
  confidence: "88%",
  projectedReach: "160K HCPs",
  projectedEngagement: "17% – 24%",
  projectedRoi: "3.8x – 4.8x",
  budgetAdvice:
    "This option is optimized for efficiency. Paid Media is reduced further, while Email, Search, and Web carry more of the engagement load with a lighter but smarter activation pattern.",
  channelMix: [
    "8-email efficiency cadence",
    "Lean campaign web hub",
    "Highly targeted paid media support",
    "Search-led discoverability layer",
    "WhatsApp reminder touchpoint",
    "Extended long-tail nurture",
  ],
  pre: [
    "2 teaser emails to priority HCP audiences",
    "Lean awareness landing page",
    "Targeted media burst for core audiences",
    "Search readiness setup",
  ],
  during: [
    "2 launch emails across top-priority segments",
    "Lean campaign hub go-live",
    "Targeted paid media amplification",
    "Search-led visibility push",
  ],
  post: [
    "3 follow-up emails with next-best-content",
    "Retargeting for engaged audiences only",
    "Search-based re-entry and content path",
    "Nurture stream optimization review",
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
    { channel: "Paid Media", amount: 140000 },
    { channel: "Web", amount: 120000 },
    { channel: "Email", amount: 130000 },
    { channel: "Search", amount: 70000 },
    { channel: "Messaging", amount: 40000 },
  ],
};

const quickAccessServices = [
  {
    name: "The Lab Content Services",
    href: "#",
    description:
      "Content production and content support services delivered through The Lab.",
  },
  {
    name: "Marketing Automation",
    href: "#",
    description: "Email, mobile messaging and marketing automation.",
  },
  {
    name: "Search Experience",
    href: "#",
    description: "SEO, GEO.",
  },
  {
    name: "Media",
    href: "#",
    description: "Paid media and media activation services.",
  },
  {
    name: "Website Services",
    href: "#",
    description: "Website and related digital experience services.",
  },
];

const trackerItems: TrackerItem[] = [
  {
    request: "Product X launch email wave",
    owner: "EMMA Service Team",
    status: "Ready",
    dueDate: "Mar 12, 2026",
    lastUpdate: "Assets approved and ready for deployment.",
  },
  {
    request: "Campaign hub page build",
    owner: "Web Experience Team",
    status: "In Production",
    dueDate: "Mar 18, 2026",
    lastUpdate: "Page template configured and content modules in progress.",
  },
  {
    request: "Programmatic media setup",
    owner: "Media Team",
    status: "In Review",
    dueDate: "Mar 15, 2026",
    lastUpdate: "Audience and placement strategy under review.",
  },
  {
    request: "Search & GEO optimization request",
    owner: "Search Experience Team",
    status: "Submitted",
    dueDate: "Mar 20, 2026",
    lastUpdate: "Intake submitted and awaiting prioritization.",
  },
  {
    request: "WhatsApp outbound reminder flow",
    owner: "Messaging Team",
    status: "In Production",
    dueDate: "Mar 16, 2026",
    lastUpdate: "Flow logic finalized; localization underway.",
  },
  {
    request: "Launch content adaptation pack",
    owner: "The Lab Content Services",
    status: "In Review",
    dueDate: "Mar 14, 2026",
    lastUpdate: "Draft assets shared for review and comments.",
  },
];

const budgetColors = [
  "#3E7BF0",
  "#79B4F4",
  "#4D95ED",
  "#F2D76B",
  "#F0B763",
  "#9B8AFB",
  "#72D6C9",
];

type TimelineLaneItem = {
  id: string;
  lane: "Email" | "Web" | "Media" | "Search" | "Messaging";
  phase: "Pre" | "During" | "Post";
  title: string;
};

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
          Enter password to access the operating system demo.
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

function SideNav({
  activeTab,
  onTabChange,
}: {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}) {
  const navItems: {
    key: TabKey;
    label: string;
    icon: string;
  }[] = [
    { key: "planner", label: "Campaign Planner", icon: "✓" },
    { key: "execution", label: "Execution Manager", icon: "▤" },
    { key: "performance", label: "Performance Intelligence", icon: "⤴" },
  ];

  return (
    <aside className="w-[246px] shrink-0 border-r border-[#E3E8F2] bg-[#F8FAFE]">
      <div className="flex items-center justify-between border-b border-[#E3E8F2] px-6 py-5">
        <div className="text-[28px] text-slate-400">☰</div>
        <RocheLogo />
      </div>

      <div className="px-4 py-5">
        <div className="rounded-[18px] bg-gradient-to-br from-[#2E72EF] to-[#2463E8] p-5 text-white shadow-[0_20px_40px_rgba(36,99,232,0.22)]">
          <div className="flex items-start gap-3">
            <div>
              <p className="text-[18px] font-semibold">RODE</p>
              <p className="mt-1 text-[13px] leading-5 text-white/90">
                Roche Omnichannel
                <br />
                Decision &amp; Execution
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onTabChange(item.key)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                  isActive
                    ? "bg-[#EAF1FF] text-[#1E4FB7]"
                    : "text-slate-600 hover:bg-white/70"
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                    isActive
                      ? "bg-[#2F73F0] text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
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

function formatCurrencyCompact(amount: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
}

function BudgetDonut({ items }: { items: { channel: string; amount: number }[] }) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  const segments = useMemo(() => {
    if (!items.length || total === 0) return [];

    let cursor = 0;

    return items.map((item, index) => {
      const color = budgetColors[index % budgetColors.length];
      const start = cursor;
      const end = cursor + (item.amount / total) * 100;
      const mid = (start + end) / 2;
      cursor = end;

      return {
        ...item,
        color,
        share: Math.round((item.amount / total) * 100),
        mid,
      };
    });
  }, [items, total]);

  const gradientStops = useMemo(() => {
    if (!segments.length) {
      return "conic-gradient(#E5ECF7 0% 100%)";
    }

    return `conic-gradient(${segments
      .map((seg, i) => {
        const prevEnd =
          i === 0
            ? 0
            : segments.slice(0, i).reduce((acc, s) => acc + (s.amount / total) * 100, 0);
        const end = prevEnd + (seg.amount / total) * 100;
        return `${seg.color} ${prevEnd}% ${end}%`;
      })
      .join(",")})`;
  }, [segments, total]);

  const donutSize = 320;
  const center = donutSize / 2;
  const labelRadius = 132; // label position over slices

  return (
    <div className="grid gap-8 xl:grid-cols-[380px_minmax(0,1fr)] xl:items-center">
      <div className="flex justify-center">
        <div className="relative" style={{ width: donutSize, height: donutSize }}>
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: gradientStops }}
          />
          <div className="absolute inset-[84px] rounded-full bg-white shadow-inner" />

          {segments.map((seg) => {
            const angle = seg.mid * 3.6 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = center + Math.cos(rad) * labelRadius;
            const y = center + Math.sin(rad) * labelRadius;

            return (
              <div
                key={seg.channel}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/70 bg-white/88 px-2 py-1 text-center shadow-[0_6px_16px_rgba(29,38,59,0.10)] backdrop-blur-sm"
                style={{
                  left: x,
                  top: y,
                  minWidth: 72,
                }}
              >
                <p className="text-[13px] font-semibold leading-4 text-[#1D263B]">
                  {seg.share}%
                </p>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">
                  {formatCurrencyCompact(seg.amount)} CHF
                </p>
              </div>
            );
          })}

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Budget
              </p>
              <p className="mt-2 text-[38px] font-semibold leading-none text-[#1D263B]">
                {formatCurrencyCompact(total)}
              </p>
              <p className="mt-2 text-[14px] text-slate-500">CHF</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {segments.map((seg) => (
          <div
            key={seg.channel}
            className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-[15px] font-medium text-slate-700">
                {seg.channel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function ScenarioCard({
  title,
  selected = false,
  subtitle,
  reach,
  onClick,
}: {
  title: string;
  selected?: boolean;
  subtitle: string;
  reach: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[24px] border p-5 text-left transition-all duration-200 ${
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
            selected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
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
    </button>
  );
}

function ScenarioComparisonPanel({
  activeScenario,
  onSelect,
}: {
  activeScenario: ScenarioKey;
  onSelect: (scenario: ScenarioKey) => void;
}) {
  return (
    <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[18px] font-semibold">Scenario Comparison</h3>
        <span className="text-slate-300">›</span>
      </div>

      <div className="grid gap-3">
        <ScenarioCard
          selected={activeScenario === "recommended"}
          title="Full Execution Package"
          subtitle="Cross-channel execution blueprint for launch readiness, HCP engagement, and orchestrated follow-through."
          reach="240K HCPs"
          onClick={() => onSelect("recommended")}
        />
        <ScenarioCard
          selected={activeScenario === "balanced"}
          title="Balanced Engagement Package"
          subtitle="Orchestrated HCP engagement with moderated budget distribution and reduced delivery risk."
          reach="185K HCPs"
          onClick={() => onSelect("balanced")}
        />
        <ScenarioCard
          selected={activeScenario === "efficiency"}
          title="Efficiency Package"
          subtitle="Lean execution model with stronger efficiency focus, tighter channel mix, and lower investment intensity."
          reach="160K HCPs"
          onClick={() => onSelect("efficiency")}
        />
      </div>
    </div>
  );
}

function InfoBadge({ text }: { text: string }) {
  return (
    <span
      title={text}
      className="ml-2 inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-[#C8D7F3] bg-[#F4F8FF] text-[11px] font-semibold text-[#2463E8]"
    >
      i
    </span>
  );
}

function StatusPill({ status }: { status: TrackerItem["status"] }) {
  const styles =
    status === "Ready"
      ? "border-green-200 bg-green-50 text-green-700"
      : status === "In Production"
      ? "border-blue-200 bg-blue-50 text-blue-700"
      : status === "In Review"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-slate-200 bg-slate-50 text-slate-600";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
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
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setSent(false);
    }
  }, [open]);

  if (!open) return null;

  const enabledServices = plan.services.filter((s) => s.enabled);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/35 px-4">
      <div className="w-full max-w-4xl rounded-[30px] border border-[#DFE6F2] bg-white p-6 shadow-[0_30px_80px_rgba(30,60,120,0.18)]">
        {!sent ? (
          <>
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
                  <div className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-3">
                    <span className="font-semibold text-[#1D263B]">Confidence:</span>{" "}
                    {plan.confidence}
                  </div>
                  <div className="rounded-2xl border border-[#E2E8F3] bg-white px-4 py-3 leading-6">
                    <span className="font-semibold text-[#1D263B]">AI Advice:</span>{" "}
                    {plan.budgetAdvice}
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

                <button
                  onClick={() => setSent(true)}
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-[#2F73F0] to-[#2463E8] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(36,99,232,0.25)]"
                >
                  Send Briefing to Execution Teams
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#2463E8]">
                  Execution Pipeline
                </p>
                <h3 className="mt-1 text-3xl font-semibold text-[#1D263B]">
                  Briefing Sent Successfully
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  RODE has simulated dispatch of the execution brief to the relevant teams.
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-full border border-[#DCE4F2] px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              {[
                "✔ EMMA Service Brief Sent",
                "✔ Paid Media Strategy Queue Created",
                "✔ Web Experience Intake Created",
                "✔ Search & GEO Optimization Ticket Created",
                "✔ The Lab Production Request Sent",
                "✔ Messaging / WhatsApp Flow Setup Triggered",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#E2E8F3] bg-[#FAFCFF] px-5 py-4 text-[15px] text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdoptionLevelCard({
  level,
  title,
  subtitle,
  share,
}: {
  level: string;
  title: string;
  subtitle: string;
  share: string;
}) {
  return (
    <div className="rounded-[20px] border border-[#E2E8F3] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {level}
      </p>
      <p className="mt-2 text-[17px] font-semibold text-[#1D263B]">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      <div className="mt-4 rounded-xl bg-[#F8FAFE] px-3 py-2 text-sm text-slate-700">
        HCP distribution: <span className="font-semibold">{share}</span>
      </div>
    </div>
  );
}

function applyCopilotChange(plan: Plan, input: string) {
  const lower = input.toLowerCase();
  let answer =
    "Recommendation: Keep the current execution package, but test a lighter paid media burst and stronger web + EMMA continuity layer for better long-tail engagement.";
  let updatedPlan: Plan = { ...plan };

  if (lower.includes("reduce") && lower.includes("budget")) {
    answer =
      "Recommendation: Reduce Paid Media by 30k CHF and reallocate 20k to Email and 10k to Search. Expected engagement remains stable while budget efficiency improves.";

    updatedPlan = {
      ...balancedPlan,
      budgetAdvice:
        "Budget has been optimized for efficiency. Paid Media has been reduced, while Email and Search have been strengthened to preserve engagement while improving cost efficiency.",
    };
  } else if (lower.includes("whatsapp")) {
    answer =
      "Recommendation: Add a stronger WhatsApp outbound layer in pre and post phases to improve continuity and meeting attendance. Messaging budget can increase from 8% to 12%.";

    updatedPlan = {
      ...plan,
      packageName: "Messaging-Enhanced Execution Package",
      confidence: "87%",
      projectedEngagement: "21% – 29%",
      budgetAdvice:
        "Messaging has been expanded to strengthen continuity across the journey. WhatsApp outbound now plays a larger role in pre-event awareness and post-event re-entry.",
      budgetAllocation: [
        { channel: "Paid Media", amount: 175000 },
        { channel: "Web", amount: 115000 },
        { channel: "Email", amount: 95000 },
        { channel: "Search", amount: 55000 },
        { channel: "Messaging", amount: 60000 },
      ],
      channelMix: [
        "7-email launch cadence",
        "Dedicated campaign web hub",
        "Programmatic and LinkedIn media burst",
        "Search & GEO visibility uplift",
        "WhatsApp outbound save-the-date and reminder flow",
        "Post-launch re-entry messaging",
      ],
      pre: [
        "2 teaser emails to priority HCP audiences",
        "2-step WhatsApp outbound save-the-date sequence",
        "Disease awareness web landing page",
        "Paid media teaser burst",
      ],
      post: [
        "2 follow-up emails with next-best-content",
        "2-step WhatsApp re-entry and reminder touchpoint",
        "Retargeting burst for engaged audiences",
        "Content hub expansion and optimization review",
      ],
    };
  } else if (lower.includes("congress")) {
    answer =
      "Recommendation: Shift the strategy toward congress activation with higher emphasis on reminders, field-force linked content, and a tighter pre-event media burst.";

    updatedPlan = {
      ...plan,
      packageName: "Congress Activation Package",
      packageDescription:
        "Execution blueprint tailored to congress presence, pre-event awareness, on-site amplification, and post-congress follow-through.",
      maturity: "Advanced",
      confidence: "85%",
      projectedReach: "185K HCPs",
      projectedEngagement: "22% – 30%",
      projectedRoi: "2.9x – 4.1x",
      budgetAdvice:
        "The strategy has been shifted toward congress activation with a tighter pre-event awareness burst, stronger reminder logic, and a higher emphasis on follow-up content after the event.",
      channelMix: [
        "4-email congress cadence",
        "Congress landing page / hub",
        "Programmatic and LinkedIn awareness burst",
        "WhatsApp reminder flow",
        "Search visibility for congress queries",
        "Post-congress recap content",
      ],
      pre: [
        "2 congress teaser emails",
        "WhatsApp save-the-date message",
        "Pre-event paid media burst",
        "Congress landing page go-live",
      ],
      during: [
        "1 onsite launch email",
        "LinkedIn and programmatic amplification",
        "Congress hub updates and recap highlights",
        "Field-force connected content distribution",
      ],
      post: [
        "2 congress follow-up emails",
        "WhatsApp reminder and recap touchpoint",
        "Retargeting for attendees and engaged HCPs",
        "Congress content archive and insight summary",
      ],
      budgetAllocation: [
        { channel: "Paid Media", amount: 170000 },
        { channel: "Web", amount: 110000 },
        { channel: "Email", amount: 90000 },
        { channel: "Search", amount: 50000 },
        { channel: "Messaging", amount: 80000 },
      ],
    };
  } else if (lower.includes("engagement")) {
    answer =
      "Recommendation: Increase EMMA cadence depth and strengthen follow-up content sequencing. This should improve projected HCP engagement by 3–4 percentage points.";

    updatedPlan = {
      ...plan,
      packageName: "Engagement-Optimized Package",
      confidence: "88%",
      projectedEngagement: "23% – 31%",
      budgetAdvice:
        "This version strengthens the engagement layer by increasing email touchpoints, improving post-launch sequencing, and tightening continuity across channels.",
      channelMix: [
        "9-email engagement cadence",
        "Dedicated campaign web hub",
        "Programmatic and LinkedIn media burst",
        "Search & GEO visibility uplift",
        "WhatsApp outbound reminders",
        "Enhanced post-launch nurture stream",
      ],
      pre: [
        "3 teaser emails to priority HCP audiences",
        "WhatsApp outbound save-the-date message",
        "Disease awareness web landing page",
        "Paid media teaser burst",
      ],
      during: [
        "4 launch emails across priority segments",
        "Campaign hub go-live with modular content",
        "Programmatic + LinkedIn amplification",
        "Search and GEO visibility push",
      ],
      post: [
        "3 follow-up emails with next-best-content",
        "WhatsApp outbound reminder and re-entry touchpoint",
        "Retargeting burst for engaged audiences",
        "Content hub expansion and optimization review",
      ],
      budgetAllocation: [
        { channel: "Paid Media", amount: 180000 },
        { channel: "Web", amount: 115000 },
        { channel: "Email", amount: 115000 },
        { channel: "Search", amount: 50000 },
        { channel: "Messaging", amount: 40000 },
      ],
    };
  }

  return { updatedPlan, answer };
}

function CopilotPanel({
  plan,
  onApply,
}: {
  plan: Plan;
  onApply: (updatedPlan: Plan) => void;
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Ask RODE to improve the plan, reduce budget, rebalance channels, or generate an alternative scenario."
  );
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "Improve engagement strategy",
    "Reduce budget by 20%",
    "Add WhatsApp outbound",
    "Create congress activation plan",
  ];

  function handleAsk() {
    if (!question.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const result = applyCopilotChange(plan, question);
      setAnswer(result.answer);
      onApply(result.updatedPlan);
      setLoading(false);
    }, 700);
  }

  return (
    <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[18px] font-semibold">Ask RODE</h3>
        <div className="rounded-full border border-[#D6E3FF] bg-[#EDF4FF] px-3 py-1 text-xs font-medium text-[#2F73F0]">
          AI Copilot
        </div>
      </div>

      <p className="text-[14px] leading-6 text-slate-500">
        Refine strategy, rebalance budget, or generate a new recommendation.
      </p>

      <div className="mt-4 space-y-2">
        {quickPrompts.map((item) => (
          <button
            key={item}
            onClick={() => setQuestion(item)}
            className="w-full rounded-2xl border border-[#E2E8F3] bg-[#FAFCFF] px-4 py-3 text-left text-sm text-slate-600 hover:border-[#CFE0FF]"
          >
            {item}
          </button>
        ))}
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask RODE anything..."
        className="mt-4 min-h-[110px] w-full rounded-2xl border border-[#E2E8F3] px-4 py-3 text-sm outline-none focus:border-[#2463E8]"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-4 w-full rounded-full bg-gradient-to-r from-[#2F73F0] to-[#2463E8] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Thinking..." : "Ask RODE"}
      </button>

      <div className="mt-4 rounded-2xl border border-[#E2E8F3] bg-[#FAFCFF] px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Copilot Response
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-700">{answer}</p>
      </div>
    </div>
  );
}

function classifyLane(item: string): TimelineLaneItem["lane"] {
  const lower = item.toLowerCase();
  if (lower.includes("email")) return "Email";
  if (
    lower.includes("web") ||
    lower.includes("hub") ||
    lower.includes("landing page") ||
    lower.includes("content hub")
  ) {
    return "Web";
  }
  if (
    lower.includes("paid media") ||
    lower.includes("media") ||
    lower.includes("linkedin") ||
    lower.includes("programmatic") ||
    lower.includes("retargeting")
  ) {
    return "Media";
  }
  if (lower.includes("search") || lower.includes("geo")) return "Search";
  if (lower.includes("whatsapp") || lower.includes("messaging")) return "Messaging";
  return "Web";
}

function buildTimelineItems(plan: Plan): TimelineLaneItem[] {
  const items: TimelineLaneItem[] = [];

  plan.pre.forEach((item, idx) => {
    items.push({
      id: `pre-${idx}`,
      lane: classifyLane(item),
      phase: "Pre",
      title: item,
    });
  });

  plan.during.forEach((item, idx) => {
    items.push({
      id: `during-${idx}`,
      lane: classifyLane(item),
      phase: "During",
      title: item,
    });
  });

  plan.post.forEach((item, idx) => {
    items.push({
      id: `post-${idx}`,
      lane: classifyLane(item),
      phase: "Post",
      title: item,
    });
  });

  return items;
}

function laneAccent(lane: TimelineLaneItem["lane"]) {
  if (lane === "Email") return "bg-[#2F73F0]";
  if (lane === "Web") return "bg-[#72D6C9]";
  if (lane === "Media") return "bg-[#F0B763]";
  if (lane === "Search") return "bg-[#9B8AFB]";
  return "bg-[#4D95ED]";
}

function laneDotBorder(lane: TimelineLaneItem["lane"]) {
  if (lane === "Email") return "border-[#2F73F0]";
  if (lane === "Web") return "border-[#72D6C9]";
  if (lane === "Media") return "border-[#F0B763]";
  if (lane === "Search") return "border-[#9B8AFB]";
  return "border-[#4D95ED]";
}

function TimelineSection({ plan }: { plan: Plan }) {
  const lanes: TimelineLaneItem["lane"][] = [
    "Email",
    "Web",
    "Media",
    "Search",
    "Messaging",
  ];

  const phaseMeta = [
    { key: "Pre" as const, label: "Pre", sublabel: "Weeks 1–2" },
    { key: "During" as const, label: "Launch", sublabel: "Weeks 3–5" },
    { key: "Post" as const, label: "Post", sublabel: "Weeks 6–8" },
  ];

  const items = useMemo(() => buildTimelineItems(plan), [plan]);

  return (
    <div className="mt-6 rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-4">
        <h3 className="text-[22px] font-semibold">Journey Timeline</h3>
        <div className="h-px flex-1 bg-[#E3E8F2]" />
      </div>

      <div className="rounded-[22px] border border-[#E2E8F3] bg-[#FBFCFF] p-5">
        <div className="grid grid-cols-[120px_1fr] gap-4">
          <div />

          <div className="grid grid-cols-3 gap-4">
            {phaseMeta.map((phase) => (
              <div
                key={phase.key}
                className="rounded-[18px] border border-[#DCE6F7] bg-gradient-to-r from-[#F7FAFF] to-[#EEF4FF] px-4 py-3"
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2463E8]">
                  {phase.label}
                </p>
                <p className="mt-1 text-sm text-slate-500">{phase.sublabel}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {lanes.map((lane) => {
            const laneItems = items.filter((item) => item.lane === lane);

            return (
              <div key={lane} className="grid grid-cols-[120px_1fr] gap-4">
                <div className="flex items-center">
                  <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${laneAccent(lane)}`} />
                    <span className="text-[15px] font-semibold text-[#1D263B]">
                      {lane}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {phaseMeta.map((phase, phaseIndex) => {
                    const phaseItems = laneItems.filter(
                      (item) => item.phase === phase.key
                    );

                    return (
                      <div
                        key={`${lane}-${phase.key}`}
                        className="relative min-h-[108px] rounded-[18px] border border-[#E2E8F3] bg-white px-4 py-4"
                      >
                        <div className="absolute left-0 right-0 top-1/2 z-0 h-px -translate-y-1/2 bg-[#E7EDF7]" />

                        {phaseIndex === 1 ? (
                          <div className="absolute left-1/2 top-3 bottom-3 z-10 w-px -translate-x-1/2 bg-[#2F73F0]/35" />
                        ) : null}

                        {phaseIndex === 1 ? (
                          <div className="absolute left-1/2 top-2 z-20 -translate-x-1/2 rounded-full border border-[#CFE0FF] bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2F73F0] shadow-sm">
                            Today
                          </div>
                        ) : null}

                        {phaseItems.length === 0 ? (
                          <div className="relative z-10 flex h-full items-center justify-center">
                            <span
                              className={`h-4 w-4 rounded-full border-[3px] bg-white ${laneDotBorder(
                                lane
                              )}`}
                            />
                          </div>
                        ) : (
                          <div className="relative z-10 flex h-full flex-wrap items-start gap-3">
                            {phaseItems.map((item) => (
                              <div
                                key={item.id}
                                className="min-w-[150px] max-w-full flex-1 rounded-2xl border border-[#DDE6F3] bg-[#F9FBFF] px-3 py-3 shadow-[0_6px_16px_rgba(36,99,232,0.05)]"
                              >
                                <div className="mb-2 flex items-center gap-2">
                                  <span
                                    className={`h-3 w-3 rounded-full border-[3px] bg-white ${laneDotBorder(
                                      lane
                                    )}`}
                                  />
                                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Touchpoint
                                  </span>
                                </div>
                                <p className="text-[13px] leading-6 text-slate-700">
                                  {item.title}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getScenarioFromPlan(plan: Plan): ScenarioKey {
  if (plan.packageName === balancedPlan.packageName) return "balanced";
  if (plan.packageName === efficiencyPlan.packageName) return "efficiency";
  return "recommended";
}

function HighlightPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-[#DCE6F7] bg-[#F7FAFF] px-3 py-2 text-sm text-slate-700">
      {children}
    </div>
  );
}

function AIBasisPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-[#D6E3FF] bg-white px-4 py-2.5 text-[14px] text-[#3A4A67] shadow-[0_4px_10px_rgba(36,99,232,0.05)]">
      {children}
    </div>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState(
    "I'm launching Product X in Germany with 500k CHF budget and want strong HCP engagement."
  );
  const [plan, setPlan] = useState<Plan>(recommendedPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [showExecuteModal, setShowExecuteModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("planner");
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("recommended");

  const serviceCount = useMemo(
    () => plan.services.filter((service) => service.enabled).length,
    [plan.services]
  );

  const trackerSummary = useMemo(() => {
    return {
      submitted: trackerItems.filter((i) => i.status === "Submitted").length,
      inReview: trackerItems.filter((i) => i.status === "In Review").length,
      inProduction: trackerItems.filter((i) => i.status === "In Production").length,
      ready: trackerItems.filter((i) => i.status === "Ready").length,
    };
  }, []);

  const totalBudget = useMemo(
    () => plan.budgetAllocation.reduce((sum, item) => sum + item.amount, 0),
    [plan.budgetAllocation]
  );

  function applyScenario(scenario: ScenarioKey) {
    setActiveScenario(scenario);
    if (scenario === "recommended") setPlan(recommendedPlan);
    if (scenario === "balanced") setPlan(balancedPlan);
    if (scenario === "efficiency") setPlan(efficiencyPlan);
  }

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
      setActiveScenario(getScenarioFromPlan(data));
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
          <SideNav activeTab={activeTab} onTabChange={setActiveTab} />

          <section className="flex-1">
            <div className="flex items-center justify-end border-b border-[#E3E8F2] bg-white/70 px-7 py-5 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E1E7F3] bg-white text-slate-400">
                  ◔
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E1E7F3] bg-white text-slate-400">
                  ⊙
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2F73F0] text-lg font-semibold text-white">
                  RF
                </div>
              </div>
            </div>

            <div className="px-7 py-8">
              <h1 className="text-[52px] font-semibold tracking-tight text-[#1D263B]">
                Hi, Rachel
              </h1>

              <div className="mt-4">
                <div className="text-[14px] font-semibold uppercase tracking-[0.2em] text-[#2463E8]">
                  Ask RODE
                </div>
                <h2 className="mt-2 text-[30px] font-medium text-[#1D263B]">
                  What do you want to{" "}
                  <span className="text-[#2463E8]">achieve today?</span>
                </h2>
              </div>

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

                      <div className="mb-6 rounded-[22px] border border-[#DCE6F7] bg-gradient-to-r from-[#F7FAFF] to-[#EEF4FF] p-5">
                        <div className="grid gap-5 xl:grid-cols-[1.5fr_220px] xl:items-start">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2463E8]">
                              Recommended path
                            </p>
                            <h4 className="mt-2 text-[24px] font-semibold text-[#1D263B]">
                              {plan.packageName}
                            </h4>
                            <p className="mt-3 max-w-[720px] text-[15px] leading-8 text-slate-600">
                              {plan.budgetAdvice}
                            </p>
                          </div>

                          <div className="grid gap-3 self-start">
                            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                                Confidence
                              </p>
                              <p className="mt-2 text-[18px] font-semibold text-[#2463E8]">
                                {plan.confidence}
                              </p>
                            </div>
                            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                                Maturity
                              </p>
                              <p className="mt-2 text-[18px] font-semibold text-[#1D263B]">
                                {plan.maturity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-[16px] leading-8 text-slate-600">
                          {plan.packageDescription}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">
                          <HighlightPill>
                            <span className="text-slate-500">Services:</span>{" "}
                            <span className="font-semibold">{serviceCount}</span>
                          </HighlightPill>
                          <HighlightPill>
                            <span className="text-slate-500">Budget:</span>{" "}
                            <span className="font-semibold">
                              {formatCurrencyCompact(totalBudget)} CHF
                            </span>
                          </HighlightPill>
                          <HighlightPill>
                            <span className="text-slate-500">Reach:</span>{" "}
                            <span className="font-semibold">{plan.projectedReach}</span>
                          </HighlightPill>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3 md:grid-cols-3">
                        <div className="rounded-[18px] border border-[#E2E8F3] bg-[#FBFCFF] px-4 py-4">
                          <p className="text-sm text-slate-500">Projected reach</p>
                          <p className="mt-2 text-[18px] font-semibold text-[#1D263B]">
                            {plan.projectedReach}
                          </p>
                        </div>

                        <div className="rounded-[18px] border border-[#E2E8F3] bg-[#FBFCFF] px-4 py-4">
                          <p className="text-sm text-slate-500">Expected engagement</p>
                          <p className="mt-2 text-[18px] font-semibold text-[#1D263B]">
                            {plan.projectedEngagement}
                          </p>
                        </div>

                        <div className="rounded-[18px] border border-[#E2E8F3] bg-[#FBFCFF] px-4 py-4">
                          <p className="text-sm text-slate-500">Estimated ROI</p>
                          <p className="mt-2 text-[18px] font-semibold text-[#1D263B]">
                            {plan.projectedRoi}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 rounded-[20px] border border-[#E2E8F3] bg-[#FBFCFF] p-5">
                        <div className="flex items-center justify-between gap-4">
                          <h5 className="text-[18px] font-semibold">Budget Allocation</h5>
                          <span className="text-sm text-slate-400">
                            {formatCurrencyCompact(totalBudget)} CHF
                          </span>
                        </div>

                        <div className="mt-6">
                          <BudgetDonut items={plan.budgetAllocation} />
                        </div>
                      </div>

                      <div className="mt-6 rounded-[20px] border border-[#E2E8F3] bg-[#FBFCFF] p-5">
                        <div className="flex items-start justify-between gap-4">
                          <h5 className="max-w-[320px] text-[18px] font-semibold leading-7">
                            Recommended Channel Mix
                          </h5>
                          <span className="shrink-0 text-sm text-slate-400">
                            {plan.channelMix.length} elements
                          </span>
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                          {plan.channelMix.map((item) => (
                            <div
                              key={item}
                              className="flex min-h-[96px] items-start rounded-2xl border border-[#E2E8F3] bg-white px-4 py-4 text-[14px] leading-7 text-slate-700"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 rounded-[20px] border border-[#E2E8F3] bg-[#FBFCFF] p-5">
                        <div className="grid gap-5 xl:grid-cols-[0.34fr_0.66fr] xl:items-start">
                          <div>
                            <h5 className="text-[18px] font-semibold">AI rationale</h5>
                            <p className="mt-2 text-sm text-slate-400">
                              Evidence-based logic
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <AIBasisPill>Germany launch fit</AIBasisPill>
                            <AIBasisPill>High HCP engagement potential</AIBasisPill>
                            <AIBasisPill>Strong continuity across journey</AIBasisPill>
                            <AIBasisPill>Balanced awareness + follow-through</AIBasisPill>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-4 lg:grid-cols-2">
                          {[
                            "Germany launch campaigns perform best with strong paid media bursts",
                            "EMMA multi-touch journeys increase HCP engagement",
                            "WhatsApp outbound improves congress attendance and continuity",
                            "Search visibility drives discoverability and evidence traffic",
                          ].map((item) => (
                            <div
                              key={item}
                              className="rounded-2xl border border-[#E2E8F3] bg-white px-5 py-4 text-[15px] leading-8 text-slate-600"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <ScenarioComparisonPanel
                        activeScenario={activeScenario}
                        onSelect={applyScenario}
                      />
                      <CopilotPanel
                        plan={plan}
                        onApply={(updatedPlan) => {
                          setPlan(updatedPlan);
                          setActiveScenario(getScenarioFromPlan(updatedPlan));
                        }}
                      />

                      <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-[18px] font-semibold">Export Plan</h3>
                          <span className="text-slate-300">›</span>
                        </div>

                        <div className="mb-4 rounded-2xl border border-[#E2E8F3] bg-[#FAFCFF] px-4 py-3 text-sm text-slate-600">
                          Enabled services: {serviceCount}
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

                  <TimelineSection plan={plan} />

                  <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
                      <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-[22px] font-semibold">
                          Quick Access to Services
                        </h3>
                        <span className="text-sm text-slate-400">Standalone access</span>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        {quickAccessServices.map((service) => (
                          <a
                            key={service.name}
                            href={service.href}
                            className="rounded-[18px] border border-[#E2E8F3] bg-[#FBFCFF] px-4 py-4 text-[15px] text-slate-700 transition hover:border-[#CFE0FF] hover:shadow-sm"
                          >
                            <div className="flex items-center">
                              <span className="font-medium">{service.name}</span>
                              <InfoBadge text={service.description} />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
                      <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-[22px] font-semibold">RICH</h3>
                        <span className="text-sm text-slate-400">AI-supported platform</span>
                      </div>

                      <div className="rounded-[20px] border border-[#DCE6F7] bg-gradient-to-br from-[#F7FAFF] to-[#EEF4FF] p-5">
                        <p className="text-[18px] font-semibold text-[#1D263B]">
                          Roche Intelligent Content Hub
                        </p>
                        <p className="mt-3 text-[15px] leading-7 text-slate-600">
                          Create content, explore AI-supported content workflows, and
                          connect execution planning with content generation.
                        </p>

                        <a
                          href="https://studio.roche.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[#2F73F0] to-[#2463E8] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(36,99,232,0.18)]"
                        >
                          Go to RICH
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "execution" && (
                <div className="mt-6 space-y-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-[22px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">Submitted</p>
                      <p className="mt-2 text-3xl font-semibold">{trackerSummary.submitted}</p>
                    </div>
                    <div className="rounded-[22px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">In Review</p>
                      <p className="mt-2 text-3xl font-semibold">{trackerSummary.inReview}</p>
                    </div>
                    <div className="rounded-[22px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">In Production</p>
                      <p className="mt-2 text-3xl font-semibold">{trackerSummary.inProduction}</p>
                    </div>
                    <div className="rounded-[22px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">Ready</p>
                      <p className="mt-2 text-3xl font-semibold">{trackerSummary.ready}</p>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h3 className="text-[24px] font-semibold">Execution Tracker</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Follow active requests across execution teams and services.
                        </p>
                      </div>
                      <div className="rounded-full border border-[#D6E3FF] bg-[#EDF4FF] px-4 py-2 text-sm font-medium text-[#2F73F0]">
                        Live request status
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[20px] border border-[#E2E8F3]">
                      <div className="grid grid-cols-[2fr_1.3fr_1fr_1fr_2fr] bg-[#F8FAFE] px-5 py-4 text-sm font-semibold text-slate-600">
                        <div>Request</div>
                        <div>Owner</div>
                        <div>Status</div>
                        <div>Due Date</div>
                        <div>Last Update</div>
                      </div>

                      {trackerItems.map((item, idx) => (
                        <div
                          key={`${item.request}-${idx}`}
                          className="grid grid-cols-[2fr_1.3fr_1fr_1fr_2fr] items-start border-t border-[#E2E8F3] bg-white px-5 py-5 text-sm"
                        >
                          <div className="pr-4 font-medium text-[#1D263B]">{item.request}</div>
                          <div className="pr-4 text-slate-600">{item.owner}</div>
                          <div className="pr-4">
                            <StatusPill status={item.status} />
                          </div>
                          <div className="pr-4 text-slate-600">{item.dueDate}</div>
                          <div className="text-slate-500">{item.lastUpdate}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "performance" && (
                <div className="mt-6 space-y-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-[22px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">Campaigns launched</p>
                      <p className="mt-2 text-3xl font-semibold">28</p>
                    </div>
                    <div className="rounded-[22px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">Total reach</p>
                      <p className="mt-2 text-3xl font-semibold">1.8M</p>
                    </div>
                    <div className="rounded-[22px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">Avg engagement</p>
                      <p className="mt-2 text-3xl font-semibold">21%</p>
                    </div>
                    <div className="rounded-[22px] border border-[#E1E7F2] bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">Active markets</p>
                      <p className="mt-2 text-3xl font-semibold">14</p>
                    </div>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <h3 className="text-[22px] font-semibold">Brand Snapshot</h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Product X performance overview across current priority markets.
                          </p>
                        </div>
                        <div className="rounded-full border border-[#D6E3FF] bg-[#EDF4FF] px-4 py-2 text-sm font-medium text-[#2F73F0]">
                          Brand performance
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-[20px] border border-[#E2E8F3] bg-[#FBFCFF] p-5">
                          <p className="text-sm text-slate-500">Top-performing campaign</p>
                          <p className="mt-2 text-[20px] font-semibold text-[#1D263B]">
                            Germany HCP Launch Sprint
                          </p>
                          <p className="mt-3 text-sm text-slate-600">
                            Reach: 240K HCPs · Engagement: 27% · ROI: 4.3x
                          </p>
                        </div>

                        <div className="rounded-[20px] border border-[#E2E8F3] bg-[#FBFCFF] p-5">
                          <p className="text-sm text-slate-500">Best-performing channel mix</p>
                          <p className="mt-2 text-[20px] font-semibold text-[#1D263B]">
                            Paid Media + EMMA + Web
                          </p>
                          <p className="mt-3 text-sm text-slate-600">
                            Consistently associated with higher reach and engagement uplift.
                          </p>
                        </div>

                        <div className="rounded-[20px] border border-[#E2E8F3] bg-[#FBFCFF] p-5">
                          <p className="text-sm text-slate-500">Recent campaign performance</p>
                          <div className="mt-4 space-y-3 text-sm text-slate-700">
                            <div className="flex items-center justify-between">
                              <span>Oncology Congress Series</span>
                              <span className="font-medium">18% engagement</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Cardiology Awareness</span>
                              <span className="font-medium">146K reach</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Germany Launch Sprint</span>
                              <span className="font-medium">4.3x ROI</span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-[20px] border border-[#E2E8F3] bg-[#FBFCFF] p-5">
                          <p className="text-sm text-slate-500">Performance signals</p>
                          <div className="mt-4 space-y-3 text-sm text-slate-700">
                            <div>• Reach trending up in DE and UK</div>
                            <div>• Strong email completion rates in launch journeys</div>
                            <div>• Search visibility improving in evidence queries</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <h3 className="text-[22px] font-semibold">CES Adoption Hub</h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Snapshot of current adoption distribution and ladder position.
                          </p>
                        </div>
                        <div className="rounded-full border border-[#D6E3FF] bg-[#EDF4FF] px-4 py-2 text-sm font-medium text-[#2F73F0]">
                          Connected to CES
                        </div>
                      </div>

                      <div className="rounded-[20px] border border-[#DCE6F7] bg-gradient-to-br from-[#F7FAFF] to-[#EEF4FF] p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm text-slate-500">Current adoption snapshot</p>
                            <p className="mt-2 text-[24px] font-semibold text-[#1D263B]">
                              Advocacy + Preference
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              28% of current HCPs are in higher-adoption segments, with
                              steady movement from Awareness to Trial.
                            </p>
                          </div>
                          <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-sm">
                            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                              Snapshot
                            </p>
                            <p className="mt-1 text-lg font-semibold text-[#2463E8]">
                              Mar 03, 2026
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                            <p className="text-sm text-slate-500">No adoption</p>
                            <p className="mt-1 text-xl font-semibold text-[#1D263B]">43%</p>
                          </div>
                          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                            <p className="text-sm text-slate-500">Awareness + Trial</p>
                            <p className="mt-1 text-xl font-semibold text-[#1D263B]">55%</p>
                          </div>
                          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                            <p className="text-sm text-slate-500">Preference + Advocacy</p>
                            <p className="mt-1 text-xl font-semibold text-[#1D263B]">28%</p>
                          </div>
                        </div>

                        <a
                          href="#"
                          className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[#2F73F0] to-[#2463E8] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(36,99,232,0.18)]"
                        >
                          Open CES Adoption Dashboard
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#E1E7F2] bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="text-[22px] font-semibold">Adoption Ladder Overview</h3>
                      <span className="text-sm text-slate-400">Connected summary</span>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-5">
                      <AdoptionLevelCard
                        level="0"
                        title="No adoption"
                        subtitle="Non-user"
                        share="43%"
                      />
                      <AdoptionLevelCard
                        level="1"
                        title="Awareness"
                        subtitle="Low adoption"
                        share="31%"
                      />
                      <AdoptionLevelCard
                        level="2"
                        title="Consideration"
                        subtitle="Medium-low adoption"
                        share="11%"
                      />
                      <AdoptionLevelCard
                        level="3"
                        title="Trial"
                        subtitle="Medium adoption"
                        share="24%"
                      />
                      <AdoptionLevelCard
                        level="4-5"
                        title="Preference / Advocacy"
                        subtitle="Higher adoption"
                        share="18%"
                      />
                    </div>
                  </div>
                </div>
              )}
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