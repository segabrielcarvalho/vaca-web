"use client";
import { ReactNode } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { LoadingSpinner } from "./loading-spinner";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthContext();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <LoadingSpinner />;

  return <>{children}</>;
}
