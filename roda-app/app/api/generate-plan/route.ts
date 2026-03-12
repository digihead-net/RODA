import { NextResponse } from "next/server";

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

const fallbackPlan: Plan = {
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

function normalizePlan(data: Partial<Plan>): Plan {
  return {
    ...fallbackPlan,
    ...data,
    channelMix: Array.isArray(data.channelMix) ? data.channelMix.slice(0, 6) : fallbackPlan.channelMix,
    pre: Array.isArray(data.pre) ? data.pre.slice(0, 4) : fallbackPlan.pre,
    during: Array.isArray(data.during) ? data.during.slice(0, 4) : fallbackPlan.during,
    post: Array.isArray(data.post) ? data.post.slice(0, 4) : fallbackPlan.post,
    services: Array.isArray(data.services) && data.services.length
      ? data.services.map((service) => ({
          name: service.name || "Service",
          subtitle: service.subtitle || "",
          enabled: Boolean(service.enabled),
        }))
      : fallbackPlan.services,
  };
}

function buildMockPlan(prompt: string): Plan {
  const lower = prompt.toLowerCase();

  const launch = lower.includes("launch");
  const germany = lower.includes("germany");
  const hcp = lower.includes("hcp");
  const highBudget = lower.includes("500") || lower.includes("500k") || lower.includes("budget");

  return {
    ...fallbackPlan,
    packageName: launch ? "Full Activation Package" : "Engagement Package",
    packageDescription: germany
      ? "Recommendation tailored for a Germany-based omnichannel activation."
      : "Recommendation tailored for a market-specific omnichannel activation.",
    maturity: highBudget ? "Moderate" : "Emerging",
    confidence: hcp ? "84%" : "76%",
    projectedReach: highBudget ? "240K HCPs" : "160K HCPs",
    projectedEngagement: hcp ? "19% – 27%" : "12% – 18%",
    projectedRoi: launch ? "3.2x – 4.3x" : "2.1x – 3.2x",
    budgetAdvice: highBudget
      ? "Budget supports a multi-channel activation with web, search, paid media, and EMMA."
      : "Consider a lighter phased rollout with web, EMMA, and selected paid support.",
    channelMix: launch
      ? [
          "Launch email cadence",
          "Dedicated web experience",
          "Paid media burst",
          "Search and GEO uplift",
        ]
      : ["Email nurture stream", "Web landing page", "Search discoverability"],
    pre: ["Audience targeting", "Creative briefing", "Pre-launch teaser email"],
    during: ["Launch email", "Web hub activation", "Paid and search support"],
    post: ["Follow-up series", "Retargeting", "Optimization review"],
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
        "You are a Roche omnichannel strategist. Return only valid JSON. No markdown fences. Keep outputs concise, enterprise-ready, and realistic.",
      input: `
Create a JSON object for a Roche tool called RODA based on this campaign brief:

${prompt}

Return exactly this shape:
{
  "title": "Welcome, Caner",
  "subtitle": "What do you want to activate today?",
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

  return normalizePlan(parsed);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = String(body?.prompt || "").trim();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const plan = await callOpenAI(prompt);
    return NextResponse.json(plan);
  } catch (error) {
    console.error(error);
    return NextResponse.json(buildMockPlan("fallback"));
  }
}