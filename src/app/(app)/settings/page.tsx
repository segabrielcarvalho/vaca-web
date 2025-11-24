"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Switch } from "@/components/switch";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    product: false,
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
        <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
          Configurações
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">
          Preferências da conta
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Ajuste notificações, dados pessoais e comportamento da plataforma. Tudo pronto para uso em mobile ou desktop.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Notificações
              </h2>
              <p className="text-sm text-zinc-600">
                Controle como você recebe alertas e atualizações.
              </p>
            </div>
            <Button color="light" outline size="sm">
              Desativar todas
            </Button>
          </div>

          <div className="divide-y divide-zinc-100">
            {[
              {
                key: "email",
                label: "E-mail",
                description: "Resumos, novidades e alertas importantes.",
              },
              {
                key: "push",
                label: "Push",
                description: "Alertas rápidos no dispositivo.",
              },
              {
                key: "product",
                label: "Atualizações de produto",
                description: "Novidades e melhorias do sistema.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {item.label}
                  </p>
                  <p className="text-xs text-zinc-600">{item.description}</p>
                </div>
                <Switch
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(value) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: value,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
          <div>
            <h3 className="text-base font-semibold text-zinc-900">
              Dados pessoais
            </h3>
            <p className="text-sm text-zinc-600">
              Nome e contato exibidos na sua conta.
            </p>
          </div>

          <form className="space-y-3">
            <Input label="Nome" placeholder="Seu nome" />
            <Input label="E-mail" placeholder="seu@email.com" type="email" />
            <Button color="yellow" className="w-full">
              Atualizar dados
            </Button>
          </form>
        </aside>
      </div>
    </div>
  );
}
