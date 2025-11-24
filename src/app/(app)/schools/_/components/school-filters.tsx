"use client";

import Drawer from "@/components/drawer";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { useSchoolsContext } from "../contexts/schools.context";

export function SchoolFilters() {
  const { get, set } = useSchoolsContext();

  const statusOptions = [
    { label: "Ativas", value: "true" },
    { label: "Inativas", value: "false" },
  ];

  return (
    <Drawer title="Filtros de Escolas" label="Filtros" size="lg">
      <div className="space-y-6">
        <Input
          className="w-full"
          label="Nome da escola"
          placeholder="Pesquisar por nome"
          isClearable
          value={get.name || ""}
          onChange={(e) => set.name(e.target.value)}
        />

        <Select
          label="Status"
          placeholder="Selecione o status"
          options={statusOptions}
          className="w-full"
          isClearable
          value={get.isActive === null ? "" : String(get.isActive)}
          onChange={(value) =>
            set.isActive(value === "" ? null : value === "true")
          }
        />
      </div>
    </Drawer>
  );
}
