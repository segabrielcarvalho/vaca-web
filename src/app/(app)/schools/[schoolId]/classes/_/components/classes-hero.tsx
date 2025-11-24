import { CreateKlassDialog, type KlassSummary } from "./create-klass-dialog";

type Option = { value: string; label: string };

type ClassesHeroProps = {
  totalCourses: number;
  totalKlasses: number;
  hasCourseSelected: boolean;
  coursesOptions: Option[];
  selectedCourseId: string | null;
  onCourseChange: (value: string | null) => void;
  onCreated: (klass: KlassSummary) => void;
};

export function ClassesHero({
  totalCourses,
  totalKlasses,
  hasCourseSelected,
  coursesOptions,
  selectedCourseId,
  onCourseChange,
  onCreated,
}: ClassesHeroProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
            Turmas
          </p>
          <h2 className="text-xl font-semibold text-zinc-900">
            Organização das turmas
          </h2>
          <p className="text-sm text-zinc-600">
            Busque, crie e navegue pelos detalhes de cada turma desta escola.
          </p>
        </div>

        <CreateKlassDialog
          courseOptions={coursesOptions}
          defaultCourseId={selectedCourseId}
          onCreated={(klass) => {
            onCourseChange(klass.courseId);
            onCreated(klass);
          }}
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          label="Cursos disponíveis"
          value={totalCourses}
          caption="para associar turmas"
        />
        <InfoCard
          label="Turmas encontradas"
          value={totalKlasses}
          caption={hasCourseSelected ? "considerando o filtro atual" : "na escola"}
        />
        <InfoCard
          label="Status do filtro"
          value={hasCourseSelected ? "Curso selecionado" : "Selecione um curso"}
          caption="Organize as turmas por curso"
        />
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: number | string;
  caption?: string;
}) {
  return (
    <div className="rounded-xl border border-yellow-100 bg-yellow-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
      <p className="text-xs font-semibold uppercase tracking-wide text-yellow-800 dark:text-yellow-200">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">
        {value}
      </p>
      {caption && (
        <p className="text-xs text-zinc-600 dark:text-zinc-300">{caption}</p>
      )}
    </div>
  );
}
