export type Role = "founder" | "operator" | "admin";
export type IntakeStatus = "draft" | "submitted" | "in_review" | "approved" | "clarification_requested";
export type ProfileGenerationStatus = "not_started" | "generating" | "generated" | "failed" | "needs_review";

export type Company = {
  id: string;
  name: string;
  legalName: string;
  website: string;
  description: string;
  headquarters: string;
  foundedYear?: number;
  employeeCountRange: string;
  revenueRange: string;
  fundingStage: string;
  primaryIndustry: string;
  secondaryIndustries: string[];
  founderName: string;
  founderEmail: string;
  intakeStatus: IntakeStatus;
  profileStatus: ProfileGenerationStatus;
  reviewStatus: IntakeStatus;
  completion: number;
  createdBy: string;
  updatedAt: string;
  submittedAt?: string;
};

export type CompanyProfile = {
  productName: string;
  productCategory: string;
  problemSolved: string;
  primaryUseCase: string;
  secondaryUseCases: string[];
  keyDifferentiators: string[];
  deploymentModel: string;
  pricingModel: string;
  averageContractValue?: number;
  salesCycleLength: string;
  implementationTimeline: string;
  productMaturity: string;
};

export type CompanyICP = {
  targetCompanySize: string;
  targetIndustries: string[];
  targetGeographies: string[];
  buyerTitles: string[];
  influencerTitles: string[];
  economicBuyer: string;
  technicalBuyer: string;
  painPoints: string[];
  triggerEvents: string[];
  disqualifyingFactors: string[];
};

export type CompanyCustomer = {
  id: string;
  customerName: string;
  industry: string;
  companySize: string;
  geography: string;
  useCase: string;
  annualRevenue?: number;
  contractValue?: number;
  deploymentType: string;
  successStory: string;
  expansionPotential: string;
  referenceable: boolean;
};

export type CompanyTechnology = {
  cloudProvider: string;
  backendLanguage: string;
  frontendFramework: string;
  databaseSystem: string;
  aiStack: string[];
  dataInfrastructure: string[];
  integrations: string[];
  apiAvailable: boolean;
  securityCertifications: string[];
  complianceRequirements: string[];
  marketplaceListings: string[];
  hostingModel: string;
};

export type CompanyGTM = {
  currentSalesMotion: string;
  founderLedSales: boolean;
  directEnterpriseSales: boolean;
  channelSales: boolean;
  existingPartners: string[];
  existingResellers: string[];
  existingSiRelationships: string[];
  hyperscalerRelationship: string;
  marketingChannels: string[];
  currentPipeline?: number;
  currentArr?: number;
  revenueGoals: string[];
};

export type PartnerReadiness = {
  partnerSellable: boolean;
  requiresImplementationServices: boolean;
  requiresIntegrationServices: boolean;
  requiresManagedServices: boolean;
  partnersCanMakeServicesRevenue: boolean;
  partnerCollateralAvailable: boolean;
  partnerMarginAvailable: boolean;
  revenueShareAvailable: boolean;
  trainingMaterialAvailable: boolean;
  demoEnvironmentAvailable: boolean;
};

export type CommercialGoals = {
  twelveMonthRevenueGoal: string;
  targetNewCustomers: string;
  targetPartnerTypes: string[];
  targetGeographies: string[];
  strategicAccounts: string[];
  preferredGtmMotion: string;
  urgencyLevel: string;
  constraints: string;
  founderAsksFromTvb: string;
};

export type CompanyDocument = {
  id: string;
  fileName: string;
  fileType: string;
  storagePath: string;
  processingStatus: "uploaded" | "queued" | "processing" | "processed" | "failed";
  uploadedAt: string;
};

export type IntakeRecord = {
  company: Company;
  profile: CompanyProfile;
  icp: CompanyICP;
  customers: CompanyCustomer[];
  technology: CompanyTechnology;
  gtm: CompanyGTM;
  partnerReadiness: PartnerReadiness;
  commercialGoals: CommercialGoals;
  documents: CompanyDocument[];
};

export type IntelligenceProfile = {
  id: string;
  companyId: string;
  summary: string;
  productCategory: string;
  coreProblem: string;
  icpSummary: string;
  buyerPersonas: string[];
  customerSegments: string[];
  tractionSummary: string;
  technologySummary: string;
  gtmReadinessScore: number;
  partnerReadinessScore: number;
  hyperscalerAlignment: string;
  siPartnerPotential: string;
  revenueMotionSummary: string;
  missingInformation: string[];
  recommendedNextData: string[];
  confidenceScore: number;
  evidence: string[];
  generatedAt: string;
  generatedByModel: string;
  promptVersion: string;
};
