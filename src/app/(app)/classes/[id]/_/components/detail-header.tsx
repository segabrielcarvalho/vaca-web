"use client";

import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";

type DetailHeaderProps = {
  classId: string;
};

type MetricCard = {
  id: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  helpText: string;
};

const metricCards: MetricCard[] = [
  {
    id: "active-scans",
    icon: BuildingLibraryIcon,
    label: "Scans aguardando correção",
    value: "62 folhas",
    helpText: "Arquivadas há menos de 2 horas",
  },
  {
    id: "checked-omr",
    icon: AcademicCapIcon,
    label: "Correções finalizadas",
    value: "148 avaliações",
    helpText: "Média geral 8,4 • Últimos 30 dias",
  },
  {
    id: "pending-review",
    icon: UserGroupIcon,
    label: "Pendências para revisão",
    value: "5 alunos",
    helpText: "Respostas anuladas aguardando análise humana",
  },
  {
    id: "calendar",
    icon: CalendarIcon,
    label: "Próxima janela de aplicação",
    value: "Avaliação ENEM Simulado",
    helpText: "Digitalização prevista para 18 abr",
  },
];

export function DetailHeader({ classId }: DetailHeaderProps) {
  const pathname = usePathname();
  const baseHref = `/classes/${classId}`;

  const tabs = [
    { href: baseHref, label: "Visão Geral" },
    { href: `${baseHref}/assessments`, label: "Avaliações" },
    { href: `${baseHref}/students`, label: "Estudantes" },
    { href: `${baseHref}/settings`, label: "Configurações" },
  ];

  return (
    <header className="space-y-6">
      <nav aria-label="Breadcrumb" className="flex">
        <ol className="flex items-center gap-4 text-sm text-zinc-500">
          <li>
            <Link
              href="/classes"
              className="font-medium text-zinc-500 transition hover:text-zinc-700"
            >
              Turmas
            </Link>
          </li>
          <li className="flex items-center gap-4">
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-zinc-400"
            />
            <span className="font-medium text-zinc-700">
              Turma {classId.toUpperCase()}
            </span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Turma ENEM Intensivo ({classId.toUpperCase()})
          </h1>
          <p className="text-sm text-zinc-500">
            Correção automática de avaliações objetivas com OMR, geração de
            relatórios por competência e acompanhamento em tempo real do fluxo
            de digitalização.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Ativa
          </span>
          <span className="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-700">
            2024.1
          </span>
        </div>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-[0_18px_60px_-35px_rgba(15,23,42,0.2)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {metric.label}
                </dt>
                <dd className="text-sm font-medium text-zinc-900">
                  {metric.value}
                </dd>
                <p className="text-xs text-zinc-500">{metric.helpText}</p>
              </div>
            </div>
          );
        })}
      </dl>

      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== baseHref && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "relative rounded-lg px-3 py-2 text-sm font-medium transition mb-2",
                isActive
                  ? "bg-yellow-400 text-zinc-900 shadow-[0_25px_65px_-40px_rgba(250,204,21,0.75)]"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-yellow-400" />
              )}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
