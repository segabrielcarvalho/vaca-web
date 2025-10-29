import type React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col bg-blue-950">
      <div className="flex grow items-center justify-center p-6 sm:p-10">
        {children}
      </div>
    </main>
  );
}
