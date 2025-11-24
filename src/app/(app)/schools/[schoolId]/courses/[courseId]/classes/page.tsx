"use client";

import { Badge } from "@/components/badge";
import { Input } from "@/components/input";
import { Pagination } from "@/components/pagination";
import { Table } from "@/components/table";
import useUrlFilter from "@/hooks/useUrlFilter";
import {
  ListKlassesByCourseQueryVariables,
  ListKlassesInput,
  QueryMode,
  SortOrder,
  useListKlassesByCourseSuspenseQuery,
} from "@generated/hooks";
import { use, useMemo } from "react";
import { CreateKlassDialog } from "../../../classes/_/components/create-klass-dialog";
import { CourseHeader } from "../_/components/course-header";

type PageProps = {
  params: Promise<{ schoolId: string; courseId: string }>;
};

export default function CourseClassesPage({ params }: PageProps) {
  const { schoolId, courseId } = use(params);
  return <CourseClasses schoolId={schoolId} courseId={courseId} />;
}

function CourseClasses({
  schoolId,
  courseId,
}: {
  schoolId: string;
  courseId: string;
}) {
  const [klassSearch, setKlassSearch] = useUrlFilter<string>({
    name: "klass_search",
    delay: 300,
  });
  const [pageNumber, setPageNumber] = useUrlFilter<number>({
    name: "page_number",
  });
  const [pageSize] = useUrlFilter<number>({ name: "page_size" });

  const klassesVariables = useMemo<ListKlassesByCourseQueryVariables>(() => {
    const conditions: ListKlassesInput[] = [{ courseId: { equals: courseId } }];

    if (klassSearch?.trim()) {
      conditions.push({
        name: { contains: klassSearch.trim(), mode: QueryMode.Insensitive },
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
  }, [courseId, klassSearch, pageNumber, pageSize]);

  const klassesQuery = useListKlassesByCourseSuspenseQuery({
    fetchPolicy: "network-only",
    variables: klassesVariables,
  });

  const totalKlasses = klassesQuery.data?.listKlasses.count ?? 0;
  const klassRows =
    klassesQuery.data?.listKlasses.rows.map((klass) => ({
      href: `/schools/${schoolId}/courses/${courseId}/classes/${klass.id}`,
      title: `Abrir detalhes da turma ${klass.name}`,
      cells: [
        <div key={klass.id} className="flex flex-col gap-1">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {klass.name}
          </span>
          {klass.description && (
            <span className="text-sm text-zinc-500 line-clamp-2">
              {klass.description}
            </span>
          )}
        </div>,
        <Badge color={klass.isActive ? "green" : "rose"}>
          {klass.isActive ? "Ativa" : "Inativa"}
        </Badge>,
        <time
          dateTime={klass.createdAt}
          className="text-sm text-zinc-500 dark:text-zinc-300"
        >
          {new Date(klass.createdAt).toLocaleDateString("pt-BR")}
        </time>,
      ],
    })) ?? [];

  return (
    <div className="space-y-10">
      <CourseHeader schoolId={schoolId} courseId={courseId} />

      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
                Turmas
              </p>
              <h2 className="text-xl font-semibold text-zinc-900">
                Turmas do curso
              </h2>
              <p className="text-sm text-zinc-600">
                Crie e gerencie as turmas associadas a este curso.
              </p>
            </div>
            <CreateKlassDialog
              courseId={courseId}
              onCreated={() => klassesQuery.refetch()}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
            <Input
              label="Buscar turmas"
              placeholder="Digite o nome da turma"
              isClearable
              value={klassSearch || ""}
              onChange={(event) => {
                setKlassSearch(event.target.value);
                setPageNumber(1);
              }}
            />
          </div>

          {totalKlasses === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Nenhuma turma cadastrada para este curso.
            </p>
          ) : (
            <>
              <Table
                headers={["Turma", "Status", "Criada em"]}
                rows={klassRows}
                striped
                total={totalKlasses}
              />

              <Pagination
                page={pageNumber || 1}
                pageSize={pageSize || 10}
                setPage={(page) => setPageNumber(page)}
                totalArraySize={totalKlasses}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
