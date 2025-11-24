"use client";

import { Badge } from "@/components/badge";
import { Input } from "@/components/input";
import { Pagination } from "@/components/pagination";
import { Select } from "@/components/select";
import { Table } from "@/components/table";
import useUrlFilter from "@/hooks/useUrlFilter";
import {
  CreateKlassDialog,
  type KlassSummary,
} from "./_/components/create-klass-dialog";
import {
  ListKlassesInput,
  ListKlassesByCourseQueryVariables,
  QueryMode,
  SortOrder,
  useListCoursesBySchoolSuspenseQuery,
  useListKlassesByCourseSuspenseQuery,
} from "@generated/hooks";
import { use, useMemo } from "react";

type PageProps = {
  params: Promise<{ schoolId: string }>;
};

export default function SchoolClassesPage({ params }: PageProps) {
  const { schoolId } = use(params);
  return <SchoolClasses schoolId={schoolId} />;
}

function SchoolClasses({ schoolId }: { schoolId: string }) {
  const [courseId, setCourseId] = useUrlFilter<string>({ name: "course_id" });
  const [klassSearch, setKlassSearch] = useUrlFilter<string>({
    name: "klass_search",
    delay: 300,
  });
  const [pageNumber, setPageNumber] = useUrlFilter<number>({
    name: "page_number",
  });
  const [pageSize] = useUrlFilter<number>({ name: "page_size" });

  const coursesQuery = useListCoursesBySchoolSuspenseQuery({
    variables: {
      where: { schoolId: { equals: schoolId } },
      orderBy: { createdAt: SortOrder.Desc },
    },
  });

  const selectedCourseId = useMemo(() => {
    if (courseId) return courseId;
    const firstCourse = coursesQuery.data?.listCourses.rows[0];
    return firstCourse?.id ?? null;
  }, [courseId, coursesQuery.data?.listCourses.rows]);

  const klassesVariables = useMemo<ListKlassesByCourseQueryVariables | null>(
    () => {
      if (!selectedCourseId) return null;

      const conditions: ListKlassesInput[] = [
        { courseId: { equals: selectedCourseId } },
      ];

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
    },
    [selectedCourseId, klassSearch, pageNumber, pageSize]
  );

  const klassesQuery = useListKlassesByCourseSuspenseQuery({
    fetchPolicy: "network-only",
    variables: klassesVariables ?? {},
    skip: !klassesVariables,
  });

  const coursesOptions =
    coursesQuery.data?.listCourses.rows.map((course) => ({
      value: course.id,
      label: course.name,
    })) ?? [];

  const totalCourses = coursesQuery.data?.listCourses.count ?? 0;
  const totalKlasses = klassesQuery.data?.listKlasses.count ?? 0;
  const hasCourseSelected = Boolean(selectedCourseId);
  const noCourses = totalCourses === 0;

  const handleKlassCreated = (klass: KlassSummary) => {
    setCourseId(klass.courseId);
    setPageNumber(1);
    klassesQuery.refetch?.();
  };

  const klassRows =
    klassesQuery.data?.listKlasses.rows.map((klass) => ({
      href: `/schools/${schoolId}/courses/${klass.courseId}/classes/${klass.id}`,
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
        <span className="text-sm text-zinc-700 dark:text-zinc-300">
          {klass.Course?.name || "Sem curso"}
        </span>,
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
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
              Turmas
            </p>
            <h2 className="text-xl font-semibold text-zinc-900">
              Organização das turmas
            </h2>
            <p className="text-sm text-zinc-600">
              Busque, crie e navegue pelos detalhes de cada turma desta escola.
            </p>
          </div>

          <CreateKlassDialog
            courseOptions={coursesOptions}
            defaultCourseId={selectedCourseId}
            onCreated={handleKlassCreated}
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            label="Cursos disponíveis"
            value={totalCourses}
            caption="para associar turmas"
          />
          <InfoCard
            label="Turmas encontradas"
            value={totalKlasses}
            caption={
              hasCourseSelected ? "considerando o filtro atual" : "na escola"
            }
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Select
            label="Curso"
            placeholder="Selecione um curso"
            options={coursesOptions}
            value={selectedCourseId ?? ""}
            onChange={(value) => {
              setCourseId((value as string) || null);
              setPageNumber(1);
            }}
            disabled={noCourses}
          />

          <Input
            label="Buscar turmas"
            placeholder="Digite o nome da turma"
            isClearable
            value={klassSearch || ""}
            onChange={(event) => {
              setKlassSearch(event.target.value);
              setPageNumber(1);
            }}
            disabled={!hasCourseSelected}
          />
        </div>

        {noCourses && (
          <p className="text-sm text-zinc-600">
            Cadastre um curso para começar a adicionar turmas nesta escola.
          </p>
        )}
      </div>

      <div className="rounded-2xl bg-white p-5">
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
              page={pageNumber || 1}
              pageSize={pageSize || 10}
              setPage={(page) => setPageNumber(page)}
              totalArraySize={totalKlasses}
            />
          </>
        )}
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
