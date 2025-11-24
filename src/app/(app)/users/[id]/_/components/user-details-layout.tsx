"use client";

import SectionHeader from "@/components/section-header";
import getRoutes from "@/routes";
import {
  Calendar,
  CheckCircle2,
  Clock,
  LogIn,
  Mail,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import moment from "moment";
import "moment/locale/pt-br";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UpdateUserInfo } from "../components/update-user-info";
import { useUserDetailsContext } from "../context/user-details.context";

const formatDate = (v?: string | null) =>
  v ? moment(v).locale("pt-br").format("LLL") : "—";

function Avatar({ src, name }: { src?: string | null; name?: string | null }) {
  const initials =
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "U";
  return (
    <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-zinc-800 ring-1 ring-white/10">
      {src ? (
        <Image
          alt={name ?? "Avatar"}
          src={src}
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-white/80">
          {initials}
        </div>
      )}
    </div>
  );
}

function BadgePill({
  icon: Icon,
  label,
  tone = "neutral",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone?: "neutral" | "success" | "danger";
}) {
  const tones =
    tone === "success"
      ? "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20"
      : tone === "danger"
      ? "bg-rose-500/10 text-rose-300 ring-rose-500/20"
      : "bg-zinc-700/40 text-zinc-200 ring-white/10";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ring-1 ${tones}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export default function UserDetailsLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { graphql } = useUserDetailsContext();

  const user = graphql.query.data?.getUser;

  const pathname = usePathname();

  if (!user) return null;

  const base = getRoutes().users.show.path(user.id);

  const secondaryNavigation = [
    { name: "Geral", href: base, current: pathname === base },
    { name: "Planos (Em breve)", href: "#", current: false },
    { name: "Tentativas De Login", href: "#", current: false },
  ];

  return (
    <div className="sm:mt-4">
      <SectionHeader
        title="Detalhes do Usuário"
        description="Gerencie as informações do usuário selecionado."
      />

      <main>
        <header>
          <nav className="flex overflow-x-auto pb-4">
            <ul
              role="list"
              className="flex min-w-full flex-none gap-x-6 text-sm/6 font-semibold text-gray-400"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={item.current ? "text-yellow-400" : ""}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-12 2xl:gap-10">
            <aside className="2xl:col-span-3">
              <div className="flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-zinc-900/40 p-6 2xl:sticky 2xl:top-6">
                <div className="flex items-start justify-between gap-4">
                  <Avatar
                    src={user.avatarUrl ?? undefined}
                    name={user.name ?? undefined}
                  />
                  <UpdateUserInfo />
                </div>

                <div className="mt-4 min-w-0">
                  <h2 className="truncate text-lg font-semibold text-white">
                    {user.name ?? "Usuário"}
                  </h2>
                  <div className="mt-1 flex items-center gap-2 text-sm text-zinc-300">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate" title={user.email ?? undefined}>
                      {user.email ?? "—"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {user.verifiedEmail ? (
                    <BadgePill
                      icon={CheckCircle2}
                      label="E-mail verificado"
                      tone="success"
                    />
                  ) : (
                    <BadgePill
                      icon={XCircle}
                      label="E-mail não verificado"
                      tone="danger"
                    />
                  )}
                  {user.isActive ? (
                    <BadgePill
                      icon={CheckCircle2}
                      label="Ativo"
                      tone="success"
                    />
                  ) : (
                    <BadgePill icon={XCircle} label="Inativo" tone="danger" />
                  )}
                  {user.isTest ? (
                    <BadgePill
                      icon={Clock}
                      label="Conta de teste"
                      tone="neutral"
                    />
                  ) : null}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-400">
                      <Calendar className="h-4 w-4" />
                      <span>Criado em</span>
                    </div>
                    <div className="mt-1 text-xs/6 font-medium text-zinc-200">
                      {formatDate(user.createdAt)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-400">
                      <RefreshCcw className="h-4 w-4" />
                      <span>Última atualização</span>
                    </div>
                    <div className="mt-1 text-xs/6 font-medium text-zinc-200">
                      {formatDate(user.updatedAt)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-400">
                      <LogIn className="h-4 w-4" />
                      <span>Último login</span>
                    </div>
                    <div className="mt-1 text-xs/6 font-medium text-zinc-200">
                      {formatDate(user.lastSession)}
                    </div>
                  </div>
                </div>

                <div className="flex-1" />
              </div>
            </aside>

            <section className="min-w-0 2xl:col-span-9">{children}</section>
          </div>
        </div>
      </main>
    </div>
  );
}
