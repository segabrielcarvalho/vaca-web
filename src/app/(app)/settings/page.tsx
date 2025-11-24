"use client";

export default function SettingsPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Configurações
      </h1>
      <p className="max-w-lg text-sm text-zinc-600 dark:text-zinc-400">
        Aqui você pode ajustar suas preferências e configurações da conta.
      </p>
    </div>
  );
}
