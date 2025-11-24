"use client";

import { use } from "react";
import { CorrectionScreen } from "./_/correction-screen";

type PageProps = {
  params: Promise<{
    schoolId: string;
    courseId: string;
    klassId: string;
    examId: string;
  }>;
};

export default function CorrectionPage({ params }: PageProps) {
  const resolved = use(params);
  return <CorrectionScreen examId={resolved.examId} params={resolved} />;
}
