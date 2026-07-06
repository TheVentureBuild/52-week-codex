import { defaultPartnerScoringWeights } from "@/lib/config/defaults";
import type { CompanyKnowledgeBase } from "@/lib/knowledge/types";
import type { CompanyPartner, Partner, PartnerEvidence, PartnerRecommendation, PartnerScore, PartnerType } from "@/types/domain";

const now = () => new Date().toISOString();

function overlapScore(left: string[], right: string[], fallback = 35) {
  if (!left.length || !right.length) return fallback;
  const leftSet = new Set(left.map((item) => item.toLowerCase()));
  const matches = right.filter((item) => leftSet.has(item.toLowerCase())).length;
  return Math.min(100, Math.round((matches / Math.max(1, right.length)) * 100));
}

export function classifyPartner(partner: Partner): PartnerType {
  const text = [partner.name, partner.description, partner.servicesOffered.join(" "), partner.technologyFocus.join(" ")].join(" ").toLowerCase();
  if (text.includes("aws") || text.includes("azure") || text.includes("gcp") || partner.partnerType === "hyperscaler") return partner.partnerType === "other" ? "marketplace_partner" : partner.partnerType;
  if (text.includes("managed security")) return "mssp";
  if (text.includes("managed services")) return "msp";
  if (text.includes("implementation") || text.includes("integration")) return "system_integrator";
  if (text.includes("resell") || text.includes("channel")) return "reseller";
  if (text.includes("consulting")) return "consulting_partner";
  return partner.partnerType;
}

export function buildPartnerEvidence(knowledge: CompanyKnowledgeBase, partner: Partner, companyPartner: CompanyPartner): PartnerEvidence[] {
  return [
    {
      sourceType: "intake",
      sourceId: knowledge.intake.company.id,
      sourceLabel: "Founder intake - ICP and GTM",
      excerpt: `${knowledge.intake.company.name} targets ${knowledge.intake.icp.targetIndustries.join(", ")} with ${knowledge.intake.gtm.currentSalesMotion}.`,
      confidence: 0.86
    },
    {
      sourceType: "icp_analysis",
      sourceId: knowledge.intake.company.id,
      sourceLabel: "Module 2 ICP analysis",
      excerpt: knowledge.icpAnalysis.suggestedIcp,
      confidence: knowledge.icpAnalysis.confidenceScore / 100
    },
    {
      sourceType: "customer_pattern",
      sourceId: knowledge.intake.company.id,
      sourceLabel: "Customer pattern analysis",
      excerpt: `Common integrations include ${knowledge.customerPattern.commonIntegrations.join(", ") || "not enough data"}.`,
      confidence: 0.78
    },
    {
      sourceType: "manual_note",
      sourceId: companyPartner.id,
      sourceLabel: `${partner.name} partner note`,
      excerpt: companyPartner.notes || "Imported partner note pending enrichment.",
      confidence: Math.max(0.55, companyPartner.relationshipStrength / 100)
    }
  ];
}

export function scorePartner(knowledge: CompanyKnowledgeBase, partner: Partner, companyPartner: CompanyPartner): PartnerScore {
  const weights = defaultPartnerScoringWeights;
  const icpFit = overlapScore(knowledge.icpAnalysis.priorityIndustries, partner.industries, 55);
  const industryFit = overlapScore(knowledge.intake.icp.targetIndustries, partner.industries, 45);
  const technologyFit = overlapScore([...knowledge.intake.technology.integrations, knowledge.intake.technology.backendLanguage, knowledge.intake.technology.databaseSystem], partner.technologyFocus, 45);
  const cloudFit = overlapScore([knowledge.intake.technology.cloudProvider], partner.cloudFocus, 40);
  const customerOverlap = overlapScore(knowledge.documents.flatMap((doc) => doc.extractedCustomers), partner.industries, 35);
  const servicesOpportunity = knowledge.intake.partnerReadiness.requiresImplementationServices || knowledge.intake.partnerReadiness.requiresIntegrationServices ? overlapScore(["implementation", "integration", "managed services"], partner.servicesOffered, 55) : 35;
  const resaleOpportunity = partner.partnerType === "reseller" || partner.partnerType === "var" || partner.partnerType === "marketplace_partner" ? 80 : 45;
  const relationship = companyPartner.relationshipStrength;
  const speed = Math.round((relationship + servicesOpportunity + cloudFit) / 3);
  const tvb = Math.round((servicesOpportunity + resaleOpportunity + relationship) / 3);
  const total =
    (icpFit * weights.icpFit +
      industryFit * weights.industryFit +
      technologyFit * weights.technologyFit +
      cloudFit * weights.cloudFit +
      customerOverlap * weights.customerOverlap +
      servicesOpportunity * weights.servicesOpportunity +
      resaleOpportunity * weights.resaleOpportunity +
      relationship * weights.relationshipStrength +
      speed * weights.speedToRevenue +
      tvb * weights.tvbRevenuePotential) / 100;

  return {
    id: `${knowledge.intake.company.id}-${partner.id}-score`,
    companyId: knowledge.intake.company.id,
    partnerId: partner.id,
    icpFitScore: icpFit,
    industryFitScore: industryFit,
    technologyFitScore: technologyFit,
    cloudFitScore: cloudFit,
    customerOverlapScore: customerOverlap,
    servicesOpportunityScore: servicesOpportunity,
    resaleOpportunityScore: resaleOpportunity,
    relationshipScore: relationship,
    speedToRevenueScore: speed,
    tvbRevenuePotentialScore: tvb,
    competitiveRiskScore: partner.industries.includes("Competitive SaaS") ? 45 : 12,
    totalScore: Math.round(total),
    confidenceScore: Math.round((knowledge.health.score + icpFit + servicesOpportunity) / 3),
    scoreVersion: "partner_score_v1",
    evidence: buildPartnerEvidence(knowledge, partner, companyPartner),
    createdAt: now()
  };
}

export function modelRevenue(knowledge: CompanyKnowledgeBase, partner: Partner, score: PartnerScore) {
  const acv = knowledge.intake.profile.averageContractValue || 75000;
  const expectedDeals = score.totalScore >= 80 ? 3 : score.totalScore >= 65 ? 2 : 1;
  const servicesMultiple = partner.servicesOffered.some((service) => service.toLowerCase().includes("implementation") || service.toLowerCase().includes("integration")) ? 2 : 0.75;
  const productRevenue = acv * expectedDeals;
  const servicesRevenue = Math.round(productRevenue * servicesMultiple);
  const probability = Math.max(0.25, score.confidenceScore / 100);
  const tvbRevenue = Math.round((productRevenue * 0.2 + servicesRevenue * 0.05) * probability);
  return {
    productRevenue,
    servicesRevenue,
    tvbRevenue,
    assumptions: [
      `Assumes ${expectedDeals} partner-influenced deals in first 12 months`,
      `Assumes average product ACV of $${acv.toLocaleString()}`,
      `Assumes services multiple of ${servicesMultiple}x product revenue`,
      "Assumes TVB revenue share of 20% on product revenue and 5% on services revenue"
    ]
  };
}

export function recommendPartner(knowledge: CompanyKnowledgeBase, partner: Partner, score: PartnerScore): PartnerRecommendation {
  const revenue = modelRevenue(knowledge, partner, score);
  const priority = score.totalScore >= 78 ? "high" : score.totalScore >= 62 ? "medium" : "low";
  return {
    id: `${knowledge.intake.company.id}-${partner.id}-recommendation`,
    companyId: knowledge.intake.company.id,
    partnerId: partner.id,
    recommendationType: "partner_outreach",
    priority,
    rationale: `${partner.name} is relevant because it aligns to ${knowledge.icpAnalysis.priorityIndustries.join(", ") || "the target ICP"} and can support ${knowledge.intake.profile.primaryUseCase}.`,
    whyPartnerWouldCare: `${partner.name} can attach services, expand account relevance, and create a differentiated offer around ${knowledge.intake.profile.problemSolved}.`,
    winWinProposal: `Package ${knowledge.intake.profile.productName} with ${partner.name}'s ${partner.servicesOffered.join(", ") || "commercial services"} to open faster enterprise conversations.`,
    suggestedPitch: `Lead with ${knowledge.intake.company.name}'s traction and invite ${partner.name} into a co-sell motion focused on ${knowledge.icpAnalysis.priorityIndustries[0] || knowledge.intake.company.primaryIndustry}.`,
    recommendedNextAction: priority === "high" ? "Schedule partner qualification call this week" : "Validate relationship owner and partner appetite",
    estimatedProductRevenue: revenue.productRevenue,
    estimatedServicesRevenue: revenue.servicesRevenue,
    estimatedTvbRevenue: revenue.tvbRevenue,
    estimatedTimeToRevenue: score.speedToRevenueScore >= 75 ? "0-90 days" : score.speedToRevenueScore >= 55 ? "3-6 months" : "6-12 months",
    assumptions: revenue.assumptions,
    risks: ["Partner bandwidth may be limited", "Co-sell economics need validation", "Customer overlap requires confirmation"],
    evidence: score.evidence,
    status: "generated",
    owner: "",
    notes: "",
    markForPlanning: priority === "high",
    createdAt: now(),
    updatedAt: now()
  };
}

export function rankPartners<T extends { score: PartnerScore }>(rows: T[]) {
  return [...rows].sort((a, b) => b.score.totalScore - a.score.totalScore);
}
