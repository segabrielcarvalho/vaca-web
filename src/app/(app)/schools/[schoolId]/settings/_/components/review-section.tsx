import { Button } from "@/components/button";
import clsx from "clsx";

type ReviewSectionProps = {
  isActive: boolean;
  updatedAt: string;
  onDiscard: () => void;
  loading?: boolean;
};

export function ReviewSection({
  isActive,
  updatedAt,
  onDiscard,
  loading = false,
}: ReviewSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
      <div>
        <h3 className="text-base font-semibold text-zinc-900">Revisão final</h3>
        <p className="mt-2 text-sm text-zinc-600">
          Salve as alterações para atualizar todos os dados da escola.
        </p>
      </div>
      <div className="md:col-span-2">
        <div className="rounded-2xl bg-white p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={clsx(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              )}
            >
              {isActive ? "Ativa" : "Inativa"}
            </span>
            <span className="text-sm text-zinc-700">
              Última atualização: {updatedAt}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <Button type="button" color="light" outline onClick={onDiscard}>
            Descartar alterações
          </Button>
          <Button color="yellow" type="submit" loading={loading}>
            Salvar configurações
          </Button>
        </div>
      </div>
    </section>
  );
}
