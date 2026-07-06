import { z } from "zod";

const list = z.array(z.string()).default([]);

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  legalName: z.string().optional().default(""),
  website: z.string().min(1, "Website is required"),
  description: z.string().optional().default(""),
  headquarters: z.string().optional().default(""),
  foundedYear: z.coerce.number().optional(),
  employeeCountRange: z.string().optional().default(""),
  revenueRange: z.string().optional().default(""),
  fundingStage: z.string().optional().default(""),
  primaryIndustry: z.string().optional().default(""),
  secondaryIndustries: list,
  founderName: z.string().optional().default(""),
  founderEmail: z.string().email().optional().or(z.literal("")).default("")
});

export const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productCategory: z.string().optional().default(""),
  problemSolved: z.string().min(1, "Problem solved is required"),
  primaryUseCase: z.string().min(1, "Primary use case is required"),
  secondaryUseCases: list,
  keyDifferentiators: list,
  deploymentModel: z.string().optional().default(""),
  pricingModel: z.string().optional().default(""),
  averageContractValue: z.coerce.number().optional(),
  salesCycleLength: z.string().optional().default(""),
  implementationTimeline: z.string().optional().default(""),
  productMaturity: z.string().optional().default("")
});

export const icpSchema = z.object({
  targetCompanySize: z.string().optional().default(""),
  targetIndustries: z.array(z.string()).min(1, "Target industries are required"),
  targetGeographies: list,
  buyerTitles: z.array(z.string()).min(1, "Buyer titles are required"),
  influencerTitles: list,
  economicBuyer: z.string().optional().default(""),
  technicalBuyer: z.string().optional().default(""),
  painPoints: list,
  triggerEvents: list,
  disqualifyingFactors: list
});

export const customerSchema = z.object({
  id: z.string(),
  customerName: z.string().optional().default(""),
  industry: z.string().optional().default(""),
  companySize: z.string().optional().default(""),
  geography: z.string().optional().default(""),
  useCase: z.string().optional().default(""),
  annualRevenue: z.coerce.number().optional(),
  contractValue: z.coerce.number().optional(),
  deploymentType: z.string().optional().default(""),
  successStory: z.string().optional().default(""),
  expansionPotential: z.string().optional().default(""),
  referenceable: z.boolean().default(false)
});

export const technologySchema = z.object({
  cloudProvider: z.string().min(1, "Cloud provider is required"),
  backendLanguage: z.string().optional().default(""),
  frontendFramework: z.string().optional().default(""),
  databaseSystem: z.string().optional().default(""),
  aiStack: list,
  dataInfrastructure: list,
  integrations: list,
  apiAvailable: z.boolean().default(false),
  securityCertifications: list,
  complianceRequirements: list,
  marketplaceListings: list,
  hostingModel: z.string().optional().default("")
});

export const gtmSchema = z.object({
  currentSalesMotion: z.string().min(1, "Current sales motion is required"),
  founderLedSales: z.boolean().default(false),
  directEnterpriseSales: z.boolean().default(false),
  channelSales: z.boolean().default(false),
  existingPartners: list,
  existingResellers: list,
  existingSiRelationships: list,
  hyperscalerRelationship: z.string().optional().default(""),
  marketingChannels: list,
  currentPipeline: z.coerce.number().optional(),
  currentArr: z.coerce.number().optional(),
  revenueGoals: list
});

export const partnerReadinessSchema = z.object({
  partnerSellable: z.boolean().default(false),
  requiresImplementationServices: z.boolean().default(false),
  requiresIntegrationServices: z.boolean().default(false),
  requiresManagedServices: z.boolean().default(false),
  partnersCanMakeServicesRevenue: z.boolean().default(false),
  partnerCollateralAvailable: z.boolean().default(false),
  partnerMarginAvailable: z.boolean().default(false),
  revenueShareAvailable: z.boolean().default(false),
  trainingMaterialAvailable: z.boolean().default(false),
  demoEnvironmentAvailable: z.boolean().default(false)
});

export const commercialGoalsSchema = z.object({
  twelveMonthRevenueGoal: z.string().min(1, "12-month revenue goal is required"),
  targetNewCustomers: z.string().optional().default(""),
  targetPartnerTypes: list,
  targetGeographies: list,
  strategicAccounts: list,
  preferredGtmMotion: z.string().optional().default(""),
  urgencyLevel: z.string().optional().default(""),
  constraints: z.string().optional().default(""),
  founderAsksFromTvb: z.string().optional().default("")
});

export const submissionSchema = z.object({
  company: companySchema,
  profile: productSchema,
  icp: icpSchema,
  customers: z.array(customerSchema),
  technology: technologySchema,
  gtm: gtmSchema,
  partnerReadiness: partnerReadinessSchema,
  commercialGoals: commercialGoalsSchema
}).refine((data) => data.customers.some((customer) => customer.customerName), {
  message: "Add at least one customer, or capture a no-customers-yet explanation in the customer section.",
  path: ["customers"]
});
