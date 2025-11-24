"use client";

import { use } from "react";
import { CoursesScreen } from "./_/courses-screen";

type PageProps = { params: Promise<{ schoolId: string }> };

export default function SchoolCoursesPage({ params }: PageProps) {
  const { schoolId } = use(params);
  return <CoursesScreen schoolId={schoolId} />;
}
