"use client";

import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  ChevronRightIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { CalendarIcon } from "@heroicons/react/24/outline";

type Highlight = {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
};

const highlights: Highlight[] = [
  {
    id: "active-classes",
    icon: UsersIcon,
    label: "12 turmas ativas",
  },
  {
    id: "teachers",
    icon: AcademicCapIcon,
    label: "24 professores",
  },
  {
    id: "campus",
    icon: BuildingLibraryIcon,
    label: "3 unidades",
  },
  {
    id: "calendar",
    icon: CalendarIcon,
    label: "Próximos eventos",
  },
];

export function ClassesHeader() {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <nav aria-label="Breadcrumb" className="flex">
          <ol className="flex items-center space-x-4 text-sm text-zinc-500">
            <li>
              <a
                href="/home"
                className="font-medium text-zinc-500 transition hover:text-zinc-700"
              >
                Início
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <ChevronRightIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-zinc-400"
              />
              <span className="font-medium text-zinc-700">Turmas</span>
            </li>
          </ol>
        </nav>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Turmas
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Acompanhe a saúde das turmas, professores e calendários em todas
              as unidades cadastradas.
            </p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:-mx-1 lg:flex lg:flex-wrap">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 shadow-[0_14px_55px_-35px_rgba(15,23,42,0.25)] lg:mx-1 lg:w-auto"
              >
                <span className="rounded-full bg-yellow-100 p-1 text-yellow-600">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="font-medium">{item.label}</span>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}

