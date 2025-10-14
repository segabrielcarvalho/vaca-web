import { AssessmentDetailClient } from "./assessment-detail-client";

type PageProps = {
  params: { id: string; assessmentId: string };
};

export default function AssessmentDetailPage({ params }: PageProps) {
  const { id, assessmentId } = params;

  return (
    <AssessmentDetailClient classId={id} assessmentId={assessmentId} />
  );
}
