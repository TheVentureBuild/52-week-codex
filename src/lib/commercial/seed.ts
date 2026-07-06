import { getKnowledgeBase } from "@/lib/knowledge/seed";
import { getRankedPartnerRows } from "@/lib/partners/seed";
import type { CommercialActivity, CommercialForecast, CommercialPlan, CommercialTemplate, RelationshipPath, WeeklyReview } from "@/types/domain";
import type { CommercialOperatingPlan } from "./types";

const now = new Date().toISOString();
const addDays = (days: number) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

export const commercialTemplates: CommercialTemplate[] = [
  { id: "template-healthcare", key: "healthcare_channel_first", name: "Healthcare Channel First", description: "Prioritize healthcare SIs, HIEs, and referenceable proof.", horizonWeeks: 52, motions: ["SI co-sell", "HIE referrals", "enterprise pilots"], active: true },
  { id: "template-hyperscaler", key: "hyperscaler_first", name: "Hyperscaler First", description: "Marketplace readiness, cloud co-sell, and partner packaged offers.", horizonWeeks: 52, motions: ["marketplace", "co-sell", "solution listing"], active: true },
  { id: "template-founder-led", key: "founder_led_enterprise", name: "Founder Led Enterprise", description: "Turn founder access into repeatable enterprise motion.", horizonWeeks: 26, motions: ["ABM", "warm intros", "pilots"], active: true }
];

export function generateCommercialPlan(companyId: string): CommercialOperatingPlan | undefined {
  const knowledge = getKnowledgeBase(companyId);
  if (!knowledge) return undefined;
  const partnerRows = getRankedPartnerRows(companyId);
  const planId = `${companyId}-commercial-plan`;
  const selected = partnerRows.slice(0, 4);

  const relationshipPaths: RelationshipPath[] = selected.map((row, index) => ({
    id: `${companyId}-${row.partner.id}-relationship-path`,
    companyId,
    targetPartnerId: row.partner.id,
    targetContact: row.partner.partnerType === "hyperscaler" ? "Partner Development Manager" : "Alliance Lead",
    recommendedIntroduction: row.companyPartner.relationshipOwner || "TVB ecosystem intro",
    relationshipStrength: row.companyPartner.relationshipStrength,
    tvbOwner: row.companyPartner.relationshipOwner || "Harshal Shah",
    suggestedIntroductionPath: row.companyPartner.relationshipStrength > 70 ? "Direct warm intro from TVB owner" : "Advisor-led intro with founder proof point",
    expectedOutcome: row.recommendation.recommendedNextAction,
    pathLength: index + 1,
    warmth: row.companyPartner.relationshipStrength > 75 ? "hot" : row.companyPartner.relationshipStrength > 50 ? "warm" : "cold",
    confidenceScore: row.score.confidenceScore
  }));

  const activities: CommercialActivity[] = selected.flatMap((row, index) => {
    const baseWeek = index * 4;
    const discoveryId = `${companyId}-${row.partner.id}-discovery`;
    const packageId = `${companyId}-${row.partner.id}-package`;
    const introId = `${companyId}-${row.partner.id}-intro`;
    return [
      {
        id: discoveryId,
        planId,
        companyId,
        title: `Qualify ${row.partner.name} partner motion`,
        description: `Validate economics, buyer overlap, services attach, and path to first revenue with ${row.partner.name}.`,
        category: row.partner.partnerType === "marketplace_partner" ? "marketplace" : "system_integrator",
        priority: row.recommendation.priority === "high" ? "high" : "medium",
        owner: row.companyPartner.relationshipOwner || "TVB Operator",
        dueDate: addDays(7 + baseWeek * 7),
        dependencyIds: [],
        status: index === 0 ? "approved" : "pending_approval",
        expectedRevenue: row.recommendation.estimatedProductRevenue,
        probability: row.score.confidenceScore,
        confidenceScore: row.score.confidenceScore,
        evidence: row.recommendation.evidence,
        sourceRecommendationId: row.recommendation.id,
        targetCompany: knowledge.intake.company.name,
        targetPartnerId: row.partner.id,
        targetPartnerName: row.partner.name,
        targetContact: "Alliance Lead",
        relationshipNeeded: relationshipPaths[index].suggestedIntroductionPath,
        commercialMotion: row.partner.partnerType.replaceAll("_", " "),
        estimatedEffort: "medium",
        whyNow: `This is a shortest-path-to-revenue partner because score is ${row.score.totalScore} and expected TVB revenue is $${row.recommendation.estimatedTvbRevenue.toLocaleString()}.`,
        sequencingRationale: "Qualify commercial fit before investing in enablement or marketplace packaging.",
        suggestedEmail: `Subject: Exploring a ${knowledge.intake.company.name} x ${row.partner.name} co-sell path`,
        suggestedMeetingAgenda: ["Validate ICP overlap", "Confirm services economics", "Identify first 3 target accounts"],
        successCriteria: ["Partner confirms ICP fit", "Named relationship owner", "First target account list created"],
        kpis: ["Intro completed", "Partner qualified", "Pipeline hypothesis validated"],
        revenueImpact: Math.min(100, Math.round(row.recommendation.estimatedProductRevenue / 5000)),
        executionDifficulty: row.companyPartner.relationshipStrength > 70 ? 35 : 60
      },
      {
        id: packageId,
        planId,
        companyId,
        title: `Build ${row.partner.name} co-sell package`,
        description: "Create pitch, services attach, proof points, implementation outline, and win-win economics.",
        category: "enablement",
        priority: row.recommendation.priority === "high" ? "high" : "medium",
        owner: "Founder + TVB",
        dueDate: addDays(21 + baseWeek * 7),
        dependencyIds: [discoveryId],
        status: "draft",
        expectedRevenue: row.recommendation.estimatedServicesRevenue,
        probability: Math.max(45, row.score.confidenceScore - 10),
        confidenceScore: row.score.confidenceScore,
        evidence: row.recommendation.evidence,
        sourceRecommendationId: row.recommendation.id,
        targetCompany: knowledge.intake.company.name,
        targetPartnerId: row.partner.id,
        targetPartnerName: row.partner.name,
        targetContact: "Solution Lead",
        relationshipNeeded: "Internal alignment plus partner validation",
        commercialMotion: "partner enablement",
        estimatedEffort: "high",
        whyNow: "Partner outreach needs a concrete commercial package to convert interest into pipeline.",
        sequencingRationale: "Enablement follows qualification and precedes warm introduction to accounts.",
        suggestedEmail: "Subject: Draft co-sell package for review",
        suggestedMeetingAgenda: ["Review offer", "Confirm target accounts", "Agree next intro"],
        successCriteria: ["Partner pitch approved", "Services scope defined", "Target account list accepted"],
        kpis: ["Package approved", "Enablement assets completed"],
        revenueImpact: Math.min(100, Math.round(row.recommendation.estimatedServicesRevenue / 7500)),
        executionDifficulty: 68
      },
      {
        id: introId,
        planId,
        companyId,
        title: `Run warm introduction path through ${row.partner.name}`,
        description: `Use the recommended introduction path to open commercial conversations with first target accounts.`,
        category: "enterprise_sales",
        priority: "critical",
        owner: relationshipPaths[index].tvbOwner,
        dueDate: addDays(35 + baseWeek * 7),
        dependencyIds: [packageId],
        status: "draft",
        expectedRevenue: row.recommendation.estimatedProductRevenue + row.recommendation.estimatedServicesRevenue,
        probability: Math.max(35, row.score.confidenceScore - 15),
        confidenceScore: row.score.confidenceScore,
        evidence: row.recommendation.evidence,
        sourceRecommendationId: row.recommendation.id,
        targetCompany: knowledge.intake.company.name,
        targetPartnerId: row.partner.id,
        targetPartnerName: row.partner.name,
        targetContact: relationshipPaths[index].targetContact,
        relationshipNeeded: relationshipPaths[index].suggestedIntroductionPath,
        commercialMotion: "warm introduction",
        estimatedEffort: "medium",
        whyNow: "Intro should happen after partner package is clear enough to make the ask specific.",
        sequencingRationale: "Warm intros convert best after qualification and enablement assets are ready.",
        suggestedEmail: `Subject: Intro: ${knowledge.intake.company.name} and ${row.partner.name} around ${knowledge.intake.profile.primaryUseCase}`,
        suggestedMeetingAgenda: ["Introduce opportunity", "Map target account", "Agree next meeting"],
        successCriteria: ["Intro accepted", "Meeting scheduled", "Target account identified"],
        kpis: ["Warm intro sent", "Meeting booked", "Pipeline created"],
        revenueImpact: Math.min(100, Math.round((row.recommendation.estimatedProductRevenue + row.recommendation.estimatedServicesRevenue) / 10000)),
        executionDifficulty: relationshipPaths[index].warmth === "hot" ? 30 : 55
      }
    ];
  });

  const completedActivities = activities.filter((activity) => activity.status === "completed").length;
  const blockedActivities = activities.filter((activity) => activity.status === "blocked").length;
  const atRiskActivities = activities.filter((activity) => activity.status === "delayed" || activity.status === "blocked").length;
  const expectedPipeline = activities.reduce((sum, activity) => sum + activity.expectedRevenue, 0);
  const revenueForecast = Math.round(activities.reduce((sum, activity) => sum + activity.expectedRevenue * (activity.probability / 100), 0));
  const plan: CommercialPlan = {
    id: planId,
    companyId,
    name: `${knowledge.intake.company.name} Commercial Execution Plan`,
    templateKey: "healthcare_channel_first",
    horizonWeeks: 52,
    status: "active",
    commercialHealthScore: Math.round((knowledge.health.score + (partnerRows[0]?.score.totalScore || 60)) / 2),
    currentWeek: 1,
    expectedPipeline,
    revenueForecast,
    completedActivities,
    blockedActivities,
    atRiskActivities,
    version: 1,
    createdAt: now,
    updatedAt: now
  };
  const forecast: CommercialForecast = {
    companyId,
    pipelineCreated: expectedPipeline,
    revenueProbability: Math.round((revenueForecast / Math.max(1, expectedPipeline)) * 100),
    expectedClose: addDays(120),
    tvbRevenue: partnerRows.reduce((sum, row) => sum + row.recommendation.estimatedTvbRevenue, 0),
    partnerRevenue: partnerRows.reduce((sum, row) => sum + row.recommendation.estimatedProductRevenue, 0),
    servicesRevenue: partnerRows.reduce((sum, row) => sum + row.recommendation.estimatedServicesRevenue, 0),
    learningValue: 82
  };
  const weeklyReviews: WeeklyReview[] = [{
    id: `${companyId}-week-1-review`,
    companyId,
    planId,
    weekNumber: 1,
    completed: [],
    inProgress: activities.filter((activity) => activity.status === "approved").map((activity) => activity.title),
    delayed: [],
    blocked: [],
    recommendations: ["Approve top 3 partner qualification activities", "Prepare co-sell package template", "Confirm TVB relationship owners"],
    createdAt: now
  }];

  return { plan, activities, relationshipPaths, forecast, weeklyReviews, templates: commercialTemplates };
}
