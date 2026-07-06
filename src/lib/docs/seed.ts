import type { DocumentationArticle, DocumentationTour, ReleaseNote } from "@/types/domain";

const now = new Date().toISOString();

export const docArticles: DocumentationArticle[] = [
  {
    id: "doc-getting-started",
    title: "Getting Started with TVB Intelligence Engine",
    slug: "getting-started",
    category: "Getting Started",
    tags: ["onboarding", "founder", "overview"],
    audience: ["Founder", "TVB Operator", "Administrator"],
    version: "1.0",
    status: "published",
    owner: "TVB Success",
    relatedModules: ["Module 01", "Module 04"],
    relatedScreens: ["Dashboard", "Commercial Plan"],
    relatedApis: ["/api/companies", "/api/commercial-plan"],
    content: "# Getting Started\n\nThe TVB Intelligence Engine turns founder intake, knowledge, partner intelligence, and execution planning into one operating system.\n\n## First steps\n\n1. Create or review a company profile.\n2. Complete founder intake.\n3. Review the generated Company Intelligence Profile.\n4. Inspect knowledge and partner recommendations.\n5. Generate the commercial execution plan.\n\n```mermaid\ngraph LR\nA[Intake] --> B[Knowledge]\nB --> C[Partners]\nC --> D[Commercial Plan]\nD --> E[Learning]\n```\n",
    createdAt: now,
    updatedAt: now,
    approvalStatus: "approved"
  },
  {
    id: "doc-partner-score",
    title: "How Partner Score Works",
    slug: "partner-score",
    category: "AI Recommendations Explained",
    tags: ["partner", "score", "evidence"],
    audience: ["TVB Operator", "Administrator", "Founder"],
    version: "1.0",
    status: "published",
    owner: "TVB Platform",
    relatedModules: ["Module 03"],
    relatedScreens: ["Partner Universe", "Scoring Matrix", "Partner Detail"],
    relatedApis: ["/api/companies/:id/partners/score"],
    content: "# Partner Score\n\nPartner score ranks the shortest path to revenue. It combines ICP fit, industry fit, technology fit, cloud fit, customer overlap, services opportunity, resale opportunity, relationship strength, speed to revenue, and TVB revenue potential.\n\n## Evidence\n\nEvery score should cite founder intake, knowledge documents, ICP analysis, customer patterns, technology profile, or manual notes.\n\n## Why a partner ranks first\n\nA partner ranks first when it has strong commercial fit, a clear services or resale path, and a relationship path TVB can activate quickly.\n",
    createdAt: now,
    updatedAt: now,
    approvalStatus: "approved"
  },
  {
    id: "doc-google-drive",
    title: "Connecting Google Drive",
    slug: "connect-google-drive",
    category: "How-To Guides",
    tags: ["google drive", "documents", "knowledge"],
    audience: ["TVB Operator", "Administrator"],
    version: "1.0",
    status: "published",
    owner: "TVB Success",
    relatedModules: ["Module 02"],
    relatedScreens: ["Document Intelligence"],
    relatedApis: ["/api/knowledge/google-drive/connect"],
    content: "# Connect Google Drive\n\nUse the Google Drive connector to register a folder source for company knowledge. Configure folder URL, sync frequency, subfolder inclusion, supported file types, and maximum file size.\n\n> Documents remain private by default and are processed through restartable jobs.\n",
    createdAt: now,
    updatedAt: now,
    approvalStatus: "approved"
  },
  {
    id: "doc-api-reference",
    title: "API Reference",
    slug: "api-reference",
    category: "API",
    tags: ["api", "developer", "reference"],
    audience: ["Developer", "Administrator"],
    version: "1.0",
    status: "published",
    owner: "TVB Engineering",
    relatedModules: ["Module 01", "Module 02", "Module 03", "Module 04", "Module 05"],
    relatedScreens: ["Developer Portal"],
    relatedApis: ["/api/companies", "/api/knowledge/search", "/api/commercial-plan", "/api/platform/config"],
    content: "# API Reference\n\n## Companies\n\n`GET /api/companies`\n\n## Knowledge\n\n`GET /api/knowledge/search?companyId=healthcare-saas&q=Epic`\n\n## Partners\n\n`GET /api/companies/:id/partners`\n\n## Commercial Plan\n\n`GET /api/commercial-plan?companyId=healthcare-saas`\n\n## Platform\n\n`GET /api/platform/config`\n",
    createdAt: now,
    updatedAt: now,
    approvalStatus: "approved"
  }
];

export const docTours: DocumentationTour[] = [
  { id: "tour-founder", title: "Founder Onboarding Tour", module: "Module 01", audience: ["Founder"], enabled: true, steps: [{ title: "Create company", body: "Start with company basics and product overview.", target: "/intake/healthcare-saas" }, { title: "Submit intake", body: "Submit when required fields are complete.", target: "/profile/healthcare-saas" }] },
  { id: "tour-operator", title: "TVB Operator Review Tour", module: "Module 03", audience: ["TVB Operator"], enabled: true, steps: [{ title: "Score partners", body: "Review the ranked partner universe.", target: "/partners/healthcare-saas" }, { title: "Approve recommendations", body: "Send high-priority recommendations to planning.", target: "/partners/healthcare-saas/review" }] }
];

export const releaseNotes: ReleaseNote[] = [
  { id: "release-0-6", version: "0.6.0", date: now, newFeatures: ["Knowledge & Success Center", "AI documentation assistant", "Context help"], improvements: ["Platform navigation", "API reference"], bugFixes: ["Schema rerun safety"], migrationNotes: ["Run updated schema.sql"], breakingChanges: [] },
  { id: "release-0-5", version: "0.5.0", date: now, newFeatures: ["Platform governance"], improvements: ["Audit and analytics"], bugFixes: [], migrationNotes: ["Added platform tables"], breakingChanges: [] }
];

export function searchDocs(query: string) {
  const q = query.toLowerCase();
  return docArticles.filter((article) => [article.title, article.category, article.tags.join(" "), article.content].join(" ").toLowerCase().includes(q));
}

export function getContextHelp(screenKey: string) {
  const mapping: Record<string, string> = {
    partner_dashboard: "partner-score",
    document_intelligence: "connect-google-drive",
    commercial_plan: "getting-started",
    api_reference: "api-reference"
  };
  return docArticles.find((article) => article.slug === (mapping[screenKey] ?? "getting-started"));
}

export function answerDocsQuestion(question: string) {
  const matches = searchDocs(question);
  const article = matches[0] ?? docArticles[0];
  return {
    answer: `Based on approved documentation: ${article.title}. ${article.content.replace(/[#>`]/g, "").split("\n").filter(Boolean).slice(0, 3).join(" ")}`,
    sources: [article.slug],
    confidence: matches.length ? 86 : 62
  };
}
