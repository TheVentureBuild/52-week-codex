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
