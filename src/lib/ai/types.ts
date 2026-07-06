export type GenerateTextInput = {
  promptKey: string;
  input: unknown;
};

export type GenerateTextOutput = {
  text: string;
  model: string;
};

export type StructuredOutputInput = GenerateTextInput & {
  schemaName: string;
};

export type EmbedInput = {
  text: string;
};

export type EmbedOutput = {
  vector: number[];
};

export interface AIProvider {
  generateText(input: GenerateTextInput): Promise<GenerateTextOutput>;
  generateStructuredOutput<T>(input: StructuredOutputInput): Promise<T>;
  embed?(input: EmbedInput): Promise<EmbedOutput>;
}
