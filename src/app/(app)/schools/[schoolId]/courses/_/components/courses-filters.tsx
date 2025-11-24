import { Input } from "@/components/input";

type CoursesFiltersProps = {
  courseSearch: string;
  onSearchChange: (value: string) => void;
};

export function CoursesFilters({
  courseSearch,
  onSearchChange,
}: CoursesFiltersProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
        <Input
          label="Buscar cursos"
          placeholder="Digite o nome do curso"
          isClearable
          value={courseSearch}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </div>
  );
}
