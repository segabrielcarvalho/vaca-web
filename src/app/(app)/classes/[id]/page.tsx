const overviewMetrics = [
  {
    title: "Avaliações em correção",
    value: "4 provas",
    description:
      "Fluxo de OMR ativo com três exames objetivos e uma produção textual.",
  },
  {
    title: "Folhas digitalizadas",
    value: "318 folhas",
    description: "Recebidas nas últimas 24h e aguardando leitura final.",
  },
  {
    title: "Tempo médio de correção",
    value: "11m 40s",
    description: "Entre a digitalização e a publicação dos resultados.",
  },
];

const correctionQueue = [
  {
    id: "queue-1",
    assessment: "Simulado ENEM - Bloco 1",
    stage: "Lendo gabaritos",
    sheets: "180 folhas",
    eta: "Conclui em ~15 min",
  },
  {
    id: "queue-2",
    assessment: "Prova Objetiva Matemática",
    stage: "Exportando XML para SIAPI",
    sheets: "62 folhas",
    eta: "Pronto para download",
  },
  {
    id: "queue-3",
    assessment: "Redação - Tema Cidadania Digital",
    stage: "Pendências de revisão manual",
    sheets: "23 respostas",
    eta: "3 corretores alocados",
  },
];

const omrIncidents = [
  {
    id: "incident-1",
    title: "Assinatura fora da área",
    details: "7 folhas com assinatura sobre as alternativas. Marcar revisão.",
    status: "Requer atenção",
  },
  {
    id: "incident-2",
    title: "Campos em branco",
    details: "12 folhas sem identificação de aluno. Verificar importação.",
    status: "Em análise",
  },
  {
    id: "incident-3",
    title: "Gabarito divergente",
    details: "Prova de História com versão B sem gabarito cadastrado.",
    status: "Gabarito necessário",
  },
];

export default function ClassOverviewPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-zinc-900">
          Panorama da turma
        </h2>
        <p className="text-sm text-zinc-500">
          Indicadores operacionais do fluxo de digitalização e correção OMR.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {overviewMetrics.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.25)]"
            >
              <h3 className="text-sm font-medium text-zinc-500">
                {item.title}
              </h3>
              <p className="mt-2 text-2xl font-semibold text-zinc-900">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Fila de correção OMR
              </h3>
              <p className="text-sm text-zinc-500">
                Status das avaliações em processamento com leitura óptica.
              </p>
            </div>
            <button className="text-sm font-medium text-yellow-700 hover:text-yellow-600">
              Ver histórico completo
            </button>
          </header>

          <ul className="space-y-3">
            {correctionQueue.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_12px_45px_-35px_rgba(15,23,42,0.2)]"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-zinc-900">
                      {item.assessment}
                    </h4>
                    <p className="text-sm text-zinc-500">{item.stage}</p>
                  </div>
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-600">
                    {item.sheets} • {item.eta}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900">
            Alertas de inconsistência
          </h3>
          <div className="space-y-3">
            {omrIncidents.map((issue) => (
              <article
                key={issue.id}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_16px_50px_-35px_rgba(15,23,42,0.2)]"
              >
                <h4 className="text-sm font-semibold text-zinc-900">
                  {issue.title}
                </h4>
                <p className="mt-1 text-sm text-zinc-500">{issue.details}</p>
                <span className="mt-3 inline-flex w-max items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
                  {issue.status}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
