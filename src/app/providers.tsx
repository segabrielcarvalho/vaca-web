"use client";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { ApolloWrapper } from "../services/apollo/AppProvider";

export function Providers({
  children,
  initialToken,
}: {
  children: React.ReactNode;
  initialToken?: string;
}) {
  return (
    <ApolloWrapper initialToken={initialToken}>
      <AuthProvider>
        <ToastContainer className="animate__animated animate__fadeIn p-0" />
        {children}
      </AuthProvider>
    </ApolloWrapper>
  );
}
