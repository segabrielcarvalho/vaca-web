"use client";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import { ExamShell } from "../_/components/exam-shell";
import { gql, useSuspenseQuery } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import moment from "moment";
import "moment/locale/pt-br";
import { use, useMemo, useState } from "react";

type PageProps = {
  params: Promise<{
    schoolId: string;
    courseId: string;
    klassId: string;
    examId: string;
  }>;
};

type CorrectionRow = {
  id: string;
  attempt: number;
  score?: number | null;
  status: string;
  studentRegistration: string;
  studentName?: string | null;
  createdAt: string;
  Items?: {
    number?: number | null;
    correct?: number | null;
    selected?: number | null;
    isCorrect?: boolean | null;
  }[];
};

type GetExamAndCorrections = {
  getExam: { id: string; title: string; isActive: boolean };
  listExamCorrections: CorrectionRow[];
};

const QUERY: TypedDocumentNode<
  GetExamAndCorrections,
  { examId: string }
> = gql`
  query ListCorrections($examId: String!) {
    getExam(id: $examId) {
      id
      title
      isActive
    }
    listExamCorrections(examId: $examId) {
      id
      attempt
      score
      status
      studentRegistration
      studentName
      createdAt
      Items {
        number
        correct
        selected
        isCorrect
      }
    }
  }
`;

export default function CorrecoesPage({ params }: PageProps) {
  const { schoolId, courseId, klassId, examId } = use(params);
  const { data, refetch } = useSuspenseQuery(QUERY, {
    variables: { examId },
    fetchPolicy: "network-only",
  });

  const exam = data.getExam;
  const corrections = data.listExamCorrections;
  const [selected, setSelected] = useState<CorrectionRow | null>(null);

  moment.locale("pt-br");

  const stats = useMemo(() => {
    if (!selected?.Items?.length) return { correct: 0, wrong: 0, blank: 0 };
    const correct = selected.Items.filter((i) => i?.isCorrect === true).length;
    const wrong = selected.Items.filter((i) => i?.isCorrect === false).length;
    const blank = selected.Items.filter((i) => i?.selected == null).length;
    return { correct, wrong, blank };
  }, [selected]);

  const sortedItems = useMemo(
    () =>
      selected?.Items?.slice().sort((a, b) => {
        const an = a?.number ?? 0;
        const bn = b?.number ?? 0;
        return an - bn;
      }) ?? [],
    [selected]
  );

  return (
    <ExamShell
      exam={{ id: exam.id, title: exam.title, isActive: exam.isActive }}
      params={{ schoolId, courseId, klassId, examId }}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            color="yellow"
            href={`/schools/${schoolId}/courses/${courseId}/classes/${klassId}/exams/${examId}/correction`}
            target="_blank"
            rel="noreferrer"
          >
            Iniciar correção
          </Button>
          <Button color="light" onClick={() => refetch()}>
            Atualizar lista
          </Button>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
                Correções
              </p>
              <h3 className="text-lg font-semibold text-zinc-900">
                Histórico de envios
              </h3>
              <p className="text-sm text-zinc-600">
                Visualize tentativas e notas registradas.
              </p>
            </div>
            <Badge color="blue">{corrections.length} envios</Badge>
          </div>

          {corrections.length === 0 ? (
            <p className="text-sm text-zinc-600">
              Nenhuma correção registrada ainda.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {corrections.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between cursor-pointer hover:bg-zinc-50 px-2 rounded-lg"
                  onClick={() => setSelected(c)}
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Tentativa #{c.attempt} —{" "}
                      {c.studentName || "Aluno"} ({c.studentRegistration})
                    </p>
                    <p className="text-xs text-zinc-500">
                      {moment(c.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge color={badgeForStatus(c.status)}>
                      {c.status === "graded" ? "Corrigida" : c.status}
                    </Badge>
                    <Badge color="yellow">
                      Nota: {c.score ?? 0}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Dialog
        title="Detalhes da correção"
        description="Resumo da tentativa com gabarito comparativo."
        open={!!selected}
        onClose={() => setSelected(null)}
        onActualSubmit={() => setSelected(null)}
      >
        {selected ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Tentativa #{selected.attempt}
                </p>
                <p className="text-xs text-zinc-500">
                  {selected.studentName || "Aluno"} (
                  {selected.studentRegistration})
                </p>
              </div>
              <Badge color="yellow">Nota: {selected.score ?? 0}</Badge>
            </div>
            <div className="flex gap-3 text-xs text-zinc-600">
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-green-500" /> Certas:{" "}
                {stats.correct}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-orange-500" /> Erradas:{" "}
                {stats.wrong}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-zinc-300" /> Em branco:{" "}
                {stats.blank}
              </span>
            </div>
            <div className="space-y-2">
              {sortedItems.map((ans) => (
                <div
                  key={ans?.number ?? Math.random()}
                  className="rounded-xl border border-zinc-200 p-3"
                >
                  <p className="text-xs font-semibold text-zinc-600">
                    Questão {ans?.number ?? "?"}
                  </p>
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map((opt) => {
                      const isCorrect = ans?.correct === opt;
                      const isSelected = ans?.selected === opt;
                      const color = isSelected
                        ? isCorrect
                          ? "bg-green-500"
                          : "bg-orange-500"
                        : isCorrect
                          ? "bg-green-500/50"
                          : "bg-zinc-200";
                      return (
                        <span
                          key={opt}
                          title={`Opção ${opt}`}
                          className={`h-3 w-3 rounded-full ${color}`}
                        />
                      );
                    })}
                  </div>
                  <p className="mt-1 text-xs text-zinc-600">
                    Marcou: {ans?.selected ?? "—"} | Correta:{" "}
                    {ans?.correct ?? "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Dialog>
    </ExamShell>
  );
}

function badgeForStatus(status: string) {
  if (status === "graded") return "green";
  return "blue";
}
