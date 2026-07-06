import type { IntakeRecord, IntelligenceProfile } from "@/types/domain";
import type { AIProvider, GenerateTextInput, GenerateTextOutput, StructuredOutputInput } from "./types";
import { generateProfileFromIntake } from "@/lib/domain/profile-generator";

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
