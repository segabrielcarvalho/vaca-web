import { ModelProviderEnum } from "../graphql/__generated__/documents";

const ModelProvider: { [keys: string]: string } = {
  [ModelProviderEnum.Anthropic]: "Anthropic",
  [ModelProviderEnum.AzureOpenAi]: "Azure OpenAI",
  [ModelProviderEnum.Google]: "Google",
  [ModelProviderEnum.OpenAi]: "OpenAI",
  [ModelProviderEnum.XAi]: "xAI",
  [ModelProviderEnum.Custom]: "Custom",
};

const getModelProvider = (key?: string | null) => {
  if (!key) return "-";
  const label = ModelProvider[key] || key;
  return label;
};

export default getModelProvider;
