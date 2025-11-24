"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{
    schoolId: string;
    courseId: string;
    klassId: string;
    examId: string;
  }>;
};

export default function ExamIndexPage({ params }: PageProps) {
  const router = useRouter();
  const { schoolId, courseId, klassId, examId } = use(params);

  useEffect(() => {
    router.replace(
      `/schools/${schoolId}/courses/${courseId}/classes/${klassId}/exams/${examId}/gabarito`
    );
  }, [router, schoolId, courseId, klassId, examId]);

  return null;
}
