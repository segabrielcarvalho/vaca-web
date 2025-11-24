"use client";

import { ExamShell } from "../_/components/exam-shell";
import { gql, useSuspenseQuery } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
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
};

type Query = { getExam: ExamBasic };

const QUERY: TypedDocumentNode<Query, { id: string }> = gql`
  query ExamConfig($id: String!) {
    getExam(id: $id) {
      id
      title
      description
      filePath
      isActive
    }
  }
`;

export default function ConfiguracoesPage({ params }: PageProps) {
  const { schoolId, courseId, klassId, examId } = use(params);
  const { data } = useSuspenseQuery(QUERY, { variables: { id: examId } });
  const exam = data.getExam;

  return (
    <ExamShell
      exam={{ id: exam.id, title: exam.title, isActive: exam.isActive }}
      params={{ schoolId, courseId, klassId, examId }}
    >
      <div className="rounded-2xl bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900">Configurações</h3>
        <p className="text-sm text-zinc-600">
          Ajustes básicos (somente leitura por enquanto).
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Título" value={exam.title} readOnly />
          <Input label="Arquivo" value={exam.filePath} readOnly />
          <Textarea
            label="Descrição"
            value={exam.description || "Sem descrição cadastrada."}
            readOnly
            rows={3}
          />
        </div>
      </div>
    </ExamShell>
  );
}
