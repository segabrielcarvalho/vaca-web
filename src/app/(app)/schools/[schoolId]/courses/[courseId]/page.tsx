"use client";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { gql, useSuspenseQuery } from "@apollo/client";
import {
  type CourseObject,
  SortOrder,
  useListKlassesByCourseSuspenseQuery,
} from "@generated/hooks";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { use } from "react";
import { CourseHeader } from "./_/components/course-header";

type PageProps = {
  params: Promise<{ schoolId: string; courseId: string }>;
};

type CourseDetailsData = Pick<
  CourseObject,
  | "id"
  | "name"
  | "description"
  | "isActive"
  | "schoolId"
  | "coordinatorId"
  | "createdAt"
  | "updatedAt"
>;

type GetCourseQuery = { getCourse: CourseDetailsData };
type GetCourseQueryVariables = { id: string };

const GET_COURSE_QUERY: TypedDocumentNode<
  GetCourseQuery,
  GetCourseQueryVariables
> = gql`
  query GetCourse($id: String!) {
    getCourse(id: $id) {
      id
      name
      description
      isActive
      schoolId
      coordinatorId
      createdAt
      updatedAt
    }
  }
`;

export default function CourseDetailsPage({ params }: PageProps) {
  const { schoolId, courseId } = use(params);
  return <CourseDetails schoolId={schoolId} courseId={courseId} />;
}

function CourseDetails({
  schoolId,
  courseId,
}: {
  schoolId: string;
  courseId: string;
}) {
  const { data } = useSuspenseQuery(GET_COURSE_QUERY, {
    variables: { id: courseId },
    fetchPolicy: "network-only",
  });

  const course = data.getCourse;
  if (!course) return null;
  const klassesQuery = useListKlassesByCourseSuspenseQuery({
    fetchPolicy: "network-only",
    variables: {
      where: { AND: [{ courseId: { equals: courseId } }] },
      take: 1,
      skip: 0,
      orderBy: { createdAt: SortOrder.Desc },
    },
  });
  const totalKlasses = klassesQuery.data?.listKlasses.count ?? 0;

  const createdAt = new Date(course.createdAt).toLocaleDateString("pt-BR");
  const updatedAt = new Date(course.updatedAt).toLocaleDateString("pt-BR");

  return (
    <div className="space-y-10">
      <CourseHeader schoolId={schoolId} courseId={courseId} />

      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
              Curso
            </p>
            <h2 className="text-2xl font-semibold text-zinc-900">
              {course.name}
            </h2>
            <p className="text-sm text-zinc-600">
              Gerencie as turmas vinculadas e consulte informações do curso.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge color={course.isActive ? "green" : "rose"}>
              {course.isActive ? "Ativo" : "Inativo"}
            </Badge>
            <Button color="light" outline href={`/schools/${schoolId}/courses`}>
              Voltar para cursos
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard label="Turmas" value={totalKlasses} />
          <InfoCard label="Criado em" value={createdAt} />
          <InfoCard label="Atualizado em" value={updatedAt} />
          <InfoCard
            label="Coordenador"
            value={course.coordinatorId ? "Atribuído" : "Não definido"}
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl bg-white p-5 space-y-3">
          <h3 className="text-base font-semibold text-zinc-900">Detalhes</h3>
          <p className="text-sm text-zinc-700">
            {course.description ||
              "Nenhuma descrição cadastrada para este curso."}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <DetailItem
              label="Status"
              value={course.isActive ? "Ativo" : "Inativo"}
            />
            <DetailItem label="ID do curso" value={course.id} isCode />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-yellow-100 bg-yellow-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
      <p className="text-xs font-semibold uppercase tracking-wide text-yellow-800 dark:text-yellow-200">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
        {value}
      </p>
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
