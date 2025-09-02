"use client";

import Drawer from "@/components/drawer";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { RoleEnum } from "@/graphql/__generated__/documents";
import getRole from "@/lib/getRole";
import { useUserContext } from "../contexts/users.context";

export const UserFilters = () => {
  const { get, set } = useUserContext();

  const isActiveOptions = [
    { label: "Ativos", value: "true" },
    { label: "Inativos", value: "false" },
  ];

  const isTestOptions = [
    { label: "Verdadeiros", value: "false" },
    { label: "Testes", value: "true" },
  ];

  const roleOptions = Object.values(RoleEnum).map((role) => ({
    label: getRole(role),
    value: role,
  }));

  return (
    <Drawer title="Filtros Disponíveis" label="Filtros" size="lg">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <Input
            className="w-full"
            label="Nome"
            isClearable
            placeholder="Pesquisar por nome"
            value={get.name || ""}
            onChange={(e) => set.name(e.target.value)}
          />
          <Input
            className="w-full"
            label="E-mail"
            placeholder="Pesquisar por e-mail"
            isClearable
            value={get.email || ""}
            onChange={(e) => set.email(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            label="Status"
            placeholder="Selecione o status"
            options={isActiveOptions}
            isClearable
            className="w-full"
            value={get.isActive === null ? "" : String(get.isActive)}
            onChange={(value) =>
              set.isActive(value === "" ? null : value === "true")
            }
          />

          <Select
            label="Role (Função)"
            placeholder="Selecione a role"
            options={roleOptions}
            className="w-full"
            isClearable
            value={!get.role ? "" : String(get.role)}
            onChange={(value) =>
              set.role(value === "" ? null : (value as RoleEnum))
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <Select
            label="Tipos de Usuários"
            placeholder="Selecione o tipo de usuário"
            options={isTestOptions}
            className="w-full"
            isClearable
            value={get.isTest === null ? "" : String(get.isTest)}
            onChange={(value) =>
              set.isTest(value === "" ? null : value === "true")
            }
          />
        </div>
      </div>
    </Drawer>
  );
};
