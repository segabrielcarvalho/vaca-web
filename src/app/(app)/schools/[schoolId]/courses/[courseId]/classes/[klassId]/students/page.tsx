"use client";

import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import {
  useCreateStudentsMutation,
  useEnrollStudentsMutation,
  useListStudentsQuery,
} from "@generated/hooks";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type PageProps = {
  params: Promise<{ schoolId: string; courseId: string; klassId: string }>;
};

type StudentSummary = {
  id: string;
  registrationNumber: string;
  name?: string | null;
  email?: string | null;
  createdAt?: string | null;
  User?: { name?: string | null; email?: string | null } | null;
};

type RegisterFormValues = {
  name: string;
  email: string;
  registrationNumber: string;
};

type EnrollFormValues = {
  registrationNumber: string;
};

export default function StudentsPage({ params }: PageProps) {
  const { schoolId, courseId, klassId } = use(params);
  return (
    <StudentsScreen
      schoolId={schoolId}
      courseId={courseId}
      klassId={klassId}
    />
  );
}

function StudentsScreen({
  schoolId,
  courseId,
  klassId,
}: {
  schoolId: string;
  courseId: string;
  klassId: string;
}) {
  const { success, error } = useToastHook();
  const [recentStudents, setRecentStudents] = useState<StudentSummary[]>([]);
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isEnrollOpen, setEnrollOpen] = useState(false);

  const registerForm = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      registrationNumber: "",
    },
  });

  const enrollForm = useForm<EnrollFormValues>({
    defaultValues: { registrationNumber: "" },
  });

  const [createStudents, { loading: creating }] = useCreateStudentsMutation();
  const [enrollStudents, { loading: enrolling }] = useEnrollStudentsMutation();
  const {
    data: listData,
    refetch,
    loading: listLoading,
    error: listError,
  } = useListStudentsQuery({
    variables: { klassId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    setStudents(listData?.listStudents ?? []);
  }, [listData?.listStudents]);

  const handleRegister = async (values: RegisterFormValues) => {
    const trimmed = {
      name: values.name.trim(),
      email: values.email.trim(),
      registrationNumber: values.registrationNumber.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.registrationNumber) {
      registerForm.setError("name", { message: "Preencha todos os campos." });
      return;
    }

    const passwordBase = trimmed.registrationNumber || "aluno12345";
    const password =
      passwordBase.length >= 8
        ? passwordBase
        : `${passwordBase}${"12345678".slice(passwordBase.length)}`;

    try {
      const { data } = await createStudents({
        variables: {
          data: [{ ...trimmed, password }],
          klassId,
        },
      });

      const created = data?.createStudents ?? [];
      setRecentStudents((prev) => [...created, ...prev].slice(0, 10));
      setStudents((prev) => {
        const merged = [...created, ...prev];
        const seen = new Set<string>();
        return merged.filter((s) => {
          const id = s.id || s.registrationNumber;
          if (seen.has(id)) return false;
          seen.add(id);
          return true;
        });
      });
      await refetch();
      success({ message: "Aluno cadastrado e matriculado na turma." });
      registerForm.reset();
      setRegisterOpen(false);
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  const handleEnrollExisting = async (values: EnrollFormValues) => {
    const reg = values.registrationNumber.trim();
    if (!reg) {
      enrollForm.setError("registrationNumber", {
        message: "Informe a matrícula do aluno.",
      });
      return;
    }

    try {
      await enrollStudents({
        variables: {
          klassId,
          students: [{ registrationNumber: reg }],
        },
      });
      await refetch();
      success({ message: "Aluno matriculado na turma." });
      enrollForm.reset();
      setEnrollOpen(false);
      setStudents((prev) => {
        const exists = prev.some(
          (s) => s.registrationNumber === reg || s.id === reg
        );
        if (exists) return prev;
        return [
          {
            id: reg,
            registrationNumber: reg,
            name: null,
            email: null,
          },
          ...prev,
        ];
      });
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
              Alunos da turma
            </p>
            <h2 className="text-xl font-semibold text-zinc-900">
              Cadastro e matrícula
            </h2>
            <p className="text-sm text-zinc-600">
              Registre novos alunos ou matricule alunos já existentes nesta turma.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button color="light" onClick={() => setEnrollOpen(true)}>
              Matricular aluno
            </Button>
            <Button color="yellow" onClick={() => setRegisterOpen(true)}>
              Cadastrar aluno
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  Alunos matriculados
                </h3>
                <p className="text-sm text-zinc-600">
                  Veja quem está vinculado a esta turma.
                </p>
              </div>
              <span className="text-xs text-zinc-500">
                {listLoading ? "Carregando..." : `${students.length} aluno(s)`}
              </span>
            </div>

            {listError ? (
              <p className="mt-4 text-sm text-rose-500">
                Não foi possível carregar os alunos.
              </p>
            ) : students.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">
                Cadastre ou matricule alunos para vê-los aqui.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-zinc-100">
                {students.map((student) => (
                  <li
                    key={student.id}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {student.User?.name || student.name || "Aluno sem nome"}
                      </p>
                      <p className="text-xs text-zinc-600">
                        {student.User?.email || student.email || "Sem e-mail"}
                      </p>
                    </div>
                    <p className="text-xs font-mono text-zinc-500">
                      Matrícula: {student.registrationNumber}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-zinc-900">
              Últimos cadastrados
            </h3>
            <span className="text-xs text-zinc-500">
              {recentStudents.length} aluno(s)
            </span>
          </div>

          {recentStudents.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Cadastre alunos para vê-los aqui imediatamente.
            </p>
          ) : (
            <ul className="space-y-2">
              {recentStudents.map((student) => (
                <li
                  key={student.id}
                  className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-3"
                >
                  <p className="text-sm font-semibold text-zinc-900">
                    {student.User?.name || student.name || "Aluno sem nome"}
                  </p>
                  <p className="text-xs text-zinc-600">
                    {student.User?.email || student.email || "Sem e-mail"}
                  </p>
                  <p className="text-xs font-mono text-zinc-500">
                    Matrícula: {student.registrationNumber}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Dialog
        title="Cadastrar aluno"
        description="Crie o aluno e matricule-o automaticamente na turma."
        open={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onActualSubmit={registerForm.handleSubmit(handleRegister)}
        loading={creating}
        size="lg"
      >
        <form className="grid gap-4">
          <Input
            label="Nome completo"
            placeholder="Digite o nome do aluno"
            required
            {...registerForm.register("name", { required: true })}
          />
          <Input
            label="E-mail"
            placeholder="aluno@escola.com"
            type="email"
            required
            {...registerForm.register("email", { required: true })}
          />
          <Input
            label="Matrícula"
            placeholder="Ex.: 2024-0001"
            required
            {...registerForm.register("registrationNumber", {
              required: true,
            })}
          />
        </form>
      </Dialog>

      <Dialog
        title="Matricular aluno existente"
        description="Informe a matrícula de um aluno já cadastrado para vinculá-lo."
        open={isEnrollOpen}
        onClose={() => setEnrollOpen(false)}
        onActualSubmit={enrollForm.handleSubmit(handleEnrollExisting)}
        loading={enrolling}
        size="md"
      >
        <form className="grid gap-4">
          <Input
            label="Matrícula do aluno"
            placeholder="Digite a matrícula"
            required
            {...enrollForm.register("registrationNumber", {
              required: true,
            })}
          />
        </form>
      </Dialog>
    </div>
  );
}
