type CoursesHeroProps = {
  schoolId: string;
  totalCourses: number;
  onCreated: () => void;
};

export function CoursesHero({
  schoolId,
  totalCourses,
  onCreated,
}: CoursesHeroProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          label="Cursos cadastrados"
          value={totalCourses}
          caption="na unidade selecionada"
        />
        <InfoCard
          label="Status do fluxo"
          value="Pronto para criar turmas"
          caption="Configure cursos e avance para turmas"
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
