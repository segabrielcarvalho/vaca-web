const notificationSettings = [
  {
    id: "share-results",
    label: "Publicar boletins automaticamente",
    description:
      "Liberar resultados imediatamente após a consolidação do OMR.",
    enabled: true,
  },
  {
    id: "correction-alerts",
    label: "Alertas de inconsistência",
    description:
      "Enviar push quando forem encontrados rasuras ou gabaritos divergentes.",
    enabled: true,
  },
  {
    id: "external-reviewers",
    label: "Corretores convidados",
    description:
      "Permitir que avaliadores externos validem respostas discursivas.",
    enabled: false,
  },
];

export default function ClassSettingsPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_20px_65px_-40px_rgba(15,23,42,0.25)]">
        <header className="space-y-2">
          <h2 className="text-lg font-semibold text-zinc-900">
            Preferências da turma
          </h2>
          <p className="text-sm text-zinc-500">
            Configure notificações, visibilidade e políticas da turma.
          </p>
        </header>

        <div className="mt-6 space-y-6">
          {notificationSettings.map((setting) => (
            <label
              key={setting.id}
              className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-[0_12px_45px_-35px_rgba(15,23,42,0.2)] transition hover:border-yellow-200"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium text-zinc-900">
                  {setting.label}
                </span>
                <input
                  type="checkbox"
                  className="size-5 rounded border border-zinc-300 text-yellow-500 focus:ring-yellow-400"
                  defaultChecked={setting.enabled}
                />
              </div>
              <p className="text-sm text-zinc-500">{setting.description}</p>
            </label>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_-35px_rgba(15,23,42,0.2)]">
          <h3 className="text-md font-semibold text-zinc-900">
            Política de avaliações
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li>• Provas objetivas digitalizadas via scanner ADF certificado.</li>
            <li>• Redações avaliadas em dupla, com rubrica de quatro critérios.</li>
            <li>
              • Reavaliação disponível para estudantes com média abaixo de 6,0.
            </li>
          </ul>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_-35px_rgba(15,23,42,0.2)]">
          <h3 className="text-md font-semibold text-zinc-900">
            Contingência e suporte
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li>
              • Suporte VACA:{" "}
              <span className="font-medium text-zinc-800">
                suporte@vaca.com.br
              </span>
            </li>
            <li>
              • Acesso ao drive de backup dos XMLs e PDFs das correções.
            </li>
            <li>
              • Plantão de digitalização: segundas, quartas e sextas, 8h às 18h.
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
