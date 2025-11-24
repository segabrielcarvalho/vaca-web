"use client";

import { Badge } from "@/components/badge";
import { Table } from "@/components/table";
import { Pagination } from "@/components/pagination";
import { useMemo } from "react";
import { useSchoolsContext } from "../contexts/schools.context";

export function SchoolTable() {
  const { schools, get, set } = useSchoolsContext();

  const headers = ["Nome", "Status", "Criada em"];
  const total = schools.data?.listSchools.count ?? 0;

  const rows = useMemo(
    () =>
      schools.data?.listSchools.rows.map((school) => ({
        title: `Cursos da escola ${school.name}`,
        href: `/schools/${school.id}/courses`,
        cells: [
          <div key={school.id} className="flex flex-col gap-1">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {school.name}
            </span>
            {school.description && (
              <span className="text-sm text-zinc-500 line-clamp-2">
                {school.description}
              </span>
            )}
          </div>,
          <Badge color={school.isActive ? "green" : "rose"}>
            {school.isActive ? "Ativa" : "Inativa"}
          </Badge>,
          <time
            dateTime={school.createdAt}
            className="text-sm text-zinc-500 dark:text-zinc-300"
          >
            {new Date(school.createdAt).toLocaleDateString("pt-BR")}
          </time>,
        ],
      })) ?? [],
    [schools.data?.listSchools.rows]
  );

  if (total === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
        Nenhuma escola encontrada.
      </p>
    );
  }

  return (
    <>
      <Table headers={headers} rows={rows} striped total={total} />

      <Pagination
        page={get.pageNumber || 1}
        pageSize={get.pageSize || 10}
        setPage={(page) => set.pageNumber(page)}
        totalArraySize={total}
      />
    </>
  );
}
