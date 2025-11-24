"use client";

import { Button } from "@/components/button";
import { usePathname } from "next/navigation";

type ExamShellProps = {
  exam: { id: string; title: string; isActive: boolean };
  params: {
    schoolId: string;
    courseId: string;
    klassId: string;
    examId: string;
  };
  children: React.ReactNode;
};

const tabs = [
  { slug: "gabarito", label: "Gabarito" },
  { slug: "correcoes", label: "Correções" },
  { slug: "visao-geral", label: "Visão Geral" },
  { slug: "configuracoes", label: "Configurações" },
];

export function ExamShell({ exam, params, children }: ExamShellProps) {
  const pathname = usePathname();
  const base = `/schools/${params.schoolId}/courses/${params.courseId}/classes/${params.klassId}/exams/${params.examId}`;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
              Prova
            </p>
            <h1 className="text-2xl font-semibold text-zinc-900">
              {exam.title}
            </h1>
            <p className="text-sm text-zinc-600">
              Gerencie gabarito, correções e configurações desta prova.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-3">
          {tabs.map((tab) => {
            const href = `${base}/${tab.slug}`;
            const active = pathname?.startsWith(href);
            return (
              <Button
                key={tab.slug}
                color={active ? "yellow" : "light"}
                href={href}
                size="sm"
                outline={!active}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
