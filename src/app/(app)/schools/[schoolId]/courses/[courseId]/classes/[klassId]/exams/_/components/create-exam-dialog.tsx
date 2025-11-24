"use client";

import { Button } from "@/components/button";
import { Checkbox, CheckboxGroup } from "@/components/checkbox";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import useDisclosure from "@/hooks/useDisclosure";
import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import { gql, useMutation } from "@apollo/client";
import type { CreateExamInput } from "@generated/hooks";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type CreateExamMutation = {
  createExam: {
    id: string;
    title: string;
    klassId: string;
  };
};

type CreateExamMutationVariables = { data: CreateExamInput };

const CREATE_EXAM_MUTATION: TypedDocumentNode<
  CreateExamMutation,
  CreateExamMutationVariables
> = gql`
  mutation CreateExam($data: CreateExamInput!) {
    createExam(data: $data) {
      id
      title
      klassId
    }
  }
`;

type CreateExamDialogProps = {
  klassId: string;
  onCreated?: () => void;
};

type CreateExamFormValues = {
  title: string;
  description?: string | null;
  fileBase64: string;
  isActive: boolean;
};

export function CreateExamDialog({ klassId, onCreated }: CreateExamDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { success, error } = useToastHook();
  const [createExam, { loading }] = useMutation(CREATE_EXAM_MUTATION);

  const form = useForm<CreateExamFormValues>({
    defaultValues: {
      title: "",
      description: "",
      fileBase64: "",
      isActive: true,
    },
  });
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    form.reset({ title: "", description: "", fileBase64: "", isActive: true });
    setFileName("");
  }, [isOpen, form]);

  const handleClose = () => {
    form.reset({ title: "", description: "", fileBase64: "", isActive: true });
    setFileName("");
    onClose();
  };

  const handleSubmit = async (values: CreateExamFormValues) => {
    const trimmedTitle = values.title.trim();
    if (!trimmedTitle) {
      form.setError("title", { message: "Informe o título da prova." });
      return;
    }
    const trimmedFile = values.fileBase64.trim();
    if (!trimmedFile) {
      form.setError("fileBase64", { message: "Selecione o PDF da prova." });
      return;
    }

    try {
      const payload: CreateExamInput = {
        title: trimmedTitle,
        description: values.description?.trim() || undefined,
        fileBase64: trimmedFile,
        klassId,
        isActive: values.isActive,
        questions: [
          {
            number: 1,
            text: "Questão 1",
            value: 1,
            correctOptions: [1],
          },
        ],
      };

      await createExam({ variables: { data: payload } });
      success({ message: "Prova criada. Cadastre o gabarito em seguida." });
      onCreated?.();
      handleClose();
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  return (
    <>
      <Button color="yellow" onClick={onOpen}>
        Nova prova
      </Button>

      <Dialog
        title="Criar prova"
        description="Cadastre a prova e depois preencha o gabarito."
        open={isOpen}
        onClose={handleClose}
        loading={loading}
        onActualSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Título"
            placeholder="Ex.: Prova 1"
            {...form.register("title", { required: true })}
          />

          <Textarea
            label="Descrição"
            rows={3}
            placeholder="Observações da prova"
            {...form.register("description")}
          />

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-900">
              Arquivo (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) {
                  form.setValue("fileBase64", "");
                  setFileName("");
                  return;
                }

                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64 = reader.result;
                  if (typeof base64 === "string") {
                    const [, data] = base64.split(",");
                    form.setValue("fileBase64", data || "");
                    setFileName(file.name);
                  }
                };
                reader.readAsDataURL(file);
              }}
              className="block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 focus:border-yellow-500 focus:outline-none"
            />
            {fileName && (
              <p className="text-xs text-zinc-500">Selecionado: {fileName}</p>
            )}
          </div>

          <CheckboxGroup>
            <Checkbox
              label="Prova ativa"
              description="Provas ativas podem ser corrigidas."
              checked={form.watch("isActive")}
              onChange={(value) => form.setValue("isActive", value)}
              color="yellow"
            />
          </CheckboxGroup>
        </div>
      </Dialog>
    </>
  );
}
