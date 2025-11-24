"use client";

import { Button } from "@/components/button";
import { Checkbox, CheckboxGroup } from "@/components/checkbox";
import { Combobox, ComboboxOption } from "@/components/combobox";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import useDisclosure from "@/hooks/useDisclosure";
import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import { gql, useMutation } from "@apollo/client";
import {
  CreateCourseInput,
  QueryMode,
  SortOrder,
  useListUsersSuspenseQuery,
} from "@generated/hooks";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type UserOption = {
  id: string;
  name?: string | null;
  email: string;
  isActive: boolean;
};

type CreateCourseMutationVariables = { data: CreateCourseInput };
type CreateCourseMutation = {
  createCourse: {
    id: string;
    name: string;
    description?: string | null;
    isActive: boolean;
    schoolId: string;
    coordinatorId?: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

const CREATE_COURSE_MUTATION: TypedDocumentNode<
  CreateCourseMutation,
  CreateCourseMutationVariables
> = gql`
  mutation CreateCourse($data: CreateCourseInput!) {
    createCourse(data: $data) {
      id
      name
      description
      isActive
      schoolId
      coordinatorId
      createdAt
      updatedAt
    }
  }
`;

type CreateCourseDialogProps = {
  schoolId: string;
  onCreated?: () => void;
};

type CreateCourseFormValues = {
  name: string;
  description?: string | null;
  isActive: boolean;
};

export function CreateCourseDialog({
  schoolId,
  onCreated,
}: CreateCourseDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { success, error } = useToastHook();
  const [createCourse, { loading }] = useMutation(CREATE_COURSE_MUTATION);

  const [coordinatorSearch, setCoordinatorSearch] = useState("");

  const usersVariables = useMemo(() => {
    const search = coordinatorSearch.trim();
    const orConditions = [];

    if (search) {
      orConditions.push(
        { name: { contains: search, mode: QueryMode.Insensitive } },
        { email: { contains: search, mode: QueryMode.Insensitive } }
      );
    }

    return {
      take: 10,
      skip: 0,
      orderBy: { createdAt: SortOrder.Desc },
      where: orConditions.length ? { OR: orConditions } : undefined,
    };
  }, [coordinatorSearch]);

  const usersQuery = useListUsersSuspenseQuery({
    fetchPolicy: "network-only",
    variables: usersVariables,
  });

  const coordinatorOptions = useMemo<UserOption[]>(() => {
    return (
      usersQuery.data?.listUsers.rows.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      })) ?? []
    );
  }, [usersQuery.data?.listUsers.rows]);

  const [selectedCoordinator, setSelectedCoordinator] =
    useState<UserOption | null>(null);

  const form = useForm<CreateCourseFormValues>({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    form.reset({ name: "", description: "", isActive: true });
    setSelectedCoordinator(null);
    setCoordinatorSearch("");
  }, [form, isOpen]);

  const handleClose = () => {
    form.reset({ name: "", description: "", isActive: true });
    setSelectedCoordinator(null);
    setCoordinatorSearch("");
    onClose();
  };

  const handleSubmit = async (values: CreateCourseFormValues) => {
    const trimmedName = values.name.trim();
    if (!trimmedName) {
      form.setError("name", { message: "Informe o nome do curso." });
      return;
    }

    try {
      const payload: CreateCourseInput = {
        schoolId,
        name: trimmedName,
        description: values.description?.trim() || undefined,
        isActive: values.isActive,
        coordinator: selectedCoordinator
          ? { agentId: selectedCoordinator.id }
          : undefined,
      };

      await createCourse({ variables: { data: payload } });
      success({ message: "Curso criado com sucesso." });
      onCreated?.();
      handleClose();
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  return (
    <>
      <Button color="yellow" onClick={onOpen}>
        Novo curso
      </Button>

      <Dialog
        title="Cadastrar curso"
        description="Adicione um curso à escola, defina status e atribua um coordenador."
        open={isOpen}
        onClose={handleClose}
        loading={loading}
        onActualSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-4">
          <div className="sm:col-span-2">
            <Input
              label="Nome do curso"
              placeholder="Ex.: Matemática"
              required
              {...form.register("name", { required: true })}
            />
          </div>

          <div className="sm:col-span-2">
            <Textarea
              label="Descrição"
              rows={3}
              placeholder="Breve resumo do curso"
              {...form.register("description")}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-zinc-900">
              Coordenador
            </label>
            <Combobox
              value={selectedCoordinator}
              options={coordinatorOptions}
              displayValue={(option) =>
                option ? option.name || option.email : ""
              }
              onQueryChange={(value) => setCoordinatorSearch(value)}
              onChange={(option) => setSelectedCoordinator(option)}
              placeholder="Buscar por nome ou e-mail"
              className="w-full"
              aria-label="Buscar coordenador"
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
              Apenas usuários ativos podem ser designados como coordenadores.
            </p>
          </div>

          <div className="sm:col-span-2">
            <CheckboxGroup>
              <Checkbox
                label="Curso ativo"
                description="Cursos ativos podem receber novas turmas."
                checked={form.watch("isActive")}
                color="yellow"
                onChange={(value) => form.setValue("isActive", value)}
              />
            </CheckboxGroup>
          </div>
        </div>
      </Dialog>
    </>
  );
}
