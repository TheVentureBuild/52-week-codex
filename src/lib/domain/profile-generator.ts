import { defaultScoringWeights } from "@/lib/config/defaults";
import type { IntakeRecord, IntelligenceProfile } from "@/types/domain";

function scoreGtm(intake: IntakeRecord) {
  const weights = defaultScoringWeights.gtm;
  let score = 0;
  if (intake.icp.targetIndustries.length && intake.icp.buyerTitles.length) score += weights.icpComplete;
  if (intake.customers.some((customer) => customer.customerName)) score += weights.topCustomersAdded;
  if (intake.profile.averageContractValue) score += weights.acvProvided;
  if (intake.profile.salesCycleLength) score += weights.salesCycleProvided;
  if (intake.gtm.currentSalesMotion) score += weights.gtmMotionProvided;
  if (intake.commercialGoals.twelveMonthRevenueGoal) score += weights.revenueGoalProvided;
  return score;
}

function scorePartner(intake: IntakeRecord) {
  const weights = defaultScoringWeights.partner;
  const readiness = intake.partnerReadiness;
  let score = 0;
  if (readiness.partnerSellable) score += weights.partnerSellable;
  if (readiness.requiresImplementationServices) score += weights.implementationServicesOpportunity;
  if (readiness.requiresIntegrationServices) score += weights.integrationServicesOpportunity;
  if (readiness.partnerCollateralAvailable) score += weights.partnerCollateral;
  if (readiness.partnerMarginAvailable) score += weights.partnerMargin;
  if (readiness.demoEnvironmentAvailable) score += weights.demoEnvironment;
  if (readiness.trainingMaterialAvailable) score += weights.trainingMaterial;
  return score;
}

export function generateProfileFromIntake(intake: IntakeRecord): IntelligenceProfile {
  const missing = [
    !intake.company.description && "Short company description",
    !intake.gtm.hyperscalerRelationship && "Hyperscaler relationship detail",
    !intake.technology.securityCertifications.length && "Security certifications",
    !intake.partnerReadiness.partnerCollateralAvailable && "Partner collateral"
  ].filter(Boolean) as string[];

  const customerNames = intake.customers.filter((customer) => customer.customerName).map((customer) => customer.customerName);

  return {
    id: `profile-${intake.company.id}`,
    companyId: intake.company.id,
    summary: `${intake.company.name} is a ${intake.profile.productCategory || intake.company.primaryIndustry || "scale-up"} focused on ${intake.profile.primaryUseCase || "a defined market use case"}.`,
    productCategory: intake.profile.productCategory || "Needs classification",
    coreProblem: intake.profile.problemSolved || "Problem statement not provided",
    icpSummary: `${intake.icp.targetCompanySize || "Target companies"} in ${intake.icp.targetIndustries.join(", ") || "target industries"} across ${intake.icp.targetGeographies.join(", ") || "priority geographies"}.`,
    buyerPersonas: intake.icp.buyerTitles,
    customerSegments: customerNames.length ? customerNames : ["No named customer segment yet"],
    tractionSummary: customerNames.length ? `Named traction includes ${customerNames.join(", ")}.` : "Customer proof points need to be added.",
    technologySummary: `${intake.technology.cloudProvider || "Cloud provider unknown"} hosted stack with ${intake.technology.backendLanguage || "backend"} and ${intake.technology.databaseSystem || "database"} components.`,
    gtmReadinessScore: scoreGtm(intake),
    partnerReadinessScore: scorePartner(intake),
    hyperscalerAlignment: intake.gtm.hyperscalerRelationship || "No hyperscaler alignment captured yet.",
    siPartnerPotential: intake.partnerReadiness.requiresImplementationServices || intake.partnerReadiness.requiresIntegrationServices
      ? "Strong SI potential because services and integration revenue are available."
      : "SI potential needs more evidence around services attach.",
    revenueMotionSummary: `${intake.gtm.currentSalesMotion || "Sales motion not captured"} with a 12-month goal of ${intake.commercialGoals.twelveMonthRevenueGoal || "not provided"}.`,
    missingInformation: missing,
    recommendedNextData: missing.length ? missing.map((item) => `Capture ${item.toLowerCase()}`) : ["Validate partner economics", "Collect two customer proof points"],
    confidenceScore: Math.max(45, 90 - missing.length * 8),
    evidence: [
      "Founder intake fields",
      "Uploaded document placeholders",
      "MockAIAdapter deterministic generation"
    ],
    generatedAt: new Date().toISOString(),
    generatedByModel: "mock-company-profile-v1",
    promptVersion: "company_intelligence_profile_v1"
  };
}
