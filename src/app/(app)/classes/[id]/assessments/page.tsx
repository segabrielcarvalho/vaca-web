import Link from "next/link";

const mockAssessments = [
  {
    id: "assessment-1",
    title: "Objetiva ENEM Matemática",
    status: "Resultados publicados",
    stage: "OMR concluído",
    date: "05 Abril 2024",
    submissions: "280/280 folhas",
    average: "8,2",
  },
  {
    id: "assessment-2",
    title: "Simulado Interdisciplinar",
    status: "Em correção automática",
    stage: "Lendo gabaritos",
    date: "12 Abril 2024",
    submissions: "142/280 folhas",
    average: "—",
  },
  {
    id: "assessment-3",
    title: "Produção textual – Cidadania",
    status: "Aguardando revisão humana",
    stage: "Inconsistências detectadas",
    date: "12 Abril 2024",
    submissions: "54 / 280 textos",
    average: "—",
  },
  {
    id: "assessment-4",
    title: "Diagnóstico Objetivo Linguagens",
    status: "Programada",
    stage: "Folhas impressas e distribuídas",
    date: "25 Abril 2024",
    submissions: "—",
    average: "—",
  },
];

const rubric = [
  {
    id: "competence-1",
    label: "Acertos objetivos (OMR)",
    weight: "70%",
  },
  {
    id: "competence-2",
    label: "Penalidade por rasuras",
    weight: "-5%",
  },
  {
    id: "competence-3",
    label: "Correção discursiva complementar",
    weight: "20%",
  },
  {
    id: "competence-4",
    label: "Bônus de tempo de envio",
    weight: "15%",
  },
];

export default function ClassAssessmentsPage() {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Avaliações da turma
            </h2>
            <p className="text-sm text-zinc-500">
              Monitore o pipeline completo de digitalização, leitura e
              publicação de resultados.
            </p>
          </div>
          <button className="inline-flex items-center rounded-lg border border-yellow-300 bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-700 transition hover:border-yellow-400 hover:bg-yellow-200">
            Nova avaliação
          </button>
        </div>

        <div className="mt-4 grid gap-4">
          {mockAssessments.map((assessment) => (
            <article
              key={assessment.id}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_18px_55px_-35px_rgba(15,23,42,0.2)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    {assessment.title}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Aplicação em {assessment.date}
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide">
                  <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">
                    {assessment.status}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-600">
                    {assessment.stage}
                  </span>
                </div>
              </div>

              <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Folhas processadas
                  </dt>
                  <dd className="text-sm font-medium text-zinc-900">
                    {assessment.submissions}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Média da turma
                  </dt>
                  <dd className="text-sm font-medium text-zinc-900">
                    {assessment.average}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Relatórios
                  </dt>
                  <dd className="text-sm font-medium text-zinc-900">
                    {assessment.status === "Corrigida"
                      ? "Exportados"
                      : "Disponibilizar após leitura"}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap justify-end gap-3">
                <button className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-yellow-200 hover:bg-yellow-50">
                  Baixar relatórios
                </button>
                <Link
                  href={`${assessment.id}`}
                  className="inline-flex items-center rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-zinc-900 shadow-[0_14px_45px_-30px_rgba(250,204,21,0.9)] transition hover:bg-yellow-300"
                >
                  Ver detalhes
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.25)]">
        <h3 className="text-lg font-semibold text-zinc-900">
          Rubrica de avaliação padrão
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          Critérios utilizados para distribuir as notas das avaliações
          objetivas e discursivas.
        </p>

        <ul className="mt-4 divide-y divide-zinc-100">
          {rubric.map((criterion) => (
            <li
              key={criterion.id}
              className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm font-medium text-zinc-700">
                {criterion.label}
              </span>
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                Peso {criterion.weight}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
