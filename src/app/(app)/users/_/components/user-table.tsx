"use client";

import "moment/locale/pt-br";
moment.locale("pt-br");

import { Badge } from "@/components/badge";
import { Table } from "@/components/table";
import moment from "moment";
import { useId, useMemo } from "react";
import { Avatar } from "../../../../../components/avatar";
import { Pagination } from "../../../../../components/pagination";
import getRole from "../../../../../lib/getRole";
import getRoutes from "../../../../../routes";
import { useUserContext } from "../contexts/users.context";

export const UserTable = () => {
  const { users, get, set } = useUserContext();

  const headers = [
    "Nome",
    "Role (Função)",
    "Ativo",
    "Criado em",
    "Último Login",
  ];

  const reactId = useId();

  const tableRows = useMemo(() => {
    return users.data?.listUsers.rows.map((user) => ({
      title: `Detalhes de ${user.name}`,
      href: getRoutes().users.show.path(user.id),
      cells: [
        <div key={reactId} className="flex items-center space-x-2">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar src={user.avatarUrl} className="size-12 rounded-full" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-semibold text-zinc-100">
                  {user.name}
                </p>
                {user.isTest && (
                  <Badge color="orange" className="px-2 py-0.5 text-xs">
                    TESTE
                  </Badge>
                )}
              </div>
              <p className="truncate text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>,

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {getRole(user.role)}
        </span>,

        <Badge
          key={reactId}
          className="px-4"
          color={user.isActive ? "green" : "rose"}
        >
          {user.isActive ? "Ativo" : "Inativo"}
        </Badge>,

        <time
          dateTime={user.createdAt}
          key={reactId}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {moment(user.createdAt).fromNow()}
        </time>,

        <time
          dateTime={user.lastSession ?? ""}
          key={reactId}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {user.lastSession
            ? new Date(user.lastSession).toLocaleString("pt-BR")
            : "-"}
        </time>,
      ],
    }));
  }, [users.data?.listUsers.rows, reactId]);

  return (
    <>
      {users.data?.listUsers.count === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          Nenhum usuário encontrado.
        </p>
      ) : (
        <>
          <Table
            headers={headers}
            rows={tableRows}
            striped
            total={users.data?.listUsers.count}
          />

          <Pagination
            page={get.pageNumber || 1}
            pageSize={get.pageSize || 10}
            setPage={set.pageNumber}
            totalArraySize={users.data?.listUsers.count || 0}
            setPageSize={set.pageSize}
          />
        </>
      )}
    </>
  );
};
