import { PeriodUnitEnum } from "../graphql/__generated__/documents";

const PeriodUnit: { [keys: string]: string } = {
  [PeriodUnitEnum.Hour]: "Por Hora",
  [PeriodUnitEnum.Day]: "Dia",
  [PeriodUnitEnum.Week]: "Semana",
  [PeriodUnitEnum.Month]: "Mês",
  [PeriodUnitEnum.Year]: "Ano",
};

const getPeriodUnit = (key?: string | null) => {
  if (!key) return "-";
  const label = PeriodUnit[key] || key;
  return label;
};

export default getPeriodUnit;
