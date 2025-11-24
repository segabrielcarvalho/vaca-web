"use client";

import { use } from "react";
import { ClassesScreen } from "./_/classes-screen";

type PageProps = { params: Promise<{ schoolId: string }> };

export default function SchoolClassesPage({ params }: PageProps) {
  const { schoolId } = use(params);
  return <ClassesScreen schoolId={schoolId} />;
}
