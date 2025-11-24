"use client";

import { Badge } from "@/components/badge";
import { Input } from "@/components/input";
import { Pagination } from "@/components/pagination";
import { Table } from "@/components/table";
import useUrlFilter from "@/hooks/useUrlFilter";
import {
  ListCoursesInput,
  QueryMode,
  SortOrder,
  useListCoursesBySchoolSuspenseQuery,
} from "@generated/hooks";
import { use, useMemo } from "react";
import { CreateCourseDialog } from "./_/components/create-course-dialog";
import { SchoolHeader } from "../_/components/school-header";

type PageProps = {
  params: Promise<{ schoolId: string }>;
};

export default function SchoolCoursesPage({ params }: PageProps) {
  const { schoolId } = use(params);
  return <SchoolCourses schoolId={schoolId} />;
}

function SchoolCourses({ schoolId }: { schoolId: string }) {
  const [courseSearch, setCourseSearch] = useUrlFilter<string>({
    name: "course_search",
    delay: 300,
  });
  const [pageNumber, setPageNumber] = useUrlFilter<number>({
    name: "page_number",
  });
  const [pageSize] = useUrlFilter<number>({ name: "page_size" });

  const coursesVariables = useMemo(() => {
    const conditions: ListCoursesInput[] = [{ schoolId: { equals: schoolId } }];

    if (courseSearch?.trim()) {
      conditions.push({
        name: { contains: courseSearch.trim(), mode: QueryMode.Insensitive },
      });
    }

    const take = Math.max(pageSize ?? 10, 1);
    const currentPage = Math.max(pageNumber ?? 1, 1);
    const skip = (currentPage - 1) * take;

    return {
      where: { AND: conditions },
      take,
      skip,
      orderBy: { createdAt: SortOrder.Desc },
    };
  }, [courseSearch, pageNumber, pageSize, schoolId]);

  const coursesQuery = useListCoursesBySchoolSuspenseQuery({
    fetchPolicy: "network-only",
    variables: coursesVariables,
  });

  const totalCourses = coursesQuery.data?.listCourses.count ?? 0;
  const refetchCourses = coursesQuery.refetch;

  const courseRows =
    coursesQuery.data?.listCourses.rows.map((course) => ({
      href: `/schools/${schoolId}/courses/${course.id}`,
      title: `Abrir curso ${course.name}`,
      cells: [
        <div key={course.id} className="flex flex-col gap-1">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {course.name}
          </span>
          {course.description && (
            <span className="text-sm text-zinc-500 line-clamp-2">
              {course.description}
            </span>
          )}
        </div>,
        <Badge color={course.isActive ? "green" : "rose"}>
          {course.isActive ? "Ativo" : "Inativo"}
        </Badge>,
        <time
          dateTime={course.createdAt}
          className="text-sm text-zinc-500 dark:text-zinc-300"
        >
          {new Date(course.createdAt).toLocaleDateString("pt-BR")}
        </time>,
      ],
    })) ?? [];

  return (
    <div className="space-y-10">
      <SchoolHeader schoolId={schoolId} />

      <div className="space-y-6">
      <div className="rounded-2xl bg-white p-5 ">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
              Cursos
            </p>
            <h2 className="text-xl font-semibold text-zinc-900">
              Cursos da escola
            </h2>
            <p className="text-sm text-zinc-600">
              Acesse os detalhes dos cursos e gerencie as turmas de cada um.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CreateCourseDialog
              schoolId={schoolId}
              onCreated={() => {
                setPageNumber(1);
                refetchCourses?.();
              }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
          <Input
            label="Buscar cursos"
            placeholder="Digite o nome do curso"
            isClearable
            value={courseSearch || ""}
            onChange={(event) => {
              setCourseSearch(event.target.value);
              setPageNumber(1);
            }}
          />
        </div>

        {totalCourses === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Nenhum curso cadastrado para esta escola.
          </p>
        ) : (
          <>
            <Table
              headers={["Curso", "Status", "Criado em"]}
              rows={courseRows}
              striped
              total={totalCourses}
            />

            <Pagination
              page={pageNumber || 1}
              pageSize={pageSize || 10}
              setPage={(page) => setPageNumber(page)}
              totalArraySize={totalCourses}
            />
          </>
        )}
      </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: number;
  caption?: string;
}) {
  return (
    <div className="rounded-xl border border-yellow-100 bg-yellow-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
      <p className="text-xs font-semibold uppercase tracking-wide text-yellow-800 dark:text-yellow-200">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">
        {value}
      </p>
      {caption && (
        <p className="text-xs text-zinc-600 dark:text-zinc-300">{caption}</p>
      )}
    </div>
  );
}
