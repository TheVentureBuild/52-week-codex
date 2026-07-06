import type { AuditEvent, LearningEvent, OrganizationRecord, PlatformMetric, PlatformModelRoute, PlatformPrompt, PluginConfig } from "@/types/domain";

export const platformMetrics: PlatformMetric[] = [
  { label: "Organizations", value: 3, trend: "+1 planned" },
  { label: "Portfolio Companies", value: 12, trend: "+4 this quarter" },
  { label: "Documents", value: 148, trend: "82% processed" },
  { label: "Knowledge Chunks", value: "2.8k", trend: "+410 this week" },
  { label: "Partners", value: 64, trend: "18 high priority" },
  { label: "Commercial Activities", value: 192, trend: "31 active" },
  { label: "AI Calls", value: "7.4k", trend: "$412 cost" },
  { label: "Portfolio Health", value: 82, trend: "+6 pts" }
];

export const organizations: OrganizationRecord[] = [
  { id: "tvb", name: "The Venture Build", workspaces: 4, companies: 12, users: 28, healthScore: 86 },
  { id: "healthcare-orbit", name: "TVB Healthcare Orbit", workspaces: 2, companies: 5, users: 11, healthScore: 81 },
  { id: "ai-orbit", name: "TVB AI Orbit", workspaces: 1, companies: 4, users: 9, healthScore: 78 }
];

export const modelRoutes: PlatformModelRoute[] = [
  { useCase: "reasoning", provider: "mock", model: "mock-reasoning-v1", priority: 1, enabled: true, health: "healthy" },
  { useCase: "writing", provider: "mock", model: "mock-writing-v1", priority: 1, enabled: true, health: "healthy" },
  { useCase: "extraction", provider: "mock", model: "mock-extraction-v1", priority: 1, enabled: true, health: "healthy" },
  { useCase: "embedding", provider: "mock", model: "mock-embedding-v1", priority: 1, enabled: true, health: "healthy" },
  { useCase: "planner", provider: "mock", model: "mock-planner-v1", priority: 1, enabled: true, health: "healthy" }
];

export const prompts: PlatformPrompt[] = [
  { promptKey: "company_intelligence_profile_v1", purpose: "Generate company profile", version: "1.0", status: "active", targetModel: "mock-company-profile-v1", temperature: 0.2, owner: "TVB Admin", approvalStatus: "approved" },
  { promptKey: "icp_discovery_v1", purpose: "Recommend ICP", version: "1.0", status: "active", targetModel: "mock-extraction-v1", temperature: 0.1, owner: "TVB Admin", approvalStatus: "approved" },
  { promptKey: "partner_score_generator_v1", purpose: "Score partners", version: "1.0", status: "active", targetModel: "mock-reasoning-v1", temperature: 0.1, owner: "TVB Operator", approvalStatus: "approved" },
  { promptKey: "commercial_planner_v1", purpose: "Generate activities", version: "1.0", status: "active", targetModel: "mock-planner-v1", temperature: 0.2, owner: "TVB Operator", approvalStatus: "pending" }
];

export const plugins: PluginConfig[] = [
  { id: "google-drive", name: "Google Drive", category: "Storage", version: "0.1.7", enabled: true, health: "healthy" },
  { id: "hubspot", name: "HubSpot", category: "CRM", version: "planned", enabled: false, health: "offline" },
  { id: "salesforce", name: "Salesforce", category: "CRM", version: "planned", enabled: false, health: "offline" },
  { id: "slack", name: "Slack", category: "Messaging", version: "planned", enabled: false, health: "offline" },
  { id: "obsidian", name: "Obsidian", category: "Knowledge", version: "planned", enabled: true, health: "degraded" }
];

export const auditEvents: AuditEvent[] = [
  { id: "audit-1", actor: "Harshal Shah", eventType: "recommendation_approved", target: "Accenture Health Cloud", summary: "Partner recommendation approved for planning queue.", createdAt: new Date().toISOString() },
  { id: "audit-2", actor: "TVB Admin", eventType: "model_route_changed", target: "planner", summary: "Planner route set to mock-planner-v1.", createdAt: new Date().toISOString() },
  { id: "audit-3", actor: "TVB Operator", eventType: "workflow_changed", target: "Healthcare Channel First", summary: "Commercial template activated.", createdAt: new Date().toISOString() }
];

export const learningEvents: LearningEvent[] = [
  { id: "learn-1", signal: "accepted_recommendation", source: "partner_recommendation", outcome: "approved", recommendation: "Increase relationship strength weight for healthcare SIs.", confidence: 82 },
  { id: "learn-2", signal: "activity_completed", source: "commercial_activity", outcome: "meeting_booked", recommendation: "Move warm-intro activities earlier after package approval.", confidence: 76 },
  { id: "learn-3", signal: "rejected_recommendation", source: "partner_review", outcome: "low appetite", recommendation: "Lower reseller score when services attach is weak.", confidence: 68 }
];

export const platformAnalytics = {
  revenueForecast: 2450000,
  recommendationAcceptance: 74,
  averageGtmScore: 81,
  knowledgeHealth: 79,
  relationshipStrength: 67,
  commercialHealth: 82,
  latencyMs: 820,
  errorRate: 1.8,
  evidenceCoverage: 88,
  hallucinationRate: 2.1
};
