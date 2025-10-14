"use client";

import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { Fragment, useState } from "react";

const correctedStudents = [
  {
    id: "stu-01",
    name: "Beatriz Martins",
    grade: "92%",
    sheet: "403829-1",
    correctedAt: "12/04 • 09:32",
  },
  {
    id: "stu-02",
    name: "Carlos Henrique",
    grade: "86%",
    sheet: "403829-2",
    correctedAt: "12/04 • 09:28",
  },
  {
    id: "stu-03",
    name: "Eduarda Campos",
    grade: "—",
    sheet: "403829-3",
    correctedAt: "Aguardando revisão manual",
  },
];

const highlightedResponse = [
  { number: "01", answer: "A", correct: true },
  { number: "02", answer: "C", correct: false, expected: "D" },
  { number: "03", answer: "B", correct: true },
  { number: "04", answer: "E", correct: true },
  { number: "05", answer: "B", correct: true },
  { number: "06", answer: "A", correct: false, expected: "C" },
];

const correctionSteps = [
  {
    id: "scan",
    title: "1. Digitalize as folhas OMR",
    description:
      "Utilize um scanner ADF ou a câmera do celular para capturar frente e verso.",
    action: "Abrir instruções de digitalização",
  },
  {
    id: "upload",
    title: "2. Envie os arquivos para leitura",
    description:
      "Aceitamos PDF único ou lotes de imagens JPG. Processamento em poucos segundos.",
    action: "Enviar arquivos",
  },
  {
    id: "review",
    title: "3. Revise inconsistências",
    description:
      "Resolva rasuras e alternativas múltiplas antes de publicar os resultados.",
    action: "Abrir painel de revisão",
    intent: "review",
  },
];

const qrCodeUrl =
  "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://vaca-app.com/captura";

const pendingReviewItems = [
  {
    id: "pending-1",
    student: "Eduarda Campos",
    sheet: "403829-3",
    issue: "Questão 02 marcada com dupla alternativa",
    suggestion: "Confirmar opção correta ou anular questão para o aluno.",
  },
  {
    id: "pending-2",
    student: "Eduarda Campos",
    sheet: "403829-3",
    issue: "Assinatura sobre área de identificação",
    suggestion: "Validar identidade manualmente antes de liberar nota.",
  },
  {
    id: "pending-3",
    student: "Rafael Lima",
    sheet: "403829-7",
    issue: "Questão 18 com preenchimento fraco",
    suggestion: "Comparar com folha original e ajustar para alternativa C.",
  },
];

type AssessmentDetailClientProps = {
  classId: string;
  assessmentId: string;
};

export function AssessmentDetailClient({
  classId,
  assessmentId,
}: AssessmentDetailClientProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const openReviewDialog = () => setIsReviewOpen(true);
  const closeReviewDialog = () => setIsReviewOpen(false);

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Turma • {classId.toUpperCase()}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Avaliação {assessmentId.toUpperCase()}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Gerencie a correção automática, revise as inconsistências e
            acompanhe o desempenho em tempo real.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-yellow-200 hover:bg-yellow-50">
            Baixar gabarito oficial
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-700 transition hover:border-yellow-400 hover:bg-yellow-200">
            Exportar relatórios
          </button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.25)]">
          <h2 className="text-lg font-semibold text-zinc-900">
            Correções concluídas
          </h2>
          <p className="text-sm text-zinc-500">
            Folhas lidas e publicadas com possibilidade de reabertura.
          </p>
          <ul className="mt-4 divide-y divide-zinc-100">
            {correctedStudents.map((student) => (
              <li
                key={student.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-zinc-900">{student.name}</p>
                  <p className="text-xs text-zinc-500">Folha {student.sheet}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-yellow-700">
                    {student.grade}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {student.correctedAt}
                  </span>
                  <button className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 hover:border-zinc-300">
                    Reabrir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.25)]">
          <h2 className="text-lg font-semibold text-zinc-900">
            Iniciar nova correção
          </h2>
          <p className="text-sm text-zinc-500">
            Abra a câmera do celular ou compartilhe o link para começar a
            digitalizar.
          </p>

          <div className="mt-4 flex flex-col items-center gap-4 rounded-xl border border-dashed border-yellow-300 bg-yellow-50/60 p-6 text-center">
            <Image
              src={qrCodeUrl}
              width={160}
              height={160}
              alt="QR Code para iniciar captura OMR"
              className="rounded-xl border border-yellow-200 bg-white p-3 shadow-sm"
            />
            <div className="space-y-2">
              <p className="text-sm font-medium text-zinc-700">
                Escaneie o QR Code com seu celular
              </p>
              <p className="text-xs text-zinc-500">
                Em desktop, o código abre a página móvel para capturar a folha
                OMR com a câmera. Em dispositivos móveis, o link abre a página
                de leitura diretamente.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-lg border border-yellow-300 bg-white px-4 py-2 text-sm font-medium text-yellow-700 transition hover:border-yellow-400 hover:bg-yellow-50">
              Copiar link de captura
            </button>
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="lg:col-span-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.25)]">
          <h2 className="text-lg font-semibold text-zinc-900">
            Folha destacada (Davi Nogueira)
          </h2>
          <p className="text-sm text-zinc-500">
            Resultado da leitura óptica com alternativas marcadas.
          </p>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <Image
                src="https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=700&q=80"
                alt="Folha OMR digitalizada"
                width={360}
                height={480}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <h3 className="text-sm font-semibold text-zinc-900">
                  Resumo da leitura
                </h3>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-500">
                      Tempo de leitura
                    </dt>
                    <dd className="font-medium text-zinc-800">48 segundos</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-500">
                      Confiabilidade
                    </dt>
                    <dd className="font-medium text-zinc-800">99,2%</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-500">
                      Riscos detectados
                    </dt>
                    <dd className="font-medium text-zinc-800">
                      2 rasuras sinalizadas
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-500">
                      Ajustes manuais
                    </dt>
                    <dd className="font-medium text-zinc-800">
                      Questões 02 e 06 pendentes
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-zinc-900">
                  Gabarito de destaque
                </h3>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  {highlightedResponse.map((question) => (
                    <li
                      key={question.number}
                      className={clsx(
                        "flex items-center justify-between rounded-lg border px-3 py-2",
                        question.correct
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-orange-200 bg-orange-50 text-orange-700"
                      )}
                    >
                      <span>
                        Questão {question.number} • {question.answer}
                      </span>
                      {!question.correct && (
                        <span className="text-xs font-medium text-orange-700">
                          Correto: {question.expected}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.25)]">
          <h2 className="text-lg font-semibold text-zinc-900">
            Passo a passo de correção
          </h2>
          <p className="text-sm text-zinc-500">
            Orientações rápidas para garantir a leitura correta das folhas.
          </p>

          <ol className="mt-4 space-y-4 text-sm text-zinc-600">
            {correctionSteps.map((step) => (
              <li
                key={step.id}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
              >
                <h3 className="text-sm font-semibold text-zinc-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">{step.description}</p>
                <button
                  onClick={
                    step.intent === "review" ? openReviewDialog : undefined
                  }
                  className="mt-3 inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:border-zinc-300 disabled:cursor-default disabled:border-zinc-200 disabled:text-zinc-300"
                  disabled={step.intent !== "review"}
                >
                  {step.intent === "review"
                    ? step.action
                    : `${step.action} (em breve)`}
                </button>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <Transition appear show={isReviewOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeReviewDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900/45 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white shadow-[0_28px_90px_-45px_rgba(15,23,42,0.35)]">
                  <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-6 py-4">
                    <div>
                      <Dialog.Title className="text-lg font-semibold text-zinc-900">
                        Revisão de inconsistências
                      </Dialog.Title>
                      <p className="mt-1 text-sm text-zinc-500">
                        Resolva rasuras e divergências antes de publicar a
                        avaliação.
                      </p>
                    </div>
                    <button
                      onClick={closeReviewDialog}
                      className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-600 hover:border-zinc-300"
                    >
                      Fechar
                    </button>
                  </div>

                  <div className="max-h-[60vh] space-y-4 overflow-y-auto px-6 py-5">
                    {pendingReviewItems.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-orange-200 bg-orange-50/60 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-semibold text-orange-800">
                              {item.student}
                            </h3>
                            <p className="text-xs text-orange-600">
                              Folha {item.sheet}
                            </p>
                          </div>
                          <span className="inline-flex items-center rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                            Revisar agora
                          </span>
                        </div>
                        <p className="mt-3 text-sm font-medium text-orange-900">
                          {item.issue}
                        </p>
                        <p className="mt-1 text-sm text-orange-700">
                          {item.suggestion}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:border-zinc-300">
                            Abrir folha digitalizada
                          </button>
                          <button className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100">
                            Marcar como resolvido
                          </button>
                          <button className="inline-flex items-center rounded-lg border border-orange-300 bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-700 hover:border-orange-400 hover:bg-orange-200">
                            Anular questão
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
