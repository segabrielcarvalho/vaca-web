"use client";

import { Badge } from "@/components/badge";
import {
  useGetCourseSuspenseQuery,
  useGetKlassSuspenseQuery,
} from "@/graphql/__generated__/hooks";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";

type ClassHeaderProps = {
  schoolId: string;
  courseId: string;
  klassId: string;
};

export function ClassHeader({ schoolId, courseId, klassId }: ClassHeaderProps) {
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();
  const { data: klassData } = useGetKlassSuspenseQuery({
    variables: { id: klassId },
  });
  const { data: courseData } = useGetCourseSuspenseQuery({
    variables: { id: courseId },
  });

  const klass = klassData?.getKlass;
  const course = courseData?.getCourse;

  const isExamDetailPage = segments[0] === "exams" && segments.length > 1;

  if (!klass || !course || isExamDetailPage) return null;

  const baseHref = `/schools/${schoolId}/courses/${courseId}/classes/${klassId}`;
  const tabs = [
    { href: baseHref, label: "Visão Geral", strict: true },
    { href: `/schools/${schoolId}/courses/${courseId}/classes/${klassId}/exams`, label: "Provas", strict: false },
    { href: `/schools/${schoolId}/courses/${courseId}/classes/${klassId}/students`, label: "Alunos", strict: false },
  ];

  return (
    <header className="space-y-6">
      <nav aria-label="Breadcrumb" className="flex">
        <ol className="flex items-center gap-3 text-sm text-zinc-500">
          <li>
            <Link
              href="/schools"
              className="font-medium text-zinc-500 transition hover:text-zinc-700"
            >
              Escolas
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-zinc-400"
            />
            <Link
              href={`/schools/${schoolId}/courses`}
              className="font-medium text-zinc-500 transition hover:text-zinc-700"
            >
              Cursos
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-zinc-400"
            />
            <Link
              href={`/schools/${schoolId}/courses/${courseId}`}
              className="font-medium text-zinc-500 transition hover:text-zinc-700"
            >
              {course.name}
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-zinc-400"
            />
            <span className="font-medium text-zinc-700">
              Turma {klass.name}
            </span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            {klass.name}
          </h1>
          {klass.description && (
            <p className="text-sm text-zinc-500">{klass.description}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge color={klass.isActive ? "green" : "rose"}>
            {klass.isActive ? "Ativa" : "Inativa"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pb-1">
        {tabs.map((tab) => {
          const isActive = tab.strict
            ? pathname === tab.href
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "relative rounded-lg px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-yellow-400 text-zinc-900"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-yellow-500" />
              )}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
