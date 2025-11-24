"use client";

import { ExamShell } from "../_/components/exam-shell";
import { gql, useSuspenseQuery } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { use } from "react";

type PageProps = {
  params: Promise<{
    schoolId: string;
    courseId: string;
    klassId: string;
    examId: string;
  }>;
};

type ExamBasic = {
  id: string;
  title: string;
  description?: string | null;
  filePath: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type Query = { getExam: ExamBasic };

const QUERY: TypedDocumentNode<Query, { id: string }> = gql`
  query ExamOverview($id: String!) {
    getExam(id: $id) {
      id
      title
      description
      filePath
      isActive
      createdAt
      updatedAt
    }
  }
`;

export default function VisaoGeralPage({ params }: PageProps) {
  const { schoolId, courseId, klassId, examId } = use(params);
  const { data } = useSuspenseQuery(QUERY, { variables: { id: examId } });
  const exam = data.getExam;

  return (
    <ExamShell
      exam={{ id: exam.id, title: exam.title, isActive: exam.isActive }}
      params={{ schoolId, courseId, klassId, examId }}
    >
      <div className="rounded-2xl bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900">Visão Geral</h3>
        <p className="text-sm text-zinc-700 leading-relaxed">
          {exam.description || "Sem descrição cadastrada para esta prova."}
        </p>
        <div className="text-sm text-zinc-600">
          <p>
            Criada em:{" "}
            {new Date(exam.createdAt).toLocaleDateString("pt-BR")}
          </p>
          <p>
            Atualizada em:{" "}
            {new Date(exam.updatedAt).toLocaleDateString("pt-BR")}
          </p>
          <p>
            Arquivo:{" "}
            <code className="rounded bg-zinc-100 px-2 py-1 text-xs">
              {exam.filePath}
            </code>
          </p>
        </div>
      </div>
    </ExamShell>
  );
}
