"use client";

import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Combobox, ComboboxOption } from "@/components/combobox";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import {
  QueryMode,
  SortOrder,
  useGetSchoolSuspenseQuery,
  useListUsersSuspenseQuery,
  useUpdateSchoolMutation,
} from "@generated/hooks";
import clsx from "clsx";
import { use, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { SchoolHeader } from "../_/components/school-header";

type PageProps = { params: Promise<{ schoolId: string }> };

type DetailsFormValues = {
  name: string;
  description?: string | null;
  isActive: boolean;
};

type DirectorOptionType = {
  id: string;
  name?: string | null;
  email: string;
  isActive: boolean;
};

export default function SchoolSettingsPage({ params }: PageProps) {
  const { schoolId } = use(params);

  const { data, refetch } = useGetSchoolSuspenseQuery({
    fetchPolicy: "network-only",
    variables: { id: schoolId },
  });
  const school = data?.getSchool;

  const { success, error } = useToastHook();
  const [updateSchool, { loading }] = useUpdateSchoolMutation();

  const detailsForm = useForm<DetailsFormValues>({
    values: {
      name: school?.name ?? "",
      description: school?.description ?? "",
      isActive: school?.isActive ?? true,
    },
  });

  const [directorSearch, setDirectorSearch] = useState("");
  const usersVariables = useMemo(() => {
    const search = directorSearch.trim();
    const orConditions = [];

    if (search) {
      orConditions.push(
        { name: { contains: search, mode: QueryMode.Insensitive } },
        { email: { contains: search, mode: QueryMode.Insensitive } }
      );
    }

    if (school?.directorId) {
      orConditions.push({ id: { equals: school.directorId } });
    }

    return {
      take: 10,
      skip: 0,
      orderBy: { createdAt: SortOrder.Desc },
      where: orConditions.length ? { OR: orConditions } : undefined,
    };
  }, [directorSearch, school?.directorId]);

  const usersQuery = useListUsersSuspenseQuery({
    fetchPolicy: "network-only",
    variables: usersVariables,
  });

  const directorOptions = useMemo<DirectorOptionType[]>(() => {
    return (
      usersQuery.data?.listUsers.rows.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      })) ?? []
    );
  }, [usersQuery.data?.listUsers.rows]);

  const [selectedDirector, setSelectedDirector] =
    useState<DirectorOptionType | null>(null);

  useEffect(() => {
    if (!school?.directorId) {
      setSelectedDirector(null);
      return;
    }

    setSelectedDirector((current) => {
      if (current?.id === school.directorId) return current;
      const match = directorOptions.find(
        (option) => option.id === school.directorId
      );
      return match ?? current ?? null;
    });
  }, [school?.directorId, directorOptions]);

  useEffect(() => {
    detailsForm.reset({
      name: school?.name ?? "",
      description: school?.description ?? "",
      isActive: school?.isActive ?? true,
    });
  }, [school?.name, school?.description, school?.isActive, detailsForm]);

  const handleSubmit = async (values: DetailsFormValues) => {
    try {
      await updateSchool({
        variables: {
          id: schoolId,
          data: {
            name: values.name.trim(),
            description: values.description ?? null,
            isActive: values.isActive,
            director: selectedDirector
              ? { agentId: selectedDirector.id }
              : undefined,
          },
        },
      });
      await refetch();
      success({ message: "Configurações da escola atualizadas." });
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  if (!school) return null;

  const createdAt = new Date(school.createdAt).toLocaleDateString("pt-BR");

  return (
    <div className="space-y-10">
      <SchoolHeader schoolId={schoolId} />

      <div className="space-y-8">
      <div className="rounded-2xl  ">
        <p className="text-sm font-medium uppercase tracking-wide text-yellow-700">
          Configurações
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          Detalhes da escola
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-zinc-600">
          Ajuste informações principais, status e diretoria. Tudo em uma página
          limpa e organizada.
        </p>
      </div>

      <form
        className="space-y-12"
        onSubmit={detailsForm.handleSubmit(handleSubmit)}
      >
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
                {...detailsForm.register("name", { required: true })}
              />
            </div>

            <div className="col-span-full">
              <Textarea
                label="Descrição"
                rows={3}
                {...detailsForm.register("description")}
                placeholder="Resumo curto sobre a escola e seu foco."
              />
            </div>

            <div className="col-span-full flex items-center justify-between rounded-xl bg-white px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Escola ativa
                </p>
                <p className="text-sm text-zinc-600">
                  Escolas inativas não podem receber novas turmas.
                </p>
              </div>
              <Checkbox
                id="school-active"
                aria-label="Escola ativa"
                checked={detailsForm.watch("isActive")}
                onChange={(value) => detailsForm.setValue("isActive", value)}
              />
            </div>

            <div className="col-span-full">
              <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
                <span className="font-semibold text-zinc-800">Criada em:</span>
                <span>{createdAt}</span>
                <span className="mx-2 text-zinc-400">•</span>
                <span className="font-semibold text-zinc-800">ID:</span>
                <code className="rounded-md bg-white px-2 py-1 text-xs font-mono text-zinc-700">
                  {school.id}
                </code>
              </div>
            </div>
          </div>
        </section>

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
                value={selectedDirector}
                options={directorOptions}
                displayValue={(option) =>
                  option ? option.name || option.email : ""
                }
                onQueryChange={(value) => setDirectorSearch(value)}
                onChange={(option) => setSelectedDirector(option)}
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

        <section className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          <div>
            <h3 className="text-base font-semibold text-zinc-900">
              Revisão final
            </h3>
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
                    school.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  )}
                >
                  {detailsForm.watch("isActive") ? "Ativa" : "Inativa"}
                </span>
                <span className="text-sm text-zinc-700">
                  Última atualização:{" "}
                  {new Date(school.updatedAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <Button
                type="button"
                color="light"
                outline
                onClick={() => refetch()}
              >
                Descartar alterações
              </Button>
              <Button color="yellow" type="submit" loading={loading}>
                Salvar configurações
              </Button>
            </div>
          </div>
        </section>
      </form>
      </div>
    </div>
  );
}
