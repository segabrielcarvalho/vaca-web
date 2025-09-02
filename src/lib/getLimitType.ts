import { LimitTypeEnum } from "../graphql/__generated__/documents";

const LimitType: { [keys: string]: string } = {
  [LimitTypeEnum.Request]: "Requisição",
  [LimitTypeEnum.Token]: "Token",
};

const getLimitType = (key?: string | null) => {
  if (!key) return "-";
  const label = LimitType[key] || key;
  return label;
};

export default getLimitType;
