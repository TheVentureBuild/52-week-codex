import { getAIProvider } from "@/lib/ai/adapters";
import { seedIntakes } from "@/lib/data/seed";
import type { CompanyKnowledgeBase } from "./types";
import {
  calculateKnowledgeHealth,
  mockExtractEntities,
  mockGenerateICPAnalysis,
  mockGeneratePersonas,
  mockGenerateRelationships,
  mockGenerateCustomerPattern
} from "./synthesis";
import type { KnowledgeDocument } from "@/types/domain";

const now = new Date().toISOString();

function documentsFor(companyId: string, productName: string): KnowledgeDocument[] {
  return [
    {
      id: `${companyId}-pitch-deck`,
      companyId,
      fileName: `${productName} Pitch Deck.pdf`,
      documentCategory: "Pitch Deck",
      sourceType: "upload",
      sourceUri: `/private/${companyId}/pitch-deck.pdf`,
      processingStage: "completed",
      summary: `Commercial overview for ${productName}, including problem, market, traction, buyer pains, and GTM motion.`,
      extractedTopics: ["Market narrative", "Commercial traction", "Buyer pain"],
      extractedTechnologies: ["PostgreSQL", "API", "Cloud"],
      extractedCustomers: [],
      extractedCompetitors: ["Legacy workflow tools"],
      extractedProducts: [productName],
      confidenceScore: 86,
      pageCount: 14,
      indexedChunks: 18,
      updatedAt: now
    },
    {
      id: `${companyId}-architecture`,
      companyId,
      fileName: `${productName} Architecture Overview.docx`,
      documentCategory: "Architecture",
      sourceType: "google_drive",
      sourceUri: `gdrive://tvb/${companyId}/architecture`,
      processingStage: "completed",
      summary: `Technical architecture covering cloud deployment, integrations, data model, security posture, and implementation path.`,
      extractedTopics: ["Architecture", "Integrations", "Security"],
      extractedTechnologies: ["AWS", "FHIR", "React", "PostgreSQL"],
      extractedCustomers: [],
      extractedCompetitors: [],
      extractedProducts: [productName],
      confidenceScore: 82,
      pageCount: 9,
      indexedChunks: 12,
      updatedAt: now
    },
    {
      id: `${companyId}-case-study`,
      companyId,
      fileName: `${productName} Customer Case Study.md`,
      documentCategory: "Case Study",
      sourceType: "upload",
      sourceUri: `/private/${companyId}/case-study.md`,
      processingStage: "completed",
      summary: `Customer proof point with use case, deployment model, success factor, and expansion opportunity.`,
      extractedTopics: ["Customer evidence", "Success factors", "Expansion"],
      extractedTechnologies: ["Integration API"],
      extractedCustomers: [],
      extractedCompetitors: [],
      extractedProducts: [productName],
      confidenceScore: 79,
      pageCount: 4,
      indexedChunks: 6,
      updatedAt: now
    }
  ];
}

export function getKnowledgeBase(companyId: string): CompanyKnowledgeBase | undefined {
  const intake = seedIntakes.find((item) => item.company.id === companyId);
  if (!intake) return undefined;
  const docs = documentsFor(companyId, intake.profile.productName);
  const docsWithCustomers = docs.map((doc) => ({
    ...doc,
    extractedCustomers: intake.customers.map((customer) => customer.customerName).filter(Boolean),
    extractedTechnologies: [...new Set([...doc.extractedTechnologies, intake.technology.cloudProvider, ...intake.technology.integrations].filter(Boolean))]
  }));
  const entities = docsWithCustomers.flatMap((document) => mockExtractEntities(document, intake));
  const relationships = mockGenerateRelationships(intake, entities);
  const personas = mockGeneratePersonas(intake);
  const icpAnalysis = mockGenerateICPAnalysis(intake);
  const customerPattern = { ...mockGenerateCustomerPattern({ customers: intake.customers, technology: intake.technology }), companyId };
  const health = calculateKnowledgeHealth(intake, docsWithCustomers, entities);

  return {
    intake,
    documents: docsWithCustomers,
    entities,
    relationships,
    personas,
    icpAnalysis,
    customerPattern,
    health,
    googleDriveConnection: {
      companyId,
      folderUrl: `https://drive.google.com/drive/folders/${companyId}`,
      syncFrequency: "Daily",
      autoSync: true,
      includeSubfolders: true,
      maximumFileSizeMb: 50,
      supportedTypes: ["PDF", "PowerPoint", "Word", "Excel", "Markdown", "CSV", "TXT", "Images"],
      status: "connected"
    }
  };
}

export const knowledgeBases = seedIntakes.map((intake) => getKnowledgeBase(intake.company.id)).filter(Boolean) as CompanyKnowledgeBase[];

export async function getKnowledgeProvider() {
  return getAIProvider();
}
