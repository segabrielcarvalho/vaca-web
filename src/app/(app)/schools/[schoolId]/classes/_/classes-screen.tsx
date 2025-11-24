"use client";

import { Badge } from "@/components/badge";
import useUrlFilter from "@/hooks/useUrlFilter";
import {
  ListKlassesInput,
  ListKlassesByCourseQueryVariables,
  QueryMode,
  SortOrder,
  useListCoursesBySchoolSuspenseQuery,
  useListKlassesByCourseSuspenseQuery,
} from "@generated/hooks";
import { useMemo } from "react";
import { ClassesHero } from "./components/classes-hero";
import { ClassesFilters } from "./components/classes-filters";
import { ClassesTable } from "./components/classes-table";
import type { KlassSummary } from "./components/create-klass-dialog";

type ClassesScreenProps = { schoolId: string };

export function ClassesScreen({ schoolId }: ClassesScreenProps) {
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

  const handleKlassCreated = (_klass?: KlassSummary) => {
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

  const safePageNumber = pageNumber || 1;
  const safePageSize = pageSize || 10;

  return (
    <div className="space-y-6">
      <ClassesHero
        totalCourses={totalCourses}
        totalKlasses={totalKlasses}
        hasCourseSelected={hasCourseSelected}
        coursesOptions={coursesOptions}
        selectedCourseId={selectedCourseId}
        onCourseChange={(value) => {
          setCourseId(value);
          setPageNumber(1);
        }}
        onCreated={handleKlassCreated}
      />

      <ClassesFilters
        coursesOptions={coursesOptions}
        selectedCourseId={selectedCourseId}
        klassSearch={klassSearch || ""}
        onCourseChange={(value) => {
          setCourseId(value);
          setPageNumber(1);
        }}
        onSearchChange={(value) => {
          setKlassSearch(value);
          setPageNumber(1);
        }}
        hasCourseSelected={hasCourseSelected}
        noCourses={noCourses}
      />

      <ClassesTable
        klassRows={klassRows}
        noCourses={noCourses}
        hasCourseSelected={hasCourseSelected}
        totalKlasses={totalKlasses}
        pageNumber={safePageNumber}
        pageSize={safePageSize}
        onPageChange={(page) => setPageNumber(page)}
      />
    </div>
  );
}
