"use client";

import { Badge } from "@/components/badge";
import useUrlFilter from "@/hooks/useUrlFilter";
import {
  ListCoursesInput,
  QueryMode,
  SortOrder,
  useListCoursesBySchoolSuspenseQuery,
} from "@generated/hooks";
import { useMemo } from "react";
import { SchoolHeader } from "../../_/components/school-header";
import { CoursesTable } from "./components/courses-table";

type CoursesScreenProps = { schoolId: string };

export function CoursesScreen({ schoolId }: CoursesScreenProps) {
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

  const safePageNumber = pageNumber || 1;
  const safePageSize = pageSize || 10;

  return (
    <div className="space-y-8">
      <SchoolHeader schoolId={schoolId} />

      <div className="space-y-6">
        <CoursesTable
          rows={courseRows}
          totalCourses={totalCourses}
          pageNumber={safePageNumber}
          pageSize={safePageSize}
          onPageChange={(page) => setPageNumber(page)}
        />
      </div>
    </div>
  );
}
