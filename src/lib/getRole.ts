import { RoleEnum } from "../graphql/__generated__/documents";

const Role: { [keys: string]: string } = {
  [RoleEnum.Admin]: "Administrador",
  [RoleEnum.Mentee]: "Mentorado",
  [RoleEnum.User]: "Usuário",
};

const getRole = (key?: string | null) => {
  if (!key) return "-";
  const label = Role[key] || key;
  return label;
};

export default getRole;
