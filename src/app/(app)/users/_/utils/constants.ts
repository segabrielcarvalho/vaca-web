import {
  GenderEnum,
  RoleEnum,
} from "../../../../../graphql/__generated__/documents";

export const roleOptions = [
  { label: "Administrador", value: RoleEnum.Admin },
  { label: "Usuário", value: RoleEnum.User },
  { label: "Mentorado", value: RoleEnum.Mentee },
];

export const genderOptions = [
  { label: "Masculino", value: GenderEnum.Male },
  { label: "Feminino", value: GenderEnum.Female },
  { label: "Outro", value: GenderEnum.Other },
];
