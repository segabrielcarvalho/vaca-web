const students = [
  {
    id: "stu-01",
    name: "Beatriz Martins",
    email: "beatriz.martins@escola.com",
    performance: "A",
    attendance: "97%",
    status: "Sem pendências",
    omrStatus: "Folha lida 12/04 às 09h14",
  },
  {
    id: "stu-02",
    name: "Carlos Henrique",
    email: "carlos.henrique@escola.com",
    performance: "B+",
    attendance: "93%",
    status: "Revisar questão anulada",
    omrStatus: "Verificar alternativa dupla (Questão 14)",
  },
  {
    id: "stu-03",
    name: "Davi Nogueira",
    email: "davi.nogueira@escola.com",
    performance: "A-",
    attendance: "95%",
    status: "Monitor da turma",
    omrStatus: "Folha lida 12/04 às 08h57",
  },
  {
    id: "stu-04",
    name: "Eduarda Campos",
    email: "eduarda.campos@escola.com",
    performance: "B",
    attendance: "88%",
    status: "Reaplicação agendada",
    omrStatus: "Folha não recebida",
  },
];

export default function ClassStudentsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Estudantes da turma
            </h2>
            <p className="text-sm text-zinc-500">
              Veja o desempenho e a situação das folhas OMR de cada aluno.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-yellow-200 hover:bg-yellow-50">
              Exportar lista
            </button>
            <button className="inline-flex items-center rounded-lg border border-yellow-300 bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-700 transition hover:border-yellow-400 hover:bg-yellow-200">
              Adicionar aluno
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_22px_70px_-45px_rgba(15,23,42,0.25)]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-600">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-600">
                    Desempenho
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-600">
                    Presença
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-600">
                    Situação
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-600">
                    OMR
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-zinc-600">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {students.map((student) => (
                  <tr key={student.id} className="bg-white">
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-900">
                          {student.name}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {student.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-700">
                      {student.performance}
                    </td>
                    <td className="px-4 py-3 text-zinc-700">
                      {student.attendance}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-500">
                      {student.omrStatus}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-sm font-medium text-yellow-700 hover:text-yellow-600">
                        Ver perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
