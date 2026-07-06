import type { IntakeRecord, IntelligenceProfile } from "@/types/domain";
import type { AIProvider, GenerateTextInput, GenerateTextOutput, StructuredOutputInput } from "./types";
import { generateProfileFromIntake } from "@/lib/domain/profile-generator";
import {
  mockClassifyDocument,
  mockExtractEntities,
  mockGenerateCustomerPattern,
  mockGenerateICPAnalysis,
  mockGeneratePersonas,
  mockKnowledgeGapAnalysis
} from "@/lib/knowledge/synthesis";

export class MockAIAdapter implements AIProvider {
  async generateText(input: GenerateTextInput): Promise<GenerateTextOutput> {
    return {
      text: `Mock output for ${input.promptKey}`,
      model: "mock-company-profile-v1"
    };
  }

  async generateStructuredOutput<T>(input: StructuredOutputInput): Promise<T> {
    if (input.schemaName === "company_intelligence_profile") {
      return generateProfileFromIntake(input.input as IntakeRecord) as T;
    }
    if (input.schemaName === "document_classification") {
      return mockClassifyDocument(input.input as Parameters<typeof mockClassifyDocument>[0]) as T;
    }
    if (input.schemaName === "knowledge_entities") {
      const extractionInput = input.input as { document: Parameters<typeof mockExtractEntities>[0]; intake: IntakeRecord };
      return mockExtractEntities(extractionInput.document, extractionInput.intake) as T;
    }
    if (input.schemaName === "buyer_personas") {
      return mockGeneratePersonas(input.input as IntakeRecord) as T;
    }
    if (input.schemaName === "company_icp_analysis") {
      return mockGenerateICPAnalysis(input.input as IntakeRecord) as T;
    }
    if (input.schemaName === "customer_patterns") {
      return mockGenerateCustomerPattern(input.input as Parameters<typeof mockGenerateCustomerPattern>[0]) as T;
    }
    if (input.schemaName === "knowledge_gaps") {
      const gapInput = input.input as { intake: IntakeRecord; documents: Parameters<typeof mockKnowledgeGapAnalysis>[1] };
      return mockKnowledgeGapAnalysis(gapInput.intake, gapInput.documents) as T;
    }
    return {} as T;
  }
}

export class OpenAIAdapter extends MockAIAdapter {}
export class AnthropicAdapter extends MockAIAdapter {}
export class GeminiAdapter extends MockAIAdapter {}

export function getAIProvider(providerName = process.env.AI_DEFAULT_PROVIDER || "mock"): AIProvider {
  const providers: Record<string, AIProvider> = {
    mock: new MockAIAdapter(),
    openai: new OpenAIAdapter(),
    anthropic: new AnthropicAdapter(),
    gemini: new GeminiAdapter()
  };

  return providers[providerName] ?? providers.mock;
}

export async function generateCompanyProfile(intake: IntakeRecord): Promise<IntelligenceProfile> {
  const provider = getAIProvider();
  return provider.generateStructuredOutput<IntelligenceProfile>({
    promptKey: "company_intelligence_profile_v1",
    schemaName: "company_intelligence_profile",
    input: intake
  });
}
