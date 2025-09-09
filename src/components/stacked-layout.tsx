"use client";

import React from "react";

export function StackedLayout({
  navbar,
  children,
}: React.PropsWithChildren<{ navbar: React.ReactNode }>) {
  return (
    <div className="relative isolate flex min-h-svh w-full flex-col bg-white/90 lg:bg-slate-950 lg:backdrop-blur text-zinc-900">
      <header className="w-full bg-zinc-50 dark:bg-slate-950">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">{navbar}</div>
      </header>

      <main className="flex flex-1 flex-col px-4 sm:px-6 lg:px-8 pb-4">
        <div className="grow w-full h-full p-6 rounded-lg bg-white shadow-xs ring-1 ring-zinc-950/5 dark:ring-white/10">
          {children}
        </div>
      </main>
    </div>
  );
}
