import { useRouter } from "next/navigation";
import nookies from "nookies";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import settings from "@/config/settings";
import useToastHook from "@/hooks/useToastHook";
import getRoutes from "@/routes";
import { LoginMutationVariables } from "@generated/documents";
import { MeQuery, useLoginMutation, useMeLazyQuery } from "@generated/hooks";

export type User = MeQuery["me"];

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  signIn(
    credentials: LoginMutationVariables & { redirectPath?: string }
  ): Promise<void>;
  signInWithToken(token: string, redirectPath?: string): Promise<void>;
  signOut(redirect?: boolean): Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const maxAge = 60 * 60 * 24 * 30;

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [fetchMe, { data: meData, loading: meLoading }] = useMeLazyQuery({
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  const [Login] = useLoginMutation();
  const router = useRouter();
  const { error: toastError } = useToastHook();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const broadcast = useRef<BroadcastChannel | null>(null);

  const isAuthenticated = !!user;

  const performLocalSignOut = useCallback(() => {
    setUser(null);
    nookies.destroy(null, settings.tokenKey, { path: "/" });
    nookies.destroy(null, settings.refreshTokenKey, { path: "/" });
  }, []);

  const redirectToLogin = useCallback(
    async () => {
      const loginPath = getRoutes().auth.login.path();
      await router.push(loginPath);
      router.refresh();
    },
    [router]
  );

  const signOut = useCallback(
    async (redirect = true) => {
      setIsLoading(true);
      try {
        performLocalSignOut();
        broadcast.current?.postMessage("signOut");
        if (redirect) await redirectToLogin();
      } finally {
        setIsLoading(false);
      }
    },
    [performLocalSignOut, redirectToLogin]
  );

  useEffect(() => {
    broadcast.current = new BroadcastChannel("auth");
    broadcast.current.onmessage = async (msg) => {
      if (msg.data === "signOut") {
        performLocalSignOut();
        await redirectToLogin();
      }
      if (msg.data === "signIn") {
        const { data } = await fetchMe();
        if (data?.me) setUser(data.me);
      }
    };
    return () => broadcast.current?.close();
  }, [fetchMe, performLocalSignOut, redirectToLogin]);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const cookies = nookies.get(null);
        if (cookies[settings.tokenKey]) {
          const { data } = await fetchMe();
          if (data?.me) setUser(data.me);
        }
      } catch {
        await signOut(false);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, [fetchMe, signOut]);

  useEffect(() => {
    if (meData?.me) setUser(meData.me);
  }, [meData]);

  const finalizeSignIn = useCallback(
    async (token: string, redirectPath?: string) => {
      nookies.set(null, settings.tokenKey, token, {
        maxAge,
        path: "/",
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
      });

      const me = await fetchMe();
      if (me.data?.me) setUser(me.data.me);

      broadcast.current?.postMessage("signIn");
      router.push(redirectPath || getRoutes().home.path());
    },
    [fetchMe, router]
  );

  const signInWithToken = useCallback(
    async (token: string, redirectPath?: string) => {
      setIsLoading(true);
      try {
        await finalizeSignIn(token, redirectPath);
      } catch (e) {
        if (e instanceof Error) toastError({ message: e.message });
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [finalizeSignIn, toastError]
  );

  const signIn = useCallback(
    async ({
      email,
      password,
      redirectPath,
    }: LoginMutationVariables & { redirectPath?: string }) => {
      setIsLoading(true);
      try {
        const { data, errors } = await Login({
          variables: { email, password },
        });

        const accessToken = data?.login?.token;

        if (!accessToken) {
          const message =
            errors?.[0]?.message ||
            "E-mail ou senha inválidos. Tente novamente.";
          throw new Error(message);
        }

        await finalizeSignIn(accessToken, redirectPath);
      } catch (e) {
        if (e instanceof Error) toastError({ message: e.message });
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [Login, finalizeSignIn, toastError]
  );

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signInWithToken,
        signOut,
        user,
        isAuthenticated,
        isLoading: isLoading || meLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
