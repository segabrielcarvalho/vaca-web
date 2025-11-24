"use client";

import { use } from "react";
import { CourseScreen } from "./_/course-screen";

type PageProps = {
  params: Promise<{ schoolId: string; courseId: string }>;
};

export default function CourseDetailsPage({ params }: PageProps) {
  const { schoolId, courseId } = use(params);
  return <CourseScreen schoolId={schoolId} courseId={courseId} />;
}
