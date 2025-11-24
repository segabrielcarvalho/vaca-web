"use client";

import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import {
  QueryMode,
  SortOrder,
  useGetSchoolSuspenseQuery,
  useListUsersSuspenseQuery,
  useUpdateSchoolMutation,
} from "@generated/hooks";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { SettingsHero } from "./components/settings-hero";
import { DetailsSection } from "./components/details-section";
import { DirectorSection } from "./components/director-section";
import { ReviewSection } from "./components/review-section";
import type { DetailsFormValues, DirectorOptionType } from "./types";
import { SchoolHeader } from "../../_/components/school-header";

type SchoolSettingsScreenProps = { schoolId: string };

export function SchoolSettingsScreen({ schoolId }: SchoolSettingsScreenProps) {
  const { data, refetch } = useGetSchoolSuspenseQuery({
    fetchPolicy: "network-only",
    variables: { id: schoolId },
  });
  const school = data?.getSchool;

  const { success, error } = useToastHook();
  const [updateSchool, { loading }] = useUpdateSchoolMutation();

  const detailsForm = useForm<DetailsFormValues>({
    values: {
      name: school?.name ?? "",
      description: school?.description ?? "",
      isActive: school?.isActive ?? true,
    },
  });

  const [directorSearch, setDirectorSearch] = useState("");
  const usersVariables = useMemo(() => {
    const search = directorSearch.trim();
    const orConditions = [];

    if (search) {
      orConditions.push(
        { name: { contains: search, mode: QueryMode.Insensitive } },
        { email: { contains: search, mode: QueryMode.Insensitive } }
      );
    }

    if (school?.directorId) {
      orConditions.push({ id: { equals: school.directorId } });
    }

    return {
      take: 10,
      skip: 0,
      orderBy: { createdAt: SortOrder.Desc },
      where: orConditions.length ? { OR: orConditions } : undefined,
    };
  }, [directorSearch, school?.directorId]);

  const usersQuery = useListUsersSuspenseQuery({
    fetchPolicy: "network-only",
    variables: usersVariables,
  });

  const directorOptions = useMemo<DirectorOptionType[]>(() => {
    return (
      usersQuery.data?.listUsers.rows.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      })) ?? []
    );
  }, [usersQuery.data?.listUsers.rows]);

  const [selectedDirector, setSelectedDirector] =
    useState<DirectorOptionType | null>(null);

  useEffect(() => {
    if (!school?.directorId) {
      setSelectedDirector(null);
      return;
    }

    setSelectedDirector((current) => {
      if (current?.id === school.directorId) return current;
      const match = directorOptions.find(
        (option) => option.id === school.directorId
      );
      return match ?? current ?? null;
    });
  }, [school?.directorId, directorOptions]);

  useEffect(() => {
    detailsForm.reset({
      name: school?.name ?? "",
      description: school?.description ?? "",
      isActive: school?.isActive ?? true,
    });
  }, [school?.name, school?.description, school?.isActive, detailsForm]);

  const handleSubmit = async (values: DetailsFormValues) => {
    try {
      await updateSchool({
        variables: {
          id: schoolId,
          data: {
            name: values.name.trim(),
            description: values.description ?? null,
            isActive: values.isActive,
            director: selectedDirector
              ? { agentId: selectedDirector.id }
              : undefined,
          },
        },
      });
      await refetch();
      success({ message: "Configurações da escola atualizadas." });
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    }
  };

  if (!school) return null;

  const createdAt = new Date(school.createdAt).toLocaleDateString("pt-BR");
  const updatedAt = new Date(school.updatedAt).toLocaleDateString("pt-BR");

  return (
    <div className="space-y-8">
      <SchoolHeader schoolId={schoolId} />

      <div className="space-y-8">
        <SettingsHero />

        <form
          className="space-y-12"
          onSubmit={detailsForm.handleSubmit(handleSubmit)}
        >
          <DetailsSection
            form={detailsForm}
            createdAt={createdAt}
            schoolId={school.id}
          />

          <DirectorSection
            options={directorOptions}
            selected={selectedDirector}
            onSearchChange={(value) => setDirectorSearch(value)}
            onChange={(option) => setSelectedDirector(option)}
          />

          <ReviewSection
            isActive={detailsForm.watch("isActive")}
            updatedAt={updatedAt}
            onDiscard={() => refetch()}
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}
