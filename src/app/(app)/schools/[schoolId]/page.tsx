"use client";

import { Badge } from "@/components/badge";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { useGetSchoolSuspenseQuery } from "@generated/hooks";
import Link from "next/link";
import { use } from "react";
import { SchoolHeader } from "./_/components/school-header";

type PageProps = {
  params: Promise<{ schoolId: string }>;
};

export default function SchoolOverviewPage({ params }: PageProps) {
  const { schoolId } = use(params);

  const { data } = useGetSchoolSuspenseQuery({
    fetchPolicy: "network-only",
    variables: { id: schoolId },
  });
  const school = data?.getSchool;

  if (!school) return null;

  return (
    <div className="space-y-10">
      <SchoolHeader schoolId={schoolId} />

      <div className="space-y-8">
      <div className="rounded-2xl ">
        <p className="text-sm font-medium uppercase tracking-wide text-yellow-700">
          Visão geral
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          {school.name}
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-zinc-700">
          {school.description ||
            "Ajuste detalhes e diretoria na aba Configurações."}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge color={school.isActive ? "green" : "rose"}>
            {school.isActive ? "Ativa" : "Inativa"}
          </Badge>
          <span className="text-xs text-zinc-600">
            Criada em {new Date(school.createdAt).toLocaleDateString("pt-BR")}
          </span>
          <span className="text-xs text-zinc-600">
            Atualizada em{" "}
            {new Date(school.updatedAt).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4">
          <h3 className="text-sm font-semibold text-zinc-900">Identificação</h3>
          <div className="mt-3 space-y-2 text-sm text-zinc-700">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-800">ID:</span>
              <code className="rounded-md bg-zinc-50 px-2 py-1 font-mono text-xs text-zinc-700">
                {school.id}
              </code>
            </div>
            <div>
              <p className="text-xs text-zinc-500">
                Edite detalhes na aba Configurações.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4">
          <h3 className="text-sm font-semibold text-zinc-900">Resumo</h3>
          <div className="mt-3 space-y-2 text-sm text-zinc-700">
            <div className="flex items-center justify-between">
              <span>Status</span>
              <span className="font-semibold">
                {school.isActive ? "Ativa" : "Inativa"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Diretor</span>
              <span className="font-semibold text-zinc-800">
                {school.directorId ? "Definido" : "Não configurado"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5">
        <h3 className="text-base font-semibold text-zinc-900">Notas rápidas</h3>
        <p className="mt-2 text-sm text-zinc-700">
          Use esta página apenas para consultar informações gerais. Todas as
          alterações agora ficam concentradas em{" "}
          <Link
            href={`/schools/${schoolId}/settings`}
            className="font-semibold text-yellow-700 hover:underline"
          >
            Configurações
          </Link>
          .
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Input
            label="Descrição curta"
            readOnly
            value={school.description || "Sem descrição cadastrada."}
          />
          <Textarea
            label="Observações"
            rows={3}
            value="Nenhuma ação disponível aqui. Vá para Configurações para editar."
            readOnly
          />
        </div>
      </div>
      </div>
    </div>
  );
}
