"use client";

import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { ExamShell } from "../_/components/exam-shell";
import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import { gql, useMutation, useSuspenseQuery } from "@apollo/client";
import { type ExamObject, type ExamQuestionInput } from "@generated/hooks";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { use, useEffect, useMemo, useState } from "react";

type PageProps = {
  params: Promise<{
    schoolId: string;
    courseId: string;
    klassId: string;
    examId: string;
  }>;
};

type ExamDetails = Pick<
  ExamObject,
  | "id"
  | "title"
  | "description"
  | "filePath"
  | "klassId"
  | "isActive"
  | "createdAt"
  | "updatedAt"
> & {
  Questions?: {
    id: string;
    number: number;
    text?: string | null;
    value: number;
    correct?: number | null;
  }[];
};

type GetExamQuery = { getExam: ExamDetails };
type GetExamVariables = { id: string };

const GET_EXAM_QUERY: TypedDocumentNode<GetExamQuery, GetExamVariables> = gql`
  query GetExam($id: String!) {
    getExam(id: $id) {
      id
      title
      description
      filePath
      klassId
      isActive
      createdAt
      updatedAt
      Questions {
        id
        number
        text
        value
        correct
      }
    }
  }
`;

const UPDATE_EXAM_GABARITO = gql`
  mutation UpdateExamGabarito(
    $where: DefaultWhereIdInput!
    $data: UpdateExamInput!
  ) {
    updateExam(where: $where, data: $data) {
      id
    }
  }
`;

type AnswerRow = {
  number: number;
  correctOption: number | null;
  value: number;
};

export default function ExamGabaritoPage({ params }: PageProps) {
  const { schoolId, courseId, klassId, examId } = use(params);
  const { data, refetch } = useSuspenseQuery(GET_EXAM_QUERY, {
    variables: { id: examId },
    fetchPolicy: "network-only",
  });
  const exam = data.getExam;
  const { success, error } = useToastHook();
  const [updateExam, { loading }] = useMutation(UPDATE_EXAM_GABARITO);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);

  const initialAnswers = useMemo<AnswerRow[]>(() => {
    const answers: AnswerRow[] = [];
    const existing = exam.Questions ?? [];
    for (let i = 1; i <= 30; i += 1) {
      const match = existing.find((q) => q.number === i);
      const correctOption =
        typeof match?.correct === "number" ? match?.correct : null;
      answers.push({
        number: i,
        correctOption: correctOption ?? null,
        value: match?.value ?? 1,
      });
    }
    return answers;
  }, [exam.Questions]);

  const [answers, setAnswers] = useState<AnswerRow[]>(initialAnswers);

  useEffect(() => {
    setAnswers(initialAnswers);
  }, [initialAnswers]);

  const letterForOption = (option: number | null) => {
    if (!option || option < 1 || option > 5) return "—";
    return String.fromCharCode(64 + option); // 1->A
  };

  const handleUpdateAnswer = (
    index: number,
    field: "correctOption" | "value",
    value: string
  ) => {
    setAnswers((prev) =>
      prev.map((row, idx) =>
        idx === index
          ? {
              ...row,
              [field]:
                field === "correctOption"
                  ? Number(value) || null
                  : Number(value) || 0,
            }
          : row
      )
    );
  };

  const handleSave = async () => {
    const questions: ExamQuestionInput[] = answers.map((row) => ({
      number: row.number,
      text: `Questão ${row.number}`,
      value: row.value || 0,
      correctOptions:
        row.correctOption !== null && !Number.isNaN(row.correctOption)
          ? [row.correctOption]
          : [],
    }));

    try {
      await updateExam({
        variables: {
          where: { id: examId },
          data: {
            questions,
          },
        },
      });
      success({ message: "Gabarito salvo com sucesso." });
      await refetch();
      setDialogOpen(false);
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  const handleRandomize = () => {
    setIsRandomizing(true);
    setAnswers((prev) =>
      prev.map((row) => ({
        ...row,
        correctOption: Math.floor(Math.random() * 5) + 1,
      }))
    );
    setTimeout(() => setIsRandomizing(false), 150);
  };

  const createdAt = new Date(exam.createdAt).toLocaleDateString("pt-BR");
  const updatedAt = new Date(exam.updatedAt).toLocaleDateString("pt-BR");

  return (
    <ExamShell
      exam={{ id: exam.id, title: exam.title, isActive: exam.isActive }}
      params={{ schoolId, courseId, klassId, examId }}
    >
      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-5">
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

        <div className="rounded-2xl bg-white p-5 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
                Gabarito
              </p>
              <h3 className="text-lg font-semibold text-zinc-900">
                30 questões
              </h3>
              <p className="text-sm text-zinc-600">
                Clique para registrar as alternativas corretas (A–E).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                color="light"
                onClick={handleRandomize}
                disabled={isRandomizing}
              >
                Aleatorizar
              </Button>
              <Button color="yellow" onClick={() => setDialogOpen(true)}>
                Registrar gabarito
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {answers.map((row) => (
              <div
                key={row.number}
                className="rounded-xl bg-zinc-50 px-3 py-2"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Questão {row.number}
                </p>
                <p className="text-lg font-semibold text-zinc-900">
                  {letterForOption(row.correctOption)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Dialog
          title="Registrar gabarito"
          description="Selecione a alternativa correta (A–E) para cada questão."
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          loading={loading}
          onActualSubmit={handleSave}
          size="3xl"
          scrollBehavior="inside"
        >
          <div className="grid gap-3 md:grid-cols-2">
            {answers.map((row, index) => (
              <div
                key={row.number}
                className="flex flex-col gap-3 rounded-xl bg-white px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-800">
                    Questão {row.number}
                  </span>
                  <span className="text-xs text-zinc-500">
                    Valor: {row.value}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((option) => {
                    const letter = letterForOption(option);
                    const selected = row.correctOption === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          handleUpdateAnswer(
                            index,
                            "correctOption",
                            String(option)
                          )
                        }
                        className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition ${
                          selected
                            ? "border-yellow-400 bg-yellow-100 text-yellow-800"
                            : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Dialog>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem label="Criada em" value={createdAt} />
            <InfoItem label="Atualizada em" value={updatedAt} />
            <InfoItem label="Arquivo" value={exam.filePath} isCode />
          </div>
        </div>
      </div>
    </ExamShell>
  );
}

function InfoItem({
  label,
  value,
  isCode = false,
}: {
  label: string;
  value: string | number;
  isCode?: boolean;
}) {
  return (
    <div className="rounded-xl bg-zinc-50 px-3 py-2 shadow-inner">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
        {label}
      </p>
      {isCode ? (
        <code className="mt-1 inline-block rounded-md bg-white px-2 py-1 text-xs font-mono text-zinc-700">
          {value}
        </code>
      ) : (
        <p className="mt-1 text-sm text-zinc-800">{value}</p>
      )}
    </div>
  );
}
