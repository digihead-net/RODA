import { NextResponse } from "next/server";

type ServiceItem = {
  name: string;
  subtitle: string;
  enabled: boolean;
};

type BudgetItem = {
  channel: string;
  amount: number;
};

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
  services: ServiceItem[];
  budgetAllocation: BudgetItem[];
};

const baseServices: ServiceItem[] = [
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
];

function extractBudget(prompt: string): number {
  const lower = prompt.toLowerCase();

  const kMatch = lower.match(/(\d+)\s*k/);
  if (kMatch) return Number(kMatch[1]) * 1000;

  const fullMatch = lower.match(/(\d{3,7})/);
  if (fullMatch) return Number(fullMatch[1]);

  return 500000;
}

function buildBudgetAllocation(totalBudget: number, channels: string[]): BudgetItem[] {
  const lowerChannels = channels.map((c) => c.toLowerCase());

  const hasMedia = lowerChannels.some(
    (c) =>
      c.includes("media") ||
      c.includes("programmatic") ||
      c.includes("linkedin")
  );
  const hasWeb = lowerChannels.some((c) => c.includes("web"));
  const hasEmail = lowerChannels.some((c) => c.includes("email"));
  const hasSearch = lowerChannels.some((c) => c.includes("search") || c.includes("geo"));

  const weights = [
    { channel: "Paid Media", weight: hasMedia ? 0.38 : 0.2 },
    { channel: "Web", weight: hasWeb ? 0.24 : 0.2 },
    { channel: "Email", weight: hasEmail ? 0.2 : 0.15 },
    { channel: "Search", weight: hasSearch ? 0.1 : 0.1 },
    { channel: "Messaging", weight: 0.08 },
  ];

  const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);

  return weights.map((item) => ({
    channel: item.channel,
    amount: Math.round((totalBudget * item.weight) / totalWeight),
  }));
}

function buildMockPlan(prompt: string): Plan {
  const budget = extractBudget(prompt);
  const lower = prompt.toLowerCase();

  const isLaunch = lower.includes("launch");
  const isGermany = lower.includes("germany");
  const isHcp = lower.includes("hcp");

  const channelMix = isLaunch
    ? [
        "7-email launch cadence",
        "Dedicated campaign web hub",
        "Programmatic and LinkedIn media burst",
        "Search & GEO visibility uplift",
        "WhatsApp outbound reminders",
        "Follow-up content expansion",
      ]
    : [
        "4-email nurture stream",
        "Web landing page",
        "Search discoverability",
        "WhatsApp outbound reminder",
        "Light paid media support",
      ];

  const budgetAllocation = buildBudgetAllocation(budget, channelMix);

  return {
    title: "Welcome, Caner",
    subtitle: "What do you want to execute today?",
    packageName: isLaunch ? "Full Execution Package" : "Execution Package",
    packageDescription: isGermany
      ? "Recommendation tailored for a Germany-based omnichannel execution scenario."
      : "Recommendation tailored for a market-specific omnichannel execution scenario.",
    maturity: budget >= 500000 ? "Advanced" : "Moderate",
    confidence: isHcp ? "84%" : "76%",
    projectedReach: budget >= 500000 ? "240K HCPs" : "160K HCPs",
    projectedEngagement: isHcp ? "19% – 27%" : "12% – 18%",
    projectedRoi: isLaunch ? "3.2x – 4.3x" : "2.1x – 3.2x",
    budgetAdvice:
      "AI Advice: This execution plan is optimized for launch visibility and continuity. A heavier paid media pulse supports the launch peak, while EMMA, web, search, and WhatsApp outbound maintain engagement across the full execution window.",
    channelMix,
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
    services: baseServices,
    budgetAllocation,
  };
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function extractJson(text: string) {
  const direct = safeJsonParse(text);
  if (direct) return direct;

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;

  return safeJsonParse(match[0]);
}

function normalizePlan(data: any, prompt: string): Plan {
  const budget = extractBudget(prompt);
  const channelMix = Array.isArray(data?.channelMix)
    ? data.channelMix.slice(0, 8)
    : buildMockPlan(prompt).channelMix;

  return {
    title: "Welcome, Caner",
    subtitle: "What do you want to execute today?",
    packageName: data?.packageName || "AI Generated Execution Package",
    packageDescription:
      data?.packageDescription || "Generated from your campaign brief.",
    maturity: data?.maturity || "Advanced",
    confidence: data?.confidence || "82%",
    projectedReach: data?.projectedReach || "220K HCPs",
    projectedEngagement: data?.projectedEngagement || "18% – 25%",
    projectedRoi: data?.projectedRoi || "3.0x – 4.0x",
    budgetAdvice:
      data?.budgetAdvice ||
      "AI Advice: This execution plan balances launch impact with sustained follow-through across the priority channels.",
    channelMix,
    pre: Array.isArray(data?.pre)
      ? data.pre.slice(0, 5)
      : [
          "2 teaser emails to priority HCP audiences",
          "WhatsApp outbound save-the-date message",
          "Disease awareness web landing page",
        ],
    during: Array.isArray(data?.during)
      ? data.during.slice(0, 5)
      : [
          "3 launch emails across priority segments",
          "Campaign hub go-live with modular content",
          "Programmatic + LinkedIn amplification",
        ],
    post: Array.isArray(data?.post)
      ? data.post.slice(0, 5)
      : [
          "2 follow-up emails with next-best-content",
          "WhatsApp outbound reminder and re-entry touchpoint",
          "Retargeting burst for engaged audiences",
        ],
    services:
      Array.isArray(data?.services) && data.services.length
        ? data.services
        : baseServices,
    budgetAllocation: buildBudgetAllocation(budget, channelMix),
  };
}

async function callOpenAI(prompt: string): Promise<Plan> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    return buildMockPlan(prompt);
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      instructions:
        "You are a Roche omnichannel strategist. Return only valid JSON. No markdown. Be concise, realistic, and enterprise-ready.",
      input: `
Generate an omnichannel execution recommendation for this campaign brief:

${prompt}

Return JSON in this shape:
{
  "packageName": "string",
  "packageDescription": "string",
  "maturity": "string",
  "confidence": "string",
  "projectedReach": "string",
  "projectedEngagement": "string",
  "projectedRoi": "string",
  "budgetAdvice": "string",
  "channelMix": ["string", "string", "string", "string", "string"],
  "pre": ["string", "string", "string"],
  "during": ["string", "string", "string"],
  "post": ["string", "string", "string"],
  "services": [
    { "name": "Marketing Automation", "subtitle": "EMMA", "enabled": true },
    { "name": "Paid Media", "subtitle": "Media, Programmatic, LinkedIn, Advanced TV", "enabled": true },
    { "name": "Search & GEO", "subtitle": "Discoverability, evidence visibility, search optimization", "enabled": true },
    { "name": "Web Experiences", "subtitle": "Roche.com, local web, campaign hubs", "enabled": true },
    { "name": "Content Production", "subtitle": "The Lab", "enabled": true },
    { "name": "Messaging", "subtitle": "WhatsApp outbound / mobile messaging", "enabled": true }
  ]
}
      `,
      max_output_tokens: 900,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI error: ${errorText}`);
  }

  const data = await response.json();
  const outputText =
    data.output_text ||
    data.output?.flatMap((item: any) => item.content || []).map((c: any) => c.text).join("") ||
    "";

  const parsed = extractJson(outputText);

  if (!parsed) {
    return buildMockPlan(prompt);
  }

  return normalizePlan(parsed, prompt);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = String(body?.prompt || "").trim();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const plan = await callOpenAI(prompt);
    return NextResponse.json(plan);
  } catch (error) {
    console.error(error);
    return NextResponse.json(buildMockPlan("fallback"));
  }
}