"use client";

import { Mail, Shield, User2 } from "lucide-react";

import { UserDetailsRow } from "./components/user-details-row";
import { useUserDetailsContext } from "./context/user-details.context";
import { formatDate } from "./utils/formatDate";
import { formatDisplayValue } from "./utils/formatDisplayValue";

export default function UserGeneralInfo() {
  const { graphql } = useUserDetailsContext();
  const user = graphql.query.data?.getUser;

  if (!user) return null;

  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
          <h3 className="mb-3 text-sm font-medium text-white">Conta</h3>
          <UserDetailsRow label="ID" value={user.id ?? "—"} />
          <UserDetailsRow
            label="E-mail"
            value={user.email ?? "—"}
            icon={Mail}
          />
          <UserDetailsRow
            label="Status"
            value={user.isActive ? "Ativo" : "Inativo"}
          />
          <UserDetailsRow
            label="Verificação de e-mail"
            value={user.verifiedEmail ? "Verificado" : "Não verificado"}
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
          <h3 className="mb-3 text-sm font-medium text-white">Perfil</h3>
          <UserDetailsRow label="Nome" value={user.name ?? "—"} />
          <UserDetailsRow
            label="Função"
            value={formatDisplayValue(user.role) || "—"}
            icon={Shield}
          />
          <UserDetailsRow
            label="Gênero"
            value={formatDisplayValue(user.gender) || "—"}
            icon={User2}
          />
        </div>
      </div>

      {user.Mentee ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-zinc-900/60 p-5">
          <h3 className="mb-3 text-sm font-medium text-white">Mentee</h3>
          <UserDetailsRow label="ID" value={user.Mentee.id} />
          <UserDetailsRow
            label="Tipo"
            value={formatDisplayValue(user.Mentee.type)}
          />
          <UserDetailsRow
            label="Criado em"
            value={formatDate(user.Mentee.createdAt)}
          />
          <UserDetailsRow
            label="Atualizado em"
            value={formatDate(user.Mentee.updatedAt)}
          />
        </div>
      ) : null}
    </div>
  );
}
