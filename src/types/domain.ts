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

export type KnowledgeProcessingStage =
  | "uploading"
  | "queued"
  | "processing"
  | "classifying"
  | "extracting"
  | "embedding"
  | "graph_update"
  | "profile_update"
  | "completed"
  | "failed";

export type KnowledgeDocument = {
  id: string;
  companyId: string;
  fileName: string;
  documentCategory: string;
  sourceType: "upload" | "google_drive" | "seed";
  sourceUri: string;
  processingStage: KnowledgeProcessingStage;
  summary: string;
  extractedTopics: string[];
  extractedTechnologies: string[];
  extractedCustomers: string[];
  extractedCompetitors: string[];
  extractedProducts: string[];
  confidenceScore: number;
  pageCount: number;
  indexedChunks: number;
  updatedAt: string;
};

export type KnowledgeEntity = {
  id: string;
  companyId: string;
  entityType: string;
  name: string;
  confidenceScore: number;
  evidence: string;
  sourceDocument: string;
  pageReference: string;
  timestamp: string;
};

export type KnowledgeRelationship = {
  id: string;
  companyId: string;
  sourceNode: string;
  relationshipType: string;
  targetNode: string;
  confidenceScore: number;
  evidence: string;
};

export type BuyerPersona = {
  id: string;
  companyId: string;
  personaType: string;
  title: string;
  goals: string[];
  painPoints: string[];
  kpis: string[];
  buyingCriteria: string[];
  objections: string[];
  decisionDrivers: string[];
  evidence: string[];
  confidenceScore: number;
};

export type ICPAnalysis = {
  companyId: string;
  currentIcp: string;
  suggestedIcp: string;
  confidenceScore: number;
  supportingEvidence: string[];
  missingSegments: string[];
  recommendedSegments: string[];
  priorityIndustries: string[];
  recommendedBuyerTitles: string[];
  idealCompanySize: string;
  idealGeography: string;
};

export type CustomerPattern = {
  companyId: string;
  commonIndustry: string;
  averageCompanySize: string;
  commonGeography: string;
  buyingCommittee: string[];
  technicalDecisionMakers: string[];
  businessDecisionMakers: string[];
  typicalAcv: number;
  implementationLength: string;
  commonIntegrations: string[];
  deploymentModels: string[];
  successFactors: string[];
  expansionFactors: string[];
};

export type KnowledgeHealth = {
  companyId: string;
  score: number;
  documentCount: number;
  indexedPages: number;
  extractedEntityCount: number;
  openQuestions: string[];
  factors: Record<string, number>;
};

export type GoogleDriveConnection = {
  companyId: string;
  folderUrl: string;
  syncFrequency: string;
  autoSync: boolean;
  includeSubfolders: boolean;
  maximumFileSizeMb: number;
  supportedTypes: string[];
  status: "connected" | "syncing" | "paused";
};

export type PartnerType =
  | "system_integrator"
  | "reseller"
  | "distributor"
  | "hyperscaler"
  | "referral_partner"
  | "msp"
  | "mssp"
  | "var"
  | "consulting_partner"
  | "technology_partner"
  | "marketplace_partner"
  | "industry_association"
  | "advisor_network"
  | "investor_network"
  | "other";

export type RecommendationStatus =
  | "draft"
  | "generated"
  | "under_review"
  | "approved"
  | "rejected"
  | "prioritized"
  | "sent_to_planning"
  | "completed";

export type Partner = {
  id: string;
  name: string;
  website: string;
  description: string;
  partnerType: PartnerType;
  headquarters: string;
  geographies: string[];
  industries: string[];
  technologyFocus: string[];
  cloudFocus: string[];
  servicesOffered: string[];
  partnerSize: string;
  createdAt: string;
  updatedAt: string;
};

export type CompanyPartner = {
  id: string;
  companyId: string;
  partnerId: string;
  source: string;
  relationshipOwner: string;
  relationshipStrength: number;
  notes: string;
  status: RecommendationStatus;
  createdAt: string;
  updatedAt: string;
};

export type PartnerEvidence = {
  sourceType: "document" | "intake" | "icp_analysis" | "customer_pattern" | "technology_profile" | "manual_note";
  sourceId: string;
  sourceLabel: string;
  excerpt: string;
  confidence: number;
};

export type PartnerScore = {
  id: string;
  companyId: string;
  partnerId: string;
  icpFitScore: number;
  industryFitScore: number;
  technologyFitScore: number;
  cloudFitScore: number;
  customerOverlapScore: number;
  servicesOpportunityScore: number;
  resaleOpportunityScore: number;
  relationshipScore: number;
  speedToRevenueScore: number;
  tvbRevenuePotentialScore: number;
  competitiveRiskScore: number;
  totalScore: number;
  confidenceScore: number;
  scoreVersion: string;
  evidence: PartnerEvidence[];
  createdAt: string;
};

export type PartnerRecommendation = {
  id: string;
  companyId: string;
  partnerId: string;
  recommendationType: string;
  priority: "high" | "medium" | "low";
  rationale: string;
  whyPartnerWouldCare: string;
  winWinProposal: string;
  suggestedPitch: string;
  recommendedNextAction: string;
  estimatedProductRevenue: number;
  estimatedServicesRevenue: number;
  estimatedTvbRevenue: number;
  estimatedTimeToRevenue: string;
  assumptions: string[];
  risks: string[];
  evidence: PartnerEvidence[];
  status: RecommendationStatus;
  owner: string;
  notes: string;
  markForPlanning: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PartnerImportJob = {
  id: string;
  companyId: string;
  fileName: string;
  sourceType: "manual" | "csv" | "paste" | "connector";
  status: "queued" | "processing" | "completed" | "failed";
  importedCount: number;
  failedCount: number;
  errors: string[];
  createdAt: string;
  completedAt?: string;
};
