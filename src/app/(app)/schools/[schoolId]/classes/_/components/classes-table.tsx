import { Pagination } from "@/components/pagination";
import { Table } from "@/components/table";
import type { ReactNode } from "react";

type KlassRow = {
  href?: string;
  title?: string;
  cells: ReactNode[];
};

type ClassesTableProps = {
  klassRows: KlassRow[];
  noCourses: boolean;
  hasCourseSelected: boolean;
  totalKlasses: number;
  pageNumber: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function ClassesTable({
  klassRows,
  noCourses,
  hasCourseSelected,
  totalKlasses,
  pageNumber,
  pageSize,
  onPageChange,
}: ClassesTableProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
      {noCourses ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Nenhum curso cadastrado para esta escola ainda.
        </p>
      ) : !hasCourseSelected ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Selecione um curso para visualizar as turmas.
        </p>
      ) : totalKlasses === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Nenhuma turma encontrada para este curso.
        </p>
      ) : (
        <>
          <Table
            headers={["Turma", "Curso", "Status", "Criada em"]}
            rows={klassRows}
            striped
            total={totalKlasses}
          />

          <Pagination
            page={pageNumber}
            pageSize={pageSize}
            setPage={onPageChange}
            totalArraySize={totalKlasses}
          />
        </>
      )}
    </div>
  );
}
