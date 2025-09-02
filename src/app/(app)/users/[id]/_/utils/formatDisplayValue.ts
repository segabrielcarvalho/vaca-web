const DISPLAY_MAP: Record<string, string> = {
  admin: "Administrador",
  user: "Usuário",
  mentee: "Mentorado",
  male: "Masculino",
  female: "Feminino",
  other: "Outro",
  fl: "FL",
  insider: "Insider",
  plat: "Plat",
};

export const formatDisplayValue = (value?: string | null) =>
  value ? DISPLAY_MAP[value] ?? value : "";
