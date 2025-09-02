"use client";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { ApolloWrapper } from "../services/apollo/AppProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <AuthProvider>
        <ToastContainer className="animate__animated animate__fadeIn p-0" />
        {children}
      </AuthProvider>
    </ApolloWrapper>
  );
}
