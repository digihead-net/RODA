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
  { name: "Paid Media", subtitle: "Media, Programmatic, Advanced TV", enabled: true },
  { name: "Search & GEO", subtitle: "Discoverability and evidence visibility", enabled: true },
  { name: "Web Experiences", subtitle: "Roche.com, local web, campaign hubs", enabled: true },
  { name: "Content Production", subtitle: "The Lab", enabled: true },
  { name: "Messaging", subtitle: "WhatsApp / mobile messaging", enabled: false },
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

  const hasMedia = lowerChannels.some((c) => c.includes("media") || c.includes("programmatic"));
  const hasWeb = lowerChannels.some((c) => c.includes("web"));
  const hasEmail = lowerChannels.some((c) => c.includes("email"));
  const hasSearch = lowerChannels.some((c) => c.includes("search") || c.includes("geo"));

  const weights = [
    { channel: "Paid Media", weight: hasMedia ? 0.4 : 0.2 },
    { channel: "Web", weight: hasWeb ? 0.25 : 0.2 },
    { channel: "Email", weight: hasEmail ? 0.2 : 0.15 },
    { channel: "Search", weight: hasSearch ? 0.15 : 0.1 },
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
        "Launch email cadence",
        "Dedicated web experience",
        "Programmatic media burst",
        "Search and GEO visibility",
      ]
    : [
        "Email nurture stream",
        "Web landing page",
        "Search discoverability",
        "Light paid media support",
      ];

  const budgetAllocation = buildBudgetAllocation(budget, channelMix);

  return {
    title: "Welcome, Caner",
    subtitle: "What do you want to activate today?",
    packageName: isLaunch ? "Full Activation Package" : "Engagement Package",
    packageDescription: isGermany
      ? "Recommendation tailored for a Germany-based omnichannel activation."
      : "Recommendation tailored for a market-specific omnichannel activation.",
    maturity: budget >= 500000 ? "Advanced" : "Moderate",
    confidence: isHcp ? "84%" : "76%",
    projectedReach: budget >= 500000 ? "240K HCPs" : "160K HCPs",
    projectedEngagement: isHcp ? "19% – 27%" : "12% – 18%",
    projectedRoi: isLaunch ? "3.2x – 4.3x" : "2.1x – 3.2x",
    budgetAdvice:
      "Budget supports a balanced omnichannel activation across email, web, media, and search.",
    channelMix,
    pre: ["Audience targeting", "Creative briefing", "Pre-launch teaser email"],
    during: ["Launch email", "Campaign hub activation", "Paid and search support"],
    post: ["Follow-up sequence", "Retargeting", "Performance optimization"],
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
    ? data.channelMix.slice(0, 6)
    : buildMockPlan(prompt).channelMix;

  return {
    title: "Welcome, Caner",
    subtitle: "What do you want to activate today?",
    packageName: data?.packageName || "AI Generated Activation Plan",
    packageDescription: data?.packageDescription || "Generated from your campaign brief.",
    maturity: data?.maturity || "Advanced",
    confidence: data?.confidence || "82%",
    projectedReach: data?.projectedReach || "220K HCPs",
    projectedEngagement: data?.projectedEngagement || "18% – 25%",
    projectedRoi: data?.projectedRoi || "3.0x – 4.0x",
    budgetAdvice:
      data?.budgetAdvice ||
      "Budget supports a balanced omnichannel activation across core channels.",
    channelMix,
    pre: Array.isArray(data?.pre)
      ? data.pre.slice(0, 4)
      : ["Audience targeting", "Creative briefing", "Teaser email"],
    during: Array.isArray(data?.during)
      ? data.during.slice(0, 4)
      : ["Launch email", "Web hub", "Paid support"],
    post: Array.isArray(data?.post)
      ? data.post.slice(0, 4)
      : ["Follow-up sequence", "Retargeting", "Optimization"],
    services:
      Array.isArray(data?.services) && data.services.length ? data.services : baseServices,
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
Generate an omnichannel activation recommendation for this campaign brief:

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
  "channelMix": ["string", "string", "string", "string"],
  "pre": ["string", "string", "string"],
  "during": ["string", "string", "string"],
  "post": ["string", "string", "string"],
  "services": [
    { "name": "Marketing Automation", "subtitle": "EMMA", "enabled": true },
    { "name": "Paid Media", "subtitle": "Media, Programmatic, Advanced TV", "enabled": true },
    { "name": "Search & GEO", "subtitle": "Discoverability and evidence visibility", "enabled": true },
    { "name": "Web Experiences", "subtitle": "Roche.com, local web, campaign hubs", "enabled": true },
    { "name": "Content Production", "subtitle": "The Lab", "enabled": true },
    { "name": "Messaging", "subtitle": "WhatsApp / mobile messaging", "enabled": false }
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