"use client";

import { GenderEnum, RoleEnum } from "@/graphql/__generated__/documents";
import useUrlFilter from "@/hooks/useUrlFilter";
import {
  CreateUserMutationVariables,
  ListUsersInput,
  ListUsersQueryVariables,
  QueryMode,
  SortOrder,
  useListUsersSuspenseQuery,
} from "@generated/hooks";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type UserProviderProps = { children: ReactNode };

type UserContextData = {
  users: ReturnType<typeof useListUsersSuspenseQuery>;
  get: {
    pageNumber?: number | null;
    pageSize?: number | null;
    name?: string | null;
    email?: string | null;
    isActive?: boolean | null;
    isTest?: boolean | null;
    role?: RoleEnum | null;
  };
  set: {
    pageNumber: (value: number | null) => void;
    pageSize: (value: number | null) => void;
    name: (value: string | null) => void;
    email: (value: string | null) => void;
    isActive: (value: boolean | null) => void;
    isTest: (value: boolean | null) => void;
    role: (value: RoleEnum | null) => void;
  };
  form: UseFormReturn<CreateUserMutationVariables>;
};

export const UserContext = createContext<UserContextData>(
  {} as UserContextData
);

export function UserProvider({ children }: UserProviderProps) {
  const [pageNumber, setPageNumber] = useUrlFilter<number>({
    name: "page_number",
  });
  const [pageSize, setPageSize] = useUrlFilter<number>({ name: "page_size" });
  const [name, setName] = useUrlFilter<string>({ name: "user_name" });
  const [email, setEmail] = useUrlFilter<string>({ name: "user_email" });
  const [role, setRole] = useUrlFilter<RoleEnum>({ name: "user_role" });
  const [isActive, setIsActive] = useUrlFilter<boolean>({
    name: "user_is_active",
  });
  const [isTest, setIsTest] = useUrlFilter<boolean>({ name: "user_is_test" });

  const queryVariables = useMemo<ListUsersQueryVariables>(() => {
    const conditions: ListUsersInput[] = [];

    if (name?.trim()) {
      conditions.push({
        name: { contains: name.trim(), mode: QueryMode.Insensitive },
      });
    }

    if (email?.trim()) {
      conditions.push({
        email: { contains: email.trim(), mode: QueryMode.Insensitive },
      });
    }

    if (role) {
      conditions.push({ role: { equals: role } });
    }

    if (isActive !== null && isActive !== undefined) {
      conditions.push({ isActive: { equals: isActive } });
    }

    if (isTest !== null && isTest !== undefined) {
      conditions.push({ isTest: { equals: isTest } });
    }

    const where: ListUsersInput | undefined = conditions.length
      ? { AND: conditions }
      : undefined;

    const take = Math.max(pageSize ?? 10, 1);
    const currentPage = Math.max(pageNumber ?? 1, 1);
    const skip = (currentPage - 1) * take;

    return { take, skip, where, orderBy: { createdAt: SortOrder.Desc } };
  }, [pageNumber, pageSize, name, email, role, isActive, isTest]);

  const users = useListUsersSuspenseQuery({
    fetchPolicy: "network-only",
    variables: queryVariables,
  });

  const form = useForm<CreateUserMutationVariables>({
    mode: "onChange",
    defaultValues: {
      data: {
        name: "",
        email: "",
        role: RoleEnum.User,
        gender: GenderEnum.Other,
        isActive: true,
        isTest: false,
      },
    },
  });

  const value: UserContextData = useMemo(
    () => ({
      users,
      get: { pageNumber, pageSize, name, email, isActive, isTest, role },
      set: {
        pageNumber: setPageNumber,
        pageSize: setPageSize,
        name: setName,
        email: setEmail,
        isActive: setIsActive,
        isTest: setIsTest,
        role: setRole,
      },
      form,
    }),
    [
      users,
      pageNumber,
      pageSize,
      name,
      email,
      role,
      isActive,
      isTest,
      setPageNumber,
      setPageSize,
      setName,
      setEmail,
      setIsActive,
      setIsTest,
      setRole,
      form,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
}
