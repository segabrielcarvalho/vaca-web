"use client";

import {
  CreateSchoolMutationVariables,
  ListSchoolsInput,
  ListSchoolsQueryVariables,
  QueryMode,
  SortOrder,
  useListSchoolsSuspenseQuery,
} from "@generated/hooks";
import useUrlFilter from "@/hooks/useUrlFilter";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type SchoolsProviderProps = { children: ReactNode };

type SchoolsContextData = {
  schools: ReturnType<typeof useListSchoolsSuspenseQuery>;
  get: {
    pageNumber?: number | null;
    pageSize?: number | null;
    name?: string | null;
    isActive?: boolean | null;
  };
  set: {
    pageNumber: (value: number | null) => void;
    pageSize: (value: number | null) => void;
    name: (value: string | null) => void;
    isActive: (value: boolean | null) => void;
  };
  form: UseFormReturn<CreateSchoolMutationVariables>;
};

export const SchoolsContext = createContext<SchoolsContextData>(
  {} as SchoolsContextData
);

export function SchoolsProvider({ children }: SchoolsProviderProps) {
  const [pageNumber, setPageNumber] = useUrlFilter<number>({
    name: "page_number",
  });
  const [pageSize, setPageSize] = useUrlFilter<number>({ name: "page_size" });
  const [name, setName] = useUrlFilter<string>({
    name: "school_name",
    delay: 300,
  });
  const [isActive, setIsActive] = useUrlFilter<boolean>({
    name: "school_is_active",
  });

  const queryVariables = useMemo<ListSchoolsQueryVariables>(() => {
    const conditions: ListSchoolsInput[] = [];

    if (name?.trim()) {
      conditions.push({
        name: { contains: name.trim(), mode: QueryMode.Insensitive },
      });
    }

    if (isActive !== null && isActive !== undefined) {
      conditions.push({ isActive: { equals: isActive } });
    }

    const where: ListSchoolsInput | undefined = conditions.length
      ? { AND: conditions }
      : undefined;

    const take = Math.max(pageSize ?? 10, 1);
    const currentPage = Math.max(pageNumber ?? 1, 1);
    const skip = (currentPage - 1) * take;

    return {
      take,
      skip,
      where,
      orderBy: { createdAt: SortOrder.Desc },
    };
  }, [pageNumber, pageSize, name, isActive]);

  const schools = useListSchoolsSuspenseQuery({
    fetchPolicy: "network-only",
    variables: queryVariables,
  });

  const form = useForm<CreateSchoolMutationVariables>({
    mode: "onChange",
    defaultValues: {
      data: {
        name: "",
        description: "",
        isActive: true,
      },
    },
  });

  const value: SchoolsContextData = useMemo(
    () => ({
      schools,
      get: { pageNumber, pageSize, name, isActive },
      set: {
        pageNumber: setPageNumber,
        pageSize: setPageSize,
        name: setName,
        isActive: setIsActive,
      },
      form,
    }),
    [
      schools,
      pageNumber,
      pageSize,
      name,
      isActive,
      setPageNumber,
      setPageSize,
      setName,
      setIsActive,
      form,
    ]
  );

  return (
    <SchoolsContext.Provider value={value}>{children}</SchoolsContext.Provider>
  );
}

export function useSchoolsContext() {
  const context = useContext(SchoolsContext);
  if (!context) {
    throw new Error("useSchoolsContext must be used within a SchoolsProvider");
  }
  return context;
}
