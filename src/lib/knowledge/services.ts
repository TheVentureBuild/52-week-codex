import type { AIProvider } from "@/lib/ai/types";
import type { IntakeRecord, KnowledgeDocument } from "@/types/domain";
import type { CustomerPatternInput, KnowledgeExtractionInput } from "./types";
import {
  mockClassifyDocument,
  mockExtractEntities,
  mockGenerateCustomerPattern,
  mockGenerateICPAnalysis,
  mockGeneratePersonas,
  mockKnowledgeGapAnalysis
} from "./synthesis";

export class DocumentClassificationService {
  constructor(private readonly aiProvider: AIProvider) {}

  async classify(document: KnowledgeDocument) {
    return this.aiProvider.generateStructuredOutput({
      promptKey: "document_classifier_v1",
      schemaName: "document_classification",
      input: document
    }).catch(() => mockClassifyDocument(document));
  }
}

export class EntityExtractionService {
  constructor(private readonly aiProvider: AIProvider) {}

  async extract(input: KnowledgeExtractionInput) {
    return this.aiProvider.generateStructuredOutput({
      promptKey: "entity_extractor_v1",
      schemaName: "knowledge_entities",
      input
    }).catch(() => mockExtractEntities(input.document, input.intake));
  }
}

export class KnowledgeExtractionService {
  constructor(private readonly aiProvider: AIProvider) {}

  async summarize(input: KnowledgeExtractionInput) {
    return this.aiProvider.generateStructuredOutput({
      promptKey: "knowledge_extractor_v1",
      schemaName: "knowledge_summary",
      input
    }).catch(() => ({ summary: input.document.summary, topics: input.document.extractedTopics }));
  }
}

export class PersonaGenerationService {
  constructor(private readonly aiProvider: AIProvider) {}

  async generate(intake: IntakeRecord) {
    return this.aiProvider.generateStructuredOutput({
      promptKey: "buyer_persona_generator_v1",
      schemaName: "buyer_personas",
      input: intake
    }).catch(() => mockGeneratePersonas(intake));
  }
}

export class ICPDiscoveryService {
  constructor(private readonly aiProvider: AIProvider) {}

  async analyze(intake: IntakeRecord) {
    return this.aiProvider.generateStructuredOutput({
      promptKey: "icp_discovery_v1",
      schemaName: "company_icp_analysis",
      input: intake
    }).catch(() => mockGenerateICPAnalysis(intake));
  }
}

export class GapAnalysisService {
  constructor(private readonly aiProvider: AIProvider) {}

  async analyze(intake: IntakeRecord, documents: KnowledgeDocument[]) {
    return this.aiProvider.generateStructuredOutput({
      promptKey: "knowledge_gap_analysis_v1",
      schemaName: "knowledge_gaps",
      input: { intake, documents }
    }).catch(() => mockKnowledgeGapAnalysis(intake, documents));
  }
}

export class CustomerPatternAnalysisService {
  constructor(private readonly aiProvider: AIProvider) {}

  async analyze(input: CustomerPatternInput) {
    return this.aiProvider.generateStructuredOutput({
      promptKey: "customer_pattern_analysis_v1",
      schemaName: "customer_patterns",
      input
    }).catch(() => mockGenerateCustomerPattern(input));
  }
}
