import { Combobox, ComboboxOption } from "@/components/combobox";
import type { DirectorOptionType } from "../types";

type DirectorSectionProps = {
  options: DirectorOptionType[];
  selected: DirectorOptionType | null;
  onChange: (option: DirectorOptionType | null) => void;
  onSearchChange: (value: string) => void;
};

export function DirectorSection({
  options,
  selected,
  onChange,
  onSearchChange,
}: DirectorSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-x-8 gap-y-10 pb-10 md:grid-cols-3">
      <div>
        <h3 className="text-base font-semibold text-zinc-900">Diretoria</h3>
        <p className="mt-2 text-sm text-zinc-600">
          Selecione ou troque o diretor responsável pela escola. Use a busca
          para encontrar rapidamente.
        </p>
      </div>

      <div className="grid max-w-3xl grid-cols-1 gap-x-6 gap-y-4 md:col-span-2">
        <div className="sm:col-span-4">
          <label className="mb-2 block text-sm font-semibold text-zinc-900">
            Diretor responsável
          </label>
          <Combobox
            value={selected}
            options={options}
            displayValue={(option) => (option ? option.name || option.email : "")}
            onQueryChange={onSearchChange}
            onChange={onChange}
            placeholder="Busque por nome ou e-mail"
            className="w-full"
            aria-label="Buscar diretor"
          >
            {(option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                className="flex flex-col gap-0.5"
              >
                <span className="text-sm font-semibold text-zinc-900">
                  {option.name || "Usuário sem nome"}
                </span>
                <span className="text-xs text-zinc-600">
                  {option.email} {option.isActive ? "" : "• Inativo"}
                </span>
              </ComboboxOption>
            )}
          </Combobox>
          <p className="mt-2 text-xs text-zinc-500">
            Só usuários com conta ativa podem ser associados como diretores.
          </p>
        </div>
      </div>
    </section>
  );
}
