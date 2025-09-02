"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Link } from "@/components/link";
import { Logo } from "@/components/logo";
import { useAuthContext } from "@/contexts/AuthContext";
import { LoginMutationVariables } from "@/graphql/__generated__/documents";
import getRoutes from "@/routes";
import { useForm } from "react-hook-form";

export function Login() {
  const { signIn } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginMutationVariables>();

  const onSubmit = async (data: LoginMutationVariables) => {
    await signIn(data);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-8 px-2 sm:px-4 md:px-6 lg:px-8 py-6">
      <Logo width={120} height={80} />

      <div
        className="
          w-full max-w-lg space-y-7 rounded-3xl border bg-white p-6 sm:p-10 shadow-md border-zinc-200 text-zinc-800 transition-colors duration-300  dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      >
        <div>
          <h2 className="text-start text-2xl/9 font-bold tracking-tight">
            Acesse sua conta
          </h2>

          <p className="mt-1 text-start text-md font-normal tracking-tight text-zinc-600 dark:text-zinc-400">
            Informe o e-mail usado na compra do seu plano
          </p>
        </div>

        <div className="shadow-sm sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />

            <Input
              label="Senha"
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />

            <div className="flex items-center justify-end text-sm/6">
              <Link
                href={getRoutes().auth.forgotPassword.path()}
                className="font-medium text-zinc-400 hover:text-zinc-300"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
