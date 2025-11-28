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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
            Cursos
          </p>
          <h2 className="text-xl font-semibold text-zinc-900">
            Cadastre cursos e coordenadores
          </h2>
          <p className="text-sm text-zinc-600">
            Inclua um novo curso na escola e defina o coordenador responsável.
          </p>
        </div>

        <CreateCourseDialog schoolId={schoolId} onCreated={onCreated} />
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
import { CreateCourseDialog } from "./create-course-dialog";
