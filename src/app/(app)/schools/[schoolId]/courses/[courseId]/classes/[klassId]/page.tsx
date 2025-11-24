"use client";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { gql, useSuspenseQuery } from "@apollo/client";
import type { CourseObject, KlassObject } from "@generated/hooks";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { use } from "react";

type PageProps = {
  params: Promise<{ schoolId: string; courseId: string; klassId: string }>;
};

type KlassDetails = Pick<
  KlassObject,
  | "id"
  | "name"
  | "description"
  | "isActive"
  | "courseId"
  | "teacherId"
  | "createdAt"
  | "updatedAt"
> & {
  Course?: Pick<CourseObject, "id" | "name" | "schoolId"> | null;
};

type GetKlassQuery = { getKlass: KlassDetails };
type GetKlassQueryVariables = { id: string };

const GET_KLASS_QUERY: TypedDocumentNode<
  GetKlassQuery,
  GetKlassQueryVariables
> = gql`
  query GetKlass($id: String!) {
    getKlass(id: $id) {
      id
      name
      description
      isActive
      courseId
      teacherId
      createdAt
      updatedAt
      Course {
        id
        name
        schoolId
      }
    }
  }
`;

export default function KlassDetailsPage({ params }: PageProps) {
  const { schoolId, courseId, klassId } = use(params);
  return (
    <KlassDetails schoolId={schoolId} courseId={courseId} klassId={klassId} />
  );
}

function KlassDetails({
  schoolId,
  courseId,
  klassId,
}: {
  schoolId: string;
  courseId: string;
  klassId: string;
}) {
  const { data } = useSuspenseQuery(GET_KLASS_QUERY, {
    variables: { id: klassId },
    fetchPolicy: "network-only",
  });

  const klass = data.getKlass;
  if (!klass) return null;

  const createdAt = new Date(klass.createdAt).toLocaleDateString("pt-BR");
  const updatedAt = new Date(klass.updatedAt).toLocaleDateString("pt-BR");

  const teacherInfo = klass.teacherId ?? "Não atribuído";
  const courseName = klass.Course?.name ?? "Sem curso associado";

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
                Detalhes da turma
              </p>
              <h2 className="text-2xl font-semibold text-zinc-900">
                {klass.name}
              </h2>
              <p className="text-sm text-zinc-600">
                Turma vinculada ao curso {courseName.toLowerCase()}.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge color={klass.isActive ? "green" : "rose"}>
                {klass.isActive ? "Ativa" : "Inativa"}
              </Badge>
              <Button
                color="light"
                outline
                href={`/schools/${schoolId}/courses/${courseId}`}
              >
                Voltar para o curso
              </Button>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-zinc-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Descrição
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              {klass.description ||
                "Nenhuma descrição cadastrada para esta turma."}
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 rounded-2xl bg-white p-5 lg:col-span-2">
            <h3 className="text-base font-semibold text-zinc-900">Contexto</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem label="Curso" value={courseName} />
              <DetailItem
                label="Professor responsável"
                value={teacherInfo}
                isCode={!klass.teacherId}
              />
              <DetailItem
                label="Status"
                value={klass.isActive ? "Ativa" : "Inativa"}
              />
              <DetailItem label="ID do curso" value={klass.courseId} isCode />
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-5">
            <h3 className="text-base font-semibold text-zinc-900">Auditoria</h3>
            <div className="space-y-3">
              <DetailItem label="ID da turma" value={klass.id} isCode />
              <DetailItem label="Criada em" value={createdAt} />
              <DetailItem label="Atualizada em" value={updatedAt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  isCode = false,
}: {
  label: string;
  value: string;
  isCode?: boolean;
}) {
  return (
    <div className="rounded-xl border border-zinc-100 bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      {isCode ? (
        <code className="mt-1 inline-block rounded-md bg-zinc-50 px-2 py-1 font-mono text-xs text-zinc-700">
          {value}
        </code>
      ) : (
        <p className="mt-1 text-sm text-zinc-800">{value}</p>
      )}
    </div>
  );
}
