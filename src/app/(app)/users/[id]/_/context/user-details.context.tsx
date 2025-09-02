"use client";

import omit from "@/lib/omit";
import {
  UpdateUserMutationVariables,
  useGetUserSuspenseQuery,
  useUpdateUserMutation,
} from "@generated/hooks";
import { useParams } from "next/navigation";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type UserDetailProviderProps = { children: ReactNode };

type UserDetailContextData = {
  graphql: {
    query: ReturnType<typeof useGetUserSuspenseQuery>;
    mutation: ReturnType<typeof useUpdateUserMutation>;
    form: UseFormReturn<UpdateUserMutationVariables>;
  };
};

export const UserDetailsContext = createContext<UserDetailContextData>(
  {} as UserDetailContextData
);

export function UserDetailsProvider({ children }: UserDetailProviderProps) {
  const { id: userId } = useParams<{ id: string }>();

  const query = useGetUserSuspenseQuery({
    fetchPolicy: "cache-and-network",
    variables: { getUserId: userId },
  });

  const mutation = useUpdateUserMutation();

  const defaults = query.data?.getUser
    ? omit(query.data.getUser, [
        "id",
        "__typename",
        "createdAt",
        "updatedAt",
        "Mentee",
        "lastSession",
        "avatarUrl",
        "verifiedEmail",
      ])
    : {};

  const form = useForm<UpdateUserMutationVariables>({
    defaultValues: {
      where: { id: userId },
      data: { ...defaults },
    },
  });

  const value: UserDetailContextData = useMemo(
    () => ({
      graphql: {
        query,
        mutation,
        form,
      },
    }),
    [query, mutation, form]
  );

  return (
    <UserDetailsContext.Provider value={value}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export function useUserDetailsContext() {
  const context = useContext(UserDetailsContext);
  if (!context)
    throw new Error(
      "useUserDetailsContext must be used within a UserDetailsProvider"
    );

  return context;
}
