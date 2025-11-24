import { Pagination } from "@/components/pagination";
import { Table } from "@/components/table";
import type { ReactNode } from "react";

type CourseRow = {
  href?: string;
  title?: string;
  cells: ReactNode[];
};

type CoursesTableProps = {
  rows: CourseRow[];
  totalCourses: number;
  pageNumber: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function CoursesTable({
  rows,
  totalCourses,
  pageNumber,
  pageSize,
  onPageChange,
}: CoursesTableProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
      {totalCourses === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Nenhum curso cadastrado para esta escola.
        </p>
      ) : (
        <>
          <Table
            headers={["Curso", "Status", "Criado em"]}
            rows={rows}
            striped
            total={totalCourses}
          />

          <Pagination
            page={pageNumber}
            pageSize={pageSize}
            setPage={onPageChange}
            totalArraySize={totalCourses}
          />
        </>
      )}
    </div>
  );
}
