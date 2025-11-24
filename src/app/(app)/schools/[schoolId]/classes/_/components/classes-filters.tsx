import { Input } from "@/components/input";
import { Select } from "@/components/select";

type Option = { value: string; label: string };

type ClassesFiltersProps = {
  coursesOptions: Option[];
  selectedCourseId: string | null;
  klassSearch: string;
  onCourseChange: (value: string | null) => void;
  onSearchChange: (value: string) => void;
  hasCourseSelected: boolean;
  noCourses: boolean;
};

export function ClassesFilters({
  coursesOptions,
  selectedCourseId,
  klassSearch,
  onCourseChange,
  onSearchChange,
  hasCourseSelected,
  noCourses,
}: ClassesFiltersProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          label="Curso"
          placeholder="Selecione um curso"
          options={coursesOptions}
          value={selectedCourseId ?? ""}
          onChange={(value) => onCourseChange((value as string) || null)}
          disabled={noCourses}
        />

        <div className="sm:col-span-1 lg:col-span-2">
          <Input
            label="Buscar turmas"
            placeholder="Digite o nome da turma"
            isClearable
            value={klassSearch}
            onChange={(event) => onSearchChange(event.target.value)}
            disabled={!hasCourseSelected}
          />
        </div>
      </div>

      {noCourses && (
        <p className="mt-3 text-sm text-zinc-600">
          Cadastre um curso para começar a adicionar turmas nesta escola.
        </p>
      )}
    </div>
  );
}
