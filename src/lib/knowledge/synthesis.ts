import type {
  BuyerPersona,
  ICPAnalysis,
  IntakeRecord,
  KnowledgeDocument,
  KnowledgeEntity,
  KnowledgeHealth,
  KnowledgeRelationship,
  CustomerPattern
} from "@/types/domain";
import type { CustomerPatternInput, KnowledgeSearchResult } from "./types";

export function mockClassifyDocument(document: KnowledgeDocument) {
  const name = document.fileName.toLowerCase();
  const documentCategory = name.includes("architecture")
    ? "Architecture"
    : name.includes("case")
      ? "Case Study"
      : name.includes("pricing")
        ? "Pricing"
        : name.includes("security")
          ? "Security"
          : "Pitch Deck";

  return { documentCategory, confidenceScore: document.confidenceScore || 78 };
}

export function mockExtractEntities(document: KnowledgeDocument, intake: IntakeRecord): KnowledgeEntity[] {
  const base = [
    ...document.extractedTechnologies.map((name) => ({ type: "Technology", name })),
    ...document.extractedCustomers.map((name) => ({ type: "Customer", name })),
    ...document.extractedProducts.map((name) => ({ type: "Product", name })),
    ...intake.icp.buyerTitles.map((name) => ({ type: "Buyer Title", name })),
    ...intake.icp.painPoints.map((name) => ({ type: "Pain Point", name }))
  ];

  return base.map((entity, index) => ({
    id: `${document.id}-entity-${index}`,
    companyId: document.companyId,
    entityType: entity.type,
    name: entity.name,
    confidenceScore: Math.max(68, document.confidenceScore - index),
    evidence: `${entity.name} appears in ${document.fileName}`,
    sourceDocument: document.fileName,
    pageReference: `p.${Math.max(1, index + 1)}`,
    timestamp: document.updatedAt
  }));
}

export function mockGenerateRelationships(intake: IntakeRecord, entities: KnowledgeEntity[]): KnowledgeRelationship[] {
  const product = intake.profile.productName || intake.company.name;
  return entities.slice(0, 12).map((entity, index) => ({
    id: `${intake.company.id}-relationship-${index}`,
    companyId: intake.company.id,
    sourceNode: product,
    relationshipType: entity.entityType === "Customer" ? "serves" : entity.entityType === "Technology" ? "uses" : "relates_to",
    targetNode: entity.name,
    confidenceScore: entity.confidenceScore,
    evidence: entity.evidence
  }));
}

export function mockGeneratePersonas(intake: IntakeRecord): BuyerPersona[] {
  const titles = [
    ["Economic Buyer", intake.icp.economicBuyer || intake.icp.buyerTitles[0] || "Executive Sponsor"],
    ["Technical Buyer", intake.icp.technicalBuyer || "Technical Decision Maker"],
    ["Business Champion", intake.icp.buyerTitles[1] || "Business Champion"],
    ["Security", "Security Reviewer"]
  ];

  return titles.map(([personaType, title], index) => ({
    id: `${intake.company.id}-persona-${index}`,
    companyId: intake.company.id,
    personaType,
    title,
    goals: ["Reduce execution risk", "Improve measurable business outcomes"],
    painPoints: intake.icp.painPoints.length ? intake.icp.painPoints : ["Unclear ROI", "Implementation friction"],
    kpis: ["Time to value", "Adoption", "Revenue impact"],
    buyingCriteria: ["Credible proof", "Integration fit", "Security posture"],
    objections: ["Budget timing", "Internal bandwidth"],
    decisionDrivers: ["Clear business case", "Trusted implementation path"],
    evidence: [`Founder ICP: ${intake.icp.buyerTitles.join(", ") || "not provided"}`, `Product use case: ${intake.profile.primaryUseCase}`],
    confidenceScore: 78 - index * 3
  }));
}

export function mockGenerateICPAnalysis(intake: IntakeRecord): ICPAnalysis {
  return {
    companyId: intake.company.id,
    currentIcp: `${intake.icp.targetCompanySize || "Target companies"} in ${intake.icp.targetIndustries.join(", ") || intake.company.primaryIndustry}`,
    suggestedIcp: `Prioritize ${intake.icp.targetIndustries[0] || intake.company.primaryIndustry} accounts with urgent ${intake.profile.problemSolved || "business problem"} needs and clear executive ownership.`,
    confidenceScore: intake.customers.length ? 82 : 66,
    supportingEvidence: [
      `Buyer titles: ${intake.icp.buyerTitles.join(", ") || "not provided"}`,
      `Customer proof points: ${intake.customers.map((customer) => customer.customerName).join(", ") || "none yet"}`
    ],
    missingSegments: intake.customers.length ? ["Segment-level win/loss detail"] : ["Customer references", "Revenue by segment"],
    recommendedSegments: intake.icp.targetIndustries.slice(0, 3),
    priorityIndustries: intake.icp.targetIndustries.length ? intake.icp.targetIndustries : [intake.company.primaryIndustry],
    recommendedBuyerTitles: [...new Set([...intake.icp.buyerTitles, intake.icp.economicBuyer, intake.icp.technicalBuyer].filter(Boolean))],
    idealCompanySize: intake.icp.targetCompanySize || "Mid-market to enterprise",
    idealGeography: intake.icp.targetGeographies.join(", ") || "United States"
  };
}

export function mockGenerateCustomerPattern(input: CustomerPatternInput): CustomerPattern {
  const customers = input.customers;
  return {
    companyId: "",
    commonIndustry: customers[0]?.industry || "Insufficient customer sample",
    averageCompanySize: customers[0]?.companySize || "Unknown",
    commonGeography: customers[0]?.geography || "Unknown",
    buyingCommittee: ["Economic buyer", "Technical buyer", "Business champion"],
    technicalDecisionMakers: ["CIO", "Security Architect", "Platform Lead"],
    businessDecisionMakers: ["VP Operations", "Chief Strategy Officer"],
    typicalAcv: customers.find((customer) => customer.contractValue)?.contractValue || 0,
    implementationLength: "2-8 weeks depending on integrations",
    commonIntegrations: input.technology.integrations,
    deploymentModels: [...new Set(customers.map((customer) => customer.deploymentType).filter(Boolean))],
    successFactors: customers.map((customer) => customer.successStory).filter(Boolean),
    expansionFactors: customers.map((customer) => customer.expansionPotential).filter(Boolean)
  };
}

export function mockKnowledgeGapAnalysis(intake: IntakeRecord, documents: KnowledgeDocument[]) {
  return {
    openQuestions: [
      !documents.some((doc) => doc.documentCategory === "Pricing") && "Pricing proof is missing",
      !documents.some((doc) => doc.documentCategory === "Security") && "Security and compliance package is incomplete",
      !intake.customers.length && "Customer evidence needs to be added"
    ].filter(Boolean),
    recommendedInformation: ["Current pitch deck", "Referenceable case study", "Partner implementation guide"]
  };
}

export function calculateKnowledgeHealth(intake: IntakeRecord, documents: KnowledgeDocument[], entities: KnowledgeEntity[]): KnowledgeHealth {
  const factors = {
    structuredData: intake.company.completion,
    documentCoverage: Math.min(100, documents.length * 18),
    customerCoverage: Math.min(100, intake.customers.length * 30),
    technologyCoverage: intake.technology.cloudProvider ? 80 : 20,
    productCoverage: intake.profile.productName ? 90 : 20,
    salesAssets: documents.some((doc) => doc.documentCategory === "Pitch Deck" || doc.documentCategory === "Sales Deck") ? 80 : 25,
    partnerAssets: documents.some((doc) => doc.summary.toLowerCase().includes("partner")) ? 65 : 20,
    referenceMaterial: documents.some((doc) => doc.documentCategory === "Case Study") ? 80 : 25
  };
  const score = Math.round(Object.values(factors).reduce((sum, value) => sum + value, 0) / Object.values(factors).length);

  return {
    companyId: intake.company.id,
    score,
    documentCount: documents.length,
    indexedPages: documents.reduce((sum, doc) => sum + doc.pageCount, 0),
    extractedEntityCount: entities.length,
    openQuestions: mockKnowledgeGapAnalysis(intake, documents).openQuestions as string[],
    factors
  };
}

export function searchKnowledge(query: string, documents: KnowledgeDocument[], entities: KnowledgeEntity[], relationships: KnowledgeRelationship[]): KnowledgeSearchResult[] {
  const normalized = query.toLowerCase();
  const documentResults = documents
    .filter((doc) => [doc.fileName, doc.summary, ...doc.extractedTopics, ...doc.extractedTechnologies].join(" ").toLowerCase().includes(normalized))
    .map((doc) => ({
      id: doc.id,
      title: doc.fileName,
      source: doc.documentCategory,
      type: "document" as const,
      snippet: doc.summary,
      confidenceScore: doc.confidenceScore
    }));
  const entityResults = entities
    .filter((entity) => [entity.name, entity.entityType, entity.evidence].join(" ").toLowerCase().includes(normalized))
    .map((entity) => ({
      id: entity.id,
      title: entity.name,
      source: entity.sourceDocument,
      type: "entity" as const,
      snippet: entity.evidence,
      confidenceScore: entity.confidenceScore
    }));
  const relationshipResults = relationships
    .filter((relationship) => [relationship.sourceNode, relationship.relationshipType, relationship.targetNode].join(" ").toLowerCase().includes(normalized))
    .map((relationship) => ({
      id: relationship.id,
      title: `${relationship.sourceNode} ${relationship.relationshipType} ${relationship.targetNode}`,
      source: "Knowledge graph",
      type: "relationship" as const,
      snippet: relationship.evidence,
      confidenceScore: relationship.confidenceScore
    }));

  return [...documentResults, ...entityResults, ...relationshipResults];
}
