import type {
  BuyerPersona,
  CompanyCustomer,
  CompanyTechnology,
  GoogleDriveConnection,
  ICPAnalysis,
  IntakeRecord,
  KnowledgeDocument,
  KnowledgeEntity,
  KnowledgeHealth,
  KnowledgeRelationship,
  CustomerPattern
} from "@/types/domain";

export type CompanyKnowledgeBase = {
  intake: IntakeRecord;
  documents: KnowledgeDocument[];
  entities: KnowledgeEntity[];
  relationships: KnowledgeRelationship[];
  personas: BuyerPersona[];
  icpAnalysis: ICPAnalysis;
  customerPattern: CustomerPattern;
  health: KnowledgeHealth;
  googleDriveConnection: GoogleDriveConnection;
};

export type KnowledgeSearchResult = {
  id: string;
  title: string;
  source: string;
  type: "document" | "entity" | "relationship";
  snippet: string;
  confidenceScore: number;
};

export type KnowledgeExtractionInput = {
  document: KnowledgeDocument;
  intake: IntakeRecord;
};

export type CustomerPatternInput = {
  customers: CompanyCustomer[];
  technology: CompanyTechnology;
};
