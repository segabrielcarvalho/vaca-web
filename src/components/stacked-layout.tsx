"use client";

import React from "react";

export function StackedLayout({
  navbar,
  children,
}: React.PropsWithChildren<{ navbar: React.ReactNode }>) {
  return (
    <div className="relative isolate flex min-h-screen w-full flex-col  text-gray-900 dark:text-zinc-100">
      <header className="w-full">
        <div className="container mx-auto flex flex-wrap items-center justify-between pb-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 w-full">
            {navbar}
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col pb-4 px-4 sm:px-6 lg:px-8">
        <div className="grow w-full p-6 h-full rounded-lg bg-brand-200 dark:bg-zinc-800 shadow-xs ring-1 ring-zinc-950/5 dark:ring-white/10">
          {children}
        </div>
      </main>
    </div>
  );
}
