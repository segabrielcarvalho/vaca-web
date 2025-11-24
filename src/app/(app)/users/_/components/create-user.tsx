"use client";

import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { CreateUserMutationVariables } from "@/graphql/__generated__/documents";
import useDisclosure from "@/hooks/useDisclosure";
import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import { Controller, SubmitHandler } from "react-hook-form";
import { Select } from "../../../../../components/select";
import { useCreateUserMutation } from "../../../../../graphql/__generated__/hooks";
import { useUserContext } from "../contexts/users.context";

import { Checkbox, CheckboxGroup } from "@/components/checkbox";
import { genderOptions, roleOptions } from "../utils/constants";

export default function CreateUser() {
  const {
    users: { refetch },
    form: { handleSubmit, control, reset, register },
  } = useUserContext();

  const { error, success } = useToastHook();
  const [submit, { loading }] = useCreateUserMutation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleClose = () => {
    onClose();
    reset();
  };

  const submitImplementation: SubmitHandler<
    CreateUserMutationVariables
  > = async (args) => {
    try {
      await submit({ variables: args });
      await refetch();
      success({ message: "Usuário adicionado com sucesso!" });
      onClose();
      reset();
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  return (
    <>
      <Button color="yellow" onClick={onOpen}>
        Novo Usuário
      </Button>

      <Dialog
        title="Adicionar Novo Usuário"
        description="Informe o nome, e-mail, gênero, role (função), status entre outros para o usuário."
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
                  id="user-name"
                  autoComplete="off"
                  required
                  label="Nome"
                  {...register("data.name", { required: "Obrigatório" })}
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
                  label="E-mail"
                  {...register("data.email", { required: "Obrigatório" })}
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
}
