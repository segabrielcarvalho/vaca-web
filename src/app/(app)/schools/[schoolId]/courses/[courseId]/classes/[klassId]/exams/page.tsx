"use client";

import { Badge } from "@/components/badge";
import { Input } from "@/components/input";
import { Pagination } from "@/components/pagination";
import { Table } from "@/components/table";
import useUrlFilter from "@/hooks/useUrlFilter";
import {
  ListExamsInput,
  QueryMode,
  SortOrder,
  useListExamsByKlassSuspenseQuery,
} from "@generated/hooks";
import { use, useMemo } from "react";
import { CreateExamDialog } from "./_/components/create-exam-dialog";

type PageProps = {
  params: Promise<{ schoolId: string; courseId: string; klassId: string }>;
};

export default function KlassExamsPage({ params }: PageProps) {
  const { schoolId, courseId, klassId } = use(params);
  return (
    <ExamsPage schoolId={schoolId} courseId={courseId} klassId={klassId} />
  );
}

function ExamsPage({
  schoolId,
  courseId,
  klassId,
}: {
  schoolId: string;
  courseId: string;
  klassId: string;
}) {
  const [examSearch, setExamSearch] = useUrlFilter<string>({
    name: "exam_search",
    delay: 300,
  });
  const [pageNumber, setPageNumber] = useUrlFilter<number>({
    name: "page_number",
  });
  const [pageSize] = useUrlFilter<number>({ name: "page_size" });

  const examsVariables = useMemo(() => {
    const conditions: ListExamsInput[] = [{ klassId: { equals: klassId } }];

    if (examSearch?.trim()) {
      conditions.push({
        title: { contains: examSearch.trim(), mode: QueryMode.Insensitive },
      });
    }

    const take = Math.max(pageSize ?? 10, 1);
    const currentPage = Math.max(pageNumber ?? 1, 1);
    const skip = (currentPage - 1) * take;

    return {
      where: { AND: conditions },
      take,
      skip,
      orderBy: { createdAt: SortOrder.Desc },
    };
  }, [examSearch, pageNumber, pageSize, klassId]);

  const examsQuery = useListExamsByKlassSuspenseQuery({
    fetchPolicy: "network-only",
    variables: examsVariables,
  });

  const totalExams = examsQuery.data?.listExams.count ?? 0;
  const examRows =
    examsQuery.data?.listExams.rows.map((exam) => ({
      href: `/schools/${schoolId}/courses/${courseId}/classes/${klassId}/exams/${exam.id}`,
      title: `Abrir prova ${exam.title}`,
      cells: [
        <div key={exam.id} className="flex flex-col gap-1">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {exam.title}
          </span>
          {exam.description && (
            <span className="text-sm text-zinc-500 line-clamp-2">
              {exam.description}
            </span>
          )}
        </div>,
        <Badge color={exam.isActive ? "green" : "rose"}>
          {exam.isActive ? "Ativa" : "Inativa"}
        </Badge>,
        <time
          dateTime={exam.createdAt}
          className="text-sm text-zinc-500 dark:text-zinc-300"
        >
          {new Date(exam.createdAt).toLocaleDateString("pt-BR")}
        </time>,
      ],
    })) ?? [];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
              Provas
            </p>
            <h2 className="text-xl font-semibold text-zinc-900">
              Provas da turma
            </h2>
            <p className="text-sm text-zinc-600">
              Cadastre e gerencie provas e gabaritos desta turma.
            </p>
          </div>
          <CreateExamDialog
            klassId={klassId}
            onCreated={() => examsQuery.refetch()}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
          <Input
            label="Buscar provas"
            placeholder="Digite o título da prova"
            isClearable
            value={examSearch || ""}
            onChange={(event) => {
              setExamSearch(event.target.value);
              setPageNumber(1);
            }}
          />
        </div>

        {totalExams === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Nenhuma prova cadastrada para esta turma.
          </p>
        ) : (
          <>
            <Table
              headers={["Prova", "Status", "Criada em"]}
              rows={examRows}
              striped
              total={totalExams}
            />

            <Pagination
              page={pageNumber || 1}
              pageSize={pageSize || 10}
              setPage={(page) => setPageNumber(page)}
              totalArraySize={totalExams}
            />
          </>
        )}
      </div>
    </div>
  );
}
