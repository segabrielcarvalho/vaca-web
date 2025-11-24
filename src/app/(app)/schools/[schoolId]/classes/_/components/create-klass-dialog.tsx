"use client";

import { Button } from "@/components/button";
import { Checkbox, CheckboxGroup } from "@/components/checkbox";
import { Combobox, ComboboxOption } from "@/components/combobox";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { Select, type Option } from "@/components/select";
import { Textarea } from "@/components/textarea";
import useDisclosure from "@/hooks/useDisclosure";
import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import { gql, useMutation } from "@apollo/client";
import {
  QueryMode,
  SortOrder,
  useListUsersSuspenseQuery,
} from "@generated/hooks";
import type {
  CourseForListObject,
  CreateKlassInput,
  KlassObject,
} from "@generated/hooks";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export type KlassSummary = Pick<
  KlassObject,
  | "id"
  | "name"
  | "description"
  | "isActive"
  | "courseId"
  | "teacherId"
  | "createdAt"
  | "updatedAt"
> & {
  Course?: Pick<CourseForListObject, "id" | "name" | "schoolId"> | null;
};

type CreateKlassMutation = { createKlass: KlassSummary };
type CreateKlassMutationVariables = { data: CreateKlassInput };

type TeacherOption = {
  id: string;
  name?: string | null;
  email: string;
  isActive: boolean;
};

const CREATE_KLASS_MUTATION: TypedDocumentNode<
  CreateKlassMutation,
  CreateKlassMutationVariables
> = gql`
  mutation CreateKlass($data: CreateKlassInput!) {
    createKlass(data: $data) {
      id
      name
      description
      isActive
      courseId
      teacherId
      createdAt
      updatedAt
      Course {
        id
        name
        schoolId
      }
    }
  }
`;

type CreateKlassFormValues = {
  name: string;
  description?: string | null;
  courseId: string;
  isActive: boolean;
};

type CreateKlassDialogProps = {
  courseOptions?: Option[];
  defaultCourseId?: string | null;
  courseId?: string;
  onCreated?: (klass: KlassSummary) => void;
};

export function CreateKlassDialog({
  courseOptions,
  defaultCourseId,
  courseId,
  onCreated,
}: CreateKlassDialogProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { success, error } = useToastHook();
  const [createKlass, { loading }] = useMutation(CREATE_KLASS_MUTATION);
  const [teacherSearch, setTeacherSearch] = useState("");

  const teacherVariables = useMemo(() => {
    const search = teacherSearch.trim();
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
  }, [teacherSearch]);

  const teachersQuery = useListUsersSuspenseQuery({
    fetchPolicy: "network-only",
    variables: teacherVariables,
  });

  const teacherOptions = useMemo<TeacherOption[]>(() => {
    return (
      teachersQuery.data?.listUsers.rows.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      })) ?? []
    );
  }, [teachersQuery.data?.listUsers.rows]);

  const [selectedTeacher, setSelectedTeacher] =
    useState<TeacherOption | null>(null);

  const fallbackCourseId = useMemo(() => {
    if (courseId) return courseId;
    if (defaultCourseId) return defaultCourseId;
    const firstCourse = courseOptions?.[0];
    return firstCourse ? String(firstCourse.value) : "";
  }, [courseOptions, courseId, defaultCourseId]);

  const form = useForm<CreateKlassFormValues>({
    defaultValues: {
      name: "",
      description: "",
      courseId: fallbackCourseId,
      isActive: true,
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    form.reset({
      name: "",
      description: "",
      courseId: fallbackCourseId,
      isActive: true,
    });
    setSelectedTeacher(null);
    setTeacherSearch("");
  }, [isOpen, fallbackCourseId, form]);

  const handleClose = () => {
    form.reset({
      name: "",
      description: "",
      courseId: fallbackCourseId,
      isActive: true,
    });
    setSelectedTeacher(null);
    setTeacherSearch("");
    onClose();
  };

  const handleSubmit = async (values: CreateKlassFormValues) => {
    const trimmedName = values.name.trim();
    if (!trimmedName) {
      form.setError("name", { message: "Informe o nome da turma." });
      return;
    }

    const resolvedCourseId = courseId ?? values.courseId;
    if (!resolvedCourseId) {
      form.setError("courseId", { message: "Selecione o curso da turma." });
      return;
    }

    try {
      const payload: CreateKlassInput = {
        name: trimmedName,
        courseId: resolvedCourseId,
        description: values.description?.trim() || undefined,
        isActive: values.isActive,
        teacher: selectedTeacher ? { agentId: selectedTeacher.id } : undefined,
      };

      const { data } = await createKlass({ variables: { data: payload } });
      if (!data?.createKlass) return;

      success({ message: "Turma criada com sucesso." });
      onCreated?.(data.createKlass);
      handleClose();
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  return (
    <>
      <Button
        color="yellow"
        onClick={onOpen}
        disabled={!courseId && (courseOptions?.length ?? 0) === 0}
      >
        Nova turma
      </Button>

      <Dialog
        title="Criar nova turma"
        description="Cadastre uma turma e conecte-a a um curso existente desta escola."
        open={isOpen}
        onClose={handleClose}
        loading={loading}
        onActualSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Nome da turma"
              placeholder="Ex.: 1º Ano A"
              {...form.register("name", { required: true })}
            />
          </div>

          {!courseId && (
            <div className="sm:col-span-2">
              <Select
                label="Curso"
                placeholder="Selecione o curso"
                required
                options={courseOptions ?? []}
                value={form.watch("courseId")}
                onChange={(value) =>
                  form.setValue("courseId", value as string, {
                    shouldValidate: true,
                  })
                }
              />
            </div>
          )}

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-zinc-900">
              Professor responsável
            </label>
            <Combobox
              value={selectedTeacher}
              options={teacherOptions}
              displayValue={(option) =>
                option ? option.name || option.email : ""
              }
              onQueryChange={(value) => setTeacherSearch(value)}
              onChange={(option) => setSelectedTeacher(option)}
              placeholder="Busque por nome ou e-mail"
              className="w-full"
              aria-label="Buscar professor"
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
              Selecione um usuário ativo para associá-lo como professor da turma.
            </p>
          </div>

          <div className="sm:col-span-2">
            <Textarea
              label="Descrição"
              rows={3}
              placeholder="Resumo ou observações da turma"
              {...form.register("description")}
            />
          </div>

          <div className="sm:col-span-2">
            <CheckboxGroup>
              <Checkbox
                label="Turma ativa"
                description="Turmas ativas ficam disponíveis para matrícula e acesso."
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
