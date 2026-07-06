export const defaultModelRouting = {
  company_profile_generation: {
    provider: "mock",
    model: "mock-company-profile-v1",
    prompt_key: "company_intelligence_profile_v1"
  }
};

export const defaultScoringWeights = {
  gtm: {
    icpComplete: 20,
    topCustomersAdded: 20,
    acvProvided: 10,
    salesCycleProvided: 10,
    gtmMotionProvided: 20,
    revenueGoalProvided: 20
  },
  partner: {
    partnerSellable: 20,
    implementationServicesOpportunity: 15,
    integrationServicesOpportunity: 15,
    partnerCollateral: 15,
    partnerMargin: 15,
    demoEnvironment: 10,
    trainingMaterial: 10
  }
};

export const defaultKnowledgeSettings = {
  maximumChunkSize: 1200,
  chunkOverlap: 160,
  embeddingProvider: "mock",
  entityConfidenceThreshold: 65,
  supportedFileTypes: ["PDF", "PowerPoint", "Word", "Excel", "Markdown", "CSV", "TXT", "Images"],
  maximumUploadSizeMb: 50,
  googleDriveSyncFrequency: "Daily",
  autoRegeneration: true,
  ocrProvider: "mock",
  knowledgeRefreshInterval: "6 hours"
};

export const moduleTwoPromptRegistry = [
  "document_classifier_v1",
  "knowledge_extractor_v1",
  "entity_extractor_v1",
  "customer_pattern_analysis_v1",
  "buyer_persona_generator_v1",
  "icp_discovery_v1",
  "knowledge_gap_analysis_v1"
];

export const defaultPartnerScoringWeights = {
  icpFit: 15,
  industryFit: 10,
  technologyFit: 10,
  cloudFit: 10,
  customerOverlap: 10,
  servicesOpportunity: 15,
  resaleOpportunity: 10,
  relationshipStrength: 10,
  speedToRevenue: 5,
  tvbRevenuePotential: 5
};

export const defaultPartnerTypes = [
  "system_integrator",
  "reseller",
  "distributor",
  "hyperscaler",
  "referral_partner",
  "msp",
  "mssp",
  "var",
  "consulting_partner",
  "technology_partner",
  "marketplace_partner",
  "industry_association",
  "advisor_network",
  "investor_network",
  "other"
];

export const moduleThreePromptRegistry = [
  "partner_classifier_v1",
  "partner_score_generator_v1",
  "partner_rationale_generator_v1",
  "partner_revenue_model_v1",
  "win_win_partner_pitch_v1",
  "partner_recommendation_reviewer_v1"
];
