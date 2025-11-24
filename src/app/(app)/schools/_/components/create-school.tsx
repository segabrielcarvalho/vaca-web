"use client";

import { Button } from "@/components/button";
import { Checkbox, CheckboxGroup } from "@/components/checkbox";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import useDisclosure from "@/hooks/useDisclosure";
import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import {
  CreateSchoolMutationVariables,
  useCreateSchoolMutation,
} from "@generated/hooks";
import { Controller, SubmitHandler } from "react-hook-form";
import { useSchoolsContext } from "../contexts/schools.context";

export default function CreateSchool() {
  const {
    schools: { refetch },
    form: { handleSubmit, control, register, reset },
  } = useSchoolsContext();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { error, success } = useToastHook();
  const [createSchool, { loading }] = useCreateSchoolMutation();

  const handleClose = () => {
    onClose();
    reset();
  };

  const submitImplementation: SubmitHandler<
    CreateSchoolMutationVariables
  > = async (variables) => {
    try {
      await createSchool({ variables });
      await refetch();
      success({ message: "Escola criada com sucesso!" });
      handleClose();
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  return (
    <>
      <Button color="yellow" onClick={onOpen}>
        Nova escola
      </Button>

      <Dialog
        title="Cadastrar Escola"
        description="Informe os dados básicos da escola para começar a organizar turmas e cursos."
        size="xl"
        open={isOpen}
        onClose={handleClose}
        loading={loading}
        onActualSubmit={handleSubmit(submitImplementation)}
      >
        <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-4">
          <div className="sm:col-span-2">
            <Controller
              control={control}
              name="data.name"
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  label="Nome da escola"
                  placeholder="Ex.: Colégio Vaca"
                  {...register("data.name", { required: "Obrigatório" })}
                />
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <Controller
              control={control}
              name="data.description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Descrição"
                  rows={3}
                  value={field.value || ""}
                  placeholder="Adicione um breve resumo sobre a escola"
                />
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <CheckboxGroup>
              <Controller
                control={control}
                name="data.isActive"
                render={({ field }) => (
                  <Checkbox
                    id="school-active"
                    checked={!!field.value}
                    onChange={field.onChange}
                    label="Ativa"
                    color="yellow"
                    description="Escolas inativas não ficam disponíveis para associação de novas turmas."
                  />
                )}
              />
            </CheckboxGroup>
          </div>
        </div>
      </Dialog>
    </>
  );
}
