"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthContext } from "@/contexts/AuthContext";
import useToastHook from "@/hooks/useToastHook";
import getRoutes from "@/routes";
import { normalizeRedirectParam } from "@/utils/redirect";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithToken } = useAuthContext();
  const { error: toastError } = useToastHook();

  const [error, setError] = useState<string | null>(null);
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const token = searchParams.get("token");
    const redirectParam = searchParams.get("redirect");
    const redirectPath = normalizeRedirectParam(redirectParam);

    const redirectToLogin = (message: string) => {
      setError(message);
      toastError({ message });
      timeoutId = setTimeout(() => {
        router.replace(getRoutes().auth.login.path());
      }, 1500);
    };

    if (!token) {
      redirectToLogin("Token de autenticação ausente. Tente novamente.");
    } else {
      signInWithToken(token, redirectPath).catch(() => {
        redirectToLogin("Não foi possível concluir o login com o Google.");
      });
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [router, searchParams, signInWithToken, toastError]);

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-4 rounded-3xl border bg-white p-6 text-center shadow-md border-zinc-200 text-zinc-800 transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
        <h1 className="text-xl font-semibold">
          {error ? "Algo deu errado" : "Concluindo login com o Google"}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {error
            ? "Você será redirecionado para a página de login em instantes."
            : "Aguarde enquanto finalizamos a autenticação."}
        </p>
      </div>
    </div>
  );
}
