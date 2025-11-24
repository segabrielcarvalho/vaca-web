"use client";

import { Button } from "@/components/button";
import { Checkbox, CheckboxGroup } from "@/components/checkbox";
import { Dialog } from "@/components/dialog";
import useDisclosure from "@/hooks/useDisclosure";
import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import { UpdateUserMutationVariables } from "@generated/hooks";
import { Controller, SubmitHandler } from "react-hook-form";
import { Input } from "../../../../../../components/input";
import { Select } from "../../../../../../components/select";
import { genderOptions, roleOptions } from "../../../_/utils/constants";
import { useUserDetailsContext } from "../context/user-details.context";

export const UpdateUserInfo = () => {
  const {
    graphql: {
      query: { refetch },
      form: { handleSubmit, control, reset },
      mutation: [submit, { loading }],
    },
  } = useUserDetailsContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { success, error } = useToastHook();

  const handleClose = () => {
    onClose();
    reset();
  };

  const submitImplementation: SubmitHandler<
    UpdateUserMutationVariables
  > = async (variables) => {
    try {
      await submit({ variables });
      await refetch();
      success({ message: "Usuário atualizado com sucesso!" });
      onClose();
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  return (
    <>
      <Button onClick={onOpen} loading={loading} color="yellow" size="sm">
        Editar
      </Button>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        size="2xl"
        title="Editar Usuário"
        description="Atualize as informações gerais do usuário"
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
                  id="user-name"
                  required
                  value={field.value ?? ""}
                  label="Nome"
                />
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <Controller
              control={control}
              name="data.email"
              render={({ field }) => (
                <Input
                  {...field}
                  id="user-email"
                  required
                  value={field.value ?? ""}
                  label="E-mail"
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="data.role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="user-role"
                  label="Role (Função)"
                  required
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Selecione uma role"
                  options={roleOptions}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="data.gender"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="user-gender"
                  label="Gênero"
                  required
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Selecione um gênero"
                  options={genderOptions}
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
                    id="user-active"
                    checked={!!field.value}
                    onChange={field.onChange}
                    label="Ativo"
                    description="Usuários inativos não podem acessar a plataforma."
                  />
                )}
              />

              <Controller
                control={control}
                name="data.isTest"
                render={({ field }) => (
                  <Checkbox
                    id="user-test"
                    checked={!!field.value}
                    onChange={field.onChange}
                    label="Usuário de Teste"
                    description="Marcar como usuário de teste para fácil identificação."
                  />
                )}
              />
            </CheckboxGroup>
          </div>
        </div>
      </Dialog>
    </>
  );
};
