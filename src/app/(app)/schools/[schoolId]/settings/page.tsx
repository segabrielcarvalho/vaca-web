"use client";

import { use } from "react";
import { SchoolSettingsScreen } from "./_/settings-screen";

type PageProps = { params: Promise<{ schoolId: string }> };

export default function SchoolSettingsPage({ params }: PageProps) {
  const { schoolId } = use(params);
  return <SchoolSettingsScreen schoolId={schoolId} />;
}
