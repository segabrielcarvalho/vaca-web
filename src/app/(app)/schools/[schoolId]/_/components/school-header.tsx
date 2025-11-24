"use client";

import { Badge } from "@/components/badge";
import {
  SortOrder,
  useGetSchoolSuspenseQuery,
  useListCoursesBySchoolSuspenseQuery,
} from "@generated/hooks";
import {
  CalendarIcon,
  ChevronRightIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SchoolHeaderProps = {
  schoolId: string;
};

export function SchoolHeader({ schoolId }: SchoolHeaderProps) {
  const pathname = usePathname();
  const { data } = useGetSchoolSuspenseQuery({ variables: { id: schoolId } });
  const school = data?.getSchool;

  const { data: coursesData } = useListCoursesBySchoolSuspenseQuery({
    variables: {
      where: { schoolId: { equals: schoolId } },
      orderBy: { createdAt: SortOrder.Desc },
      take: 1,
    },
  });

  const courseCount = coursesData?.listCourses.count ?? 0;
  const baseHref = `/schools/${schoolId}`;
  const tabs = [
    { href: baseHref, label: "Visão Geral", strict: true },
    { href: `${baseHref}/courses`, label: "Cursos", strict: false },
    { href: `${baseHref}/settings`, label: "Configurações", strict: false },
  ];

  if (!school) {
    return null;
  }

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
            <span className="font-medium text-zinc-700">{school.name}</span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            {school.name}
          </h1>
          {school.description && (
            <p className="text-sm text-zinc-500">{school.description}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge color={school.isActive ? "green" : "rose"}>
            {school.isActive ? "Ativa" : "Inativa"}
          </Badge>

          <div className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700">
            <CalendarIcon className="size-4 text-yellow-600" />
            {new Date(school.createdAt).toLocaleDateString("pt-BR")}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
            <Squares2X2Icon className="size-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Cursos cadastrados
            </p>
            <p className="text-lg font-semibold text-zinc-900">{courseCount}</p>
          </div>
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
