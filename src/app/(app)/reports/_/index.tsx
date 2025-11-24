import { Button } from "@/components/button";
import {
  ChartBarSquareIcon,
  DocumentChartBarIcon,
  FunnelIcon,
  QueueListIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { SummaryCard } from "./components/summary-card";

const summaryCards = [
  {
    title: "Provas corrigidas",
    value: "128",
    helper: "Últimos 7 dias",
    trendLabel: "+18% vs semana passada",
    trendTone: "up" as const,
  },
  {
    title: "Tempo médio de correção",
    value: "3m 45s",
    helper: "Inclui uploads e revisão",
    trendLabel: "-26s",
    trendTone: "up" as const,
  },
  {
    title: "Alertas de inconsistência",
    value: "6",
    helper: "Precisa de revisão manual",
    trendLabel: "2 novos",
    trendTone: "down" as const,
  },
  {
    title: "Exportações concluídas",
    value: "24",
    helper: "Este mês",
    trendLabel: "100% sucesso",
    trendTone: "up" as const,
  },
];

const quickReports = [
  {
    title: "Desempenho por escola",
    description: "Média de notas, engajamento e comparativo por unidade.",
    icon: ChartBarSquareIcon,
  },
  {
    title: "Evolução das turmas",
    description: "Progresso por turma, faltas e tempo médio de correção.",
    icon: QueueListIcon,
  },
  {
    title: "Exportar métricas",
    description: "CSV e planilhas prontos para BI ou compartilhamento rápido.",
    icon: DocumentChartBarIcon,
  },
];

const recentExecutions = [
  {
    name: "Relatório mensal de escolas",
    status: "Concluído",
    time: "há 2h",
  },
  {
    name: "Exportação detalhada de provas",
    status: "Em processamento",
    time: "há 15min",
  },
  {
    name: "Relatório de inconsistências",
    status: "Concluído",
    time: "Ontem",
  },
];

export function ReportsScreen() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
              Relatórios
            </p>
            <h1 className="text-2xl font-semibold text-zinc-900">
              Visão geral e análises
            </h1>
            <p className="text-sm text-zinc-600">
              Monte painéis rápidos, exporte dados e acompanhe a qualidade das
              correções em tempo real.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button color="light" outline>
              <FunnelIcon data-slot="icon" className="size-4" />
              Filtrar período
            </Button>
            <Button color="yellow">
              <DocumentChartBarIcon data-slot="icon" className="size-4" />
              Novo relatório
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Relatórios rápidos
              </h2>
              <p className="text-sm text-zinc-600">
                Comece com templates prontos e edite filtros depois.
              </p>
            </div>
            <Button size="sm" color="light" outline>
              Ver biblioteca
            </Button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {quickReports.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="flex h-full flex-col gap-3 rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 shadow-sm transition hover:border-yellow-200 hover:bg-yellow-50"
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    {title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-600">{description}</p>
                <Button
                  href="#"
                  color="yellow"
                  size="sm"
                  className="mt-auto w-full"
                >
                  Abrir
                </Button>
              </article>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900">
            Últimas execuções
          </h2>
          <p className="text-sm text-zinc-600">
            Status das exportações e painéis mais recentes.
          </p>
          <ul className="mt-4 space-y-3">
            {recentExecutions.map((item) => (
              <li
                key={item.name}
                className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500">{item.time}</p>
                  </div>
                  <span
                    className={clsx(
                      "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
                      item.status === "Concluído"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-700"
                    )}
                  >
                    {item.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
