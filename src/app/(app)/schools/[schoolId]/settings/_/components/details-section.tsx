import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Checkbox } from "@/components/checkbox";
import type { UseFormReturn } from "react-hook-form";
import type { DetailsFormValues } from "../types";

type DetailsSectionProps = {
  form: UseFormReturn<DetailsFormValues>;
  createdAt: string;
  schoolId: string;
};

export function DetailsSection({
  form,
  createdAt,
  schoolId,
}: DetailsSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-x-8 gap-y-10 pb-10 md:grid-cols-3">
      <div>
        <h3 className="text-base font-semibold text-zinc-900">
          Informações gerais
        </h3>
        <p className="mt-2 text-sm text-zinc-600">
          Nome, descrição e status visível para toda a organização.
        </p>
      </div>

      <div className="grid max-w-3xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-4">
          <Input
            label="Nome da escola"
            required
            {...form.register("name", { required: true })}
          />
        </div>

        <div className="col-span-full">
          <Textarea
            label="Descrição"
            rows={3}
            {...form.register("description")}
            placeholder="Resumo curto sobre a escola e seu foco."
          />
        </div>

        <div className="col-span-full flex items-center justify-between rounded-xl bg-white px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-zinc-900">Escola ativa</p>
            <p className="text-sm text-zinc-600">
              Escolas inativas não podem receber novas turmas.
            </p>
          </div>
          <Checkbox
            id="school-active"
            aria-label="Escola ativa"
            checked={form.watch("isActive")}
            onChange={(value) => form.setValue("isActive", value)}
          />
        </div>

        <div className="col-span-full">
          <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-800">Criada em:</span>
              <span>{createdAt}</span>
            </div>
            <span className="hidden text-zinc-400 sm:block">•</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-800">ID:</span>
              <code className="rounded-md bg-white px-2 py-1 text-xs font-mono text-zinc-700">
                {schoolId}
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
