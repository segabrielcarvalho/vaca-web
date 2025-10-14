import Link from "next/link";
import { ClassesHeader } from "./_/components/header";

const mockedClasses = [
  {
    id: "turma-1",
    title: "Fundamentos de Programação",
    description:
      "Algoritmos, lógica e programação em Python; introdução a engenharia de software e pensamento computacional.",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "turma-2",
    title: "Estruturas de Dados",
    description:
      "Listas, pilhas, filas, árvores e grafos; análise de complexidade e boas práticas de codificação.",
    image:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "turma-3",
    title: "Banco de Dados e SQL",
    description:
      "Modelagem relacional, normalização, SQL, transações e noções de bancos NoSQL aplicados a sistemas web.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "turma-5",
    title: "Arquitetura e Projeto de Software",
    description:
      "Padrões de projeto, estilos arquiteturais, DDD e qualidade de projeto com foco em manutenibilidade.",
    image:
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "turma-7",
    title: "Testes e Qualidade de Software",
    description:
      "Teste unitário, integração e end-to-end; TDD, métricas de qualidade e automação de pipelines.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "turma-8",
    title: "Engenharia de Software Ágil",
    description:
      "Scrum, Kanban e Lean; gestão de produto, métricas ágeis e entrega contínua em equipes multidisciplinares.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
];

const ClassesPage = () => {
  return (
    <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
      <ClassesHeader />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {mockedClasses.map((item) => (
          <Link key={item.id} href={`/classes/${item.id}`} className="group">
            <article className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_20px_65px_-40px_rgba(15,23,42,0.25)] transition hover:border-yellow-200 hover:bg-yellow-50/40">
              <div className="h-40 w-full overflow-hidden bg-zinc-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h2 className="text-lg font-semibold text-zinc-900">
                  {item.title}
                </h2>
                <p className="text-sm text-zinc-500 line-clamp-3">
                  {item.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-yellow-700 transition group-hover:text-yellow-600">
                  Ver detalhes
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
