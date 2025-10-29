"use client";

import { useSearchParams } from "next/navigation";
import type { SVGProps } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Link } from "@/components/link";
import { Logo } from "@/components/logo";
import { useAuthContext } from "@/contexts/AuthContext";
import { LoginMutationVariables } from "@/graphql/__generated__/documents";
import getRoutes from "@/routes";
import { normalizeRedirectParam } from "@/utils/redirect";

const GoogleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <path
      fill="#4285F4"
      d="M21.35 11.1h-9.18v3.63h5.27c-.23 1.2-.94 2.22-2 2.9v2.42h3.24c1.9-1.75 2.99-4.33 2.99-7.57 0-.72-.07-1.42-.19-2.09Z"
    />
    <path
      fill="#34A853"
      d="M12.17 21c2.7 0 4.96-.89 6.61-2.38l-3.24-2.42c-.9.6-2.03.96-3.37.96-2.59 0-4.78-1.75-5.56-4.1H3.3v2.57C4.93 18.84 8.3 21 12.17 21Z"
    />
    <path
      fill="#FBBC04"
      d="M6.61 13.06a5.78 5.78 0 0 1 0-3.72V6.77H3.3a9.08 9.08 0 0 0 0 8.45l3.31-2.16Z"
    />
    <path
      fill="#EA4335"
      d="M12.17 5.5c1.46 0 2.78.5 3.83 1.47l2.86-2.86C16.98 2.74 14.72 1.75 12.17 1.75 8.3 1.75 4.93 3.91 3.3 7.23l3.31 2.57c.78-2.35 2.97-4.1 5.56-4.1Z"
    />
  </svg>
);

export function Login() {
  const { signIn } = useAuthContext();
  const searchParams = useSearchParams();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const googleAuthUrl = apiBaseUrl
    ? `${apiBaseUrl.replace(/\/$/, "")}/auth/google`
    : null;
  const redirectPath = normalizeRedirectParam(searchParams.get("redirect"));

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginMutationVariables>();

  const onSubmit = async (data: LoginMutationVariables) => {
    await signIn({ ...data, redirectPath });
  };

  const handleGoogleSignIn = () => {
    if (!googleAuthUrl) {
      console.error(
        "NEXT_PUBLIC_API_URL não está configurada para o login com Google."
      );
      return;
    }
    if (!isSubmitting) {
      try {
        const url = new URL(googleAuthUrl);
        if (redirectPath) url.searchParams.set("redirect", redirectPath);
        window.location.href = url.toString();
      } catch (err) {
        console.error("URL de autenticação do Google inválida.", err);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-10 px-4 py-6 sm:px-6 lg:px-8">
      <Logo width={250} height={90} />

      <div className="w-full max-w-lg space-y-7 rounded-3xl border border-zinc-200 bg-white p-6 text-zinc-800 shadow-xl transition-colors duration-300 sm:p-10">
        <div>
          <h2 className="text-start text-2xl/9 font-bold tracking-tight text-zinc-900">
            Acesse sua conta
          </h2>

          <p className="mt-1 text-start text-md font-normal tracking-tight text-zinc-600">
            Informe o e-mail usado na compra do seu plano
          </p>
        </div>

        <div>
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
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="flex mt-3 w-full">
            <Button
              type="button"
              disabled={isSubmitting}
              outline
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              <span data-slot="icon">
                <GoogleIcon className="h-5 w-5" />
              </span>
              Entrar com Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
